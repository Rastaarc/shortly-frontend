const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
                '@primary-color': '#00a7c9',
                '@link-color': '@primary-color',// link color
                '@success-color': '#59ca42', // success state color
                '@warning-color': '#fabf3e', // warning state color
                '@error-color': '#f16059', // error state color
                '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
                '@text-color': '#476076', // major text color
                '@text-color-secondary': 'rgba(0, 0, 0, 0.45)' // secondary text color
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};