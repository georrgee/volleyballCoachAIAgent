import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENT_SESSION_KEY = 'current_session_id';
const RECENT_SESSIONS_KEY = 'recent_sessions';

export class SessionStorage {
  static async getCurrentSessionId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(CURRENT_SESSION_KEY);
    } catch (error) {
      console.error('Error getting current session ID:', error);
      return null;
    }
  }

  static async setCurrentSessionId(sessionId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(CURRENT_SESSION_KEY, sessionId);
    } catch (error) {
      console.error('Error setting current session ID:', error);
    }
  }

  static async clearCurrentSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CURRENT_SESSION_KEY);
    } catch (error) {
      console.error('Error clearing current session:', error);
    }
  }

  static async addToRecentSessions(sessionId: string): Promise<void> {
    try {
      const recentSessions = await this.getRecentSessions();
      const updatedSessions = [sessionId, ...recentSessions.filter(id => id !== sessionId)].slice(0, 10);
      await AsyncStorage.setItem(RECENT_SESSIONS_KEY, JSON.stringify(updatedSessions));
    } catch (error) {
      console.error('Error adding to recent sessions:', error);
    }
  }

  static async getRecentSessions(): Promise<string[]> {
    try {
      const sessions = await AsyncStorage.getItem(RECENT_SESSIONS_KEY);
      return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
      console.error('Error getting recent sessions:', error);
      return [];
    }
  }
}