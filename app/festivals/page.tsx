import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/navigation';
import FestivalsHero from '@/components/festivals/festivals-hero';
import FestivalCalendar from '@/components/festivals/festival-calendar';
import FestivalTimeline from '@/components/festivals/festival-timeline';
import FestivalGrid from '@/components/festivals/festival-grid';
import CulturalElements from '@/components/festivals/cultural-elements';
import FolkloreSection from '@/components/festivals/folklore-section';
import { RecipesSection, ArtisanCrafts, TravelTips, MultimediaGallery as MultimediaGalleryComponent } from '@/components/festivals/placeholder-components';
import { InteractiveCulturalMap } from '@/components/festivals/interactive-cultural-map';
import LoadingSpinner from '@/components/ui/loading-spinner';
import GamificationDashboard from '@/components/festivals/gamification-dashboard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CallToAction from '@/components/festivals/call-to-action';

// Dynamic imports for performance

const MultimediaGallery = dynamic(() => import('@/components/festivals/placeholder-components').then(mod => ({ default: mod.MultimediaGallery })), {
  loading: () => <LoadingSpinner />
});

export const metadata: Metadata = {
  title: 'Festivals & Culture of Jharkhand - Rich Tribal Heritage | Jharkhand Tourism',
  description: 'Discover the vibrant festivals and rich cultural heritage of Jharkhand. Experience tribal traditions, folk dances, art forms, cuisine, and ancient customs.',
  keywords: ['Jharkhand festivals', 'tribal culture', 'Sarhul festival', 'Sohrai paintings', 'tribal art', 'folk dance', 'traditional cuisine'],
  openGraph: {
    title: 'Festivals & Culture of Jharkhand - Rich Tribal Heritage',
    description: 'Explore the vibrant festivals and cultural traditions of Jharkhand\'s tribal communities.',
    images: ['/festivals/festivals-og-image.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: '/festivals'
  }
};

export default function FestivalsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Festivals & Culture of Jharkhand',
    description: 'Comprehensive guide to Jharkhand\'s festivals, cultural traditions, and tribal heritage',
    url: 'https://jharkhand-tourism.com/festivals',
    mainEntity: {
      '@type': 'TouristDestination',
      name: 'Jharkhand Cultural Heritage',
      description: 'Experience the rich tribal culture and festivals of Jharkhand'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <FestivalsHero />

      {/* Navigation Pills */}
      <section className="bg-muted/30 sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex space-x-6 overflow-x-auto scrollbar-hide" aria-label="Festivals navigation">
            <a href="#calendar" className="whitespace-nowrap px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Calendar
            </a>
            <a href="#timeline" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              Timeline
            </a>
            <a href="#festivals" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              Festivals
            </a>
            <a href="#culture" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              Culture
            </a>
            <a href="#map" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              Map
            </a>
            <a href="#folklore" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              Folklore
            </a>
            <a href="#recipes" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              Recipes
            </a>
            <a href="#crafts" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              Crafts
            </a>
            <a href="#gamification" className="whitespace-nowrap px-4 py-2 rounded-full hover:bg-muted transition-colors">
              🏆 Challenges
            </a>
          </nav>
        </div>
      </section>

      {/* Festival Calendar */}
      <section id="calendar" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Festival Calendar</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover when to experience Jharkhand's most vibrant celebrations throughout the year
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <FestivalCalendar />
          </Suspense>
        </div>
      </section>

      {/* Festival Timeline */}
      <section id="timeline" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Cultural Timeline</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Journey through the evolution of Jharkhand's cultural heritage
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <FestivalTimeline />
          </Suspense>
        </div>
      </section>

      {/* Festivals Grid with Filters */}
      <section id="festivals" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Festivals</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover the vibrant festivals and celebrations of Jharkhand
            </p>
          </div>
          
          <Suspense fallback={<LoadingSpinner />}>
            <FestivalGrid />
          </Suspense>
        </div>
      </section>

      {/* Cultural Elements */}
      <section id="culture" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Cultural Heritage</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Explore the diverse art forms, crafts, music, and traditions of Jharkhand's tribal communities
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <CulturalElements />
          </Suspense>
        </div>
      </section>

      {/* Interactive Map */}
      <section id="map" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Cultural Map</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover festival locations and cultural hotspots across Jharkhand
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <InteractiveCulturalMap />
          </Suspense>
        </div>
      </section>

      {/* Multimedia Gallery */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Visual Stories</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Immerse yourself in the vibrant colors and sounds of Jharkhand's cultural celebrations
            </p>
          </div>
          <MultimediaGallery />
        </div>
      </section>

      {/* Folklore Section */}
      <section id="folklore" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Folklore & Legends</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover the ancient stories and legends that shape Jharkhand's cultural identity
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <FolkloreSection />
          </Suspense>
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Traditional Recipes</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Learn to prepare authentic festival foods and traditional delicacies
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <RecipesSection />
          </Suspense>
        </div>
      </section>

      {/* Artisan Crafts */}
      <section id="crafts" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Artisan Crafts</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Meet the master craftspeople and learn about traditional art forms
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <ArtisanCrafts />
          </Suspense>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Cultural Travel Tips</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Essential information for experiencing festivals and cultural events respectfully
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <TravelTips />
          </Suspense>
        </div>
      </section>

      {/* Gamification Dashboard */}
      <section id="gamification" className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🏆 Cultural Learning Challenges</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Test your knowledge, earn achievements, and become a Jharkhand culture expert through our interactive challenges and quizzes
            </p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <GamificationDashboard />
          </Suspense>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
}
