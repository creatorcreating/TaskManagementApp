import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { Task } from "../types";

const tasksCollection = collection(db, "tasks");

export const createTask = async (task: Task): Promise<void> => {
  await addDoc(tasksCollection, task);

  // Schedule notification
  const dueDate = new Date(task.dueDate); // Ensure dueDate is a Date object

  // await scheduleNotificationTaskReminder(dueDate, task.title, task.description);
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  console.log("getting task");
  const q = query(tasksCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  console.log("task is hear");

  // return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // })) as Task[];
  const tasks: Task[] = [];
  querySnapshot.forEach((doc) => {
    const taskData = doc.data();
    const task: Task = {
      id: doc.id,
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      categories: taskData.categories,
      userId: taskData.userId,
    };
    tasks.push(task);
  });
  // console.log(tasks);
  return tasks;
};

export const deleteTask = async (id: string): Promise<void> => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<void> => {
  const taskDoc = doc(db, "tasks", id);
  await updateDoc(taskDoc, task);

  // if (task.dueDate) {
  //   // Schedule notification
  //   // let task: Task;
  //   const dueDate = new Date(task.dueDate); // Ensure dueDate is a Date object

  //   await scheduleNotificationTaskReminder(
  //     dueDate,
  //     task.title && " id is :",
  //     task.description && id
  //   );
  // }
};

export const getTasksByCategoryId = async (
  categoryId: string
): Promise<any> => {
  const q = query(tasksCollection, where("categoryId", "==", categoryId));
  // const querySnapshot =
  await getDocs(q).then((querySnapshot) => {
    let data = querySnapshot.docs.map((doc) => doc.data());
    if (data.length > 0) {
      return true;
    }
    return false;
  });
};
