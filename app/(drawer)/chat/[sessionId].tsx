import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradientScreen } from '@/components/screens';
import { ChatInputContainer } from '@/components/organisms';
import { sessionService } from '@/services/sessionService';
import { UserRole, Message, Session } from '@/services/sessionService';

/* 
  TODO July 22nd, 2025 - 5:20 pm: double check on code
  TODO July 22nd, 2025 - 5:22 pm: update ChatInputContainer Props 
*/

export default function ChatScreen () {

  const { sessionId }         = useLocalSearchParams<{ sessionId: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    loadSession()
  }, [sessionId]);

  const loadSession = async () => {

    try {
      setIsLoading(true);

      const sessionData = await sessionService.getSession(sessionId);
      setSession(sessionData);

    } catch (error) {
      setError('Failed to load the conversation!');
      console.error('[sessionId].tsx - Failed to load the conversation!', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.role === 'user' ? styles.userMessage : styles.assistantMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.role === 'user' ? styles.userMessageText : styles.assistantMessageText
      ]}>
        {item.content}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <LinearGradientScreen>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading conversation...</Text>
        </View>
      </LinearGradientScreen>
    );
  }

  if (error) {
    return (
      <LinearGradientScreen>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </LinearGradientScreen>
    );
  }

  return (
    <LinearGradientScreen>
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          {session?.messages && session.messages.length > 0 ? (
            <FlatList
              data={session.messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item._id}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContent}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet</Text>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <ChatInputContainer sessionId={sessionId} onMessageSent={loadSession} />
        </View>
      </View>
    </LinearGradientScreen>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    marginTop: 10,
  },

  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },

  messagesContainer: {
    flex: 1,
  },

  messagesList: {
    flex: 1,
  },

  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },

  messageContainer: {
    marginVertical: 8,
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },

  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },

  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  messageText: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },

  userMessageText: {
    color: 'white',
  },

  assistantMessageText: {
    color: 'white',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },

  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});