import React, {useState} from "react";
import { View, TextInput, Pressable,Text } from "react-native";

//import {GiftedChat}   from "react-native-gifted-chat";


export default function Chatting({navigation}) {

  const [name, setname] = useState();
  const [userName, setUserName] = useState();


  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            height: 40,
            width: 300,
            padding: 10,
            borderRadius: 10,
          }}
          placeholder="Search"
        ></TextInput>
      </View>
      <Card name= {name} userName={userName} onPress={()=>navigation.navigate('MessageScreen')} />
      <Card name={'Md.Sazzad Hossain'} userName={'asdfghjhggf'} onPress={()=>navigation.navigate('MessageScreen')}/>
    </View>
  );
}

function Card({onPress,name,userName}) {
  return (
    <Pressable
      style={{
        backgroundColor: "red",
        borderRadius: 13,
        margin:3,
        paddingVertical:12,
        paddingHorizontal:20
      }}
      onPress={onPress}
    >
      <Text>{name}</Text>
      <Text>{userName}</Text>
      
    </Pressable>
  );
}
