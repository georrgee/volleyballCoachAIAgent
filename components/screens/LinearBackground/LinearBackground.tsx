import React, { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
/**
 * @author George Garcia 
 * @param { ReactNode } children Accepts other components  
 * @description Screen component to display content 
 */
const LinearGradientScreen = ({ children }: { children?: ReactNode }) => {

  const colorScheme = useColorScheme();
  const gradientColors = Colors[colorScheme ?? 'light'].screenBackground;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#202736' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 80}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient colors={gradientColors} style={styles.linearGradientContainer}>
            {children}
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

export default LinearGradientScreen;
