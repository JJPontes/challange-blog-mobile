import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { Routes } from '../constants/routesMap';

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

  return (
    <Stack.Navigator initialRouteName={Routes.POSTS.name}>
      <Stack.Screen
        name="UserCreate"
        component={UserCreate}
        options={{ 
          headerShown: false 
        }}
      />

      <Stack.Screen
        name={Routes.POSTS.name}
        component={Posts}
        options={{ title: Routes.POSTS.title }}
      />

      <Stack.Screen
        name={Routes.POST_DETAILS.name}
        component={PostDetails}
        options={{ title: Routes.POST_DETAILS.title }}
      />

      {isLoggedIn ? (
        <>
          <Stack.Screen
            name={Routes.DASHBOARD.name}
            component={Dashboard}
            options={{ title: Routes.DASHBOARD.title }}
          />
          <Stack.Screen
            name={Routes.DASHBOARD_CREATE_POST.name}
            component={PostCreate}
            options={{ title: Routes.DASHBOARD_CREATE_POST.title }}
          />

          <Stack.Screen
            name={Routes.DASHBOARD_EDIT_POST.name}
            component={PostEdit}
            options={{ title: Routes.DASHBOARD_EDIT_POST.title }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={Routes.SIGN_IN.name}
            component={SignIn}
            options={{ headerShown: false }}
          />
        </>
      )}

      <Stack.Screen
        name={Routes.NOT_FOUND.name}
        component={NotFound}
        options={{ title: Routes.NOT_FOUND.title }}
      />
    </Stack.Navigator>
  );
}