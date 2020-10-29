// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
 
// module.exports = {
//   chainWebpack: config => {
//     config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
//       {
//         // Languages are loaded on demand at runtime
//         languages: ['json', 'javascript', 'html', 'xml', 'latex']
//       }
//     ])
//   }
// }

module.exports = {
  chainWebpack: config => {
      config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
}