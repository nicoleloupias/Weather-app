<template>
  <div>
    <loader v-if="loading" />
    <b-list-group v-else>
      <b-list-group-item v-if="avgTemp"
        >Average temperature: {{ avgTemp }}ºC</b-list-group-item
      >
      <b-list-group-item v-else>There's no results.</b-list-group-item>
      <b-list-group-item v-for="city in paginatedData" :key="city.id">
        <city v-bind="city"></city>
      </b-list-group-item>
      <div v-if="cities.length != 0" class="pagination">
        <b-button
          variant="outline-primary"
          size="sm"
          :disabled="pageNumber === 0"
          @click="prevPage"
          >Previous</b-button
        >
        <b-button
          variant="outline-primary"
          size="sm"
          :disabled="pageNumber >= pageCount - 1"
          @click="nextPage"
          >Next</b-button
        >
      </div>
    </b-list-group>
  </div>
</template>

<script>
import City from "./City";
import Loader from "./Loader";
import VueTypes from "vue-types";

export default {
  name: "CitiesList",
  props: {
    loading: VueTypes.bool.def(false),
    avgTemp: VueTypes.number.def(0),
    size: VueTypes.number.def(10),
    cities: VueTypes.arrayOf(
      VueTypes.shape({
        icon: VueTypes.string,
        name: VueTypes.string,
        currentTemperature: VueTypes.number.def(0),
        minTemperature: VueTypes.number.def(0),
        maxTemperature: VueTypes.number.def(0)
      }).loose
    ).def([])
  },
  data() {
    return {
      pageNumber: 0
    };
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    }
  },
  computed: {
    pageCount() {
      let l = this.cities.length;
      let s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.cities.slice(start, end);
    }
  },
  components: {
    city: City,
    loader: Loader
  }
};
</script>
<style scoped>
.pagination {
  width: 140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}
</style>
