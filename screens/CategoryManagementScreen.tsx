import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { useAuth } from "../AuthContext";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../services/CategoryService";
import { Category } from "../types";
import { useTheme } from "@react-navigation/native";
import { getTasksByCategoryId } from "../services/TaskService";

const CategoryManagementScreen: React.FC = () => {
  const { colors } = useTheme();

  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (user) {
      loadCategories();
    }
  }, [user]);

  const loadCategories = async () => {
    if (user) {
      const categories = await getCategories(user.uid);
      setCategories(categories);
    }
  };

  const handleAddCategory = async () => {
    if (user && newCategoryName.trim()) {
      await createCategory({ name: newCategoryName, userId: user.uid });
      setNewCategoryName("");
      loadCategories();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    await getTasksByCategoryId(id).then((v) => {
      if (!v) {
        console.log(v);
        deleteCategory(id).then(() => {
          loadCategories();
        });
      }
    });
  };

  return (
    <View style={{ padding: 20, backgroundColor: colors.card }}>
      <TextInput
        placeholder="New Category Name"
        placeholderTextColor={colors.text}
        value={newCategoryName}
        onChangeText={setNewCategoryName}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          color: colors.text,
        }}
      />
      <Button title="Add Category" onPress={handleAddCategory} />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ color: colors.text }}>{item.name}</Text>
            <Button
              title="Delete"
              onPress={() => handleDeleteCategory(item.id!)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CategoryManagementScreen;
