import { AppModel } from './app.model'
import { AppTemplate } from './app.template'

export const AppComponent = {
  init() {
    this.appElement = document.getElementById('app')
    this.initEvents()
    this.render()
  },

  initEvents() {
    this.appElement.addEventListener('click', (e) => {
      e.preventDefault()
      if (e.target.className === 'btn-configure-table') {
        import(
          /* webpackChunkName: "configure-form" */ './configure/configure.module'
        )
          .then((lazyModule) => {
            lazyModule.configureModule.init()
          })
          .catch((err) => {
            console.log(
              'Error while Loading Configure Form Module',
              err.message
            )
          })
      }
    })

    document
      .getElementsByClassName('banner')[0]
      .addEventListener('click', (e) => {
        e.preventDefault()
        this.render()
      })
  },

  render() {
    this.appElement.innerHTML = AppTemplate(AppModel)
  }
}
