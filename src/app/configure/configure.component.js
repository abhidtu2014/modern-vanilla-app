import { ConfigureModel } from './configure.model'
import { ConfigureTemplate } from './configure.template'

export const configureComponent = {
  init() {
    this.appElement = document.getElementById('app')
    this.render()
  },

  render() {
    this.appElement.innerHTML = ConfigureTemplate(ConfigureModel) // Model passed into View
    this.afterRender()
  },

  afterRender() {
    const self = this
    const fields = [
      ...ConfigureModel.tableFields,
      ...ConfigureModel.customFields
    ]
    fields.forEach((inputElement) => {
      inputElement.checkboxes.forEach((checkbox) => {
        const checkboxEle = document.getElementById(
          `custom-${inputElement.name}-${checkbox.name}`
        )
        checkboxEle.addEventListener('click', function (e) {
          e.preventDefault()
          // if (checkbox.value) {
          //   console.log(
          //     'Remove',
          //     `custom-${inputElement.name}-${checkbox.name}`
          //   )
          // } else {
          //   console.log('Add', `custom-${inputElement.name}-${checkbox.name}`)
          // }
          checkbox.value = !checkbox.value // Change Specific Model Element
          self.render() // re-render Component
        })
      })
    })

    ConfigureModel.numericFields.forEach((inputEle) => {
      const perPageEntryEle = document.getElementById(`custom-${inputEle.name}`)
      perPageEntryEle.addEventListener('change', (e) => {
        e.preventDefault()
        inputEle.value = e.target.value
        self.render() // re-render Component
      })
    })

    // Async load data-table module, after Submit clicked
    document
      .getElementById('form-submission-button')
      .addEventListener('click', (e) => {
        e.preventDefault()
        import(
          /* webpackChunkName: "data-table" */ '../datatable/datatable.module'
        )
          .then((lazyModule) => {
            lazyModule.DataTableModule.init()
          })
          .catch((err) => {
            console.log('Error while Loading Data Table Module', err.message)
          })
      })
  }
}
