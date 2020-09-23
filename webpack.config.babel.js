import Config, { environment } from 'webpack-config';

environment.setAll({
  env: () => process.env.NODE_ENV
});

export default new Config().extend('conf/webpack.production.config.js');

//https://habrahabr.ru/post/324232/

