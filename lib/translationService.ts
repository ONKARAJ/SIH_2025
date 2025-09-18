/**
 * Translation Service Utility
 * Client-side service for interacting with the translation API
 */

export interface TranslationRequest {
  text: string;
  targetLanguage?: string;
  sourceLanguage?: string;
}

export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
  originalText: string;
  targetLanguage: string;
  sourceLanguage: string;
  error?: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
}

export class TranslationService {
  private static readonly API_BASE_URL = '/api/translate';
  
  /**
   * Translate text to target language
   */
  static async translateText({
    text,
    targetLanguage = 'hi',
    sourceLanguage
  }: TranslationRequest): Promise<TranslationResponse> {
    try {
      const response = await fetch(this.API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          targetLanguage,
          sourceLanguage
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Translation failed`);
      }

      return data;
    } catch (error) {
      console.error('Translation service error:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Translation service is unavailable'
      );
    }
  }

  /**
   * Get supported languages
   */
  static async getSupportedLanguages(): Promise<SupportedLanguage[]> {
    try {
      const response = await fetch(this.API_BASE_URL, {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch supported languages');
      }

      return data.supportedLanguages || [];
    } catch (error) {
      console.error('Error fetching supported languages:', error);
      return this.getDefaultLanguages();
    }
  }

  /**
   * Get default supported languages (fallback)
   */
  private static getDefaultLanguages(): SupportedLanguage[] {
    return [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi' },
      { code: 'bn', name: 'Bengali' },
      { code: 'te', name: 'Telugu' },
      { code: 'ta', name: 'Tamil' },
      { code: 'ur', name: 'Urdu' },
      { code: 'gu', name: 'Gujarati' },
      { code: 'kn', name: 'Kannada' },
      { code: 'ml', name: 'Malayalam' },
      { code: 'pa', name: 'Punjabi' },
      { code: 'or', name: 'Odia' },
      { code: 'as', name: 'Assamese' },
      { code: 'mr', name: 'Marathi' },
      { code: 'ne', name: 'Nepali' }
    ];
  }

  /**
   * Detect if text is likely in English
   */
  static isLikelyEnglish(text: string): boolean {
    // Simple heuristic: check for common English words and Latin characters
    const englishWords = /\b(the|and|or|but|in|on|at|to|for|of|with|by|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|can|must|shall)\b/i;
    const latinCharacters = /[a-zA-Z]/;
    
    return englishWords.test(text) && latinCharacters.test(text);
  }

  /**
   * Get appropriate target language based on detected source
   */
  static getRecommendedTarget(detectedSource?: string): string {
    if (!detectedSource) return 'hi';
    
    // If source is English, translate to Hindi
    if (detectedSource.toLowerCase() === 'en' || detectedSource.toLowerCase() === 'english') {
      return 'hi';
    }
    
    // If source is Hindi or other Indian languages, translate to English
    if (['hi', 'hindi', 'bn', 'bengali', 'te', 'telugu', 'ta', 'tamil'].includes(detectedSource.toLowerCase())) {
      return 'en';
    }
    
    // Default to Hindi for other languages
    return 'hi';
  }

  /**
   * Format language display name
   */
  static formatLanguageName(code: string): string {
    const languageNames: { [key: string]: string } = {
      'en': 'English',
      'hi': 'Hindi (हिंदी)',
      'bn': 'Bengali (বাংলা)',
      'te': 'Telugu (తెలుగు)',
      'ta': 'Tamil (தமிழ்)',
      'ur': 'Urdu (اردو)',
      'gu': 'Gujarati (ગુજરાતી)',
      'kn': 'Kannada (ಕನ್ನಡ)',
      'ml': 'Malayalam (മലയാളം)',
      'pa': 'Punjabi (ਪੰਜਾਬੀ)',
      'or': 'Odia (ଓଡ଼ିଆ)',
      'as': 'Assamese (অসমীয়া)',
      'mr': 'Marathi (मराठी)',
      'ne': 'Nepali (नेपाली)'
    };

    return languageNames[code] || code.toUpperCase();
  }
}

export default TranslationService;