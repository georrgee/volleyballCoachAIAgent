import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';
import { sessionService, Session } from '@/services/sessionService';
import { SessionStorage } from '@/utils/sessionStorage';

interface GroupedSessions {
  title: string;
  data: Session[];
}

/**
 * @author George Garcia
 * @param { DrawerContentComponentProps } props takes in drawer content props
 * @description ***(ORGANISM)*** The main component to show the side menu 
 */
const SideMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const colorScheme = useColorScheme();
  const gradientColors = Colors[colorScheme ?? 'light'].screenBackground;
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
    loadCurrentSession();
  }, []);

  const loadCurrentSession = async () => {
    const sessionId = await SessionStorage.getCurrentSessionId();
    setCurrentSessionId(sessionId);
  };

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionService.getSessions();
      setSessions(response.sessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupSessionsByDate = (sessions: Session[]): GroupedSessions[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const groups: GroupedSessions[] = [
      { title: 'Today', data: [] },
      { title: 'Yesterday', data: [] },
      { title: 'Previous 7 Days', data: [] },
      { title: 'Older', data: [] }
    ];

    sessions.forEach(session => {
      const sessionDate = new Date(session.createdAt);
      const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());

      if (sessionDay.getTime() === today.getTime()) {
        groups[0].data.push(session);
      } else if (sessionDay.getTime() === yesterday.getTime()) {
        groups[1].data.push(session);
      } else if (sessionDay.getTime() > lastWeek.getTime()) {
        groups[2].data.push(session);
      } else {
        groups[3].data.push(session);
      }
    });

    return groups.filter(group => group.data.length > 0);
  };

  const handleNewChat = async () => {
    try {
      const newSession = await sessionService.createSession();
      await SessionStorage.setCurrentSessionId(newSession.sessionId);
      await SessionStorage.addToRecentSessions(newSession.sessionId);
      setCurrentSessionId(newSession.sessionId);
      router.push(`/chat/${newSession.sessionId}`);
      props.navigation.closeDrawer();
    } catch (error) {
      console.error('Error creating new session:', error);
      Alert.alert('Error', 'Failed to create new chat');
    }
  };

  const handleSessionSelect = async (session: Session) => {
    await SessionStorage.setCurrentSessionId(session.sessionId);
    await SessionStorage.addToRecentSessions(session.sessionId);
    setCurrentSessionId(session.sessionId);
    router.push(`/chat/${session.sessionId}`);
    props.navigation.closeDrawer();
  };

  const handleDeleteSession = async (sessionId: string) => {
    Alert.alert(
      'Delete Conversation',
      'Are you sure you want to delete this conversation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await sessionService.deleteSession(sessionId);
              if (currentSessionId === sessionId) {
                await SessionStorage.clearCurrentSession();
                setCurrentSessionId(null);
              }
              loadSessions();
            } catch (error) {
              console.error('Error deleting session:', error);
              Alert.alert('Error', 'Failed to delete conversation');
            }
          }
        }
      ]
    );
  };

  const renderSessionItem = ({ item }: { item: Session }) => (
    <TouchableOpacity style={[styles.sessionItem, currentSessionId === item.sessionId && styles.activeSessionItem]}
      onPress={() => handleSessionSelect(item)}
      onLongPress={() => handleDeleteSession(item.sessionId)}>
      <Text style={styles.sessionTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderGroup = ({ item }: { item: GroupedSessions }) => (
    <View style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{item.title}</Text>
      <FlatList
        data={item.data}
        renderItem={renderSessionItem}
        keyExtractor={(session) => session.sessionId}
        scrollEnabled={false}
      />
    </View>
  );

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
            <Text style={styles.newChatButtonText}>+ New Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.conversationsContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Loading conversations...</Text>
          ) : groupedSessions.length > 0 ? (
            <FlatList
              data={groupedSessions}
              renderItem={renderGroup}
              keyExtractor={(group) => group.title}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.emptyText}>No conversations yet</Text>
          )}
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  newChatButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  newChatButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  conversationsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sessionItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeSessionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sessionTitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SideMenu;