import React from 'react';
import { StyleSheet,  Animated } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Animation hook for scaling the tab icon
function useAnimatedTabIcon(focused) {
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.3 : 1, // Scale up when focused
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, [focused]);

  return { scale };
}

// Animation hook for color transition
function useAnimatedTabColor(focused) {
  const animatedValue = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0, // 1 when focused, 0 when not
      duration: 300, // Smooth transition duration
      useNativeDriver: false,
    }).start();
  }, [focused]);

  // Interpolate color from black to #8c1aff
  const color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#8c1aff'], // Black to custom color
  });

  return color;
}

export default function AdminLayout() {
  return (
    <>
      {/* Adding Gradient Background */}
      <LinearGradient
        colors={['#8c1aff', '#b49fff']}
        style={styles.gradientBg}
      />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false, // Hide the header label
          tabBarShowLabel: false, // Hide tab bar labels
          tabBarStyle: [styles.tabBar], // Custom tab bar style
          tabBarIcon: ({ focused }) => {
            let iconName;
            let IconComponent = Ionicons;

            if (route.name === 'AdminHome') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'AdminProfile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            const animatedProps = useAnimatedTabIcon(focused);
            const animatedColor = useAnimatedTabColor(focused);

            return (
              <Animated.View style={{ transform: [{ scale: animatedProps.scale }] }}>
                <Animated.Text style={{ color: animatedColor }}>
                  <IconComponent name={iconName} size={25} />
                </Animated.Text>
              </Animated.View>
            );
          },
        })}
      >
        <Tabs.Screen name="AdminHome" />
        <Tabs.Screen name="AdminProfile" />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 55,
    backgroundColor: '#ffffff', 
    borderTopWidth: 0,
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    borderRadius: 50,
    margin: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft:50,
    marginRight:50
  },
  gradientBg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
});
