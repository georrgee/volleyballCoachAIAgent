const API_BASE_URL = 'http://10.0.0.17:3000/api'; // TODO: Change this to your backend URL

export type UserRole = 'user' | 'assistant';

export interface Message {
  _id: string;
  role: UserRole;
  content: string;
  timestamp: string;
}

export interface Session {
  _id: string;
  sessionId: string;
  title: string;
  category: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface SessionsResponse {
  sessions: Session[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalSessions: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class SessionService {

  async getSession(sessionId: string): Promise<Session> {
    try {
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  }

  async getSessions(category?: string, limit: number = 20, page: number = 1): Promise<SessionsResponse> {

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        ...(category && { category }),
      });

      const response = await fetch(`${API_BASE_URL}/sessions?${params}`);

      if (!response.ok) throw new Error('sessionService.ts - Response was not okay! Failed to fetch sessions');

      return await response.json();      ;

    } catch (error) {
      console.error('sessionService.ts - Failed to fetch sessions. Error:', error);
      throw error;
    }
  }

  async createSession(): Promise<Session> {

    try {

      const response = await fetch(`${API_BASE_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New session'
        })
      });

      if (!response.ok) throw new Error('sessionService.ts - Response was not okay! Failed to create a session');

      return await response.json();
    } catch (error) {
      console.error('sessionService.ts - Failed to create session. Error:', error);
      throw error;
    }
  }

  async deleteSession(sessionId: string): Promise<void> {

    try {
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete session');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }
  
  async sendMessage(sessionId: string, content: string): Promise<Session> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          message: content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export const sessionService = new SessionService();