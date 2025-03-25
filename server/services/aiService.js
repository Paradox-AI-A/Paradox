const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Generate AI response for dynamic narrative content
 * @param {Object} node - Story node data
 * @param {Object} userProfile - User profile data for personalization
 * @param {Object} story - The complete story object for context
 * @returns {Promise<string>} - Generated narrative content
 */
exports.generateAIResponse = async (node, userProfile, story) => {
  try {
    // If OpenAI API key is not configured, return placeholder content
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured. Using placeholder content.');
      return 'The AI narrative system is currently offline. Please check your configuration.';
    }
    
    // Prepare context for the AI
    const context = {
      nodeType: node.type,
      nodeMetadata: node.metadata,
      userLieProfile: userProfile.lieProfile,
      userGameState: userProfile.gameState,
      storyTitle: story.title,
      storyChapter: story.chapter,
      storyDescription: story.description
    };
    
    // Prepare system prompt based on node type
    let systemPrompt = 'You are an advanced narrative AI for the game "Paradox". ';
    
    switch (node.type) {
      case 'narrative':
        systemPrompt += 'Generate immersive and descriptive narrative text that advances the story. Focus on vivid descriptions and emotional depth.';
        break;
      case 'dialogue':
        systemPrompt += 'Generate realistic dialogue between characters that reveals their personalities and advances the plot.';
        break;
      case 'puzzle':
        systemPrompt += 'Create an intriguing puzzle or riddle that the player must solve, with hints embedded in the text.';
        break;
      case 'paradox':
        systemPrompt += 'Create a mind-bending paradox that challenges the player\'s perception of truth, using self-reference and logical contradictions.';
        break;
      default:
        systemPrompt += 'Generate engaging narrative content that matches the tone and style of the story.';
    }
    
    // Add personalization based on user profile
    systemPrompt += ` Tailor your response for a player with lie creativity ${userProfile.lieProfile.lieCreativity}/10, truth resistance ${userProfile.lieProfile.truthResistance}/10, and paradox aptitude ${userProfile.lieProfile.paradoxAptitude}/5.`;
    
    // Create user message with context about the current story node
    const userMessage = `
      Generate content for the following story node:
      
      Story: ${story.title} (${story.chapter} chapter)
      Location: ${node.metadata.location || 'Unknown'}
      Characters present: ${node.metadata.characters ? node.metadata.characters.join(', ') : 'None'}
      Mood: ${node.metadata.mood || 'Neutral'}
      
      Context: ${node.content.text || 'Generate new content based on the node type and metadata.'}
      
      The player has completed these stories: ${userProfile.completedStories.join(', ') || 'None yet'}
      
      Generate content that advances the narrative and sets up the choices the player will face. Remember that in Paradox, the player must sometimes lie to discover deeper truths.
    `;
    
    // Make request to OpenAI API
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.3,
    });
    
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Return a fallback message if AI generation fails
    return `${node.content.text || 'The Truth AI seems to be malfunctioning. Please proceed with caution.'}`;
  }
};

/**
 * Analyze the truthfulness of a player's input
 * @param {string} playerInput - The text input from the player
 * @param {Object} context - Context about the current state of the game
 * @returns {Promise<Object>} - Analysis result with truthfulness score and other metrics
 */
exports.analyzeTruth = async (playerInput, context) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        truthScore: Math.random(), // Random score between 0 and 1
        isParadox: false,
        complexity: 0.5,
        persuasiveness: 0.5,
        analysis: 'AI analysis system offline. Using random values.'
      };
    }
    
    const systemPrompt = `
      You are the Lie Analysis System for the game "Paradox". Your task is to analyze player input for:
      1. Truthfulness (0-1 scale, where 0 is complete truth and 1 is complete lie)
      2. Paradox elements (Is this statement self-contradictory or self-referential?)
      3. Complexity (0-1 scale, how sophisticated is the lie/truth construction)
      4. Persuasiveness (0-1 scale, how convincing would this be to others)
      
      Respond with a JSON object containing these metrics and a brief analysis.
    `;
    
    const userMessage = `
      Player statement: "${playerInput}"
      
      Context:
      Current story node: ${context.currentNode}
      Character being addressed: ${context.character}
      Previous player statements: ${context.previousStatements.join(' | ')}
      
      Analyze this statement for truthfulness, paradox elements, complexity, and persuasiveness.
    `;
    
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
      top_p: 1,
    });
    
    // Parse the response as JSON
    const responseText = completion.data.choices[0].message.content;
    
    try {
      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if JSON parsing fails
        return {
          truthScore: 0.5,
          isParadox: false,
          complexity: 0.5,
          persuasiveness: 0.5,
          analysis: 'Failed to parse AI analysis. Using default values.'
        };
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return {
        truthScore: 0.5,
        isParadox: false,
        complexity: 0.5,
        persuasiveness: 0.5,
        analysis: 'Failed to parse AI analysis. Using default values.'
      };
    }
  } catch (error) {
    console.error('Error analyzing truth:', error);
    return {
      truthScore: 0.5,
      isParadox: false,
      complexity: 0.5,
      persuasiveness: 0.5,
      analysis: 'AI analysis system error. Using default values.'
    };
  }
}; 