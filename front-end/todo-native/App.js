import React, {useEffect} from "react";
import { Text, TouchableOpacity } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TaskFormScreen from "./screens/TaskFormScreen";

const Stack = createNativeStackNavigator()
const App = () => {



  useEffect(() => {
    (async function getPermissions () {
    
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    })()
  
  },[])


  return (
<NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={({navigation}) => ({
    title:'Tasks App',    
    headerStyle: {backgroundColor:'#222f3e'},
    headerTitleStyle: {color: '#ffff'},
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("TaskFormScreen")}>
        <Text style={{color:'#fff', marginRight: 20, fontSize:15}}>New</Text>
      </TouchableOpacity>
      
    )
    })}
    
    />
      <Stack.Screen name="TaskFormScreen" component={TaskFormScreen}
      options={{
        title:'Create a task',
        headerStyle: {
          backgroundColor: '#222f3e'
        },
        headerTitleStyle: { color: '#ffff'},
        headerTintColor: '#ffff'
      }}
      />
    </Stack.Navigator>
</NavigationContainer>
  )
}

export default App