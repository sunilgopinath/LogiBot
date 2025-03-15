// server/src/libs/anthropic.lib.ts
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';


dotenv.config();

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export { anthropic };