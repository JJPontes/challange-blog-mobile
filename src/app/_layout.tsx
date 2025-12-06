// NENHUMA MUDANÇA NECESSÁRIA AQUI. ESTE CÓDIGO ESTÁ CORRETO.
import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import BaseLayout from '../layout/base';

export default function RootLayout() {
  return (
    <AuthProvider>
      <BaseLayout>
        <Stack />
      </BaseLayout>
    </AuthProvider>
  );
}