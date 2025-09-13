'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Trophy, 
  Star, 
  Target, 
  Gamepad2, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Calendar,
  Users,
  Gift,
  Zap,
  Crown
} from 'lucide-react';
import CulturalAchievements from './cultural-achievements';
import CulturalQuiz from './cultural-quiz';

interface UserProfile {
  name: string;
  level: number;
  totalPoints: number;
  rank: string;
  joinedDate: string;
  achievementsUnlocked: number;
  totalAchievements: number;
  quizzesCompleted: number;
  averageQuizScore: number;
  streakDays: number;
  favoriteFestival: string;
}

interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
  level: number;
  avatar: string;
  achievements: number;
}

interface CulturalChallenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  points: number;
  progress: number;
  target: number;
  expiresIn: string;
  completed: boolean;
}

// Mock data
const userProfile: UserProfile = {
  name: "Cultural Explorer",
  level: 3,
  totalPoints: 285,
  rank: "Bronze Explorer",
  joinedDate: "2024-01-15",
  achievementsUnlocked: 4,
  totalAchievements: 12,
  quizzesCompleted: 8,
  averageQuizScore: 78,
  streakDays: 5,
  favoriteFestival: "Karma Festival"
};

const leaderboard: LeaderboardUser[] = [
  { id: 1, name: "Festival Master", points: 1250, level: 8, avatar: "FM", achievements: 15 },
  { id: 2, name: "Culture Guru", points: 980, level: 6, avatar: "CG", achievements: 12 },
  { id: 3, name: "Tribal Scholar", points: 845, level: 5, avatar: "TS", achievements: 10 },
  { id: 4, name: "Heritage Hunter", points: 720, level: 4, avatar: "HH", achievements: 8 },
  { id: 5, name: "Tradition Keeper", points: 650, level: 4, avatar: "TK", achievements: 7 },
  { id: 6, name: "Cultural Explorer", points: 285, level: 3, avatar: "CE", achievements: 4 },
];

const culturalChallenges: CulturalChallenge[] = [
  {
    id: 'daily-quiz',
    title: 'Daily Knowledge Quest',
    description: 'Complete a cultural quiz today',
    type: 'daily',
    points: 20,
    progress: 0,
    target: 1,
    expiresIn: '18 hours',
    completed: false
  },
  {
    id: 'festival-explorer',
    title: 'Festival Explorer',
    description: 'View 5 different festival pages this week',
    type: 'weekly',
    points: 50,
    progress: 3,
    target: 5,
    expiresIn: '4 days',
    completed: false
  },
  {
    id: 'culture-collector',
    title: 'Culture Collector',
    description: 'Explore all cultural elements sections',
    type: 'special',
    points: 100,
    progress: 2,
    target: 6,
    expiresIn: '30 days',
    completed: false
  }
];

const challengeTypeColors = {
  daily: 'bg-blue-500',
  weekly: 'bg-green-500',
  special: 'bg-purple-500'
};

export default function GamificationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showQuiz, setShowQuiz] = useState(false);
  const [userRank, setUserRank] = useState(0);

  useEffect(() => {
    const rank = leaderboard.findIndex(user => user.name === userProfile.name) + 1;
    setUserRank(rank);
  }, []);

  const handleQuizComplete = (result: any) => {
    console.log('Quiz completed:', result);
    setShowQuiz(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLevelProgress = () => {
    return (userProfile.totalPoints % 100) / 100 * 100;
  };

  if (showQuiz) {
    return <CulturalQuiz onComplete={handleQuizComplete} />;
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">Level {userProfile.level}</div>
                <div className="text-sm text-muted-foreground">{userProfile.rank}</div>
                <Progress value={getLevelProgress()} className="mt-2 h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {userProfile.totalPoints % 100}/100 to next level
                </div>
              </div>
              <Crown className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-secondary">{userProfile.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +45 this week
                </div>
              </div>
              <Star className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">#{userRank}</div>
                <div className="text-sm text-muted-foreground">Leaderboard Rank</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {userProfile.achievementsUnlocked}/{userProfile.totalAchievements} achievements
                </div>
              </div>
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{userProfile.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {userProfile.averageQuizScore}% avg quiz score
                </div>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Challenges Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Daily Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {culturalChallenges.slice(0, 2).map((challenge) => (
                  <div 
                    key={challenge.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Badge className={`${challengeTypeColors[challenge.type]} text-white`}>
                          {challenge.type}
                        </Badge>
                        <h4 className="font-semibold">{challenge.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{challenge.progress}/{challenge.target}</span>
                          </div>
                          <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires in {challenge.expiresIn}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-primary">{challenge.points}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setShowQuiz(true)}
                className="w-full mt-4"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Take Cultural Quiz
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Festival Explorer</div>
                      <div className="text-sm text-muted-foreground">Unlocked 2 days ago</div>
                    </div>
                    <div className="text-sm font-bold text-green-600">+10 pts</div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Culture Enthusiast</div>
                      <div className="text-sm text-muted-foreground">Unlocked 5 days ago</div>
                    </div>
                    <div className="text-sm font-bold text-blue-600">+50 pts</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.slice(0, 3).map((user, index) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 text-sm font-bold">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">Level {user.level}</div>
                      </div>
                      <div className="text-sm font-bold">{user.points}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <CulturalAchievements />
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {culturalChallenges.map((challenge) => (
                  <div 
                    key={challenge.id}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      challenge.completed 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-white border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${challengeTypeColors[challenge.type]} text-white`}>
                            {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                          </Badge>
                          <h3 className="text-lg font-semibold">{challenge.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{challenge.points}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.target}</span>
                      </div>
                      <Progress 
                        value={(challenge.progress / challenge.target) * 100}
                        className="h-3"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Expires in {challenge.expiresIn}</span>
                        <span>
                          {Math.round((challenge.progress / challenge.target) * 100)}% complete
                        </span>
                      </div>
                    </div>

                    {challenge.completed && (
                      <div className="mt-4 flex items-center justify-center p-2 bg-green-100 rounded-lg">
                        <Trophy className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">Completed!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div 
                    key={user.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      user.name === userProfile.name 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 text-lg font-bold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Level {user.level} • {user.achievements} achievements
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Profile Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">{userProfile.totalPoints}</div>
                    <div className="text-muted-foreground">Total Points</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">Level {userProfile.level}</div>
                    <div className="text-muted-foreground">{userProfile.rank}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">{userProfile.quizzesCompleted}</div>
                    <div className="text-muted-foreground">Quizzes Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{userProfile.averageQuizScore}%</div>
                    <div className="text-muted-foreground">Average Quiz Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{userProfile.achievementsUnlocked}</div>
                    <div className="text-muted-foreground">Achievements Unlocked</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">{userProfile.streakDays}</div>
                    <div className="text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Joined Date</div>
                  <div className="font-medium">{formatDate(userProfile.joinedDate)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Favorite Festival</div>
                  <div className="font-medium">{userProfile.favoriteFestival}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Rank</div>
                  <div className="font-medium">#{userRank} on Leaderboard</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Progress to Next Level</div>
                  <Progress value={getLevelProgress()} className="mt-1" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {userProfile.totalPoints % 100}/100 points
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
