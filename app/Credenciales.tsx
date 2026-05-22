import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

export default function PanelPrincipalScreen() {
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";

  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.panelContainer}>
        <ThemedText style={styles.title}>Credenciales</ThemedText>
        <FontAwesome5 name="wallet" size={160} color="black" />
      </ThemedView>

      {/* CREDENCIALES */}
      <ThemedView style={styles.cont}>
        {/*Android uso de NFC y BLE*/}
          <>
            <TouchableOpacity style={styles.nfcButton}>
              <MaterialCommunityIcons name="nfc" size={40} color="black" />
              <ThemedText style={styles.text} type="defaultSemiBold">
                NFC
              </ThemedText>
            </TouchableOpacity>

          </>

        <TouchableOpacity style={styles.bleButton}>
          <FontAwesome name="bluetooth" size={40} color="black" />
          <ThemedText style={styles.text} type="defaultSemiBold">
            BLE
          </ThemedText>
        </TouchableOpacity>

      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffc1f7",
    padding: 20,
    gap: 20,
  },
  cont: {
    flex: 1,
    backgroundColor: "#ffc1f7",
    padding: 20,
    gap: 20,
  },
  panelContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    paddingTop: 40,
    backgroundColor: "#ffc1f7",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  nfcButton: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#86b4ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 6,
  },
  bleButton: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#86b4ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 6,
  },
  rfidButton: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#86b4ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 6,
  },
  qrButton: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#86b4ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 5,

    elevation: 6,
  },
  pinButton: {
    width: "105%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",

    shadowColor: "#86b4ff",
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
