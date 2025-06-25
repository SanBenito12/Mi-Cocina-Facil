import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe-suggestions.ts';
import '@/ai/flows/generate-recipe-details.ts';
import '@/ai/flows/vary-recipe-flow.ts';
