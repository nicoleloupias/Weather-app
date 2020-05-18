import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const initialState = {
  cities: [],
  filters: {
    weather: "",
    orderBy: "",
    minTemp: "",
    maxTemp: ""
  },
  loaded: true
};

export default new Vuex.Store({
  state: { ...initialState },
  mutations: {
    clean(state) {
      //  state = { ...initialState };
      Object.assign(state, initialState);
      // state.cities = [...initialState.cities];
    },
    cleanFilters(state) {
      state.filters = { ...initialState.filters };
    },
    importCities(state, arrayCities) {
      state.cities = [...arrayCities];
    },
    loader(state, isDone) {
      state.loaded = isDone;
    },
    updateFilter(state, { key, value }) {
      if (state.filters[key] !== undefined) {
        state.filters = { ...state.filters, [key]: value || "" };
      } else {
        console.warn(`${key} doesn't exist in filters.`);
      }
    }
  },
  actions: {
    async fetchCities({ commit }, cityName) {
      commit("loader", false);
      commit("cleanFilters");
      const citiesResponse = await axios.get(
        `https://www.metaweather.com/api/location/search/?query=${cityName}`
      );

      const locations = citiesResponse.data.map(city => {
        return {
          name: city.title,
          location: city.woeid
        };
      });

      const cityPromises = await locations.map(city => {
        return axios.get(
          `https://www.metaweather.com/api/location/${city.location}/2020/5/11`
        );
      });

      Promise.all(cityPromises).then(res => {
        const citiesWeather = res.map((city, index) => {
          return {
            id: index,
            name: locations[index].name,
            weatherStateAbbr: city.data[0].weather_state_abbr,
            weatherState: city.data[0].weather_state_name,
            currentTemperature: Math.round(city.data[0].the_temp * 100) / 100,
            minTemperature: Math.round(city.data[0].min_temp * 100) / 100,
            maxTemperature: Math.round(city.data[0].max_temp * 100) / 100,
            icon: `https://www.metaweather.com/static/img/weather/${city.data[0].weather_state_abbr}.svg`
          };
        });
        commit("importCities", citiesWeather);
        commit("loader", true);
      });
    }
  },
  getters: {
    filteredCities({ cities, filters }) {
      return (
        cities
          .filter(city => {
            let pass = true;
            if (city.weatherStateAbbr !== filters.weather && filters.weather) {
              pass = false;
            }
            if (city.currentTemperature <= filters.minTemp && filters.minTemp) {
              pass = false;
            }
            if (city.currentTemperature >= filters.maxTemp && filters.maxTemp) {
              pass = false;
            }
            return pass;
          })
          // .filter(city =>
          //   filters.weather ? city.weatherStateAbbr === filters.weather : true
          // )
          // .filter(city =>
          //   filters.minTemp ? city.currentTemperature >= filters.minTemp : true
          // )
          // .filter(city =>
          //   filters.maxTemp ? city.currentTemperature <= filters.maxTemp : true
          // )
          .sort((a, b) => {
            if (filters.orderBy == "ASC") {
              return a.currentTemperature - b.currentTemperature;
            } else if (filters.orderBy == "DESC") {
              return b.currentTemperature - a.currentTemperature;
            }
            return 0;
          })
      );
    },
    averageTemperature(state, getters) {
      const total = getters.filteredCities
        .filter(city => city.currentTemperature) // para que no tenga encuenta los que no tienen establecida la temperatura
        .reduce((a, b) => {
          return a + parseFloat(b.currentTemperature);
        }, 0);
      return Math.round((total / getters.filteredCities.length) * 100) / 100;
    }
  }
});
