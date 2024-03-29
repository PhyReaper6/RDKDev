import DStvNowApp from "../DStvNowApp.js";

export default class MainSliderItem extends lng.Component{
    static _template(){
        return {
            rect: true, color: 0xffffffff, w: 390, h: 556, scale:0.25
            
            ,
            
            transitions:{scale:{duration:0.3, delay:0.00}}
        }
    }

    set item(v){
        this._item = v;
        this.patch({
            src:DStvNowApp.getPath(`${v.path}/posterS.jpg`)
        });
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1.2);
    }

    _unfocus(){
        this.setSmooth("scale",1);
    }

    static _states(){
        return [

        ]
    }

    static get width(){
        return 390;
    }

    static get height(){
        return 556;
    }
}