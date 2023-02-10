import React, { Component, useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { encryption } from "../crypto";



export default function Register({ navigation }) {
  const [name, setname] = useState();
  const [userName, setUserName] = useState();
  const [password, setpassword] = useState();
  const [allData, setalldata] = useState();
  const [loding, setloding] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setalldata(cities);
    });
    return unsubscribe;
  }, []);

  if (loding == true)
 {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>loding..</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          height: 100,
          width: 250,
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
          }}
        >
          <Image
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
            }}
            source={require("../Image/1.jpg")}
          />
        </View>
      </View>
      <TextInput
        value={name}
        onChangeText={setname}
        placeholder="Name"
        style={{
          borderWidth: 1,
          height: 40,
          padding: 10,
          width: 250,
          margin: 5,
        }}
      />
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="User Name"
        style={{
          borderWidth: 1,
          height: 40,
          padding: 10,
          width: 250,
          margin: 5,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setpassword}
        placeholder="Pasword"
        style={{
          borderWidth: 1,
          height: 40,
          padding: 10,
          width: 250,
          margin: 5,
        }}
      />
      <MyButton
        title={"Registration"}
        onPress={() => {
          if (!name) {
            Alert.alert("please entry name");
            return;
          }
          if (!userName) {
            Alert.alert("please entry Username");
            return;
          }
          if (!password) {
            Alert.alert("please entry password");
            return;
          }
          if (!allData) {
            Alert.alert("Server error");
            return;
          }
          let arr = allData.filter((d, i, arr) => d.userName == userName);
          if (arr.length > 0) {
            Alert.alert("Username already used.");
            return;
          }

            setloding(true);
            saveData(name, userName, password).then((res) => {
            setloding(false);
            setUserName(null);
            setname(null);
            setpassword(null);
            navigation.navigate("chattingScreen",{user:res});
          });
        }}
      />
    </View>
  );
}

const MyButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const saveData = async (name, userName, password) => {
  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      userName: userName,
      password: encryption(password),
    });
    return docRef
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    return null
    console.error("Error adding document: ", e);
  }
};
