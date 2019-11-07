import AppMainSliderItem from "./AppSliderItem.js";
import App from "../App.js";
import StartupVideo from "../loader/StartupVideo.js";


export default class AppSlider extends lng.Component {
    static _template(){
        return {
            Background:{
                w:1920, h:1080, y: 0, x:0 , alpha:0//, src:App.getPath("background.png")
            } ,
            alpha: 0.5,        
            Title:{
                text:{text:"", x: 100, y: 690, fontSize:40, fontFace:"verdana"}
            },
            Items:{
                x: 50, y:750
            },    
                 
        }
    }

    set data(v){
        const {label, data} = v;
        this.patch({
            Title:{
                text:{text:label.toUpperCase()}
            },
            Items:{
                children: data.map((item, idx)=>{
                    return {type: AppMainSliderItem, x:idx*350, item:item, scale:0.9}
                })
            }       
        });
    }

    _init(){
        this._index = 0;
    }

    _focus(){
        this.setSmooth("alpha",1);
        this._setState("Expanded");
        this._setIndex();
    }

    _unfocus(){
        this.setSmooth("alpha",0.5);
        this._setState("Collapsed");
    }

    get items(){
        return this.tag("Items").children;
    }

    get active(){
        return this.items[this._index];
    }

    _handleLeft(){
        if(this._index > 0){
            this._setIndex(this._index-1);
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this._setIndex(this._index+1);
        }
    }

    _handleEnter(){
        this.fireAncestors("$onItemSelect",{item:this.active.item});
    }

    _setIndex(index=this._index){
        this._index = index;
        /*
        this.patch({
            Items:{
                smooth:{x: !index?0:(index*-440)}
            }
        });*/

        this.tag("Background").setSmooth("alpha",0);
        
        if(this.active.item.title != "DStvNow")
        {
        this.tag("Background").x = -100;

                this.patch({
                    Background:{
                            smooth:{
                                x:[0, {duration: 5}], src:App.getPath(`${this.active.item.path}/backdrop.jpg`),
                                alpha: [1, {duration:3}]
                        }
                    },   
                }) 
            }
                 
    }

    _getFocused(){
        return this.active;
    }


    static _states(){
        return [
            class Expanded extends this{
                $enter(){
                    this.setSmooth("alpha",1);
                    this.items.forEach((item, idx)=>{
                        item.patch({
                            smooth:{
                                x: [idx * 480, {duration:0.3, delay:idx*0.04}],
                                scale: 1
                            }                       
                        });
                    });
           
                }
            },
            class Collapsed extends this{
                $enter(){
                    this.setSmooth("alpha",0.5);
                    this.items.forEach((item, idx)=>{
                        item.patch({
                            smooth:{
                                x: [idx * 350, {duration:0.3, delay:idx*0.03}],
                                scale: 0.9
                            }
                        });
                    });
                }
            }          
        ]
    }
}
