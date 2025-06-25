import { z } from 'genkit';

export const RecipeDetailsSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  description: z
    .string()
    .describe('A short, appealing description of the recipe.'),
  prepTime: z
    .string()
    .describe('The preparation time for the recipe (e.g., "15 min").'),
  cookTime: z
    .string()
    .describe('The cooking time for the recipe (e.g., "30 min").'),
  servings: z
    .string()
    .describe('The number of servings the recipe makes (e.g., "4 porciones").'),
  difficulty: z
    .string()
    .describe('The difficulty level of the recipe (Fácil, Intermedio, Difícil).'),
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients required for the recipe.'),
  instructions: z
    .array(z.string())
    .describe('The step-by-step cooking instructions.'),
  nutrition: z
    .object({
      calories: z
        .string()
        .describe('Estimated calories per serving (e.g., "450 kcal").'),
      protein: z
        .string()
        .describe('Estimated protein per serving in grams (e.g., "30g").'),
      carbs: z
        .string()
        .describe('Estimated carbohydrates per serving in grams (e.g., "40g").'),
      fat: z
        .string()
        .describe('Estimated fat per serving in grams (e.g., "15g").'),
    })
    .describe('Nutritional information per serving.'),
  imageKeywords: z
    .string()
    .describe(
      'Two keywords in English for a food photography image of the dish. e.g., "tacos pastor", "chocolate cake"'
    ),
});
export type RecipeDetails = z.infer<typeof RecipeDetailsSchema>;
