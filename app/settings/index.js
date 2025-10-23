import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES, FONT } from "../../constants";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

const SettingsMenu = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScreenHeaderBtn />
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/settings/Favourites")}> 
          <Text style={styles.menuText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/settings/NotificationsScreen")}> 
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/settings/ThemeChange")}> 
          <Text style={styles.menuText}>Theme Change</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: SIZES.large },
  header: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SIZES.large,
    textAlign: "center",
  },
  menuItem: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    marginBottom: SIZES.medium,
    alignItems: "center",
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
});

export default SettingsMenu;
