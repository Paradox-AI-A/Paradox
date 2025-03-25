#!/usr/bin/env node

/**
 * This script generates TypeScript interfaces from Mongoose schemas
 * Usage: node scripts/generateTypes.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const SERVER_MODELS_DIR = path.join(__dirname, '../server/models');
const APP_TYPES_DIR = path.join(__dirname, '../app/types');
const TYPES_OUTPUT_FILE = path.join(APP_TYPES_DIR, 'generated.d.ts');

// Ensure output directory exists
if (!fs.existsSync(APP_TYPES_DIR)) {
  fs.mkdirSync(APP_TYPES_DIR, { recursive: true });
}

// Mongoose type to TypeScript type mapping
const typeMapping = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Date: 'string', // Use string for dates to avoid serialization issues
  ObjectId: 'string',
  'Schema.Types.ObjectId': 'string',
  Mixed: 'any',
  Map: 'Record<string, any>',
  Buffer: 'Buffer',
};

/**
 * Extract schema information from a Mongoose model file
 * @param {string} filePath Path to the model file
 * @returns {Object} Schema information
 */
function extractSchemaFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Simple regex-based parsing - for complex schemas, a proper parser would be better
  const schemaNameMatch = content.match(/const\s+(\w+)Schema\s*=/);
  const schemaName = schemaNameMatch ? schemaNameMatch[1] : path.basename(filePath, '.js');
  
  // Extract schema definition
  const schemaDefMatch = content.match(/new\s+mongoose\.Schema\(\s*({[\s\S]*?})\s*,/);
  if (!schemaDefMatch) {
    console.warn(`Couldn't extract schema from ${filePath}`);
    return null;
  }
  
  try {
    // This is a crude approximation - in a real implementation, you'd need a proper parser
    const schemaCode = schemaDefMatch[1]
      .replace(/(\w+):\s*{/g, '"$1": {') // Convert property names to strings
      .replace(/(\w+):\s*(\w+)/g, (match, prop, value) => {
        // Try to convert Mongoose types to TypeScript types
        if (typeMapping[value]) {
          return `"${prop}": "${typeMapping[value]}"`;
        }
        return match;
      })
      .replace(/ref:\s*['"](\w+)['"]/g, 'ref: "$1"'); // Handle refs
      
    // Use a more robust approach in production
    const schema = eval(`(${schemaCode})`);
    return { name: schemaName, schema };
  } catch (error) {
    console.error(`Error parsing schema in ${filePath}:`, error);
    return null;
  }
}

/**
 * Generate TypeScript interface from schema
 * @param {string} name Interface name
 * @param {Object} schema Mongoose schema object
 * @returns {string} TypeScript interface definition
 */
function generateInterface(name, schema) {
  let interfaceCode = `export interface ${name} {\n`;
  
  for (const [key, def] of Object.entries(schema)) {
    const isRequired = def.required === true;
    const type = def.type ? typeMapping[def.type] || 'any' : 'any';
    
    // Handle arrays
    if (Array.isArray(def) || 
        (def.type && (def.type === Array || 
                     (typeof def.type === 'string' && def.type.toLowerCase().includes('array')) || 
                     (def.type.constructor && def.type.constructor.name === 'Array')))
       ) {
      const itemType = def.items ? typeMapping[def.items.type] || 'any' : 'any';
      interfaceCode += `  ${key}${isRequired ? '' : '?'}: ${itemType}[];\n`;
      continue;
    }
    
    // Handle references
    if (def.ref) {
      interfaceCode += `  ${key}${isRequired ? '' : '?'}: string; // Ref to ${def.ref}\n`;
      continue;
    }
    
    // Handle nested objects/schemas
    if (typeof def === 'object' && !def.type && !def.ref) {
      interfaceCode += `  ${key}${isRequired ? '' : '?'}: {\n`;
      for (const [nestedKey, nestedDef] of Object.entries(def)) {
        const nestedType = nestedDef.type ? typeMapping[nestedDef.type] || 'any' : 'any';
        const nestedRequired = nestedDef.required === true;
        interfaceCode += `    ${nestedKey}${nestedRequired ? '' : '?'}: ${nestedType};\n`;
      }
      interfaceCode += '  };\n';
      continue;
    }
    
    // Regular properties
    interfaceCode += `  ${key}${isRequired ? '' : '?'}: ${type};\n`;
  }
  
  interfaceCode += '}\n\n';
  return interfaceCode;
}

/**
 * Main function to generate types
 */
function generateTypes() {
  console.log('Generating TypeScript interfaces from Mongoose models...');
  
  let outputContent = `/**
 * THIS FILE IS AUTO-GENERATED - DO NOT EDIT
 * Generated on ${new Date().toISOString()}
 */

`;

  // Get all model files
  const modelFiles = fs
    .readdirSync(SERVER_MODELS_DIR)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(SERVER_MODELS_DIR, file));
  
  // Process each model file
  let interfaceCount = 0;
  modelFiles.forEach(file => {
    console.log(`Processing ${path.basename(file)}...`);
    const schemaInfo = extractSchemaFromFile(file);
    
    if (schemaInfo) {
      const interfaceCode = generateInterface(schemaInfo.name, schemaInfo.schema);
      outputContent += interfaceCode;
      interfaceCount++;
    }
  });
  
  // Write output file
  fs.writeFileSync(TYPES_OUTPUT_FILE, outputContent);
  console.log(`Generated ${interfaceCount} interfaces in ${TYPES_OUTPUT_FILE}`);
  
  // Format the file with Prettier if available
  try {
    execSync(`npx prettier --write ${TYPES_OUTPUT_FILE}`);
    console.log('Formatted output file with Prettier');
  } catch (error) {
    console.warn('Could not format output file with Prettier');
  }
}

// Run the generator
generateTypes(); 