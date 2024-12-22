import React, { useState } from 'react';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { Button } from "@/components/ui/button";

const CATEGORIES = ['All', 'Food & Beverages', 'Household', 'Personal Care', 'Electronics', 'Pet Supplies'];

const DISTRIBUTORS = ['All', 'Walmart', 'Target', 'Costco', 'Whole Foods', 'Kroger'];

const PRODUCTS = [
  {
    name: 'Paper Towels (6 rolls)',
    price: {
      'Walmart': 5.99,
      'Target': 6.49,
      'Costco': 4.99,
    },
    category: 'Household',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80',
    barcode: '0123456789',
  },
  {
    name: 'Milk (1 Gallon)',
    price: {
      'Walmart': 3.49,
      'Target': 3.99,
      'Whole Foods': 4.49,
      'Kroger': 3.79,
    },
    category: 'Food & Beverages',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
    barcode: '1234567890',
  },
  {
    name: 'Toothpaste',
    price: {
      'Walmart': 2.99,
      'Target': 3.29,
      'Kroger': 2.89,
    },
    category: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    barcode: '2345678901',
  },
  {
    name: 'Dog Food (30 lbs)',
    price: {
      'Walmart': 24.99,
      'Target': 26.99,
      'Costco': 22.99,
    },
    category: 'Pet Supplies',
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
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Price Comparison Tracker</h1>
        
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