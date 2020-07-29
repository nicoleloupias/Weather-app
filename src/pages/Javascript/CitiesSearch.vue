<template>
  <div>
    <b-input-group class="mt-3">
      <b-form-input
        @keyup.enter="searchCities"
        :disabled="loading"
        v-model="cityName"
      />
      <b-input-group-append>
        <b-button
          variant="primary"
          @click="searchCities"
          :disabled="loading || cityName === ''"
          >Search</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
<script>
import VueTypes from "vue-types";
export default {
  name: "CitiesSearch",
  props: {
    loading: VueTypes.bool.def(false)
  },
  watch: {
    cityName(value) {
      if (!value) {
        this.$emit("clean");
      }
    }
  },
  data() {
    return {
      cityName: ""
    };
  },
  methods: {
    searchCities() {
      if (this.cityName) {
        this.$emit("fetch-cities", this.cityName);
      }
    }
  }
};
</script>
