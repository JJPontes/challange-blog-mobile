import { AuthProvider } from '../contexts/AuthContext';
import BaseLayout from '../layout/base';
import RootNavigator from '../router';
import '../styles/global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <BaseLayout>
        <RootNavigator />
      </BaseLayout>
    </AuthProvider>
  );
}
