import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { encryption } from "../crypto";
import { app } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getFirestore
} from "firebase/firestore";

export default function LogIn({ navigation }) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [allData, setalldata] = useState();
  const [loding,setloding] = useState(false);
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
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
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
        onChangeText={setPassword}
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
        title={"LogIn"}
        onPress={() => {
          //console.log(userName)
          //console.log(password)
          if (!userName) {
            Alert.alert("please entry Username");
            return;
          }
          if (!password) {
            Alert.alert("please entry password");
            return;
          }

          if (!allData) {
            Alert.alert("Not find information");
            return;
          }
          let arr = allData.filter(
            (d) => d.userName == userName && d.password == encryption(password)
          ); //filtering user Name and password from firebase stor;
          if (arr.length > 0) {
            navigation.replace("chattingScreen",{user:arr[0]});
          } else {
            Alert.alert("Wrong Cadienshile");
          }

          /*
          let arr = allData.filter((d) => d.userName == userName);//filtering user Name from firebase stor;
          let pass = allData.filter((d) =>d.password == password);//filtering Password from firebase stor;

              if (arr == userName &&  pass == password )
              {
                navigation.navigate("MessageScreen");
              }



          if (arr.length > 0) {
            Alert.alert("Username already used.");
            return;
          }
          */
          //console.log(encryption(password));
          //navigation.navigate('chattingScreen')
          setloding(true)
        }}
      />
      <MyButton
        title={"Registration"}
        onPress={() => {
          navigation.navigate("RegistrationScreen");
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
