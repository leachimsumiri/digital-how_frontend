<template>
  <div class="studios">
    <h1>Studios</h1>
    <BTable
      id="studiosTable"
      striped
      hover
      stacked="lg"
      :current-page="currentPage"
      :per-page="perPage"
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
        <span v-if="data.item.company">{{data.item.company.description}}</span>
      </template>
      <template #cell(city)="data">
        <span v-if="data.item.city">
          {{data.item.city.description}}
        </span>
      </template>
      <template #cell(country)="data">
        <span v-if="data.item.city && data.item.city.country">
          {{data.item.city.country.description}}
        </span>
      </template>
    </BTable>
    <b-pagination
      v-model="currentPage"
      :total-rows="data.length"
      :per-page="perPage"
      aria-controls="studiosTable"
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
        {
          key: 'country',
          sortable: true,
        },
      ],
      sortBy: 'description',
      sortDesc: true,
      filterInput: '',
      perPage: 5,
      currentPage: 1,
    };
  },
};
</script>

<style scoped>
.studios {
  margin-top: 60px;
}
</style>
