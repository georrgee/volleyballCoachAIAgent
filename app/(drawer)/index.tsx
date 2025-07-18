import { ChatInputContainer } from '@/components/organisms';
import { LinearGradientScreen } from '@/components/screens';
import { Text } from 'react-native';

export default function MainScreen() {
  
  return (
    <LinearGradientScreen>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        Main Content
      </Text>

      <ChatInputContainer />
      
    </LinearGradientScreen>
  );
};
