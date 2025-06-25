'use server';

import { generateRecipeSuggestions } from '@/ai/flows/generate-recipe-suggestions';
import { generateRecipeDetails, type RecipeDetails } from '@/ai/flows/generate-recipe-details';
import { getRecipeVariation as getRecipeVariationFlow, type VaryRecipeInput } from '@/ai/flows/vary-recipe-flow';

export async function getRecipeSuggestions(ingredients: string) {
    try {
        const result = await generateRecipeSuggestions({ ingredients });
        return { success: true, data: result.recipes };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'No pudimos generar sugerencias. Por favor, intenta de nuevo más tarde.' };
    }
}

export async function getRecipeDetails(recipeName: string) {
    try {
        const result = await generateRecipeDetails({ recipeName });
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'No pudimos obtener los detalles de la receta. Por favor, intenta de nuevo más tarde.' };
    }
}

export async function getRecipeVariation(originalRecipe: RecipeDetails, request: string): Promise<{ success: boolean; data?: RecipeDetails; error?: string }> {
    try {
        const result = await getRecipeVariationFlow({ originalRecipe, request });
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'No pudimos generar la variación. Por favor, intenta de nuevo más tarde.' };
    }
}
