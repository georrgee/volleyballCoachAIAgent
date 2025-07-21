import { ChatInputContainer } from '@/components/organisms';
import { LinearGradientScreen } from '@/components/screens';
import { StyleSheet, Text, View } from 'react-native';

export default function MainScreen() {

  return (
    <LinearGradientScreen>
      <View style={styles.mainContentContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>
            🏐
          </Text>
          <Text style={styles.greetingText}>
            Hi, I'm your Volleyball Coach
          </Text>
          <Text style={styles.subText}>
            How can I help you today?
          </Text>
        </View>
      </View>

      <View style={styles.chatTextInputContainer}>
        <ChatInputContainer />
      </View>
    </LinearGradientScreen>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    //backgroundColor: 'pink',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoEmoji: {
    fontSize: 80,
    marginBottom: 20
  },

  greetingText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Lato-Black',
    textAlign: 'center',
    marginBottom: 8
  },

  subText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    textAlign: 'center'
  },
  
  chatTextInputContainer: {
    //backgroundColor: 'purple',
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  }
})