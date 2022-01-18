<template>
  <div class="companies">
    <h1>Companies</h1>
    <BTable
      striped
      hover
      stacked="lg"
      :filter="filterInput"
      :busy="busy"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc">
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(logo)="data">
        <img :src="data.item.logo" alt="company logo" height="30">
      </template>
      <template #cell(url)="data">
        <a :href="data.item.url" target="_blank">Homepage</a>
      </template>
      <template #cell(socialNetworks)="data">
        <component v-for="socialNetwork in createSocialNetworkComponents(data.item.socialNetworks)"
                   :key="socialNetwork.url"
                   :is="socialNetwork.type"
                   :href="socialNetwork.url"
                   :target="socialNetwork.target">
          {{socialNetwork.text}}
        </component>
      </template>
      <template #cell(studios)="data">
        <component v-for="studio in createStudioComponents(data.item.studios)"
                   :key="studio.id"
                   :is="studio.type">
          {{studio.text}}
        </component>
      </template>
      <template #cell(services)="data">
        <component v-for="service in createServiceComponents(data.item.services)"
                   :key="service.text"
                   :is="service.type">
          {{service.text}}
        </component>
      </template>
    </BTable>
    Filter: <input type="text" v-model="filterInput" />
    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';

export default {
  name: 'Companies',
  props: [
    'data',
    'busy',
  ],
  components: {
    BTable,
  },
  computed: {
    items() {
      const items = this.data;

      items.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.logo = this.resolveCompanyLogoPath(item.description);
      });

      return items;
    },
  },
  methods: {
    resolveCompanyLogoPath(companyDescription) {
      const RE = / /g;
      return `/companies/logos/${companyDescription.replace(RE, '_')
        .toLowerCase()}.png`;
    },
    createSocialNetworkComponents(data) {
      const res = [];

      data.forEach((item) => {
        res.push({
          type: 'a',
          text: item.socialNetworkType.description,
          url: item.url,
          target: '_blank',
        });
      });

      return res;
    },
    createStudioComponents(data) {
      const res = [];

      data.forEach((item) => {
        res.push({
          type: 'span',
          text: `${item.description}: ${item.address}`,
        });
      });

      return res;
    },
    createServiceComponents(data) {
      const res = [];

      data.forEach((item) => {
        res.push({
          type: 'span',
          text: `${item.serviceType.description} (in-House: ${item.inHouse})`,
        });
      });

      return res;
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'logo',
          sortable: false,
        },
        {
          key: 'description',
          sortable: true,
        },
        {
          key: 'url',
          sortable: true,
        },
        {
          key: 'association',
          label: 'Is Association',
          sortable: true,
        },
        {
          key: 'socialNetworks',
          sortable: true,
        },
        {
          key: 'studios',
          sortable: true,
        },
        {
          key: 'services',
          sortable: true,
        },
      ],
      sortBy: 'description',
      sortDesc: false,
      filterInput: '',
    };
  },
};
</script>

<style scoped>
.companies {
  margin-top: 60px;
}
</style>
