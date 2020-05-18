<template>
  <div class="Home">
    <img class="HomeLogo" src="../assets/logo.png" />
    <h3>Styling Test</h3>
    <VLink to="Styling">Go to Style Test</VLink>
    <h3>Javascript Test</h3>
    <VLink to="Javascript">Go to Javascript Test</VLink>
  </div>
</template>

<script>
import VLink from "../components/VLink";

export default {
  name: "Home",
  components: {
    VLink: VLink
  }
};
</script>

<style lang="scss" scoped>
.Home {
  background: white;
  padding: 50px 0;
  text-align: center;
  &Logo {
    height: auto;
    margin-bottom: 25px;
    width: 225px;
  }
}
</style>
