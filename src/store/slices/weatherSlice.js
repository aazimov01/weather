import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const apiKey = 'e92f95556d89b062663edadc18e1087e';

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather', async (city) => {

        try {
            const coordUrl = `
            http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

            const response = await axios.get(
                coordUrl,
            );
            const weatherUrl =
                `https://api.openweathermap.org/data/2.8/onecall?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${apiKey}&units=metric&lang=ru`;

            const weatherResponse = await axios.get(weatherUrl);
            const weatherData = {
                current: weatherResponse.data.current,
                daily: weatherResponse.data.daily,
                cityName: response.data[0].local_names.ru,
                timeZoneOffset: weatherResponse.data.timezone_offset
            };
            return weatherData;
        } catch (error) {
            const coordUrl = `
            http://api.openweathermap.org/geo/1.0/direct?q=Tashkent&appid=${apiKey}`;

            const response = await axios.get(
                coordUrl,
            );
            const weatherUrl =
                `https://api.openweathermap.org/data/2.8/onecall?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${apiKey}&units=metric&lang=ru`;

            const weatherResponse = await axios.get(weatherUrl);
            const weatherData = {
                current: weatherResponse.data.current,
                daily: weatherResponse.data.daily,
                cityName: response.data[0].local_names.ru,
                timeZoneOffset: weatherResponse.data.timezone_offset
            };
            return weatherData;
        }

    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: null,
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = 'pending';
            state.error = null;
        }).addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.weather = action.payload;
        }).addCase(fetchWeather.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        });
    }

});

export default weatherSlice.reducer;