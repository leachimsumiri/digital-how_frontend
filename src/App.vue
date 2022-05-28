<template>
  <div id="app">
    <!--
    <Companies :data="companies" :busy="companiesTableBusy"></Companies>
    <Studios :data="studios" :busy="studiosTableBusy"></Studios>
    <Services :data="services" :busy="servicesTableBusy"></Services>
    <SocialNetworks :data="socialNetworks" :busy="socialNetworksTableBusy"></SocialNetworks>
    -->

    <Cities :data="cities" :busy="citiesTableBusy"></Cities>

    <!--
    <h1 style="margin-top: 60px;">Studio Map</h1>
    <div id="map"></div>
    -->
  </div>
</template>

<script>
import axios from 'axios';
/*
import Companies from './components/Companies.vue';
import Studios from './components/Studios.vue';
import Services from './components/Services.vue';
import SocialNetworks from './components/SocialNetworks.vue';
*/
import Cities from './components/Cities.vue';

export default {
  name: 'App',
  components: {
    Cities,
  },
  mounted() {
    const PAGE_SIZE = 10;

    const worker = new Worker('worker.js');

    const event = {
      page: 1,
      pageSize: PAGE_SIZE,
    };

    worker.onmessage = (e) => {
      if (this.cities.length) {
        this.cities.push(...e.data);
      } else {
        this.cities = e.data;
      }

      if (this.citiesTableBusy !== false) this.citiesTableBusy = false;

      if (event.page < this.totalPages) {
        event.page += 1;
        worker.postMessage(event);
      }
    };

    axios(`http://localhost:8080/citiesPages?size=${PAGE_SIZE}`)
      .then((res) => {
        this.totalPages = res.data;

        worker.postMessage(event);
      });

    /*
    axios('http://localhost:8080/citiesCount')
      .then((res) => {
        console.log(res.data);
      });
*/

    /*
    axios('http://localhost:8080/cities')
      .then((res) => {
        this.cities = res.data;
        console.log(this.cities);
        this.citiesTableBusy = false;
      });
     */
    /*
    axios('http://localhost:8080/companies')
      .then((res) => {
        this.companies = res.data;
        console.log(this.companies);
        this.companiesTableBusy = false;
      });

    axios('http://localhost:8080/studios')
      .then(async (res) => {
        this.studios = res.data;
        console.log(this.studios);
        this.refetchDuplicateCompanies(res.data);
        this.studiosTableBusy = false;
        this.initMap(1, 1);
      });

    axios('http://localhost:8080/service-types')
      .then((res) => {
        console.log(this.services);

        const promise = new Promise((resolve) => {
          res.data.forEach((service, index) => {
            axios(`http://localhost:8080/companiesWithService?service=${service.description}`)
              .then((res2) => {
                // eslint-disable-next-line no-param-reassign
                service.companies = res2.data;

                if (index === res.data.length - 1) resolve();
              });
          });
        });

        promise.then(() => {
          this.services = res.data;
          this.servicesTableBusy = false;
        });
      });

    axios('http://localhost:8080/social-network-types')
      .then((res) => {
        this.socialNetworks = res.data;
        console.log(this.socialNetworks);
        this.socialNetworksTableBusy = false;
      });
     */
  },
  data() {
    return {
      cities: [],
      citiesTableBusy: true,
      totalPages: 0,
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

#map {
  width: 90%;
  height: 800px;
  margin: auto;
}

.pagination {
  justify-content: center;
}
</style>
