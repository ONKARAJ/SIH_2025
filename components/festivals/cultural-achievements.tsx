'use client';

import { useState, useEffect } from 'react';
import { Award, Trophy, Star, Target, Zap, Crown, Medal, Gift, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'explorer' | 'learner' | 'collector' | 'social';
  points: number;
  requirement: number;
  progress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  {
    id: 'first-festival',
    title: 'Festival Explorer',
    description: 'View your first festival details',
    icon: Award,
    category: 'explorer',
    points: 10,
    requirement: 1,
    progress: 0,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'culture-enthusiast',
    title: 'Culture Enthusiast',
    description: 'Explore 5 different cultural elements',
    icon: Star,
    category: 'learner',
    points: 50,
    requirement: 5,
    progress: 0,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'seasonal-master',
    title: 'Seasonal Master',
    description: 'View festivals from all 4 seasons',
    icon: Trophy,
    category: 'collector',
    points: 100,
    requirement: 4,
    progress: 0,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'folklore-lover',
    title: 'Folklore Lover',
    description: 'Listen to 3 folklore stories',
    icon: Target,
    category: 'learner',
    points: 30,
    requirement: 3,
    progress: 0,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'recipe-collector',
    title: 'Recipe Collector',
    description: 'View 10 traditional recipes',
    icon: Crown,
    category: 'collector',
    points: 75,
    requirement: 10,
    progress: 0,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'tribal-expert',
    title: 'Tribal Culture Expert',
    description: 'Complete learning about all major tribes',
    icon: Medal,
    category: 'learner',
    points: 200,
    requirement: 100,
    progress: 0,
    unlocked: false,
    rarity: 'legendary'
  }
];

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500', 
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500'
};

const categoryIcons = {
  explorer: Target,
  learner: Star,
  collector: Trophy,
  social: Gift
};

export default function CulturalAchievements() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  // Calculate level and total points
  useEffect(() => {
    const points = userAchievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.points, 0);
    
    setTotalPoints(points);
    setLevel(Math.floor(points / 100) + 1);
  }, [userAchievements]);

  // Simulate achievement progress
  useEffect(() => {
    const timer = setInterval(() => {
      setUserAchievements(prev => prev.map(achievement => {
        if (!achievement.unlocked && achievement.progress < achievement.requirement) {
          const newProgress = Math.min(
            achievement.progress + Math.random() * 0.5,
            achievement.requirement
          );
          
          if (newProgress >= achievement.requirement && !achievement.unlocked) {
            setNewUnlock(achievement);
            setTimeout(() => setNewUnlock(null), 3000);
            return { ...achievement, progress: newProgress, unlocked: true };
          }
          
          return { ...achievement, progress: newProgress };
        }
        return achievement;
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const filteredAchievements = selectedCategory === 'all' 
    ? userAchievements 
    : userAchievements.filter(a => a.category === selectedCategory);

  const unlockedCount = userAchievements.filter(a => a.unlocked).length;
  const progressToNextLevel = (totalPoints % 100) / 100 * 100;

  return (
    <div className="space-y-6">
      {/* Achievement Unlock Notification */}
      {newUnlock && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-yellow-200" />
                </div>
                <div>
                  <h4 className="font-bold">Achievement Unlocked!</h4>
                  <p className="text-sm opacity-90">{newUnlock.title}</p>
                  <p className="text-xs opacity-75">+{newUnlock.points} points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Level {level}</div>
              <div className="text-sm text-muted-foreground">Cultural Explorer</div>
              <Progress value={progressToNextLevel} className="mt-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {totalPoints % 100}/100 to next level
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{unlockedCount}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round((unlockedCount / userAchievements.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Completion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Achievements
        </Button>
        {Object.entries(categoryIcons).map(([category, Icon]) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const IconComponent = achievement.icon;
          const isNearComplete = achievement.progress / achievement.requirement > 0.8;
          
          return (
            <Card 
              key={achievement.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 shadow-lg' 
                  : isNearComplete
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300 animate-pulse' 
                  : 'hover:shadow-md'
              }`}
            >
              {/* Rarity Indicator */}
              <div className={`absolute top-0 left-0 w-full h-1 ${rarityColors[achievement.rarity]}`} />
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-green-500 text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="text-right">
                    <Badge 
                      className={`${rarityColors[achievement.rarity]} text-white mb-2`}
                      size="sm"
                    >
                      {achievement.rarity}
                    </Badge>
                    <div className="text-sm font-bold text-primary">
                      {achievement.points} pts
                    </div>
                  </div>
                </div>
                
                <div>
                  <CardTitle className={`text-lg ${
                    achievement.unlocked ? 'text-green-700' : ''
                  }`}>
                    {achievement.title}
                    {achievement.unlocked && (
                      <CheckCircle className="inline h-5 w-5 ml-2 text-green-500" />
                    )}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4">
                  {achievement.description}
                </p>
                
                {!achievement.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {Math.floor(achievement.progress)}/{achievement.requirement}
                      </span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.requirement) * 100}
                      className="h-2"
                    />
                  </div>
                )}

                {achievement.unlocked && (
                  <div className="text-center">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      <Trophy className="h-3 w-3 mr-1" />
                      Unlocked!
                    </Badge>
                  </div>
                )}
              </CardContent>
              
              {/* Sparkle Effect for Unlocked Achievements */}
              {achievement.unlocked && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Star className="h-3 w-3 text-yellow-400 animate-pulse delay-300" />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Cultural Knowledge Quiz Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Cultural Knowledge Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Test your knowledge about Jharkhand's festivals and culture to earn bonus points!
            </p>
            <Button size="lg" className="px-8">
              <Zap className="h-5 w-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
