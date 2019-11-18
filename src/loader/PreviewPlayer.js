import App from "../App.js";
import Player from "../components/player/Player.js";
import PlayerProgress from "../components/player/PlayerProgress.js";

export default class StartupVideo extends lng.Component{

    static _template(){
        return {
            Player: {
                type: Player
            }   
        };
    }

    _init() {
        this._setState("Playing")    
    }

    _register(){
        this._reveal.on("finish",()=>{
            this.signal("animationFinished");
        });
    }

     // this method gets invoked everytime the focuspath is being re-calculated
    // and it holds a 'global' settings object. The mediaplayer needs to know
    // which component is the consumer (responsible for handing over streams
    // and accepting events from the mediaplayer)
    _setFocusSettings(settings) {
        if(this.state === "Playing") {
            settings.mediaplayer.consumer = this.tag("Player")
        }
    }

    static _states(){
        return [
            class Playing extends this{
                // delegate focuspath to the player
                _getFocused() {
                    return this.tag("Player")
                }
            }           
        ];
    }
}