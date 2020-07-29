<template>
  <div>
    <b-jumbotron header="Weather service">
      <VLink to="Home">&larr; Home</VLink>
      <CitiesSearch @fetch-cities="fetchCitiesHandler" @clean="handleClean" :loading="loading" />
    </b-jumbotron>
    <b-container>
      <CitiesFilters
        ref="citiesFilters"
        @update-filter="handleUpdateFilter"
        :cities="cities"
        :minTemp="filters.minTemp"
        :maxTemp="filters.maxTemp"
        :weather="filters.weather"
        :orderBy="filters.orderBy"
      />
      <CitiesList
        :cities="filteredCities"
        :loading="loading"
        :avgTemp="averageTemperature"
        :size="10"
      />
    </b-container>
  </div>
</template>

<script>
import CitiesList from "./CitiesList.vue";
import CitiesSearch from "./CitiesSearch.vue";
import CitiesFilters from "./CitiesFilters.vue";
import axios from "axios";

export default {
  name: "Javascript",
  data() {
    return {
      cities: [],
      filters: {
        weather: "",
        orderBy: "",
        minTemp: "",
        maxTemp: ""
      },
      loading: false
    };
  },
  components: {
    CitiesList,
    CitiesSearch,
    CitiesFilters
  },
  methods: {
    async fetchCitiesHandler(cityName) {
      this.setLoading(true);
      this.$refs.citiesFilters.clean();
      const citiesResponse = await axios.get(
        `https://www.metaweather.com/api/location/search/?query=${cityName}`
      );

      const locations = citiesResponse.data.map(city => {
        return {
          name: city.title,
          location: city.woeid
        };
      });

      const today = new Date()
        .toJSON()
        .slice(0, 10)
        .split("-")
        .join("/");

      const cityPromises = await locations.map(city => {
        return axios.get(
          `https://www.metaweather.com/api/location/${city.location}/${today}/`
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
        this.importCities(citiesWeather);
        this.setLoading(false);
      });
    },
    importCities(arrayCities) {
      this.cities = [...arrayCities];
    },
    handleClean() {
      this.cities = [];
      this.$refs.citiesFilters.clean();
    },
    handleUpdateFilter(filters) {
      this.filters = { ...filters };
    },
    setLoading(isLoading) {
      this.loading = isLoading;
    }
  },
  computed: {
    filteredCities() {
      return this.cities
        .filter(city => {
          if (
            this.filters.weather !== "" &&
            city.weatherStateAbbr !== this.filters.weather
          ) {
            return false;
          }
          if (
            this.filters.minTemp !== "" &&
            city.currentTemperature <= this.filters.minTemp
          ) {
            return false;
          }
          if (
            this.filters.maxTemp !== "" &&
            city.currentTemperature >= this.filters.maxTemp
          ) {
            return false;
          }
          return true;
        })
        .sort((a, b) => {
          if (this.filters.orderBy == "ASC") {
            return a.currentTemperature - b.currentTemperature;
          } else if (this.filters.orderBy == "DESC") {
            return b.currentTemperature - a.currentTemperature;
          }
          return 0;
        });
    },
    averageTemperature() {
      const total = this.filteredCities
        .filter(city => city.currentTemperature) // para que no tenga encuenta los que no tienen establecida la temperatura
        .reduce((a, b) => {
          return a + parseFloat(b.currentTemperature);
        }, 0);
      return Math.round((total / this.filteredCities.length) * 100) / 100;
    }
  }
};
</script>
