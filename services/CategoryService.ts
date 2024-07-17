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
import { Category } from "../types";

const categoriesCollection = collection(db, "categories");

export const createCategory = async (category: Category): Promise<void> => {
  await addDoc(categoriesCollection, category);
};

export const getCategories = async (userId: string): Promise<Category[]> => {
  const q = query(categoriesCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];
};

export const deleteCategory = async (id: string): Promise<void> => {
  const categoryDoc = doc(db, "categories", id);
  await deleteDoc(categoryDoc);
};

export const updateCategory = async (
  id: string,
  category: Partial<Category>
): Promise<void> => {
  const categoryDoc = doc(db, "categories", id);
  await updateDoc(categoryDoc, category);
};
