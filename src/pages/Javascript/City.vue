<template>
  <div class="container">
    <div class="mainInfo">
      <img :src="item.icon" class="icon" />
      <h4>
        {{ item.name }}
        <b-badge>{{ item.currentTemperature }}ºC</b-badge>
      </h4>
    </div>
    <div class="extraInfo">
      <p>Min: {{ item.minTemperature }}ºC</p>
      <p>Max: {{ item.maxTemperature }}ºC</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"]
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
