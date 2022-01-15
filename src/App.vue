<template>
  <div id="app">
    {{welcome}}
    companies: {{companies}}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {

  },
  mounted() {
    axios(`http://localhost:8080/hello?name=${this.name}`).then((res) => {
      this.welcome = res.data;
    });

    axios('http://localhost:8080/companies').then((res) => {
      console.log(res);
      this.companies = res.data;
    });
  },
  data() {
    return {
      welcome: '',
      name: 'Leachim',
      companies: [],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
