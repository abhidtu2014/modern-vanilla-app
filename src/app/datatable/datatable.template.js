export const DataTableTemplate = (model) => `
  <section class="data-table-container">
    <h3>${model.title}</h3>
    <table id="myTable">
      <tr class="header">
      ${model.headers.reduce(
        (html, header) => html + HeaderTemplate(header),
        ''
      )}
      ${model.data.reduce((html, row) => html + RowTemplate(row), '')}
      </tr>
    </table>
  </section>
`

const HeaderTemplate = (header) => {
  let filterStyle = header.isFilterable ? '' : 'display: none;'
  return `<th style="width:20%;">
    <p id="sort-button-${header.name}" style="text-align: center; margin: 0; cursor: pointer;">
      ${header.label}
    </p>
    <br>
    <input type="text" style="${filterStyle}" id="input-search-${header.name}" value="${header.filterText}">
  </th>
`
}

const RowTemplate = (row) => `
  <tr>
    <td>${row.name}</td>
    <td>${row.capital}</td>
    <td>${row.region}</td>
    <td>${row.population}</td>
    <td>${row.alpha3Code}</td>
  </tr>
`
