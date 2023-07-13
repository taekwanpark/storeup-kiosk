# storeup-kiosk

An Electron application with Vue and TypeScript

---

## Create Project

```bash
$ npm create @quick-start/electron
```

```bash
# for npm 6.x
$ npm create @quick-start/electron my-app --template vue
```

```bash
# for npm 7+
$ npm create @quick-start/electron my-app -- --template vue
```

```bash
✔ Project name: … <electron-app>
✔ Select a framework: › vue
✔ Add TypeScript? … No / Yes
✔ Add Electron updater plugin? … No / Yes
✔ Enable Electron download mirror proxy? … No / Yes
```

Link: [electron-vite][electron-vite-link]

[electron-vite-link]: https://evite.netlify.app/guide/#scaffolding-your-first-electron-vite-project 'Go electron-vite'

---

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### Electron Development Server

```bash
$ npm install --save-dev electron-dev-runner
```

```javascript
module.exports = {
  server: {
    // dev server의 옵션을 설정합니다.
    // https 옵션을 true로 설정합니다.
    https: true
  }
}
```

### Packages

#### Virtual Keyboard

```javascript
$ npm i simple-keyboard
```
