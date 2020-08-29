export const ConfigureTemplate = (model) => `
  <section class="form-container">
    <h3>${model.title}</h3>
    <form>
      ${model.tableFields.reduce(
        (html, field) => html + customFieldFormTemplate(field),
        ''
      )}
      ${model.customFields.reduce(
        (html, field) => html + customFieldFormTemplate(field),
        ''
      )}
      ${model.numericFields.reduce(
        (html, field) => html + normalFormFieldsTemplate(field),
        ''
      )}
    </form>
    <button id="form-submission-button">Save Form</button>
  </section>
`

const customFieldFormTemplate = (field) => `
  <section class="custom-form-field">
  <hr />
    <span class="custom-span">
    ${field.label}
    </span>
    <br>
    ${field.checkboxes.reduce(
      (html, checkbox) => html + checkboxTemplate(field, checkbox),
      ''
    )}
  </section>
`

const checkboxTemplate = (field, checkbox) => {
  if (checkbox.value) {
    return `
      <label for="custom-${field.name}-${checkbox.name}">${checkbox.label}</label>
      <input type="checkbox" class="myCheckbox" id="custom-${field.name}-${checkbox.name}" name="custom-${field.name}-${checkbox.name}" checked="true">
    `
  } else {
    return `
      <label for="custom-${field.name}-${checkbox.name}">${checkbox.label}</label>
      <input type="checkbox" class="myCheckbox" id="custom-${field.name}-${checkbox.name}" name="custom-${field.name}-${checkbox.name}">
    `
  }
}

const normalFormFieldsTemplate = (field) => {
  return `
      <label for="custom-${field.name}">${field.label}</label>
      <input type="${field.inputType}" id="custom-${field.name}" name="custom-${field.name}" min="5" max="250" value="${field.value}">
    `
}
