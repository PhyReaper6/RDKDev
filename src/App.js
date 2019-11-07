import Api from "../lib/Api.js";
import Splash from "./loader/Splash.js";
import Loader from "./loader/Loader.js";
import Browse from "./browse/AppBrowse.js";
import Details from "./details/Details.js";
import Menu from "./menu/Menu.js";
import AppBrowse from "./browse/AppBrowse.js";
import StartupVideo from "./loader/StartupVideo.js";

export default class App extends ux.App {

    static getFonts() {
        return [
            {family: 'RobotoBold', url: App.getPath('fonts/Roboto-Bold.ttf'), descriptors: {}},
            {family: 'RobotoRegular', url: App.getPath('fonts/Roboto-Regular.ttf'), descriptors: {}}
        ];
    }

    static _template() {
        return {
            Splash:{
                type: Splash, signals:{animationFinished: true}, alpha: 0
            },            
            StartupVideo:{
                type: StartupVideo, x: 0, y: 0
            },
            AppLauncher:{
                type: AppBrowse, x: 0, y:0, alpha:0
            },
           /* TvShows:{
                type: Browse, x: 100, y: 150, alpha: 0
            },*/
           /* Menu:{
                type: Menu, x: 1550, y: -100, alpha:0.5, signals:{select: true}
            },
            /*Details:{
                type: Details, signals:{detailsLoaded:"_loaded"}, alpha: 0.001
            },*/
            Loader:{
                type: Loader, alpha: 0
            }
        };
    }

    _construct(){
        this._api = new Api();
    }

    _init(){
        this._setState("Splash");
       //this._setState("StartupVideo");
    }

    $api(){
        return this._api;
    }

    /*
    $onItemSelect({item}){
        this._setState("Loading");
        //this.tag("Details").asset = item;
    }*/

    _populate(data){
        data.forEach((props)=>{
            this.tag(props.ref).data = props.data;
        });
    }

    _handleUp(){
        this._setState("AppLauncher");
    }

    static _states(){
        return [
            class Splash extends this{
                $enter(){
                    this.tag("Splash").setSmooth("alpha",1);
                    this._api.getAppData().then((data)=>{
                        this.tag("Splash").startAnimation();
                        this._populate(data);
                    })
                }
                animationFinished(){
                    this._setState("AppLauncher");
                    this.tag("Splash").setSmooth("alpha", 0);
                }
            },
            class StartupVideo extends this{
                $enter(){
                    this.tag("StartupVideo").setSmooth("alpha",1);                    
                    }  
                _getFocused(){
                    return this.tag("StartupVideo");
                }
            },                   
            class Loading extends this {
                _captureKey(){
                    // capture
                }
                $enter({prevState}){
                    this._appReturnState = prevState;
                    this.tag("Loader").setSmooth("alpha",1);
                }
                $exit(){
                    this.tag("Loader").setSmooth("alpha",0);
                }
                _loaded(){
                    setTimeout(()=>{
                        this._setState("Details");
                    },2000);
                }
            },
            class AppLauncher extends this{
                $enter(){
                    this.tag("AppLauncher").setSmooth("alpha",1);
                }
                $exit({newState}){
                    this.tag("AppLauncher").setSmooth("alpha",newState==="Menu"?1:0);
                }
                _getFocused(){
                    return this.tag("AppLauncher");
                }
            },
            /*
            class Menu extends this {
                $enter({prevState}){
                    this._menuReturnState = prevState;
                    this.tag("Menu").setSmooth("alpha",1);
                }
                $exit(){
                    this.tag("Menu").setSmooth("alpha",0.5);
                }
                _getFocused(){
                    return this.tag("Menu");
                }
                _handleDown(){
                    this._setState(this._menuReturnState);
                }
                select({item}){
                    const {ref} = item;
                    if(this.tag(ref)){
                        this.tag(this._menuReturnState).setSmooth("alpha",0);
                        this._setState(ref);
                    }
                }
            },
            class Movies extends this{
                $enter(){
                    this.tag("Movies").setSmooth("alpha",1);
                }
                $exit({newState}){
                    this.tag("Movies").setSmooth("alpha",newState==="Menu"?1:0);
                }
                _getFocused(){
                    return this.tag("Movies");
                }
            },
           /* class TvShows extends this{
                $enter(){
                    this.tag("TvShows").setSmooth("alpha",1);
                }
                $exit({newState}){
                    this.tag("TvShows").setSmooth("alpha",newState==="Menu"?1:0);
                }
                _getFocused(){
                    return this.tag("TvShows");
                }
            },*/
           /* class Details extends this {
                $enter(){
                    this.tag("Details").setSmooth("alpha", 1);
                }
                $exit(){
                    this.tag("Details").setSmooth("alpha", 0.001);
                }
                _handleBack(){
                    this._setState(this._appReturnState);
                }
                _getFocused(){
                    return this.tag("Details");
                }
            }*/
        ]
    }
}






