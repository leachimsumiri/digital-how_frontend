<template>
  <div class="companies">
    <h1>Companies</h1>
    <BTable
      id="companyTable"
      striped
      hover
      stacked="lg"
      :current-page="currentPage"
      :per-page="perPage"
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
      <template #cell(description)="data">
        <img :src="data.item.logo" height="30" @error="replaceImgByDefault"
             class="cursor-pointer" @click="redirectToHomepage(data.item.url)">
        <span class="cursor-pointer" @click="redirectToHomepage(data.item.url)">
          {{data.item.description}}</span>
      </template>
      <template #cell(socialNetworks)="data">
        <component v-for=
                     "(socialNetwork, index)
                     in
                     createSocialNetworkComponents(data.item.socialNetworks)"
                   :key="socialNetwork.url"
                   :is="socialNetwork.type"
                   :href="socialNetwork.url"
                   :target="socialNetwork.target">
          <span v-if="index">, </span>{{socialNetwork.text}}
        </component>
      </template>
      <template #cell(studios)="data">
        <component v-for="(studio, index) in createStudioComponents(data.item.studios)"
                   :key="studio.id"
                   :is="studio.type">
          <span v-if="index">, </span>{{studio.text}}
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
    <b-pagination
      v-model="currentPage"
      :total-rows="data.length"
      :per-page="perPage"
      aria-controls="companyTable"
    ></b-pagination>
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
          text: `${item.city.description}`,
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
    replaceImgByDefault(e) {
      e.target.className = e.target.className.concat('d-none');
    },
    redirectToHomepage(url) {
      window.open(url, '_blank') || window.location.replace(url);
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'description',
          sortable: true,
        },
        /* {
          key: 'association',
          label: 'Is Association',
          sortable: true,
        }, */
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
      sortBy: 'services',
      sortDesc: true,
      filterInput: '',
      perPage: 5,
      currentPage: 1,
    };
  },
};
</script>

<style scoped lang="scss">
.companies {
  margin-top: 60px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
