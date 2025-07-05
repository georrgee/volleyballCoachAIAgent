import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { View } from 'react-native';
import { ThemedViewProps } from './types';
/**
 * @author George Garcia
 * @param { ThemedViewProps } props takes in themed view props
 * @description ***(MOLCULE)*** ThemedView Component
 */
const ThemedView: React.FC<ThemedViewProps> = (props) => {

  const { style, lightColor, darkColor, ...rest } = props;
  const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const backgroundColor = Array.isArray(themeColor) ? themeColor[0] : themeColor;

  return <View style={[{ backgroundColor }, style]} {...rest} />
};

export default ThemedView;