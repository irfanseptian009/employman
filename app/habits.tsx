import { StyleSheet, Text, View, ScrollView, Pressable, Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons, Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { ModalContent } from "react-native-modals";
import { useFocusEffect } from "@react-navigation/native";

// Define types for habit and selectedHabit
interface Habit {
  _id: string;
  title: string;
  color: string;
  repeatMode: string;
  completed?: { [key: string]: boolean }; // completed is an object where keys are days of the week
}

const Habits = () => {
  const [option, setOption] = useState<string>("Today");
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>(undefined);
  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .slice(0, 3);

  useEffect(() => {
    fetchHabits();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8000/habitslist");
      setHabits(response.data);
    } catch (error) {
      console.log("Error fetching habits", error);
    }
  };

  const handleLongPress = (habitId: string) => {
    const selectedHabit = habits.find((habit) => habit._id === habitId);
    setSelectedHabit(selectedHabit);
    setModalVisible(true);
  };

  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };

      await axios.put(`http://10.0.2.2:8000/habits/${habitId}/completed`, {
        completed: updatedCompletion,
      });

      await fetchHabits();
      setModalVisible(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const filteredHabits = habits.filter((habit) => {
    return !habit.completed || !habit.completed[currentDay];
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit?._id;
      const response = await axios.delete(`http://10.0.2.2:8000/habits/${habitId}`);

      if (response.status === 200) {
        await fetchHabits();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getCompletedDays = (completedObj?: { [key: string]: boolean }): string[] => {
    if (completedObj && typeof completedObj === "object") {
      return Object.keys(completedObj).filter((day) => completedObj[day]);
    }
    return [];
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="logo-foursquare" size={27} color="black" />
          <AntDesign
            onPress={() => router.push("/create")}
            name="plus"
            size={24}
            color="black"
          />
        </View>

        <Text style={{ marginTop: 5, fontSize: 23, fontWeight: "500" }}>Habits</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 8,
          }}
        >
          <Pressable
            onPress={() => setOption("Today")}
            style={{
              backgroundColor: option === "Today" ? "#E0FFFF" : "transparent",
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
              Today
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Weekly")}
            style={{
              backgroundColor: option === "Weekly" ? "#E0FFFF" : "transparent",
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
              Weekly
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Overall")}
            style={{
              backgroundColor: option === "Overall" ? "#E0FFFF" : "transparent",
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 14 }}>
              Overall
            </Text>
          </Pressable>
        </View>

        {option === "Today" &&
          (filteredHabits.length > 0 ? (
            <View>
              {filteredHabits.map((item) => (
                <Pressable
                  key={item._id}
                  onLongPress={() => handleLongPress(item._id)}
                  style={{
                    marginVertical: 10,
                    backgroundColor: item.color,
                    padding: 12,
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View
              style={{
                marginTop: 150,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "auto",
              }}
            >
              <Image
                style={{ width: 60, height: 60, resizeMode: "cover" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
                }}
              />

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 10,
                }}
              >
                No habits for today
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  marginTop: 10,
                }}
              >
                Create one?
              </Text>

              <Pressable
                onPress={() => router.push("/create")}
                style={{
                  backgroundColor: "#0071c5",
                  marginTop: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text style={{ color: "white" }}>Create</Text>
              </Pressable>
            </View>
          ))}

        {option === "Weekly" && (
          <View>
            {habits.map((habit) => (
              <Pressable
                key={habit._id}
                style={{
                  marginVertical: 10,
                  backgroundColor: habit.color,
                  padding: 15,
                  borderRadius: 24,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
                    {habit.title}
                  </Text>
                  <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginVertical: 10,
                  }}
                >
                  {days.map((day) => {
                    const isCompleted = habit.completed && habit.completed[day];

                    return (
                      <Pressable key={day}>
                        <Text
                          style={{
                            color: day === currentDay ? "red" : "white",
                          }}
                        >
                          {day}
                        </Text>
                        {isCompleted ? (
                          <FontAwesome
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        ) : (
                          <Feather
                            name="circle"
                            size={24}
                            color="white"
                            style={{ marginTop: 12 }}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {option === "Overall" && (
          <View>
            {habits.map((habit) => (
              <Pressable
                key={habit._id}
                style={{
                  marginVertical: 10,
                  backgroundColor: habit.color,
                  padding: 15,
                  borderRadius: 24,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
                    {habit.title}
                  </Text>
                </View>
                <Text style={{ color: "white" }}>Repeat Mode: {habit.repeatMode}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <ModalContent
        visible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{ borderRadius: 8 }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{selectedHabit?.title}</Text>
          <Pressable onPress={handleCompletion} style={{ marginTop: 20 }}>
            <Text style={{ color: "blue" }}>Mark as Completed</Text>
          </Pressable>
          <Pressable onPress={deleteHabit} style={{ marginTop: 10 }}>
            <Text style={{ color: "red" }}>Delete Habit</Text>
          </Pressable>
          <Pressable onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
            <Text style={{ color: "gray" }}>Cancel</Text>
          </Pressable>
        </View>
      </ModalContent>
    </>
  );
};

const styles = StyleSheet.create({
  // Add any additional styles you may need here
});

export default Habits;
