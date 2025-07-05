
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export function ScreenBackground({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const gradientColors = Colors[colorScheme ?? 'light'].screenBackground;

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
}
