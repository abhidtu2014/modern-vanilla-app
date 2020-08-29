export const extractTableData = (table, fields) => {
  let newTable = []
  table.forEach((row) => {
    let newRow = {}
    fields.forEach((field) => {
      newRow[field] = row[field]
    })
    newTable.push(newRow)
  })
  return newTable
}

export const SortTableByField = (table, toggle, fieldName) => {
  if (fieldName === 'population') {
    table.sort((a, b) =>
      toggle ? a[fieldName] - b[fieldName] : b[fieldName] - a[fieldName]
    )
  } else {
    table.sort(compareValues(fieldName, toggle ? 'asc' : 'desc'))
  }
  return table
}

export const FilterTableByText = (table, field, searchText) => {
  return table.filter(
    (row) => row[field].toUpperCase().indexOf(searchText.toUpperCase()) > -1
  )
}

export const moveCursorToEnd = (el) => {
  el.focus()
  if (typeof el.selectionStart == 'number') {
    el.selectionStart = el.selectionEnd = el.value.length
  } else if (typeof el.createTextRange != 'undefined') {
    var range = el.createTextRange()
    range.collapse(false)
    range.select()
  }
}

const compareValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0
    const comparison = String(a[key]).localeCompare(b[key]) // localeCompare MDN string comparison

    return order === 'desc' ? comparison * -1 : comparison
  }
}
