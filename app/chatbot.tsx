import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

// Gunakan API Key dari environment variable
const API_KEY = process.env.REACT_APP_API_KEY || "YOUR_FALLBACK_API_KEY";

interface Message {
  role: "user" | "model";
  text: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const hotelContext = ``;

  async function sendMessage() {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [...prevMessages, { role: "user", text: input }]);
    setInput("");

    if (!API_KEY) {
      console.error("API Key is not defined. Please check your environment variables.");
      return;
    }

    const chatHistory = messages.map((message) => ({
      role: message.role,
      content: message.text,
    }));

    const adjustedHistory =
      chatHistory.length > 0 ? chatHistory : [{ role: "user", content: hotelContext }];

    try {
      const response = await fetch(
        "https://api.generativeai.googleapis.com/v1/chat:generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`, // Pastikan API_KEY sudah benar
          },
          body: JSON.stringify({
            model: "gemini-1.5-flash",
            history: adjustedHistory,
            prompt: input,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      const cleanedResponse = result.responses?.[0]?.content || "No response from AI";

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", text: cleanedResponse },
      ]);
    } catch (error) {
      console.error(
        "Network request failed:",
        error instanceof Error ? error.message : String(error)
      );
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Chat-Bot</Text>
        <Text style={styles.subHeaderText}>
          You can interact with Employee AI-bot, it will help you with anything you need
        </Text>
      </View>

      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.role === "user" ? styles.userMessage : styles.modelMessage,
            ]}
          >
            <Text style={message.role === "user" ? styles.userText : styles.modelText}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFA500",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  subHeaderText: {
    fontSize: 12,
    color: "#000",
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FFA500",
  },
  modelMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E0E0",
  },
  userText: {
    color: "#FFF",
  },
  modelText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFF",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Chatbot;
