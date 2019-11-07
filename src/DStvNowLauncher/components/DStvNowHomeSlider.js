import SmallSliderItem from "./SmallSliderItem.js";
import DStvNowApp from "../DStvNowApp.js"

export default class DStvNowHomeSlider extends lng.Component {
    static _template(){
        return {
            alpha: 0.5, 
            Details:{
                x: 0, y: 100, flex:{direction:"row"}, alpha: 0,
                Poster:{
                    flexItem:{
                        marginRight: 150
                    }
                },
                Metadata:{  
                    flex: {
                        direction: "column"
                    },
                    Title:{
                      
                    },
                    Year:{
                        
                    },
                    Info:{
                        
                    }
                }
            },
            BackroundBlur:
            {
               x: -100, y: -300, w: 1920, h: 1080, rect: true, colorLeft: 0x000000, colorRight: 0xFF000000
            } ,             
            Items:{
                y:500
            },
            RowTitle:{
                text:{text:"This is where hfdgdfgdgdfgdfg", fontSize:40, fontFace:"verdana", y:400, x:500, w:1000}
            }
        }
    }

    set data(v){
        const {label, data} = v;  
        this.patch({
            RowTitle:{
                smooth:{
                //text:{text:label.toUpperCase()}
                    text:{text:"This is where",y:400, x:500, w:1000}
                }
            },
            Items:{
                children: data.map((item, idx)=>{
                    return {type: SmallSliderItem, x:idx*350, item:item, scale:0.9}
                })
            }          
        });
    }

    _init(){
        this._index = 0;
        this._setIndex(this._index);
        
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
        this.patch({
            Items:{
                smooth:{x: !index?0:(index*-350)}
            }
        });

        var path = this.active.item.path
        
        this.patch({
                    Poster:{
                            smooth:{
                                x:[700, {duration: 1}], src:DStvNowApp.getPath(`${path}/backdrop.jpg`),
                                alpha: [1, {duration:1}], w:880, h:480
                                },
                           
                        },
                    Metadata:{                        
                        flex: {
                            direction: "column", 
                        },
                        Title:{ 
                                smooth:{
                                    x:[0, {duration: 1}],
                                    text:{
                                        w:670,
                                        fontSize:38,
                                        textStyle:"bold",
                                        text:this.active.item.title
                                        },
                                    alpha: [1, {duration:1}]
                                    }
                            },  
                        Year:{  
                            smooth:{
                                x:[0, {duration: 1}], 
                                text:{
                                    w:670,
                                    fontSize:30,
                                    text:this.active.item.year
                                    },
                                    alpha: [1, {duration:1}]
                                }
                        },  
                        Info:{
                            smooth:{
                                x:[0, {duration: 1}], 
                                text:{
                                    w:670,
                                    fontSize:30,
                                    maxLines:6,
                                    text:this.active.item.info
                                    },
                                    alpha: [1, {duration:1}]                            
                                }
                        }  
                    },
                    BackroundBlur:
                        {
                        //x: 0, y: 0, w: 700, h: 1080, rect: true, colorLeft: 0x000000, colorRight: 0xFF000000
                        }               
             })
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
                                x: [idx * 350, {duration:0.3, delay:idx*0.04}],
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
