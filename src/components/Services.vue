<template>
  <div class="services">
    <h1>Services</h1>
    <BTable
      striped
      hover
      stacked="lg"
      :filter="filterInput"
      :busy="busy"
      :items="data"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc">
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(companies)="data">
        <span v-if="data.item.companies">{{displayCompanies(data.item.companies)}}</span>
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
  name: 'Services',
  props: [
    'data',
    'busy',
  ],
  components: {
    BTable,
  },
  methods: {
    displayCompanies(companies) {
      let res = '';

      companies.forEach((item, index) => {
        res += item;
        if (index < companies.length - 1) res += ', ';
      });

      return res;
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'description',
          sortable: true,
        },
        {
          key: 'companies',
          sortable: false,
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
.services {
  margin-top: 60px;
}
</style>
