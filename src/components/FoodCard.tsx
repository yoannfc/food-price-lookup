import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

interface FoodCardProps {
  name: string;
  prices: Record<string, number>;
  selectedDistributor: string;
  category: string;
  image: string;
}

// Store addresses mapping
const STORE_ADDRESSES = {
  'Carrefour': '4 Rue Camille Desmoulins, 75011 Paris',
  'E.Leclerc': '15 Avenue des Champs-Élysées, 75008 Paris',
  'Auchan': '23 Boulevard de la Madeleine, 75001 Paris',
  'Intermarché': '89 Rue de Rivoli, 75004 Paris',
  'Casino': '44 Rue de la Pompe, 75016 Paris'
};

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

  const getGoogleMapsLink = (store: string) => {
    const address = STORE_ADDRESSES[store];
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
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
              <div key={store} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{store}</span>
                  <span className={`text-lg font-semibold ${price === getBestPrice() ? 'text-green-600' : ''}`}>
                    {price.toFixed(2)} €
                  </span>
                </div>
                <a 
                  href={getGoogleMapsLink(store)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <ExternalLink size={12} />
                  {STORE_ADDRESSES[store]}
                </a>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;