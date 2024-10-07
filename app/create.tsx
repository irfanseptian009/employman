import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

// Define the structure of the habit data
interface HabitDetails {
  title: string;
  color: string;
  repeatMode: string;
  reminder: boolean;
}

const CreateHabit: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // Define the color array with explicit typing
  const colors: string[] = [
    "#FF5733", // Red
    "#FFD700", // Gold
    "#5D76A9",
    "#1877F2", // Medium Purple
    "#32CD32", // Lime Green
    "#CCCCFF", // Tomato
    "#4169E1", // Royal Blue
  ];

  // Define the days array with explicit typing
  const days: string[] = ["M", "T", "W", "T", "F", "S", "S"];

  // Function to add a new habit
  async function addHabit() {
    try {
      const habitDetails: HabitDetails = {
        title: title,
        color: selectedColor,
        repeatMode: "daily",
        reminder: true,
      };

      const response = await axios.post("http://10.0.2.2:8000/habits", habitDetails);

      if (response.status === 200) {
        setTitle("");
        Alert.alert("Habit added successfully", "Enjoy Practising");
      }

      console.log("Habit added", response);
    } catch (error) {
      console.log("Error adding a habit", error);
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <Ionicons name="arrow-back" size={24} color="black" />

      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          width: "95%",
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          backgroundColor: "#E1EBEE",
        }}
        placeholder="Title"
      />

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          {colors.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>On these days</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        {days.map((item, index) => (
          <Pressable
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index} // Added key for list rendering
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "#2774AE" }}>Yes</Text>
      </View>

      <Pressable
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "#00428c",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
          SAVE
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateHabit;

const styles = StyleSheet.create({});
