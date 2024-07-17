// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as moment from "moment";
// import * as cron from "node-cron";

// admin.initializeApp();

// const scheduleNotification = async (task, taskId) => {
//   const userId = task.userId;
//   const dueDate = moment(task.dueDate.toDate());
//   const fcmTokenPromise = admin
//     .firestore()
//     .collection("users")
//     .doc(userId)
//     .get()
//     .then(
//       (userDoc: { data: () => { (): any; new (): any; fcmToken: any } }) => {
//         const fcmToken = userDoc.data()?.fcmToken;
//         if (fcmToken) {
//           const message = {
//             token: fcmToken,
//             notification: {
//               title: task.title,
//               body: `Reminder: ${task.description}`,
//             },
//           };
//           return { message, fcmToken };
//         }
//         return null;
//       }
//     );

//   const fcmData = await fcmTokenPromise;

//   if (fcmData) {
//     const job = cron.schedule(dueDate.format("m H D M *"), async () => {
//       await admin.messaging().send(fcmData.message);
//       job.stop(); // Stop the cron job after it has run
//     });

//     // Optionally store job information in Firestore to manage it later
//     await admin
//       .firestore()
//       .collection("scheduled_notifications")
//       .doc(taskId)
//       .set({
//         userId,
//         taskId,
//         cronExpression: dueDate.format("m H D M *"),
//         fcmToken: fcmData.fcmToken,
//       });
//   }
// };

// export const onCreateTask = functions.firestore
//   .document("tasks/{taskId}")
//   .onCreate(
//     async (snap: { data: () => any }, context: { params: { taskId: any } }) => {
//       const task = snap.data();
//       const taskId = context.params.taskId;
//       await scheduleNotification(task, taskId);
//     }
//   );

// export const onUpdateTask = functions.firestore
//   .document("tasks/{taskId}")
//   .onUpdate(
//     async (
//       change: { after: { data: () => any } },
//       context: { params: { taskId: any } }
//     ) => {
//       const task = change.after.data();
//       const taskId = context.params.taskId;
//       await scheduleNotification(task, taskId);
//     }
//   );

// export const onDeleteTask = functions.firestore
//   .document("tasks/{taskId}")
//   .onDelete(async (_snap: any, context: { params: { taskId: any } }) => {
//     const taskId = context.params.taskId;
//     const jobDoc = await admin
//       .firestore()
//       .collection("scheduled_notifications")
//       .doc(taskId)
//       .get();
//     if (jobDoc.exists) {
//       const jobData = jobDoc.data();
//       const job = cron.getTasks()[jobData.cronExpression];
//       if (job) {
//         job.stop(); // Stop the cron job if it exists
//       }
//       await admin
//         .firestore()
//         .collection("scheduled_notifications")
//         .doc(taskId)
//         .delete();
//     }
//   });
