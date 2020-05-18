<template>
  <div>
    <b-row class="my-2">
      <b-col>
        <b-form-select :options="optionsWeatherShown" v-model="changeWeather"></b-form-select>
      </b-col>
      <b-col>
        <b-form-select :options="optionsOrder" v-model="changeOrderBy"></b-form-select>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        Min value:
        <b-form-input v-model="inputMinTemp"></b-form-input>
      </b-col>
      <b-col>
        Max value:
        <b-form-input v-model="inputMaxTemp"></b-form-input>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CitiesFilters",
  data() {
    return {
      optionsWeather: [{ value: "", text: "Weather State" }],
      optionsOrder: [
        { value: "", text: "Order by" },
        { value: "ASC", text: "Asc" },
        { value: "DESC", text: "Desc" }
      ]
    };
  },
  methods: {
    ...mapMutations(["updateFilter"])
  },
  computed: {
    ...mapState(["cities", "filters"]),
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
    },
    inputMinTemp: {
      get() {
        return this.filters.minTemp;
      },
      set(value) {
        return this.updateFilter({ key: "minTemp", value });
      }
    },
    inputMaxTemp: {
      get() {
        return this.filters.maxTemp;
      },
      set(value) {
        return this.updateFilter({ key: "maxTemp", value });
      }
    },
    changeWeather: {
      get() {
        return this.filters.weather;
      },
      set(value) {
        return this.updateFilter({ key: "weather", value });
      }
    },
    changeOrderBy: {
      get() {
        return this.filters.orderBy;
      },
      set(value) {
        return this.updateFilter({ key: "orderBy", value });
      }
    }
  }
};
</script>
