import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMoviesApi from '../../Hooks/useMovieApi';
import { MovieType } from '../../Hooks/types'; 
import PostCard from '../../component/PostCard';
import { useNavigation } from '@react-navigation/core';
import Screens from '../../navigation/screenNames';
import AppLoading from '../../component/AppLoading';
import useFavourite from '../../Hooks/useFavourite';
import AppIcon from '../../component/AppIcon';
import { IMAGES } from '../../assets/images/images';

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const {isFavourite,handlePressHeart} = useFavourite()
  const { loading, data, error, fetchMovies, loadMoreMovies, hasMore } = useMoviesApi();
  const navigation = useNavigation()
  const handleSearch = () => {
    Keyboard.dismiss()
    fetchMovies(query);
  };
const handleGoDetails = (id: number) => {
    navigation.navigate(Screens.DETAILS_SCREEN,{
         id,
      });
}

  return (
    
      <View style={styles.container}>
        <View style={styles.topViewStyle}>
        <View style={styles.inputWrapperStyle}>
          <TextInput
            style={styles.input}
            placeholder="Search for movies"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
          <AppIcon 
           icon={IMAGES.search}
           onPress={handleSearch} />
        </View>
        </View>
        
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listStyle}
          renderItem={({ item }) => (
            <PostCard item={item} onPressCard={handleGoDetails} 
            isFavorite={isFavourite(item)}
            onPressHeart={handlePressHeart}/>
          )}
          onEndReached={() => {
            if (hasMore && !loading) {
              loadMoreMovies();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      {loading && <AppLoading />}
      </View>
    
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ?'10%':0,
  },
  listStyle: {
    paddingTop:10,
    paddingHorizontal: 10,
  },
  topViewStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 1,
    justifyContent: 'center',
    
  },
  inputWrapperStyle: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8
  },
  input: {
    height: 40,
    width: '90%',
    paddingHorizontal: 10,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  
});

export default HomeScreen;
