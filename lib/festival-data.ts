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
  hero: 'https://st.adda247.com/https://wpassets.adda247.com/wp-content/uploads/multisite/sites/5/2022/04/07080859/Sarhul-Festival-04-1.jpg',
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
  hero: 'https://i.pinimg.com/originals/d1/5e/0c/d15e0c73f97fe02eaafd28dfc88b4a0f.jpg',
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
  hero: 'https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/DXC9AW/tribal-men-playing-musical-instruments-during-karma-puja-festival-DXC9AW.jpg',
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
  hero: 'https://tribaldarshan.com/wp-content/uploads/2024/09/PTI09_25_2023_000235B-1301586945.jpg',
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
    id: 'jitiya',
    name: 'Jitiya Festival',
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
  hero: 'https://imagepasal.com/watermark/Jitiya-Festival-janakpur-12-image-pasal-2021-09-28.jpg',
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
  },
  {
    id: 'chhath-puja',
    name: 'Chhath Puja',
    nameLocal: 'छठ पूजा',
    category: 'religious',
    season: 'winter',
    months: ['October', 'November'],
    dates: {
      lunar: 'Kartik Shukla Shashthi',
      duration: 4
    },
    location: {
      primary: 'Deoghar, Dumka, Giridih',
      coordinates: { lat: 24.4833, lng: 86.6833 },
      districts: ['Deoghar', 'Dumka', 'Giridih', 'Godda', 'Sahebganj'],
      venues: ['River banks', 'Water bodies', 'Ghats', 'Ponds']
    },
    description: {
      short: 'Ancient sun worship festival dedicated to Surya Dev and Chhathi Maiya, involving rigorous fasting and prayers at water bodies.',
      detailed: 'Chhath Puja is one of the most significant festivals in Jharkhand, where devotees offer prayers to the Sun god and Chhathi Maiya while standing in water bodies. The festival involves strict fasting, ritual bathing, and offering prayers during sunrise and sunset.',
      significance: 'Represents devotion to natural elements, purification of mind and body, and seeking blessings for family welfare and prosperity.',
      mythology: 'Dedicated to Surya Dev (Sun god) and his wife Usha (dawn) and Pratyusha (dusk), believed to cure diseases and grant longevity.'
    },
    history: {
      origin: 'Ancient Vedic tradition dating back to the Rigveda period, practiced for over 3000 years',
      evolution: 'From purely sun worship to elaborate family and community celebrations',
      modernPractices: 'Now includes environmental awareness, river cleaning drives, and cultural programs'
    },
    rituals: [
      'Nahay Khay (holy bathing and pure food)',
      'Lohanda and Kharna (day-long fasting)',
      'Evening Arghya (sunset prayers in water)',
      'Morning Arghya (sunrise prayers)',
      'Parana (breaking the fast with prasad)'
    ],
    traditions: {
      music: ['Chhath geet (folk songs)', 'Devotional bhajans', 'Traditional drums'],
      dance: ['Folk dances around ghats', 'Community celebrations', 'Cultural performances'],
      attire: ['Clean dhoti for men', 'Traditional saris for women', 'Simple jewelry', 'No leather items'],
      food: ['Thekua (wheat cookies)', 'Kheer', 'Fruits', 'Pure vegetarian prasad']
    },
    media: {
      hero: 'https://www.hindustantimes.com/ht-img/img/2023/11/19/1600x900/chhath-puja_1700391888779_1700391889016.jpg',
      gallery: [
        '/festivals/chhath-ghat.jpg',
        '/festivals/chhath-offerings.jpg',
        '/festivals/chhath-devotees.jpg',
        '/festivals/chhath-sunset.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Legend of Draupadi',
          content: 'In the Mahabharata, Draupadi observed Chhath Puja to regain the lost kingdom of Pandavas. Her devotion pleased Surya Dev, who blessed them with victory.',
          moral: 'Sincere devotion and faith can overcome the greatest challenges and restore lost fortunes.'
        }
      ]
    },
    recipes: [
      {
        name: 'Thekua',
        ingredients: ['Whole wheat flour', 'Jaggery', 'Ghee', 'Coconut', 'Dry fruits'],
        method: [
          'Mix wheat flour with melted jaggery',
          'Add ghee and make stiff dough',
          'Shape into decorative patterns',
          'Deep fry in pure ghee until golden brown'
        ],
        significance: 'Sacred offering to Surya Dev, prepared with utmost purity and devotion',
        image: '/recipes/thekua.jpg'
      }
    ],
    crafts: [
      {
        name: 'Bamboo Soop (Basket)',
        materials: ['Bamboo strips', 'Natural dyes', 'Traditional weaving tools'],
        process: [
          'Select and prepare bamboo strips',
          'Weave in traditional circular pattern',
          'Create decorative edges',
          'Finish with natural coloring'
        ],
        symbolism: 'Sacred vessel for carrying offerings to Surya Dev, representing purity and devotion',
        artisans: ['Traditional basket weavers', 'Rural craftspeople'],
        image: '/crafts/bamboo-soop.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'October-November during the festival period',
      howToReach: 'Fly to Ranchi, then road transport to Deoghar (250 km) or other celebration sites',
      accommodation: ['Dharamshalas near ghats', 'Hotels in main towns', 'Pilgrim lodges'],
      localTransport: 'Local buses, shared jeeps, walking to ghats and water bodies',
      tips: [
        'Wake up before dawn for morning rituals',
        'Respect the fasting devotees',
        'Maintain cleanliness around water bodies',
        'Follow traditional customs and protocols'
      ],
      dos: [
        'Join community cleaning drives',
        'Support local artisans selling ritual items',
        'Learn about sun worship traditions',
        'Participate respectfully in community prayers'
      ],
      donts: [
        'Don\'t pollute water bodies',
        'Don\'t disturb praying devotees',
        'Don\'t consume non-vegetarian food',
        'Don\'t use plastic or synthetic materials'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹20 crores through religious tourism and pilgrimage visits',
      localBusiness: 'Supports priests, vendors, transportation, and accommodation providers',
      artisans: 'Benefits 2,500+ basket weavers and religious item makers'
    },
    conservation: {
      challenges: ['Water body pollution', 'Overcrowding at popular sites', 'Environmental degradation'],
      efforts: ['River cleaning campaigns', 'Eco-friendly celebration guidelines', 'Community awareness programs'],
      futureOutlook: 'Integration with water conservation and sustainable pilgrimage practices'
    },
    seo: {
      metaTitle: 'Chhath Puja Jharkhand - Sacred Sun Worship Festival | River Ghats Celebration',
      metaDescription: 'Experience Chhath Puja in Jharkhand with sacred sun worship, river ghat celebrations, and traditional rituals. Join millions in this ancient festival.',
      keywords: ['Chhath Puja', 'sun worship', 'river ghat festival', 'Deoghar celebration', 'Jharkhand religious festival'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Chhath Puja',
        'location': 'Deoghar, Jharkhand',
        'startDate': 'October',
        'description': 'Ancient sun worship festival celebrated at river ghats and water bodies'
      }
    }
  },
  {
    id: 'kali-puja',
    name: 'Kali Puja',
    nameLocal: 'काली पूजा',
    category: 'religious',
    season: 'winter',
    months: ['October', 'November'],
    dates: {
      lunar: 'Kartik Amavasya (New Moon)',
      duration: 1
    },
    location: {
      primary: 'Ranchi, Jamshedpur, Dhanbad',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['Ranchi', 'East Singhbhum', 'Dhanbad', 'Bokaro'],
      venues: ['Pandals', 'Kali temples', 'Community halls', 'Street corners']
    },
    description: {
      short: 'Powerful goddess worship festival celebrating Kali Ma with elaborate pandals, cultural programs, and midnight prayers.',
      detailed: 'Kali Puja in Jharkhand is celebrated with great fervor, featuring artistic pandals, cultural performances, and devotional activities. The festival celebrates the divine feminine power and protection of Goddess Kali.',
      significance: 'Represents triumph of good over evil, divine feminine power, and protection from negative forces.',
      mythology: 'Celebrates Goddess Kali\'s victory over demons, symbolizing the destruction of evil and protection of righteousness.'
    },
    history: {
      origin: 'Ancient goddess worship tradition with strong Bengal influence, popularized in Jharkhand over 200 years',
      evolution: 'From simple temple worship to elaborate community celebrations with artistic pandals',
      modernPractices: 'Includes cultural competitions, social awareness programs, and community bonding activities'
    },
    rituals: [
      'Elaborate pandal decoration and idol preparation',
      'Evening aarti and devotional songs',
      'Midnight special prayers and offerings',
      'Cultural programs and community feasting',
      'Immersion ceremony on the following day'
    ],
    traditions: {
      music: ['Devotional bhajans', 'Cultural songs', 'Traditional drums and cymbals'],
      dance: ['Classical dance performances', 'Folk dances', 'Cultural programs'],
      attire: ['Red and black themed clothing', 'Traditional jewelry', 'Festive wear'],
      food: ['Khichuri (rice and lentil dish)', 'Fish curry', 'Sweets', 'Vegetarian feast']
    },
    media: {
      hero: 'https://images.news18.com/ibnlive/uploads/2021/11/kali-puja-16363176583x2.jpg',
      gallery: [
        '/festivals/kali-pandal.jpg',
        '/festivals/kali-aarti.jpg',
        '/festivals/kali-cultural.jpg',
        '/festivals/kali-community.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'Kali and the Demons',
          content: 'When evil demons threatened the world, Goddess Kali emerged from Durga\'s forehead to destroy them. Her fierce form represents the power needed to overcome darkness.',
          moral: 'Sometimes fierce action is necessary to protect goodness and defeat evil forces.'
        }
      ]
    },
    recipes: [
      {
        name: 'Khichuri',
        ingredients: ['Basmati rice', 'Moong dal', 'Ghee', 'Cumin seeds', 'Bay leaves', 'Salt'],
        method: [
          'Wash rice and dal together',
          'Heat ghee, add cumin and bay leaves',
          'Add rice and dal, stir well',
          'Add water and cook until soft and mushy'
        ],
        significance: 'Traditional offering to Goddess Kali, representing simplicity and devotion',
        image: '/recipes/khichuri.jpg'
      }
    ],
    crafts: [
      {
        name: 'Pandal Decoration Art',
        materials: ['Bamboo frames', 'Colorful cloth', 'Artificial flowers', 'Lights', 'Decorative items'],
        process: [
          'Create bamboo framework',
          'Drape with decorative cloth',
          'Add artistic elements and flowers',
          'Install lighting and special effects'
        ],
        symbolism: 'Creates sacred space for goddess worship and community gathering',
        artisans: ['Pandal decorators', 'Community volunteers', 'Local artists'],
        image: '/crafts/pandal-art.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'October-November during Kali Puja celebrations',
      howToReach: 'Accessible in all major cities of Jharkhand via air, rail, and road transport',
      accommodation: ['City hotels', 'Guest houses', 'Dharamshalas'],
      localTransport: 'Local buses, auto-rickshaws, taxis for pandal hopping',
      tips: [
        'Visit pandals in the evening for best experience',
        'Respect queue systems at popular pandals',
        'Carry cash for offerings and food',
        'Join community celebrations respectfully'
      ],
      dos: [
        'Appreciate the artistic pandals',
        'Participate in cultural programs',
        'Support local vendors and artists',
        'Learn about goddess worship traditions'
      ],
      donts: [
        'Don\'t touch decorations without permission',
        'Don\'t create disturbances during prayers',
        'Don\'t litter around pandal areas',
        'Don\'t take flash photography of idols'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹12 crores through festival tourism and cultural visits',
      localBusiness: 'Boosts sales for decorators, food vendors, and cultural performers',
      artisans: 'Provides income to 1,000+ artists, decorators, and cultural workers'
    },
    conservation: {
      challenges: ['Noise pollution during celebrations', 'Waste generation from decorations', 'Traffic congestion'],
      efforts: ['Eco-friendly decoration guidelines', 'Waste management programs', 'Community awareness campaigns'],
      futureOutlook: 'Promotion of sustainable celebration practices and digital cultural documentation'
    },
    seo: {
      metaTitle: 'Kali Puja Jharkhand - Goddess Worship Festival | Pandal Celebrations',
      metaDescription: 'Experience Kali Puja celebrations in Jharkhand with elaborate pandals, cultural programs, and devotional activities. Join the divine goddess worship.',
      keywords: ['Kali Puja', 'goddess worship', 'pandal celebrations', 'Jharkhand festivals', 'divine feminine power'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Kali Puja',
        'location': 'Jharkhand cities',
        'startDate': 'October',
        'description': 'Goddess Kali worship festival with elaborate pandals and cultural celebrations'
      }
    }
  },
  {
    id: 'makar-sankranti',
    name: 'Makar Sankranti',
    nameLocal: 'मकर संक्रांति',
    category: 'seasonal',
    season: 'winter',
    months: ['January'],
    dates: {
      gregorian: 'January 14',
      lunar: 'Sun enters Capricorn',
      duration: 1
    },
    location: {
      primary: 'Throughout Jharkhand',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['All districts celebrate'],
      venues: ['Rooftops', 'Open fields', 'River banks', 'Community centers']
    },
    description: {
      short: 'Harvest festival marking the sun\'s northward journey, celebrated with kite flying, til-gud sweets, and thanksgiving prayers.',
      detailed: 'Makar Sankranti celebrates the end of winter solstice and beginning of longer days. In Jharkhand, it\'s observed with kite flying competitions, preparation of sesame and jaggery sweets, and community celebrations.',
      significance: 'Marks astronomical transition, celebrates harvest abundance, and promotes community bonding through shared festivities.',
      mythology: 'Represents the sun god\'s journey northward, bringing positive energy, prosperity, and the end of darkness.'
    },
    history: {
      origin: 'Ancient solar calendar festival dating back to Vedic times, celebrated across India for over 1000 years',
      evolution: 'Incorporated regional traditions like kite flying and local sweet preparations',
      modernPractices: 'Includes kite flying competitions, cultural programs, and community feasts'
    },
    rituals: [
      'Early morning holy bath in rivers or water bodies',
      'Offering prayers to Surya Dev (Sun god)',
      'Preparation and sharing of til-gud sweets',
      'Kite flying throughout the day',
      'Community feasting and cultural programs'
    ],
    traditions: {
      music: ['Folk songs about harvest', 'Seasonal celebration music', 'Community singing'],
      dance: ['Folk dances celebrating harvest', 'Kite flying celebrations', 'Community performances'],
      attire: ['Bright colored clothes', 'Traditional wear', 'Festive accessories'],
      food: ['Til-gud laddoos', 'Khichdi', 'Seasonal vegetables', 'Milk-based sweets']
    },
    media: {
      hero: 'https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1287795540_20200110174053_20200110174120.jpg',
      gallery: [
        '/festivals/makar-kites.jpg',
        '/festivals/makar-sweets.jpg',
        '/festivals/makar-celebration.jpg',
        '/festivals/makar-community.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Sun\'s Northward Journey',
          content: 'Long ago, when earth was covered in darkness, the Sun god decided to move northward, bringing light and warmth. This day marks his blessed journey.',
          moral: 'After every period of darkness and cold, light and warmth return to bring joy and prosperity.'
        }
      ]
    },
    recipes: [
      {
        name: 'Til-Gud Laddoo',
        ingredients: ['Sesame seeds', 'Jaggery', 'Ghee', 'Cardamom powder'],
        method: [
          'Roast sesame seeds until aromatic',
          'Melt jaggery with little ghee',
          'Mix with sesame seeds and cardamom',
          'Shape into round laddoos while warm'
        ],
        significance: 'Traditional winter sweet providing warmth and energy, exchanged for good wishes',
        image: '/recipes/til-gud-laddoo.jpg'
      }
    ],
    crafts: [
      {
        name: 'Traditional Kite Making',
        materials: ['Thin paper', 'Bamboo sticks', 'Thread', 'Natural glue', 'Colorful paints'],
        process: [
          'Cut paper in kite shape',
          'Attach bamboo frame',
          'Decorate with colorful designs',
          'Attach flying thread securely'
        ],
        symbolism: 'Represents freedom, joy, and connection between earth and sky',
        artisans: ['Traditional kite makers', 'Local craftspeople', 'Community artists'],
        image: '/crafts/traditional-kites.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'January 14 and surrounding days for complete celebration experience',
      howToReach: 'Celebrated throughout Jharkhand, accessible via all major transportation modes',
      accommodation: ['Available in all towns and cities', 'Homestays', 'Guest houses'],
      localTransport: 'Local transport to reach kite flying venues and celebration sites',
      tips: [
        'Join rooftop kite flying sessions',
        'Learn kite flying techniques from locals',
        'Try traditional til-gud preparations',
        'Participate in community celebrations'
      ],
      dos: [
        'Fly kites safely away from power lines',
        'Share sweets with neighbors and friends',
        'Enjoy the festive atmosphere',
        'Learn about seasonal celebrations'
      ],
      donts: [
        'Don\'t fly kites near electrical wires',
        'Don\'t use sharp or metal strings',
        'Don\'t litter kite remains',
        'Don\'t disturb others\' celebrations'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹6 crores through festival tourism and kite industry',
      localBusiness: 'Boosts kite sellers, sweet makers, and local vendors',
      artisans: 'Benefits 500+ kite makers and traditional sweet preparers'
    },
    conservation: {
      challenges: ['Kite string waste causing environmental issues', 'Plastic kites pollution'],
      efforts: ['Promotion of eco-friendly kites and strings', 'Clean-up drives after celebrations'],
      futureOutlook: 'Development of biodegradable kite materials and sustainable celebration practices'
    },
    seo: {
      metaTitle: 'Makar Sankranti Jharkhand - Kite Flying Festival | Harvest Celebration',
      metaDescription: 'Celebrate Makar Sankranti in Jharkhand with colorful kites, traditional sweets, and harvest festivities. Join the joyous seasonal celebration.',
      keywords: ['Makar Sankranti', 'kite flying festival', 'til gud sweets', 'harvest celebration', 'Jharkhand festivals'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Makar Sankranti',
        'location': 'Jharkhand',
        'startDate': 'January',
        'description': 'Harvest and kite flying festival marking the sun\'s northward journey'
      }
    }
  },
  {
    id: 'poila-boishakh',
    name: 'Poila Boishakh (Bengali New Year)',
    nameLocal: 'पहला बैशाख',
    category: 'cultural',
    season: 'spring',
    months: ['April', 'May'],
    dates: {
      gregorian: 'April 14-15',
      lunar: 'First day of Bengali calendar',
      duration: 1
    },
    location: {
      primary: 'Jamshedpur, Dhanbad, Asansol region',
      coordinates: { lat: 22.8046, lng: 86.2029 },
      districts: ['East Singhbhum', 'Dhanbad', 'Bokaro', 'Deoghar'],
      venues: ['Cultural centers', 'Bengali associations', 'Community halls', 'Public spaces']
    },
    description: {
      short: 'Bengali New Year celebration featuring traditional food, cultural programs, and community festivities among Bengali communities in Jharkhand.',
      detailed: 'Poila Boishakh is celebrated by the significant Bengali population in Jharkhand, particularly in industrial cities. The day begins with traditional prayers, cultural programs, and elaborate feasts featuring Bengali delicacies.',
      significance: 'Celebrates new beginnings, cultural identity preservation, and community bonding among Bengali residents of Jharkhand.',
      mythology: 'Marks the beginning of the Bengali solar calendar, associated with prosperity, good fortune, and fresh starts.'
    },
    history: {
      origin: 'Brought by Bengali settlers and workers in Jharkhand\'s industrial areas over the past 150 years',
      evolution: 'From family celebrations to large community festivals with cultural programs',
      modernPractices: 'Includes cultural competitions, food festivals, and community service activities'
    },
    rituals: [
      'Early morning prayers and offerings',
      'Reading from Bengali almanac (Panchang)',
      'Community cultural programs and performances',
      'Traditional Bengali feast preparation and sharing',
      'Business community worship for prosperity'
    ],
    traditions: {
      music: ['Rabindra Sangeet', 'Bengali folk songs', 'Cultural music programs'],
      dance: ['Classical Bengali dances', 'Folk performances', 'Cultural presentations'],
      attire: ['Traditional Bengali dhoti-kurta for men', 'Beautiful saris for women', 'Cultural costumes'],
      food: ['Shorshe Ilish (Hilsa fish curry)', 'Mishti (Bengali sweets)', 'Panta Bhat', 'Traditional Bengali thali']
    },
    media: {
      hero: 'https://images.hindustantimes.com/img/2021/04/14/550x309/nababarsha_1586860377454_1618395056095.jpg',
      gallery: [
        '/festivals/poila-cultural.jpg',
        '/festivals/poila-food.jpg',
        '/festivals/poila-community.jpg',
        '/festivals/poila-celebrations.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Merchant\'s New Beginning',
          content: 'A Bengali merchant started his new business on Poila Boishakh. With hard work and community support, he prospered, inspiring others to begin ventures on this auspicious day.',
          moral: 'New beginnings with community support and dedication lead to success and prosperity.'
        }
      ]
    },
    recipes: [
      {
        name: 'Shorshe Ilish',
        ingredients: ['Hilsa fish', 'Mustard seeds', 'Turmeric', 'Green chilies', 'Mustard oil'],
        method: [
          'Marinate fish pieces with turmeric and salt',
          'Make mustard seed paste with green chilies',
          'Cook fish lightly in mustard oil',
          'Simmer with mustard paste until cooked'
        ],
        significance: 'Traditional Bengali delicacy symbolizing prosperity and good fortune for the new year',
        image: '/recipes/shorshe-ilish.jpg'
      }
    ],
    crafts: [
      {
        name: 'Bengali Alpona Art',
        materials: ['Rice flour', 'Water', 'Natural colors', 'Fingers for drawing'],
        process: [
          'Mix rice flour with water',
          'Create traditional motifs on floors',
          'Draw geometric and floral patterns',
          'Add colors for festive decoration'
        ],
        symbolism: 'Sacred art form representing welcome, prosperity, and cultural identity',
        artisans: ['Bengali women artists', 'Cultural community members'],
        image: '/crafts/alpona-art.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'April 14-15 for authentic Bengali New Year celebrations',
      howToReach: 'Major industrial cities of Jharkhand accessible by all transport modes',
      accommodation: ['City hotels', 'Bengali community guest houses', 'Cultural center lodging'],
      localTransport: 'Local transport to cultural centers and celebration venues',
      tips: [
        'Join Bengali association celebrations',
        'Try authentic Bengali cuisine',
        'Enjoy cultural performances',
        'Learn about Bengali traditions'
      ],
      dos: [
        'Participate respectfully in cultural programs',
        'Appreciate Bengali art and music',
        'Support community food stalls',
        'Learn Bengali greetings and customs'
      ],
      donts: [
        'Don\'t interrupt ongoing cultural performances',
        'Don\'t ignore community protocols',
        'Don\'t waste traditional food preparations',
        'Don\'t take photographs without permission'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹3 crores through cultural tourism and community celebrations',
      localBusiness: 'Benefits Bengali restaurants, cultural performers, and traditional item sellers',
      artisans: 'Supports 300+ cultural artists, musicians, and food preparers'
    },
    conservation: {
      challenges: ['Younger generation\'s disconnection from traditions', 'Migration affecting community size'],
      efforts: ['Cultural education programs', 'Youth engagement activities', 'Digital documentation'],
      futureOutlook: 'Integration with mainstream Jharkhand culture while preserving Bengali identity'
    },
    seo: {
      metaTitle: 'Poila Boishakh Jharkhand - Bengali New Year Celebration | Cultural Festival',
      metaDescription: 'Celebrate Bengali New Year (Poila Boishakh) in Jharkhand with traditional food, cultural programs, and community festivities.',
      keywords: ['Poila Boishakh', 'Bengali New Year', 'Bengali community Jharkhand', 'cultural celebration', 'traditional Bengali festival'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Poila Boishakh',
        'location': 'Jamshedpur, Jharkhand',
        'startDate': 'April',
        'description': 'Bengali New Year celebration with traditional food and cultural programs'
      }
    }
  },
  {
    id: 'holi',
    name: 'Holi Festival',
    nameLocal: 'होली',
    category: 'cultural',
    season: 'spring',
    months: ['March'],
    dates: {
      lunar: 'Phalgun Purnima',
      duration: 2
    },
    location: {
      primary: 'Throughout Jharkhand',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['All districts celebrate with regional variations'],
      venues: ['Community spaces', 'Temples', 'Open areas', 'Tribal villages']
    },
    description: {
      short: 'Vibrant spring festival of colors celebrated with enthusiasm across Jharkhand, featuring tribal and local variations of the traditional Holi celebrations.',
      detailed: 'Holi in Jharkhand combines traditional Hindu celebrations with unique tribal customs. Communities celebrate with natural colors, folk dances, traditional music, and special foods, creating a colorful fusion of cultures.',
      significance: 'Symbolizes victory of good over evil, arrival of spring, and unity among diverse communities of Jharkhand.',
      mythology: 'Based on the legend of Prahlad and Holika, representing divine protection and triumph of devotion over evil.'
    },
    history: {
      origin: 'Ancient Hindu festival adapted by tribal communities with local customs and traditions',
      evolution: 'Incorporated tribal dance forms, local music, and natural color preparations',
      modernPractices: 'Includes eco-friendly celebrations, cultural programs, and community harmony events'
    },
    rituals: [
      'Holika Dahan (bonfire) on the evening before',
      'Playing with natural colors and water',
      'Traditional tribal dances and music',
      'Preparation and sharing of special foods',
      'Community feasting and cultural programs'
    ],
    traditions: {
      music: ['Holi folk songs', 'Tribal music with dhol and nagara', 'Community singing'],
      dance: ['Tribal folk dances', 'Group dancing with colors', 'Traditional formations'],
      attire: ['White clothes for color play', 'Traditional tribal wear', 'Old festive clothes'],
      food: ['Gujiya', 'Thandai', 'Traditional tribal delicacies', 'Sweet preparations']
    },
    media: {
      hero: 'https://images.indianexpress.com/2023/03/holi-festival-1200.jpg',
      gallery: [
        '/festivals/holi-colors.jpg',
        '/festivals/holi-tribal.jpg',
        '/festivals/holi-community.jpg',
        '/festivals/holi-celebration.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Colors of Unity',
          content: 'In a Jharkhand village, people from different tribes celebrated Holi together, mixing their traditional colors. The festival brought such joy that they decided to celebrate together every year.',
          moral: 'Diversity in traditions creates more beautiful celebrations when communities unite with respect and love.'
        }
      ]
    },
    recipes: [
      {
        name: 'Gujiya',
        ingredients: ['All-purpose flour', 'Khoya (milk solids)', 'Coconut', 'Dates', 'Cardamom', 'Ghee'],
        method: [
          'Make dough with flour and ghee',
          'Prepare filling with khoya, coconut, and dates',
          'Shape into crescents with filling',
          'Deep fry until golden brown'
        ],
        significance: 'Traditional Holi sweet symbolizing sweetness and prosperity in relationships',
        image: '/recipes/gujiya.jpg'
      }
    ],
    crafts: [
      {
        name: 'Natural Color Preparation',
        materials: ['Turmeric', 'Beetroot', 'Spinach', 'Marigold flowers', 'Rose petals'],
        process: [
          'Dry and powder flower petals',
          'Extract vegetable-based colors',
          'Mix with natural binding agents',
          'Store in eco-friendly containers'
        ],
        symbolism: 'Represents harmony with nature and safe celebration practices',
        artisans: ['Tribal women', 'Eco-conscious communities', 'Traditional knowledge holders'],
        image: '/crafts/natural-colors.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'March during the Holi festival period',
      howToReach: 'Celebrated throughout Jharkhand, accessible via all major routes',
      accommodation: ['Available in all major towns', 'Tribal homestays', 'Cultural centers'],
      localTransport: 'Local transport to reach celebration venues and tribal areas',
      tips: [
        'Wear old or white clothes for color play',
        'Use only natural, skin-safe colors',
        'Respect tribal customs and traditions',
        'Join community celebrations with permission'
      ],
      dos: [
        'Play Holi with consent and respect',
        'Support eco-friendly celebrations',
        'Learn about tribal Holi traditions',
        'Participate in community harmony activities'
      ],
      donts: [
        'Don\'t use chemical or harmful colors',
        'Don\'t force participation on unwilling people',
        'Don\'t waste water during celebrations',
        'Don\'t disrespect cultural sensitivities'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹10 crores through festival tourism and cultural experiences',
      localBusiness: 'Boosts color vendors, sweet makers, and cultural performers',
      artisans: 'Benefits 800+ natural color makers and traditional sweet preparers'
    },
    conservation: {
      challenges: ['Use of chemical colors affecting health and environment', 'Water wastage during celebrations'],
      efforts: ['Promotion of natural colors', 'Water conservation awareness', 'Eco-friendly celebration guidelines'],
      futureOutlook: 'Development of completely sustainable and eco-friendly Holi celebrations'
    },
    seo: {
      metaTitle: 'Holi Festival Jharkhand - Colorful Spring Celebration | Tribal Holi Traditions',
      metaDescription: 'Experience vibrant Holi celebrations in Jharkhand with tribal traditions, natural colors, folk dances, and community festivities.',
      keywords: ['Holi festival Jharkhand', 'tribal Holi', 'natural colors', 'spring festival', 'cultural celebration'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Holi Festival',
        'location': 'Jharkhand',
        'startDate': 'March',
        'description': 'Colorful spring festival with tribal traditions and natural celebrations'
      }
    }
  },
  {
    id: 'dussehra',
    name: 'Dussehra Festival',
    nameLocal: 'दशहरा',
    category: 'religious',
    season: 'monsoon',
    months: ['September', 'October'],
    dates: {
      lunar: 'Ashwin Shukla Dashami',
      duration: 10
    },
    location: {
      primary: 'Throughout Jharkhand',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['All districts with grand celebrations in major cities'],
      venues: ['Ramleela grounds', 'Community centers', 'Open fields', 'Temple complexes']
    },
    description: {
      short: 'Ten-day festival celebrating Lord Rama\'s victory over Ravana, featuring elaborate Ramleela performances, cultural programs, and grand effigy burning ceremonies.',
      detailed: 'Dussehra in Jharkhand is celebrated with great enthusiasm through dramatic Ramleela performances, showcasing the epic Ramayana. The festival culminates with the burning of Ravana effigies symbolizing the victory of good over evil.',
      significance: 'Represents triumph of righteousness over evil, moral values, and cultural preservation through traditional storytelling.',
      mythology: 'Based on the Ramayana epic, celebrating Lord Rama\'s victory over the demon king Ravana and the rescue of Sita.'
    },
    history: {
      origin: 'Ancient Hindu tradition established in Jharkhand through cultural migration and religious practices',
      evolution: 'Developed elaborate local Ramleela traditions incorporating regional artistic elements',
      modernPractices: 'Includes modern staging techniques, sound systems, and community participation programs'
    },
    rituals: [
      'Nine days of Ramleela performances',
      'Daily narration of Ramayana episodes',
      'Community participation in dramatic presentations',
      'Preparation of large Ravana effigies',
      'Grand celebration with effigy burning on Dashami'
    ],
    traditions: {
      music: ['Traditional bhajans', 'Dramatic musical scores', 'Folk music accompaniment'],
      dance: ['Classical dance performances', 'Folk dances', 'Dramatic expressions'],
      attire: ['Period costumes for performers', 'Traditional dress for audience', 'Colorful decorations'],
      food: ['Prasadam distribution', 'Community feasts', 'Traditional sweets', 'Seasonal preparations']
    },
    media: {
      hero: 'https://images.indianexpress.com/2020/10/dussehra-2020.jpg',
      gallery: [
        '/festivals/dussehra-ramleela.jpg',
        '/festivals/dussehra-ravana.jpg',
        '/festivals/dussehra-celebration.jpg',
        '/festivals/dussehra-community.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Power of Unity Against Evil',
          content: 'In a Jharkhand town, different communities came together to organize Ramleela. Their unity and cooperation made the celebration so successful that it brought lasting peace and harmony to the region.',
          moral: 'When communities unite for righteous causes, they can overcome any challenge and create lasting positive change.'
        }
      ]
    },
    recipes: [
      {
        name: 'Coconut Barfi',
        ingredients: ['Fresh coconut', 'Sugar', 'Milk', 'Cardamom', 'Ghee'],
        method: [
          'Grate fresh coconut finely',
          'Cook with sugar and milk on low heat',
          'Stir continuously until thick',
          'Add cardamom and set in greased tray'
        ],
        significance: 'Traditional sweet offered as prasadam during Dussehra celebrations',
        image: '/recipes/coconut-barfi.jpg'
      }
    ],
    crafts: [
      {
        name: 'Ravana Effigy Making',
        materials: ['Bamboo frame', 'Paper and cloth', 'Firecrackers', 'Paints', 'Decorative items'],
        process: [
          'Create large bamboo framework',
          'Cover with paper and cloth',
          'Paint with artistic designs',
          'Install firecrackers for burning effect'
        ],
        symbolism: 'Represents the destruction of evil and negative forces in society',
        artisans: ['Local craftsmen', 'Community volunteers', 'Traditional artists'],
        image: '/crafts/ravana-effigy.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'September-October during the ten-day celebration period',
      howToReach: 'Major celebrations accessible in all cities and towns of Jharkhand',
      accommodation: ['Hotels in major cities', 'Dharamshalas', 'Community lodging'],
      localTransport: 'Local buses, auto-rickshaws to reach Ramleela venues',
      tips: [
        'Attend Ramleela performances daily',
        'Learn about Ramayana stories and characters',
        'Participate in community activities',
        'Witness the grand finale effigy burning'
      ],
      dos: [
        'Respect the religious and cultural significance',
        'Support local artists and performers',
        'Participate in community service during festival',
        'Learn about moral values from the epic'
      ],
      donts: [
        'Don\'t disturb ongoing performances',
        'Don\'t stand too close during effigy burning',
        'Don\'t litter the celebration venues',
        'Don\'t disrespect the religious sentiments'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹15 crores through cultural tourism and festival activities',
      localBusiness: 'Benefits costume makers, food vendors, and cultural performers',
      artisans: 'Provides income to 1,200+ artists, craftspeople, and performers'
    },
    conservation: {
      challenges: ['Environmental impact of effigy burning', 'Noise pollution during celebrations'],
      efforts: ['Eco-friendly effigy materials', 'Controlled burning practices', 'Community awareness programs'],
      futureOutlook: 'Development of sustainable celebration methods while preserving cultural significance'
    },
    seo: {
      metaTitle: 'Dussehra Festival Jharkhand - Ramleela Performances & Victory Celebrations',
      metaDescription: 'Experience grand Dussehra celebrations in Jharkhand with traditional Ramleela performances, cultural programs, and victory of good over evil.',
      keywords: ['Dussehra festival', 'Ramleela Jharkhand', 'victory celebration', 'cultural performances', 'religious festival'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Dussehra Festival',
        'location': 'Jharkhand',
        'startDate': 'September',
        'description': 'Ten-day festival with Ramleela performances celebrating victory of good over evil'
      }
    }
  },
  {
    id: 'guru-purnima',
    name: 'Guru Purnima',
    nameLocal: 'गुरु पूर्णिमा',
    category: 'religious',
    season: 'monsoon',
    months: ['July'],
    dates: {
      lunar: 'Ashadha Purnima (Full Moon)',
      duration: 1
    },
    location: {
      primary: 'Throughout Jharkhand',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['All districts with special emphasis on educational centers'],
      venues: ['Schools', 'Colleges', 'Ashrams', 'Temples', 'Cultural centers']
    },
    description: {
      short: 'Sacred day honoring teachers and gurus, celebrated with reverence by students and disciples across Jharkhand\'s educational institutions.',
      detailed: 'Guru Purnima is a significant festival in Jharkhand where students honor their teachers and spiritual guides. The day is marked by special prayers, cultural programs, and expressions of gratitude towards educators who have shaped lives and preserved traditional knowledge.',
      significance: 'Represents respect for knowledge, wisdom, and the sacred teacher-student relationship that forms the foundation of learning and cultural preservation.',
      mythology: 'Commemorates sage Vyasa, the author of the Mahabharata, and celebrates all gurus who pass on knowledge and wisdom to future generations.'
    },
    history: {
      origin: 'Ancient Hindu tradition honoring teachers, especially relevant in Jharkhand\'s tribal communities where oral traditions are passed through generations',
      evolution: 'Expanded from religious observance to include modern educational institutions and tribal knowledge keepers',
      modernPractices: 'Includes teacher appreciation programs, cultural performances, and scholarship distributions'
    },
    rituals: [
      'Early morning prayers and offerings to teachers',
      'Special puja ceremonies in educational institutions',
      'Students touching feet of teachers for blessings',
      'Cultural programs showcasing traditional arts',
      'Community feasts and knowledge sharing sessions'
    ],
    traditions: {
      music: ['Devotional bhajans', 'Educational songs', 'Traditional folk music'],
      dance: ['Classical dance performances by students', 'Folk dances', 'Cultural presentations'],
      attire: ['Traditional white clothes', 'Simple and respectful dress', 'Cultural costumes for performances'],
      food: ['Simple vegetarian meals', 'Traditional sweets', 'Prasadam distribution']
    },
    media: {
      hero: 'https://images.indianexpress.com/2023/07/guru-purnima-1200.jpg',
      gallery: [
        '/festivals/guru-purnima-ceremony.jpg',
        '/festivals/guru-purnima-students.jpg',
        '/festivals/guru-purnima-cultural.jpg',
        '/festivals/guru-purnima-blessings.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Tribal Guru\'s Wisdom',
          content: 'An old tribal elder in Jharkhand taught his students not just academic subjects, but also forest wisdom, herbal medicine, and respect for nature. His teachings helped preserve ancient knowledge for future generations.',
          moral: 'True education encompasses both modern learning and traditional wisdom, creating well-rounded individuals who respect their heritage.'
        }
      ]
    },
    recipes: [
      {
        name: 'Kheer Prasad',
        ingredients: ['Rice', 'Full-fat milk', 'Sugar', 'Cardamom', 'Almonds', 'Raisins'],
        method: [
          'Cook rice in milk until soft and creamy',
          'Add sugar and cardamom powder',
          'Garnish with chopped almonds and raisins',
          'Serve warm as prasadam to teachers'
        ],
        significance: 'Traditional offering prepared by students to honor their teachers and seek blessings',
        image: '/recipes/kheer-prasad.jpg'
      }
    ],
    crafts: [
      {
        name: 'Gratitude Cards and Garlands',
        materials: ['Handmade paper', 'Natural colors', 'Fresh flowers', 'Decorative items'],
        process: [
          'Create handwritten thank you cards',
          'Make fresh flower garlands',
          'Decorate with traditional motifs',
          'Present to teachers with reverence'
        ],
        symbolism: 'Represents respect, gratitude, and the flowering of knowledge under teacher\'s guidance',
        artisans: ['Students', 'Community members', 'Cultural groups'],
        image: '/crafts/guru-purnima-cards.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'July during Guru Purnima celebration',
      howToReach: 'Celebrated throughout Jharkhand, accessible in all educational centers',
      accommodation: ['Available in all major towns', 'Educational institution guest houses', 'Ashrams'],
      localTransport: 'Local transport to reach schools, colleges, and cultural centers',
      tips: [
        'Respect the sacred nature of teacher-student relationships',
        'Participate in cultural programs if invited',
        'Learn about traditional knowledge systems',
        'Support educational initiatives'
      ],
      dos: [
        'Show respect to all educators and knowledge keepers',
        'Participate in community learning activities',
        'Support tribal knowledge preservation',
        'Learn about local educational traditions'
      ],
      donts: [
        'Don\'t disturb ongoing ceremonies',
        'Don\'t disrespect educational institutions',
        'Don\'t ignore traditional knowledge holders',
        'Don\'t commercialize the sacred occasion'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹4 crores through educational and cultural tourism',
      localBusiness: 'Benefits flower vendors, sweet makers, and cultural performers',
      artisans: 'Supports 400+ traditional craft makers and cultural artists'
    },
    conservation: {
      challenges: ['Modern education systems overshadowing traditional knowledge', 'Declining respect for teachers'],
      efforts: ['Traditional knowledge documentation', 'Teacher appreciation programs', 'Cultural education initiatives'],
      futureOutlook: 'Integration of traditional wisdom with modern education systems'
    },
    seo: {
      metaTitle: 'Guru Purnima Jharkhand - Teacher Appreciation & Knowledge Celebration',
      metaDescription: 'Celebrate Guru Purnima in Jharkhand with traditional teacher honor ceremonies, cultural programs, and educational festivities.',
      keywords: ['Guru Purnima', 'teacher appreciation', 'education festival', 'traditional knowledge', 'Jharkhand culture'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Guru Purnima',
        'location': 'Jharkhand',
        'startDate': 'July',
        'description': 'Sacred festival honoring teachers and educational traditions'
      }
    }
  },
  {
    id: 'rath-yatra',
    name: 'Rath Yatra',
    nameLocal: 'रथ यात्रा',
    category: 'religious',
    season: 'monsoon',
    months: ['June', 'July'],
    dates: {
      lunar: 'Ashadha Shukla Dwitiya',
      duration: 9
    },
    location: {
      primary: 'Ranchi, Jamshedpur, Dhanbad',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['Ranchi', 'East Singhbhum', 'Dhanbad', 'Bokaro'],
      venues: ['Main streets', 'Temple complexes', 'Community centers', 'Public grounds']
    },
    description: {
      short: 'Grand chariot festival of Lord Jagannath featuring massive decorated chariots, devotional processions, and community celebrations.',
      detailed: 'Rath Yatra in Jharkhand is a magnificent celebration where elaborately decorated chariots carrying deities are pulled through streets by thousands of devotees. The festival creates a spiritual atmosphere with continuous chanting, music, and community participation.',
      significance: 'Represents the journey of the divine among people, breaking barriers of caste and class as everyone participates equally in pulling the chariots.',
      mythology: 'Based on Lord Jagannath\'s annual journey to visit his devotees, symbolizing God\'s accessibility to all people regardless of their social status.'
    },
    history: {
      origin: 'Ancient Odishan tradition brought to Jharkhand by migrant communities and adopted widely',
      evolution: 'From simple processions to grand celebrations with massive chariots and community participation',
      modernPractices: 'Includes cultural programs, charitable activities, and inter-community harmony events'
    },
    rituals: [
      'Construction and decoration of massive chariots',
      'Installation of deities in the chariots',
      'Grand procession through main streets',
      'Community participation in chariot pulling',
      'Distribution of prasadam and community feasts'
    ],
    traditions: {
      music: ['Devotional bhajans', 'Traditional drums and cymbals', 'Community singing'],
      dance: ['Folk dances around chariots', 'Cultural performances', 'Devotional expressions'],
      attire: ['Colorful traditional clothes', 'White dhoti and kurta', 'Decorative headgear'],
      food: ['Mahaprasadam', 'Traditional sweets', 'Community feast', 'Sacred food distribution']
    },
    media: {
      hero: 'https://images.indianexpress.com/2023/06/rath-yatra-1200.jpg',
      gallery: [
        '/festivals/rath-yatra-chariot.jpg',
        '/festivals/rath-yatra-procession.jpg',
        '/festivals/rath-yatra-devotees.jpg',
        '/festivals/rath-yatra-celebration.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Unity of Rath Yatra',
          content: 'In a Jharkhand city, people from all communities - Hindu, Muslim, Christian, and tribal - came together to pull the chariot of Rath Yatra. Their unity and devotion created a memorable celebration that strengthened communal harmony.',
          moral: 'True devotion transcends all boundaries and brings diverse communities together in celebration of shared human values.'
        }
      ]
    },
    recipes: [
      {
        name: 'Khaja (Rath Yatra Special)',
        ingredients: ['All-purpose flour', 'Ghee', 'Sugar syrup', 'Cardamom', 'Oil for frying'],
        method: [
          'Make dough with flour, ghee, and water',
          'Roll into thin layers and cut into shapes',
          'Deep fry until golden and crispy',
          'Dip in sugar syrup flavored with cardamom'
        ],
        significance: 'Traditional sweet offered during Rath Yatra, symbolizing sweetness of devotion',
        image: '/recipes/khaja.jpg'
      }
    ],
    crafts: [
      {
        name: 'Chariot Decoration Art',
        materials: ['Colorful fabrics', 'Flowers', 'Decorative items', 'Traditional motifs', 'Lights'],
        process: [
          'Design traditional patterns and motifs',
          'Decorate chariots with fabrics and flowers',
          'Install artistic elements and lights',
          'Create beautiful canopies and coverings'
        ],
        symbolism: 'Represents the divine beauty and grandeur worthy of the deity\'s journey',
        artisans: ['Traditional decorators', 'Community volunteers', 'Local artists'],
        image: '/crafts/chariot-decoration.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'June-July during the 9-day Rath Yatra festival',
      howToReach: 'Major celebrations in cities of Jharkhand accessible by all transport modes',
      accommodation: ['City hotels', 'Dharamshalas', 'Community lodging'],
      localTransport: 'Local buses, walking routes to follow the chariot procession',
      tips: [
        'Join the chariot pulling with reverence',
        'Follow the procession route safely',
        'Participate in community service',
        'Respect the sacred nature of the event'
      ],
      dos: [
        'Participate in community harmony activities',
        'Help in organizing and volunteering',
        'Support local vendors and food stalls',
        'Learn about the spiritual significance'
      ],
      donts: [
        'Don\'t climb on the chariots without permission',
        'Don\'t create disturbances during procession',
        'Don\'t litter the procession route',
        'Don\'t disrespect religious sentiments'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹18 crores through religious tourism and cultural visits',
      localBusiness: 'Benefits decorators, food vendors, and accommodation providers',
      artisans: 'Provides income to 1,500+ craftspeople and cultural workers'
    },
    conservation: {
      challenges: ['Traffic management during processions', 'Environmental impact of decorations'],
      efforts: ['Eco-friendly decoration materials', 'Community cleanup drives', 'Traffic coordination'],
      futureOutlook: 'Development of sustainable celebration practices and cultural tourism'
    },
    seo: {
      metaTitle: 'Rath Yatra Jharkhand - Lord Jagannath Chariot Festival | Grand Procession',
      metaDescription: 'Experience magnificent Rath Yatra celebrations in Jharkhand with grand chariots, devotional processions, and community participation.',
      keywords: ['Rath Yatra', 'chariot festival', 'Lord Jagannath', 'religious procession', 'Jharkhand festivals'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Rath Yatra',
        'location': 'Jharkhand cities',
        'startDate': 'June',
        'description': 'Grand chariot festival with massive decorated chariots and community processions'
      }
    }
  },
  {
    id: 'maha-shivratri',
    name: 'Maha Shivratri',
    nameLocal: 'महा शिवरात्रि',
    category: 'religious',
    season: 'winter',
    months: ['February', 'March'],
    dates: {
      lunar: 'Phalgun Krishna Chaturdashi',
      duration: 1
    },
    location: {
      primary: 'Deoghar, Ranchi, Dumka',
      coordinates: { lat: 24.4833, lng: 86.6833 },
      districts: ['Deoghar', 'Ranchi', 'Dumka', 'Giridih', 'Godda'],
      venues: ['Baidyanath Temple', 'Shiva temples', 'Sacred caves', 'River banks']
    },
    description: {
      short: 'Most sacred night dedicated to Lord Shiva, celebrated with night-long vigils, prayers, and massive pilgrimage to Baidyanath Temple.',
      detailed: 'Maha Shivratri is the most significant festival in Jharkhand, especially at the famous Baidyanath Temple in Deoghar. Millions of devotees undertake the sacred Kanwar Yatra, carrying holy Ganges water to offer to Lord Shiva.',
      significance: 'Represents the cosmic dance of creation and destruction, spiritual awakening, and the triumph of light over darkness.',
      mythology: 'Commemorates the night when Lord Shiva performed the cosmic dance of creation, preservation, and destruction, and the day he married Goddess Parvati.'
    },
    history: {
      origin: 'Ancient Hindu festival with special significance in Jharkhand due to the presence of Baidyanath Jyotirlinga',
      evolution: 'Developed into a massive pilgrimage event drawing millions of devotees from across India',
      modernPractices: 'Includes organized pilgrim facilities, cultural programs, and community service initiatives'
    },
    rituals: [
      'Night-long vigil and continuous prayers',
      'Offering of water, milk, and flowers to Shiva Linga',
      'Kanwar Yatra pilgrimage to Baidyanath Temple',
      'Fasting and meditation throughout the night',
      'Community chanting and devotional singing'
    ],
    traditions: {
      music: ['Shiva bhajans', 'Devotional chanting', 'Temple bells and drums'],
      dance: ['Tandav dance performances', 'Devotional folk dances', 'Cultural presentations'],
      attire: ['White or saffron clothes', 'Rudraksha beads', 'Traditional ash markings'],
      food: ['Fasting foods', 'Fruits and milk', 'Prasadam distribution', 'Simple vegetarian meals']
    },
    media: {
      hero: 'https://images.hindustantimes.com/img/2023/02/18/1600x900/maha-shivratri-2023_1676692378779_1676692379016.jpg',
      gallery: [
        '/festivals/shivratri-temple.jpg',
        '/festivals/shivratri-devotees.jpg',
        '/festivals/shivratri-pilgrimage.jpg',
        '/festivals/shivratri-prayers.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Devotee\'s Journey',
          content: 'A poor devotee walked hundreds of kilometers to reach Baidyanath Temple on Shivratri. His pure devotion moved Lord Shiva so much that he blessed the devotee with prosperity and wisdom.',
          moral: 'True devotion and sincere faith matter more than material offerings in winning divine grace.'
        }
      ]
    },
    recipes: [
      {
        name: 'Thandai',
        ingredients: ['Almonds', 'Cashews', 'Melon seeds', 'Fennel seeds', 'Black pepper', 'Cardamom', 'Milk', 'Sugar'],
        method: [
          'Soak nuts and seeds overnight',
          'Grind into smooth paste with spices',
          'Mix with chilled milk and sugar',
          'Strain and serve as cooling drink'
        ],
        significance: 'Traditional cooling drink offered to Lord Shiva and consumed during fasting',
        image: '/recipes/thandai.jpg'
      }
    ],
    crafts: [
      {
        name: 'Shiva Linga Decoration',
        materials: ['Fresh flowers', 'Bilva leaves', 'Sandalwood paste', 'Sacred threads', 'Natural colors'],
        process: [
          'Clean and purify the Shiva Linga',
          'Apply sandalwood paste and natural colors',
          'Decorate with fresh flowers and bilva leaves',
          'Tie sacred threads with devotion'
        ],
        symbolism: 'Represents the beautification of the divine and offering of nature\'s best to the deity',
        artisans: ['Temple priests', 'Devotee volunteers', 'Traditional decorators'],
        image: '/crafts/shiva-decoration.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'February-March during Maha Shivratri festival',
      howToReach: 'Deoghar is accessible by train and road from major cities, special pilgrim trains during festival',
      accommodation: ['Dharamshalas near temples', 'Hotels in Deoghar', 'Pilgrim guest houses'],
      localTransport: 'Walking routes to temples, shared vehicles, organized pilgrim transport',
      tips: [
        'Start pilgrimage early to avoid crowds',
        'Carry minimal belongings for temple entry',
        'Respect queue systems and temple protocols',
        'Stay hydrated during long waits'
      ],
      dos: [
        'Maintain cleanliness and hygiene',
        'Help fellow pilgrims in need',
        'Participate in community service',
        'Follow temple rules and traditions'
      ],
      donts: [
        'Don\'t carry prohibited items in temples',
        'Don\'t push or create chaos in crowds',
        'Don\'t litter in temple premises',
        'Don\'t disturb ongoing prayers and rituals'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹100+ crores through massive pilgrimage tourism during the festival',
      localBusiness: 'Supports transportation, accommodation, food vendors, and religious item sellers',
      artisans: 'Benefits 5,000+ local businesses and service providers'
    },
    conservation: {
      challenges: ['Massive crowd management', 'Environmental impact of pilgrimage', 'Infrastructure strain'],
      efforts: ['Digital crowd management systems', 'Waste management programs', 'Sustainable pilgrimage practices'],
      futureOutlook: 'Development of eco-friendly pilgrimage infrastructure and crowd management technology'
    },
    seo: {
      metaTitle: 'Maha Shivratri Jharkhand - Baidyanath Temple Pilgrimage | Sacred Festival',
      metaDescription: 'Experience Maha Shivratri at famous Baidyanath Temple in Deoghar, Jharkhand. Join millions in sacred pilgrimage and night-long prayers.',
      keywords: ['Maha Shivratri', 'Baidyanath Temple', 'Deoghar pilgrimage', 'Lord Shiva festival', 'Jharkhand religious tourism'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Maha Shivratri',
        'location': 'Deoghar, Jharkhand',
        'startDate': 'February',
        'description': 'Sacred night of Lord Shiva with massive pilgrimage to Baidyanath Jyotirlinga'
      }
    }
  },
  {
    id: 'vasant-panchami',
    name: 'Vasant Panchami',
    nameLocal: 'वसंत पंचमी',
    category: 'cultural',
    season: 'winter',
    months: ['January', 'February'],
    dates: {
      lunar: 'Magha Shukla Panchami',
      duration: 1
    },
    location: {
      primary: 'Throughout Jharkhand',
      coordinates: { lat: 23.6102, lng: 85.2799 },
      districts: ['All districts with special celebrations in educational institutions'],
      venues: ['Schools', 'Colleges', 'Saraswati temples', 'Cultural centers', 'Community halls']
    },
    description: {
      short: 'Spring festival dedicated to Goddess Saraswati, celebrated with prayers for knowledge, artistic performances, and yellow-themed festivities.',
      detailed: 'Vasant Panchami marks the arrival of spring and honors Goddess Saraswati, the deity of knowledge and arts. In Jharkhand, students and artists seek blessings for wisdom, and the festival is celebrated with vibrant yellow decorations, cultural programs, and traditional rituals.',
      significance: 'Represents the awakening of nature, pursuit of knowledge, and the importance of learning and creativity in human life.',
      mythology: 'Celebrates Goddess Saraswati\'s blessings for wisdom, knowledge, and artistic excellence, and marks the beginning of spring season.'
    },
    history: {
      origin: 'Ancient Hindu festival celebrating the transition from winter to spring and honoring the goddess of learning',
      evolution: 'Adopted by educational institutions across Jharkhand as a day to celebrate learning and creativity',
      modernPractices: 'Includes cultural competitions, book exhibitions, and educational awareness programs'
    },
    rituals: [
      'Special prayers to Goddess Saraswati',
      'Placing books and musical instruments before deity',
      'Wearing yellow clothes and decorations',
      'Cultural programs and artistic performances',
      'Distribution of yellow sweets and prasadam'
    ],
    traditions: {
      music: ['Classical music performances', 'Saraswati bhajans', 'Educational songs'],
      dance: ['Classical dance presentations', 'Cultural performances by students', 'Folk dances'],
      attire: ['Yellow colored clothes', 'Traditional dress', 'Cultural costumes for performances'],
      food: ['Yellow sweets like kesari', 'Saffron-flavored dishes', 'Traditional prasadam']
    },
    media: {
      hero: 'https://images.news18.com/ibnlive/uploads/2023/01/vasant-panchami-2023-16742631533x2.jpg',
      gallery: [
        '/festivals/vasant-panchami-saraswati.jpg',
        '/festivals/vasant-panchami-students.jpg',
        '/festivals/vasant-panchami-cultural.jpg',
        '/festivals/vasant-panchami-yellow.jpg'
      ]
    },
    folklore: {
      stories: [
        {
          title: 'The Student\'s Dedication',
          content: 'A young tribal student in Jharkhand prayed to Goddess Saraswati on Vasant Panchami for wisdom to preserve his community\'s oral traditions. His dedication led him to become a renowned scholar who documented tribal folklore.',
          moral: 'Knowledge pursued with devotion and purpose can preserve cultural heritage and benefit entire communities.'
        }
      ]
    },
    recipes: [
      {
        name: 'Kesari (Saffron Sweet)',
        ingredients: ['Semolina', 'Sugar', 'Ghee', 'Saffron', 'Cardamom', 'Cashews'],
        method: [
          'Roast semolina in ghee until aromatic',
          'Add boiling water and cook until thick',
          'Mix in sugar, saffron, and cardamom',
          'Garnish with roasted cashews'
        ],
        significance: 'Traditional yellow sweet offering to Goddess Saraswati, symbolizing the golden nature of knowledge',
        image: '/recipes/kesari-sweet.jpg'
      }
    ],
    crafts: [
      {
        name: 'Yellow Flower Decorations',
        materials: ['Yellow marigold flowers', 'Banana leaves', 'Yellow cloth', 'Decorative items'],
        process: [
          'Create beautiful flower arrangements',
          'Decorate spaces with yellow themes',
          'Make traditional rangoli patterns',
          'Arrange books and instruments aesthetically'
        ],
        symbolism: 'Yellow represents knowledge, wisdom, and the vibrancy of spring season',
        artisans: ['Students', 'Teachers', 'Community decorators'],
        image: '/crafts/yellow-decorations.jpg'
      }
    ],
    travelInfo: {
      bestTimeToVisit: 'January-February during Vasant Panchami celebration',
      howToReach: 'Celebrated throughout Jharkhand, accessible in all educational centers and temples',
      accommodation: ['Available in all major towns', 'Educational institution guest facilities'],
      localTransport: 'Local transport to reach schools, colleges, and Saraswati temples',
      tips: [
        'Wear yellow clothes to participate in festivities',
        'Attend cultural programs in educational institutions',
        'Learn about traditional arts and crafts',
        'Support student performers and artists'
      ],
      dos: [
        'Respect educational institutions and their traditions',
        'Participate in knowledge-sharing activities',
        'Support local artists and cultural programs',
        'Learn about the importance of education'
      ],
      donts: [
        'Don\'t disturb ongoing cultural performances',
        'Don\'t ignore the educational significance',
        'Don\'t litter in institutional premises',
        'Don\'t disrespect books and learning materials'
      ]
    },
    economicImpact: {
      tourism: 'Generates ₹5 crores through cultural and educational tourism',
      localBusiness: 'Benefits flower vendors, sweet makers, and cultural performers',
      artisans: 'Supports 600+ artists, musicians, and educational suppliers'
    },
    conservation: {
      challenges: ['Declining interest in traditional arts', 'Modern education overshadowing cultural learning'],
      efforts: ['Cultural education integration', 'Traditional arts promotion', 'Student cultural competitions'],
      futureOutlook: 'Revival of interest in traditional knowledge systems and cultural arts'
    },
    seo: {
      metaTitle: 'Vasant Panchami Jharkhand - Saraswati Puja & Knowledge Celebration',
      metaDescription: 'Celebrate Vasant Panchami in Jharkhand with Goddess Saraswati worship, cultural programs, and spring festivities in educational institutions.',
      keywords: ['Vasant Panchami', 'Saraswati Puja', 'education festival', 'spring celebration', 'knowledge worship'],
      structuredData: {
        '@type': 'Festival',
        'name': 'Vasant Panchami',
        'location': 'Jharkhand',
        'startDate': 'February',
        'description': 'Spring festival celebrating Goddess Saraswati and the pursuit of knowledge'
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
  images: ['https://www.caratlane.com/blog/wp-content/uploads/2022/08/dhokra-craft-GB10_l.jpg'],
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
  images: ['https://www.gosahin.com/go/p/j/1576435575_jhumair-dance.jpg'],
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
  images: ['https://i.ytimg.com/vi/luW3jYjCDvU/maxresdefault.jpg'],
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
  images: ['https://theindiantribal.com/wp-content/uploads/2021/09/jharkhand-damkach-dance-1024x512.jpg'],
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
  images: ['https://veganuary.com/wp-content/uploads/2022/10/Dhuska1-scaled.jpeg'],
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
