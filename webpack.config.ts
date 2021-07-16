import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration;
}

export default (env: any, { mode }: { mode: 'production' | 'development' }) => {
  const isProduction = mode === 'production';
  const isDevelopment = !isProduction;

  const config: Configuration = {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  isDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: isDevelopment
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        favicon: path.resolve(__dirname, 'favicon.ico'),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean) as any,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.png'],
      alias: {
        '@brunhild': path.resolve(__dirname, 'src'),
      },
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000,
      historyApiFallback: true,
      hot: true,
      clientLogLevel: 'none',
      compress: true,
    },
  };

  return config;
};
