import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";

export default function PanelPrincipalScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.panelContainer}>
        <ThemedText style={styles.title}>BabySecure</ThemedText>
        <MaterialCommunityIcons name="mother-nurse" size={170} color="black" />
      </ThemedView>

      {/* CONTENIDO */}
      <ThemedView style={styles.cont}>
        <ThemedView style={styles.notifiContainer}>
          <Ionicons name="notifications" size={40} color="black" />
          <ThemedText style={styles.text} type="defaultSemiBold">
            Notificaciones
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.credeContainer}>
          <Ionicons name="key" size={40} color="black" />
          <ThemedText style={styles.text} type="defaultSemiBold">
            Credenciales
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.accesContainer}>
          <Ionicons name="lock-closed" size={40} color="black" />
          <ThemedText style={styles.text} type="defaultSemiBold">
            Accesos
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#40c7ef",
    padding: 20,
    gap: 20,
  },
  cont: {
    flex: 1,
    backgroundColor: "#40c7ef",
    padding: 20,
    gap: 20,
  },
  panelContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingTop: 40,
    backgroundColor: "#40c7ef",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  notifiContainer: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#f84fd0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 6,
  },
  credeContainer: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#f84fd0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 6,
  },
  accesContainer: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#f84fd0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 6,
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});
