// server/src/services/document.service.ts
import { anthropic } from '../libs/anthropic';
import dotenv from 'dotenv';
import logger from '../logger';

dotenv.config();


export const documentService = {
  /**
   * Analyzes shipping documents using Anthropic Claude
   */
  analyzeDocument: async (documentText: string) => {
    try {
      // Check if Anthropic API key is available
      if (!process.env.ANTHROPIC_API_KEY) {
        logger.warn('Anthropic API key is not set. Using mock response.');
        return mockDocumentAnalysis(documentText);
      }

      const response = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Analyze this shipping document and extract key information:
            
            ${documentText}
            
            Please extract and format the following information:
            - Sender information
            - Recipient information
            - Shipment contents
            - Declared value
            - Special handling instructions
            - Required documentation`
          }
        ],
        temperature: 0.2,
      });
      
      // Correctly extract the text content from the response
      const textContent = response.content.find(
        content => content.type === 'text'
      );
      
      if (!textContent || textContent.type !== 'text') {
        throw new Error('Unexpected response format from Anthropic API');
      }
      
      return textContent.text;
    } catch (error) {
      logger.error('Error calling Anthropic:', error);
      throw error;
    }
  }
};

// Mock function if API key isn't available
function mockDocumentAnalysis(documentText: string) {
  // Mock implementation remains the same
}