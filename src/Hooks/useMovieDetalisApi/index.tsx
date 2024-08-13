import { useState } from "react";
import { MovieDetails } from "../types";
import axios from "axios";

const useMovieDetalisApi = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<MovieDetails>();

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjI3M2I3YmJjN2VjMmJlN2U3MWU1ZGNmMzQxYzExZSIsIm5iZiI6MTcyMzQxNTYzMy41NDM2MzgsInN1YiI6IjY2YjkzYjJmMjA0OThjNzk2NGQ1OWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd8kIp9U04Ip_9YjC2uyN-rBzoVu-2D0loTNhB1yhFE';

    const getDeatails = async (movie_id: number) => {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/movie/${movie_id}`
        try {

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('response ==>',response?.data);
            
            const fetchedData = response.data;
            setData(fetchedData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    return {
        getDeatails,
        data,
        loading,
    }
}
export default useMovieDetalisApi