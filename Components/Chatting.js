import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebaseConfig";

//import {GiftedChat}   from "react-native-gifted-chat";

export default function Chatting({ navigation,route }) {
  const [name, setname] = useState();
  const [userName, setUserName] = useState();
  const [allData, setalldata] = useState();
  const [searchData,setSearchData]=useState()
  const db = getFirestore(app);
  const user=route.params.user;
  //console.log(user)

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      let arr=cities.filter(d=>d.userName!=user.userName)
      setalldata(arr);
      setSearchData(arr)
    });
    return unsubscribe;
  }, []);
  const search=(value)=>{
    if(!value){
      setSearchData(allData)
    }
    let arr=allData.filter(d=>d.name.toUpperCase().match(value.toUpperCase()))
    setSearchData(arr)
  }

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
        <Text style={{
          marginVertical:10
        }}>Login as {user?.name}</Text>
        <TextInput onChangeText={search}
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
      {searchData && searchData.map((doc,i)=>(
        <Card key={i}
        name={doc.name}
        userName={doc.userName}
        onPress={() => navigation.navigate("MessageScreen",{user:user,senderInfo:doc})}
      />
      //Using data(name,userName) // sending data from firebase 
      ))}
    </View>
  );
}

function Card({ onPress, name, userName }) {
  return (
    <Pressable
      style={{
        backgroundColor: "red",
        borderRadius: 13,
        margin: 3,
        paddingVertical: 12,
        paddingHorizontal: 20,
      }}
      onPress={onPress}
    >
      <Text>{name}</Text>
      <Text>{userName}</Text>
    </Pressable>
  );
}
