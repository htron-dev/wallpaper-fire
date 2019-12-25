import Vue from "vue"
import Vuex from "vuex"
const { remote, dialog } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appPath: remote.app.getAppPath(),
    videosPath: remote.app.getPath("videos") + "/wallpaper-fire",
    videos: []
  },
  mutations: {
    SET_VIDEOS(state, newVideos){
      state.videos = newVideos;
    }
  },
  actions: {
    async setVideos({state, commit}){
      
      const files = fs.readdirSync(state.videosPath);      
      commit("SET_VIDEOS", files);      
    },
    async addVideo({state, dispatch}){
      const options = { 
        properties: [ 'openFile', 'multiSelections']        
      };

      const file = await remote.dialog.showOpenDialog(options);
      if(file.canceled){
        return
      }
      const filePath = file.filePaths[0];
      const fileName = path.basename(filePath);
      
      const copy = fs.copyFileSync(filePath, `${state.videosPath}/${fileName}`);
      
      if(copy){
        throw new Error(copy);
      }

      dispatch("setVideos");
      
    },
    async deleteVideo({state, dispatch}, fileName){      
      
      const filePath = `${state.videosPath}/${fileName}`;
      
      const deleteFile = fs.unlinkSync(filePath);
      
      if(deleteFile){
        console.log(fileName);
      }

      dispatch("setVideos");

    }
  },
  modules: {
  }

});