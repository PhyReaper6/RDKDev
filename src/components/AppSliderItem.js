import App from "../App.js";
import Player from "./player/Player.js";

export default class AppMainSliderItem extends lng.Component{
    static _template(){
        return {
            rect: true, color: 0xffffffff, w: 384, h: 216, scale:1,
            transitions:{scale:{duration:0.3, delay:0.05}},

            Player:{
                type: Player, x: 0, y: 0, w:1920, h:1080
            },
            
      
        }
    }

    set item(v){
        this._item = v;
        this.patch({
            src:App.getPath(`${v.path}/App.jpg`)                            
        });

        
    }

    get item(){
        return this._item;
    }

    _focus(){
            if(this._item.title == "DStvNow") 
            {            
                //this.setSmooth("alpha",1);
                this._setState("StartVideo");                           
            }
            else{        
                this._setState("StopVideo");
            
        }
        this.setSmooth("scale",1.3);
    }


    _unfocus(){
        this.setSmooth("scale",1);
    }

    static get width(){
        return 384;
    }

    static get height(){
        return 216;
    }

    static _states(){
        return [
                class StartVideo extends this{
                    $enter(){
                        this.tag("Player").setSmooth("alpha",1); 
                                                           
                        }  
                    _getFocused(){
                        return this.tag("Player");
                    }
                },   
                class StopVideo extends this{
                    $enter(){
                        this.tag("Player").setSmooth("alpha",0);           
                        }  
                }    
        ]
    }
}