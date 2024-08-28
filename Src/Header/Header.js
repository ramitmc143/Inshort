import React, {useCallback, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Switch,
} from 'react-native';
import Iconss from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  DARK_BG_COLOR,
  LIGHT_BG_COLOR,
  DARK_TEXT_COLOR,
  LIGHT_TEXT_COLOR,
} from '../redux/utils/Colors';

import {changeLanguage} from '../redux/languageSlice/LanguageSlice';
import Drawer_navigation from '../drawer_navigation/Drawer_navigation';

const Header = ({onSelectedLanguage, selectedLanguage}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [isOn, setIsOn] = useState(false);

  const drawerAnimation = useRef(new Animated.Value(300)).current; // Adjust 300 based on drawer width

  const dispatch = useDispatch();
  const THEME = useSelector(state => state.theme);

  const text_color = {color: THEME.data == 'light' ? 'black' : DARK_TEXT_COLOR};

  const handleLanguageChange = useCallback(
    language => {
      onSelectedLanguage(language);
      dispatch(changeLanguage(language));
      setDropdownVisible(false); // Hide dropdown after selecting language
      setSelectedValue('');
    },
    [onSelectedLanguage, dispatch],
  );

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
    Animated.timing(drawerAnimation, {
      toValue: drawerVisible ? 300 : 0, // Animate drawer in and out
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleClick = value => {
    setSelectedValue(value);
    setDrawerVisible(false); // Hide drawer after selecting value
    toggleDrawer(); // Close the drawer with animation
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: THEME.data == 'light' ? '#ffffff' : DARK_BG_COLOR},
      ]}>
      <View style={styles.item}>
        <TouchableOpacity style={styles.discover}>
          <Text
            style={[
              styles.text,
              {
                width: 80,
                marginBottom: 5,
                letterSpacing: 1,
                alignItems: 'center',
                left: '60',
                textAlign: 'center',
              },
              selectedLanguage === 'letest_news' && styles.selectedText,
              text_color,
            ]}>
            {selectedValue
              ? capitalizeFirstLetter(selectedValue)
              : capitalizeFirstLetter(selectedLanguage)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.item, styles.centerItem, {left: '145%', top: '1%'}]}>
        <View style={{flexDirection: 'row'}}>
          {/* <Text
            style={[
              styles.text,
              {
                color:
                  THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR,
              },
             {
              // marginLeft:'-2%'
              paddingLeft:'2%'
             }
            ]}>
            Language
          </Text> */}
          <Switch
            value={selectedLanguage === 'english'} // Check if the current language is English
            onValueChange={() =>
              handleLanguageChange(
                selectedLanguage === 'english' ? 'telugu' : 'english',
              )
            } // Toggle language between English and Telugu
            thumbColor={selectedLanguage === 'english' ? 'green' : '#0A90F6'} // Thumb color based on language
            trackColor={{false: '#0A90F6', true: 'green'}} // Track color based on language
            style={styles.switch} // Adjust the size of the switch if needed
          />
        </View>

        {/* {dropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleLanguageChange('telugu')}>
              <Text style={text_color}>Telugu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleLanguageChange('english')}>
              <Text style={text_color}>English</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>

      <View>
        <TouchableOpacity style={styles.settingIcon} onPress={toggleDrawer}>
          <Iconss name="menu" size={30} color="#0A90F6" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.drawerContainer,
          {
            transform: [{translateX: drawerAnimation}],
          },
        ]}>
        <Drawer_navigation onHandleClick={handleClick} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderColor: 'lightgray',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    elevation: 5,
    height: 80,
  },
  item: {
    flex: 1,
  },
  centerItem: {
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedText: {
    borderBottomWidth: 2,
    borderBottomColor: '#0A90F6',
  },
  discover: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '54%',
    height: 25,
    // borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    justifyContent: 'center',
    left: '210%',
  },
  MyFeed: {
    width: 85,
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    left: 12,
    backgroundColor: '#ffffff',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1000,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  settingIcon: {
    // padding: 10,
  },
  drawerContainer: {
    position: 'absolute',
    top: '-15%',
    right: 0,
    width: '75%', // Adjust the width as per your requirement
    height: '0%', // Full height of the screen
    backgroundColor: '#ffffff', // or DARK_BG_COLOR depending on theme
    zIndex: 1001,
    elevation: 10,
  },
  switch: {
    transform: [{scaleX: 1.3}, {scaleY: 1.3}], // Adjust the size of the switch if needed
    left: '90%',
    bottom: '2%',
  },
});

export default Header;
