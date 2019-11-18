import App from "../App.js";
import Details from "../details/Details.js";

export default class Splash extends lng.Component{

    static _template(){
        return {
            Background:{
                x:0,y:0,w:1920,h:1080, src:App.getPath("Splash.jpg")
            },
            GenericBackground:{
                //src:App.getPath("gradient.png"), scale:1.1, w:1920, h:1080, y: 1000, x:200, rotation: -0.3
                x: 0, y: 900, w: 1920, h: 200, rect: true, color: 0x00000000
            },
            Logo:{
                src:App.getPath("DStv_White.png"), y: 750, x:100,w:400,h:100,scale:1,//the DSTV Logo on the Home Left tab
            }
        };
    }

    _init(){
        this._setState("Loading");
        this._createAnimations();
        this._register();
    }

    _createAnimations(){
        this._reveal = this.animation({
            duration:5, repeat: 0, delay:1.25, actions:[
                {t:'Background', p:'y', v:{0.20:0,1:-2850}},
                {t:'Background', p:'alpha', v:{0:1,1:0}},
                //{t:'Background', p:'rotation', v:{0.5:-0.3,1:0}},
                //{t:'GenericBackground', p:'scale', v:{0.6:1.1,1:1}},
               // {t:'GenericBackground', p:'y', v:{0:1000,1:0}},
               // {t:'GenericBackground', p:'x', v:{0:200,1:0}},
                {t:'Logo', p:'x', v:{0:100,1:2800}},
                //{t:'Logo', p:'scaleX', v: { 0: {v: 1, s: 1}, 0.5: {v: -1, s: 1}, 1: {v: 1, s: 1}}},
            ]
        });
    }

    _register(){
        this.setSm
        this._reveal.on("finish",()=>{
            this.signal("animationFinished");
        });
    }

    startAnimation(){
        this._start();
    }

    static _states(_updateDetails){
        return [
            class Loading extends this{
                _start(){
                    this._reveal.start();
                }
            },
            class Error extends this{
                $enter(){
                    // signal error & retry
                }
                $exit(){
                    // signal that we exit Error state
                }
            }
        ];
    }
    
}