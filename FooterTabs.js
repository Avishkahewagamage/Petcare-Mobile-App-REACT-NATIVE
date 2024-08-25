import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';

// Import or define your screen components
import ServiceScreen from './ServiceScreen';

// Define the BottomTabNavigator
const Tab = createBottomTabNavigator();

// Custom button for the Plus tab
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const FooterTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} type="ionicon" size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            elevation: 0,
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            height: 90,
            ...styles.shadow
          }
        })}
      >
        <Tab.Screen name="Home" component={ServiceScreen} />
        <Tab.Screen name="Search" component={ServiceScreen} />
        <Tab.Screen
          name="Plus"
          component={ServiceScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="add" type="ionicon" size={30} color="white" />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen name="Calendar" component={ServiceScreen} />
        <Tab.Screen name="Profile" component={ServiceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = {
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
};

export default FooterTabs;
