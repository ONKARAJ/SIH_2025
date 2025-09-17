'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function RecipesSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Recipe route mappings
  const recipeRoutes = {
    'Handia': 'handia',
    'Pitha': 'pitha', 
    'Dhuska': 'dhuska',
    'Rugra Curry': 'rugra-curry',
    'Bamboo Shoot Curry': 'bamboo-shoot-curry',
    'Mahua Laddu': 'mahua-laddu',
    'Til Pitha': 'til-pitha'
  };

  const recipes = [
    {
      id: 1,
      name: 'Handia',
      category: 'beverages',
      difficulty: 'Medium',
      cookTime: '3-5 days',
      servings: '4-6',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80',
      description: 'Traditional fermented rice beer sacred to tribal communities, prepared during festivals and celebrations.',
      ingredients: [
        '2 cups cooked rice',
        'Handia tablet (fermentation starter)',
        'Clean water',
        'Earthen pot',
        'Clean cloth'
      ],
      instructions: [
        'Cook rice and let it cool completely',
        'Mix with crushed handia tablet',
        'Store in earthen pot for 3-5 days',
        'Strain and serve fresh'
      ],
      culturalSignificance: 'Handia is not just a beverage but a sacred drink offered to deities during Sarhul and other tribal festivals. It represents community bonding and spiritual connection.'
    },
    {
      id: 2,
      name: 'Pitha',
      category: 'snacks',
      difficulty: 'Easy',
      cookTime: '45 mins',
      servings: '6-8',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      description: 'Steamed rice dumplings with jaggery filling, a beloved festival sweet that brings families together.',
      ingredients: [
        '2 cups rice flour',
        '1 cup jaggery',
        '1 cup grated coconut',
        'Cardamom powder',
        'Banana leaves'
      ],
      instructions: [
        'Prepare rice flour dough',
        'Make jaggery-coconut filling',
        'Wrap in banana leaves',
        'Steam for 20-25 minutes'
      ],
      culturalSignificance: 'Pitha represents prosperity and is prepared during harvest festivals. The banana leaf wrapping is believed to add medicinal properties.'
    },
    {
      id: 3,
      name: 'Dhuska',
      category: 'main',
      difficulty: 'Medium',
      cookTime: '30 mins',
      servings: '4-5',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80',
      description: 'Crispy deep-fried pancakes made from rice and lentils, perfect with spicy chutneys and curries.',
      ingredients: [
        '1 cup rice (soaked)',
        '1/2 cup chana dal',
        'Green chilies',
        'Ginger-garlic paste',
        'Oil for frying'
      ],
      instructions: [
        'Grind soaked rice and dal',
        'Add spices to make batter',
        'Deep fry small portions',
        'Serve hot with chutney'
      ],
      culturalSignificance: 'Dhuska is a staple breakfast food that showcases the tribal technique of using local grains and minimal spices for maximum flavor.'
    },
    {
      id: 4,
      name: 'Rugra Curry',
      category: 'main',
      difficulty: 'Easy',
      cookTime: '25 mins',
      servings: '3-4',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80',
      description: 'Wild mushroom curry made with forest mushrooms, showcasing the connection between tribal cuisine and nature.',
      ingredients: [
        '200g wild mushrooms',
        'Onions and tomatoes',
        'Turmeric and red chili',
        'Mustard oil',
        'Local herbs'
      ],
      instructions: [
        'Clean and slice mushrooms',
        'Sauté with basic spices',
        'Add tomatoes and cook',
        'Garnish with local herbs'
      ],
      culturalSignificance: 'Rugra represents the sustainable foraging practices of tribal communities and their deep knowledge of edible forest produce.'
    },
    {
      id: 5,
      name: 'Bamboo Shoot Curry',
      category: 'main',
      difficulty: 'Medium',
      cookTime: '40 mins',
      servings: '4-6',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
      description: 'Tender bamboo shoots cooked with minimal spices, highlighting the natural flavors of this forest vegetable.',
      ingredients: [
        'Fresh bamboo shoots',
        'Mustard seeds',
        'Turmeric powder',
        'Green chilies',
        'Mustard oil'
      ],
      instructions: [
        'Clean and slice bamboo shoots',
        'Boil to remove bitterness',
        'Cook with spices',
        'Simmer until tender'
      ],
      culturalSignificance: 'This dish represents the tribal philosophy of using every part of nature sustainably and showcases their knowledge of forest vegetables.'
    },
    {
      id: 6,
      name: 'Mahua Laddu',
      category: 'desserts',
      difficulty: 'Easy',
      cookTime: '20 mins',
      servings: '8-10',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80',
      description: 'Sweet balls made from mahua flowers, a seasonal delicacy that celebrates the flowering of mahua trees.',
      ingredients: [
        'Dried mahua flowers',
        'Jaggery',
        'Ghee',
        'Cardamom powder',
        'Chopped nuts'
      ],
      instructions: [
        'Dry roast mahua flowers',
        'Melt jaggery to make syrup',
        'Mix and form into balls',
        'Garnish with nuts'
      ],
      culturalSignificance: 'Mahua laddu is prepared during the flowering season and represents the tribal connection to seasonal cycles and forest resources.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Recipes', icon: '🍽️' },
    { id: 'main', name: 'Main Dishes', icon: '🥘' },
    { id: 'snacks', name: 'Snacks & Sweets', icon: '🥟' },
    { id: 'beverages', name: 'Beverages', icon: '🍺' },
    { id: 'desserts', name: 'Desserts', icon: '🍯' }
  ];

  const filteredRecipes = activeCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <span className="text-2xl">👨‍🍳</span>
        </div>
        <h3 className="text-3xl font-bold">Traditional Recipes</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover the authentic flavors of Jharkhand through time-honored recipes passed down through generations. 
          Each dish tells a story of cultural heritage and connection to nature.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.id} href={`/cuisine-of-jharkhand/${recipeRoutes[recipe.name]}`}>
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          
            <div className="relative h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Difficulty Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
              </div>
              
              {/* Recipe Stats */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <span className="text-white text-xs">⏱️</span>
                  <span className="text-white text-xs">{recipe.cookTime}</span>
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <span className="text-white text-xs">👥</span>
                  <span className="text-white text-xs">{recipe.servings}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {recipe.name}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground capitalize">
                    {recipe.category.replace('_', ' ')}
                  </span>
                  <div className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                    View Recipe →
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured Recipe Banner */}
      <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80"
                alt="Featured Recipe"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <span>🏆</span>
                  Most Popular Recipe
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Handia - Sacred Rice Beer</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Learn to prepare the most sacred beverage of tribal communities. This fermented rice beer is not just a drink 
                but a spiritual offering that connects generations through its traditional preparation method.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm">⏱️</span>
                  <span className="text-sm text-muted-foreground">3-5 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">👥</span>
                  <span className="text-sm text-muted-foreground">4-6 servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">📊</span>
                  <span className="text-sm text-muted-foreground">Medium</span>
                </div>
              </div>
              <Link href={`/cuisine-of-jharkhand/${recipeRoutes['Handia']}`}>
                <Button className="group">
                  <span>📖</span>
                  Get Full Recipe
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export function ArtisanCrafts() {
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const artisans = [
    {
      id: 1,
      name: 'Ravi Mahato',
      age: 45,
      village: 'Jharia, Dhanbad',
      craft: 'Dokra Metal Work',
      category: 'metalwork',
      experience: '25 years',
      specialty: 'Bronze figurines and decorative items',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      story: 'Ravi learned the ancient art of Dokra from his grandfather. Using the lost-wax casting technique passed down through generations, he creates intricate bronze sculptures that tell stories of tribal life.',
      techniques: ['Lost-wax casting', 'Bronze alloying', 'Traditional molding', 'Finishing work'],
      achievements: [
        'National Handicrafts Award 2019',
        'Featured in India Craft Exhibition',
        'Trained 50+ apprentices'
      ],
      products: [
        { name: 'Tribal Horse Figurine', price: '₹2,500', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80' },
        { name: 'Dancing Girl Sculpture', price: '₹4,500', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80' },
        { name: 'Decorative Lamp', price: '₹1,800', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80' }
      ]
    },
    {
      id: 2,
      name: 'Sulochana Devi',
      age: 52,
      village: 'Hazaribagh',
      craft: 'Sohrai Wall Painting',
      category: 'painting',
      experience: '30 years',
      specialty: 'Traditional wall art and canvas paintings',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      story: 'Sulochana is a master of Sohrai art, the traditional wall painting done during harvest festivals. She has elevated this ancient art form to contemporary canvases while preserving its sacred meanings.',
      techniques: ['Natural pigment preparation', 'Finger painting', 'Geometric patterns', 'Symbolic representation'],
      achievements: [
        'Shilp Guru Award 2020',
        'Solo exhibitions in Delhi and Mumbai',
        'UNESCO recognition for cultural preservation'
      ],
      products: [
        { name: 'Harvest Festival Canvas', price: '₹8,000', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
        { name: 'Nature Spirits Painting', price: '₹12,000', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
        { name: 'Miniature Art Set', price: '₹3,500', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' }
      ]
    },
    {
      id: 3,
      name: 'Budhan Mahli',
      age: 38,
      village: 'Gumla',
      craft: 'Bamboo Crafts',
      category: 'bamboo',
      experience: '20 years',
      specialty: 'Functional and decorative bamboo items',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
      story: 'Budhan transforms humble bamboo into works of art. His sustainable approach to craft-making reflects the tribal wisdom of living in harmony with nature.',
      techniques: ['Bamboo splitting', 'Weaving patterns', 'Natural preservation', 'Tool making'],
      achievements: [
        'State Handicrafts Excellence Award',
        'Eco-friendly Product Innovation Award',
        'Featured in National Geographic'
      ],
      products: [
        { name: 'Traditional Baskets Set', price: '₹1,200', image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&q=80' },
        { name: 'Bamboo Wind Chimes', price: '₹800', image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&q=80' },
        { name: 'Decorative Room Divider', price: '₹5,500', image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&q=80' }
      ]
    },
    {
      id: 4,
      name: 'Kamala Singh',
      age: 41,
      village: 'Khunti',
      craft: 'Handloom Weaving',
      category: 'textile',
      experience: '18 years',
      specialty: 'Traditional fabrics and tribal motifs',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      story: 'Kamala preserves the ancient weaving traditions of Jharkhand tribes. Her handwoven fabrics carry the stories and symbols of her ancestors.',
      techniques: ['Handloom weaving', 'Natural dyeing', 'Pattern creation', 'Traditional motifs'],
      achievements: [
        'Master Weaver Recognition 2021',
        'Fashion Week showcase in Bangalore',
        'Women Entrepreneur Award'
      ],
      products: [
        { name: 'Tribal Pattern Saree', price: '₹4,200', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
        { name: 'Handwoven Dupatta', price: '₹1,800', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
        { name: 'Cotton Fabric by Meter', price: '₹450', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' }
      ]
    },
    {
      id: 5,
      name: 'Somra Oraon',
      age: 55,
      village: 'Simdega',
      craft: 'Terracotta Pottery',
      category: 'pottery',
      experience: '35 years',
      specialty: 'Decorative and functional pottery',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      story: 'Somra shapes clay into beautiful pottery using techniques unchanged for centuries. His work bridges the gap between utility and artistry.',
      techniques: ['Wheel throwing', 'Hand building', 'Natural glazing', 'Kiln firing'],
      achievements: [
        'Traditional Pottery Master Award',
        'Cultural Heritage Preservation Honor',
        'Museum collection acquisitions'
      ],
      products: [
        { name: 'Decorative Water Pot', price: '₹900', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' },
        { name: 'Traditional Cooking Vessel', price: '₹650', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' },
        { name: 'Artistic Vase Collection', price: '₹2,200', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' }
      ]
    },
    {
      id: 6,
      name: 'Jaidev Murmu',
      age: 47,
      village: 'Dumka',
      craft: 'Stone Carving',
      category: 'stone',
      experience: '28 years',
      specialty: 'Religious sculptures and architectural elements',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80',
      story: 'Jaidev transforms rough stone into intricate sculptures. His work adorns temples and homes, keeping alive the ancient tradition of stone carving.',
      techniques: ['Chiseling', 'Relief carving', 'Polishing', 'Detailing work'],
      achievements: [
        'Master Sculptor Award 2018',
        'Temple restoration projects',
        'International stone carving festival participant'
      ],
      products: [
        { name: 'Ganesha Sculpture', price: '₹6,500', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80' },
        { name: 'Decorative Panel', price: '₹8,900', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80' },
        { name: 'Garden Statue', price: '₹12,000', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Crafts', icon: '🎨' },
    { id: 'metalwork', name: 'Metal Work', icon: '⚒️' },
    { id: 'painting', name: 'Painting', icon: '🎭' },
    { id: 'bamboo', name: 'Bamboo Crafts', icon: '🎋' },
    { id: 'textile', name: 'Textiles', icon: '🧵' },
    { id: 'pottery', name: 'Pottery', icon: '🏺' },
    { id: 'stone', name: 'Stone Work', icon: '🪨' }
  ];

  const filteredArtisans = selectedCategory === 'all' 
    ? artisans 
    : artisans.filter(artisan => artisan.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <span className="text-2xl">👨‍🎨</span>
        </div>
        <h3 className="text-3xl font-bold">Master Artisans of Jharkhand</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Meet the skilled craftspeople who preserve and practice the traditional arts of Jharkhand. 
          Each artisan brings generations of knowledge and cultural heritage to their craft.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtisans.map((artisan) => (
          <Card
            key={artisan.id}
            className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            onClick={() => setSelectedArtisan(artisan)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Craft Badge */}
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-primary-foreground">
                  {artisan.craft}
                </Badge>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <span className="text-white text-xs font-medium">{artisan.experience}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {artisan.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {artisan.village} • Age {artisan.age}
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {artisan.specialty}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{artisan.achievements.length}</span> Awards
                  </div>
                  <div className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                    View Profile →
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Artisan Profile Modal */}
      {selectedArtisan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedArtisan(null)}>
          <div className="relative max-h-[90vh] max-w-6xl w-full overflow-y-auto bg-white rounded-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedArtisan(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Artisan Header */}
            <div className="relative h-64">
              <img
                src={selectedArtisan.image}
                alt={selectedArtisan.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedArtisan.name}</h2>
                <div className="flex items-center gap-4 text-white">
                  <Badge className="bg-primary text-primary-foreground">
                    {selectedArtisan.craft}
                  </Badge>
                  <span className="text-sm">{selectedArtisan.village}</span>
                  <span className="text-sm">{selectedArtisan.experience}</span>
                </div>
              </div>
            </div>
            
            {/* Artisan Content */}
            <div className="p-6 space-y-6">
              {/* Story */}
              <div>
                <h3 className="text-xl font-bold mb-3">Artisan's Story</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedArtisan.story}</p>
              </div>
              
              {/* Techniques */}
              <div>
                <h3 className="text-xl font-bold mb-3">Techniques & Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedArtisan.techniques.map((technique, index) => (
                    <Badge key={index} variant="outline" className="justify-center">
                      {technique}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Achievements */}
              <div>
                <h3 className="text-xl font-bold mb-3">Achievements & Recognition</h3>
                <div className="space-y-2">
                  {selectedArtisan.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Products */}
              <div>
                <h3 className="text-xl font-bold mb-3">Featured Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedArtisan.products.map((product, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-32">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                        <p className="text-primary font-bold">{product.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export function TravelTips() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Cultural Travel Tips</h3>
        <p className="text-muted-foreground mb-6">
          Essential information for experiencing festivals and cultural events respectfully and safely.
        </p>
        <Button>View Guidelines</Button>
      </CardContent>
    </Card>
  );
}

export function InteractiveMap() {
  return (
    <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Interactive Cultural Map</h3>
        <p className="text-muted-foreground">Festival locations and cultural hotspots across Jharkhand</p>
      </div>
    </div>
  );
}

export function MultimediaGallery() {
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
      title: 'Sarhul Festival',
      description: 'Tribal communities celebrating the spring festival with traditional dances',
      category: 'Festivals'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      title: 'Dokra Metal Craft',
      description: 'Ancient lost-wax casting technique creating beautiful bronze sculptures',
      category: 'Crafts'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
      title: 'Jhumar Dance',
      description: 'Traditional folk dance performed during harvest celebrations',
      category: 'Dance'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      title: 'Traditional Music',
      description: 'Tribal musicians playing indigenous instruments',
      category: 'Music'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80',
      title: 'Tribal Cuisine',
      description: 'Traditional organic cooking methods and local ingredients',
      category: 'Cuisine'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
      title: 'Bamboo Crafts',
      description: 'Sustainable handicrafts made from locally sourced bamboo',
      category: 'Crafts'
    }
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [documentaryUrl, setDocumentaryUrl] = useState('');
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const openVideoModal = (videoUrl: string) => {
    setDocumentaryUrl(videoUrl);
    setIsVideoModalOpen(true);
    setVideoLoading(true);
    setVideoError(false);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setDocumentaryUrl('');
    setVideoLoading(true);
    setVideoError(false);
  };

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVideoModalOpen) {
        closeVideoModal();
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  return (
    <div className="space-y-8">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => openModal(item)}
          >
            <div className="relative h-64 w-full">
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              
              {/* Play Icon for Videos */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Story */}
      <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full">
              <img
                src="https://st.adda247.com/https://wpassets.adda247.com/wp-content/uploads/multisite/sites/5/2022/04/07080859/Sarhul-Festival-04-1.jpg"
                alt="Featured Story"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Featured Story
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold">
                The Sacred Groves of Sarhul
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Experience the most sacred festival of Jharkhand's tribal communities, where nature worship, 
                community bonding, and ancient traditions come together in a celebration of life and renewal.
              </p>
              <Button 
                className="group" 
                onClick={() => openVideoModal('/videos/sarhul-documentary.mp4')}
              >
                Watch Documentary
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">500+</div>
          <div className="text-sm text-muted-foreground">Photos</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">50+</div>
          <div className="text-sm text-muted-foreground">Videos</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">25+</div>
          <div className="text-sm text-muted-foreground">Stories</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">10+</div>
          <div className="text-sm text-muted-foreground">Documentaries</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeModal}>
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/40"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative h-96">
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="mb-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {selectedItem.category}
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold">{selectedItem.title}</h3>
              <p className="text-muted-foreground">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal for Documentary */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeVideoModal}>
          <div className="relative max-h-[90vh] max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideoModal}
              className="absolute -right-4 -top-4 z-10 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl min-h-[400px] flex items-center justify-center">
              {videoLoading && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading documentary...</p>
                  </div>
                </div>
              )}
              
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                  <div className="text-center text-white p-8">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Video Not Available</h3>
                    <p className="text-gray-300 mb-4">
                      The documentary video file could not be found.<br />
                      Please add <code className="bg-gray-800 px-2 py-1 rounded">sarhul-documentary.mp4</code> to the videos folder.
                    </p>
                    <button 
                      onClick={closeVideoModal}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              
              <video
                src={documentaryUrl}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh] object-contain"
                controlsList="nodownload"
                onLoadStart={() => {
                  setVideoLoading(true);
                  setVideoError(false);
                }}
                onCanPlay={() => {
                  setVideoLoading(false);
                }}
                onError={(e) => {
                  console.error('Video failed to load:', documentaryUrl);
                  setVideoLoading(false);
                  setVideoError(true);
                }}
              >
                <source src={documentaryUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  The Sacred Groves of Sarhul - Documentary
                </h3>
                <p className="text-gray-200 text-sm">
                  Discover the spiritual significance and cultural importance of Sarhul festival in Jharkhand's tribal communities.
                </p>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-4 text-center">
              <p className="text-white/80 text-sm">
                Press ESC or click outside to close • Duration: Documentary length varies
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
