import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { useAuth } from "../AuthContext";
import { getTasks, deleteTask } from "../services/TaskService";
import { Category, Task } from "../types";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { getCategories } from "../services/CategoryService";
import { Picker } from "@react-native-picker/picker";
import { IconButton, List } from "react-native-paper";
////////////////////////////////////////////

const TaskListScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use typed navigation prop
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // To hold categories
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // For filtering

  const handleSignOut = async () => {
    signOut();
    //cleare the state of the flatlist
    setTasks([]);
    navigation.navigate("Login"); // Redirect to Login screen
  };
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadTasks();
        loadCategories();
      } else if (!user) {
        console.log(user);
        navigation.navigate("Login");
      }
    }, [user])
  );

  const loadTasks = async () => {
    if (user) {
      if (tasks.length < 1) {
        console.log(" calling gettask");
        const tasks_ = await getTasks(user.uid);
        setTasks(tasks_);
      }
      // console.log(tasks);
    }
  };

  const loadCategories = async () => {
    // Load categories from Firestore (implement this function in your CategoryService)
    console.log(" calling getCategories");
    const fetchedCategories = await getCategories(user.uid);
    setCategories(fetchedCategories);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.categories.includes(selectedCategory))
    : tasks;

  // useEffect(() => {
  //   if (user) {
  //     loadTasks();
  //     loadCategories();
  //   } else if (!user) {
  //     console.log(user);
  //     // navigation.navigate("Login");
  //   }
  // }, [user]);

  const getCategoryNames = (task: Task) => {
    return task.categories
      .map(
        (categoryId) =>
          categories.find((category) => category.id === categoryId)?.name
      )
      .filter((name) => name)
      .join(", ");
  };

  ////
  // render component
  let content = (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item.id || item.title}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateEditTask", { task: item }); // Navigate with the selected task
          }}
          style={{
            marginBottom: 20,
            padding: 10,
            backgroundColor: colors.card,
            borderRadius: 5,
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", color: colors.text }}>
              {item.title}
            </Text>
            <Text style={{ color: colors.text }}>{item.description}</Text>
            <Text style={{ color: colors.text }}>
              {item.dueDate.toString()}
            </Text>
            <Text style={{ color: colors.text }}>{getCategoryNames(item)}</Text>
            <Button title="Delete" onPress={() => handleDelete(item.id!)} />
          </View>
        </TouchableOpacity>
      )}
    />
  );
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginBottom: 20 }}>
          <IconButton icon="logout" size={30} onPress={handleSignOut} />
        </View>
        <View style={{ flex: 3, marginTop: 10 }}>
          <Button
            title="Add Task"
            onPress={() => {
              navigation.navigate("CreateEditTask", { task: undefined });
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 15, backgroundColor: colors.card }}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue === "All" ? null : itemValue);
          }}
          // selectedValue={selectedCategory}
          // onValueChange={(itemValue) => setSelectedCategory(itemValue)}

          style={{ marginBottom: 20 }}
        >
          <Picker.Item
            label="All Categories"
            value="All"
            style={{ color: colors.text }}
          />
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
              style={{ color: colors.text }}
            />
          ))}
        </Picker>
        <Button
          title="Manage Categories"
          onPress={() => {
            navigation.navigate("CategoryManagement"); // Navigate to CategoryManagementScreen
          }}
        />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id || item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateEditTask", { task: item }); // Navigate with the selected task
            }}
            style={{
              marginBottom: 20,
              padding: 10,
              backgroundColor: colors.card,
              borderRadius: 5,
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", color: colors.text }}>
                {item.title}
              </Text>
              <Text style={{ color: colors.text }}>{item.description}</Text>
              <Text style={{ color: colors.text }}>
                {item.dueDate.toString()}
              </Text>
              <Text style={{ color: colors.text }}>
                {getCategoryNames(item)}
              </Text>
              <Button title="Delete" onPress={() => handleDelete(item.id!)} />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* <Button
        title="Add Task"
        onPress={() => {
          navigation.navigate("CreateEditTask", { task: undefined }); // Navigate to CreateEditTaskScreen
        }}
      /> */}
      {/* <Button
        title="Manage Categories"
        onPress={() => {
          navigation.navigate("CategoryManagement"); // Navigate to CategoryManagementScreen
        }}
      /> */}
      {/* <Button title="Sign Out" onPress={handleSignOut} /> */}
    </View>
  );
};

export default TaskListScreen;
