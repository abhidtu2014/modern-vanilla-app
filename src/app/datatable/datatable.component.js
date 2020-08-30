import { DataTableModel } from './datatable.model'
import { ConfigureModel } from '../configure/configure.model'

import { DataTableTemplate } from './datatable.template'
import { PaginationTemplate } from './pagination.template'

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
    this.getCurrentPageData()
    let html = DataTableTemplate(DataTableModel)
    this.isPaginationEnabled = ConfigureModel.customFields
      .find((field) => field.name === 'isPaginationEnabled')
      .checkboxes.find(
        (checkbox) => checkbox.name === 'isPaginationEnabled'
      ).value

    if (this.isPaginationEnabled) {
      html += PaginationTemplate(DataTableModel)
    }
    this.appElement.innerHTML = html
    this.afterRender()
    if (this.isPaginationEnabled) {
      checkPaginationButtons()
    }
  },

  afterRender() {
    this.addSortingEventListeners()
    this.addFilteringListeners()
    if (this.isPaginationEnabled) {
      this.addPaginationListeners()
    }
  },

  addSortingEventListeners() {
    const self = this
    // Sorting EventListeners
    const sortableHeaders = DataTableModel.headers.filter(
      (header) => header.isSortable
    )
    this.sortableHeaders = sortableHeaders
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
  },

  addFilteringListeners() {
    const self = this
    const filterableHeaders = DataTableModel.headers.filter(
      (header) => header.isFilterable
    )
    this.filterableHeaders = filterableHeaders
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
        applyOtherFiltersAndSorting(
          this.sortableHeaders,
          this.filterableHeaders.filter((filter) => filter.name !== header.name)
        ) // If previous sorting and filtering

        // Now apply Current Filter
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
  },

  addPaginationListeners() {
    const self = this
    // first page
    document.getElementById('first-page').addEventListener('click', (e) => {
      e.preventDefault()
      DataTableModel.currentPage = 1
      self.render()
    })
    // last page
    document.getElementById('last-page').addEventListener('click', (e) => {
      e.preventDefault()
      DataTableModel.currentPage = DataTableModel.numberOfPages
      self.render()
    })
    // previous page
    document.getElementById('previous-page').addEventListener('click', (e) => {
      e.preventDefault()
      DataTableModel.currentPage--
      self.render()
    })
    // next page
    document.getElementById('next-page').addEventListener('click', (e) => {
      e.preventDefault()
      DataTableModel.currentPage++
      self.render()
    })
  },

  getCurrentPageData() {
    let numberOfEntries = ConfigureModel.numericFields.find(
      (field) => field.name === 'numberOfEntries'
    ).value
    const isPaginationEnabled = ConfigureModel.customFields
      .find((field) => field.name === 'isPaginationEnabled')
      .checkboxes.find((checkbox) => checkbox.name === 'isPaginationEnabled')
      .value
    if (!isPaginationEnabled) {
      // If pagination is not enabled, set number of Entries as Total Data Length
      numberOfEntries = DataTableModel.data.length
    }
    const start = (DataTableModel.currentPage - 1) * numberOfEntries
    const end = start + numberOfEntries
    DataTableModel.currentPageData = DataTableModel.data.slice(start, end)
  }
}

const applyOtherFiltersAndSorting = (sortableHeaders, filterableHeaders) => {
  // Apply Previous stored Sorting values
  sortableHeaders.forEach((header) => {
    DataTableModel.data = SortTableByField(
      DataTableModel.data,
      header.sortingToggle,
      header.name
    )
  })
  // Apply Previous Stored Filtering Texts
  filterableHeaders.forEach((header) => {
    DataTableModel.data = FilterTableByText(
      DataTableModel.data,
      header.name,
      header.filterText
    )
  })
}

const checkPaginationButtons = () => {
  document.getElementById('next-page').disabled =
    DataTableModel.currentPage == DataTableModel.numberOfPages ? true : false
  document.getElementById('previous-page').disabled =
    DataTableModel.currentPage == 1 ? true : false
  document.getElementById('first-page').disabled =
    DataTableModel.currentPage == 1 ? true : false
  document.getElementById('last-page').disabled =
    DataTableModel.currentPage == DataTableModel.numberOfPages ? true : false
}
