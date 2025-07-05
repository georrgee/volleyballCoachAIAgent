import { Text } from 'react-native';
import { LinearGradientScreen } from '@/components/screens';

export default function MainScreen() {
  
  return (
    <LinearGradientScreen>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        Main Content
      </Text>
    </LinearGradientScreen>
  );
}