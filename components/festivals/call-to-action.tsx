'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Experience Jharkhand's Culture</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join us in celebrating and preserving the rich cultural heritage of Jharkhand's tribal communities
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg" className="px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/book-tour">
              Plan Your Cultural Journey
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
