// NotificationService.ts
import * as Notifications from "expo-notifications";

const scheduleNotificationTaskReminder = async (
  date: Date,
  title?: string,
  body?: string
) => {
  console.log(" Calling scheduleNotificationAsync");
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: date,
    // new Date("2024-07-17T07:23"), //date, // Use a Date object for the trigger
    // {
    //   seconds: 5,
    // },
  });
};

// const scheduleTaskReminder = async (task: {
//   title: string;
//   dueDate: string;
// }) => {
//   const trigger = new Date(task.dueDate).getTime() - Date.now();
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Task Reminder",
//       body: `It's time to complete your task: ${task.title}`,
//     },
//     trigger: { seconds: trigger / 1000 },
//   });
// };

export { scheduleNotificationTaskReminder };
