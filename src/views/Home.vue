<template>
  <div style="width: 1000px; height: 1000px">
    <v-card width="300px" class="ma-auto">
      <v-autocomplete
        v-model="model"
        :search-input.sync="search"
        placeholder="Start typing to Search"
        dense
        light
        single-line
        hide-details
        :items="rowData"
        item-text="name"
        item-value="name"
        prepend-inner-icon="search"
        rowBuffer="30"
        clearable
        return-object
      ></v-autocomplete>
    </v-card>
    <ag-grid-vue
      style="width: 100%; height: 100%;"
      class="table"
      :gridOptions="gridOptions"
      :rowData="rowData"
      rowSelection="multiple"
      @row-selected="onRowSelected"
      suppressRowClickSelection="true"
      @first-data-rendered="onFirstDataRendered"
    >
    </ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Formulae } from '@/views/Types';
import { AgGridVue } from 'ag-grid-vue';
import { AgGridColumn } from 'ag-grid-vue/lib/AgGridColumn';
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  GridApi,
  GridOptions,
  RowClickedEvent,
  RowNode,
  RowSelectedEvent,
} from 'ag-grid-community';

@Component({
  name: 'Home',
  components: {
    AgGridVue,
  },
})
export default class Home extends Vue {
  /******************************************************************
   * Data
   * ****************************************************************/
  rowData: Formulae[] = [];
  search = '';
  model = '';
  gridOptions: GridOptions | null = null;
  gridApi: GridApi | null | undefined = null;
  gridColumnApi: ColumnApi | null | undefined = null;
  defaultColDef: (ColDef | ColGroupDef) | undefined = undefined;
  columnDefs: (ColDef | ColGroupDef)[] | undefined = undefined;
  selectedRow: Formulae[] = [];

  @Watch('search', {})
  async searching() {
    this.gridApi?.setQuickFilter(this.search);
  }

  async created() {
    try {
      const res = await fetch('https://formulae.brew.sh/api/formula.json');
      const data = await res.json();
      this.rowData = data.map((item: Formulae) => ({
        name: item.name,
        desc: item.desc,
        versions: item.versions.stable,
        isSelected: false,
      }));
    } catch (e) {
      console.error(e);
    }
  }
  beforeMount() {
    this.columnDefs = [
      {
        field: 'name',
        headerName: 'name',
        maxWidth: 200,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
      },
      {
        headerName: 'versions',
        field: 'versions.stable',
        maxWidth: 200,
      },
      {
        headerName: 'desc',
        field: 'desc',
      },
    ];
    this.gridOptions = {
      rowHeight: 30,
      headerHeight: 30,
      rowDragManaged: true,
      animateRows: true,
      columnDefs: this.columnDefs,
    };
    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
      editable: false,
      flex: 1,
    };
  }
  mounted() {
    this.gridApi = this.gridOptions?.api;
    this.gridColumnApi = this.gridOptions?.columnApi;
  }

  /****************************************************************************
   * Methods
   * ******************************************************************************/
  onFirstDataRendered(params: { api: { sizeColumnsToFit: () => void } }) {
    params.api.sizeColumnsToFit();
  }
  onRowSelected(e: RowSelectedEvent) {
    this.selectedRow.push(e.node.data.name);
  }
}
</script>

<style lang="scss">
@import './src/views/table';
</style>
