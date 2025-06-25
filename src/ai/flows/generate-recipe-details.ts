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

const RecipeDetailsSchema = z.object({
    recipeName: z.string().describe('The name of the recipe.'),
    description: z.string().describe('A short, appealing description of the recipe.'),
    prepTime: z.string().describe('The preparation time for the recipe (e.g., "15 min").'),
    cookTime: z.string().describe('The cooking time for the recipe (e.g., "30 min").'),
    servings: z.string().describe('The number of servings the recipe makes (e.g., "4 porciones").'),
    difficulty: z.string().describe('The difficulty level of the recipe (Fácil, Intermedio, Difícil).'),
    ingredients: z.array(z.string()).describe('A list of ingredients required for the recipe.'),
    instructions: z.array(z.string()).describe('The step-by-step cooking instructions.'),
    nutrition: z.object({
        calories: z.string().describe('Estimated calories per serving (e.g., "450 kcal").'),
        protein: z.string().describe('Estimated protein per serving in grams (e.g., "30g").'),
        carbs: z.string().describe('Estimated carbohydrates per serving in grams (e.g., "40g").'),
        fat: z.string().describe('Estimated fat per serving in grams (e.g., "15g").'),
    }).describe('Nutritional information per serving.'),
    imageKeywords: z.string().describe('Two keywords in English for a food photography image of the dish. e.g., "tacos pastor", "chocolate cake"'),
});
export type RecipeDetails = z.infer<typeof RecipeDetailsSchema>;

const GenerateRecipeDetailsInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe to get details for.'),
});
export type GenerateRecipeDetailsInput = z.infer<typeof GenerateRecipeDetailsInputSchema>;

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
