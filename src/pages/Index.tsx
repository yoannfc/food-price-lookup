import React, { useState } from 'react';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { Button } from "@/components/ui/button";

const CATEGORIES = ['All', 'Alimentation', 'Maison', 'Hygiène', 'Électronique', 'Animalerie'];

const DISTRIBUTORS = ['All', 'Carrefour', 'E.Leclerc', 'Auchan', 'Intermarché', 'Casino'];

const PRODUCTS = [
  {
    name: 'Essuie-tout (6 rouleaux)',
    price: {
      'Carrefour': 4.99,
      'E.Leclerc': 4.49,
      'Auchan': 4.79,
    },
    category: 'Maison',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80',
    barcode: '0123456789',
  },
  {
    name: 'Lait (1 Litre)',
    price: {
      'Carrefour': 1.15,
      'E.Leclerc': 0.99,
      'Intermarché': 1.09,
      'Casino': 1.19,
    },
    category: 'Alimentation',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
    barcode: '1234567890',
  },
  {
    name: 'Dentifrice',
    price: {
      'Carrefour': 2.49,
      'E.Leclerc': 2.29,
      'Casino': 2.59,
    },
    category: 'Hygiène',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    barcode: '2345678901',
  },
  {
    name: 'Croquettes pour chien (10 kg)',
    price: {
      'Carrefour': 19.99,
      'E.Leclerc': 18.99,
      'Auchan': 20.49,
    },
    category: 'Animalerie',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80',
    barcode: '3456789012',
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistributor, setSelectedDistributor] = useState('All');

  const filteredItems = PRODUCTS.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Comparateur de Prix</h1>
        
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <div className="flex flex-col gap-4 py-6">
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {DISTRIBUTORS.map((distributor) => (
              <Button
                key={distributor}
                variant={selectedDistributor === distributor ? "default" : "outline"}
                onClick={() => setSelectedDistributor(distributor)}
                className="whitespace-nowrap"
              >
                {distributor}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.name}
              name={item.name}
              prices={item.price}
              selectedDistributor={selectedDistributor}
              category={item.category}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;