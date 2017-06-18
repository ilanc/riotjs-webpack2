# Webpack2 & riotjs

## How to run
```bash
npm install
npm start
```
- Open [http://localhost:3000/](http://localhost:3000/)
- Open [http://localhost:3000/webpack-dev-server/](http://localhost:3000/webpack-dev-server/) for dev server with hot reloading.

## Problems
* Have to manually copy `<img src>` to webpack output path
  * i.e. `<img src="svg-logo-h.svg" height="30" />` in `app\random.tag`
  * must manually copy `app\svg-logo-h.svg` to `public\svg-logo-h.svg`
