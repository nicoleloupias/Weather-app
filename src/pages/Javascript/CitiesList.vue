<template>
  <div>
    <b-list-group v-if="loaded">
      <b-list-group-item v-if="averageTemperature">Average temperature: {{ averageTemperature }}ºC</b-list-group-item>
      <b-list-group-item v-else>There's no results.</b-list-group-item>
      <b-list-group-item v-for="city in filteredCities" :key="city.id">
        <city :item="city"></city>
      </b-list-group-item>
    </b-list-group>
    <loader v-else></loader>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import City from "./City";
import Loader from "./Loader";

export default {
  name: "CitiesList",
  computed: {
    ...mapState(["loaded"]),
    ...mapGetters(["filteredCities", "averageTemperature"])
  },
  components: {
    city: City,
    loader: Loader
  }
};
</script>
<style scoped>
</style>
