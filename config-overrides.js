const {
    override,
    addBabelPlugins,
    addWebpackPlugin,
} = require('customize-cra');

const { InjectManifest } = require('workbox-webpack-plugin'); // Inject in Webpack

module.exports = (webpack, ...args) => {
    webpack.plugins.pop(); // remove GenerateSW plugin
    const overridenConf = override(
        addWebpackPlugin(
            new InjectManifest({
                swSrc: './src/service-worker.js',
                globDirectory: webpack.output.path,
                globPatterns: ['*.{png,ico}'],
            })
        ),
        ...addBabelPlugins(
            [
                'babel-plugin-root-import', // To use ~ in import
                {
                    rootPathSuffix: 'src',
                },
            ],
            "@babel/plugin-proposal-optional-chaining" // to use optional chaining
        )
    )(webpack, ...args);
    return overridenConf;
};
