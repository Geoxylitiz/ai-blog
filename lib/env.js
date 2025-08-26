import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Database
  MONGO_DB_URI: z.string().url('MONGO_DB_URI must be a valid URL'),
  
  // Redis
  REDIS_HOST: z.string().min(1, 'Redis host is required'),
  REDIS_PORT: z.string().or(z.number()).transform(val => Number(val)),
  REDIS_PASSWORD: z.string().min(1, 'Redis password is required'),
  
  // AI API
  GEMINI: z.string().min(1, 'GEMINI API key is required'),
});

// Process environment variables
function validateEnv() {
  try {
    // Validate against the schema
    const parsed = envSchema.parse(process.env);
    return { env: parsed, errors: null };
  } catch (error) {
    // Return validation errors
    console.error('❌ Invalid environment variables:', error.errors);
    return { 
      env: process.env, 
      errors: error.format() 
    };
  }
}

// Export validated environment variables
export const { env, errors } = validateEnv();

// Helper function to check if environment is valid
export function isEnvValid() {
  return errors === null;
}