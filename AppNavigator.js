import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './Pages/HomeScreen';
import ServiceScreen from './Pages/ServiceScreen';
import SignUpScreen from './Pages/SignUpScreen';

import ReminderScreen from './Pages/ReminderScreen';
import ProfileScreen from './Pages/ProfileScreen';
import LoginScreen from './Pages/LoginScreen';
import TrainerScreen from './Pages/TrainerScreen'; // Assuming you have this
import SlidePageScreen from './Pages/SlidePageScreen'; // Assuming you have this
import Flash1 from './Pages/Flash1';
import Flash2 from './Pages/Flash2';
import Account from './Pages/Account';
import Shop from './Pages/Shop';
import AboutUsScreen from './Pages/AboutUsScreen';
import HelpSupportScreen from './Pages/HelpSupportScreen';
import RateUsScreen from './Pages/RateUsScreen';
import SettingScreen from './Pages/SettingScreen';
import NotificationScreen from './Pages/NotificationScreen';
import ChangePasswordScreen from './Pages/ChangePasswordScreen';
import PrivacyPolicyScreen from './Pages/PrivacyPolicyScreen';
import TermsOfServiceScreen from './Pages/TermsOfServiceScreen';
import SupportScreen from './Pages/SupportScreen';
import ChatBotScreen from './Pages/ChatBotScreen';
import AdoptionMapScreen from './Pages/AdoptionMapScreen';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import PetOwnerSignup from './Pages/PetOwnerSignup';
import InformationScreen from './Pages/InformationScreen';
import Vet from './Pages/Vet';
import VeterinarianDetailScreen from './Pages/VeterinarianDetailScreen';
import TrainerDetailScreen from './Pages/TrainerDetailsScreen';
import GroomerScreen from './Pages/GroomerScreen';
import GroomerDetailScreen from './Pages/GroomerDetailScreen';
import PetDetailScreen from './Pages/PetDetailScreen';
import EditPetScreen from './Pages/EditPetScreen';
import GroomerSchedule from './Pages/GroomerSchedule';
import TrainerScheduleScreen from './Pages/TrainerScheduleScreen';
import DoctorSchedule from './Pages/DoctorSchedule';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator({ route }) {
  //function BottomTabNavigator({ route }) {
  //const { token } = route.params || {};

  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: { backgroundColor: 'white' } }}>
      <Tab.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPet"
        component={SignUpScreen}
        
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="plus" size={size} color="white" />
            </View>
          ),
        }}
        //initialParams={{ token }}  Pass the token to SignUpScreen
      />
      <Tab.Screen
        name="Remainder"
        component={ReminderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#FF8225',
    borderRadius: 50,
    padding: 10,
  },
});

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Flash1" component={Flash1} />
      <Stack.Screen name="Flash2" component={Flash2} /> 
      <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SlidePageScreen" component={SlidePageScreen} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen}/>
      <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen}/>
      <Stack.Screen name="RateUsScreen" component={RateUsScreen}/>
      <Stack.Screen name="SettingScreen" component={SettingScreen}/>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen}/>
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen}/>
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen}/>
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen}/>
      <Stack.Screen name="SupportScreen" component={SupportScreen}/>
      <Stack.Screen name="ChatBotScreen" component={ChatBotScreen}/>
      <Stack.Screen name="AdoptionMapScreen" component={AdoptionMapScreen}/>
      <Stack.Screen name="cart" component={Cart}/>
      <Stack.Screen name="Product" component={Product}/>
      <Stack.Screen name="PetOwnerSignup"component={PetOwnerSignup}/>
      <Stack.Screen name="InformationScreen"component={InformationScreen}/>
      <Stack.Screen name="Vet"component={Vet}/>
      <Stack.Screen name="VeterinarianDetailScreen"component={VeterinarianDetailScreen}/>
      <Stack.Screen name="TrainerScreen" component={TrainerScreen}/>
      <Stack.Screen name="TrainerDetailScreen" component={TrainerDetailScreen}/>
      <Stack.Screen name="GroomerScreen" component={GroomerScreen}/>
      <Stack.Screen name="GroomerDetailScreen" component={GroomerDetailScreen}/>
      <Stack.Screen name="PetDetailScreen" component={PetDetailScreen}/>
      <Stack.Screen name="EditPetScreen" component={EditPetScreen} />
      <Stack.Screen name="GroomerSchedule" component={GroomerSchedule} />
      <Stack.Screen name="TrainerScheduleScreen" component={TrainerScheduleScreen} />
      <Stack.Screen name="DoctorSchedule" component={DoctorSchedule}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;
