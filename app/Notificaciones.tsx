import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

export default function PanelPrincipalScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.panelContainer}>
        <ThemedText style={styles.title}>Notificaciones</ThemedText>
        <Ionicons name="notifications" size={130} color="black" />
      </ThemedView>

      {/* Para poder mostrar las notificaciones */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9b6b6",
    padding: 20,
    gap: 20,
  },
  panelContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingTop: 40,
    backgroundColor: "#f9b6b6",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
});
