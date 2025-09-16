export const allPlaces = [
  // 🌿 Waterfalls & Nature
  {
    id: '1',
    title: 'Hundru Falls',
    shortDescription: 'A spectacular 98-meter waterfall cascading down rocky cliffs, surrounded by dense forests. Perfect for nature photography and peaceful meditation amidst pristine wilderness. The thundering sound of water creates a mesmerizing atmosphere.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    location: 'Ranchi, Jharkhand',
    rating: 4.5,
    bestTimeToVisit: 'October to March',
    overview: 'Hundru Falls is one of the most magnificent waterfalls in Jharkhand, plunging 98 meters down the rocky terrain. Located about 45 km from Ranchi, this natural wonder is formed by the Subarnarekha River. The falls are surrounded by dense forests and rocky hills, creating a picturesque landscape that attracts thousands of visitors every year. The thundering sound of water hitting the rocks below creates a mesmerizing atmosphere, making it a perfect spot for nature lovers and photographers. During the monsoon season, the falls are at their most spectacular, with maximum water flow creating a breathtaking curtain of white water against the dark rocks.',
    attractions: ['98-meter spectacular waterfall', 'Dense forest surroundings', 'Photography opportunities', 'Trekking trails', 'Natural swimming pools'],
    reviews: [
      { name: 'Rajesh Kumar', rating: 5, comment: 'Absolutely breathtaking! The view of the waterfall is spectacular.', date: 'December 15, 2023' },
      { name: 'Priya Sharma', rating: 4, comment: 'Beautiful waterfall with great photo opportunities.', date: 'November 28, 2023' }
    ]
  },
  {
    id: '2',
    title: 'Dassam Falls',
    shortDescription: 'Known as the "Niagara of Jharkhand", this 44-meter waterfall creates a mesmerizing curtain of water. Popular for picnics and adventure activities like rock climbing and trekking.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    location: 'Ranchi, Jharkhand',
    rating: 4.3,
    bestTimeToVisit: 'July to February',
    overview: 'Dassam Falls, locally known as the "Niagara of Jharkhand," is a stunning 44-meter waterfall formed by the Kanchi River. Located approximately 40 km from Ranchi, this natural wonder cascades down in multiple tiers, creating a spectacular sight especially during the monsoon season. The falls are surrounded by dense forests and rocky terrain, making it an ideal spot for adventure enthusiasts and nature photographers. The area offers excellent opportunities for rock climbing, rappelling, and trekking.',
    attractions: ['44-meter tiered waterfall', 'Rock climbing opportunities', 'Dense forest trails', 'Adventure sports', 'Photography spots'],
    reviews: [
      { name: 'Amit Singh', rating: 4, comment: 'Great place for adventure activities and photography.', date: 'January 10, 2024' },
      { name: 'Sunita Devi', rating: 5, comment: 'The multiple tiers make it unique and beautiful.', date: 'December 5, 2023' }
    ]
  },
  {
    id: '3',
    title: 'Jonha Falls',
    shortDescription: 'Also known as Gautamdhara, this 43-meter waterfall is associated with Lord Buddha. The scenic beauty and religious significance make it a popular destination for both pilgrims and nature lovers.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'July to March',
    overview: 'Jonha Falls, also known as Gautamdhara, is a magnificent 43-meter waterfall with deep religious significance. Legend has it that Lord Buddha once meditated at this very spot, making it a sacred pilgrimage site. The falls cascade down from a considerable height into a deep pool surrounded by rocky terrain and lush greenery. The area is perfect for meditation and spiritual contemplation, offering visitors a chance to connect with nature and find inner peace.',
    attractions: ['43-meter sacred waterfall', 'Buddhist meditation spot', 'Deep natural pools', 'Spiritual significance', 'Peaceful environment'],
    reviews: [
      { name: 'Mohan Das', rating: 5, comment: 'A perfect place for meditation and spiritual peace.', date: 'February 20, 2024' },
      { name: 'Geeta Kumari', rating: 4, comment: 'Beautiful waterfall with religious importance.', date: 'January 15, 2024' }
    ]
  },
  {
    id: '4',
    title: 'Hirni Falls',
    shortDescription: 'A hidden gem nestled in dense forests, offering a serene escape from city life. The 37-meter waterfall creates natural pools perfect for swimming and relaxation during summer months.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.0,
    bestTimeToVisit: 'June to November',
    overview: 'Hirni Falls is a beautiful 37-meter waterfall located in the outskirts of Ranchi. This hidden gem is surrounded by dense sal forests and offers a perfect retreat for those seeking solitude and natural beauty. The falls create natural pools at the bottom, making it an ideal spot for swimming and picnicking. The trek to reach the falls adds to the adventure, passing through scenic forest trails.',
    attractions: ['37-meter secluded waterfall', 'Natural swimming pools', 'Dense sal forests', 'Trekking trails', 'Peaceful environment'],
    reviews: [
      { name: 'Ravi Prakash', rating: 4, comment: 'Perfect for a quiet getaway from city noise.', date: 'March 5, 2024' },
      { name: 'Anjali Rai', rating: 4, comment: 'Natural pools are great for swimming.', date: 'February 12, 2024' }
    ]
  },

  // 🏔️ Hills & Scenic Spots
  {
    id: '5',
    title: 'Netarhat',
    shortDescription: 'Known as the "Queen of Chotanagpur", this hill station offers breathtaking sunrise and sunset views. Cool climate, pine forests, and rolling hills make it a perfect summer retreat.',
    category: 'Hill Station',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    location: 'Latehar, Jharkhand',
    rating: 4.6,
    bestTimeToVisit: 'October to March',
    overview: 'Netarhat, rightfully called the "Queen of Chotanagpur," is a magnificent hill station situated at an elevation of 1,128 meters. Famous for its spectacular sunrise and sunset views, this scenic destination offers a cool climate throughout the year. The region is covered with dense pine forests, rolling hills, and meadows that create a picturesque landscape. Netarhat is also home to several waterfalls, including the famous Lodh Falls, making it a complete nature destination.',
    attractions: ['Spectacular sunrise/sunset views', 'Pine forests and rolling hills', 'Cool climate year-round', 'Lodh Falls nearby', 'Residential school campus'],
    reviews: [
      { name: 'Vikash Kumar', rating: 5, comment: 'Best hill station in Jharkhand! Sunrise view is unforgettable.', date: 'January 20, 2024' },
      { name: 'Rekha Sinha', rating: 4, comment: 'Perfect weather and beautiful scenery.', date: 'December 18, 2023' }
    ]
  },
  {
    id: '6',
    title: 'Parasnath Hills',
    shortDescription: 'The highest peak in Jharkhand at 1,365 meters, sacred to Jains with 20 Tirthankara temples. Offers panoramic views and spiritual significance combined with natural beauty.',
    category: 'Hill Station',
    image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80',
    location: 'Giridih, Jharkhand',
    rating: 4.4,
    bestTimeToVisit: 'October to March',
    overview: 'Parasnath Hills, standing at 1,365 meters, is the highest peak in Jharkhand and holds immense religious significance for the Jain community. The hill is believed to be the place where 20 of the 24 Jain Tirthankaras attained salvation. The trek to the top takes visitors through various temples and offers breathtaking panoramic views of the surrounding landscape. The hill is covered with dense forests and provides a perfect blend of spirituality and natural beauty.',
    attractions: ['Highest peak in Jharkhand', '20 Jain Tirthankara temples', 'Panoramic valley views', 'Spiritual significance', 'Trekking opportunities'],
    reviews: [
      { name: 'Sunil Jain', rating: 5, comment: 'Sacred place with incredible views from the top.', date: 'February 8, 2024' },
      { name: 'Maya Devi', rating: 4, comment: 'Challenging trek but worth every step.', date: 'January 25, 2024' }
    ]
  },
  {
    id: '7',
    title: 'Dalma Hills',
    shortDescription: 'A wildlife sanctuary and hill station near Jamshedpur, home to elephants, leopards, and diverse flora. Perfect for wildlife photography and nature walks through pristine forests.',
    category: 'Wildlife Sanctuary',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    location: 'Jamshedpur, Jharkhand',
    rating: 4.1,
    bestTimeToVisit: 'November to February',
    overview: 'Dalma Hills Wildlife Sanctuary spans over 193 square kilometers and serves as a crucial corridor for elephant migration between Jharkhand and Odisha. The sanctuary is home to elephants, leopards, sambars, and various species of birds. The hills offer excellent trekking opportunities and scenic viewpoints. The area is perfect for wildlife enthusiasts and photographers seeking to capture the diverse fauna in their natural habitat.',
    attractions: ['Elephant migration corridor', 'Leopards and sambars', 'Bird watching opportunities', 'Scenic trekking trails', 'Wildlife photography'],
    reviews: [
      { name: 'Rahul Mishra', rating: 4, comment: 'Great place for wildlife spotting and trekking.', date: 'March 12, 2024' },
      { name: 'Kavita Singh', rating: 4, comment: 'Saw elephants during our visit. Amazing experience!', date: 'February 28, 2024' }
    ]
  },

  // 🏛️ Historical & Religious Sites
  {
    id: '8',
    title: 'Baba Baidyanath Temple',
    shortDescription: 'One of the 12 Jyotirlingas, this ancient temple dedicated to Lord Shiva attracts millions of devotees annually. The temple complex showcases beautiful architecture and spiritual atmosphere.',
    category: 'Temples & Monuments',
    image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80',
    location: 'Deoghar, Jharkhand',
    rating: 4.7,
    bestTimeToVisit: 'October to March',
    overview: 'Baba Baidyanath Temple, also known as Baidyanath Dham, is one of the twelve sacred Jyotirlingas dedicated to Lord Shiva. Located in Deoghar, this ancient temple attracts millions of devotees from across the country, especially during the holy month of Shravan. The temple complex features beautiful architecture with intricate carvings and houses several other smaller temples. The spiritual atmosphere and the faith of countless devotees create an aura of divinity that is truly mesmerizing.',
    attractions: ['One of 12 sacred Jyotirlingas', 'Ancient temple architecture', 'Spiritual atmosphere', 'Shravan festival celebrations', 'Multiple temple complex'],
    reviews: [
      { name: 'Devendra Prasad', rating: 5, comment: 'Divine experience! The energy here is incredible.', date: 'March 15, 2024' },
      { name: 'Sita Ram', rating: 5, comment: 'Must visit for every devotee of Lord Shiva.', date: 'February 22, 2024' }
    ]
  },
  {
    id: '9',
    title: 'Rajrappa Temple',
    shortDescription: 'Ancient temple dedicated to Goddess Chinnamasta, located at the confluence of Damodar and Bhairavi rivers. Known for its unique tantric traditions and peaceful riverside location.',
    category: 'Temples & Monuments',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    location: 'Ramgarh, Jharkhand',
    rating: 4.3,
    bestTimeToVisit: 'September to March',
    overview: 'Rajrappa Temple is an ancient shrine dedicated to Goddess Chinnamasta, situated at the sacred confluence of Damodar and Bhairavi rivers. This temple is renowned for its tantric traditions and attracts devotees seeking spiritual power and blessings. The temple\'s location amidst natural beauty, with rivers flowing nearby and hills in the backdrop, creates a serene and mystical atmosphere. The annual fair held here draws thousands of pilgrims from different parts of the country.',
    attractions: ['Ancient Chinnamasta temple', 'Sacred river confluence', 'Tantric traditions', 'Annual religious fair', 'Scenic riverside location'],
    reviews: [
      { name: 'Binod Kumar', rating: 4, comment: 'Powerful spiritual energy and beautiful location.', date: 'January 30, 2024' },
      { name: 'Radha Rani', rating: 4, comment: 'Peaceful temple with unique traditions.', date: 'December 10, 2023' }
    ]
  },
  {
    id: '10',
    title: 'Jagannath Temple Ranchi',
    shortDescription: 'Replica of the famous Puri Jagannath Temple, featuring traditional Kalinga architecture. Annual Rath Yatra celebration attracts thousands of devotees and showcases rich cultural heritage.',
    category: 'Temples & Monuments',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'Year-round',
    overview: 'The Jagannath Temple in Ranchi is a beautiful replica of the world-famous Jagannath Temple of Puri, Odisha. Built in traditional Kalinga architectural style, this temple is dedicated to Lord Jagannath, Lord Balabhadra, and Goddess Subhadra. The temple is particularly famous for its annual Rath Yatra festival, which sees massive participation from devotees across the state. The intricate carvings and traditional design elements make this temple a perfect example of Odishan temple architecture.',
    attractions: ['Replica of Puri Jagannath Temple', 'Traditional Kalinga architecture', 'Annual Rath Yatra festival', 'Intricate stone carvings', 'Cultural significance'],
    reviews: [
      { name: 'Jagdish Patel', rating: 4, comment: 'Beautiful architecture and peaceful atmosphere.', date: 'March 8, 2024' },
      { name: 'Meera Sharma', rating: 4, comment: 'Rath Yatra celebration is spectacular here.', date: 'July 15, 2023' }
    ]
  },

  // 🏞️ Parks & Gardens
  {
    id: '11',
    title: 'Rock Garden Ranchi',
    shortDescription: 'Artistic garden featuring sculptures and structures made from natural rocks and stones. Perfect for family outings with beautiful landscaping, musical fountains, and peaceful walking paths.',
    category: 'Park',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.0,
    bestTimeToVisit: 'October to March',
    overview: 'Rock Garden Ranchi is a unique artistic creation that showcases beautiful sculptures and structures made entirely from natural rocks and stones. This beautifully landscaped garden offers a perfect blend of art and nature, with winding pathways, musical fountains, and various artistic installations. The garden provides a peaceful retreat within the city and is an ideal spot for families, couples, and photography enthusiasts. The creative use of local stones and rocks makes this garden a testament to innovative landscape architecture.',
    attractions: ['Unique rock sculptures', 'Musical fountains', 'Landscaped walking paths', 'Artistic installations', 'Family-friendly environment'],
    reviews: [
      { name: 'Anita Kumari', rating: 4, comment: 'Great place for evening walks and family time.', date: 'February 18, 2024' },
      { name: 'Rohit Verma', rating: 4, comment: 'Creative use of rocks and stones. Very peaceful.', date: 'January 22, 2024' }
    ]
  },
  {
    id: '12',
    title: 'Jubilee Park',
    shortDescription: 'Sprawling urban park with a beautiful lake, rose garden, and recreational facilities. Features boating, children\'s play areas, and the iconic Tata Steel Zoological Park nearby.',
    category: 'Park',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    location: 'Jamshedpur, Jharkhand',
    rating: 4.1,
    bestTimeToVisit: 'November to February',
    overview: 'Jubilee Park is one of the largest and most beautiful parks in Jamshedpur, sprawling over 225 acres of lush greenery. The park features a stunning artificial lake, well-maintained rose gardens, and numerous recreational facilities. Visitors can enjoy boating in the lake, stroll through the beautiful gardens, or relax in the peaceful environment. The park also houses the Tata Steel Zoological Park, making it a complete destination for families and nature lovers.',
    attractions: ['225-acre sprawling park', 'Artificial lake and boating', 'Rose gardens', 'Zoological park nearby', 'Recreational facilities'],
    reviews: [
      { name: 'Deepak Singh', rating: 4, comment: 'Perfect for morning jogs and evening relaxation.', date: 'March 10, 2024' },
      { name: 'Lalita Devi', rating: 4, comment: 'Beautiful lake and gardens. Kids love the zoo!', date: 'February 25, 2024' }
    ]
  },

  // 🌊 Lakes & Reservoirs
  {
    id: '13',
    title: 'Kanke Dam',
    shortDescription: 'Scenic reservoir surrounded by hills and forests, perfect for picnics and water sports. The peaceful environment and beautiful sunset views make it a popular weekend destination.',
    category: 'Lake',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.0,
    bestTimeToVisit: 'October to March',
    overview: 'Kanke Dam is a beautiful reservoir located about 15 km from Ranchi, surrounded by rolling hills and dense forests. This scenic spot is perfect for day trips and picnics, offering a peaceful escape from city life. The reservoir provides excellent opportunities for water sports and fishing. The area around the dam is ideal for nature photography, especially during sunrise and sunset when the water reflects the golden sky.',
    attractions: ['Scenic reservoir views', 'Water sports activities', 'Fishing opportunities', 'Picnic spots', 'Sunset photography'],
    reviews: [
      { name: 'Santosh Kumar', rating: 4, comment: 'Great place for a day out with family.', date: 'February 14, 2024' },
      { name: 'Nisha Rani', rating: 4, comment: 'Beautiful sunset views over the water.', date: 'January 18, 2024' }
    ]
  },
  {
    id: '14',
    title: 'Dimna Lake',
    shortDescription: 'Artificial lake created by Dimna Dam, offering boating, fishing, and scenic beauty. Surrounded by Dalma Hills, it provides a perfect setting for water sports and relaxation.',
    category: 'Lake',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    location: 'Jamshedpur, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'November to February',
    overview: 'Dimna Lake is a beautiful artificial lake created by the Dimna Dam, surrounded by the scenic Dalma Hills. This popular tourist destination offers excellent opportunities for boating, fishing, and water sports. The lake\'s serene environment and picturesque surroundings make it a perfect spot for relaxation and photography. The area around the lake has been developed with facilities for tourists, including restaurants and recreational activities.',
    attractions: ['Artificial lake surrounded by hills', 'Boating and water sports', 'Fishing opportunities', 'Tourist facilities', 'Scenic photography spots'],
    reviews: [
      { name: 'Rajesh Gupta', rating: 4, comment: 'Perfect place for boating and relaxation.', date: 'March 5, 2024' },
      { name: 'Pooja Singh', rating: 4, comment: 'Beautiful lake with good facilities for tourists.', date: 'February 20, 2024' }
    ]
  },

  // 🦌 Wildlife & Forest Areas
  {
    id: '15',
    title: 'Betla National Park',
    shortDescription: 'First national park of Jharkhand, home to tigers, elephants, leopards, and diverse wildlife. Offers jungle safaris, ancient fort ruins, and pristine forest ecosystem.',
    category: 'National Park',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
    location: 'Palamu, Jharkhand',
    rating: 4.5,
    bestTimeToVisit: 'November to April',
    overview: 'Betla National Park, established in 1986, was the first national park of Jharkhand and is part of the Palamu Tiger Reserve. Covering an area of 226 square kilometers, this park is home to tigers, elephants, leopards, wild boars, sambars, and numerous species of birds. The park offers exciting jungle safaris where visitors can spot wildlife in their natural habitat. The ancient Betla Fort within the park adds historical significance to this natural wonder.',
    attractions: ['First national park of Jharkhand', 'Tiger and elephant sightings', 'Jungle safari experiences', 'Ancient Betla Fort', 'Diverse wildlife and birds'],
    reviews: [
      { name: 'Wildlife Lover', rating: 5, comment: 'Amazing safari experience! Saw tigers and elephants.', date: 'March 12, 2024' },
      { name: 'Nature Guide', rating: 4, comment: 'Rich biodiversity and excellent safari opportunities.', date: 'February 15, 2024' }
    ]
  },
  {
    id: '16',
    title: 'Hazaribagh National Park',
    shortDescription: 'Dense forest sanctuary known for its tiger population and scenic beauty. Offers excellent opportunities for wildlife photography and nature exploration in pristine wilderness.',
    category: 'National Park',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
    location: 'Hazaribagh, Jharkhand',
    rating: 4.3,
    bestTimeToVisit: 'October to March',
    overview: 'Hazaribagh National Park spans over 186 square kilometers of dense deciduous forests and grasslands. The park is known for its significant tiger population and serves as an important wildlife corridor. Besides tigers, the park is home to leopards, sambars, nilgais, wild boars, and various species of deer. The park offers excellent opportunities for wildlife photography and nature enthusiasts seeking to explore pristine wilderness areas.',
    attractions: ['Dense deciduous forests', 'Tiger population', 'Wildlife photography', 'Nature trails', 'Bird watching opportunities'],
    reviews: [
      { name: 'Forest Explorer', rating: 4, comment: 'Great place for wildlife enthusiasts and photographers.', date: 'January 28, 2024' },
      { name: 'Tiger Tracker', rating: 4, comment: 'Excellent tiger sightings and beautiful forest.', date: 'December 22, 2023' }
    ]
  },

  // 🏰 Historical Places
  {
    id: '17',
    title: 'Palamu Fort',
    shortDescription: 'Ancient fort complex with old and new sections showcasing medieval architecture. Built by Chero rulers, offers insights into regional history and stunning architectural details.',
    category: 'Historic Site',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80',
    location: 'Palamu, Jharkhand',
    rating: 4.1,
    bestTimeToVisit: 'October to March',
    overview: 'Palamu Fort is a magnificent historical complex consisting of old and new fort sections, built by the Chero rulers during the 16th-17th centuries. The fort showcases excellent examples of medieval Indian architecture with intricate stone work, arched gateways, and defensive walls. Located near Betla National Park, the fort provides insights into the rich history and culture of the region. The fort complex also includes several temples and residential quarters that reflect the lifestyle of ancient rulers.',
    attractions: ['Medieval fort architecture', 'Old and new fort sections', 'Chero dynasty heritage', 'Stone work and gateways', 'Historical significance'],
    reviews: [
      { name: 'History Buff', rating: 4, comment: 'Fascinating architecture and rich historical significance.', date: 'February 10, 2024' },
      { name: 'Heritage Lover', rating: 4, comment: 'Well-preserved fort with beautiful stonework.', date: 'January 15, 2024' }
    ]
  },
  {
    id: '18',
    title: 'Maluti Temples',
    shortDescription: 'Group of 72 ancient terracotta temples showcasing exquisite craftsmanship. Dating back to 17th-18th centuries, these temples represent unique architectural heritage of Bengal-Jharkhand region.',
    category: 'Temples & Monuments',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80',
    location: 'Dumka, Jharkhand',
    rating: 4.4,
    bestTimeToVisit: 'October to March',
    overview: 'Maluti is a small village home to 72 ancient terracotta temples built during the 17th-18th centuries. These temples showcase exquisite terracotta art and craftsmanship, representing the unique architectural heritage of the Bengal-Jharkhand border region. The temples are dedicated to various Hindu deities and feature intricate carvings depicting mythological scenes, floral patterns, and daily life activities. Despite the passage of time, many temples retain their original beauty and artistic grandeur.',
    attractions: ['72 ancient terracotta temples', 'Exquisite craftsmanship', '17th-18th century architecture', 'Mythological carvings', 'Unique artistic heritage'],
    reviews: [
      { name: 'Art Enthusiast', rating: 5, comment: 'Incredible terracotta work! A hidden gem of Indian art.', date: 'March 8, 2024' },
      { name: 'Cultural Explorer', rating: 4, comment: 'Amazing preservation of ancient craftsmanship.', date: 'February 18, 2024' }
    ]
  },

  // 🌅 Scenic & Unique Places
  {
    id: '19',
    title: 'Lodh Falls',
    shortDescription: 'Jharkhand\'s highest waterfall at 143 meters, creating a spectacular cascade through multiple tiers. Surrounded by dense forests, perfect for photography and nature exploration.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    location: 'Latehar, Jharkhand',
    rating: 4.6,
    bestTimeToVisit: 'July to February',
    overview: 'Lodh Falls, standing at an impressive 143 meters, is the highest waterfall in Jharkhand and one of the tallest in India. Located near Netarhat, this magnificent waterfall cascades down in multiple tiers through dense forest terrain. During monsoon season, the falls are at their most spectacular, creating a thunderous sound that can be heard from kilometers away. The surrounding area is rich in flora and fauna, making it a paradise for nature lovers and photographers.',
    attractions: ['Highest waterfall in Jharkhand', '143-meter spectacular cascade', 'Multiple tiers and levels', 'Dense forest surroundings', 'Photography opportunities'],
    reviews: [
      { name: 'Adventure Seeker', rating: 5, comment: 'Absolutely spectacular! The trek is worth every step.', date: 'August 15, 2023' },
      { name: 'Photo Enthusiast', rating: 5, comment: 'Most photogenic waterfall I\'ve ever seen.', date: 'September 22, 2023' }
    ]
  },
  {
    id: '20',
    title: 'Usri Falls',
    shortDescription: 'Picturesque waterfall near Giridih, perfect for picnics and photography. The scenic beauty and accessible location make it a popular destination for families and nature lovers.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    location: 'Giridih, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'July to March',
    overview: 'Usri Falls is a beautiful waterfall located near Giridih, easily accessible by road and perfect for day trips. The falls cascade down rocky terrain creating natural pools and a serene environment ideal for picnics and relaxation. The area around the falls is covered with lush greenery and offers excellent opportunities for photography. The falls are particularly beautiful during the monsoon season when the water flow is at its peak.',
    attractions: ['Accessible scenic waterfall', 'Natural pools for bathing', 'Perfect picnic spots', 'Photography opportunities', 'Family-friendly location'],
    reviews: [
      { name: 'Family Traveler', rating: 4, comment: 'Great place for family outings and picnics.', date: 'March 2, 2024' },
      { name: 'Nature Lover', rating: 4, comment: 'Beautiful waterfall with easy access.', date: 'February 8, 2024' }
    ]
  },
  {
    id: '22',
    title: 'Maithon Dam',
    shortDescription: 'Major dam on Damodar River creating a large reservoir, perfect for boating and water sports. The engineering marvel offers scenic views and recreational activities.',
    category: 'Dam',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    location: 'Dhanbad, Jharkhand',
    rating: 4.0,
    bestTimeToVisit: 'November to February',
    overview: 'Maithon Dam is a major dam constructed on the Damodar River, creating one of the largest reservoirs in Jharkhand. This engineering marvel not only serves important functions like flood control and power generation but also creates a beautiful recreational destination. The large water body offers excellent opportunities for boating, water sports, and fishing. The scenic surroundings and peaceful environment make it a popular spot for picnics and weekend getaways.',
    attractions: ['Major dam on Damodar River', 'Large reservoir for recreation', 'Boating and water sports', 'Engineering marvel', 'Scenic surroundings'],
    reviews: [
      { name: 'Engineering Student', rating: 4, comment: 'Impressive engineering work with beautiful reservoir.', date: 'March 1, 2024' },
      { name: 'Water Sports Fan', rating: 4, comment: 'Great place for boating and water activities.', date: 'February 12, 2024' }
    ]
  },
  {
    id: '23',
    title: 'Panchet Dam',
    shortDescription: 'Beautiful dam creating a scenic reservoir perfect for fishing and boating. The peaceful environment and surrounding hills make it an ideal spot for relaxation and photography.',
    category: 'Dam',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    location: 'Dhanbad, Jharkhand',
    rating: 3.8,
    bestTimeToVisit: 'October to March',
    overview: 'Panchet Dam is another significant dam on the Damodar River system, creating a beautiful reservoir surrounded by hills and forests. The dam site offers peaceful environment perfect for relaxation and nature appreciation. Visitors can enjoy fishing, boating, and photography while taking in the scenic beauty of the water body and surrounding landscape. The area is less crowded compared to other tourist spots, making it ideal for those seeking tranquility.',
    attractions: ['Scenic reservoir views', 'Fishing and boating', 'Peaceful environment', 'Photography opportunities', 'Surrounding hills and forests'],
    reviews: [
      { name: 'Peace Seeker', rating: 4, comment: 'Quiet and peaceful place, perfect for relaxation.', date: 'February 20, 2024' },
      { name: 'Fishing Enthusiast', rating: 4, comment: 'Good spot for fishing with beautiful surroundings.', date: 'January 25, 2024' }
    ]
  },
  {
    id: '24',
    title: 'Tilaiya Dam',
    shortDescription: 'Scenic dam and reservoir offering water sports, fishing, and beautiful sunset views. The surrounding landscape provides excellent opportunities for photography and relaxation.',
    category: 'Dam',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    location: 'Koderma, Jharkhand',
    rating: 4.1,
    bestTimeToVisit: 'October to March',
    overview: 'Tilaiya Dam, built on the Barakar River, creates a beautiful reservoir that serves multiple purposes including irrigation, power generation, and recreation. The dam site offers excellent opportunities for water sports, boating, and fishing. The scenic beauty of the reservoir, especially during sunset, makes it a popular destination for photography enthusiasts. The peaceful environment and beautiful landscape make it perfect for weekend trips and family outings.',
    attractions: ['Multi-purpose dam and reservoir', 'Water sports and boating', 'Beautiful sunset views', 'Photography opportunities', 'Family-friendly environment'],
    reviews: [
      { name: 'Sunset Lover', rating: 4, comment: 'Amazing sunset views over the reservoir.', date: 'March 3, 2024' },
      { name: 'Weekend Traveler', rating: 4, comment: 'Perfect place for a peaceful weekend getaway.', date: 'February 15, 2024' }
    ]
  },

  // 🎨 Cultural & Tribal Heritage

  // 🏞️ Adventure & Sports Destinations
  {
    id: '27',
    title: 'Getalsud Dam',
    shortDescription: 'Perfect destination for adventure sports including water skiing, jet skiing, and parasailing. The large reservoir and facilities make it ideal for water sports enthusiasts.',
    category: 'Adventure Sports',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.1,
    bestTimeToVisit: 'November to February',
    overview: 'Getalsud Dam is a premier destination for adventure sports and water activities in Jharkhand. The large reservoir created by this dam provides excellent conditions for various water sports including water skiing, jet skiing, parasailing, and boating. The facility is well-equipped with modern amenities and safety equipment, making it suitable for both beginners and experienced adventure enthusiasts. The scenic surroundings add to the overall experience of this adventure destination.',
    attractions: ['Water skiing and jet skiing', 'Parasailing adventures', 'Professional safety equipment', 'Scenic reservoir setting', 'Adventure sports training'],
    reviews: [
      { name: 'Adventure Enthusiast', rating: 4, comment: 'Excellent facilities for water sports and adventures.', date: 'March 10, 2024' },
      { name: 'Sports Lover', rating: 4, comment: 'Great place for adrenaline-pumping activities.', date: 'February 22, 2024' }
    ]
  },

  // 🏛️ Modern Attractions
  {
    id: '29',
    title: 'Pahari Mandir',
    shortDescription: 'Hilltop temple dedicated to Lord Shiva, offering panoramic views of Ranchi city. The temple requires a climb of 468 steps and provides spiritual experience with scenic beauty.',
    category: 'Temples & Monuments',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.3,
    bestTimeToVisit: 'October to March',
    overview: 'Pahari Mandir is a famous hilltop temple dedicated to Lord Shiva, located on the Ranchi Hill. The temple requires visitors to climb 468 steps to reach the top, but the effort is rewarded with breathtaking panoramic views of Ranchi city and surrounding landscape. The temple holds great religious significance for locals and attracts devotees throughout the year. The early morning and evening views from the temple are particularly spectacular.',
    attractions: ['Hilltop Lord Shiva temple', 'Panoramic city views', '468-step spiritual journey', 'Sunrise and sunset views', 'Religious significance'],
    reviews: [
      { name: 'Devotee', rating: 4, comment: 'Challenging climb but worth it for the views and blessings.', date: 'March 8, 2024' },
      { name: 'Fitness Enthusiast', rating: 4, comment: 'Great workout climbing the steps, amazing city views.', date: 'February 12, 2024' }
    ]
  },
  {
    id: '30',
    title: 'Tagore Hill',
    shortDescription: 'Historic hill where Rabindranath Tagore once stayed, featuring gardens, observatory, and cultural significance. Offers peaceful environment and panoramic views of the city.',
    category: 'Historic Site',
    image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80',
    location: 'Ranchi, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'October to March',
    overview: 'Tagore Hill holds special significance as the place where Nobel laureate Rabindranath Tagore once stayed and was inspired to write. The hill features beautiful gardens, an observatory, and peaceful walking paths. The site has been developed as a cultural center and offers panoramic views of Ranchi city. The serene environment and historical importance make it a popular destination for literature enthusiasts, students, and those seeking peaceful contemplation.',
    attractions: ['Rabindranath Tagore connection', 'Cultural and literary significance', 'Observatory and gardens', 'Panoramic city views', 'Peaceful environment'],
    reviews: [
      { name: 'Literature Lover', rating: 4, comment: 'Inspiring place with rich literary heritage.', date: 'March 1, 2024' },
      { name: 'Peace Seeker', rating: 4, comment: 'Quiet and serene atmosphere, perfect for reflection.', date: 'February 8, 2024' }
    ]
  },

  // 🌊 Additional Waterfalls & Natural Wonders
  {
    id: '31',
    title: 'Nakti Falls',
    shortDescription: 'A pristine waterfall hidden in the dense forests near Ranchi, offering crystal-clear natural pools and a peaceful retreat. The 25-meter cascade creates a refreshing mist perfect for hot summer days.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'],
    location: 'Ranchi, Jharkhand',
    rating: 4.1,
    bestTimeToVisit: 'June to October',
    overview: 'Nakti Falls is a hidden gem located approximately 65 km from Ranchi, nestled deep within pristine forests. This 25-meter waterfall cascades down rocky cliffs into crystal-clear pools below, creating a perfect natural swimming spot. The falls are surrounded by dense vegetation and offer a tranquil escape from urban life. The trek to reach Nakti Falls takes visitors through scenic forest paths rich with indigenous flora and fauna, making it an ideal destination for nature lovers and adventure seekers.',
    attractions: ['25-meter pristine waterfall', 'Crystal-clear natural pools', 'Dense forest trekking', 'Natural swimming spots', 'Rich biodiversity'],
    reviews: [
      { name: 'Trekking Enthusiast', rating: 4, comment: 'Hidden paradise! The trek is adventurous and the falls are pristine.', date: 'August 15, 2023' },
      { name: 'Nature Photographer', rating: 4, comment: 'Perfect spot for nature photography. Crystal clear water!', date: 'September 10, 2023' }
    ]
  },
  {
    id: '32',
    title: 'Patratu Valley',
    shortDescription: 'A breathtaking valley known for its scenic beauty, lush green hills, and the famous Patratu Dam. Popular destination for photography, boating, and enjoying panoramic valley views.',
    category: 'Valley',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80'],
    location: 'Ramgarh, Jharkhand',
    rating: 4.4,
    bestTimeToVisit: 'October to March',
    overview: 'Patratu Valley is one of the most picturesque destinations in Jharkhand, featuring rolling green hills, dense forests, and the serene Patratu Dam reservoir. Located about 40 km from Ranchi, this valley offers breathtaking panoramic views and is often called the "Kashmir of Jharkhand." The valley is perfect for nature photography, leisurely walks, and boat rides on the dam reservoir. The surrounding hills provide excellent vantage points for sunrise and sunset viewing, making it a favorite among photographers and nature enthusiasts.',
    attractions: ['Panoramic valley views', 'Patratu Dam reservoir', 'Boating facilities', 'Photography opportunities', 'Sunrise/sunset viewpoints'],
    reviews: [
      { name: 'Valley Explorer', rating: 5, comment: 'Absolutely stunning! The valley views are breathtaking, truly Kashmir of Jharkhand.', date: 'November 20, 2023' },
      { name: 'Photography Lover', rating: 4, comment: 'Perfect for landscape photography. The dam adds to the beauty.', date: 'December 8, 2023' }
    ]
  },
  {
    id: '33',
    title: 'Udhuwa Lake',
    shortDescription: 'A serene artificial lake surrounded by hills and forests, perfect for picnics and water activities. The peaceful environment and scenic beauty make it an ideal weekend getaway destination.',
    category: 'Lake',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'],
    location: 'Dhanbad, Jharkhand',
    rating: 4.0,
    bestTimeToVisit: 'November to February',
    overview: 'Udhuwa Lake is a beautiful artificial lake located near Dhanbad, created as part of a water conservation project. Surrounded by rolling hills and dense forests, this pristine lake offers a tranquil environment perfect for relaxation and recreation. The lake is ideal for boating, fishing, and picnicking with family and friends. The surrounding area has been developed with walking paths and seating areas, making it accessible for visitors of all ages. During winter months, the lake attracts various migratory birds, adding to its natural charm.',
    attractions: ['Scenic artificial lake', 'Boating and fishing', 'Bird watching opportunities', 'Family picnic spots', 'Walking trails'],
    reviews: [
      { name: 'Weekend Traveler', rating: 4, comment: 'Perfect for a peaceful weekend getaway. Great for family picnics.', date: 'January 18, 2024' },
      { name: 'Bird Watcher', rating: 4, comment: 'Lovely lake with good bird watching opportunities in winter.', date: 'December 25, 2023' }
    ]
  },
  {
    id: '34',
    title: 'Topchachi Lake',
    shortDescription: 'A pristine natural lake surrounded by lush forests and hills, offering boating, fishing, and scenic beauty. Perfect for picnics and nature photography with crystal-clear waters.',
    category: 'Lake',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'],
    location: 'Dhanbad, Jharkhand',
    rating: 4.3,
    bestTimeToVisit: 'October to March',
    overview: 'Topchachi Lake is a beautiful natural lake located in Dhanbad district, surrounded by dense forests and rolling hills. This pristine water body offers excellent opportunities for boating, fishing, and water sports. The lake is known for its crystal-clear waters and serene environment, making it a popular destination for nature lovers and photographers. The surrounding area is rich in biodiversity and provides excellent spots for bird watching, especially during winter months when migratory birds visit the lake.',
    attractions: ['Crystal-clear natural lake', 'Boating and water sports', 'Forest surroundings', 'Bird watching opportunities', 'Photography spots'],
    reviews: [
      { name: 'Lake Explorer', rating: 4, comment: 'Beautiful pristine lake with excellent boating facilities.', date: 'March 12, 2024' },
      { name: 'Nature Photographer', rating: 4, comment: 'Perfect for nature photography, crystal clear waters!', date: 'February 18, 2024' }
    ]
  },
  {
    id: '35',
    title: 'Bhatinda Falls',
    shortDescription: 'A spectacular waterfall cascading down rocky terrain, surrounded by dense forests. Popular for trekking, photography, and experiencing the raw beauty of nature.',
    category: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
    location: 'Dhanbad, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'July to February',
    overview: 'Bhatinda Falls is a magnificent waterfall located in the Dhanbad district, cascading down from a considerable height through rocky terrain. The falls are surrounded by dense forests and offer a spectacular sight, especially during the monsoon season when the water flow is at its peak. The area around the falls provides excellent trekking opportunities and is perfect for adventure enthusiasts and nature photographers. The natural pools formed at the base of the falls offer a refreshing experience for visitors.',
    attractions: ['Spectacular waterfall cascade', 'Dense forest trekking', 'Natural swimming pools', 'Adventure activities', 'Photography opportunities'],
    reviews: [
      { name: 'Trekking Enthusiast', rating: 4, comment: 'Amazing waterfall with great trekking trails to reach it.', date: 'August 20, 2023' },
      { name: 'Adventure Seeker', rating: 4, comment: 'Beautiful falls surrounded by pristine forests.', date: 'September 15, 2023' }
    ]
  },
  {
    id: '36',
    title: 'Dimna Lake',
    shortDescription: 'Artificial lake created by Dimna Dam, offering boating, fishing, and scenic beauty. Surrounded by Dalma Hills, it provides a perfect setting for water sports and relaxation.',
    category: 'Lake',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80', 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80'],
    location: 'Jamshedpur, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'November to February',
    overview: 'Dimna Lake is a beautiful artificial lake created by the Dimna Dam, surrounded by the scenic Dalma Hills. This popular tourist destination offers excellent opportunities for boating, fishing, and water sports. The lake\'s serene environment and picturesque surroundings make it a perfect spot for relaxation and photography. The area around the lake has been developed with facilities for tourists, including restaurants and recreational activities. The lake is particularly beautiful during sunset when the hills reflect in the calm waters.',
    attractions: ['Artificial lake surrounded by hills', 'Boating and water sports', 'Fishing opportunities', 'Tourist facilities', 'Scenic photography spots'],
    reviews: [
      { name: 'Rajesh Gupta', rating: 4, comment: 'Perfect place for boating and relaxation.', date: 'March 5, 2024' },
      { name: 'Pooja Singh', rating: 4, comment: 'Beautiful lake with good facilities for tourists.', date: 'February 20, 2024' }
    ]
  },
  {
    id: '37',
    title: 'Rajmahal Hills',
    shortDescription: 'Ancient hills with archaeological significance, featuring prehistoric rock paintings and fossil sites. Offers trekking opportunities and insights into geological history.',
    category: 'Historic Site',
    image: 'https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1464822759444-d4c2d3eefeb4?w=800&q=80', 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf5a?w=800&q=80'],
    location: 'Sahibganj, Jharkhand',
    rating: 4.1,
    bestTimeToVisit: 'October to March',
    overview: 'Rajmahal Hills are ancient hills of immense archaeological and geological importance, located in Sahibganj district. These hills are famous for their prehistoric rock paintings, fossil sites, and ancient ruins that provide glimpses into early human civilization. The area is rich in flora and fauna and offers excellent trekking opportunities for adventure enthusiasts. The hills are also known for their unique geological formations and are a significant site for paleontological research.',
    attractions: ['Prehistoric rock paintings', 'Fossil sites and geological formations', 'Archaeological significance', 'Trekking trails', 'Paleontological research site'],
    reviews: [
      { name: 'Archaeology Student', rating: 4, comment: 'Fascinating place with rich historical and geological significance.', date: 'February 28, 2024' },
      { name: 'Rock Art Enthusiast', rating: 4, comment: 'Amazing prehistoric paintings and fossils.', date: 'January 15, 2024' }
    ]
  },
  {
    id: '38',
    title: 'Ganges River Ghats Sahibganj',
    shortDescription: 'Sacred ghats along the holy Ganges River, offering spiritual experiences, boat rides, and sunset views. Important pilgrimage site with cultural and religious significance.',
    category: 'Religious Site',
    image: 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80'],
    location: 'Sahibganj, Jharkhand',
    rating: 4.4,
    bestTimeToVisit: 'October to March',
    overview: 'The Ganges River Ghats in Sahibganj are sacred steps leading down to the holy Ganges River, offering spiritual experiences and cultural immersion. These ghats serve as important pilgrimage sites where devotees come to perform religious rituals, take holy dips, and offer prayers. The area provides beautiful views of the river, especially during sunrise and sunset. Boat rides along the Ganges offer visitors a chance to experience the spiritual atmosphere and natural beauty of the sacred river.',
    attractions: ['Sacred Ganges River ghats', 'Spiritual and religious significance', 'Boat rides on Ganges', 'Sunrise and sunset views', 'Cultural immersion'],
    reviews: [
      { name: 'Spiritual Seeker', rating: 5, comment: 'Deeply spiritual experience by the holy Ganges.', date: 'March 8, 2024' },
      { name: 'Cultural Explorer', rating: 4, comment: 'Beautiful ghats with rich cultural significance.', date: 'February 12, 2024' }
    ]
  },
  {
    id: '39',
    title: 'Kunderdoba Temple',
    shortDescription: 'Ancient temple dedicated to Lord Shiva, located on a hilltop with panoramic views. Known for its architectural beauty and spiritual significance among devotees.',
    category: 'Temples & Monuments',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', 'https://images.unsplash.com/photo-1582632443527-6747dfed4a37?w=800&q=80'],
    location: 'Sahibganj, Jharkhand',
    rating: 4.2,
    bestTimeToVisit: 'October to March',
    overview: 'Kunderdoba Temple is an ancient temple dedicated to Lord Shiva, situated on a hilltop in Sahibganj district. The temple is known for its beautiful architecture and spiritual atmosphere that attracts devotees from far and wide. The hilltop location offers panoramic views of the surrounding landscape and the Ganges River. The temple is particularly significant during Shivratri and other religious festivals when thousands of pilgrims visit to seek blessings.',
    attractions: ['Ancient Lord Shiva temple', 'Hilltop location with views', 'Beautiful architecture', 'Spiritual significance', 'Festival celebrations'],
    reviews: [
      { name: 'Devotee Ram', rating: 4, comment: 'Peaceful temple with beautiful hilltop views.', date: 'February 25, 2024' },
      { name: 'Temple Visitor', rating: 4, comment: 'Ancient temple with great spiritual atmosphere.', date: 'January 30, 2024' }
    ]
  },
  {
    id: '40',
    title: 'Udhwa Lake Bird Sanctuary',
    shortDescription: 'Important bird sanctuary around Udhwa Lake, home to numerous migratory and resident bird species. Perfect for bird watching, nature photography, and ecological studies.',
    category: 'Wildlife Sanctuary',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80', 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80'],
    location: 'Sahibganj, Jharkhand',
    rating: 4.3,
    bestTimeToVisit: 'November to February',
    overview: 'Udhwa Lake Bird Sanctuary is an important ecological site in Sahibganj district, centered around the beautiful Udhwa Lake. The sanctuary is home to numerous species of migratory and resident birds, making it a paradise for bird watchers and nature enthusiasts. During winter months, the sanctuary attracts various migratory birds from different parts of Asia. The area also supports diverse flora and fauna, creating a rich ecosystem perfect for ecological studies and nature photography.',
    attractions: ['Diverse bird species', 'Migratory bird watching', 'Ecological diversity', 'Nature photography', 'Scientific research opportunities'],
    reviews: [
      { name: 'Bird Watcher Pro', rating: 4, comment: 'Excellent bird watching opportunities, saw many migratory species.', date: 'December 20, 2023' },
      { name: 'Nature Researcher', rating: 4, comment: 'Rich ecosystem perfect for ecological studies.', date: 'January 8, 2024' }
    ]
  }
];
