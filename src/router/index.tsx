import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../constants/routesMap';

// ... outros imports de telas
import Navbar from '../components/header/navbar';

import Posts from '../page/posts';
import PostDetails from '../page/post-details';
import SignIn from '../page/sign-in';
import PostCreateEdit from '../page/post-createEdit';
import NotFound from '../page/not-found';
import UserCreateEdit from '../page/user-createEdit';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn } = useAuth();

  const CustomHeader = () => {
    return <Navbar />;
  };

  return (
    <Stack.Navigator initialRouteName={Routes.POSTS.name}>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          header: CustomHeader,
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name={Routes.POSTS.name}
          component={Posts}
          options={{
            title: 'Posts Recentes',
          }}
        />
        <Stack.Screen
          name={Routes.POST_DETAILS.name}
          component={PostDetails}
          options={{ title: Routes.POST_DETAILS.title }}
        />

        {isLoggedIn && (
          <>
            <Stack.Screen
              name={Routes.POST_CREATE_EDIT.name}
              component={PostCreateEdit}
              options={{ title: Routes.POST_CREATE_EDIT.title }}
            />
            <Stack.Screen
              name={Routes.USER_CREATE_EDIT.name}
              component={UserCreateEdit}
              options={{ title: Routes.USER_CREATE_EDIT.title }}
            />
          </>
        )}

        <Stack.Screen
          name={Routes.NOT_FOUND.name}
          component={NotFound}
          options={{ title: Routes.NOT_FOUND.title }}
        />
      </Stack.Group>

      <Stack.Screen
        name={Routes.SIGN_IN.name}
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
