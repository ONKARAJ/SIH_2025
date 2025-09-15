export interface Festival {
  id: string;
  name: string;
  nameLocal: string;
  category: 'tribal' | 'religious' | 'harvest' | 'seasonal' | 'cultural';
  season: 'spring' | 'summer' | 'monsoon' | 'winter';
  months: string[];
  dates: {
    gregorian?: string;
    lunar: string;
    duration: number; // in days
  };
  location: {
    primary: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    districts: string[];
    venues: string[];
  };
  description: {
    short: string;
    detailed: string;
    significance: string;
    mythology?: string;
  };
  history: {
    origin: string;
    evolution: string;
    modernPractices: string;
  };
  rituals: {
    preparation: string[];
    ceremony: string[];
    conclusion: string[];
  };
  traditions: {
    music: string[];
    dance: string[];
    attire: string[];
    food: string[];
  };
  media: {
    hero: string;
    gallery: string[];
    videos?: string[];
  };
  folklore: {
    stories: Array<{
      title: string;
      content: string;
      moral?: string;
    }>;
    songs?: Array<{
      title: string;
      lyrics: string;
      audio?: string;
    }>;
  };
  recipes: Array<{
    name: string;
    ingredients: string[];
    method: string[];
    significance: string;
    image?: string;
  }>;
  crafts: Array<{
    name: string;
    materials: string[];
    process: string[];
    symbolism: string;
    artisans: string[];
    image?: string;
  }>;
  travelInfo: {
    bestTimeToVisit: string;
    howToReach: string;
    accommodation: string[];
    localTransport: string;
    tips: string[];
    dos: string[];
    donts: string[];
  };
  economicImpact: {
    tourism: string;
    localBusiness: string;
    artisans: string;
  };
  conservation: {
    challenges: string[];
    efforts: string[];
    futureOutlook: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    structuredData: any;
  };
}

export interface CulturalElement {
  id: string;
  type: 'art' | 'craft' | 'music' | 'dance' | 'cuisine' | 'language' | 'architecture';
  name: string;
  nameLocal: string;
  tribe?: string;
  region: string;
  description: string;
  history: string;
  significance: string;
  techniques: string[];
  materials?: string[];
  styles?: string[];
  media: {
    images: string[];
    videos?: string[];
    audio?: string[];
  };
  artisans: Array<{
    name: string;
    location: string;
    expertise: string;
    contact?: string;
    story: string;
  }>;
  learnMore: {
    workshops: Array<{
      name: string;
      location: string;
      duration: string;
      cost: string;
      contact: string;
    }>;
    museums: string[];
    culturalCenters: string[];
  };
}

// Festival Data
export const festivalData: Festival[] = [
  {
    id: 'sarhul',
    name: 'Sarhul',
    nameLocal: 'सरहुल',
    category: 'tribal',
    season: 'spring',
    months: ['March', 'April'],
    dates: {
      lunar: 'Chaitra Shukla Tritiya',
      duration: 7
    },
    location: {
      primary: 'Throughout Jharkhand',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['Ranchi', 'Khunti', 'Gumla', 'Simdega', 'West Singhbhum'],
      venues: ['Sacred Groves', 'Village Centers', 'Sarna Sthal']
    },
    description: {
      short: 'The most significant festival of Jharkhand\'s tribal communities, celebrating the blooming of Sal trees and the arrival of spring.',
      detailed: 'Sarhul, literally meaning "worship of Sal trees," is the New Year festival of the tribal communities in Jharkhand. It marks the beginning of the new agricultural cycle and celebrates the relationship between humans and nature.',
      significance: 'Represents the harmony between tribal communities and nature, marking the beginning of the agricultural season and renewal of life.',
      mythology: 'According to tribal mythology, Sarhul commemorates the marriage of Earth (Dharti Mata) with the Sun (Surya Devta), bringing fertility and prosperity.'
    },
    history: {
      origin: 'Ancient tribal festival dating back over 2000 years, rooted in the animistic beliefs of indigenous communities.',
      evolution: 'From purely nature worship to incorporating elements of community bonding and cultural preservation.',
      modernPractices: 'Now includes cultural programs, tribal art exhibitions, and eco-tourism initiatives.'
    },
    rituals: [
      'Preparation of sacred grove (Sarna)',
      'Offering of flowers and rice beer to Sal trees',
      'Community feast and cultural performances',
      'Blessing of seeds for new farming season'
    ],
    traditions: {
      music: ['Nagara drums', 'Tribal folk songs', 'Mandar beats'],
      dance: ['Jhumar dance', 'Paika dance', 'Chhau dance forms'],
      attire: ['White dhoti for men', 'Red-bordered sari for women', 'Traditional tribal jewelry'],
      food: ['Handia (rice beer)', 'Dhuska', 'Pittha', 'Tribal herbs and vegetables']
    },
    media: {
      hero: '/festivals/sarhul-hero.jpg',
      gallery: [
        '/festivals/sarhul-1.jpg',
        '/festivals/sarhul-2.jpg',
        '/festivals/sarhul-3.jpg',
        '/festivals/sarhul-4.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Legend of Sal Trees',
          content: 'Long ago, the Earth Goddess chose Sal trees as her messengers to connect with humans. The first flowers of Sal signify her blessings for a prosperous year.',
          moral: 'Respect for nature brings abundance and harmony.'
        }
      ]
    },
    recipes: [
      {
        name: 'Handia',
        ingredients: ['Rice', 'Ranu tablets', 'Water', 'Earthen pot'],
        method: [
          'Boil rice and let it cool',
          'Mix with crushed Ranu tablets',
          'Store in earthen pot for 7-15 days',
          'Strain and serve'
        ],
        significance: 'Sacred drink offered to deities and shared among community members',
        image: '/recipes/handia.jpg'
      }
    ],
    crafts: [
      {
        name: 'Sohrai Paintings',
        materials: ['Natural clay', 'Charcoal', 'White clay', 'Brushes made from twigs'],
        process: [
          'Prepare wall surface with clay',
          'Create geometric and animal motifs',
          'Use natural pigments for coloring',
          'Add intricate details with fine brushes'
        ],
        symbolism: 'Represents fertility, prosperity, and connection with nature',
        artisans: ['Hazaribagh tribal women', 'Kurmi community artists'],
        image: '/crafts/sohrai-painting.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'March-April when Sal trees are in full bloom',
      howToReach: 'Fly to Ranchi, then take road transport to tribal villages',
      accommodation: ['Eco-resorts', 'Government guest houses', 'Tribal homestays'],
      localTransport: 'Local buses, hired vehicles, guided tours available',
      tips: [
        'Respect local customs and traditions',
        'Participate respectfully in rituals',
        'Support local artisans',
        'Carry cash for rural areas'
      ],
      dos: [
        'Seek permission before photographing rituals',
        'Dress modestly',
        'Taste local cuisine',
        'Learn basic greetings in local language'
      ],
      donts: [
        'Don\'t disturb sacred groves',
        'Avoid alcohol during ceremonies',
        'Don\'t bargain aggressively with artisans',
        'Don\'t litter in natural areas'
      ]
    },
    economicImpact: {
      tourism: 'Attracts 50,000+ visitors annually, generating ₹25 crores in tourism revenue',
      localBusiness: 'Boosts handicraft sales, local food vendors, and accommodation providers',
      artisans: 'Provides livelihood to 5,000+ tribal artists and craftspeople'
    },
    conservation: {
      challenges: ['Modernization impact', 'Migration of youth', 'Climate change effects'],
      efforts: ['Documentation projects', 'Cultural education programs', 'Eco-tourism initiatives'],
      futureOutlook: 'Integration with sustainable tourism and digital preservation'
    },
    seo: {
      metaTitle: 'Sarhul Festival Jharkhand - Tribal New Year Celebration | Jharkhand Tourism',
      metaDescription: 'Experience Sarhul, the most important tribal festival of Jharkhand. Celebrate spring with Sal tree worship, traditional dances, and authentic tribal culture.',
      keywords: ['Sarhul festival', 'Jharkhand tribal festivals', 'Sal tree worship', 'tribal new year', 'spring festival Jharkhand'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Sarhul Festival',
        'location': 'Jharkhand, India',
        'startDate': 'March',
        'description': 'Traditional tribal festival celebrating spring and Sal tree worship'
      }
    }
  },
  {
    id: 'sohrai',
    name: 'Sohrai',
    nameLocal: 'सोहराई',
    category: 'harvest',
    season: 'winter',
    months: ['November', 'December'],
    dates: {
      gregorian: 'November (post-harvest)',
      lunar: 'Kartik Amavasya to Kartik Purnima',
      duration: 15
    },
    location: {
      primary: 'Hazaribagh, Ramgarh, Chatra',
      coordinates: { lat: 23.9929, lng: 85.3647 },
      districts: ['Hazaribagh', 'Ramgarh', 'Chatra', 'Koderma'],
      venues: ['Rural villages', 'Cattle sheds', 'Community centers']
    },
    description: {
      short: 'A harvest festival dedicated to cattle, celebrated with elaborate wall paintings and cultural performances.',
      detailed: 'Sohrai is a harvest festival that honors cattle for their contribution to agriculture. The festival is famous for its spectacular wall paintings done by tribal women using natural pigments.',
      significance: 'Celebrates the bond between humans, animals, and nature while showcasing the artistic heritage of tribal communities.',
      mythology: 'Legend says that cattle were gifted by gods to help humans in agriculture, and Sohrai is celebrated to thank them.'
    },
    history: {
      origin: 'Ancient festival linked to pastoral and agricultural traditions of tribal communities',
      evolution: 'From simple cattle worship to elaborate artistic expressions through wall paintings',
      modernPractices: 'Recognition as intangible cultural heritage and promotion through art galleries'
    },
    rituals: [
      'Cleaning and decorating cattle sheds',
      'Creating Sohrai wall paintings',
      'Offering prayers to cattle',
      'Community feasting and celebrations'
    ],
    traditions: {
      music: ['Folk songs about cattle', 'Harvest celebration songs', 'Traditional drums'],
      dance: ['Jhumar dance', 'Domkach dance', 'Circle dances'],
      attire: ['Festive saris', 'Traditional jewelry', 'Colorful turbans'],
      food: ['Rice preparations', 'Seasonal vegetables', 'Sweet delicacies', 'Local liquor']
    },
    media: {
      hero: 'https://pbs.twimg.com/media/EmwhdmKVkAA5nCm.jpg',
      gallery: [
        'https://pbs.twimg.com/media/EmwhdmKVkAA5nCm.jpg',
        '/festivals/sohrai-paintings-2.jpg',
        '/festivals/sohrai-cattle.jpg',
        '/festivals/sohrai-celebration.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Divine Gift of Cattle',
          content: 'When humans struggled with farming, the gods gifted them cattle. In gratitude, humans promised to honor them annually during harvest time.',
          moral: 'Gratitude and respect for all beings that help us.'
        }
      ]
    },
    recipes: [
      {
        name: 'Pitha',
        ingredients: ['Rice flour', 'Jaggery', 'Coconut', 'Sesame seeds'],
        method: [
          'Mix rice flour with water to form dough',
          'Prepare filling with jaggery and coconut',
          'Shape into dumplings',
          'Steam or fry until cooked'
        ],
        significance: 'Traditional harvest festival sweet offered to deities and guests',
        image: '/recipes/pitha.jpg'
      }
    ],
    crafts: [
      {
        name: 'Sohrai Wall Paintings',
        materials: ['Natural ochre', 'White clay', 'Charcoal', 'Fingers and twigs'],
        process: [
          'Apply base coat of clay on walls',
          'Create geometric patterns with fingers',
          'Add animal motifs representing cattle',
          'Use contrasting colors for details'
        ],
        symbolism: 'Represents prosperity, fertility, and gratitude to nature',
        artisans: ['Hazaribagh tribal women', 'Kurmi and Santhal artists'],
        image: '/crafts/sohrai-wall-art.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'November-December during the festival period',
      howToReach: 'Ranchi to Hazaribagh by road (90 km), then local transport to villages',
      accommodation: ['Forest rest houses', 'Local homestays', 'District hotels'],
      localTransport: 'Local jeeps, auto-rickshaws, guided village tours',
      tips: [
        'Visit villages early morning for best paintings',
        'Bring cameras for wall art photography',
        'Interact with artists to learn techniques',
        'Respect private property and seek permission'
      ],
      dos: [
        'Support local artists by purchasing art',
        'Learn about the symbolism of paintings',
        'Participate in community celebrations',
        'Document art forms respectfully'
      ],
      donts: [
        'Don\'t touch wet paintings',
        'Don\'t enter private compounds uninvited',
        'Don\'t haggle with elderly artists',
        'Don\'t use flash photography on old paintings'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹15 crores annually through art tourism and cultural visits',
      localBusiness: 'Supports local guides, homestays, and handicraft sellers',
      artisans: 'Provides income to 2,000+ women artists through art sales and workshops'
    },
    conservation: {
      challenges: ['Fading tradition among youth', 'Modern construction replacing mud walls', 'Migration from villages'],
      efforts: ['Art documentation projects', 'Training workshops for youth', 'Museum exhibitions'],
      futureOutlook: 'Digital preservation and contemporary art adaptations'
    },
    seo: {
      metaTitle: 'Sohrai Festival & Wall Paintings Jharkhand | Tribal Harvest Celebration',
      metaDescription: 'Discover Sohrai festival and its famous wall paintings in Jharkhand. Experience tribal harvest celebrations and ancient art forms.',
      keywords: ['Sohrai festival', 'Sohrai paintings', 'Jharkhand wall art', 'tribal harvest festival', 'Hazaribagh art'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Sohrai Festival',
        'location': 'Hazaribagh, Jharkhand',
        'startDate': 'November',
        'description': 'Harvest festival famous for tribal wall paintings and cattle worship'
      }
    }
  },
  {
    id: 'tusu',
    name: 'Tusu Festival',
    nameLocal: 'तुसू पर्व',
    category: 'harvest',
    season: 'winter',
    months: ['December', 'January'],
    dates: {
      gregorian: 'December 23 - January 15',
      lunar: 'Paush month celebrations',
      duration: 23
    },
    location: {
      primary: 'Dhanbad, Bokaro, Hazaribagh',
      coordinates: { lat: 23.7957, lng: 86.4304 },
      districts: ['Dhanbad', 'Bokaro', 'Hazaribagh', 'Giridih'],
      venues: ['Village homes', 'Community centers', 'River banks']
    },
    description: {
      short: 'Winter harvest festival where young girls create decorative dolls and sing traditional songs house to house.',
      detailed: 'Tusu is celebrated by unmarried girls who create beautiful dolls from bamboo and cloth, then go house to house singing melodious folk songs to collect donations.',
      significance: 'Celebrates feminine power, community bonding, and the joy of harvest season while preserving ancient folk traditions.',
      mythology: 'Legend says Tusu was a beautiful girl who brought happiness wherever she went. After her death, she became the goddess of joy and prosperity.'
    },
    history: {
      origin: 'Ancient winter festival celebrating feminine divinity and harvest abundance',
      evolution: 'Incorporated influences from Bengali and Bihar cultures while maintaining tribal essence',
      modernPractices: 'Now includes cultural competitions, doll-making contests, and folk music festivals'
    },
    rituals: [
      'Creation of decorative Tusu dolls',
      'House-to-house singing processions', 
      'Collection of rice, money, and sweets',
      'Final immersion of dolls in rivers',
      'Community feasting and celebrations'
    ],
    traditions: {
      music: ['Tusu folk songs', 'Traditional drums', 'Group singing'],
      dance: ['Folk dances with dolls', 'Circle formations', 'Rhythmic movements'],
      attire: ['Colorful saris', 'Traditional jewelry', 'Flowers in hair'],
      food: ['Til-gud sweets', 'Kheer', 'Rice cakes', 'Winter delicacies']
    },
    media: {
      hero: '/festivals/tusu-hero.jpg',
      gallery: [
        '/festivals/tusu-dolls.jpg',
        '/festivals/tusu-procession.jpg',
        '/festivals/tusu-songs.jpg',
        '/festivals/tusu-immersion.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Legend of Tusu',
          content: 'Tusu was known for her kindness and beauty. When she died young, the community started celebrating her memory, believing she would bring prosperity and happiness.',
          moral: 'Kindness and joy create lasting legacies that unite communities.'
        }
      ]
    },
    recipes: [
      {
        name: 'Til-Gud Sweets',
        ingredients: ['Sesame seeds', 'Jaggery', 'Ghee', 'Cardamom'],
        method: [
          'Roast sesame seeds until golden',
          'Melt jaggery with little water',
          'Mix seeds with jaggery syrup',
          'Shape into small balls while warm'
        ],
        significance: 'Traditional winter sweet representing warmth and energy',
        image: '/recipes/til-gud.jpg'
      }
    ],
    crafts: [
      {
        name: 'Tusu Doll Making',
        materials: ['Bamboo sticks', 'Colorful cloth', 'Decorative papers', 'Flowers'],
        process: [
          'Create frame with bamboo sticks',
          'Wrap with colorful cloth',
          'Decorate with papers and flowers',
          'Add artistic finishing touches'
        ],
        symbolism: 'Represents feminine beauty, creativity, and cultural continuity',
        artisans: ['Young girls from tribal communities', 'Women folk artists'],
        image: '/crafts/tusu-dolls.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'December-January during the festival period',
      howToReach: 'Fly to Ranchi, drive to Dhanbad/Bokaro (150 km), join local celebrations',
      accommodation: ['Hotels in Dhanbad/Bokaro', 'Homestays', 'Guest houses'],
      localTransport: 'Auto-rickshaws, local buses, hired vehicles for village visits',
      tips: [
        'Join the singing groups for authentic experience',
        'Learn basic Tusu songs from locals',
        'Carry small denominations for donations',
        'Respect family traditions and customs'
      ],
      dos: [
        'Participate respectfully in processions',
        'Support the singing groups with donations',
        'Learn about doll-making techniques',
        'Enjoy the folk music performances'
      ],
      donts: [
        'Don\'t interrupt ongoing song performances',
        'Don\'t touch dolls without permission',
        'Don\'t photograph without asking',
        'Don\'t bargain with traditional performers'
      ]
    },
    economicImpact: {
      tourism: 'Attracts cultural tourists and music enthusiasts, generating ₹8 crores annually',
      localBusiness: 'Supports local sweet makers, craft suppliers, and cultural performers',
      artisans: 'Provides seasonal income to 3,000+ women and girls through doll-making and performances'
    },
    conservation: {
      challenges: ['Urbanization reducing participation', 'Loss of traditional songs', 'Changing lifestyle patterns'],
      efforts: ['Folk music documentation', 'School cultural programs', 'Government recognition'],
      futureOutlook: 'Digital archiving of songs and integration with cultural tourism'
    },
    seo: {
      metaTitle: 'Tusu Festival Jharkhand - Traditional Folk Songs & Doll Festival',
      metaDescription: 'Experience Tusu festival with beautiful dolls, melodious folk songs, and winter celebrations in Jharkhand. Join the cultural heritage of tribal communities.',
      keywords: ['Tusu festival', 'folk songs Jharkhand', 'traditional dolls', 'winter festival', 'tribal celebrations'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Tusu Festival',
        'location': 'Dhanbad, Jharkhand',
        'startDate': 'December',
        'description': 'Winter festival featuring traditional dolls and folk song performances'
      }
    }
  },
  {
    id: 'karma',
    name: 'Karma Festival',
    nameLocal: 'कर्म पर्व',
    category: 'seasonal',
    season: 'monsoon',
    months: ['August', 'September'],
    dates: {
      lunar: 'Bhadrapada Ekadashi',
      duration: 2
    },
    location: {
      primary: 'Oraon and Munda villages',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      districts: ['Gumla', 'Simdega', 'Khunti', 'Ranchi'],
      venues: ['Village groves', 'Community centers', 'Sacred forests']
    },
    description: {
      short: 'Monsoon festival celebrating the Karma tree, where youth perform traditional dances seeking blessings for prosperity.',
      detailed: 'Karma festival involves cutting branches of the Karma tree at dawn, decorating them, and performing circle dances around them while singing traditional songs.',
      significance: 'Represents youth participation in cultural preservation, fertility worship, and community bonding during monsoon season.',
      mythology: 'The Karma tree is considered sacred, believed to be blessed by forest spirits who grant prosperity and happiness.'
    },
    history: {
      origin: 'Ancient monsoon fertility ritual practiced by Oraon and Munda tribes for over 1500 years',
      evolution: 'Maintained traditional format while incorporating elements from neighboring tribal cultures',
      modernPractices: 'Now includes cultural competitions, tree plantation drives, and eco-awareness programs'
    },
    rituals: [
      'Dawn collection of Karma branches',
      'Decoration of branches with flowers',
      'Circle dance around the Karma tree',
      'Offering of rice, flowers, and prayers',
      'Community feast under sacred trees'
    ],
    traditions: {
      music: ['Traditional Oraon songs', 'Drum beats', 'Folk melodies'],
      dance: ['Karma dance in circles', 'Youth formations', 'Rhythmic steps'],
      attire: ['White dhoti for men', 'Colorful saris for women', 'Traditional jewelry'],
      food: ['Rice with curry', 'Bamboo shoot dishes', 'Wild vegetables', 'Traditional sweets']
    },
    media: {
      hero: '/festivals/karma-hero.jpg',
      gallery: [
        '/festivals/karma-dance.jpg',
        '/festivals/karma-tree.jpg',
        '/festivals/karma-youth.jpg',
        '/festivals/karma-rituals.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Sacred Karma Tree',
          content: 'Forest spirits chose the Karma tree as their dwelling. They bless those who worship with pure hearts, granting prosperity and protection.',
          moral: 'Sincere worship and respect for nature bring divine blessings and community prosperity.'
        }
      ]
    },
    recipes: [
      {
        name: 'Bamboo Curry',
        ingredients: ['Fresh bamboo shoots', 'Turmeric', 'Mustard oil', 'Green chilies', 'Onions'],
        method: [
          'Clean and slice bamboo shoots',
          'Boil with turmeric to remove bitterness',
          'Sauté with onions and spices',
          'Simmer until tender'
        ],
        significance: 'Traditional monsoon delicacy representing harmony with forest resources',
        image: '/recipes/bamboo-curry.jpg'
      }
    ],
    crafts: [
      {
        name: 'Karma Branch Decoration',
        materials: ['Karma tree branches', 'Marigold flowers', 'Mango leaves', 'Colorful threads'],
        process: [
          'Select fresh Karma branches',
          'Tie marigold flowers at intervals',
          'Attach mango leaves for decoration',
          'Bind with colorful threads'
        ],
        symbolism: 'Represents life, fertility, and connection between earth and sky',
        artisans: ['Oraon community members', 'Tribal youth groups'],
        image: '/crafts/karma-decoration.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'August-September during monsoon festival period',
      howToReach: 'Ranchi to Gumla by road (85 km), then local transport to Oraon villages',
      accommodation: ['Forest guest houses', 'Tribal homestays', 'Eco-resorts'],
      localTransport: 'Jeeps for village access, guided tribal tours available',
      tips: [
        'Join dance circles with community permission',
        'Learn basic Oraon greetings',
        'Respect sacred grove protocols',
        'Bring monsoon-appropriate clothing'
      ],
      dos: [
        'Participate respectfully in dances',
        'Support local forest conservation',
        'Learn about tribal customs',
        'Document cultural practices appropriately'
      ],
      donts: [
        'Don\'t damage Karma trees or forest',
        'Don\'t interrupt ongoing rituals',
        'Don\'t use flash photography during ceremonies',
        'Don\'t consume alcohol during sacred ceremonies'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹5 crores through cultural and eco-tourism annually',
      localBusiness: 'Supports tribal guides, homestay operators, and craft sellers',
      artisans: 'Benefits 1,500+ tribal families through cultural tourism and handicraft sales'
    },
    conservation: {
      challenges: ['Forest depletion affecting Karma trees', 'Youth migration to cities', 'Climate change impact'],
      efforts: ['Tree plantation programs', 'Cultural education initiatives', 'Eco-tourism development'],
      futureOutlook: 'Integration with sustainable forestry and community-based tourism'
    },
    seo: {
      metaTitle: 'Karma Festival Jharkhand - Monsoon Tree Worship & Tribal Dance',
      metaDescription: 'Join Karma festival celebrations in Jharkhand with traditional tree worship, folk dances, and authentic tribal culture during monsoon season.',
      keywords: ['Karma festival', 'Oraon tribe festival', 'monsoon celebration', 'tree worship Jharkhand', 'tribal dance'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Karma Festival',
        'location': 'Gumla, Jharkhand',
        'startDate': 'August',
        'description': 'Monsoon festival celebrating Karma tree with traditional tribal dances'
      }
    }
  },
  {
    id: 'bandna',
    name: 'Bandna Festival',
    nameLocal: 'बांदना पर्व',
    category: 'harvest',
    season: 'winter',
    months: ['October', 'November'],
    dates: {
      lunar: 'Kartik Amavasya',
      duration: 5
    },
    location: {
      primary: 'Munda tribal areas',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['Khunti', 'Ranchi', 'West Singhbhum', 'Gumla'],
      venues: ['Cattle sheds', 'Village compounds', 'Community spaces']
    },
    description: {
      short: 'Post-harvest festival dedicated to cattle worship and thanksgiving for their contribution to agriculture.',
      detailed: 'Bandna celebrates the sacred relationship between farmers and cattle, with elaborate decorations of animals and thanksgiving rituals.',
      significance: 'Honors cattle as partners in agriculture and expresses gratitude for successful harvest season.',
      mythology: 'Cattle are considered gifts from gods to assist humans in farming and are worshipped as divine beings.'
    },
    history: {
      origin: 'Ancient pastoral festival of Munda tribe dating back to early agricultural settlements',
      evolution: 'Expanded from simple cattle worship to elaborate community celebrations',
      modernPractices: 'Includes animal welfare awareness and sustainable farming practices'
    },
    rituals: [
      'Cleaning and decorating cattle sheds',
      'Bathing and adorning cattle with flowers',
      'Offering special food to animals',
      'Prayers for animal welfare and prosperity',
      'Community sharing of harvest produce'
    ],
    traditions: {
      music: ['Cattle worship songs', 'Harvest celebration music', 'Traditional drums'],
      dance: ['Circle dances around cattle', 'Community folk dances', 'Thanksgiving performances'],
      attire: ['Clean festive clothes', 'Traditional Munda jewelry', 'Colorful headgear'],
      food: ['New rice preparations', 'Milk-based sweets', 'Seasonal vegetables', 'Traditional delicacies']
    },
    media: {
      hero: '/festivals/bandna-hero.jpg',
      gallery: [
        '/festivals/bandna-cattle.jpg',
        '/festivals/bandna-decoration.jpg',
        '/festivals/bandna-rituals.jpg',
        '/festivals/bandna-community.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Divine Partnership',
          content: 'When gods created agriculture, they gave cattle as partners to humans. The first harvest was shared with cattle in gratitude, starting the Bandna tradition.',
          moral: 'Partnership with animals and nature brings mutual prosperity and harmony.'
        }
      ]
    },
    recipes: [
      {
        name: 'New Rice Kheer',
        ingredients: ['Fresh harvested rice', 'Full-fat milk', 'Sugar', 'Cardamom', 'Almonds'],
        method: [
          'Cook new rice until soft',
          'Boil milk and add cooked rice',
          'Sweeten with sugar',
          'Flavor with cardamom and garnish with almonds'
        ],
        significance: 'First preparation from new harvest, offered to cattle and family',
        image: '/recipes/new-rice-kheer.jpg'
      }
    ],
    crafts: [
      {
        name: 'Cattle Decoration Art',
        materials: ['Marigold flowers', 'Colored powders', 'Oil paints', 'Decorative bells'],
        process: [
          'Create floral garlands for cattle',
          'Apply colorful designs on animals',
          'Attach decorative bells',
          'Add ceremonial ornaments'
        ],
        symbolism: 'Beautification showing respect and love for cattle partners',
        artisans: ['Munda tribal families', 'Rural artists'],
        image: '/crafts/cattle-decoration.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'October-November during post-harvest period',
      howToReach: 'Ranchi to Khunti (45 km) by road, then village transport',
      accommodation: ['Tribal homestays', 'Government guest houses', 'Eco-lodges'],
      localTransport: 'Village jeeps, guided rural tours, walking paths',
      tips: [
        'Respect cattle and farming traditions',
        'Learn about animal husbandry practices',
        'Support local dairy products',
        'Participate in community thanksgiving'
      ],
      dos: [
        'Show reverence during cattle worship',
        'Support traditional farming methods',
        'Learn about animal care practices',
        'Appreciate the farmer-cattle relationship'
      ],
      donts: [
        'Don\'t disturb animals during ceremonies',
        'Don\'t waste food during celebrations',
        'Don\'t disrespect farming traditions',
        'Don\'t use loud sounds near cattle'
      ]
    },
    economicImpact: {
      tourism: 'Promotes agri-tourism generating ₹4 crores annually through rural visits',
      localBusiness: 'Supports dairy cooperatives, rural homestays, and traditional crafts',
      artisans: 'Benefits 800+ farming families through cultural tourism and agricultural products'
    },
    conservation: {
      challenges: ['Mechanization reducing cattle dependency', 'Industrial farming practices', 'Urban migration'],
      efforts: ['Traditional farming promotion', 'Animal welfare programs', 'Cultural documentation'],
      futureOutlook: 'Integration with organic farming and sustainable agriculture tourism'
    },
    seo: {
      metaTitle: 'Bandna Festival Jharkhand - Cattle Worship & Harvest Thanksgiving',
      metaDescription: 'Experience Bandna festival celebrating the sacred bond between farmers and cattle in Jharkhand. Join traditional harvest thanksgiving ceremonies.',
      keywords: ['Bandna festival', 'cattle worship', 'harvest festival Jharkhand', 'Munda tribe', 'agricultural celebration'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Bandna Festival',
        'location': 'Khunti, Jharkhand',
        'startDate': 'October',
        'description': 'Post-harvest festival celebrating cattle and agricultural partnerships'
      }
    }
  },
  {
    id: 'jitia',
    name: 'Jitia Festival',
    nameLocal: 'जितिया व्रत',
    category: 'religious',
    season: 'monsoon',
    months: ['September', 'October'],
    dates: {
      lunar: 'Ashwin Krishna Ashtami',
      duration: 3
    },
    location: {
      primary: 'Throughout Jharkhand',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['All districts of Jharkhand'],
      venues: ['Homes', 'Temples', 'Community centers']
    },
    description: {
      short: 'A mother\'s fasting festival for the well-being and long life of children, observed with strict rituals and community prayers.',
      detailed: 'Jitia is a nirjala (waterless) fast observed by mothers for their children\'s welfare. It involves 24-hour fasting, storytelling, and community gatherings.',
      significance: 'Demonstrates maternal love and sacrifice, strengthening family bonds and community support systems.',
      mythology: 'Based on the story of a jackal who saved her cubs through devotion and sacrifice, inspiring mothers to observe this fast.'
    },
    history: {
      origin: 'Ancient Hindu tradition adopted by tribal communities and integrated with local customs',
      evolution: 'From purely religious observance to community celebration with cultural elements',
      modernPractices: 'Includes health awareness programs and child welfare initiatives'
    },
    rituals: [
      'Pre-dawn preparation and prayers',
      '24-hour nirjala (waterless) fasting',
      'Evening storytelling sessions',
      'Community gathering and support',
      'Breaking fast with traditional foods'
    ],
    traditions: {
      music: ['Devotional songs', 'Folk narratives with music', 'Community bhajans'],
      dance: ['Simple folk dances after fast', 'Community celebrations', 'Children\'s performances'],
      attire: ['Clean traditional saris', 'Simple jewelry', 'Religious markings'],
      food: ['Sattu (gram flour drink)', 'Fruits', 'Traditional sweets', 'Milk preparations']
    },
    media: {
      hero: '/festivals/jitia-hero.jpg',
      gallery: [
        '/festivals/jitia-mothers.jpg',
        '/festivals/jitia-prayers.jpg',
        '/festivals/jitia-community.jpg',
        '/festivals/jitia-children.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Devoted Jackal Mother',
          content: 'A jackal mother saved her cubs by observing strict fast and prayers. When hunters came, her devotion created divine protection around her family.',
          moral: 'A mother\'s sincere prayers and sacrifice can overcome any danger to her children.'
        }
      ]
    },
    recipes: [
      {
        name: 'Sattu Drink',
        ingredients: ['Roasted gram flour (sattu)', 'Water', 'Salt', 'Mint leaves', 'Lemon'],
        method: [
          'Mix sattu with water to make smooth paste',
          'Add salt and mint leaves',
          'Whisk well to avoid lumps',
          'Serve with lemon juice'
        ],
        significance: 'Traditional drink to break the fast, providing energy and nutrition',
        image: '/recipes/sattu-drink.jpg'
      }
    ],
    crafts: [
      {
        name: 'Prayer Altar Decoration',
        materials: ['Marigold flowers', 'Rice', 'Vermillion', 'Diya (oil lamps)', 'Incense'],
        process: [
          'Create rangoli patterns with rice',
          'Arrange marigold flowers',
          'Place oil lamps in formation',
          'Add vermillion and incense'
        ],
        symbolism: 'Sacred space creation for prayers and maternal devotion',
        artisans: ['Mothers and elderly women', 'Community volunteers'],
        image: '/crafts/prayer-altar.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'September-October during the festival period',
      howToReach: 'Accessible in all cities and villages of Jharkhand',
      accommodation: ['Available in all major towns', 'Homestays', 'Local guesthouses'],
      localTransport: 'Local buses, auto-rickshaws, walking to nearby venues',
      tips: [
        'Respect the fasting mothers',
        'Support community kitchens',
        'Learn about maternal traditions',
        'Participate in storytelling sessions'
      ],
      dos: [
        'Show respect to fasting mothers',
        'Help in community arrangements',
        'Listen to traditional stories',
        'Support child welfare activities'
      ],
      donts: [
        'Don\'t offer food to fasting mothers',
        'Don\'t make noise during prayers',
        'Don\'t interrupt storytelling sessions',
        'Don\'t question religious practices'
      ]
    },
    economicImpact: {
      tourism: 'Limited direct tourism but supports local religious tourism ₹2 crores annually',
      localBusiness: 'Boosts sales of religious items, fruits, and traditional foods',
      artisans: 'Benefits flower vendors, religious item sellers, and food preparers'
    },
    conservation: {
      challenges: ['Changing lifestyle affecting participation', 'Nuclear families reducing community support', 'Time constraints'],
      efforts: ['Community organization support', 'Cultural education programs', 'Intergenerational storytelling'],
      futureOutlook: 'Digital documentation of stories and virtual community participation'
    },
    seo: {
      metaTitle: 'Jitia Festival Jharkhand - Mother\'s Fasting for Children\'s Welfare',
      metaDescription: 'Experience Jitia festival, a sacred mother\'s fast for children\'s well-being in Jharkhand. Join traditional prayers, storytelling, and community support.',
      keywords: ['Jitia festival', 'mother\'s fast', 'children welfare', 'religious festival Jharkhand', 'maternal devotion'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Jitia Festival',
        'location': 'Jharkhand, India',
        'startDate': 'September',
        'description': 'Religious fasting festival observed by mothers for children\'s welfare'
      }
    }
  }
];

// Cultural Elements Data
export const culturalData: CulturalElement[] = [
  {
    id: 'dokra-art',
    type: 'craft',
    name: 'Dokra Metal Craft',
    nameLocal: 'ढोकरा कला',
    tribe: 'Mal Paharia',
    region: 'Dumka, Jamtara',
    description: 'Ancient lost-wax casting technique producing distinctive brass figurines and artifacts',
    history: '4000-year-old tradition practiced by nomadic craftsmen, now settled in Jharkhand',
    significance: 'Represents continuity of ancient Indus Valley civilization crafts',
    techniques: ['Lost-wax casting', 'Clay molding', 'Metal pouring', 'Finishing and polishing'],
    materials: ['Brass', 'Bronze', 'Beeswax', 'Clay', 'Coal'],
    media: {
      images: ['/culture/dokra-1.jpg', '/culture/dokra-2.jpg'],
      videos: ['/culture/dokra-process.mp4']
    },
    artisans: [
      {
        name: 'Ramesh Karmakar',
        location: 'Bikna Village, Dumka',
        expertise: 'Traditional figurines and modern designs',
        story: 'Third-generation Dokra artist keeping ancient traditions alive while innovating for modern markets'
      }
    ],
    learnMore: {
      workshops: [
        {
          name: 'Dokra Craft Workshop',
          location: 'Dumka Cultural Center',
          duration: '3 days',
          cost: '₹5,000',
          contact: '+91-9234567890'
        }
      ],
      museums: ['Jharkhand State Museum'],
      culturalCenters: ['Jharkhand State Museum']
    }
  },
  {
    id: 'jhumar-dance',
    type: 'dance',
    name: 'Jhumar Dance',
    nameLocal: 'झुमर नृत्य',
    tribe: 'Santhal, Oraon, Munda',
    region: 'Throughout Jharkhand',
    description: 'Traditional tribal folk dance performed during festivals and celebrations, characterized by rhythmic movements and group formations',
    history: 'Ancient dance form dating back over 1000 years, integral to tribal cultural expression and community bonding',
    significance: 'Represents unity, celebration, and cultural identity, performed during major festivals like Sarhul and Sohrai',
    techniques: ['Circle formations', 'Rhythmic steps', 'Coordinated movements', 'Musical synchronization'],
    styles: ['Sarhul Jhumar', 'Sohrai Jhumar', 'Wedding Jhumar', 'Harvest Jhumar'],
    media: {
      images: ['/culture/jhumar-1.jpg', '/culture/jhumar-2.jpg', '/culture/jhumar-group.jpg'],
      videos: ['/culture/jhumar-performance.mp4'],
      audio: ['/culture/jhumar-songs.mp3']
    },
    artisans: [
      {
        name: 'Mangal Hembram',
        location: 'Dumka',
        expertise: 'Traditional Santhal Jhumar dance master',
        story: 'Fifth-generation dance teacher preserving authentic tribal dance forms through community workshops'
      },
      {
        name: 'Sushila Munda',
        location: 'Ranchi',
        expertise: 'Folk dance choreographer and cultural performer',
        story: 'Award-winning artist who has performed Jhumar internationally while maintaining traditional authenticity'
      }
    ],
    learnMore: {
      workshops: [
        {
          name: 'Tribal Dance Workshop',
          location: 'Ranchi Cultural Center',
          duration: '1 week',
          cost: '₹3,000',
          contact: '+91-9876543210'
        }
      ],
      museums: ['Jharkhand State Museum'],
      culturalCenters: ['Ranchi Cultural Center', 'Dumka Folk Arts Center']
    }
  },
  {
    id: 'bamboo-craft',
    type: 'craft',
    name: 'Bamboo and Cane Craft',
    nameLocal: 'बांस और बेंत की कलाकृति',
    tribe: 'Ho, Santhal, Oraon',
    region: 'West Singhbhum, Dumka, Gumla',
    description: 'Traditional basketry and furniture making using locally sourced bamboo and cane, creating functional and decorative items',
    history: 'Ancient craft practice essential for daily life, evolved from necessity to artistic expression over centuries',
    significance: 'Represents sustainable living, environmental harmony, and indigenous knowledge of forest resources',
    techniques: ['Weaving patterns', 'Splicing methods', 'Natural coloring', 'Traditional joining'],
    materials: ['Bamboo poles', 'Cane strips', 'Natural dyes', 'Traditional tools'],
    media: {
      images: ['/culture/bamboo-craft-1.jpg', '/culture/bamboo-baskets.jpg', '/culture/bamboo-furniture.jpg'],
      videos: ['/culture/bamboo-making-process.mp4']
    },
    artisans: [
      {
        name: 'Budhan Ho',
        location: 'Chaibasa',
        expertise: 'Master bamboo furniture maker',
        story: 'Traditional craftsman creating modern designs while preserving ancient techniques passed down through generations'
      },
      {
        name: 'Kamla Devi',
        location: 'Dumka',
        expertise: 'Decorative basket weaving specialist',
        story: 'Women\'s collective leader training rural women in bamboo crafts for economic empowerment'
      }
    ],
    learnMore: {
      workshops: [
        {
          name: 'Bamboo Craft Training',
          location: 'Chaibasa Craft Center',
          duration: '2 weeks',
          cost: '₹4,000',
          contact: '+91-9123456789'
        }
      ],
      museums: ['Forest Research Institute Museum'],
      culturalCenters: ['Tribal Handicrafts Center', 'Rural Development Institute']
    }
  },
  {
    id: 'tribal-music',
    type: 'music',
    name: 'Tribal Folk Music',
    nameLocal: 'आदिवासी लोक संगीत',
    tribe: 'All tribal communities',
    region: 'Throughout Jharkhand',
    description: 'Rich musical tradition featuring indigenous instruments, vocal styles, and rhythmic patterns integral to tribal cultural expression',
    history: 'Ancient musical heritage passed down orally through generations, deeply connected to daily life and rituals',
    significance: 'Preserves historical narratives, cultural values, and spiritual beliefs while fostering community identity',
    techniques: ['Call and response singing', 'Polyrhythmic patterns', 'Improvisation', 'Ceremonial compositions'],
    materials: ['Madal drums', 'Nagara drums', 'Flutes', 'String instruments', 'Natural materials'],
    styles: ['Ritual songs', 'Work songs', 'Festival music', 'Storytelling ballads'],
    media: {
      images: ['/culture/tribal-music-1.jpg', '/culture/musical-instruments.jpg', '/culture/musicians.jpg'],
      videos: ['/culture/tribal-music-performance.mp4'],
      audio: ['/culture/traditional-songs.mp3', '/culture/instrumental-music.mp3']
    },
    artisans: [
      {
        name: 'Kanha Ram Tudu',
        location: 'Santhal Pargana',
        expertise: 'Traditional Santhal music master',
        story: 'Renowned musician and instrument maker preserving ancient musical traditions through performances and teaching'
      }
    ],
    learnMore: {
      workshops: [
        {
          name: 'Tribal Music Workshop',
          location: 'Music Academy Ranchi',
          duration: '10 days',
          cost: '₹2,500',
          contact: '+91-8765432109'
        }
      ],
      museums: ['Musical Instrument Museum', 'Cultural Heritage Center'],
      culturalCenters: ['Folk Music Center', 'Tribal Arts Academy']
    }
  },
  {
    id: 'tribal-cuisine',
    type: 'cuisine',
    name: 'Traditional Tribal Cuisine',
    nameLocal: 'पारंपरिक आदिवासी व्यंजन',
    tribe: 'All tribal communities',
    region: 'Throughout Jharkhand',
    description: 'Authentic culinary traditions using indigenous ingredients, traditional cooking methods, and seasonal preparations',
    history: 'Ancient food culture based on forest resources, agricultural produce, and sustainable harvesting practices',
    significance: 'Represents harmony with nature, nutritional wisdom, and cultural identity through food traditions',
    techniques: ['Clay pot cooking', 'Stone grinding', 'Fermentation', 'Natural preservation', 'Seasonal cooking'],
    materials: ['Indigenous grains', 'Forest vegetables', 'Wild herbs', 'Natural spices', 'Traditional utensils'],
    styles: ['Festival foods', 'Daily meals', 'Medicinal preparations', 'Ritual offerings'],
    media: {
      images: ['/culture/tribal-cuisine-1.jpg', '/culture/traditional-cooking.jpg', '/culture/indigenous-ingredients.jpg'],
      videos: ['/culture/cooking-demonstration.mp4']
    },
    artisans: [
      {
        name: 'Savitri Munda',
        location: 'Khunti',
        expertise: 'Traditional cooking expert',
        story: 'Master chef specializing in authentic tribal recipes and conducting cooking workshops for cultural preservation'
      }
    ],
    learnMore: {
      workshops: [
        {
          name: 'Traditional Cooking Workshop',
          location: 'Rural Tourism Center',
          duration: '3 days',
          cost: '₹2,000',
          contact: '+91-7654321098'
        }
      ],
      museums: ['Agricultural Heritage Museum'],
      culturalCenters: ['Culinary Arts Center', 'Traditional Knowledge Center']
    }
  }
];

// Utility functions
export const getSeasonalFestivals = (season: string) => {
  return festivalData.filter(festival => festival.season === season);
};

export const getFestivalsByMonth = (month: string) => {
  return festivalData.filter(festival => festival.months.includes(month));
};

export const getCulturalElementsByType = (type: string) => {
  return culturalData.filter(element => element.type === type);
};

export const searchFestivals = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return festivalData.filter(festival => 
    festival.name.toLowerCase().includes(lowercaseQuery) ||
    festival.nameLocal.includes(lowercaseQuery) ||
    festival.description.short.toLowerCase().includes(lowercaseQuery) ||
    festival.location.districts.some(district => district.toLowerCase().includes(lowercaseQuery))
  );
};
