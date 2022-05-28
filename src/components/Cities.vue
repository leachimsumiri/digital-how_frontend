<template>
  <div class="cities">
    <h1>Cities</h1>
      <!--
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filterInput"
      -->
    <BTable
      id="cityTable"
      striped
      hover
      stacked="lg"
      :per-page="perPage"
      :current-page="currentPage"
      :busy="busy"
      :items="data">
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </BTable>
    <b-pagination
      v-model="currentPage"
      :total-rows="data.length"
      :per-page="perPage"
      aria-controls="cityTable"
    ></b-pagination>
    <!--
    Filter: <input type="text" v-model="filterInput" />
    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
    -->
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';

export default {
  name: 'Cities',
  props: [
    'data',
    'busy',
  ],
  components: {
    BTable,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
    };
  },
};
</script>
