import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
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
import Icon from "react-native-vector-icons/MaterialIcons";
import FlashMessage from "react-native-flash-message";

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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // her sekmeye ikon ekliyoruz:
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-filled'; // aktif/pasif ikon
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={28} color={color} />;
          },
          // tabBarActiveTintColor: '#192252', // aktif ikon rengi
          tabBarActiveTintColor: "rgba(41, 82, 203)", // aktif ikon rengi
          tabBarInactiveTintColor: 'gray', // pasif ikon rengi
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 70,
            //borderTopWidth: 0,
            elevation: 5,
          },
          headerShown: true,
        })}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            // headerShown : false,
            headerRight: () => (
              <Icon
              name="logout"
              size = {26}
              style={{marginRight : 7}}
              onPress = {() => getAuth().signOut()}
              />

            ),
            title: "",
            headerShown : false

          }}

        />


        <Tab.Screen
          name="CenterButton"
          component={View} // herhangi bir component, önemli değil
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                style={styles.centerButton}
                onPress={() => console.log('Orta butona tıklandı')}
              >
                <View style={styles.centerButtonInner}>
                  <Icon name="add" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen name='Profile' component={Profile} 
        options={{
            // headerShown : false,
            headerRight: () => (
              <Icon
              name="logout"
              size = {26}
              style={{marginRight : 7}}
              onPress = {() => getAuth().signOut()}
              />

            ),
            title: "",
            //headerShown : false

          }}
        />
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
            // headerShown: false,
            headerTitle: "",
            headerShadowVisible: false,
            headerBackTitle: "",
            // headerTintColor : "#192252",
            headerTintColor: "grey",
            headerBackImage: ({ tintColor }) => (
              <Icon
                name="arrow-back-ios-new"
                size={24}
                color={tintColor}
                style={{ marginLeft: 22 }} // buradan padding/margin ayarlıyorsun
              />
            ),

          }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{
            // headerShown: false,
            headerTitle: "",
            headerShadowVisible: false,
            headerBackTitle: "",
            // headerTintColor : "#192252",
            headerTintColor: "grey",
            headerBackImage: ({ tintColor }) => (
              <Icon
                name="arrow-back-ios-new"
                size={24}
                color={tintColor}
                style={{ marginLeft: 22 }} // buradan padding/margin ayarlıyorsun
              />
            ),

          }}
        />
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

        <Stack.Screen name='VanDetails' component={VanDetails} 
        options={{
          headerTitle : "Details",
          headerBackTitle : "",
            headerBackImage: ({ tintColor }) => (
              <Icon
                name="arrow-back-ios-new"
                size={24}
                color={tintColor}
                style={{ marginLeft: 22 }} // buradan padding/margin ayarlıyorsun
              />
            ),
        }}
        />
      </Stack.Navigator>
      <FlashMessage position={"top"} />

    </NavigationContainer>
  );
}


export default App;


const styles = StyleSheet.create({
    centerButton: {
    top: -25, // butonu yukarı taşır (yarısı dışarıda)
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonInner: {
    width: 55,
    height: 55,
    borderRadius: 21,
    // backgroundColor: '#192252',
        backgroundColor: 'rgba(74, 144, 226, 1)',

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
      borderRightWidth: 3,
        borderBottomWidth: 3,
    // shadowOpacity : 1
  },
})