'use client';

import { useState, useRef, useEffect } from 'react';
import { Book, Play, Pause, Volume2, Music, Headphones } from 'lucide-react';
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
    audio: 'https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg'
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
    audio: 'https://actions.google.com/sounds/v1/animals/cow_moo_short.ogg'
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
    audio: 'https://actions.google.com/sounds/v1/ambiences/forest_birds_chirping_near.ogg'
  },
  {
    id: '4',
    title: 'The Peacock and the Rain Dance',
    category: 'Nature Myth',
    festival: 'Jitiya',
    content: `Once upon a time, the Earth suffered from a terrible drought. Rivers dried up, crops withered, and people prayed desperately for rain. The gods seemed to have forgotten the world below.

Seeing the suffering, a beautiful peacock decided to sacrifice her magnificent tail feathers. She danced with such grace and devotion that the clouds gathered to watch her performance.

Moved by her selfless act, the Rain God blessed the peacock with the most beautiful tail in all creation - one that would shimmer with the colors of rain and storm. And whenever she dances, the rains follow.

This is why peacocks dance before the monsoons, calling the rains to bless the earth with life-giving water.`,
    moral: 'Selfless sacrifice for others brings divine blessings.',
    audio: 'https://actions.google.com/sounds/v1/animals/peacock_squawk.ogg'
  },
  {
    id: '5',
    title: 'The Origin of Tribal Music',
    category: 'Cultural Origin',
    festival: 'Tusu Parab',
    content: `Long ago, the tribal people lived in silence, communicating only through gestures. While they were happy, they felt something was missing from their celebrations and rituals.

One day, a young girl was walking in the forest when she heard the most beautiful sounds - birds singing, wind whistling through leaves, water gurgling in streams. She realized that nature itself was making music.

She returned to her village and began imitating these sounds with her voice. Others joined in, creating the first tribal songs. They made instruments from bamboo, gourds, and animal skins to accompany their voices.

Music became the soul of tribal celebrations, connecting them to nature and each other in ways words never could.`,
    moral: 'Nature teaches us the most beautiful arts if we listen carefully.',
    audio: 'https://actions.google.com/sounds/v1/ambiences/bamboo_wind_chimes_very_gentle.ogg'
  },
  {
    id: '6',
    title: 'The Wise Elephant and the Village Well',
    category: 'Wisdom Tale',
    festival: 'Badna',
    content: `In a village surrounded by forests, there lived an old elephant known for his wisdom. Every year during the dry season, he would lead other animals to a secret water source deep in the jungle.

One year, the village well dried up completely. Desperate villagers followed the elephant, hoping he would show them water. The elephant led them to a spot and began digging with his trunk and feet.

After hours of digging, fresh, sweet water bubbled up from the ground. The villagers realized the elephant had taught them that nature provides solutions if we work with patience and wisdom.

From that day, the village honored elephants as sacred animals and included them in their harvest festivals as symbols of wisdom and abundance.`,
    moral: 'Nature\'s wisdom guides us to solutions when we observe and learn patiently.',
    audio: 'https://actions.google.com/sounds/v1/animals/elephant_trumpet.ogg'
  }
];

export default function FolkloreSection() {
  const [selectedStory, setSelectedStory] = useState<string>('1');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState<string>('');
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const currentStory = folkloreData.find(story => story.id === selectedStory);

  // Initialize audio elements
  useEffect(() => {
    folkloreData.forEach(story => {
      if (!audioRefs.current[story.id]) {
        const audio = new Audio(story.audio);
        audio.preload = 'metadata';
        audio.addEventListener('ended', () => {
          setIsPlaying(null);
          setCurrentAudio(null);
        });
        audio.addEventListener('error', (e) => {
          console.error(`Error loading audio for ${story.title}:`, e);
          setAudioError(`Unable to load audio for ${story.title}`);
          setTimeout(() => setAudioError(''), 3000);
        });
        audioRefs.current[story.id] = audio;
      }
    });

    // Cleanup function
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.removeEventListener('ended', () => {});
        audio.removeEventListener('error', () => {});
      });
    };
  }, []);

  const toggleAudio = async (storyId: string) => {
    try {
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = audioRefs.current[storyId];
      if (!audio) return;

      if (isPlaying === storyId) {
        // Pause current audio
        audio.pause();
        setIsPlaying(null);
        setCurrentAudio(null);
      } else {
        // Play new audio
        setCurrentAudio(audio);
        setIsPlaying(storyId);
        await audio.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioError('Unable to play audio. Please check your internet connection.');
      setTimeout(() => setAudioError(''), 3000);
      setIsPlaying(null);
      setCurrentAudio(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Music Feature Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Music className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-3xl font-bold">Interactive Folklore & Legends</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover the ancient stories of Jharkhand through immersive audio experiences. 
          Click the <Headphones className="inline h-4 w-4 mx-1" /> play buttons to listen to traditional folklore with ambient sounds.
        </p>
      </div>

      {/* Error Notification */}
      {audioError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{audioError}</p>
        </div>
      )}

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
                  <CardTitle className="text-lg line-clamp-2 mb-1">
                    {story.title}
                    <Music className="inline h-4 w-4 ml-2 text-primary" />
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" size="sm">{story.category}</Badge>
                    <Badge variant="outline" size="sm">{story.festival}</Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={isPlaying === story.id ? "default" : "ghost"}
                  className={`flex-shrink-0 ml-2 relative ${
                    isPlaying === story.id 
                      ? 'bg-primary text-primary-foreground animate-pulse' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAudio(story.id);
                  }}
                >
                  {isPlaying === story.id ? (
                    <div className="flex items-center gap-1">
                      <Pause className="h-4 w-4" />
                      {/* Sound wave animation */}
                      <div className="flex items-center gap-0.5">
                        <div className="w-0.5 h-2 bg-current animate-bounce" style={{animationDelay: '0ms'}} />
                        <div className="w-0.5 h-3 bg-current animate-bounce" style={{animationDelay: '150ms'}} />
                        <div className="w-0.5 h-2 bg-current animate-bounce" style={{animationDelay: '300ms'}} />
                      </div>
                    </div>
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
                    variant={isPlaying === currentStory.id ? "default" : "outline"}
                    className={`flex items-center gap-2 ${
                      isPlaying === currentStory.id 
                        ? 'bg-primary text-primary-foreground' 
                        : ''
                    }`}
                    onClick={() => toggleAudio(currentStory.id)}
                  >
                    <Volume2 className={`h-4 w-4 ${
                      isPlaying === currentStory.id ? 'animate-pulse' : ''
                    }`} />
                    {isPlaying === currentStory.id ? (
                      <div className="flex items-center gap-2">
                        <span>Playing</span>
                        <div className="flex items-center gap-0.5">
                          <div className="w-1 h-2 bg-current animate-bounce" style={{animationDelay: '0ms'}} />
                          <div className="w-1 h-3 bg-current animate-bounce" style={{animationDelay: '150ms'}} />
                          <div className="w-1 h-4 bg-current animate-bounce" style={{animationDelay: '300ms'}} />
                          <div className="w-1 h-3 bg-current animate-bounce" style={{animationDelay: '450ms'}} />
                          <div className="w-1 h-2 bg-current animate-bounce" style={{animationDelay: '600ms'}} />
                        </div>
                      </div>
                    ) : (
                      'Listen to Story'
                    )}
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
