import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'; // This is where your stack navigator is defined
import SplashScreen from './Pages/SplashScreen'; // Your SplashScreen component

const App = () => {
  const [isSplashScreenVisible, setSplashScreenVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashScreenVisible(false); // Hide the splash screen after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {isSplashScreenVisible ? (
        <SplashScreen />
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
