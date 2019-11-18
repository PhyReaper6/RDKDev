import PlayerProgress from "./PlayerProgress.js";
import App from "../../App.js"

export default class Player extends lng.Component {

    static _template() {
        return {
            ProgressBar: {
                // player control
            },
            Play: {
                // player control
            },
            Stop: {
                // player control
            }
        }
    }
 
    // this method gets invoked everytime the focuspath is being re-calculated
    // and it holds a 'global' settings object. The mediaplayer needs to know
    // which component is the consumer (responsible for handing over streams
    // and accepting events from the mediaplayer)
    _setFocusSettings(settings) {
        
        settings.mediaplayer.consumer = this;       
    
}

    // getMediaplayerSettings can return an object
    // the mediaplayer expects an object with a stream property
    // this method will be invoked on every focus path change or you can force it
    // via: this.application.updateFocusSettings()

    getMediaplayerSettings() {
        return {
            
            stream: { src: App.getPath(`DStv_Promo_(The_Greatest_Show).mp4`) }
        }
    }

}

