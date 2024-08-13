import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFavourite from '../../Hooks/useFavourite';
import { FlatList } from 'react-native-gesture-handler';
import PostCard from '../../component/PostCard';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/screenNames';

const FavoriteMoviesScreen = () => {
    const navigation = useNavigation()
    const {favourites,isFavourite,handlePressHeart} = useFavourite()
    
    const handleGoDetails = (id: number) => {
        navigation.navigate(Screens.DETAILS_SCREEN,{
             id,
          });
    }
    return (
        <View style={styles.container}>
            <FlatList
          data={favourites}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listStyle}
          renderItem={({ item }) => (
            <PostCard item={item} onPressCard={handleGoDetails} 
            isFavorite={isFavourite(item)}
            onPressHeart={handlePressHeart}/>
          )}
          
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        
    },
    listStyle: {
        paddingTop:15,
        paddingHorizontal: 10,
      },
});

export default FavoriteMoviesScreen;
