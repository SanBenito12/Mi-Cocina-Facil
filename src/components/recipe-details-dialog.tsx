'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { type RecipeDetails } from '@/ai/flows/generate-recipe-details';
import { Carrot, ListOrdered, Clock, Users, Flame, HeartPulse } from 'lucide-react';
import React from 'react';

interface RecipeDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: RecipeDetails | null;
  isLoading: boolean;
}

export default function RecipeDetailsDialog({
  open,
  onOpenChange,
  recipe,
  isLoading,
}: RecipeDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            {isLoading && <RecipeDetailsSkeleton />}
            {recipe && !isLoading && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold mb-4 text-primary">
                    {recipe.recipeName}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-8">
                  <div className="rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
                     <Image
                      src={`https://placehold.co/600x400.png`}
                      alt={recipe.recipeName}
                      width={600}
                      height={400}
                      className="w-full object-cover"
                      data-ai-hint={recipe.imageKeywords}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <InfoChip icon={Clock} label="Preparación" value={recipe.prepTime} />
                    <InfoChip icon={Clock} label="Cocción" value={recipe.cookTime} />
                    <InfoChip icon={Users} label="Porciones" value={recipe.servings} />
                    <InfoChip icon={Flame} label="Dificultad" value={recipe.difficulty} />
                  </div>

                  <p className="text-lg text-muted-foreground">{recipe.description}</p>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                        <Carrot className="text-primary"/> Ingredientes
                    </h3>
                    <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 bg-muted/50 p-4 rounded-lg">
                      {recipe.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                        <HeartPulse className="text-primary"/> Información Nutricional
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/50 p-4 rounded-lg">
                        <NutritionItem label="Calorías" value={recipe.nutrition.calories} />
                        <NutritionItem label="Proteína" value={recipe.nutrition.protein} />
                        <NutritionItem label="Carbs" value={recipe.nutrition.carbs} />
                        <NutritionItem label="Grasa" value={recipe.nutrition.fat} />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">Valores estimados por porción.</p>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-2xl font-semibold flex items-center gap-2">
                        <ListOrdered className="text-primary"/> Preparación
                    </h3>
                    <ol className="space-y-4">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                            {index + 1}
                          </div>
                          <p className="flex-1 pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function InfoChip({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
    return (
        <div className="bg-muted/50 p-3 rounded-lg flex flex-col items-center justify-center gap-1">
            <Icon className="w-6 h-6 text-primary" />
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
            <p className="text-base font-bold">{value}</p>
        </div>
    );
}

function NutritionItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="text-center">
            <p className="font-bold text-lg">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    );
}

function RecipeDetailsSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full rounded-lg" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
            </div>

            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </div>
            </div>

            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                </div>
            </div>

             <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="space-y-4">
                   <Skeleton className="h-12 w-full" />
                   <Skeleton className="h-12 w-full" />
                   <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    )
}
