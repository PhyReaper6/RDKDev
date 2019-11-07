import DstvNowHomeSlider from "../components/DStvNowHomeSlider.js";

export default class DStvNowHomeBrowse extends lng.Component{

    static _template(){
        return {
            Sliders:{
            }
        }
    }

    set data(v){
        this.patch({
            Sliders:{
                children: v.map((data, idx)=>{
                    return {type: DstvNowHomeSlider, data, y: idx * 680}
                })
            }
        });
    }

    _init(){
        this._index = 0;
    }

    get items(){
        return this.tag("Sliders").children;
    }

    get active(){
        return this.items[this._index];
    }

    _getFocused(){
        return this.active;
    }

    _handleLeft(){
        if(this._index > 0){
            this.setIndex(this._index - 1);
        }else{
            return false;
        }
    }

    _handleRight() {
        if (this._index < this.items.length - 1) {
            this.setIndex(this._index + 1);
        }
    }

    setIndex(index = this._index){
        this._index = index;
        this.patch({
            Sliders:{
                smooth:{y: !index ? 0 : index * -640}
            }
        });
    }
}