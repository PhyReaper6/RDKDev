import Api from "../../lib/Api.js";
import Loader from "../loader/Loader.js";
import Browse from "./browse/Browse.js"
import Details from "./details/Details.js";
import Menu from "./menu/Menu.js";
import DStvNowHomeBrowse from "./browse/DStvNowHomeBrowse.js"
import App from "../App.js";

export default class DStvNowApp extends ux.App {

    static getFonts() {
        return [
            {family: 'RobotoBold', url: DStvNowApp.getPath('fonts/Roboto-Bold.ttf'), descriptors: {}},
            {family: 'RobotoRegular', url: DStvNowApp.getPath('fonts/Roboto-Regular.ttf'), descriptors: {}}
        ];
    }

    static _template() {
        return {     
            Background:
            {
                x:0,y:0,w:1920,h:1080, src: this.getPath("blue_backgroundGradient.jpg")
            },          
            DStvNowMovies:{
                type: Browse, x: 430, y: 150, alpha: 0
            },
            DStvNowSeries:{
                type: Browse, x: 430, y: 150, alpha: 0
            },
            DStvNowHomeContent:{
                type: DStvNowHomeBrowse, x: 430, y: 150, alpha: 0
            },         
            Details:{
                type: Details, signals:{detailsLoaded:"_loaded"}, alpha: 0.001
            },
            Loader:{
                type: Loader, alpha: 0
            },
            MenuBackground:
            {
                rect: true, color: 0xFF000000, x:0 ,y:0, w: 350, h: 1080
            },
            Menu:{
                type: Menu, x: 100, y: 200, signals:{select: true}
            },
            Logo:{
                src:App.getPath("DStv_White.png"), y: 60, x:70,w:220,h:50
            }
            
        };
    }

    _construct(){
        this._api = new Api();
    }

    _init(){
        this._setState("Menu");
    }

    $api(){
        return this._api;
    }

    $onItemSelect({item}){
        //this._setState("Loading");
        //this.tag("Details").asset = item;
    }

    _populate(data){
        data.forEach((props)=>{
            this.tag(props.ref).data = props.data;
        });
    }

    _handleBack(){
        this._setState("Menu");
    }

    static _states(){
        return [
           /* class Splash extends this{
                $enter(){
                    this.tag("Splash").setSmooth("alpha",1);
                    this._api.getDStvNowAppData().then((data)=>{
                        this.tag("Splash").startAnimation();
                        this._populate(data);
                    })
                }
                animationFinished(){
                    this._setState("Movies");
                    this.tag("Menu").setSmooth("y", 50);
                }
            },*/
            class Loading extends this {
                _captureKey(){
                    // capture
                }
                $enter({prevState}){
                    this._DStvNowAppReturnState = prevState;
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
            class Menu extends this {
                $enter(){
                    //this._menuReturnState = prevState;
                    this.tag("Menu").setSmooth("alpha",1);
                    this._api.getDStvNowAppData().then((data)=>{
                        this._populate(data);
                        this.tag("DStvNowHomeContent").setSmooth("alpha",1);
                    });
                   
                }
                $exit(){
                    this.tag("Menu").setSmooth("alpha",0.5);
                }
                _getFocused(){
                    return this.tag("Menu");
                }
                /*_handleDown(){
                    this._setState(this._menuReturnState);
                }*/
                select({item, focus}){
                    const {ref} = item;
                    if(this.tag(ref)){
                        //this.tag(this._menuReturnState).setSmooth("alpha",0);
                        if(!focus)
                            this._setState(ref);
                        else
                        {
                            this.tag("DStvNowMovies").setSmooth("alpha",0);
                            this.tag("DStvNowSeries").setSmooth("alpha",0);
                            this.tag("DStvNowHomeContent").setSmooth("alpha",0);
                            this.tag(ref).setSmooth("alpha",1);
                        }
                    }
                }
            },
            class DStvNowHomeContent extends this{
                $enter(){
                    this.tag("DStvNowHomeContent").setSmooth("alpha",1);
                }
                $exit({newState}){
                    this.tag("DStvNowHomeContent").setSmooth("alpha",newState==="Menu"?1:0);
                    this.tag("DStvNowHomeContent").setSmooth("alpha",0);
                }
                _getFocused(){
                    return this.tag("DStvNowHomeContent");
                }
            },
            class DStvNowMovies extends this{
                $enter(){
                    this.tag("DStvNowMovies").setSmooth("alpha",1);
                    this.tag("DStvNowHomeContent").setSmooth("alpha",0);
                }
                $exit({newState}){
                    this.tag("DStvNowMovies").setSmooth("alpha",newState==="Menu"?1:0);
                    this.tag("DStvNowMovies").setSmooth("alpha",0);
                    
                }
                _getFocused(){
                    return this.tag("DStvNowMovies");
                }
            },
            class DStvNowSeries extends this{
                $enter(){
                    this.tag("DStvNowSeries").setSmooth("alpha",1);
                    this.tag("DStvNowHomeContent").setSmooth("alpha",0);
                }
                $exit({newState}){
                    this.tag("DStvNowSeries").setSmooth("alpha",newState==="Menu"?1:0);
                    this.tag("DStvNowSeries").setSmooth("alpha",0);
                    
                }
                _getFocused(){
                    return this.tag("DStvNowSeries");
                }
            },
            class Details extends this {
                $enter(){
                    this.tag("Details").setSmooth("alpha", 1);
                }
                $exit(){
                    this.tag("Details").setSmooth("alpha", 0.001);
                }
                _handleBack(){
                    this._setState(this._DStvNowAppReturnState);
                }
                _getFocused(){
                    return this.tag("Details");
                }
            }
        ]
    }
}






