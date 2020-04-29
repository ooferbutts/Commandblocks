

var t=this;
const resetspeed=0.2;
const speedmul=0.1;

t.global.setconvload=false;
t.global.setconvspeed=resetspeed;
t.global.setconvchanged=false;
t.global.setconvchangeda=false;

const setconvmodder = extendContent(MessageBlock, "setconvmodder", {
  buildConfiguration(tile, table){
    this.super$buildConfiguration(tile,table);
		table.addImageButton(Icon.undo, run(() => {

			this.setMessageBlockText(null,tile,resetspeed+"");
      t.global.setconvspeed=resetspeed;
      t.global.setconvload=true;
      t.global.setconvchanged=true;
      t.global.setconvchangeda=true;
		})).size(40);
	},
  placed(tile) {
		this.super$placed(tile);
    this.setMessageBlockText(null,tile,resetspeed+"");
	},
  update(tile){
    var n=Number(tile.ent().message);
    if(!t.global.setconvload){
      t.global.setconvspeed=n;
      t.global.setconvload=true;
      t.global.setconvchanged=true;
      t.global.setconvchangeda=true;
    }
    if(t.global.setconvspeed!=n) t.global.setconvspeed=n;
  },
  draw(tile){
    var i=Math.floor(Time.time() * t.global.setconvspeed * 8.0 * speedmul) % 4;
    if(i<0) i=Math.abs(i)%4;
    var n=Number(tile.ent().message);
    //print(n);
    Draw.rect(Core.atlas.find(this.name.substring(0,this.name.length-6)+"-0-"+i), tile.drawx(), tile.drawy());
    Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
  }
});
