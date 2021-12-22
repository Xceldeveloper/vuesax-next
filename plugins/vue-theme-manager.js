import Vue from 'vue'
import VueThemeManager from 'vue-theme-manager'

let themeOptions = {
  activate: 'dark',
  styles: {
    light: {
      backgroundColor: '#ededed',
      textColor: '#101010',
      primary: '#5b3cc4'
    },
    dark: {
      backgroundColor: '#1e2023',
      textColor: '#fff',
      lightTextColor: '#b3b3b3',
      primary: '#5b3cc4'
    }
  }
}

Vue.use(VueThemeManager, themeOptions);
