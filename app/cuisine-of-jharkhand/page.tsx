'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, ChefHat, Leaf, Star, ArrowRight, Heart, BookOpen, Utensils } from 'lucide-react'
import Image from 'next/image'

export default function CuisineOfJharkhandPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    )
  }

  const traditionalRecipes = [
    {
      id: 'handia',
      name: 'Handia',
      category: 'beverages',
      difficulty: 'Medium',
      cookTime: '3-5 days',
      prepTime: '2 hours',
      servings: '4-6',
      image: 'https://lh4.googleusercontent.com/proxy/-vfnYUrHJgKOz8Dtv8vY3y_KQXe4aeyFQPhvUITJ4KVWjdDep5YRGJaz7oiYAXiVYsvLCaGS988T4aaPxXyH6VC6hZf-rEB-D7jptyQ',
      description: 'Traditional fermented rice beer that is sacred to tribal communities. This mildly alcoholic beverage is prepared during festivals and special occasions, symbolizing community bonding and spiritual connection.',
      culturalSignificance: 'Handia is not just a beverage but a sacred drink offered to deities during Sarhul and other tribal festivals. It represents community bonding, hospitality, and spiritual connection with ancestors.',
      healthBenefits: ['Rich in probiotics', 'Aids digestion', 'Natural source of B vitamins', 'Low alcohol content'],
      ingredients: [
        { item: 'Cooked rice', quantity: '2 cups', note: 'Preferably day-old rice' },
        { item: 'Handia tablet (fermentation starter)', quantity: '1 piece', note: 'Available at local markets' },
        { item: 'Clean water', quantity: '4-5 cups', note: 'Filtered or boiled water' },
        { item: 'Earthen pot', quantity: '1 large', note: 'Traditional clay pot preferred' },
        { item: 'Clean cloth', quantity: '1 piece', note: 'For covering the pot' },
        { item: 'Jaggery (optional)', quantity: '2 tbsp', note: 'For additional sweetness' }
      ],
      detailedSteps: [
        {
          step: 1,
          title: 'Prepare the Rice Base',
          description: 'Cook rice and let it cool completely to room temperature. The rice should be slightly overcooked and sticky.',
          time: '30 minutes',
          tips: ['Use broken rice or old rice for better fermentation', 'Ensure rice is completely cooled before proceeding']
        },
        {
          step: 2,
          title: 'Crush the Handia Tablet',
          description: 'Take the handia tablet (fermentation starter) and crush it into fine powder using a mortar and pestle.',
          time: '5 minutes',
          tips: ['Handia tablets contain natural yeast and herbs', 'Store unused tablets in a dry place']
        },
        {
          step: 3,
          title: 'Mix Rice and Starter',
          description: 'Mix the cooled rice with crushed handia tablet thoroughly. Add a little water if the mixture is too dry.',
          time: '10 minutes',
          tips: ['Mix gently to avoid breaking rice grains', 'The mixture should be moist but not watery']
        },
        {
          step: 4,
          title: 'Fermentation Process',
          description: 'Transfer the mixture to a clean earthen pot. Cover with a clean cloth and let it ferment for 3-5 days.',
          time: '3-5 days',
          tips: ['Keep in a warm, dark place', 'Check daily for fermentation progress', 'Mixture will develop a sweet-sour smell']
        },
        {
          step: 5,
          title: 'Strain and Serve',
          description: 'After fermentation, add clean water and strain through a fine cloth. The liquid is your handia.',
          time: '15 minutes',
          tips: ['Taste and adjust sweetness with jaggery if needed', 'Serve immediately for best taste']
        }
      ],
      servingSuggestions: [
        'Serve in traditional clay cups for authentic experience',
        'Best enjoyed with tribal snacks like pitha or dhuska',
        'Consume within 24 hours of straining'
      ]
    },
    {
      id: 'pitha',
      name: 'Pitha',
      category: 'snacks',
      difficulty: 'Easy',
      cookTime: '45 minutes',
      prepTime: '30 minutes',
      servings: '6-8',
      image: 'https://masalachilli.com/wp-content/uploads/2018/07/dal-pitha-10.jpg',
      description: 'Steamed rice dumplings with sweet jaggery filling, wrapped in banana leaves. A beloved festival sweet that brings families together during celebrations.',
      culturalSignificance: 'Pitha represents prosperity and abundance. It is prepared during harvest festivals and special occasions. The banana leaf wrapping is believed to add medicinal properties and enhance the aroma.',
      healthBenefits: ['Gluten-free', 'Rich in carbohydrates', 'Natural sweeteners', 'Easy to digest'],
      ingredients: [
        { item: 'Rice flour', quantity: '2 cups', note: 'Freshly ground preferred' },
        { item: 'Jaggery', quantity: '1 cup', note: 'Grated or chopped' },
        { item: 'Grated coconut', quantity: '1 cup', note: 'Fresh coconut' },
        { item: 'Cardamom powder', quantity: '1 tsp', note: 'Freshly ground' },
        { item: 'Salt', quantity: '1/2 tsp', note: 'For the dough' },
        { item: 'Banana leaves', quantity: '8-10 pieces', note: 'Cut into squares' },
        { item: 'Hot water', quantity: '1.5 cups', note: 'For making dough' }
      ],
      detailedSteps: [
        {
          step: 1,
          title: 'Prepare the Filling',
          description: 'Heat a pan and add grated jaggery. Cook until it melts and becomes syrupy. Add coconut and cardamom powder.',
          time: '15 minutes',
          tips: ['Stir continuously to prevent burning', 'Cook until mixture thickens and leaves the sides of pan']
        },
        {
          step: 2,
          title: 'Make the Dough',
          description: 'Mix rice flour with salt. Gradually add hot water while mixing to form a smooth, pliable dough.',
          time: '10 minutes',
          tips: ['Add water slowly to avoid lumps', 'Knead while still warm for smooth texture']
        },
        {
          step: 3,
          title: 'Prepare Banana Leaves',
          description: 'Clean banana leaves and cut into squares. Briefly blanch them in hot water to make them pliable.',
          time: '10 minutes',
          tips: ['Remove any thick veins from leaves', 'Pat dry after blanching']
        },
        {
          step: 4,
          title: 'Shape the Pitha',
          description: 'Take a portion of dough, flatten it, place filling in center, and wrap. Place on banana leaf and fold to enclose.',
          time: '20 minutes',
          tips: ['Seal edges properly to prevent opening during cooking', 'Don\'t overfill to avoid bursting']
        },
        {
          step: 5,
          title: 'Steam the Pitha',
          description: 'Steam the wrapped pitha in a steamer for 20-25 minutes until cooked through.',
          time: '25 minutes',
          tips: ['Don\'t open steamer frequently', 'Check doneness by inserting a toothpick']
        }
      ],
      servingSuggestions: [
        'Best served warm, immediately after steaming',
        'Can be stored for 2-3 days and reheated',
        'Pairs well with milk or tea'
      ]
    },
    {
      id: 'dhuska',
      name: 'Dhuska',
      category: 'main',
      difficulty: 'Medium',
      cookTime: '30 minutes',
      prepTime: '4 hours',
      servings: '4-5',
      image: 'https://thejoharjharkhand.com/wp-content/uploads/2024/12/Dhuska.webp',
      description: 'Crispy deep-fried pancakes made from rice and lentils. This popular breakfast dish is perfect with spicy chutneys and curries, representing the tribal technique of minimal spices for maximum flavor.',
      culturalSignificance: 'Dhuska is a staple breakfast food that showcases tribal culinary wisdom. It demonstrates the art of using local grains and minimal spices to create flavorful, nutritious meals.',
      healthBenefits: ['High protein from lentils', 'Complex carbohydrates', 'Iron and folate rich', 'Probiotic benefits from fermentation'],
      ingredients: [
        { item: 'Rice', quantity: '1 cup', note: 'Soaked for 4 hours' },
        { item: 'Chana dal', quantity: '1/2 cup', note: 'Soaked for 4 hours' },
        { item: 'Green chilies', quantity: '3-4', note: 'Adjust to taste' },
        { item: 'Ginger', quantity: '1 inch piece', note: 'Fresh ginger' },
        { item: 'Garlic', quantity: '3-4 cloves', note: 'Optional' },
        { item: 'Salt', quantity: 'to taste', note: '' },
        { item: 'Oil', quantity: 'for deep frying', note: 'Mustard oil preferred' },
        { item: 'Onion', quantity: '1 small', note: 'Finely chopped (optional)' }
      ],
      detailedSteps: [
        {
          step: 1,
          title: 'Soak the Grains',
          description: 'Soak rice and chana dal separately in water for at least 4 hours or overnight for better fermentation.',
          time: '4+ hours',
          tips: ['Use enough water to cover completely', 'Change water if soaking for more than 8 hours']
        },
        {
          step: 2,
          title: 'Prepare the Batter',
          description: 'Drain and grind rice and dal together with green chilies and ginger to make a coarse batter.',
          time: '15 minutes',
          tips: ['Don\'t make the batter too smooth', 'Add minimal water while grinding', 'Batter should be thick and coarse']
        },
        {
          step: 3,
          title: 'Season and Rest',
          description: 'Add salt to the batter and mix well. Let it rest for 2-3 hours for better fermentation and taste.',
          time: '3 hours',
          tips: ['Cover and keep in a warm place', 'Batter will slightly increase in volume', 'Add chopped onions if using']
        },
        {
          step: 4,
          title: 'Heat the Oil',
          description: 'Heat oil in a deep pan or kadai to medium-hot temperature. Oil should be hot enough that a drop of batter sizzles immediately.',
          time: '5 minutes',
          tips: ['Maintain medium heat to ensure even cooking', 'Too hot oil will brown outside while inside remains raw']
        },
        {
          step: 5,
          title: 'Fry the Dhuska',
          description: 'Drop spoonfuls of batter into hot oil and fry until golden brown and crispy on all sides.',
          time: '15 minutes',
          tips: ['Fry in batches to avoid overcrowding', 'Turn carefully to maintain shape', 'Drain on paper towels']
        }
      ],
      servingSuggestions: [
        'Serve hot with green chutney or tomato chutney',
        'Pairs excellently with aloo curry or dal',
        'Can be served as breakfast, snack, or light meal'
      ]
    },
    {
      id: 'rugra-curry',
      name: 'Rugra Curry',
      category: 'main',
      difficulty: 'Easy',
      cookTime: '25 minutes',
      prepTime: '15 minutes',
      servings: '3-4',
      image: 'https://i.ytimg.com/vi/lunQeSDwCUI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBM-dGXET3l_OeWLX9Bl74Oj3Ksww',
      description: 'Wild mushroom curry made with forest mushrooms, showcasing the deep connection between tribal cuisine and nature. This earthy, flavorful dish represents sustainable foraging practices.',
      culturalSignificance: 'Rugra represents the sustainable foraging practices of tribal communities and their deep knowledge of edible forest produce. It showcases the harmony between humans and forest ecosystems.',
      healthBenefits: ['Rich in protein and minerals', 'Low in calories', 'High in antioxidants', 'Boosts immunity'],
      ingredients: [
        { item: 'Wild mushrooms (Rugra)', quantity: '200g', note: 'Fresh or dried, cleaned properly' },
        { item: 'Onions', quantity: '1 medium', note: 'Finely chopped' },
        { item: 'Tomatoes', quantity: '1 medium', note: 'Chopped' },
        { item: 'Turmeric powder', quantity: '1/2 tsp', note: '' },
        { item: 'Red chili powder', quantity: '1 tsp', note: 'Adjust to taste' },
        { item: 'Mustard oil', quantity: '2 tbsp', note: 'Traditional choice' },
        { item: 'Garlic', quantity: '4-5 cloves', note: 'Minced' },
        { item: 'Ginger', quantity: '1 inch piece', note: 'Minced' },
        { item: 'Salt', quantity: 'to taste', note: '' },
        { item: 'Water', quantity: '1 cup', note: '' },
        { item: 'Fresh coriander', quantity: '2 tbsp', note: 'Chopped for garnish' }
      ],
      detailedSteps: [
        {
          step: 1,
          title: 'Clean the Mushrooms',
          description: 'Clean rugra mushrooms thoroughly, removing any dirt or debris. If using dried mushrooms, soak them in warm water.',
          time: '10 minutes',
          tips: ['Be gentle while cleaning to maintain texture', 'If using dried rugra, save the soaking water for curry']
        },
        {
          step: 2,
          title: 'Prepare the Base',
          description: 'Heat mustard oil in a pan. Add minced garlic and ginger, sauté until fragrant.',
          time: '3 minutes',
          tips: ['Don\'t let garlic burn as it will turn bitter', 'Mustard oil adds authentic tribal flavor']
        },
        {
          step: 3,
          title: 'Add Onions',
          description: 'Add chopped onions and cook until they turn golden brown and translucent.',
          time: '5 minutes',
          tips: ['Cook onions well for better flavor base', 'Stir occasionally to prevent burning']
        },
        {
          step: 4,
          title: 'Add Spices and Tomatoes',
          description: 'Add turmeric and red chili powder, mix well. Add tomatoes and cook until they break down and become mushy.',
          time: '5 minutes',
          tips: ['Cook spices briefly to remove raw taste', 'Mash tomatoes well to create a thick base']
        },
        {
          step: 5,
          title: 'Cook the Mushrooms',
          description: 'Add cleaned rugra mushrooms and cook for 3-4 minutes. Add water, salt, and simmer until mushrooms are tender.',
          time: '12 minutes',
          tips: ['Don\'t overcook mushrooms as they become rubbery', 'Adjust water quantity for desired consistency']
        },
        {
          step: 6,
          title: 'Final Garnish',
          description: 'Garnish with fresh coriander and serve hot with rice or roti.',
          time: '2 minutes',
          tips: ['Taste and adjust seasoning before serving', 'Serve immediately for best flavor']
        }
      ],
      servingSuggestions: [
        'Best served with steamed rice',
        'Can be paired with roti or bread',
        'Complement with dal and vegetables for a complete meal'
      ]
    },
    {
      id: 'bamboo-shoot-curry',
      name: 'Bamboo Shoot Curry',
      category: 'main',
      difficulty: 'Medium',
      cookTime: '40 minutes',
      prepTime: '20 minutes',
      servings: '4-6',
      image: 'https://c8.alamy.com/comp/FDBFX1/stir-fried-pork-belly-with-red-curry-paste-and-bamboo-shoots-FDBFX1.jpg',
      description: 'Tender bamboo shoots cooked with minimal spices, highlighting the natural flavors of this forest vegetable. This dish represents the tribal philosophy of using every part of nature sustainably.',
      culturalSignificance: 'This dish represents the tribal philosophy of using every part of nature sustainably and showcases their extensive knowledge of forest vegetables. Bamboo shoots are considered a delicacy and are rich in nutrients.',
      healthBenefits: ['High in fiber', 'Rich in potassium', 'Low in calories', 'Helps in digestion', 'Anti-inflammatory properties'],
      ingredients: [
        { item: 'Fresh bamboo shoots', quantity: '300g', note: 'Young and tender preferred' },
        { item: 'Mustard seeds', quantity: '1 tsp', note: '' },
        { item: 'Turmeric powder', quantity: '1/2 tsp', note: '' },
        { item: 'Green chilies', quantity: '2-3', note: 'Slit lengthwise' },
        { item: 'Mustard oil', quantity: '3 tbsp', note: 'Traditional choice' },
        { item: 'Salt', quantity: 'to taste', note: '' },
        { item: 'Water', quantity: '2 cups', note: 'For boiling' },
        { item: 'Onion', quantity: '1 small', note: 'Sliced (optional)' },
        { item: 'Garlic', quantity: '3-4 cloves', note: 'Minced' }
      ],
      detailedSteps: [
        {
          step: 1,
          title: 'Prepare Bamboo Shoots',
          description: 'Clean and slice bamboo shoots into thin pieces. Remove any tough outer layers and cut into manageable sizes.',
          time: '15 minutes',
          tips: ['Choose young, tender shoots for better taste', 'Remove any bitter outer layers']
        },
        {
          step: 2,
          title: 'Boil to Remove Bitterness',
          description: 'Boil bamboo shoots in salted water for 15 minutes to remove natural bitterness. Drain and set aside.',
          time: '20 minutes',
          tips: ['Boiling is essential to remove toxins and bitterness', 'Change water once during boiling for better results']
        },
        {
          step: 3,
          title: 'Prepare the Tempering',
          description: 'Heat mustard oil in a pan. Add mustard seeds and let them splutter. Add minced garlic and green chilies.',
          time: '3 minutes',
          tips: ['Don\'t let mustard seeds burn', 'Mustard oil smoke point is high, so heat adequately']
        },
        {
          step: 4,
          title: 'Add Bamboo Shoots',
          description: 'Add the boiled bamboo shoots to the pan. Mix well with the tempering and add turmeric powder.',
          time: '5 minutes',
          tips: ['Mix gently to coat with spices', 'Don\'t mash the tender shoots']
        },
        {
          step: 5,
          title: 'Simmer and Cook',
          description: 'Add a little water, salt, and simmer covered until bamboo shoots are completely tender and flavors are absorbed.',
          time: '15 minutes',
          tips: ['Check occasionally and add water if needed', 'Cook until shoots are fork-tender']
        }
      ],
      servingSuggestions: [
        'Serve with steamed rice as a side dish',
        'Pairs well with dal and other vegetarian curries',
        'Can be eaten with roti or bread'
      ]
    },
    {
      id: 'til-pitha',
      name: 'Til Pitha',
      category: 'snacks',
      difficulty: 'Moderate',
      cookTime: '45 minutes',
      prepTime: '30 minutes',
      servings: '4-6',
      image: 'https://masalachilli.com/wp-content/uploads/2018/07/dal-pitha-10.jpg',
      description: 'A sweet dumpling made with rice flour and sesame seeds, specially prepared during Makar Sankranti. This traditional delicacy symbolizes warmth and energy during the winter season.',
      culturalSignificance: 'Til Pitha holds special significance during Makar Sankranti, symbolizing the transition from winter to spring. The use of sesame seeds is believed to bring warmth to the body during cold weather.',
      healthBenefits: ['High in healthy fats', 'Rich in calcium', 'Good source of protein', 'Provides winter energy']
    },
    {
      id: 'mahua-laddu',
      name: 'Mahua Laddu',
      category: 'desserts',
      difficulty: 'Easy',
      cookTime: '20 minutes',
      prepTime: '15 minutes',
      servings: '8-10',
      image: 'https://ooofarms.com/cdn/shop/products/MahuaLaddoo1_520985f9-174d-4d58-aff1-a844d4510b23.jpg?v=1724238662&width=1500',
      description: 'Sweet balls made from mahua flowers, a seasonal delicacy that celebrates the flowering of mahua trees. This traditional dessert connects tribal communities to seasonal cycles.',
      culturalSignificance: 'Mahua laddu is prepared during the flowering season and represents the tribal connection to seasonal cycles and forest resources. Mahua flowers are considered sacred and nutritious.',
      healthBenefits: ['Rich in iron and calcium', 'Natural antioxidants', 'Energy boosting', 'Traditional digestive aid'],
      ingredients: [
        { item: 'Dried mahua flowers', quantity: '1 cup', note: 'Cleaned and sorted' },
        { item: 'Jaggery', quantity: '3/4 cup', note: 'Grated' },
        { item: 'Ghee', quantity: '2 tbsp', note: 'Pure desi ghee' },
        { item: 'Cardamom powder', quantity: '1/2 tsp', note: 'Freshly ground' },
        { item: 'Chopped nuts', quantity: '1/4 cup', note: 'Almonds and cashews' },
        { item: 'Sesame seeds', quantity: '1 tbsp', note: 'Roasted (optional)' }
      ],
      detailedSteps: [
        {
          step: 1,
          title: 'Prepare Mahua Flowers',
          description: 'Clean dried mahua flowers, removing any stems or debris. Dry roast them in a pan until they become crisp and aromatic.',
          time: '8 minutes',
          tips: ['Roast on low heat to prevent burning', 'Flowers should become crispy and fragrant']
        },
        {
          step: 2,
          title: 'Make Jaggery Syrup',
          description: 'In the same pan, melt jaggery with a little water to make a thick syrup. Cook until it reaches soft ball consistency.',
          time: '10 minutes',
          tips: ['Test syrup by dropping a small amount in cold water', 'Should form a soft ball when ready']
        },
        {
          step: 3,
          title: 'Combine Ingredients',
          description: 'Add roasted mahua flowers to the jaggery syrup. Mix well and add cardamom powder and chopped nuts.',
          time: '3 minutes',
          tips: ['Work quickly as mixture hardens fast', 'Mix thoroughly for even coating']
        },
        {
          step: 4,
          title: 'Shape into Laddus',
          description: 'While the mixture is still warm, grease hands with ghee and shape into small round balls or laddus.',
          time: '5 minutes',
          tips: ['Work with warm mixture for easy shaping', 'If mixture hardens, warm it slightly']
        },
        {
          step: 5,
          title: 'Cool and Store',
          description: 'Let the laddus cool completely before storing in an airtight container.',
          time: '15 minutes',
          tips: ['Store in cool, dry place', 'Can be kept for up to one week']
        }
      ],
      servingSuggestions: [
        'Best enjoyed as an after-meal dessert',
        'Can be offered during festivals and special occasions',
        'Pairs well with milk or traditional beverages'
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Recipes', icon: '🍽️', count: traditionalRecipes.length },
    { id: 'main', name: 'Main Dishes', icon: '🥘', count: traditionalRecipes.filter(r => r.category === 'main').length },
    { id: 'snacks', name: 'Snacks & Sweets', icon: '🥟', count: traditionalRecipes.filter(r => r.category === 'snacks').length },
    { id: 'beverages', name: 'Beverages', icon: '🍺', count: traditionalRecipes.filter(r => r.category === 'beverages').length },
    { id: 'desserts', name: 'Desserts', icon: '🍯', count: traditionalRecipes.filter(r => r.category === 'desserts').length }
  ]

  const filteredRecipes = activeCategory === 'all' 
    ? traditionalRecipes 
    : traditionalRecipes.filter(recipe => recipe.category === activeCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm font-medium">
              🍲 Traditional Flavors
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-orange-600 to-secondary bg-clip-text text-transparent leading-tight mb-8">
            Cuisine of Jharkhand
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Discover the authentic flavors of Jharkhand through traditional tribal recipes passed down through generations. 
            Each dish tells a story of cultural heritage, sustainable living, and deep connection to nature.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">6+</div>
              <div className="text-sm text-muted-foreground">Traditional Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Years of Tradition</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Tribal Communities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Natural</div>
              <div className="text-sm text-muted-foreground">Ingredients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                    : 'bg-background text-muted-foreground border-muted hover:border-primary/50 hover:text-foreground hover:scale-102'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => {
              const isFavorited = favorites.includes(recipe.id)
              
              return (
                <Card
                  key={recipe.id}
                  className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary/20"
                  onClick={() => window.location.href = `/cuisine-of-jharkhand/${recipe.id}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(recipe.id)
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200"
                    >
                      <Heart 
                        className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                      />
                    </button>
                    
                    {/* Difficulty Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getDifficultyColor(recipe.difficulty)} border`}>
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    
                    {/* Recipe Stats */}
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-white" />
                        <span className="text-white text-xs">{recipe.cookTime}</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Users className="h-3 w-3 text-white" />
                        <span className="text-white text-xs">{recipe.servings}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                        {recipe.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {recipe.description}
                      </p>
                      
                      {/* Health Benefits Preview */}
                      <div className="flex flex-wrap gap-1">
                        {recipe.healthBenefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Leaf className="h-3 w-3 mr-1 text-green-500" />
                            {benefit}
                          </Badge>
                        ))}
                        {recipe.healthBenefits.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{recipe.healthBenefits.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded-full">
                          {recipe.category.replace('_', ' ')}
                        </span>
                        <div className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          View Full Recipe →
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cultural Context Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The Story Behind Our Cuisine</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Jharkhand's tribal cuisine reflects a deep understanding of nature and sustainable living. 
            These recipes showcase the wisdom of using local, seasonal ingredients and traditional cooking methods 
            that have been perfected over centuries. Each dish connects us to the land, seasons, and community traditions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Natural Ingredients</h3>
              <p className="text-sm text-muted-foreground">Forest produce, organic grains, and seasonal vegetables</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold mb-2">Traditional Methods</h3>
              <p className="text-sm text-muted-foreground">Clay pots, wood fires, and fermentation techniques</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Community Bonds</h3>
              <p className="text-sm text-muted-foreground">Recipes shared through generations and communal cooking</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
