<template>
  <div id="app">
    <Companies :data="companies" :busy="companiesTableBusy"></Companies>
  </div>
</template>

<script>
import axios from 'axios';
import Companies from './components/Companies.vue';

export default {
  name: 'App',
  components: {
    Companies,
  },
  mounted() {
    axios('http://localhost:8080/companies')
      .then((res) => {
        this.companies = res.data;
        console.log(this.companies);
        this.companiesTableBusy = false;
      });

    axios('http://localhost:8080/studios')
      .then((res) => {
        this.studios = res.data;
        console.log(this.studios);
      });

    axios('http://localhost:8080/services')
      .then((res) => {
        this.services = res.data;
        console.log(this.services);
      });
  },
  data() {
    return {
      companies: [],
      companiesTableBusy: true,
      studios: [],
      services: [],
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
