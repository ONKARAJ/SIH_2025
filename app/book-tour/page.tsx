import { Metadata } from 'next';
import CulturalTourBooking from '@/components/booking/cultural-tour-booking';

export const metadata: Metadata = {
  title: 'Book Cultural Tours - Jharkhand Tourism',
  description: 'Book authentic cultural tours and festival experiences in Jharkhand. Choose from curated packages for tribal heritage, festivals, and cultural immersion.',
  keywords: ['book cultural tours', 'Jharkhand festival tours', 'tribal heritage tours', 'cultural experiences', 'festival packages'],
  openGraph: {
    title: 'Book Cultural Tours - Experience Authentic Jharkhand',
    description: 'Book immersive cultural tours and festival experiences in Jharkhand with expert guides and authentic tribal interactions.',
    images: ['/tours/cultural-booking-og.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: '/book-tour'
  }
};

export default function BookTourPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Jharkhand Cultural Tours',
    description: 'Authentic cultural and festival tour packages in Jharkhand',
    provider: {
      '@type': 'TravelAgency',
      name: 'Jharkhand Tourism',
      url: 'https://jharkhand-tourism.com'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Sohrai Festival Cultural Immersion',
        price: '4500',
        priceCurrency: 'INR',
        category: 'Festival Experience'
      },
      {
        '@type': 'Offer', 
        name: 'Jharkhand Tribal Heritage Trail',
        price: '12500',
        priceCurrency: 'INR',
        category: 'Heritage Tour'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Cultural Adventure
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in Jharkhand's rich tribal heritage with our carefully curated 
            cultural tours and festival experiences. Expert guides, authentic interactions, 
            and unforgettable memories await.
          </p>
        </div>
      </section>

      {/* Booking Component */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <CulturalTourBooking />
        </div>
      </section>

      {/* Why Choose Our Tours */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Cultural Tours?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We provide authentic, responsible, and immersive cultural experiences that 
              benefit local communities while giving you genuine insights into tribal heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Authentic Experiences</h3>
              <p className="text-muted-foreground">
                Direct interaction with tribal communities, participation in genuine rituals, 
                and access to sacred spaces with community permission.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Expert Local Guides</h3>
              <p className="text-muted-foreground">
                Knowledgeable guides from tribal communities who can share stories, 
                traditions, and cultural insights in their own language.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Community Benefit</h3>
              <p className="text-muted-foreground">
                Your tour directly supports local communities, artisans, and cultural 
                preservation efforts through fair wages and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Guidelines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Tour Guidelines & Expectations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4 text-green-600">What to Expect</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Authentic cultural interactions and ceremonies
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Traditional accommodations (homestays/eco-lodges)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Local cuisine and cooking demonstrations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Hands-on workshops (crafts, dance, music)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Small group sizes for personalized experience
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-4 text-orange-600">Important Guidelines</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">!</span>
                    Respect local customs and dress modestly
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">!</span>
                    Photography requires permission from community
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">!</span>
                    Basic physical fitness required for village walks
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">!</span>
                    Limited modern amenities in rural areas
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">!</span>
                    Weather-dependent activities may change
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
