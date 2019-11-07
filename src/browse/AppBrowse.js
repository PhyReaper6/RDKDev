import AppSlider from "../components/AppSlider.js";
import Api from "../../lib/Api.js";
import DStvNowApp from "../DStvNowLauncher/DStvNowApp.js"

export default class AppBrowse extends lng.Component{

    static _template(){
        return {
        AppSliders:{              
            }        
        }
    }   

    set data(v){
        this.patch({           
            AppSliders:{
                children: v.map((data, idx)=>{
                    return {type: AppSlider, data, y: idx * 680}               
                })
            }      
        });
    }

    _init(){
        this._index = 0;  
    }

    get items(){
        return this.tag("AppSliders").children;
    }

    get active(){
        return this.items[this._index];
    }

    _getFocused(){
        return this.active;
    }

    $onItemSelect({item}){
        const {path, title} = item;

        this._setState(title);
        //this.tag("Details").asset = item;
    }

    _handleUp(){
        if(this._index > 0){
            this.setIndex(this._index - 1);
        }else{
            return false;
        }
    }

    _handleDown() {
        if (this._index < this.items.length - 1) {
            this.setIndex(this._index + 1);
        }
    }

    setIndex(index = this._index){
        this._index = index;
        this.patch({
            AppSliders:{
                smooth:{y: !index ? 0 : index * -640}
            }
        });
    }

    static _states(){
        return [
            class DStvNow extends this{
                $enter(){  

                    this.patch({
                            DStvNowApp:{
                                type: DStvNowApp, x:0, y:0, w:0, h:0
                                    }  
                                });  
                                   
                    this.tag("DStvNowApp").setSmooth("alpha",1);    
                                   
                    }
                _getFocused(){
                    return this.tag("DStvNowApp");
                }    
                },          
            ]     
        }
}