<template>
  <div class="container">
    <div class="mainInfo">
      <img :src="icon" class="icon" />
      <h4>
        {{ name }}
        <b-badge>{{ currentTemperature }}ºC</b-badge>
      </h4>
    </div>
    <div class="extraInfo">
      <p>Min: {{ minTemperature }}ºC</p>
      <p>Max: {{ maxTemperature }}ºC</p>
    </div>
  </div>
</template>
<script>
import VueTypes from "vue-types";
export default {
  props: {
    icon: VueTypes.string,
    name: VueTypes.string,
    currentTemperature: VueTypes.number.def(0),
    minTemperature: VueTypes.number.def(0),
    maxTemperature: VueTypes.number.def(0)
  }
};
</script>
<style lang="scss" scoped>
.mainInfo {
  display: flex;
  align-items: center;
}
.icon {
  margin: 15px;
  width: 50px;
  height: 100%;
}

.extraInfo {
  display: flex;
  width: 14rem;
  justify-content: space-around;

  p {
    margin-bottom: 0;
  }
}
</style>
