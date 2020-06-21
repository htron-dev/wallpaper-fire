# Wallpaper-fire


App electron to have video wallpaper in linux.

|<img src="https://raw.githubusercontent.com/htron-dev/wallpaper-fire/master/docs/assets/images/print-1.png" width="100%" /> |  <img src="https://raw.githubusercontent.com/htron-dev/wallpaper-fire/master/docs/assets/images/print-2.png" width="100%" /> | <img src="https://raw.githubusercontent.com/htron-dev/wallpaper-fire/master/docs/assets/images/print-3.png" width="100%" />
|:-------------------------:|:-------------------------:|:-------------------------:|

All I do is just put a layer with some feautures in a plugin called [Smart Video Wallpaper](https://store.kde.org/p/1316299/), this app won't work so good without this plugin so my very thanks to the creator.

## Features
- Video wallpaper
- Playlist

## Compatibility
- [x] KDE plasma
- [ ] Ubuntu GNOME

## Installation
1 - Step one [click here](https://store.kde.org/p/1316299/) to see the last avaliable release.

2 - Dowload the .appimage and just execute the file and it is ready

3 - If you not have the Smart Video Wallpaper plugin the app will alert you to install because is an important things to the app works correcly


## Usage

  * In first page you can add new wallpapers, edit, and also set sey they as your descktop live wallpaper.
  * The tab Playlist is where you will create and manage the playlists.
  * Settings page brings some app informations and dependences required for the module that you are using.


## Development Setup
```
npm install
```

### Run Electron app in prodction mode with dist files
```
npm start
```
### Run Electron app server in development mode using server url

```
npm run dev
```
***obs:*** All vue cli features works like auto-realod, hot-relaod, etc, but you need to await the server be ready and also reload the app when its done, use the button in top of app.

### Compiles files in dist folder
```
npm run build
```

### Run unit tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
### Generate .snap app and .appimage
```
npm run deploy
```
