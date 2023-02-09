import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "./Components/LogIn";
import Register from "./Components/Register";
import Chatting from "./Components/Chatting";
import Messagepage from "./Components/Messagepage";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogInScreen" component={LogIn} />
        <Stack.Screen name="RegistrationScreen" component={Register} />
        <Stack.Screen name="chattingScreen" component={Chatting} />
        <Stack.Screen name="MessageScreen" component={Messagepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
