<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    double() {
      return this.count * 2;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
    currentTime() {
      return new Date();
    },
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`);
  },
};
</script>
<template>
  <button @click="increment">Count is: {{ count }}</button>
  <p>Twice the count is: {{ double }}</p>
  <p>The current date and time are: {{ currentTime() }}</p>
</template>
<style lang="css" scoped>
button {
  background-color: blue;
  color: white;
}
</style>
