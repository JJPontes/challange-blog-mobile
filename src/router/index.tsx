import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../constants/routesMap';

import Navbar from '../components/header/navbar';
import Posts from '../page/posts';
import PostDetails from '../page/post-details';
import SignIn from '../page/sign-in';
import PostCreateEdit from '../page/post-createEdit';
import NotFound from '../page/not-found';
import Users from '../page/users';
import UserCreateEdit from '../page/user-createEdit';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator initialRouteName={Routes.POSTS.name}>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          header: () => <Navbar />,
          headerTransparent: true,
        }}
      >
        <Stack.Screen name={Routes.POSTS.name} component={Posts} />
        <Stack.Screen name={Routes.POST_DETAILS.name} component={PostDetails} />

        {isLoggedIn && (
          <>
            <Stack.Screen
              name={Routes.POST_CREATE_EDIT.name}
              component={PostCreateEdit}
            />
            <Stack.Screen name={Routes.USERS.name} component={Users} />
            <Stack.Screen
              name={Routes.USER_CREATE_EDIT.name}
              component={UserCreateEdit}
            />
          </>
        )}

        <Stack.Screen name={Routes.NOT_FOUND.name} component={NotFound} />
      </Stack.Group>

      <Stack.Screen
        name={Routes.SIGN_IN.name}
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
