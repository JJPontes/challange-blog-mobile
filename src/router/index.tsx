import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext'; // Importe o novo hook
import { Routes } from '../constants/routesMap';

// Importação das páginas
import Navbar from '../components/header/navbar';
import Posts from '../page/posts';
import PostDetails from '../page/post-details';
import SignIn from '../page/sign-in';
import PostCreateEdit from '../page/post-createEdit';
import Users from '../page/users';
import UserCreateEdit from '../page/user-createEdit';
import NotFound from '../page/not-found';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      key={user?.id || 'guest'}
      initialRouteName={isLoggedIn ? Routes.POSTS.name : Routes.SIGN_IN.name}
    >
      {!isLoggedIn ? (
        
        <Stack.Screen 
          name={Routes.SIGN_IN.name} 
          component={SignIn} 
          options={{ headerShown: false }} 
        />
      ) : (
        
        <Stack.Group
          screenOptions={{
            headerShown: true,
            header: () => <Navbar />,
            headerTransparent: true,
          }}
        >
          
          <Stack.Screen name={Routes.POSTS.name} component={Posts} />
          <Stack.Screen name={Routes.POST_DETAILS.name} component={PostDetails} />

          {user?.roleName === 'teacher' && (
            <Stack.Screen 
              name={Routes.POST_CREATE_EDIT.name} 
              component={PostCreateEdit} 
            />
          )}

          {user?.roleName === 'coordinator' && (
            <>
              <Stack.Screen name={Routes.USERS.name} component={Users} />
              <Stack.Screen 
                name={Routes.USER_CREATE_EDIT.name} 
                component={UserCreateEdit} 
              />
            </>
          )}

          <Stack.Screen name={Routes.NOT_FOUND.name} component={NotFound} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}