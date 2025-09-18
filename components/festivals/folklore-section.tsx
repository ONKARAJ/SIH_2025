'use client';

import { useState, useRef, useEffect } from 'react';
import { Book, Play, Pause, Volume2, Music, Headphones, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
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
    audio: '/audio/folklore/sal-trees-legend.mp3',
    audioSlug: 'sal-trees-legend'
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
    audio: '/audio/folklore/divine-gift-cattle.mp3',
    audioSlug: 'divine-gift-cattle'
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
    audio: '/audio/folklore/sacred-grove-keeper.mp3',
    audioSlug: 'sacred-grove-keeper'
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
    audio: '/audio/folklore/peacock-rain-dance.mp3',
    audioSlug: 'peacock-rain-dance'
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
    audio: '/audio/folklore/origin-tribal-music.mp3',
    audioSlug: 'origin-tribal-music'
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
    audio: '/audio/folklore/wise-elephant-village-well.mp3',
    audioSlug: 'wise-elephant-village-well'
  }
];

export default function FolkloreSection() {
  const [selectedStory, setSelectedStory] = useState<string>('1');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState<string>('');
  const [audioAvailability, setAudioAvailability] = useState<{ [key: string]: boolean }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const currentStory = folkloreData.find(story => story.id === selectedStory);

  // Initialize audio elements and check availability
  useEffect(() => {
    const checkAudioAvailability = async () => {
      const availability: { [key: string]: boolean } = {};
      
      for (const story of folkloreData) {
        try {
          // Check if audio file exists by attempting to load it
          const audio = new Audio(story.audio);
          audio.preload = 'metadata';
          
          // Set up event listeners
          audio.addEventListener('ended', () => {
            setIsPlaying(null);
            setCurrentAudio(null);
            setIsLoading(null);
          });
          
          audio.addEventListener('loadedmetadata', () => {
            availability[story.id] = true;
            setAudioAvailability(prev => ({ ...prev, [story.id]: true }));
          });
          
          audio.addEventListener('error', (e) => {
            console.warn(`Audio file not found for ${story.title}: ${story.audio}`);
            availability[story.id] = false;
            setAudioAvailability(prev => ({ ...prev, [story.id]: false }));
          });
          
          audio.addEventListener('loadstart', () => {
            setIsLoading(story.id);
          });
          
          audio.addEventListener('canplay', () => {
            setIsLoading(prev => prev === story.id ? null : prev);
          });
          
          audioRefs.current[story.id] = audio;
        } catch (error) {
          console.warn(`Failed to initialize audio for ${story.title}:`, error);
          availability[story.id] = false;
          setAudioAvailability(prev => ({ ...prev, [story.id]: false }));
        }
      }
    };

    checkAudioAvailability();

    // Cleanup function
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.removeEventListener('ended', () => {});
        audio.removeEventListener('error', () => {});
        audio.removeEventListener('loadedmetadata', () => {});
        audio.removeEventListener('loadstart', () => {});
        audio.removeEventListener('canplay', () => {});
      });
    };
  }, []);

  const toggleAudio = async (storyId: string) => {
    try {
      // Check if audio is available for this story
      if (audioAvailability[storyId] === false) {
        const story = folkloreData.find(s => s.id === storyId);
        setAudioError(`Audio file not found: ${story?.audioSlug}.mp3. Please add the file to public/audio/folklore/`);
        setTimeout(() => setAudioError(''), 5000);
        return;
      }

      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setIsLoading(null);
      }

      const audio = audioRefs.current[storyId];
      if (!audio) {
        setAudioError('Audio player not initialized. Please refresh the page.');
        setTimeout(() => setAudioError(''), 3000);
        return;
      }

      if (isPlaying === storyId) {
        // Pause current audio
        audio.pause();
        setIsPlaying(null);
        setCurrentAudio(null);
        setIsLoading(null);
      } else {
        // Play new audio and set as selected story
        setSelectedStory(storyId);
        setIsLoading(storyId);
        setCurrentAudio(audio);
        setIsPlaying(storyId);
        
        try {
          await audio.play();
          setIsLoading(null);
        } catch (playError) {
          console.error('Error playing audio:', playError);
          setAudioError('Unable to play audio. The file might be corrupted or your browser blocked autoplay.');
          setTimeout(() => setAudioError(''), 5000);
          setIsPlaying(null);
          setCurrentAudio(null);
          setIsLoading(null);
        }
      }
    } catch (error) {
      console.error('Error in toggleAudio:', error);
      setAudioError('Unexpected error occurred while playing audio.');
      setTimeout(() => setAudioError(''), 3000);
      setIsPlaying(null);
      setCurrentAudio(null);
      setIsLoading(null);
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
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm font-medium">Audio Error</p>
          </div>
          <p className="text-sm mt-1">{audioError}</p>
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
                  disabled={isLoading === story.id || audioAvailability[story.id] === false}
                  className={`flex-shrink-0 ml-2 relative ${
                    isPlaying === story.id 
                      ? 'bg-primary text-primary-foreground animate-pulse' 
                      : audioAvailability[story.id] === false
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAudio(story.id);
                  }}
                  title={
                    audioAvailability[story.id] === false 
                      ? `Audio file missing: ${story.audioSlug}.mp3`
                      : isLoading === story.id
                        ? 'Loading audio...'
                        : isPlaying === story.id
                          ? 'Pause audio'
                          : 'Play audio'
                  }
                >
                  {isLoading === story.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : audioAvailability[story.id] === false ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : isPlaying === story.id ? (
                    <div className="flex items-center gap-1">
                      <Pause className="h-4 w-4" />
                      {/* Sound wave animation */}
                      <div className="flex items-center gap-0.5">
                        <div className="w-0.5 h-2 bg-current animate-bounce" style={{animationDelay: '0ms'}} />
                        <div className="w-0.5 h-3 bg-current animate-bounce" style={{animationDelay: '150ms'}} />
                        <div className="w-0.5 h-2 bg-current animate-bounce" style={{animationDelay: '300ms'}} />
                      </div>
                    </div>
                  ) : audioAvailability[story.id] === true ? (
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      <CheckCircle className="h-3 w-3 text-green-600 opacity-60" />
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
                    disabled={isLoading === currentStory.id || audioAvailability[currentStory.id] === false}
                    className={`flex items-center gap-2 ${
                      isPlaying === currentStory.id 
                        ? 'bg-primary text-primary-foreground' 
                        : audioAvailability[currentStory.id] === false
                          ? 'opacity-50'
                          : ''
                    }`}
                    onClick={() => toggleAudio(currentStory.id)}
                  >
                    {isLoading === currentStory.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : audioAvailability[currentStory.id] === false ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <Volume2 className={`h-4 w-4 ${
                        isPlaying === currentStory.id ? 'animate-pulse' : ''
                      }`} />
                    )}
                    {isLoading === currentStory.id ? (
                      'Loading Audio...'
                    ) : audioAvailability[currentStory.id] === false ? (
                      `Audio Missing (${currentStory.audioSlug}.mp3)`
                    ) : isPlaying === currentStory.id ? (
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
            <div className="space-y-3 text-muted-foreground">
              <p>
                Folklore shapes festival celebrations, teaches moral values, 
                and connects communities to their spiritual beliefs and natural environment.
              </p>
              <p>
                These ancient narratives serve as living repositories of tribal wisdom, 
                preserving ecological knowledge, social customs, and spiritual practices 
                that have sustained communities for centuries.
              </p>
              <p>
                Through storytelling, elders pass down essential life lessons about 
                harmony with nature, community cooperation, and the sacred relationship 
                between humans and the earth that continues to guide modern tribal life.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
