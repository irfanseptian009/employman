import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

import image from "../../assets/images/WhatsApp_Image_2024-07-05_at_01.33.12_ce1719c5-removebg-preview.png";

import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Define a type for route navigation function
type RouteNavigation = (route: string) => void;

const Index: React.FC = () => {
  const router = useRouter();

  // Function to navigate to different routes
  const navigateTo: RouteNavigation = (route: string) => {
    router.push(route as never);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Employee App</Text>
        </View>
        <View style={styles.container1}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradient1}
          >
            <Text style={styles.headerText1}>BOARD</Text>
            <View style={styles.userInfo1}>
              <Image source={image} style={styles.avatar1} />
              <View>
                <Text style={styles.nameText1}>Irfan Septian</Text>
                <Text style={styles.addressText1}>A-404 | Front-end Developer</Text>
              </View>
              <View style={styles.icons1}>
                <MaterialIcons name="sms" size={24} color="white" />
                <FontAwesome name="bell" size={24} color="white" />
              </View>
            </View>
            <View style={styles.tabs1}>
              <TouchableOpacity style={styles.tabButton1}>
                <Text style={styles.tabText1}>Community</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabButton1}>
                <Text style={styles.tabText1}>Personal</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.grid}>
          <Pressable onPress={() => navigateTo("../employees")} style={styles.card}>
            <Ionicons name="person-circle-outline" size={40} color="#4F8EF7" />
            <Text style={styles.cardText}>Personal</Text>
            <Text style={styles.cardSubText}>17 Tasks</Text>
          </Pressable>

          <Pressable onPress={() => navigateTo("../markattendant")} style={styles.card}>
            <MaterialCommunityIcons name="briefcase-outline" size={40} color="#E74C3C" />
            <Text style={styles.cardText}>Mark Attendance</Text>
            <Text style={styles.cardSubText}>6 days</Text>
          </Pressable>

          <Pressable onPress={() => navigateTo("../private")} style={styles.card}>
            <MaterialCommunityIcons name="video" size={40} color="#2ECC71" />
            <Text style={styles.cardText}>Meeting</Text>
            <Text style={styles.cardSubText}>2 Tasks</Text>
          </Pressable>

          <Pressable onPress={() => navigateTo("../summary")} style={styles.card}>
            <Entypo name="calendar" size={40} color="#3498DB" />
            <Text style={styles.cardText}>Summary</Text>
            <Text style={styles.cardSubText}>5 Tasks</Text>
          </Pressable>

          <Pressable onPress={() => navigateTo("../chatbot")} style={styles.card}>
            <MaterialCommunityIcons name="robot" size={40} color="#F39C12" />
            <Text style={styles.cardText}>ChatBot</Text>
            <Text style={styles.cardSubText}>AI for your Chat Task</Text>
          </Pressable>

          <Pressable onPress={() => navigateTo("../habits")} style={styles.card}>
            <Ionicons name="add-circle-outline" size={40} color="#9B59B6" />
            <Text style={styles.cardText}>Create Habit</Text>
            <Text style={styles.cardSubText}>New</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#F5F5",
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#FFF",
    color: "#2C3E50",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  card: {
    width: "40%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardSubText: {
    fontSize: 14,
    color: "gray",
  },
  container1: {
    borderRadius: 20,
    overflow: "hidden",
    width: "97%",
    alignSelf: "center",
    marginTop: 30,
  },
  gradient1: {
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  headerText1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
    marginBottom: 30,
  },
  userInfo1: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar1: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  nameText1: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  addressText1: {
    color: "white",
    fontSize: 14,
  },
  icons1: {
    flexDirection: "row",
    marginLeft: "13%",
    width: 70,
    justifyContent: "space-between",
  },
  tabs1: {
    flexDirection: "row",
    margin: 10,
  },
  tabButton1: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    margin: 20,
  },
  tabText1: {
    color: "white",
    fontSize: 14,
  },
});
