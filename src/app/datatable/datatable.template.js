import { ConfigureModel } from '../configure/configure.model'

export const DataTableTemplate = (model) => `
  <section class="data-table-container">
    <section class="data-table-title">
      <h3>${model.title}</h3>
    </section>
    <section class="table-wrapper">
      <table id="myTable">
        <tr class="header">
        ${model.headers.reduce(
          (html, header) => html + HeaderTemplate(header),
          ''
        )}
        ${model.currentPageData.reduce(
          (html, row) => html + RowTemplate(row),
          ''
        )}
        </tr>
      </table>
    </section>
  </section>
`

const HeaderTemplate = (header) => {
  const filterStyle = header.isFilterable ? '' : 'display: none;'

  const stickyHeaderObj = ConfigureModel.customFields
    .find((field) => field.name === 'isHeaderFixed')
    .checkboxes.find((checkbox) => checkbox.name === 'isHeaderFixed')

  let stickyHeaderStyle = stickyHeaderObj.value
    ? 'position: sticky; top: 0;' // Important for stickiness
    : `position: relative;`

  return `<th style="width:20%; ${stickyHeaderStyle}">
    <p id="sort-button-${header.name}" style="margin: 0; cursor: pointer;">
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
