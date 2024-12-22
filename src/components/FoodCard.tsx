import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface FoodCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
}

const FoodCard = ({ name, price, category, image }: FoodCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <CardContent className="p-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-sm text-primary uppercase tracking-wide">{category}</p>
          <h3 className="font-semibold text-lg mt-1">{name}</h3>
          <p className="text-accent text-xl font-bold mt-2">
            ${price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;