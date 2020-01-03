import { RootState } from "@/store";
import {MutationTree } from "vuex";

const mutations: MutationTree<RootState> = {
    
    SET_VIDEOS(state, newVideos){
        state.videos.all = newVideos;
    },
    SET_CURRENT_VIDEO(state, path){
        state.videos.current = path;
    }
      
}

export default mutations;