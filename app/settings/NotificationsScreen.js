import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { COLORS, SIZES, FONT } from "../../constants";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

const HABITS = [
  { name: "Meditation", color: "#FF7754" },
  { name: "Breathing", color: "#312651" },
  { name: "Mindfulness", color: "#444262" },
];

const TIMES = ["Morning", "Afternoon", "Evening"];

const NotificationsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem("notificationsEnabled");
      const habits = await AsyncStorage.getItem("notificationHabits");
      const times = await AsyncStorage.getItem("notificationTimes");
      setNotificationsEnabled(enabled === "true");
      setSelectedHabits(habits ? JSON.parse(habits) : []);
      setSelectedTimes(times ? JSON.parse(times) : []);
    } catch (error) {
      Alert.alert("Error loading settings");
    }
    setLoading(false);
  };

  const saveSettings = async (enabled, habits, times) => {
    await AsyncStorage.setItem("notificationsEnabled", enabled ? "true" : "false");
    await AsyncStorage.setItem("notificationHabits", JSON.stringify(habits));
    await AsyncStorage.setItem("notificationTimes", JSON.stringify(times));
  };

  const handleToggleNotifications = (value) => {
    setNotificationsEnabled(value);
    saveSettings(value, selectedHabits, selectedTimes);
  };

  const handleHabitToggle = (habit) => {
    const updated = selectedHabits.includes(habit)
      ? selectedHabits.filter((h) => h !== habit)
      : [...selectedHabits, habit];
    setSelectedHabits(updated);
    saveSettings(notificationsEnabled, updated, selectedTimes);
  };

  const handleTimeToggle = (time) => {
    const updated = selectedTimes.includes(time)
      ? selectedTimes.filter((t) => t !== time)
      : [...selectedTimes, time];
    setSelectedTimes(updated);
    saveSettings(notificationsEnabled, selectedHabits, updated);
  };

  const sendTestNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Enable notifications in settings.");
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Meditation Reminder",
        body: "It's time for your meditation!",
      },
      trigger: null,
    });
    Alert.alert("Test notification sent!");
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScreenHeaderBtn />
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: COLORS.gray2, true: COLORS.primary }}
            thumbColor={notificationsEnabled ? COLORS.primary : COLORS.gray}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Habits</Text>
          <View style={styles.chipContainer}>
            {HABITS.map((habit) => (
              <TouchableOpacity
                key={habit.name}
                style={[
                  styles.chip,
                  {
                    borderColor: habit.color,
                    backgroundColor: selectedHabits.includes(habit.name)
                      ? habit.color
                      : COLORS.white,
                  },
                ]}
                onPress={() => handleHabitToggle(habit.name)}
              >
                <Text
                  style={{
                    color: selectedHabits.includes(habit.name)
                      ? COLORS.white
                      : habit.color,
                  }}
                >
                  {habit.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Times</Text>
          <View style={styles.chipContainer}>
            {TIMES.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.chip,
                  {
                    borderColor: COLORS.primary,
                    backgroundColor: selectedTimes.includes(time)
                      ? COLORS.primary
                      : COLORS.white,
                  },
                ]}
                onPress={() => handleTimeToggle(time)}
              >
                <Text
                  style={{
                    color: selectedTimes.includes(time)
                      ? COLORS.white
                      : COLORS.primary,
                  }}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.testBtn} onPress={sendTestNotification}>
          <Text style={styles.testBtnText}>Send Test Notification</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
  },
  header: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SIZES.medium,
    textAlign: "center",
  },
  section: {
    marginBottom: SIZES.large,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    marginBottom: SIZES.small,
    color: COLORS.secondary,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  testBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: SIZES.large,
  },
  testBtnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
});

export default NotificationsScreen;
