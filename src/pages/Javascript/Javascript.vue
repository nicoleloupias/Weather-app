<template>
  <div>
    <b-jumbotron header="Weather service">
      <VLink to="Home">&larr; Home</VLink>
      <CitiesSearch />
    </b-jumbotron>
    <b-container>
      <CitiesFilters />
      <CitiesList />
    </b-container>
  </div>
</template>

<script>
import CitiesList from "./CitiesList.vue";
import CitiesSearch from "./CitiesSearch.vue";
import CitiesFilters from "./CitiesFilters.vue";
export default {
  name: "Javascript",
  components: {
    CitiesList,
    CitiesSearch,
    CitiesFilters
  }
};
</script>
