import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Solo las pantallas que existen actualmente */}
      <Stack.Screen 
        name="LogIn" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Registro" 
        options={{ 
          title: '',
          headerBackTitle: 'Volver'
        }} 
      />
      <Stack.Screen 
        name="OlvidarContraseña" 
        options={{ 
          title: 'Recuperar Contraseña',
          headerBackTitle: 'Volver'
        }} 
      />
    </Stack>
  );
}