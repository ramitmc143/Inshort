import React, {useCallback, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback, // Import this to detect touches outside the drawer
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
import {Switch} from 'react-native-switch';

const Header = ({
  onSelectedLanguage,
  selectedLanguage,
  onHandleDrawer_navigation,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

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
    if (drawerVisible) {
      // Closing drawer
      Animated.timing(drawerAnimation, {
        toValue: 300, // Animate drawer out
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    } else {
      // Opening drawer
      setDrawerVisible(true);
      Animated.timing(drawerAnimation, {
        toValue: 0, // Animate drawer in
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
    onHandleDrawer_navigation();
  };

  const handleClick = value => {
    setSelectedValue(value);
    setDrawerVisible(false); // Hide drawer after selecting value
    toggleDrawer(); // Close the drawer with animation
  };

  const handleOutsidePress = () => {
    if (drawerVisible) {
      toggleDrawer(); // Close the drawer if it's open and the user taps outside
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
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
                  left: '200%',
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

        <View
          style={[styles.item, styles.centerItem, {left: '145%', top: '1%'}]}>

          <Switch
            value={selectedLanguage === 'telugu'}
            onValueChange={() =>
              handleLanguageChange(
                selectedLanguage === 'english' ? 'telugu' : 'english',
              )
            }
            disabled={false}
            activeText={'TL'}
            inActiveText={'ENG'}
            backgroundActive={'#125B9A'}
            backgroundInactive={'gray'}
            circleActiveColor={'#1E2A5E'}
            circleInActiveColor={'#000000'}
            innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
            outerCircleStyle={{}}
            switchLeftPx={10}
            switchRightPx={10}
            switchWidthMultiplier={2}
            switchBorderRadius={50}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.settingIcon} onPress={toggleDrawer}>
            <Iconss
              name="menu"
              size={30}
              // color="#0A90F6"
            />
          </TouchableOpacity>
        </View>

        {drawerVisible && (
          <Animated.View
            style={[
              styles.drawerContainer,
              {
                transform: [{translateX: drawerAnimation}],
              },
            ]}>
            <Drawer_navigation
              onHandleClick={handleClick}
              onCloseDrawer={handleDrawerClose}
            />
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    height: 54,
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
    fontSize: 14,
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
    borderColor: 'lightgrey',
    borderRadius: 5,
    justifyContent: 'center',
    left: '210%',
  },
  customSwitch: {
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  switchText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  settingIcon: {
    zIndex: 10,
    position: 'absolute',
    right: 20,
    top: '-145%',
  },
  drawerContainer: {
    position: 'absolute',
    top: '-255%',
    right: 0,
    width: '75%',
    height: '0%',
    backgroundColor: '#ffffff',
    zIndex: 1001,
    elevation: 10,
  },
});

export default Header;
