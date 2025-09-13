import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RecipesSection() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Traditional Recipes</h3>
        <p className="text-muted-foreground mb-6">
          Discover authentic festival foods and learn to prepare traditional delicacies like Handia, Pitha, and Dhuska.
        </p>
        <Button>Explore Recipes</Button>
      </CardContent>
    </Card>
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
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Visual Stories</h3>
        <p className="text-muted-foreground mb-6">
          Immersive photo and video galleries showcasing the vibrant colors and sounds of Jharkhand's cultural celebrations.
        </p>
        <Button>View Gallery</Button>
      </CardContent>
    </Card>
  );
}
