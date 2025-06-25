'use server';

/**
 * @fileOverview Recipe details AI agent.
 *
 * - generateRecipeDetails - A function that handles fetching recipe details.
 * - GenerateRecipeDetailsInput - The input type for the generateRecipeDetails function.
 * - RecipeDetails - The return type for the generateRecipeDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { RecipeDetails, RecipeDetailsSchema } from '../schemas';

const GenerateRecipeDetailsInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe to get details for.'),
});
export type GenerateRecipeDetailsInput = z.infer<typeof GenerateRecipeDetailsInputSchema>;

export type { RecipeDetails };

export async function generateRecipeDetails(
  input: GenerateRecipeDetailsInput
): Promise<RecipeDetails> {
  return generateRecipeDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeDetailsPrompt',
  input: {schema: GenerateRecipeDetailsInputSchema},
  output: {schema: RecipeDetailsSchema},
  prompt: `You are a helpful cooking assistant. The user wants to cook a recipe.
  Provide the details for the following recipe: {{{recipeName}}}.
  The entire response, except for imageKeywords, must be in Spanish.
  The description should be short and enticing.
  The instructions should be clear, concise, and easy to follow, with each step as a separate item in the array.
  The ingredients should be a list of strings.
  Also provide the following details:
  - prepTime: The preparation time (e.g., "15 min").
  - cookTime: The cooking time (e.g., "30 min").
  - servings: The number of servings (e.g., "4 porciones").
  - difficulty: The difficulty rating (Fácil, Intermedio, or Difícil).
  - nutrition: Estimated nutritional information per serving, including calories (e.g., "450 kcal"), protein (e.g., "30g"), carbs (e.g., "40g"), and fat (e.g., "15g").
  The imageKeywords should be two simple keywords in English to search for a stock photo of the dish. For example, for 'Tacos al pastor', the keywords could be 'tacos pastor'.
  `,
});

const generateRecipeDetailsFlow = ai.defineFlow(
  {
    name: 'generateRecipeDetailsFlow',
    inputSchema: GenerateRecipeDetailsInputSchema,
    outputSchema: RecipeDetailsSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
