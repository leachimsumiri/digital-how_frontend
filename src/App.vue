<template>
  <div id="app">
    <Companies :data="companies" :busy="companiesTableBusy"></Companies>
    <Studios :data="studios" :busy="studiosTableBusy"></Studios>
    <Services :data="services" :busy="servicesTableBusy"></Services>
    <SocialNetworks :data="socialNetworks" :busy="socialNetworksTableBusy"></SocialNetworks>
  </div>
</template>

<script>
import axios from 'axios';
import Companies from './components/Companies.vue';
import Studios from './components/Studios.vue';
import Services from './components/Services.vue';
import SocialNetworks from './components/SocialNetworks.vue';

export default {
  name: 'App',
  components: {
    Companies,
    Studios,
    Services,
    SocialNetworks,
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
        this.studiosTableBusy = false;
      });

    axios('http://localhost:8080/service-types')
      .then((res) => {
        this.services = res.data;
        console.log(this.services);
        this.servicesTableBusy = false;
      });

    axios('http://localhost:8080/social-network-types')
      .then((res) => {
        this.socialNetworks = res.data;
        console.log(this.socialNetworks);
        this.socialNetworksTableBusy = false;
      });
  },
  data() {
    return {
      companies: [],
      companiesTableBusy: true,
      studios: [],
      studiosTableBusy: true,
      services: [],
      servicesTableBusy: true,
      socialNetworks: [],
      socialNetworksTableBusy: true,
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

  display: flex;
  flex: 1;
  flex-direction: column;
}

td {
  vertical-align: baseline !important;
}
</style>
