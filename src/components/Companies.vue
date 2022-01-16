<template>
  <div id="root">
    <h1>Companies</h1>
    <BTable
      striped
      hover
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
    </BTable>
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
      ],
      sortBy: 'description',
      sortDesc: false,
    };
  },
};
</script>

<style>
#root {
  display: flex;
  flex: 1;
  flex-direction: column;
}

td {
  vertical-align: baseline !important;
}
</style>
