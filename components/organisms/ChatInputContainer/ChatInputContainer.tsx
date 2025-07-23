import { DividerLine } from '@/components/atoms';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { sessionService } from '@/services/sessionService';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import React, { useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, TextInput, View } from 'react-native';
import { styles } from './styles';

interface ChatInputContainerProps {
  sessionId?: string;
  onMessageSent?: () => void;
}

const ChatInputContainer: React.FC<ChatInputContainerProps> = (props) => {

  const { sessionId = undefined, onMessageSent = undefined } = props;

  // * MARK - Hooks
  const colorScheme = useColorScheme();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // * MARK - Variables
  const gradientColors = Colors[colorScheme ?? 'light'].screenBackground;

  const handleAskCoachButtonPress = async () => {
    if (!message.trim()) return;
    
    try {
      setIsLoading(true);
      Keyboard.dismiss();
      
      if (sessionId) {
        // If we have a sessionId, send the message to the backend
        await sessionService.sendMessage(sessionId, message.trim());
        
        // Call the callback to refresh the conversation
        if (onMessageSent) {
          onMessageSent();
        }
      } else {
        // Handle the case when there's no sessionId (e.g., on the home screen)
        console.log('No sessionId provided, message not sent to backend');
      }
      
      // Clear the input field
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => handleAskCoachButtonPress();

  return (
    <LinearGradient colors={gradientColors} style={styles.chatBoxContainer}>

      <TextInput
        ref={inputRef}
        style={message.length > 0 ? styles.input : styles.inputPlaceholder}
        value={message}
        multiline
        numberOfLines={0}
        onChangeText={setMessage}
        placeholder="What are some good drills to do to improve as a setter?"
        placeholderTextColor={'gray'}
        onSubmitEditing={handleSubmit} // Handle enter press
        returnKeyType="default"
        editable={!isLoading} // Disable input while loading
      />

      <DividerLine thickness='thick' style={styles.dividerLineStyle} />

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" style={styles.iconButton} />
        ) : (
          <Ionicons
            name="arrow-up-circle"
            size={44}
            color={message.length === 0 ? 'gray' : 'white'}
            disabled={message.length === 0}
            onPress={handleAskCoachButtonPress}
            style={styles.iconButton} />
        )}
      </View>
    </LinearGradient>
  );
};

export default ChatInputContainer;