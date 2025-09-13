'use client';

import { useState } from 'react';
import { Book, Play, Pause, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const folkloreData = [
  {
    id: '1',
    title: 'The Legend of Sal Trees',
    category: 'Origin Story',
    festival: 'Sarhul',
    content: `Long ago, when the world was young, the Earth Goddess chose the mighty Sal trees as her messengers to connect with humans. She blessed these trees with the power to bloom at the perfect moment each year, signaling the start of spring and new life.

The first Sal flowers were said to carry the essence of the goddess herself - their sweet fragrance brought fertility to the land, their golden color promised prosperity, and their timing marked the perfect moment for planting crops.

The tribal elders say that those who respect the Sal trees and offer prayers during their blooming are blessed with abundance throughout the year. This is why the Sarhul festival remains the most sacred celebration among Jharkhand's tribal communities.`,
    moral: 'Respect for nature brings abundance and harmony to life.',
    audio: '/audio/sal-tree-legend.mp3'
  },
  {
    id: '2',
    title: 'The Divine Gift of Cattle',
    category: 'Harvest Tale',
    festival: 'Sohrai',
    content: `In ancient times, when humans first learned to farm, they struggled greatly with tilling the hard earth. Their hands would bleed and their backs would break, but still the soil remained unyielding.

Seeing their suffering, the gods held a great council. They decided to gift humans with cattle - strong, gentle creatures who could help with farming and provide milk for sustenance.

The first cow descended from the heavens on a moonless night during harvest time. She taught humans how to plow, how to care for the land, and how to live in harmony with all creatures.

In gratitude, humans promised to honor these divine gifts with annual celebrations. They painted their walls with images of cattle and nature, creating the beautiful Sohrai art that still decorates homes today.`,
    moral: 'Gratitude and respect for all beings who help us leads to prosperity.',
    audio: '/audio/cattle-legend.mp3'
  },
  {
    id: '3',
    title: 'The Sacred Grove Keeper',
    category: 'Spiritual Tale',
    festival: 'Karma',
    content: `There once lived an old man who was the keeper of a sacred grove. Every tree, every bird, every leaf was under his protection. The villagers thought him strange, for he would talk to the trees as if they were his children.

One drought year, when all other wells dried up, the sacred grove remained green and lush. The keeper invited everyone to take water from the grove's spring, but asked them to plant one seed in return.

Years passed, and the village prospered. The seeds grew into a magnificent forest that protected the entire region from droughts and floods. The villagers realized the old man's wisdom - by caring for nature, nature cares for us.

This is why the Karma festival celebrates the bond between humans and trees, reminding us that we are all part of one living world.`,
    moral: 'What we give to nature, nature returns to us manifold.',
    audio: '/audio/grove-keeper-legend.mp3'
  }
];

export default function FolkloreSection() {
  const [selectedStory, setSelectedStory] = useState<string>('1');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const currentStory = folkloreData.find(story => story.id === selectedStory);

  const toggleAudio = (storyId: string) => {
    if (isPlaying === storyId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(storyId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Story Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {folkloreData.map((story) => (
          <Card
            key={story.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedStory === story.id ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => setSelectedStory(story.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{story.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" size="sm">{story.category}</Badge>
                    <Badge variant="outline" size="sm">{story.festival}</Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0 ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAudio(story.id);
                  }}
                >
                  {isPlaying === story.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Selected Story Display */}
      {currentStory && (
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{currentStory.title}</CardTitle>
                <div className="flex gap-3 items-center">
                  <Badge className="bg-primary text-primary-foreground">
                    {currentStory.category}
                  </Badge>
                  <Badge variant="outline">{currentStory.festival}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => toggleAudio(currentStory.id)}
                  >
                    <Volume2 className="h-4 w-4" />
                    {isPlaying === currentStory.id ? 'Pause' : 'Listen'}
                  </Button>
                </div>
              </div>
              <Book className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-6">
              {currentStory.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              <Card className="bg-muted/50 border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-primary mb-2">Moral of the Story</h4>
                  <p className="italic text-muted-foreground">{currentStory.moral}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Storytelling Tradition */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Oral Tradition</h3>
            <p className="text-muted-foreground mb-4">
              These stories have been passed down through generations of tribal elders, 
              preserving wisdom and cultural values through the art of storytelling.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Stories Documented</span>
                <span className="font-semibold">200+</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Elder Storytellers</span>
                <span className="font-semibold">50+</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Languages</span>
                <span className="font-semibold">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cultural Impact */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Cultural Significance</h3>
            <p className="text-muted-foreground mb-4">
              Folklore shapes festival celebrations, teaches moral values, 
              and connects communities to their spiritual beliefs and natural environment.
            </p>
            <Button className="w-full">
              Explore More Stories
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
