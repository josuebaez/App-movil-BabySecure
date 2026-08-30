import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import axios from "axios";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// ================= API =================
const API_URL = "http://API:5000/api"; 

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  withCredentials: true,
});

export default function RegistroScreen() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [uidMadre, setUidMadre] = useState("");
  const [confirmacionUid, setConfirmacionUid] = useState("");
  const [parentezco, setParentezco] = useState("");
  const [showParentezcoPicker, setShowParentezcoPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const PARENTEZCO_OPTS = [
    "Padre",
    "Abuela",
    "Abuelo",
    "Hermana",
    "Hermano",
  ];

  const handleRegister = async () => {
    if (!nombre || !apellidos || !correo || !uidMadre || !confirmacionUid || !parentezco) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Alert.alert("Error", "Ingresa un correo electrónico válido");
      return;
    }

    if (!uidMadre.startsWith("MAMÁ-")) {
      Alert.alert("Error", "El UID debe comenzar con 'MAMÁ-'");
      return;
    }

    if (uidMadre !== confirmacionUid) {
      Alert.alert("Error", "El UID y la confirmación no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/familiares/registro", {
        nombre,
        apellido: apellidos,
        parentezco,
        email: correo,
        uid_madre: uidMadre,
        confirmacion_uid: confirmacionUid,
      });

      if (response.data.success) {
        Alert.alert(
          "✅ Registro exitoso",
          `¡Bienvenido/a ${nombre}! Tu cuenta ha sido creada exitosamente.\n\nAhora puedes iniciar sesión usando tu correo electrónico y el UID de la madre como contraseña.`,
          [
            {
              text: "Iniciar Sesión",
              onPress: () => router.push("/LogIn" as any),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error("Error en registro:", error);

      let mensaje = "Error al registrar usuario";

      if (error.response?.data?.message) {
        mensaje = error.response.data.message;
      } else if (error.message === "Network Error") {
        mensaje = "No se pudo conectar al servidor. Verifica tu conexión.";
      }

      Alert.alert("Error", mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require("@/assets/images/bebes1.jpg")}
        style={styles.image}
      />

      <View style={styles.registerContainer}>
        <ThemedText type="title" style={styles.title}>
          Registro Familiar
        </ThemedText>

        {/* Nombre */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Nombre *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#000"
            value={nombre}
            onChangeText={setNombre}
            editable={!loading}
          />
        </View>

        {/* Apellidos */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Apellidos *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            placeholderTextColor="#000"
            value={apellidos}
            onChangeText={setApellidos}
            editable={!loading}
          />
        </View>

        {/* Parentezco */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Parentezco *
          </ThemedText>

          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowParentezcoPicker(!showParentezcoPicker)}
          >
            <View style={styles.contenido}>
              <ThemedText
                style={
                  parentezco
                    ? styles.pickerText
                    : styles.pickerPlaceholder
                }
              >
                {parentezco || "Selecciona tu parentezco"}
              </ThemedText>

              <MaterialIcons
                name={
                  showParentezcoPicker
                    ? "expand-less"
                    : "expand-more"
                }
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          {showParentezcoPicker && (
            <ThemedView style={styles.pickerOptions}>
              <ScrollView
                nestedScrollEnabled
                style={styles.pickerScroll}
              >
                {PARENTEZCO_OPTS.map((opcion) => (
                  <TouchableOpacity
                    key={opcion}
                    style={styles.pickerOption}
                    onPress={() => {
                      setParentezco(opcion);
                      setShowParentezcoPicker(false);
                    }}
                  >
                    <ThemedText style={styles.pickerOptionText}>
                      {opcion}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>
          )}
        </ThemedView>

        {/* Correo electrónico */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Correo electrónico *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#000"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          <ThemedText type="defaultSemiBold" style={styles.aviso}>
            Este correo se utilizará para iniciar sesión
          </ThemedText>
        </View>

        {/* UID de la madre */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            UID de la madre *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="MAMÁ-XXXXXXXX"
            placeholderTextColor="#000"
            value={uidMadre}
            onChangeText={setUidMadre}
            autoCapitalize="characters"
            editable={!loading}
          />
          <ThemedText type="defaultSemiBold" style={styles.aviso}>
            Este código debe proporcionarlo el hospital
          </ThemedText>
        </View>

        {/* Confirmar UID */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Confirmar UID *
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Vuelve a escribir el UID"
            placeholderTextColor="#000"
            value={confirmacionUid}
            onChangeText={setConfirmacionUid}
            autoCapitalize="characters"
            editable={!loading}
          />
        </View>

        {/* Verificación visual */}
        {uidMadre && confirmacionUid && uidMadre !== confirmacionUid && (
          <ThemedText style={styles.errorHint}>
            ⚠️ Los UID no coinciden
          </ThemedText>
        )}

        {uidMadre && confirmacionUid && uidMadre === confirmacionUid && (
          <ThemedText style={styles.successHint}>
            ✅ UID verificado correctamente
          </ThemedText>
        )}

        {/* Botón */}
        <TouchableOpacity
          style={[
            styles.registerButton,
            (uidMadre !== confirmacionUid || !uidMadre || !confirmacionUid) &&
              styles.registerButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={loading || uidMadre !== confirmacionUid || !uidMadre || !confirmacionUid}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <ThemedText style={styles.registerButtonText}>
              Registrarse
            </ThemedText>
          )}
        </TouchableOpacity>

        {/* Login */}
        <View style={styles.loginContainer}>
          <ThemedText style={{ color: "#000" }}>
            ¿Ya tienes acceso?
          </ThemedText>
          <Link href="/LogIn" asChild>
            <TouchableOpacity>
              <ThemedText style={styles.link} type="link">
                Inicia sesión aquí
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    gap: 20,
    backgroundColor: "#81d6f0",
  },
  image: {
    width: "100%",
    height: 221,
    resizeMode: "cover",
    borderRadius: 5,
  },
  registerContainer: {
    gap: 20,
  },
  title: {
    color: "#000",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 24,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 8,
    backgroundColor: "#81d6f0",
  },
  inputLabel: {
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  aviso: {
    fontSize: 12,
    color: "#f33636",
    marginTop: 4,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  contenido: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: {
    color: "#000",
    fontSize: 16,
  },
  pickerPlaceholder: {
    color: "#999",
    fontSize: 16,
  },
  pickerOptions: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#2b9fff",
    maxHeight: 200,
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pickerOptionText: {
    color: "#2b9fff",
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  link: {
    color: "#1baa20",
    marginLeft: 5,
  },
  errorHint: {
    fontSize: 12,
    color: "#ff2222",
    textAlign: "center",
    marginTop: -5,
  },
  successHint: {
    fontSize: 12,
    color: "#0a9f2e",
    textAlign: "center",
    marginTop: -5,
  },
});