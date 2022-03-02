<template>
  <div class="studios">
    <h1>Studios</h1>
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
      <template #cell(company)="data">
        <span>{{data.item.company.description}}</span>
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
  name: 'Studios',
  props: [
    'data',
    'busy',
  ],
  components: {
    BTable,
  },
  data() {
    return {
      fields: [
        {
          key: 'description',
          sortable: true,
        },
        {
          key: 'address',
          sortable: true,
        },
        {
          key: 'latitude',
          sortable: false,
        },
        {
          key: 'longitude',
          sortable: false,
        },
        {
          key: 'company',
          sortable: true,
        },
        {
          key: 'city',
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
.studios {
  margin-top: 60px;
}
</style>
