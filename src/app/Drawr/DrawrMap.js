
var CHUNK_WIDTH = 256;
var CHUNK_HEIGHT = 256;

import DrawrChunk from './DrawrChunk';

function mod(m, n) {
  return ((m % n) + n) % n;
}

class DrawrMap{

  constructor(){
    this.chunkWidth = CHUNK_WIDTH;
    this.chunkHeight = CHUNK_HEIGHT;

    this.perPixelScaling = 2; // 2x2
    this.chunkScreenWidth = this.chunkWidth * this.perPixelScaling;
    this.chunkScreenHeight = this.chunkHeight * this.perPixelScaling;

    this.chunks = {};

    this.offsetX = 0; // In screen pixels
    this.offsetY = 0;
  }

  worldOffsetX(){
    return Math.floor(this.offsetX / this.perPixelScaling);
  }
  setWorldOffsetX(offsetX){
    this.offsetX = offsetX * this.perPixelScaling;
  }
  worldOffsetY(){
    return Math.floor(this.offsetY / this.perPixelScaling);
  }
  setWorldOffsetY(offsetY){
    this.offsetY = offsetY * this.perPixelScaling;
  }

  moveX = function(dx){
    this.offsetX += dx;
  }
  moveY = function(dy){
    this.offsetY += dy;
  }

  isChunkLoaded(chunkX, chunkY){
    return
      this.chunks.hasOwnProperty(chunkX) &&
      this.chunks[chunkX].hasOwnProperty(chunkY) &&
      this.chunks[chunkX][chunkY] instanceof DrawrChunk;
  }

  loadChunk(chunkX, chunkY){
    if(!this.chunks.hasOwnProperty(chunkX)){
      this.chunks[chunkX] = {};
    }
    if(!this.isChunkLoaded(chunkX, chunkY)){
        this.chunks[chunkX][chunkY] = new DrawrChunk(this);
    }
    this.chunks[chunkX][chunkY].load(chunkX, chunkY);
  }

  setChunk(chunkX, chunkY, binImg){
    var base64url = "data:image/png;base64," + btoa(binImg);
    if(!this.chunks.hasOwnProperty(chunkX)){
        this.chunks[chunkX] = {};
    }
    if(!this.isChunkLoaded(chunkX, chunkY)){
        this.chunks[chunkX][chunkY] = new DrawrChunk(this);
    }
    this.chunks[chunkX][chunkY].setImageUrl(base64url);
  }

  unloadChunk(chunkX, chunkY){
    if(this.isChunkLoaded(chunkX, chunkY)){
      delete this.chunks[chunkX][chunkY];
    }
  }

  foreachChunk = function(callback){
    for(var numx in this.chunks){
      if(this.chunks.hasOwnProperty(numx)){
        for(var numy in this.chunks[numx]){
          if(this.chunks[numx].hasOwnProperty(numy)){
            if(this.isChunkLoaded(numx,numy)){
              callback(this.chunks[numx][numy], numx, numy);
            }
          }
        }
      }
    }
  }

  refresh(viewerRadius){
    this.chunks = {};
    this.loadNearbyChunks(viewerRadius);
  }

  loadNearbyChunks(viewerRadius){
    // viewer_radius is max(screen width, screen height), and is approximately 1 "screen length"
    // load all chunks within 1 screen length away from what is visible
    var worldX = -this.worldOffsetX();
    var worldY = -this.worldOffsetY();
    var worldRadius = viewerRadius / this.perPixelScaling;

    var chunkMinX = Math.floor((worldX -     worldRadius) / this.chunkWidth);
    var chunkMaxX = Math.floor((worldX + 2 * worldRadius) / this.chunkWidth);
    var chunkMinY = Math.floor((worldY -     worldRadius) / this.chunkHeight);
    var chunkMaxY = Math.floor((worldY + 2 * worldRadius) / this.chunkHeight);

    // Load from the center out
    var centerX = Math.floor((chunkMaxX + chunkMinX)/2);
    var centerY = Math.floor((chunkMaxY + chunkMinY)/2);
    var totalLayers = Math.max(chunkMaxX - centerX, chunkMaxY - centerY) + 1;

    var chunksWritten = [];
    var load = (x, y) => {
      var chunkId = x + ":" + y;
      if(chunksWritten.indexOf(chunkId) >= 0) return;
      chunksWritten.push(chunkId);
      if(!self.isChunkLoaded(x, y)){
        self.loadChunk(x, y);
      }
    };

    for(var layer = 0; layer < total_layers; ++layer){
      var y_top = centerY - layer;
      var y_bot = centerY + layer;
      var x_left = centerX - layer;
      var x_right = centerX + layer;
      // load top and bottom rows of this layer, around already loaded layers
      for(var x = x_left; x <= x_right; ++x){
          load(x, y_top);
          load(x, y_bot);
      }
      // load left and right sides of this layer, around already loaded layers
      for(var y = y_top; y <= y_bot; ++y){
          load(x_left, y);
          load(x_right, y);
      }
    }
  }

  freeFarChunks(viewerRadius){
    var worldX = -this.worldOffsetX();
    var worldY = -this.worldOffsetY();
    var worldRadius = viewerRadius / this.perPixelScaling;

    // TODO: make this configurable
    var chunkMinX = Math.floor((worldX - 2 * worldRadius) / this.chunkWidth);
    var chunkMaxX = Math.floor((worldX + 3 * worldRadius) / this.chunkWidth);
    var chunkMinY = Math.floor((worldY - 2 * worldRadius) / this.chunkHeight);
    var chunkMaxY = Math.floor((worldY + 3 * worldRadius) / this.chunkHeight);

    this.foreachChunk((chunk, numx, numy) => {
      if(numx < chunkMinX || numy < chunkMinY ||
         numx > chunkMaxX || numy > chunkMaxY){
           this.unloadChunk(numx, numy);
         }
    });

  }

  drawBrush(x, y, brush){
    x = x - this.offsetX;
    y = y - this.offsetY;

    var worldX = Math.floor(x / this.perPixelScaling);
    var worldY = Math.floor(y / this.perPixelScaling);

    var chunksAffected = this.getChunksAffected(worldX, worldY, brush);
    var chunksLocalCoords = this.getChunkLocalCoordinates(worldX, worldY, brush, chunksAffected);

    var chunksWritten = [];

    for(var i = 0; i < 4; ++i){
      if(!chunksAffected[i] || !chunksLocalCoords[i]) continue;

      var chunkX = chunksAffected[i].x;
      var chunkY = chunksAffected[i].y;
      var chunkId = chunkX + ":" + chunkY;
      if(chunksWritten.indexOf(chunkId) >= 0) continue;

      if(this.isChunkLoaded(chunkX, chunkY)){
        var chunk = this.chunks[chunkX][chunkY];
        var localX = chunksLocalCoords[i].x;
        var localY = chunksLocalCoords[i].y;

        chunk.drawBrush(localX, localY, brush);
      }
      chunksWritten.push(chunkId);
    }

    // TODO: emit draw event, so a server client can handle it!!
  }

  getChunkLocalCoordinates(worldX, worldY, brush, chunksAffected){
    // calculate pixel location in local coordinates of each of the 4 possible chunks.
    // getChunksAffected will always return in this order: topleft, bottomleft, topright, bottomright
    // Preserve this order in this return
    // this function will probably explode if brush size > this.chunk_block_size. that should never happen.

    var chunkGeneralLocalX = mod(worldX, this.chunkWidth); // these are correct for the chunk where the *CENTER OF THE BRUSH* is
    var chunkGeneralLocalY = mod(worldY, this.chunkHeight);

    var chunkX = Math.floor(worldX, this.chunkWidth); // calculate which chunk the *CENTER OF THE BRUSH* is in
    var chunkY = Math.floor(worldY, this.chunkHeight);

    var chunksLocalCoords = [];

    for(var i = 0; i < 4; ++i){
      if(chunksAffected[i]){
        var dx = chunkX - chunksAffected[i].x;
        var dy = chunkY - chunksAffected[i].y;
        var localX = chunkGeneralLocalX + dx * this.chunkWidth;
        var localY = chunkGeneralLocalY + dy * this.chunkHeight;
        chunksLocalCoords.push({ x: localX, y: localY });
      }else{
        chunksLocalCoords.push(null);
      }
    }

    return chunksLocalCoords;
  }

  getChunksAffected(worldX, worldY, brush){
    // To find chunks affected: find 1 or more chunks for each 4 points of the square mask of the brush
    // getChunksAffected will always return in this order: topleft, bottomleft, topright, bottomright
    // if one of those 4 chunks isn't loaded, log it, and its location in the return array will be null

    var chunksFound = [];
    var brushDelta = brush.getRadius();

    var brushXs = [worldX - brushDelta, worldX - brushDelta, worldX + brushDelta, worldX + brushDelta];
    var brushYs = [worldY - brushDelta, worldY + brushDelta, worldY - brushDelta, worldY + brushDelta];

    for(var i = 0; i < 4; ++i){
      var chunkX = Math.floor(brushXs[i] / this.chunkWidth);
      var chunkY = Math.floor(brushYs[i] / this.chunkHeight);
      if(this.isChunkLoaded(chunkX, chunkY)){
        chunksFound.push({ x: chunkX, y: chunkY });
      }else{
        chunksFound.push(null);
      }
    }

    return chunksFound;
  }

  render(ctx){
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;

    this.foreachChunk((chunk, chunkX, chunkY) => {
      var screenX = chunkX * this.chunkWidth + self.offsetX;
      var screenY = chunkY * this.chunkHeight+ self.offsetY;

      ctx.drawImage(chunk.canvas, screenX, screenY, this.chunkScreenWidth, this.chunkScreenHeight);
    });
  }

}

export default DrawrMap;
