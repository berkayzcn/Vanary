

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Onboarding from './Auth/Onboarding';
import LogIn from './Auth/LogIn';
import Signup from './Auth/SignUp';
import Home from './Home';
import Profile from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';
import Button from '../Components/Button';
import VanDetails from './VanDetails';


function App() {

  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()

  const [userSession, setUserSession] = useState()


  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setUserSession(!!user)
      console.log(user)
    })
  }, [])

  async function signOut() {
    await getAuth().signOut()
    await GoogleSignin.signOut()
  }


  function MainTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            // headerShown : false,
            headerRight: () => (
              <Button
                title={"Logout"}
                onPress={() => getAuth().signOut()}
              />
            ),
            title: ""

          }}
        />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
    )
  }

  const AuthStack = () => {
    return (
      <Stack.Navigator>

        <Stack.Screen
          name='Onboarding'
          component={Onboarding}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Login'
          component={LogIn}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{
            headerShown: false
          }}
        />
        {/* <Stack.Screen name="CreateAccount" component={CreateEmailAccount} /> */}
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !userSession ? (
            <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen
              name='MainTabs'
              component={MainTabs}
              options={{
                headerShown: false
              }}
            />
          )
        }

        <Stack.Screen name='VanDetails' component={VanDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
