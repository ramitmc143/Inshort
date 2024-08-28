import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PanResponder,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Iconss from 'react-native-vector-icons/MaterialIcons';
import PushNotification from '../push_notification/push_notification';
import More_model from '../more_model/More_model';
import { useSelector } from 'react-redux';
import { DARK_BG_COLOR, LIGHT_BG_COLOR, LIGHT_TEXT_COLOR, DARK_TEXT_COLOR } from '../redux/utils/Colors';

const ListOfData = ({ navigation }) => {
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);

  const THEME = useSelector(state => state.theme);
  const swipeAnimation = useRef(new Animated.Value(0)).current;
  const nextSwipeAnimation = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const prevSwipeAnimation = useRef(new Animated.Value(-Dimensions.get('window').height)).current;
  const timeoutRef = useRef(null);

  const languages = useMemo(() => [
    {
      label: 'Telugu',
      code: 'telugu',
      url: 'https://jsonplaceholder.typicode.com/posts',
    },
    {
      label: 'Letest_news',
      code: 'letest_news',
      url: 'https://jsonplaceholder.typicode.com/posts',
    },
    {
      label: 'English',
      code: 'english',
      url: 'https://jsonplaceholder.typicode.com/posts',
    },
  ], []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(languages.find(lang => lang.code === selectedLanguage).url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsondata = await response.json();
      setItems(jsondata || []);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, [languages, selectedLanguage]);

  useEffect(() => {
    PushNotification();
    fetchData();
  }, [fetchData]);

  const handleLanguageChange = useCallback(languageCode => {
    setSelectedLanguage(languageCode);
  }, []);

  const handleModalVisible = useCallback(modalVisible => {
    setIsMoreModalVisible(modalVisible);
  }, []);

  const onSwipeUp = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);

      const nextIndex = currentIndex + 1;
      const resetIndex = nextIndex >= items.length ? 0 : nextIndex;

      Animated.parallel([
        Animated.timing(swipeAnimation, {
          toValue: -Dimensions.get('window').height,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(nextSwipeAnimation, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex(resetIndex);
        swipeAnimation.setValue(0);
        nextSwipeAnimation.setValue(Dimensions.get('window').height);
        setIsAnimating(false);
      });
    }
  }, [currentIndex, isAnimating, items.length, swipeAnimation, nextSwipeAnimation]);

  const onSwipeDown = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);

      const prevIndex = currentIndex - 1;
      const resetIndex = prevIndex < 0 ? items.length - 1 : prevIndex;

      Animated.parallel([
        Animated.timing(swipeAnimation, {
          toValue: Dimensions.get('window').height,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(prevSwipeAnimation, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentIndex(resetIndex);
        swipeAnimation.setValue(0);
        prevSwipeAnimation.setValue(-Dimensions.get('window').height);
        setIsAnimating(false);
      });
    }
  }, [currentIndex, isAnimating, items.length, swipeAnimation, prevSwipeAnimation]);

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const { dy } = gestureState;
      if (dy < -50 && !isAnimating) {
        onSwipeUp();
      } else if (dy > 50 && !isAnimating) {
        onSwipeDown();
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const { dx, dy } = gestureState;
      if (dx === 0 && dy === 0) {
        handleContentPress();
      }
    },
  }), [isAnimating, onSwipeDown, onSwipeUp]);

  const animatedStyle = useMemo(() => ({
    transform: [{ translateY: swipeAnimation }],
  }), [swipeAnimation]);

  const handleContentPress = useCallback(() => {
    setShowHeaderFooter(prev => !prev);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleReadMorePress = useCallback(() => {
    navigation.navigate('NewsDetails', {
      uri: items[currentIndex]?.dynamic_url,
    });
  }, [currentIndex, items, navigation]);

  const stripHtmlTags = useCallback(str => {
    if (typeof str !== 'string') {
      return '';
    }
    return str.replace(/<[^>]*>?/gm, '');
  }, []);

  const handleCancelModel = useCallback(() => {
    setIsMoreModalVisible(false);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.overlay}>
        <Header onSelectedLanguage={handleLanguageChange} selectedLanguage={selectedLanguage} />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handleContentPress}>
          <View style={styles.container}>
            {isLoading && (
              <ActivityIndicator
                style={styles.loadingIndicator}
                size="large"
                color="red"
              />
            )}
            {items.length > 0 && (
              <View style={styles.content}>
                <View style={styles.cardWrapper}>
                  <Animated.View
                    style={[
                      styles.cardContainer,
                      animatedStyle,
                      {
                        zIndex: 1,
                        position: 'absolute',
                        backgroundColor: THEME.data === 'light' ? LIGHT_BG_COLOR : DARK_BG_COLOR,
                      }
                    ]}
                    {...panResponder.panHandlers}>
                    <TouchableWithoutFeedback onPress={handleContentPress}>
                      <View style={[styles.card, { backgroundColor: THEME.data === 'light' ? LIGHT_BG_COLOR : DARK_BG_COLOR }]}>
                        <Image
                          source={{ uri: 'https://pratibha.eenadu.net/images/thumbicon1.png' }}
                          style={styles.image}
                        />
                        <View style={{ top: '-12%' }}>
                          <Text style={[styles.title, { color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }]}>
                            {stripHtmlTags(items[currentIndex]?.title)}
                          </Text>
                          <Text style={[styles.description, { color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }]}>
                            {stripHtmlTags(items[currentIndex]?.body)}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', bottom: '10%', left: '6%' }}>
                          <Iconss name="access-time" size={25} color={THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR} />
                          <Text style={{ marginTop: '0.9%', marginLeft: '2%', color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }}>
                            26/08/2024
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Animated.View>

                  <Animated.View
                    style={[
                      styles.cardContainer,
                      {
                        transform: [{ translateY: nextSwipeAnimation }],
                        zIndex: 0,
                        backgroundColor: THEME.data === 'light' ? LIGHT_BG_COLOR : DARK_BG_COLOR,
                      }
                    ]}>
                    <TouchableWithoutFeedback onPress={handleContentPress}>
                      <View style={[styles.card, { backgroundColor: THEME.data === 'light' ? LIGHT_BG_COLOR : DARK_BG_COLOR }]}>
                        <Image
                          source={{ uri: 'https://pratibha.eenadu.net/images/thumbicon1.png' }}
                          style={styles.image}
                        />
                        <View style={{ top: '-12%' }}>
                          <Text style={[styles.title, { color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }]}>
                            {stripHtmlTags(items[(currentIndex + 1) % items.length]?.title)}
                          </Text>
                          <Text style={[styles.description, { color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }]}>
                            {stripHtmlTags(items[(currentIndex + 1) % items.length]?.body)}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', bottom: '10%', left: '6%' }}>
                          <Iconss name="access-time" size={25} color={THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR} />
                          <Text style={{ marginTop: '0.9%', marginLeft: '2%', color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }}>
                            26/08/2024
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Animated.View>

                  <Animated.View
                    style={[
                      styles.cardContainer,
                      {
                        transform: [{ translateY: prevSwipeAnimation }],
                        zIndex: 0,
                        backgroundColor: THEME.data === 'light' ? LIGHT_BG_COLOR : DARK_BG_COLOR,
                      }
                    ]}>
                    <TouchableWithoutFeedback onPress={handleContentPress}>
                      <View style={[styles.card, { backgroundColor: THEME.data === 'light' ? LIGHT_BG_COLOR : DARK_BG_COLOR }]}>
                        <Image
                          source={{ uri: 'https://pratibha.eenadu.net/images/thumbicon1.png' }}
                          style={styles.image}
                        />
                        <View style={{ top: '-12%' }}>
                          <Text style={[styles.title, { color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }]}>
                            {stripHtmlTags(items[(currentIndex - 1 + items.length) % items.length]?.title)}
                          </Text>
                          <Text style={[styles.description, { color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }]}>
                            {stripHtmlTags(items[(currentIndex - 1 + items.length) % items.length]?.body)}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', bottom: '10%', left: '6%' }}>
                          <Iconss name="access-time" size={25} color={THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR} />
                          <Text style={{ marginTop: '0.9%', marginLeft: '2%', color: THEME.data === 'light' ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR }}>
                            26/08/2024
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Animated.View>
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Footer visible={showHeaderFooter} onShowHeaderFooter={handleContentPress} />
      <More_model
        visible={isMoreModalVisible}
        onCancel={handleCancelModel}
        items={languages}
        onSelectedItem={handleLanguageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    zIndex: 1,
  },
  loadingIndicator: {
    marginTop: '50%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ListOfData;
