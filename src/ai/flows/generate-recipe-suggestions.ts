'use server';

/**
 * @fileOverview Recipe suggestion AI agent.
 *
 * - generateRecipeSuggestions - A function that handles the recipe suggestion process.
 * - GenerateRecipeSuggestionsInput - The input type for the generateRecipeSuggestions function.
 * - GenerateRecipeSuggestionsOutput - The return type for the generateRecipeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeSuggestionsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has available.'),
});
export type GenerateRecipeSuggestionsInput = z.infer<
  typeof GenerateRecipeSuggestionsInputSchema
>;

const GenerateRecipeSuggestionsOutputSchema = z.object({
  recipes: z
    .array(z.string())
    .describe('A list of recipe suggestions based on the available ingredients.'),
});
export type GenerateRecipeSuggestionsOutput = z.infer<
  typeof GenerateRecipeSuggestionsOutputSchema
>;

export async function generateRecipeSuggestions(
  input: GenerateRecipeSuggestionsInput
): Promise<GenerateRecipeSuggestionsOutput> {
  return generateRecipeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeSuggestionsPrompt',
  input: {schema: GenerateRecipeSuggestionsInputSchema},
  output: {schema: GenerateRecipeSuggestionsOutputSchema},
  prompt: `You are a recipe suggestion AI. Given a list of ingredients, you will suggest recipes that can be made with those ingredients. Respond in Spanish.

Ingredients: {{{ingredients}}}

Recipes:`,
});

const generateRecipeSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateRecipeSuggestionsFlow',
    inputSchema: GenerateRecipeSuggestionsInputSchema,
    outputSchema: GenerateRecipeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
