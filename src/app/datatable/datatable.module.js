import { DataTableComponent } from './datatable.component'
import { DataTableModel } from './datatable.model'
import { ConfigureModel } from '../configure/configure.model'
import { CountryData } from '../../data/country'
import { extractTableData } from './utils'

export const DataTableModule = {
  init() {
    this.initTableData()
    DataTableComponent.init()
  },

  initTableData() {
    // Populate data in DataTableModel
    this.populateTableData()
    this.populatePaginationData()
    this.populateHeaders()
  },

  populateTableData() {
    const fields = ConfigureModel.tableFields.map((field) => field.name)
    DataTableModel.data = extractTableData(CountryData, fields)
  },

  populatePaginationData() {
    const numberOfEntries = ConfigureModel.numericFields.find(
      (field) => field.name === 'numberOfEntries'
    ).value
    DataTableModel.currentPage = 1 // Initialize with first as current page
    DataTableModel.numberOfPages = Math.ceil(
      DataTableModel.data.length / numberOfEntries
    )
  },

  populateHeaders() {
    DataTableModel.headers = ConfigureModel.tableFields.map((field) => {
      const isSortableObj = field.checkboxes.find(
        (checkbox) => checkbox.name === 'isSortable' && checkbox.value
      )
      const isFilterableObj = field.checkboxes.find(
        (checkbox) => checkbox.name === 'isFilterable' && checkbox.value
      )
      return {
        name: field.name,
        label: field.label,
        isSortable: isSortableObj && isSortableObj.value,
        sortingToggle: false,
        isFilterable: isFilterableObj && isFilterableObj.value,
        filterText: '',
        isFilterActive: false
      }
    })
  }
}
