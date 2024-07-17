import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import MultiSelect from "react-native-multiple-select";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useAuth } from "../AuthContext";
import { createTask, updateTask } from "../services/TaskService";
import { getCategories } from "../services/CategoryService";
import { RootStackParamList } from "../navigation/types";
import { Task, Category } from "../types";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { scheduleNotificationTaskReminder } from "../services/NotificationService";
////////////////////////////////////////////

type CreateEditTaskScreenRouteProp = RouteProp<
  RootStackParamList,
  "CreateEditTask"
>;

const CreateEditTaskScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use typed navigation prop

  const { colors } = useTheme();
  const { user } = useAuth();
  const route = useRoute<CreateEditTaskScreenRouteProp>();
  const task = route.params?.task;

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    task?.categories || []
  );
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  useEffect(() => {
    if (user) {
      loadCategories();
    }
  }, [user]);

  const loadCategories = async () => {
    if (user) {
      const categories = await getCategories(user.uid);
      setAvailableCategories(categories);
    }
  };

  const isValidDate = (dateTimeString: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

    // const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
    if (!dateTimeString.match(regex)) return false;

    const date = new Date(dateTimeString);
    const timestamp = date.getTime();

    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) return false;

    return date.toISOString().startsWith(dateTimeString.slice(0, 16));

    // if (!dateString.match(regex)) return false;

    // const date = new Date(dateString);
    // const timestamp = date.getTime();

    // if (typeof timestamp !== "number" || Number.isNaN(timestamp)) return false;

    // return date.toISOString().startsWith(dateString);
  };

  const handleSave = async () => {
    // if (!isValidDate(dueDate)) {
    //   Alert.alert("Error", "Invalid date format. Please use YYYY-MM-DDTHH:MM.");
    //   return;
    // }

    if (user) {
      if (task) {
        await updateTask(task.id!, {
          title,
          description,
          dueDate,
          categories: selectedCategories,
        });
        // scheduleNotificationTaskReminder(new Date(dueDate), title, description);
      } else {
        await createTask({
          title,
          description,
          dueDate,
          categories: selectedCategories,
          userId: user.uid,
        });
      }
    } else {
      Alert.alert("Error", "User not authenticated");
    }
    console.log(" Calling scheduleNotification");
    scheduleNotificationTaskReminder(new Date(dueDate), title, description);

    navigation.navigate("TaskList");
  };

  return (
    <View style={{ padding: 20, backgroundColor: colors.card }}>
      <TextInput
        placeholder="Title"
        placeholderTextColor={colors.text}
        value={title}
        onChangeText={setTitle}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          color: colors.text,
        }}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor={colors.text}
        value={description}
        onChangeText={setDescription}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          color: colors.text,
        }}
      />
      {/* <RNDateTimePicker
        value={new Date()}
        mode={"datetime"}
        display="default"
        onChange={(event, data) => {
          if (data) {
            setDueDate(data);
          }
        }}
        style={{ backgroundColor: colors.card }}
      /> */}
      <TextInput
        placeholder="Due Date (YYYY-MM-DDTHH:MM)"
        placeholderTextColor={colors.text}
        value={
          dueDate
          // dueDate ? new Date(dueDate).toString() : new Date().toString()
        }
        onChangeText={setDueDate}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          color: colors.text,
        }}
      />
      <MultiSelect
        items={availableCategories.map((category) => ({
          id: category.id,
          name: category.name,
        }))}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedCategories}
        selectedItems={selectedCategories}
        selectText="Pick Categories"
        searchInputPlaceholderText="Search Categories..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor={colors.text} //"#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
      <Button title="Save Task" onPress={handleSave} />
    </View>
  );
};

export default CreateEditTaskScreen;
