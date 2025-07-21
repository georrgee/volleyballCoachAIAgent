import { Dimensions, StyleSheet } from "react-native";
/**
 * @author George Garcia
 * @description Styling sheet for the ChatInputContainer.tsx (Organism Component)
 */
export const styles = StyleSheet.create({
  chatBoxContainer: {
    width: Dimensions.get('window').width - 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    minHeight: 180,
  },
  
  dividerLineStyle: {
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //backgroundColor: 'transparent',
    alignSelf: 'center',
    marginVertical: 15
  },

  input: {
    minHeight: 80,
    maxHeight: 120,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    padding: 0, // Remove default padding
    margin: 0,
    textAlignVertical: 'top'
  },

  inputPlaceholder: {
    minHeight: 80,
    maxHeight: 120,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Italic', // For placeholder
    padding: 0,
    margin: 0,
    textAlignVertical: 'top'
  },

  buttonContainer: {
    //backgroundColor: 'red',
    //flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  askButtonTextStyle: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Lato-Bold'
  },
  
  iconButton: {
    marginHorizontal: 0,
  },
});
