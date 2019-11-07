import DStvNowApp from "../DStvNowApp.js";

export default class SmallSliderItem extends lng.Component{
    static _template(){
        return {
            rect: true, color: 0xffffffff, w: 280, h: 384, scale:1,
            transitions:{scale:{duration:0.3, delay:0.05}}
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
        return 216;
    }

    static get height(){
        return 384;
    }
}