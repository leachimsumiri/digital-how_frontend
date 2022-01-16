<template>
  <div id="root">
    <h1>Companies</h1>
    <BTable
      striped
      hover
      head-variant="dark"
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
  name: 'Companies',
  props: [
    'data',
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

<style scoped>
#root {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
