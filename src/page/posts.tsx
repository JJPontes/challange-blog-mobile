import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Cards from '../components/cards';
import { Detail } from '../types/post';
import { getall, getPostByUser, getPostFilter } from '../services/postServices';
import { useAuth } from '../hooks/useAuth';
import { MagnifyingGlass } from 'phosphor-react-native';

export default function Posts() {
  const [posts, setPosts] = useState<Detail[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [countPost, setCountPost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUserContext, setIsUserContext] = useState(false);

  const { isLoggedIn, user } = useAuth();

  const handleApiResponse = (response: any, fromUser: boolean) => {
    const details = response.data.details;
    setIsUserContext(fromUser);

    if (details) {
      const formattedDetails = Array.isArray(details) ? details : [details];
      setPosts(formattedDetails as Detail[]);
      setCountPost(response.data.pagination?.total || formattedDetails.length);
    } else {
      setPosts([]);
      setCountPost(0);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let response;
      if (isLoggedIn && user?.id) {
        response = await getPostByUser(user.id);
        handleApiResponse(response, true);
      } else {
        response = await getall();
        handleApiResponse(response, false);
      }
    } catch (err: any) {
      Alert.alert('Erro', 'Não foi possível carregar os posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAfterDelete = (deletedId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedId));
    setCountPost(prevCount => prevCount - 1);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) return fetchPosts();
    try {
      setLoading(true);
      const response = await getPostFilter(searchText);
      handleApiResponse(response, false);
    } catch (err: any) {
      Alert.alert('Erro', 'Erro ao filtrar posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isLoggedIn, user?.id]);

  return (
    <View className="flex-1 mt-[70px] pt-3 bg-bgGray">
      <View className="flex-row items-center gap-2 p-2 bg-white">
        <View className={`flex-row items-center flex-1 bg-gray-50 rounded-lg px-3 h-12 border ml-2 ${isFocused ? 'border-blue-500' : 'border-transparent'}`}>
          <TextInput
            className="flex-1 h-full ml-2 text-base text-gray-800"
            placeholder="Buscar posts..."
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity
          onPress={handleSearch}
          disabled={loading}
          className="rounded-lg bg-gray-200 h-12 px-4 mr-2 flex-row items-center justify-center active:bg-gray-300"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#6b7280" />
          ) : (
            <MagnifyingGlass size={20} color="#6b7280" />
          )}
        </TouchableOpacity>
      </View>

      <View className="w-full pt-1">
        <Text className="text-right text-textGray text-sm px-4 pt-2 italic">
          {countPost} {countPost === 1 ? 'post encontrado' : 'posts encontrados'}
        </Text>
      </View>

      <View className="flex-1 px-4 pt-4">
        <FlatList
          data={posts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View className="mb-1">
              <Cards 
                {...item} 
                onDeleteSuccess={handleRefreshAfterDelete} // Passando a função aqui
              />
            </View>
          )}
          ListEmptyComponent={
            !loading ? (
              <View className="items-center mt-10">
                <Text className="text-gray-400">Nenhum post encontrado.</Text>
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View className="h-10" />}
        />
      </View>
    </View>
  );
}