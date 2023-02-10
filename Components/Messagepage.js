import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { app } from "../firebaseConfig";

export default function Messagepage({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const user = route.params.user;
  const senderInfo = route.params.senderInfo;
  const db = getFirestore(app);
  //console.log(senderInfo)

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      //console.log(arr[0].createdAt.toDate())
      let newArr = [];
      cities.forEach((doc) => {
        newArr.push({
          _id: doc._id,
          text: doc.text,
          createdAt: doc.createdAt.toDate(),
          senderUserName: doc.userName,
          user: {
            _id: doc.user._id,
            name: doc.name,
          },
        });
      });
      setMessages(newArr);
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages) => {
    //console.log(messages)
    saveData({
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt: new Date(),
      senderUserName: senderInfo.userName,
      user: {
        name: user.name,
        _id: user.userName,
      },
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, {
        _id: messages[0]._id,
        text: messages[0].text,
        createdAt: new Date(),
        senderUserName: senderInfo.userName,
        user: {
          _id: user.userName,
          name: user.name,
        },
      })
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.userName,
      }}
    />
  );
}

//let newUserId = user.userName+"ab"+userName;

const saveData = async (data) => {
  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, "messages"), data);
    console.log("Document written with ID: ", docRef);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
