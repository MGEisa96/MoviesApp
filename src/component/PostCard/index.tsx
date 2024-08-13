import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { IMAGES } from "../../assets/images/images";
import AppIcon from "../AppIcon";
import { MovieType } from "../../Hooks/types";
import Share from 'react-native-share';

interface PostCardProps {
    item: MovieType
    onPressCard(id: MovieType['id']): void;
    onPressHeart(item: MovieType): void;
    isFavorite: boolean;

}
export default function PostCard({isFavorite, item, onPressHeart ,onPressCard}: PostCardProps) {
    
    const baseImage= 'https://image.tmdb.org/t/p/w200'
    

    const handleShare = async ( poster_path: string,title:string) => {
        const shareOptions = {
            title: title,
            message: 'Check out this movie poster!',
            url: `${baseImage}${poster_path}`,
            
        };

        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    return (
        <TouchableOpacity style={styles.movieItem} onPress={()=>{
            onPressCard(item.id)
        }}>

            <AppIcon
                icon={isFavorite?IMAGES.activeHeart: IMAGES.heart}
                onPress={() => {
                    onPressHeart(item)
                }}
                iconWrapperStyle={styles.iconStyle}
            />
            <AppIcon
                icon={IMAGES.shear}
                onPress={() => {
                    handleShare(item.poster_path,item.title)
                }}
                iconWrapperStyle={styles.shearStyle}
                iconStyle={styles.shearIconStyle}
            />

            <Image
                style={styles.poster}
                source={{ uri: `${baseImage}${item.poster_path}` }}
                resizeMode="contain"
            />
            <View style={styles.movieInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>IMDB Rating: {item.vote_average}</Text>
                <Text>Year: {item.release_date.split('-')[0]}</Text>
                <Text>Release Date: {item.release_date}</Text>
            </View>

        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    movieItem: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,

    },
    poster: {
        width: 100,
        height: 150,
        marginRight: 10,
    },
    movieInfo: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '85%'
    },
    iconStyle: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 5,
        right: '5%',
        zIndex: 999,
    },
    shearStyle: {
        width: 35,
        height: 35,
        position: 'absolute',
        bottom: '10%',
        right: '3%',
        zIndex: 999,
    },
    shearIconStyle: {
        width: 22,
        height: 22,
        tintColor: 'gray'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});