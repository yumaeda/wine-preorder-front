const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');
const exec = require('child_process').exec;

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new TSLintPlugin({
            files: [ './src/**/*.ts' ]
        }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec('cp index.php ./dist', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });

                    exec('cp ./src/app.js ./dist', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });

                    exec('cp -r ./src/controller ./dist', (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        }
    ],
    output: {
        filename: 'index.min.js',
        path: path.resolve(__dirname, 'dist')
    }
};

