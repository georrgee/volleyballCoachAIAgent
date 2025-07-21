import { ChatInputContainer } from '@/components/organisms';
import { LinearGradientScreen } from '@/components/screens';
import { Text, View } from 'react-native';

export default function MainScreen() {

  return (
    <LinearGradientScreen>

      <View style={{
        flex: 0.9,
        width: '100%'
      }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Main Content
        </Text>
      </View>

      <View style={{
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
      }}>
        <ChatInputContainer />

      </View>

    </LinearGradientScreen>
  );
};
