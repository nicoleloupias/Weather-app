<template>
  <div>
    <b-input-group class="mt-3">
      <b-form-input :disabled="!loaded" v-model="cityName" @input="cleanResults" />
      <b-input-group-append>
        <b-button
          variant="primary"
          @click="searchCities"
          :disabled="!loaded || cityName === ''"
        >Search</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "CitiesSearch",
  data() {
    return {
      cityName: ""
    };
  },
  computed: {
    ...mapState(["loaded"])
  },
  methods: {
    ...mapActions(["fetchCities"]),
    ...mapMutations(["clean"]),
    searchCities() {
      if (this.cityName) {
        this.fetchCities(this.cityName);
      }
    },
    cleanResults() {
      if (!this.cityName) {
        this.clean();
      }
    }
  }
};
</script>
