import { Task } from "../types";

export type RootStackParamList = {
  TaskList: undefined;
  CreateEditTask: { task?: Task };
  CategoryManagement: undefined;
  Login: undefined;
  Register: undefined;
};
