import axios from "axios";
import { useState } from "react";
import { MovieType } from '../types'; // Assuming you have a type definition for Movie

interface MoviesApiReturn {
  loading: boolean;
  data: MovieType[];
  error: string | null;
  fetchMovies: (query: string, page?: number) => void;
  loadMoreMovies: () => void;
  hasMore: boolean;
}

const useMoviesApi = (): MoviesApiReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<MovieType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjI3M2I3YmJjN2VjMmJlN2U3MWU1ZGNmMzQxYzExZSIsIm5iZiI6MTcyMzQxNTYzMy41NDM2MzgsInN1YiI6IjY2YjkzYjJmMjA0OThjNzk2NGQ1OWQzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd8kIp9U04Ip_9YjC2uyN-rBzoVu-2D0loTNhB1yhFE';

  
  const fetchMovies = async (query: string, page: number = 1) => {
    setLoading(true);
    setError(null);
    setQuery(query);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          query: query,
          page: page,
        },
      });

      const fetchedData = response.data.results;
      const fetchedTotalPages = response.data.total_pages;

      if (page === 1) {
        setData(fetchedData);
      } else {
        setData(prevData => [...prevData, ...fetchedData]);
      }

      setTotalPages(fetchedTotalPages);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = () => {
    if (currentPage < totalPages) {
      fetchMovies(query, currentPage + 1);
    }
  };

  return {
    loading,
    data,
    error,
    fetchMovies,
    loadMoreMovies,
    hasMore: currentPage < totalPages,
  };
};

export default useMoviesApi;
