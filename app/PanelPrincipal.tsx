import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function PanelPrincipalScreen() {
  const router = useRouter();

  const handleCreden = () => {
    router.push("/Credenciales" as any);
  };

  const handleNotifi = () => {
    router.push("/Notificaciones" as any);
  };

  const handleAccesos = () => {
    router.push("/Accesos" as any);
  };

  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.panelContainer}>
        <ThemedText style={styles.title}>BabySecure</ThemedText>
        <MaterialCommunityIcons name="mother-nurse" size={170} color="black" />
      </ThemedView>

      {/* CONTENIDO */}
      <ThemedView style={styles.cont}>
        <TouchableOpacity style={styles.notifiButton} onPress={handleNotifi}>
          <Ionicons name="notifications" size={40} color="black" />
          <ThemedText style={styles.text} type="defaultSemiBold">
            Notificaciones
          </ThemedText>
          <AntDesign name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.credeButton} onPress={handleCreden}>
          <Ionicons name="lock-closed" size={40} color="black" />
          <ThemedText style={styles.text} type="defaultSemiBold">
            Credenciales
          </ThemedText>
          <AntDesign name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accesButton} onPress={handleAccesos}>
          <Ionicons name="lock-closed" size={40} color="black" />
          <ThemedText style={styles.text} type="defaultSemiBold">
            Accesos
          </ThemedText>
          <AntDesign name="arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#62d0f1",
    padding: 20,
    gap: 20,
  },
  cont: {
    flex: 1,
    backgroundColor: "#62d0f1",
    padding: 20,
    gap: 20,
  },
  panelContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingTop: 40,
    backgroundColor: "#62d0f1",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  notifiButton: {
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
  credeButton: {
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
  accesButton: {
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
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
});
