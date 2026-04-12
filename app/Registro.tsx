import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RegistroScreen() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [parentezco, setParentezco] = useState("");
  const [showParentezcoPicker, setShowParentezcoPicker] = useState(false);

  const PARENTEZCO_OPTS = [
    "Madre",
    "Padre",
    "Abuela",
    "Abuelo",
    "Hermana",
    "Hermano",
  ];

  const handleRegister = () => {
    console.log("Register with:", {
      nombre,
      apellidos,
      correo,
      contraseña,
      confirmarContraseña,
      parentezco,
    });
    router.push("/LogIn" as any);
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
          />
        </View>

        {/* Parentezco */}
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Parentezco *
          </ThemedText>

          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() =>
              setShowParentezcoPicker(!showParentezcoPicker)
            }
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
          />
          <ThemedText type="defaultSemiBold" style={styles.aviso}>
            Este correo se utilizará para iniciar sesión
          </ThemedText>
        </View>

        {/* Contraseña */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Contraseña
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#000"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
          />
        </View>

        {/* Confirmar contraseña */}
        <View style={styles.inputContainer}>
          <ThemedText type="defaultSemiBold" style={styles.inputLabel}>
            Confirmar contraseña
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#000"
            value={confirmarContraseña}
            onChangeText={setConfirmarContraseña}
            secureTextEntry
          />
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <ThemedText style={styles.registerButtonText}>
            Registrarse
          </ThemedText>
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
});