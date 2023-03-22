import notifee from '@notifee/react-native';

const Notification = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  await notifee.displayNotification({
    title: 'Nouveau prestige',
    body: 'Un nouveau prestige a été réalisé',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};

export default Notification;
