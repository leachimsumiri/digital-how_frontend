<template>
  <div class="studios">
    <h1>Studios</h1>
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
      ],
      sortBy: 'description',
      sortDesc: false,
    };
  },
};
</script>

<style scoped>
.studios {
  margin-top: 60px;
}
</style>
