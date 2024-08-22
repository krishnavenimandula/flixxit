import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  moviesByGenre: [],
  tvByGenre: [],
};

export const getGenres = createAsyncThunk("flixxit/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    if (movie.original_language == "en" && !movie.adult) {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name
            ? movie.original_name
            : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
          poster: movie.poster_path,
          overview: movie.overview,
          rating: movie.vote_average,
        });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const response = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(response.data.results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "flixxit/genre",
  async ({ genres }, thunkAPI) => {
    const {
      flixxit: { genres: stateGenres },
    } = thunkAPI.getState();
    const moviesArray = [];

    try {
      for (const genre of genres) {
        const genreMovies = await getRawData(
          `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genre}`,
          stateGenres
        );
        const uniqueMoviesMap = new Map();
        genreMovies.forEach((movie) => uniqueMoviesMap.set(movie.id, movie));

        moviesArray.push({
          genre,
          movies: Array.from(uniqueMoviesMap.values()),
        });
      }
      return moviesArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDataByGenreTv = createAsyncThunk(
  "flixxit/genreTv",
  async ({ genres }, thunkAPI) => {
    const {
      flixxit: { genres: stateGenres },
    } = thunkAPI.getState();
    const moviesArray = [];

    try {
      for (const genre of genres) {
        const genreMovies = await getRawData(
          `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=${genre}`,
          stateGenres
        );
        // Ensure uniqueness by using a Map
        const uniqueMoviesMap = new Map();
        genreMovies.forEach((movie) => uniqueMoviesMap.set(movie.id, movie));

        moviesArray.push({
          genre,
          movies: Array.from(uniqueMoviesMap.values()),
        });
      }
      return moviesArray;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchByText = createAsyncThunk(
  "flixxit/search",
  async ({ query }, thunkAPI) => {
    const {
      flixxit: { search },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}`,
      search
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "flixxit/trending",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=en-US`,
      genres,
      true
    );
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "flixxit/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/liked/${email}`
    );
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "flixxit/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/remove`,
      {
        email,
        movieId,
      }
    );
    toast.success("Successfully deleted");
    return movies;
  }
);

const flixxitSlice = createSlice({
  name: "flixxit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.moviesByGenre = action.payload;
    });
    builder.addCase(fetchDataByGenreTv.fulfilled, (state, action) => {
      state.tvByGenre = action.payload;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    flixxit: flixxitSlice.reducer,
  },
});

export const { setGenres, setMovies } = flixxitSlice.actions;
