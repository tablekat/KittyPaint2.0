

class Drawr{

  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.updateSize();
  }

  updateSize(){
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

}

export default Drawr;
