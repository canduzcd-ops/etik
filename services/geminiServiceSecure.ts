/**
 * Secure Gemini Service - Firebase Backend Proxy
 * API key is securely stored in Firebase, not exposed in client
 */

const FIREBASE_FUNCTION_URL = 
  'https://analyzeethicaldilemma-g6lpxvhs6a-uc.a.run.app';

export interface EthicalAnalysis {
  kant: string;
  mill: string;
  aristotle: string;
  summary: string;
  microQuestions: string[];
}

export async function analyzeEthicalDilemma(
  dilemma: string,
  language: 'tr' | 'en'
): Promise<EthicalAnalysis> {
  try {
    const response = await fetch(FIREBASE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dilemma,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Firebase error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ethical analysis failed:', error);
    throw new Error(
      language === 'tr'
        ? 'Analiz yapılırken bir hata oluştu. Lütfen tekrar deneyin.'
        : 'An error occurred during analysis. Please try again.'
    );
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(
      'https://health-g6lpxvhs6a-uc.a.run.app'
    );
    return response.ok;
  } catch {
    return false;
  }
}
