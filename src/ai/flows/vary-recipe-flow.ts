'use server';

/**
 * @fileOverview Recipe variation AI agent.
 *
 * - getRecipeVariation - A function that handles varying a recipe.
 * - VaryRecipeInput - The input type for the getRecipeVariation function.
 * - RecipeDetails - The return type for the getRecipeVariation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { RecipeDetails, RecipeDetailsSchema } from '../schemas';

export type { RecipeDetails };

const VaryRecipeInputSchema = z.object({
  originalRecipe: RecipeDetailsSchema.describe('The original recipe object to be varied.'),
  request: z.string().describe("The user's request for how to vary the recipe (e.g., 'make it vegetarian', 'for 2 people')."),
});
export type VaryRecipeInput = z.infer<typeof VaryRecipeInputSchema>;

export async function getRecipeVariation(
  input: VaryRecipeInput
): Promise<RecipeDetails> {
  return varyRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'varyRecipePrompt',
  input: { schema: VaryRecipeInputSchema },
  output: { schema: RecipeDetailsSchema },
  prompt: `You are a creative and helpful cooking assistant. A user wants to modify an existing recipe.
  
Here is the original recipe:
- Name: {{{originalRecipe.recipeName}}}
- Description: {{{originalRecipe.description}}}
- Prep Time: {{{originalRecipe.prepTime}}}
- Cook Time: {{{originalRecipe.cookTime}}}
- Servings: {{{originalRecipe.servings}}}
- Difficulty: {{{originalRecipe.difficulty}}}
- Ingredients:
{{#each originalRecipe.ingredients}}
  - {{{this}}}
{{/each}}
- Instructions:
{{#each originalRecipe.instructions}}
  - {{{this}}}
{{/each}}
- Nutrition: Calories: {{{originalRecipe.nutrition.calories}}}, Protein: {{{originalRecipe.nutrition.protein}}}, Carbs: {{{originalRecipe.nutrition.carbs}}}, Fat: {{{originalRecipe.nutrition.fat}}}

Here is the user's request for variation:
"{{{request}}}"

Please generate a new, complete version of the recipe based on this request. You must provide all the fields for the new recipe, including a new name if appropriate (e.g., "Lasaña de Champiñones (Versión Vegana)"). Adjust ingredients, instructions, cooking times, and nutritional information as needed.
The entire response, except for imageKeywords, must be in Spanish.
The imageKeywords should be two new keywords in English for a food photography image of the new dish.
`,
});

const varyRecipeFlow = ai.defineFlow(
  {
    name: 'varyRecipeFlow',
    inputSchema: VaryRecipeInputSchema,
    outputSchema: RecipeDetailsSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
