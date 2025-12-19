import BaseLayout from '../layout/base';
import RootNavigator from '../router';
import '../styles/global.css';

export default function RootLayout() {
  return (
      <BaseLayout>
        <RootNavigator />
      </BaseLayout>
  );
}
