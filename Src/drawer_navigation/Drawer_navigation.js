import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import your icon set

const screenWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Drawer_navigation = ({ onHandleClick }) => {
  // Define the data for the buttons including icon names
  const data = [
    { id: 1, label: 'Letest news', icon: 'new-releases' },
    { id: 2, label: 'Profile', icon: 'person' },
    { id: 3, label: 'Settings', icon: 'settings' },
    { id: 4, label: 'Notifications', icon: 'notifications' },
    { id: 5, label: 'Messages', icon: 'message' },
    { id: 6, label: 'Favorites', icon: 'star' },
    { id: 7, label: 'Friends', icon: 'group' ,},
    { id: 8, label: 'App Info', icon: 'info' ,},
    { id: 9, label: 'Search', icon: 'search' },
    { id: 10, label: 'Help', icon: 'help' },
    { id: 11, label: 'Logout', icon: 'logout' },
  ];

  const handleButtonPress = (item) => {
    console.log(`Button pressed: ${item.label}`);
    // Handle button press logic here
    onHandleClick(item.label);
  };

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.button}
          onPress={() => handleButtonPress(item)}>
          <Icon name={item.icon} size={24} color="#f0f0f0" style={styles.icon} />
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#295F98',
    width: screenWidth*0.5,
    height:windowHeight*0.774,
    top: 85,
    right: '-35%',
  },
  button: {
    flexDirection: 'row', // Arrange icon and text in a row
    alignItems: 'center', // Align items vertically center
    padding: '5%',
    borderRadius: 5,
    marginBottom: '4.8%',
    borderColor: 'lightgray',
    // width: '113%',
    left: '-2%',
    borderBottomWidth: 1, // Add border width here
    borderColor:'#000000'


  },
  buttonText: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
    marginLeft: 20, // Add some space between icon and text
  },
  icon: {
    marginLeft: 15, // Add some space between icon and text
  },
});

export default Drawer_navigation;