

export default class Menu extends lng.Component{

    static _template(){
        return {
            flex:{
                direction: "column"
            }
          };
    }

    _init(){
        this._index = 0;
       
        this.patch({
            Content:{
                type: MenuItem, item:{label:"Home", ref:"DStvNowHomeContent"}
            }
            
            
        });

        

        const movies = this.stage.c({
            type: MenuItem, item:{label:"Movies", ref:"DStvNowMovies"}
        });

        this.childList.add(movies);

        const shows = this.stage.c({
            type: MenuItem, item:{label:"Series", ref:"DStvNowSeries"}
        });

        this.childList.add(shows);
    }

    get items(){
        return this.children;
    }

    get active(){
        return this.items[this._index];
    }

    _handleUp(){
        if(this._index > 0){
            this.setIndex(this._index - 1)
        }
    }

    _handleDown(){
        if(this._index < this.items.length - 1){
            this.setIndex(this._index + 1)
        }
    }

    setIndex(index){
        this._index = index; 
        this.signal("select",{item:this.active.item, focus:true});  
        
    }

    _getFocused(){
        return this.active;
    }

    _handleEnter(){
        this.signal("select",{item:this.active.item, focus:false});
    }
}

class MenuItem extends lng.Component{
    static _template(){
        return {
           text:{fontSize:40, fontFace:"verdana",fontStyle:"bold"}, flexItem: {
                marginRight:60, marginTop:50}
            }
        }
    

    set item(v){
        this._item = v;
        this.text.text = v.label;
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1.3);
        this.patch({
            text:{fontSize:50, fontFace:"verdana",fontStyle:"bold"}, flexItem: {
                marginRight:60, marginTop:50, textColor:0x0095da }

        })
    }

    _unfocus(){
        this.setSmooth("scale",1);
        this.patch({
            text:{fontSize:40, fontFace:"verdana",fontStyle:"bold"}, flexItem: {
                marginRight:60, marginTop:50, textColor:0xFFFFFF}

        })
    }
}