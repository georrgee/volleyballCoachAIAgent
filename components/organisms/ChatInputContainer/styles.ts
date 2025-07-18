import { Dimensions, StyleSheet } from "react-native";

/**
 * @author George Garcia
 * @description Styling sheet for the ChatInputContainer.tsx (Organism Component)
 */

export const styles = StyleSheet.create({

  chatBoxContainer: {
    flex: 1,
    padding: 10,
    width: Dimensions.get('window').width,
  },

  messageDisplay: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  
  messageText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },

  typingIndicator: {
    fontSize: 14,
    color: 'gray',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent for dark theme
    borderRadius: 30,
    padding: 10,
  },

  input: {
    flex: 1,
    color: 'white',
    padding: 10,
    marginHorizontal: 10,
  },
  
  iconButton: {
    marginHorizontal: 5,
  },
});
