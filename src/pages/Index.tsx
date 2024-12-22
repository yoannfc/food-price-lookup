import React, { useState } from 'react';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { Button } from "@/components/ui/button";

const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Grains'];

const FOOD_ITEMS = [
  {
    name: 'Bananas',
    price: 0.99,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=500&q=80',
    barcode: '0123456789',
  },
  {
    name: 'Milk (1 Gallon)',
    price: 3.99,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
    barcode: '1234567890',
  },
  {
    name: 'Bread',
    price: 2.49,
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&q=80',
    barcode: '2345678901',
  },
  {
    name: 'Chicken Breast',
    price: 5.99,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&q=80',
    barcode: '3456789012',
  },
  {
    name: 'Carrots',
    price: 1.49,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=500&q=80',
    barcode: '4567890123',
  },
  {
    name: 'Eggs (Dozen)',
    price: 3.29,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&q=80',
    barcode: '5678901234',
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Food Price Tracker</h1>
        
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <div className="flex gap-2 overflow-x-auto py-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.name}
              name={item.name}
              price={item.price}
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