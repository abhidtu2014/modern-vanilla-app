export const ConfigureModel = {
  title: 'Initialize Form',
  tableFields: [
    {
      name: 'name',
      label: 'Name',
      checkboxes: [
        {
          name: 'isSortable',
          label: 'sortable',
          value: true
        },
        {
          name: 'isFilterable',
          label: 'filterable',
          value: true
        }
      ]
    },
    {
      name: 'capital',
      label: 'Capital',
      checkboxes: [
        {
          name: 'isSortable',
          label: 'sortable',
          value: true
        },
        {
          name: 'isFilterable',
          label: 'filterable',
          value: true
        }
      ]
    },
    {
      name: 'region',
      label: 'Region',
      checkboxes: [
        {
          name: 'isSortable',
          label: 'sortable',
          value: true
        },
        {
          name: 'isFilterable',
          label: 'filterable',
          value: true
        }
      ]
    },
    {
      name: 'population',
      label: 'population',
      checkboxes: [
        {
          name: 'isSortable',
          label: 'sortable',
          value: true
        }
      ]
    },
    {
      name: 'alpha3Code',
      label: 'Alpha3Code',
      checkboxes: [
        {
          name: 'isSortable',
          label: 'sortable',
          value: true
        },
        {
          name: 'isFilterable',
          label: 'filterable',
          value: true
        }
      ]
    }
  ],
  customFields: [
    {
      name: 'isHeaderFixed',
      label: 'is Table Header Fixed ?',
      checkboxes: [
        {
          name: 'isHeaderFixed',
          label: 'True/False',
          value: true
        }
      ]
    },
    {
      name: 'pagination',
      label: 'Do you want Pagination ?',
      checkboxes: [
        {
          name: 'isPaginationEnabled',
          label: 'True/False',
          value: false
        }
      ]
    }
  ],
  numericFields: [
    {
      name: 'numberOfEntries',
      label: 'Input Number of Entries',
      inputType: 'number',
      value: 5 // Default
    }
  ]
}
