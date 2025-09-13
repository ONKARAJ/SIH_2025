import { NextRequest, NextResponse } from 'next/server';

// Mock data for development
const leaderboardData = [
  { id: 1, name: "Festival Master", points: 1250, level: 8, avatar: "FM", achievements: 15, streakDays: 30 },
  { id: 2, name: "Culture Guru", points: 980, level: 6, avatar: "CG", achievements: 12, streakDays: 15 },
  { id: 3, name: "Tribal Scholar", points: 845, level: 5, avatar: "TS", achievements: 10, streakDays: 8 },
  { id: 4, name: "Heritage Hunter", points: 720, level: 4, avatar: "HH", achievements: 8, streakDays: 12 },
  { id: 5, name: "Tradition Keeper", points: 650, level: 4, avatar: "TK", achievements: 7, streakDays: 5 },
  { id: 6, name: "Cultural Explorer", points: 285, level: 3, avatar: "CE", achievements: 4, streakDays: 3 },
  { id: 7, name: "Festival Enthusiast", points: 220, level: 2, avatar: "FE", achievements: 3, streakDays: 2 },
  { id: 8, name: "Culture Newbie", points: 150, level: 1, avatar: "CN", achievements: 2, streakDays: 1 },
];

const achievementsData = [
  {
    id: 'first-festival',
    title: 'Festival Explorer',
    description: 'View your first festival details',
    category: 'explorer',
    points: 10,
    rarity: 'common',
    unlockedBy: [6, 7, 8]
  },
  {
    id: 'culture-enthusiast',
    title: 'Culture Enthusiast', 
    description: 'Explore 5 different cultural elements',
    category: 'learner',
    points: 50,
    rarity: 'rare',
    unlockedBy: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 'seasonal-master',
    title: 'Seasonal Master',
    description: 'View festivals from all 4 seasons',
    category: 'collector',
    points: 100,
    rarity: 'epic',
    unlockedBy: [1, 2, 3]
  },
  {
    id: 'folklore-lover',
    title: 'Folklore Lover',
    description: 'Listen to 3 folklore stories',
    category: 'learner', 
    points: 30,
    rarity: 'common',
    unlockedBy: [1, 2, 3, 4, 5]
  },
  {
    id: 'recipe-collector',
    title: 'Recipe Collector',
    description: 'View 10 traditional recipes',
    category: 'collector',
    points: 75,
    rarity: 'rare',
    unlockedBy: [1, 2, 3, 4]
  },
  {
    id: 'tribal-expert',
    title: 'Tribal Culture Expert',
    description: 'Complete learning about all major tribes',
    category: 'learner',
    points: 200,
    rarity: 'legendary',
    unlockedBy: [1]
  }
];

const challengesData = [
  {
    id: 'daily-quiz',
    title: 'Daily Knowledge Quest',
    description: 'Complete a cultural quiz today',
    type: 'daily',
    points: 20,
    target: 1,
    expiresIn: '18 hours'
  },
  {
    id: 'festival-explorer',
    title: 'Festival Explorer',
    description: 'View 5 different festival pages this week',
    type: 'weekly',
    points: 50,
    target: 5,
    expiresIn: '4 days'
  },
  {
    id: 'culture-collector',
    title: 'Culture Collector', 
    description: 'Explore all cultural elements sections',
    type: 'special',
    points: 100,
    target: 6,
    expiresIn: '30 days'
  }
];

// GET /api/gamification - Get leaderboard and achievements
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const userId = searchParams.get('userId');

    switch (type) {
      case 'leaderboard':
        return NextResponse.json({
          success: true,
          data: leaderboardData.slice(0, 10),
          timestamp: new Date().toISOString()
        });

      case 'achievements':
        return NextResponse.json({
          success: true,
          data: achievementsData,
          timestamp: new Date().toISOString()
        });

      case 'challenges':
        // Add random progress for challenges
        const challengesWithProgress = challengesData.map(challenge => ({
          ...challenge,
          progress: Math.floor(Math.random() * challenge.target),
          completed: Math.random() > 0.7
        }));
        
        return NextResponse.json({
          success: true,
          data: challengesWithProgress,
          timestamp: new Date().toISOString()
        });

      case 'user-profile':
        if (!userId) {
          return NextResponse.json(
            { success: false, message: 'User ID required' },
            { status: 400 }
          );
        }
        
        const user = leaderboardData.find(u => u.id === parseInt(userId));
        if (!user) {
          return NextResponse.json(
            { success: false, message: 'User not found' },
            { status: 404 }
          );
        }

        const userAchievements = achievementsData.filter(achievement => 
          achievement.unlockedBy.includes(parseInt(userId))
        );

        return NextResponse.json({
          success: true,
          data: {
            ...user,
            joinedDate: '2024-01-15',
            quizzesCompleted: Math.floor(Math.random() * 20) + 5,
            averageQuizScore: Math.floor(Math.random() * 30) + 70,
            favoriteFestival: 'Karma Festival',
            unlockedAchievements: userAchievements
          },
          timestamp: new Date().toISOString()
        });

      default:
        // Return all data
        return NextResponse.json({
          success: true,
          data: {
            leaderboard: leaderboardData.slice(0, 10),
            achievements: achievementsData,
            challenges: challengesData.map(challenge => ({
              ...challenge,
              progress: Math.floor(Math.random() * challenge.target),
              completed: Math.random() > 0.7
            }))
          },
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Gamification API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// POST /api/gamification - Update user progress or submit quiz results
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, data } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'submit-quiz':
        const { score, correctAnswers, totalQuestions, timeSpent } = data;
        
        // Calculate points based on performance
        let pointsEarned = score;
        const percentage = (correctAnswers / totalQuestions) * 100;
        
        // Bonus points for good performance
        if (percentage === 100) pointsEarned += 50; // Perfect score bonus
        if (percentage >= 80) pointsEarned += 25; // Excellence bonus
        if (timeSpent < 120) pointsEarned += 15; // Speed bonus

        // Mock achievements unlocked
        const achievementsUnlocked = [];
        if (percentage === 100) achievementsUnlocked.push('perfect-score');
        if (percentage >= 80) achievementsUnlocked.push('culture-expert');
        if (timeSpent < 120) achievementsUnlocked.push('speed-learner');

        return NextResponse.json({
          success: true,
          data: {
            pointsEarned,
            achievementsUnlocked,
            newLevel: Math.floor(pointsEarned / 100) + 1,
            message: 'Quiz results submitted successfully!'
          },
          timestamp: new Date().toISOString()
        });

      case 'track-activity':
        const { activityType, activityId } = data;
        
        // Mock activity tracking
        return NextResponse.json({
          success: true,
          data: {
            message: `Activity ${activityType} tracked successfully`,
            pointsEarned: 5, // Small participation points
            challengeProgress: Math.random() > 0.5 ? 1 : 0
          },
          timestamp: new Date().toISOString()
        });

      case 'complete-challenge':
        const { challengeId } = data;
        const challenge = challengesData.find(c => c.id === challengeId);
        
        if (!challenge) {
          return NextResponse.json(
            { success: false, message: 'Challenge not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          data: {
            pointsEarned: challenge.points,
            challengeCompleted: challengeId,
            message: `Challenge "${challenge.title}" completed!`
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Gamification POST API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
