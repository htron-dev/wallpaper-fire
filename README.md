# Wallpaper-fire


This is an app electron to have video wallpaperlinux.
```diff
- Still is not completly ready, but you can have a look of how the app is
```
You can see the current status in the [Kanaban](https://github.com/htron-dev/wallpaper-fire/projects/2) of the project in "Projects tab"

<a target="_blank" href="https://www.youtube.com/watch?v=WL7wtfSnvZs">
  <img title="See video" src="https://img.youtube.com/vi/WL7wtfSnvZs/maxresdefault.jpg" width="100%" />
</a>


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

2 - Dowload one of the app install file, .snap or .appimage
  * Appimage: just execute the file and it is ready
  * Snap: in terminal execute ```snap install <PATH_TO_APP_SNAP_FILE> --dangerous // <-this is a flag to say to install from local package```

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
### Run Electron app server in development mode width src files

```
npm run dev
```
***obs:*** All vue cli features works like auto-realod, hot-relaod, etc, but you need to await the server be ready and also reload the app when its done, use the button in top of app.

### Compiles files in dist folder
```
npm run build
```

### Generate .snap app and .appimage
```
npm run deploy
```

### Run your unit tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
