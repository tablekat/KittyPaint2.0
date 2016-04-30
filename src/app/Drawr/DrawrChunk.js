
import DrawrBrushManager from './DrawrBrushManager';

class DrawrChunk{

  constructor(drawrMap){
    this.drawrMap = drawrMap;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width = drawrMap.chunkWidth;
    this.canvas.height = this.height = drawrMap.chunkHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;

  }

  drawBrush(localX, localY, brush){
    brush.render(this.ctx, localX, localY);
  }

  load(chunkX, chunkY){
    console.log("Server not enabled. todo.");
    //var url = "http://" + server + "/chunk?" + numx + "&" + numy + "&" + Math.random();
    //this.setImageUrl(url);
  }

  loadImage(url){
    var img = new Image();
    img.src = url;

    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.width, this.height);
    };
  }

}

export default DrawrChunk;
