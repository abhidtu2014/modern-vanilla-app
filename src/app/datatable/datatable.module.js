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
    // Populate Table data in DataTableModel
    const fields = ConfigureModel.tableFields.map((field) => field.name)
    DataTableModel.data = extractTableData(CountryData, fields)

    // Populate Table Headers in DataTableModel
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
