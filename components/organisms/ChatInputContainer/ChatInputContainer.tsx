import { DividerLine } from '@/components/atoms';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import React, { useRef, useState } from 'react';
import { Animated, Keyboard, TextInput, View } from 'react-native';
import { styles } from './styles';

const ChatInputContainer = () => {

  // * MARK - Hooks
  const colorScheme = useColorScheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  // const [typingText, setTypingText] = useState('Thinking...');
  const [isTyping, setIsTyping] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const inputRef = useRef<TextInput>(null);

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

      <TextInput
        ref={inputRef}
        style={message.length > 0 ? styles.input : styles.inputPlaceholder}
        value={message}
        multiline
        numberOfLines={0}
        onChangeText={setMessage}
        placeholder="What are some good drills to do to improve as a setter?"
        placeholderTextColor={'gray' + 20}
        onSubmitEditing={handleSubmit} // Handle enter press
        returnKeyType="default" />

      <DividerLine thickness='thick' style={styles.dividerLineStyle} />

      <View style={styles.buttonContainer}>
        <Ionicons
          name="arrow-up-circle"
          size={44}
          color={message.length === 0 ? 'gray' : 'white'}
          disabled={message.length === 0}
          onPress={handleAskCoachButtonPress}
          style={styles.iconButton} />
      </View>
    </LinearGradient>
  );
};


export default ChatInputContainer;