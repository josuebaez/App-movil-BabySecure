//CAMBIOS NUEVOS
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, View, Linking, Modal } from "react-native";
import axios from "axios";

//Configuración de API
const S_IP = "API";

const getApiUrl = () => {
  if (__DEV__){
    return `http://${S_IP}:5000/api`;
  }
  return "https://babysecure.com/api"
};

const API_URL = getApiUrl();

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: true,
});

export default function CredencialesScreen(){
  const [loading, setLoading] = useState(true);
  const [solicitando, setSolicitando] = useState(false);
  const [solicitada, setSolicitada] = useState(false);
  const [solicitadaEl, setSolicitadaEl] = useState<string | null>(null);
  const [mostrarPreview, setMostrarPreview] = useState(true);
  const [error, setError] = useState("");

  const cargarEstado = useCallback(async () => {
    try{
      setError("");
      const response = await api.get("/credenciales/movil/estado");
      if(response.data?.success){
        setSolicitada(response.data.solicitada);
        setSolicitadaEl(response.data.solicitada_el);
      }
    }catch(err: any){
      if(err.response?.status !== 403){
        setError(err.response?.data?.message || "No se pudo consultar la credencial");
      }
    }
  }, []);


  useEffect(() => {
    const cargarInicial = async () => {
      setLoading(true);
      await cargarEstado();
      setLoading(false);
    };
    cargarInicial();
  }, [cargarEstado]);

  const handleSolicitar = async () => {
    setSolicitando(true);

    try{
      const response = await api.post("/credenciales/movil/solicitar");
      if(response.data?.success){
        Alert.alert("Solicitud enviada", response.data.menssage);
        await cargarEstado();
      }else{
        Alert.alert("Error", response.data?.message || "No se pudo solicitar la credencial");
      }
    }catch(err: any){
      Alert.alert("Error", err.response?.data?.message || "No se pudo solicitar la credencial. Intente más tarde");
    }finally{
      setSolicitando(false);
    }
  };


  return (
    <ThemedView style={styles.screen}>
      <Modal visible={mostrarPreview} transparent animationType="fade">
        <View style={styles.modalFono}>
          <View style={styles.modalCard}>
            <ThemedText type="defaultSemiBold" style={styles.modalTitulo}>
              📲 Así funciona tu credencial móvil
            </ThemedText>
 
            <View style={styles.guiaPaso}>
              <ThemedText style={styles.guiaNumero}>1</ThemedText>
              <ThemedText style={styles.guiaTexto}>
                Solicitas tu credencial desde aquí.
              </ThemedText>
            </View>
            <View style={styles.guiaPaso}>
              <ThemedText style={styles.guiaNumero}>2</ThemedText>
              <ThemedText style={styles.guiaTexto}>
                Te llega un correo de Airfob Portal.
              </ThemedText>
            </View>
            <View style={styles.guiaPaso}>
              <ThemedText style={styles.guiaNumero}>3</ThemedText>
              <ThemedText style={styles.guiaTexto}>
                Das clic en "Descargar" e instalas la app Airfob Pass.
              </ThemedText>
            </View>
            <View style={styles.guiaPaso}>
              <ThemedText style={styles.guiaNumero}>4</ThemedText>
              <ThemedText style={styles.guiaTexto}>
                Ya puedes usar tu teléfono como credencial móvil para acceder a Neonatología.
              </ThemedText>
            </View>
            <View style={styles.guiaPaso}>
              <ThemedText style={styles.guiaNumero}>5</ThemedText>
              <ThemedText style={styles.guiaTexto}>
                Desde BabySecure (pestañas Notificaciones y Accesos) puedes
                ver accesos relacionados a la madre, o si ocurrio algun incidente (algún acceso fue denegado).
              </ThemedText>
            </View>
 
            <TouchableOpacity
              style={styles.modalBoton}
              onPress={() => setMostrarPreview(false)}
            >
              <ThemedText style={styles.modalBotonTexto}>
                Entendido, continuar
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
 
      <ThemedView style={styles.panelContainer}>
        <ThemedText style={styles.title}>Credenciales</ThemedText>
        <FontAwesome5 name="wallet" size={110} color="black" />
      </ThemedView>
 
      <ThemedView style={styles.cont}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : (
          <View style={styles.card}>
            <ThemedText type="defaultSemiBold" style={styles.cardTitulo}>
              Credencial de acceso móvil
            </ThemedText>
            <ThemedText style={styles.cardDescripcion}>
              Convierte tu celular en tu llave de acceso a Neonatología. Al
              solicitarla, te llegará un correo para activarla en la app de
              Suprema.
            </ThemedText>
 
            {solicitada ? (
              <>
                <View style={styles.estadoOk}>
                  <Ionicons name="checkmark-circle" size={22} color="#1baa20" />
                  <ThemedText style={styles.estadoOkTexto}>
                    Ya solicitada
                    {solicitadaEl
                      ? ` el ${new Date(solicitadaEl).toLocaleDateString()}`
                      : ""}
                  </ThemedText>
                </View>
 
                <TouchableOpacity
                  style={styles.botonSecundario}
                  onPress={handleSolicitar}
                  disabled={solicitando}
                >
                  {solicitando ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <ThemedText style={styles.botonSecundarioTexto}>
                      🔄 Reenviar solicitud
                    </ThemedText>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.botonPrincipal}
                onPress={handleSolicitar}
                disabled={solicitando}
              >
                {solicitando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.botonPrincipalTexto}>
                    📲 Solicitar credencial móvil
                  </ThemedText>
                )}
              </TouchableOpacity>
            )}
 
            <View style={styles.badges}>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="nfc" size={22} color="#555" />
                <ThemedText style={styles.badgeTexto}>NFC</ThemedText>
              </View>
              <View style={styles.badge}>
                <FontAwesome name="bluetooth" size={20} color="#555" />
                <ThemedText style={styles.badgeTexto}>BLE</ThemedText>
              </View>
            </View>
          </View>
        )}
 
        {!loading && !error && (
          <TouchableOpacity
            style={styles.verGuiaLink}
            onPress={() => setMostrarPreview(true)}
          >
            <Ionicons name="information-circle-outline" size={18} color="#7c3aed" />
            <ThemedText style={styles.verGuiaTexto}>
              Ver cómo funciona de nuevo
            </ThemedText>
          </TouchableOpacity>
        )}
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
    height: 160,
    paddingTop: 20,
    backgroundColor: "#ffc1f7",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    gap: 14,
    shadowColor: "#86b4ff",
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,   
  },
  cardTitulo: {
    fontSize: 18,
    color: "#000",
  },
  cardDescripcion: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  botonPrincipal: {
    backgroundColor: "#7c3aed",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  botonPrincipalTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: "#7c3aed",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  botonSecundarioTexto: {
    color: "#7c3aed",
    fontSize: 15,
    fontWeight: "600",
  },
  estadoOk: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#eafaf0",
    padding: 12, 
    borderRadius: 10,
  },
  estadoOkTexto: {
    color: "#1baa20",
    fontSize: 14,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badgeTexto: {
    fontSize: 13,
    color: "#555",
  },
  modalFono: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    gap: 14,
  },
  modalTitulo: {
    fontSize: 17,
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },
  modalBoton: {
    backgroundColor: "#7c3aed",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  modalBotonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  verGuiaLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  verGuiaTexto: {
    color: "#7c3ead",
    fontSize: 13,
  },
  guiaPaso: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  guiaNumero: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#7c3aed",
    color: "#fff",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 22,
    overflow: "hidden",
  },
  guiaTexto: {
    flex: 1,
    fontSize: 13,
    color: "#444",
    lineHeight: 18,
  },
  errorText: {
    textAlign: "center",
    color: "#e53935",
    marginTop: 20,
  },
});
