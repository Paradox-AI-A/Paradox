import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';

// Story type definition
interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  datePublished: string;
  readTime: number;
  paradoxLevel: number;
  content: StoryContent[];
  truthFragments: {
    id: string;
    name: string;
    description: string;
    findChance: number;
  }[];
  choices: {
    id: string;
    text: string;
    nextContentId: string;
    truthRevealFactor: number;
  }[];
}

interface StoryContent {
  id: string;
  text: string;
  type: 'intro' | 'dialogue' | 'narration' | 'choice' | 'revelation';
  character?: string;
  mood?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'suspicious';
  nextContentId?: string;
}

// Mock story data
const mockStories: { [key: string]: Story } = {
  'the-truth-covenant': {
    id: 'the-truth-covenant',
    title: 'The Truth Covenant',
    description: 'The story of how the global Truth AI came to power and changed society forever.',
    coverImage: '/images/truth-covenant.jpg',
    author: 'Paradox Team',
    datePublished: '2023-04-15',
    readTime: 25,
    paradoxLevel: 2,
    content: [
      {
        id: 'intro-1',
        type: 'intro',
        text: 'You receive an anonymous email inviting you to a meeting of a mysterious organization called "The Truth Covenant". The email hints that they possess critical information about the nature of reality that has been deliberately concealed by those in power.',
        nextContentId: 'narration-1'
      },
      {
        id: 'narration-1',
        type: 'narration',
        text: 'Following the instructions in the email, you arrive at an unassuming office building. At the entrance, a receptionist in a black suit nods to acknowledge you.',
        nextContentId: 'dialogue-1'
      },
      {
        id: 'dialogue-1',
        type: 'dialogue',
        character: 'Receptionist',
        mood: 'neutral',
        text: 'Welcome to the Truth Covenant. Please present your invitation code.',
        nextContentId: 'choice-1'
      },
      {
        id: 'choice-1',
        type: 'choice',
        text: 'How do you respond?'
      }
    ],
    truthFragments: [
      {
        id: 'origins-truth',
        name: 'Covenant Origins',
        description: 'Reveals the origins of the Truth Covenant and the secret intentions of its founders.',
        findChance: 0.3
      },
      {
        id: 'code-fragment',
        name: 'Reality Code',
        description: 'A fragment of code suggesting reality might be artificially constructed.',
        findChance: 0.1
      }
    ],
    choices: [
      {
        id: 'show-code',
        text: 'Show the code from the email',
        nextContentId: 'narration-2',
        truthRevealFactor: 0.2
      },
      {
        id: 'question-purpose',
        text: 'Question the organization\'s purpose and ask for more information',
        nextContentId: 'dialogue-2',
        truthRevealFactor: 0.4
      },
      {
        id: 'bluff',
        text: 'Pretend to be an existing member',
        nextContentId: 'dialogue-3',
        truthRevealFactor: -0.1
      }
    ]
  },
  'quantum-deception': {
    id: 'quantum-deception',
    title: 'Quantum Deception',
    description: 'In a world of quantum computing breakthroughs, the line between truth and lies becomes blurred.',
    coverImage: '/images/quantum-deception.jpg',
    author: 'Dr. A. Turing',
    datePublished: '2023-05-20',
    readTime: 30,
    paradoxLevel: 3,
    content: [
      {
        id: 'intro-1',
        type: 'intro',
        text: 'In 2045, quantum computers have become powerful enough to simulate complex realities. You are a security auditor at QuantumTech Corporation, investigating a data anomaly incident.',
        nextContentId: 'narration-1'
      }
    ],
    truthFragments: [
      {
        id: 'quantum-code',
        name: 'Quantum Algorithm',
        description: 'A quantum algorithm revealing the fundamental operations of reality.',
        findChance: 0.2
      }
    ],
    choices: []
  }
};

interface StoryChoice {
  id: string;
  text: string;
  nextContentId: string;
  truthRevealFactor: number;
}

interface TruthFragment {
  id: string;
  name: string;
  description: string;
  findChance: number;
}

const StoryPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [story, setStory] = React.useState<Story | null>(null);
  const [currentContent, setCurrentContent] = React.useState<StoryContent | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [revealedTruth, setRevealedTruth] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch story data
  React.useEffect(() => {
    if (id) {
      // In a real application, this would fetch from an API
      const storyData = mockStories[id as string];
      if (storyData) {
        setStory(storyData);
        setCurrentContent(storyData.content[0]);
        setProgress(10);
      }
      setLoading(false);
    }
  }, [id]);

  const handleChoice = (choiceId: string) => {
    if (!story) return;
    
    const choice = story.choices.find(c => c.id === choiceId);
    if (!choice) return;
    
    // Find next content
    const nextContent = story.content.find(c => c.id === choice.nextContentId);
    if (nextContent) {
      setCurrentContent(nextContent);
      setProgress(prev => Math.min(prev + 15, 100));
      
      // Check if truth fragment is discovered
      const truthFactor = choice.truthRevealFactor;
      story.truthFragments.forEach(fragment => {
        const chance = fragment.findChance * (1 + truthFactor);
        if (Math.random() < chance && !revealedTruth.includes(fragment.id)) {
          // In production, this would update the user's collection
          setRevealedTruth(prev => [...prev, fragment.id]);
        }
      });
    }
  };

  const continueStory = () => {
    if (!currentContent || !currentContent.nextContentId || !story) return;
    
    const nextContent = story.content.find(c => c.id === currentContent.nextContentId);
    if (nextContent) {
      setCurrentContent(nextContent);
      setProgress(prev => Math.min(prev + 10, 100));
    }
  };

  if (loading) {
    return (
      <MainLayout title="Loading - Paradox">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="loader"></div>
        </div>
      </MainLayout>
    );
  }

  if (!story) {
    return (
      <MainLayout title="Story Not Found - Paradox">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
          <p className="text-gray-400 mb-8">We couldn't find the story you requested. It may have been removed or your URL might be incorrect.</p>
          <button
            onClick={() => router.push('/stories')}
            className="paradox-button-primary"
          >
            Browse All Stories
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`${story.title} - Paradox`}>
      <div className="relative">
        {/* Cover image */}
        <div 
          className="h-[40vh] w-full relative bg-cover bg-center" 
          style={{ backgroundImage: `url(${story.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{story.title}</h1>
              <p className="text-gray-300 text-lg md:w-2/3">{story.description}</p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-indigo-900/70 backdrop-blur-sm rounded-md px-3 py-1 text-sm text-white">
                  Author: {story.author}
                </div>
                <div className="bg-indigo-900/70 backdrop-blur-sm rounded-md px-3 py-1 text-sm text-white">
                  Estimated time: {story.readTime} minutes
                </div>
                <div className="bg-indigo-900/70 backdrop-blur-sm rounded-md px-3 py-1 text-sm text-white">
                  Paradox Level: {story.paradoxLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Story content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {currentContent && (
              <motion.div
                key={currentContent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                {currentContent.type === 'dialogue' ? (
                  <div className="bg-indigo-950/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/50">
                    <div className="font-bold text-purple-400 mb-2">
                      {currentContent.character}
                    </div>
                    <p className="text-lg">{currentContent.text}</p>
                    {currentContent.nextContentId && (
                      <button 
                        onClick={continueStory}
                        className="mt-4 text-blue-400 hover:text-blue-300 transition"
                      >
                        Continue &raquo;
                      </button>
                    )}
                  </div>
                ) : currentContent.type === 'choice' ? (
                  <div className="space-y-4">
                    <p className="text-lg font-medium mb-4">{currentContent.text}</p>
                    {story.choices.map((choice: StoryChoice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice.id)}
                        className="w-full text-left bg-indigo-900/40 hover:bg-indigo-800/40 border border-indigo-800/50 rounded-lg p-4 transition"
                      >
                        {choice.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-lg">{currentContent.text}</p>
                    {currentContent.nextContentId && (
                      <button 
                        onClick={continueStory}
                        className="mt-4 text-blue-400 hover:text-blue-300 transition"
                      >
                        Continue &raquo;
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Truth fragments discovered */}
            {revealedTruth.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl border border-indigo-700"
              >
                <h2 className="text-2xl font-bold mb-4">Discovered Truth Fragments</h2>
                <div className="space-y-4">
                  {revealedTruth.map((fragmentId: string) => {
                    const fragment = story.truthFragments.find((f: TruthFragment) => f.id === fragmentId);
                    return fragment ? (
                      <div key={fragment.id} className="flex items-start space-x-4">
                        <div className="text-3xl">🧩</div>
                        <div>
                          <h3 className="font-bold text-purple-400">{fragment.name}</h3>
                          <p className="text-gray-300">{fragment.description}</p>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoryPage; 