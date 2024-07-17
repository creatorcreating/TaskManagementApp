export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  categories: string[];
  userId: string;
}
export interface Category {
  id?: string;
  name: string;
  userId: string;
}
