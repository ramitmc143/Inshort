import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Drawer_navigation = ({ onHandleClick }) => {
  // Define the data for the buttons
  const data = [
    { id: 1, label: 'Home' },
    { id: 2, label: 'Profile' },
    { id: 3, label: 'Settings' },
    { id: 4, label: 'Notifications' },
    { id: 5, label: 'Messages' },
    { id: 6, label: 'Favorites' },
    { id: 7, label: 'Friends' },
    { id: 8, label: 'Search' },
    { id: 9, label: 'Help' },
    { id: 10, label: 'Logout' },
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
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#3795BD',
    // width: 190,
    width: '66%',
    height: 540,
    // height: '80%',
    top: 85,
    // top: '50%',
    // right: -90,
    right: '-35%',

  },
  button: {
    // backgroundColor: '#f0f0f0',
    padding: '5%',
    borderRadius: 5,
    marginBottom: '5%',
    borderColor: 'lightgray',
    // borderWidth: 1,
    width: '75%',
    left: '9%',
  },
  buttonText: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
  },
});

export default Drawer_navigation;
