import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Animated, Keyboard,
  Text, TextInput, View
} from 'react-native';
import { styles } from './styles';

const ChatInputContainer = () => {

  // * MARK - Hooks
  const colorScheme                 = useColorScheme();
  const [message, setMessage]       = useState('');
  const [messages, setMessages]     = useState<string[]>([]);
  // const [typingText, setTypingText] = useState('Thinking...');
  const [isTyping, setIsTyping]     = useState(false);
  const fadeAnim                    = useState(new Animated.Value(0))[0];
  const inputRef                    = useRef<TextInput>(null);

  // * MARK - Variables
  const gradientColors = Colors[colorScheme ?? 'light'].screenBackground;

  // * MARK - useEffect Life cycles
  // useEffect(() => {
  //   if (!isTyping) return;

  //   const texts = ['Thinking...', 'Processing...', 'Analyzing...'];
  //   let index = 0;
  //   const interval = setInterval(() => {
  //     index = (index + 1) % texts.length;
  //     setTypingText(texts[index]);
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       fadeAnim.setValue(0);
  //     });
  //   }, 2000);

  //   const timeout = setTimeout(() => {
  //     setIsTyping(false);
  //     setMessages([...messages, 'Placeholder response from coach']);
  //     clearInterval(interval);
  //   }, 6000); // Simulate 6 seconds response time

  //   return () => {
  //     clearInterval(interval);
  //     clearTimeout(timeout);
  //   };
  // }, [isTyping, fadeAnim, messages]);

  const handleAskCoachButtonPress = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
      setIsTyping(true);
      Keyboard.dismiss();
    }
  };

  const handleSubmit = () => handleAskCoachButtonPress();

  return (
        <LinearGradient colors={gradientColors} style={styles.chatBoxContainer}>
          <View style={styles.messageDisplay}>
            {messages.map((msg, index) => (
              <Text key={index} style={styles.messageText}>{msg}</Text>
            ))}
            {/* {isTyping && (
              <Animated.Text style={[styles.typingIndicator, { opacity: fadeAnim }]}>
                {typingText}
              </Animated.Text>
            )} */}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={message}
              multiline
              onChangeText={setMessage}
              placeholder="Ask your volleyball coach..."
              placeholderTextColor={Colors[colorScheme ?? 'light'].text}
              onSubmitEditing={handleSubmit} // Handle enter press
              returnKeyType="send"
            />
            <Ionicons
              name="arrow-up-circle"
              size={24}
              color="white"
              onPress={handleAskCoachButtonPress}
              style={styles.iconButton}
            />
          </View>
        </LinearGradient>
  );
};


export default ChatInputContainer;