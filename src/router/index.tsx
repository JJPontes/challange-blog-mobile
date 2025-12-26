import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../constants/routesMap';
import Navbar from '../components/header/navbar';
import Posts from '../page/posts';
import PostDetails from '../page/post-details';
import SignIn from '../page/sign-in';
import Dashboard from '../page/dashboard';
import PostCreate from '../page/post-create';
import PostEdit from '../page/post-edit';
import NotFound from '../page/not-found';
import UserCreate from '../page/user-create';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();
  const CustomHeader = () => <Navbar />;

  return (
    <Stack.Navigator initialRouteName={Routes.POSTS.name}>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          header: CustomHeader,
          headerTransparent: true,
        }}
      >
        <Stack.Screen name={Routes.POSTS.name} component={Posts} />
        <Stack.Screen name={Routes.POST_DETAILS.name} component={PostDetails} />
        {isLoggedIn && (
          <>
            <Stack.Screen name={Routes.DASHBOARD.name} component={Dashboard} />
            <Stack.Screen name={Routes.DASHBOARD_CREATE_POST.name} component={PostCreate} />
            <Stack.Screen name={Routes.DASHBOARD_EDIT_POST.name} component={PostEdit} />
            <Stack.Screen name={Routes.USER_CREATE.name} component={UserCreate} />
          </>
        )}
        <Stack.Screen name={Routes.NOT_FOUND.name} component={NotFound} />
      </Stack.Group>
      <Stack.Screen name={Routes.SIGN_IN.name} component={SignIn} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}