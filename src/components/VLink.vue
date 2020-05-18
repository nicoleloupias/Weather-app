<template>
  <router-link class="VLink" :to="{ name: to }">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "VLink",
  props: {
    to: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../theme/_variables.scss";

.VLink {
  color: $primary;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    text-decoration: underline;
  }
}
</style>
