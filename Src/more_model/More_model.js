import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import Iconss from 'react-native-vector-icons/Entypo';
import Preferences from '../preferences/Preferences';
import { useSelector } from 'react-redux';
import { DARK_BG_COLOR, LIGHT_BG_COLOR ,LIGHT_TEXT_COLOR,DARK_TEXT_COLOR} from '../redux/utils/Colors';


const More_model = ({ onHandleCancelModel, visible }) => {
  const [preferencesVisible, setPreferencesVisible] = useState(false);

  const THEME = useSelector(state => state.theme);
  const LANGUAGE = useSelector(state => state.language);


  const handleCancelModel = () => {
    onHandleCancelModel();
  };

  const handlePreferencesPress = () => {
    // setPreferencesVisible(true);
  };

  const handleClosePreferences = () => {
    setPreferencesVisible(false);
  };

  const optionButton_backgroundColor = {backgroundColor:THEME.data == 'light' ? '#0A90F6':'white'}

  const Icons_color = THEME.data == 'light' ? '#0A90F6' : 'white'
  const text_color = THEME.data == 'light' ? 'white' : 'black'
 

  return (
    <>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={handleCancelModel}
      >
        <TouchableWithoutFeedback onPress={handleCancelModel}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={[styles.content, {backgroundColor:THEME.data == 'light' ? LIGHT_BG_COLOR : DARK_BG_COLOR},{borderTopColor:THEME.data == 'light' ? DARK_TEXT_COLOR  : LIGHT_TEXT_COLOR}]}>
                <Text style={[styles.title , {color:THEME.data == 'light' ? 'white':DARK_TEXT_COLOR}]}>More Options</Text>
                <View style={styles.optionRow}>
                  <TouchableOpacity style={[styles.optionButton ,optionButton_backgroundColor  ]} onPress={handlePreferencesPress}>
                    <Image source={require('../Assets/upsc_logo.jpg')} style={{width:'30%',height:'50%',margin:'3%'}} />
                    <Text style={[styles.optionText,{color:text_color}]}>UPSC</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.optionButton ,optionButton_backgroundColor ]} onPress={() => {}}>
                  <Image source={require('../Assets/appsc_logo.png')} style={{width:'30%',height:'50%',margin:'3%'}} />
                    <Text style={[styles.optionText , {color:text_color} ]}>APPSC</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.optionButton ,optionButton_backgroundColor ]} onPress={() => {}}>
                  <Image source={require('../Assets/tspsc-logo.png')} style={{width:'30%',height:'50%',margin:'3%'}} />
                    <Text style={[styles.optionText , {color:text_color}]}>TSPSC</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.optionRow}>
                  <TouchableOpacity style={[styles.optionButton ,optionButton_backgroundColor ]} onPress={() => {}}>
                  <Image source={require('../Assets/ssc-logo.jpg')} style={{width:'30%',height:'50%',margin:'3%'}} />
                    <Text style={[styles.optionText , {color:text_color}]}>SSC</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.optionButton ,optionButton_backgroundColor ]} onPress={() => {}}>
                  <Image source={require('../Assets/jee-logo.jpg')} style={{width:'30%',height:'50%',margin:'3%'}} />
                    <Text style={[styles.optionText , {color:text_color}]}>JEE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.optionButton ,optionButton_backgroundColor ]} onPress={() => {}}>
                  <Image source={require('../Assets/rrb-logo.png')} style={{width:'30%',height:'55%',margin:'3%'}} />
                    <Text style={[styles.optionText , {color:text_color}]}>RRB</Text>
                  </TouchableOpacity>
                </View>
              <TouchableOpacity style={styles.closeButton} onPress={handleCancelModel}>
                  <Iconss name="cross" size={30} color={'white'} />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {preferencesVisible && (
        <Preferences
          preferencesVisible={preferencesVisible}
          handleClosePreferences={handleClosePreferences}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '100%',
    height: '40%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    marginTop: 20,
  },
  optionButton: {
    width: '30%',
    height: 70,
    paddingVertical: 10,
    // backgroundColor: '#0A90F6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    // color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontWeight:'bold'
  },
  closeButton: {
    marginTop: 20,
    position: 'absolute',
    top: '-2%',
    left: '5%',
  },
});

export default More_model;
