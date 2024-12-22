import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface FoodCardProps {
  name: string;
  prices: Record<string, number>;
  selectedDistributor: string;
  category: string;
  image: string;
}

const FoodCard = ({ name, prices, selectedDistributor, category, image }: FoodCardProps) => {
  const getBestPrice = () => {
    return Math.min(...Object.values(prices));
  };

  const getDisplayPrices = () => {
    if (selectedDistributor === 'All') {
      return prices;
    }
    return prices[selectedDistributor] ? { [selectedDistributor]: prices[selectedDistributor] } : {};
  };

  const displayPrices = getDisplayPrices();

  if (selectedDistributor !== 'All' && !prices[selectedDistributor]) {
    return null;
  }

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
          <div className="mt-2 space-y-1">
            {Object.entries(displayPrices).map(([store, price]) => (
              <div key={store} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{store}</span>
                <span className={`text-lg font-semibold ${price === getBestPrice() ? 'text-green-600' : ''}`}>
                  {price.toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;