import { Text } from 'react-native';
import { ScreenBackground } from '@/components/ScreenBackground';

export default function MainScreen() {
  return (
    <ScreenBackground>
      <Text style={{ color: 'white', textAlign: 'center' }}>Main Content</Text>
    </ScreenBackground>
  );
}