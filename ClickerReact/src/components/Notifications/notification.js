import React from 'react';
import {Text} from 'react-native';
import notifee from '@notifee/react-native';

const Notification = () => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  console.log('channel created');
  // Display a notification
  await notifee.displayNotification({
    title: 'Nouveau prestige',
    body: 'Un nouveau prestige a été réalisé',
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
  console.log('notification affiché');
};

export default Notification;
