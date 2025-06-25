'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoaderCircle, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { getRecipeSuggestions, getRecipeDetails, getRecipeVariation } from './actions';
import { type RecipeDetails } from '@/ai/flows/generate-recipe-details';
import RecipeCard from '@/components/recipe-card';
import RecipeDetailsDialog from '@/components/recipe-details-dialog';
import Logo from '@/components/icons/logo';

const formSchema = z.object({
  ingredients: z
    .string()
    .min(10, { message: 'Por favor, introduce al menos 10 caracteres.' })
    .max(500, { message: 'Por favor, limita los ingredientes a 500 caracteres.' }),
});

export default function Home() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(
    null
  );
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isVarying, setIsVarying] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoadingSuggestions(true);
    setSuggestions([]);
    setRecipeDetails(null);
    setSelectedRecipe(null);
    const result = await getRecipeSuggestions(values.ingredients);
    if (result.success && result.data) {
      setSuggestions(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsLoadingSuggestions(false);
  }

  async function handleSelectRecipe(recipeName: string) {
    setSelectedRecipe(recipeName);
    setIsLoadingDetails(true);
    setRecipeDetails(null);
    const result = await getRecipeDetails(recipeName);
    if (result.success && result.data) {
      setRecipeDetails(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      setSelectedRecipe(null);
    }
    setIsLoadingDetails(false);
  }
  
  async function handleVaryRecipe(request: string) {
    if (!recipeDetails) return;
    setIsVarying(true);
    const result = await getRecipeVariation(recipeDetails, request);
    if (result.success && result.data) {
      setRecipeDetails(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsVarying(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Mi Cocina Fácil
          </h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            ¿Qué tienes en tu despensa?
          </h2>
          <p className="text-muted-foreground mb-8">
            Escribe los ingredientes que tienes a mano y te daremos algunas ideas deliciosas.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Ingredientes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: pollo, arroz, tomates, cebolla, ajo..."
                        className="resize-none text-base min-h-[120px] shadow-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" disabled={isLoadingSuggestions}>
                {isLoadingSuggestions ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Sparkles className="mr-2" />
                )}
                Sugerir Recetas
              </Button>
            </form>
          </Form>
        </div>

        {isLoadingSuggestions && (
          <div className="text-center py-16">
            <LoaderCircle className="w-12 h-12 mx-auto animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Buscando recetas...</p>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              ¡Aquí tienes algunas ideas!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suggestions.map((recipe, index) => (
                <RecipeCard
                  key={recipe}
                  recipeName={recipe}
                  onClick={() => handleSelectRecipe(recipe)}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        <p>
          Creado con ❤️ para los amantes de la cocina.
        </p>
      </footer>
      <RecipeDetailsDialog
        open={!!selectedRecipe}
        onOpenChange={(isOpen) => !isOpen && setSelectedRecipe(null)}
        recipe={recipeDetails}
        isLoading={isLoadingDetails}
        onVary={handleVaryRecipe}
        isVarying={isVarying}
      />
    </div>
  );
}
