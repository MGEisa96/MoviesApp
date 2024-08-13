import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/core';
import useMovieDetalisApi from '../../Hooks/useMovieDetalisApi';
import AppLoading from '../../component/AppLoading';
import AppIcon from '../../component/AppIcon';
import { RefreshControl } from 'react-native-gesture-handler';

interface InfoRowProps {
    label: string;
    value: string;
}
const InfoRow = ({ label, value }:InfoRowProps) => (
    <View style={styles.infoRow}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const MovieDetailsScreen = () => {
    const { getDeatails, loading, data } = useMovieDetalisApi();
    const [refreshing, setRefreshing] = useState(false);
    const MovieID = useRoute()?.params?.id;

    useEffect(() => {
        getDeatails(MovieID);
    }, [MovieID]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getDeatails(MovieID).finally(() => setRefreshing(false));
    }, [MovieID]);

    
    const formatCurrency = (amount) => {
        if (amount) {
            return amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        } else {
            return 'N/A';
        }
    };

    if (loading) {
        return <AppLoading />;
    }

    if (!data) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Unable to fetch movie details. Please try again later.</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Image
                style={styles.backdrop}
                source={{ uri: `https://image.tmdb.org/t/p/w780${data.backdrop_path}` }}
            />
            <View style={styles.posterContainer}>
                <Image
                    style={styles.poster}
                    source={{ uri: `https://image.tmdb.org/t/p/w342${data.poster_path}` }}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{data.title}</Text>
                {data.tagline ? <Text style={styles.tagline}>{data.tagline}</Text> : null}
                <Text style={styles.overview}>{data.overview}</Text>

                <View style={styles.infoSection}>
                    <InfoRow label="Release Date" value={data.release_date} />
                    <InfoRow label="Runtime" value={`${data.runtime} mins`} />
                    <InfoRow label="Genres" value={data.genres.map((genre) => genre.name).join(', ')} />
                    <InfoRow
                        label="Language"
                        value={data.spoken_languages.map((lang) => lang.english_name).join(', ')}
                    />
                    <InfoRow label="Budget" value={formatCurrency(data.budget)} />
                    <InfoRow label="Revenue" value={formatCurrency(data.revenue)} />
                    <InfoRow
                        label="Rating"
                        value={`${data.vote_average} (${data.vote_count} votes)`}
                    />
                </View>

                <View style={styles.productionCompanies}>
                    <Text style={styles.sectionHeader}>Production Companies:</Text>
                    {data?.production_companies.map((company) => (
                        <View key={company.id} style={styles.companyContainer}>
                            {company.logo_path ? (
                                <Image
                                    style={styles.companyLogo}
                                    source={{ uri: `https://image.tmdb.org/t/p/w154${company.logo_path}` }}
                                />
                            ) : null}
                            <Text style={styles.companyName}>{company.name}</Text>
                        </View>
                    ))}
                </View>

                {data.homepage && (
                    <TouchableOpacity onPress={() => Linking.openURL(data.homepage)}>
                        <Text style={styles.homepage}>Visit Official Site</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
      },
      backdrop: {
        width: '100%',
        height: 200,
      },
      posterContainer: {
        alignItems: 'center',
        marginTop: -50,
      },
    poster: {
        width: 150,
        height: 225,
        borderRadius: 10,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    tagline: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 10,
        color: '#555',
    },
    overview: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 20,
        color: '#333',
    },
    infoSection: {
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
    },
    value: {
        color: '#666',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#222',
    },
    productionCompanies: {
        marginBottom: 20,
    },
    companyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    companyLogo: {
        width: 50,
        height: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
    companyName: {
        fontSize: 14,
        color: '#333',
    },
    homepage: {
        marginTop: 10,
        color: '#1e90ff',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#ff3333',
    },
});

export default MovieDetailsScreen;
