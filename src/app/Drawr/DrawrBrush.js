
class DrawrBrush{

  constructor(){
    // Only one brush for now~!
  }

  getRadius(){
    // effective radius!
    return 16; // todo: more. this would be for a 32x32 brush
  }

  render(ctx, offsetX, offsetY){
    ctx.fillStyle = "black";
    ctx.fillRect(offsetX - 2, offsetY - 2, 4, 4);
  }

}

export default DrawrBrush;
