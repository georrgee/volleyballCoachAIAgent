import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';

/**
 * @author George Garcia
 * @param { DrawerContentComponentProps } props takes in drawer content props
 * @description ***(ORGANISM)*** The main component to show the side menu 
 */
const SideMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const colorScheme = useColorScheme();
  const gradientColors = Colors[colorScheme ?? 'light'].screenBackground;

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollViewContent}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
});

export default SideMenu;