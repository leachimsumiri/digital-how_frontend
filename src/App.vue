<template>
  <div id="app">
    companies: {{companies}}
    <br>
    studios: {{studios}}}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {

  },
  mounted() {
    axios('http://localhost:8080/companies').then((res) => {
      this.companies = res.data;
      console.log(this.companies);
    });

    axios('http://localhost:8080/studios').then((res) => {
      this.studios = res.data;
      console.log(this.studios);
    });
  },
  data() {
    return {
      companies: [],
      studios: [],
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
