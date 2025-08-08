import { GoogleGenAI } from '@google/genai';
import { env, isEnvValid } from '@/lib/env';

// Check if environment is valid before initializing
if (!isEnvValid()) {
    console.error("❌ Invalid environment variables for AI service");
}

// Initialize the AI client with validated API key
const ai = new GoogleGenAI({apiKey: env.GEMINI});

export const generateBlogPost = async (topic, tone, length) => {
    try {
        // Validate input parameters
        if (!topic || !tone || !length) {
            throw new Error("Missing required parameters");
        }

        // Convert length to word count
        let wordCount;
        switch(length.toLowerCase()) {
            case 'short':
                wordCount = '300 words';
                break;
            case 'medium':
                wordCount = '800 words';
                break;
            case 'long':
                wordCount = '1500 words';
                break;
            default:
                throw new Error("Invalid length specified. Use 'short', 'medium', or 'long'.");
        }

        // Construct prompt for AI
        const prompt = `
      You are an expert blog post writer.
      Generate a complete blog post about the following topic: "${topic}". in a tone that is "${tone}" and with a length of "${wordCount}".
      The post should be informative, engaging, and suitable for a general audience.
      The post should be engaging, well-structured, and written in Markdown format.
      IMPORTANT: You must respond with valid JSON only, in exactly this format:
      {
        "title": "A creative and SEO-friendly title for the blog post",
        "slug": "a-url-friendly-slug-for-the-title",
        "content": "The full blog post content in Markdown format"
      }
      Do not include any additional text or formatting outside the JSON structure.
    `;

        // Generate content using AI
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt
        });


        // Clean and parse the response
        const cleanedText = result.text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim()
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
        
        // Parse the JSON response
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(cleanedText);
        } catch (parseError) {
            throw new Error("Invalid JSON response from AI");
        }

        // Validate required fields
        if (!parsedResponse.title || !parsedResponse.slug || !parsedResponse.content) {
            throw new Error("Missing required fields in AI response");
        }

        // Return the validated JSON string
        return JSON.stringify(parsedResponse);
    }
    catch(error) {
        console.error("❌ Error generating blog post:", error);
        throw new Error("Failed to generate blog post: " + error.message);
    }
}

export default generateBlogPost;