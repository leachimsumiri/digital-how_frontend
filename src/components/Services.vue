<template>
  <div class="services">
    <h1>Services</h1>
    <BTable
      striped
      hover
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
  name: 'Services',
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
      ],
      sortBy: 'description',
      sortDesc: false,
    };
  },
};
</script>

<style scoped>
.services {
  margin-top: 60px;
}
</style>
