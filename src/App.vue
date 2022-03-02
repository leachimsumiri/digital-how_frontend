<template>
  <div id="app">
    <Companies :data="companies" :busy="companiesTableBusy"></Companies>
    <Studios :data="studios" :busy="studiosTableBusy"></Studios>
    <Services :data="services" :busy="servicesTableBusy"></Services>
    <SocialNetworks :data="socialNetworks" :busy="socialNetworksTableBusy"></SocialNetworks>

    <h1 style="margin-top: 60px;">Studio Map</h1>
    <div id="map"></div>
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
  },
  methods: {
    initMap(lat, long) {
      if (this.map) return;

      this.setMapView(lat, long);

      // eslint-disable-next-line no-undef
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoibGVhY2hpbSIsImEiOiJja3dmbGw1eHowM3FpMm9tbGYwODBjc252In0.1Uy0WQq36UaEURZJPUkB0Q',
        },
      ).addTo(this.map);

      this.setMapLocationMarker();
    },
    setMapView(lat, long) {
      // eslint-disable-next-line no-undef
      this.map = L.map('map').setView([lat, long], 2);
    },
    setMapLocationMarker() {
      // eslint-disable-next-line no-undef
      this.studios.forEach((studio) => L.marker([studio.latitude, studio.longitude], {
        title: studio.description,
      }).addTo(this.map));
    },
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
      map: null,
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
</style>
