'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CookingPot } from 'lucide-react';
import React from 'react';

interface RecipeCardProps {
  recipeName: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function RecipeCard({ recipeName, onClick, className, style }: RecipeCardProps) {
  return (
    <Card
      className={`cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col ${className}`}
      style={style}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-start gap-2">
          <CookingPot className="w-6 h-6 shrink-0 mt-1 text-primary" />
          <span>{recipeName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
          <Image
            src="https://placehold.co/600x400.png"
            alt={recipeName}
            width={600}
            height={400}
            className="w-full h-full object-cover"
            data-ai-hint="recipe food"
          />
        </div>
      </CardContent>
    </Card>
  );
}
