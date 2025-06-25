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
import { Carrot, ListOrdered, UtensilsCrossed } from 'lucide-react';

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
                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
                     <Image
                      src="https://placehold.co/600x400.png"
                      alt={recipe.recipeName}
                      width={600}
                      height={400}
                      className="w-full object-cover"
                      data-ai-hint={recipe.imageKeywords}
                    />
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


function RecipeDetailsSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full rounded-lg" />
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
                <div className="space-y-4">
                   <Skeleton className="h-12 w-full" />
                   <Skeleton className="h-12 w-full" />
                   <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    )
}
