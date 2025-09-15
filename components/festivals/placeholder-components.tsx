'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Artisan Crafts</h3>
        <p className="text-muted-foreground mb-6">
          Meet master craftspeople and learn about traditional art forms like Dokra metalwork, basket weaving, and textile arts.
        </p>
        <Button>Meet Artisans</Button>
      </CardContent>
    </Card>
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

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

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
              <Button className="group">
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
    </div>
  );
}
