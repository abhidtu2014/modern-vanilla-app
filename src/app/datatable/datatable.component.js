import { DataTableModel } from './datatable.model'
import { ConfigureModel } from '../configure/configure.model'

import { DataTableTemplate } from './datatable.template'
import {
  SortTableByField,
  FilterTableByText,
  extractTableData,
  moveCursorToEnd
} from './utils'
import { CountryData } from '../../data/country'

export const DataTableComponent = {
  init() {
    this.appElement = document.getElementById('app')
    this.appElement.innerHTML = ''
    this.appElement.scrollTop = '0px' // Fix scroll on top
    this.render()
  },

  render() {
    this.appElement.innerHTML = DataTableTemplate(DataTableModel)
    this.afterRender()
  },

  afterRender() {
    const self = this
    // Sorting EventListeners
    const sortableHeaders = DataTableModel.headers.filter(
      (header) => header.isSortable
    )
    sortableHeaders.forEach((header) => {
      const headerEle = document.getElementById(`sort-button-${header.name}`)
      headerEle.addEventListener('click', (e) => {
        e.preventDefault()
        header.sortingToggle = !header.sortingToggle
        DataTableModel.data = SortTableByField(
          DataTableModel.data,
          header.sortingToggle,
          header.name
        )
        self.render()
      })
    })

    // Filtering EventListeners
    const filterableHeaders = DataTableModel.headers.filter(
      (header) => header.isFilterable
    )
    filterableHeaders.forEach((header) => {
      const headerSearchEle = document.getElementById(
        `input-search-${header.name}`
      )
      if (header.filterActive) {
        moveCursorToEnd(headerSearchEle)
      }

      headerSearchEle.addEventListener('input', (e) => {
        e.preventDefault()

        filterableHeaders.forEach((h) => {
          h.filterActive = false
        })

        const fields = ConfigureModel.tableFields.map((field) => field.name)
        DataTableModel.data = extractTableData(CountryData, fields)

        console.log('input', e.target.value)
        header.filterText = e.target.value
        header.filterActive = true
        DataTableModel.data = FilterTableByText(
          DataTableModel.data,
          header.name,
          header.filterText
        )
        self.render()
      })
    })
  }
}
