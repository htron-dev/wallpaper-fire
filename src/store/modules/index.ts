import camelCase from 'lodash/camelCase';

// get all modules
const requireModule = require.context('.', true, /\.ts$/)

const modules: any = {}

requireModule.keys().forEach(fileName => {
    if (fileName === './index.ts') return
    
    // Replace ./ and .ts
  const path = fileName.replace(/(\.\/|\.ts)/g, '')
  const [moduleName, imported] = path.split('/')

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true
    }
  }

  modules[moduleName][imported] = requireModule(fileName).default
});

export default modules
