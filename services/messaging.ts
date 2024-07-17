// messaging.ts
import messaging from "@react-native-firebase/messaging";
import { auth, firebase } from "../firebase";
import * as Notifications from "expo-notifications";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log("Authorization status 1 :", authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log("Authorization status 2 :", authStatus);

  if (enabled) {
    console.log("Authorization status 3 :", authStatus);
  }
};

export const getFCMToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log("Your Firebase Cloud Messaging Token is:", fcmToken);
    // Save the token to Firestore or your backend
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      await firebase.firestore().collection("users").doc(userId).update({
        fcmToken: fcmToken,
      });
    }
    return fcmToken;
  } else {
    console.log("Failed to get FCM token");
  }
};

export const notificationListener = async () => {
  // messaging().onNotificationOpenedApp((remoteMessage) => {
  //   console.log(
  //     "Notification caused app to open from background state:",
  //     remoteMessage.notification
  //   );
  // });

  // messaging().onMessage(async (remoteMessage) => {
  //   console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
  // });

  // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   console.log("Message handled in the background!", remoteMessage);
  // });

  // messaging()
  //   .getInitialNotification()
  //   .then((remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log(
  //         "Notification caused app to open from quit state:",
  //         remoteMessage.notification
  //       );
  //     }
  //   });
  const subscription1 = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("NOTIFICATION RECEIVED");
      // console.log(notification);
      const userName = notification.request.content.data.userName;
      // console.log(userName);
    }
  );
  const subscription2 = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log("NOTIFICATION RESPONSE RECEIVED");
      // console.log(response);
      const userName = response.notification.request.content.data.userName;
      // console.log(userName);
    }
  );
  return () => {
    subscription1.remove();
    subscription2.remove();
  };
};
