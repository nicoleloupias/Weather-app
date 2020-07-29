<template>
  <div>
    <b-row class="my-2">
      <b-col>
        <b-form-select
          :options="optionsWeatherShown"
          v-model="filters.weather"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-form-select
          :options="optionsOrder"
          v-model="filters.orderBy"
        ></b-form-select>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        Min value:
        <b-form-input v-model="filters.minTemp"></b-form-input>
      </b-col>
      <b-col>
        Max value:
        <b-form-input v-model="filters.maxTemp"></b-form-input>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VueTypes from "vue-types";
const initialFilters = {
  weather: "",
  orderBy: "",
  minTemp: "",
  maxTemp: ""
};
export default {
  name: "CitiesFilters",
  props: {
    cities: VueTypes.arrayOf(
      VueTypes.shape({
        icon: VueTypes.string,
        name: VueTypes.string,
        currentTemperature: VueTypes.number.def(0),
        minTemperature: VueTypes.number.def(0),
        maxTemperature: VueTypes.number.def(0)
      }).loose
    ).isRequired
  },
  data() {
    return {
      optionsWeather: [{ value: "", text: "Weather State" }],
      optionsOrder: [
        { value: "", text: "Order by" },
        { value: "ASC", text: "Asc" },
        { value: "DESC", text: "Desc" }
      ],
      filters: { ...initialFilters }
    };
  },
  watch: {
    filters: {
      handler(value) {
        this.$emit("update-filter", value);
      },
      deep: true
    }
  },
  computed: {
    optionsWeatherShown() {
      const options = this.cities.map(city => {
        return {
          value: city.weatherStateAbbr,
          text: city.weatherState
        };
      });
      const uniqueOptions = options.filter(
        (current, i, array) =>
          array.findIndex(
            value => JSON.stringify(value) === JSON.stringify(current)
          ) === i
      );
      return [...this.optionsWeather, ...uniqueOptions];
    }
  },
  methods: {
    clean() {
      this.filters = { ...initialFilters };
    }
  }
};
</script>
