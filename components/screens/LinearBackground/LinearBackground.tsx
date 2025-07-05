
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { styles } from './styles';
/**
 * @author George Garcia 
 * @param { ReactNode } children Accepts other components  
 * @description Screen component to display content 
 */
const LinearGradientScreen = ({ children }: { children: ReactNode }) => {

  const colorScheme = useColorScheme();
  const gradientColors = Colors[colorScheme ?? 'light'].screenBackground;

  return (
    <LinearGradient colors={gradientColors} style={styles.linearGradientContainer}>
      {children}
    </LinearGradient>
  )
};

export default LinearGradientScreen;
