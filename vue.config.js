const path = require('path')
const ip = require('ip')
const fs = require('fs')

fs.writeFile('./src/ip.js', `export const IP = '${ip.address()}'\n`, function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('The IP was saved!')
})

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        styles: path.resolve(__dirname, 'src/styles/settings.scss')
      }
    }
  }
}
