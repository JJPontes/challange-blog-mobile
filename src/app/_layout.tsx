import BaseLayout from '../layout/base';
import RootNavigator from '../router';
import '../styles/global.css';
import '../utils/i18n';

export default function RootLayout() {
  return (
    <BaseLayout>
      <RootNavigator />
    </BaseLayout>
  );
}
