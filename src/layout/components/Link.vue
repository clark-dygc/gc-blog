<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
export default {
  name: "Link",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      type: "router-link",
    };
  },
  methods: {
    linkProps(to) {
      console.log(to);
      return {
        to: to,
      };
    },
  },
};
</script>
