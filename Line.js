/*
Line class has two purposes. First to draw the specific Line to the canvas. Second to 
generate children lines which erects another equilatoral triangle from the middle third
of Line instance. 
*/ 
class Line {
 /*
 Constructer which simply gets the start(a) and end(e) points of a line. The start and end 
 points are a and e because points b,c,d are reserved for the child triangle which will 
 grow from the middle third of this line instance. 
 */ 
  constructor(a, e) {
    this.a = a.copy();
    this.e = e.copy();
  }
 /*
 createChildren method turns the single line instance into 4 line instances with an equalitaorial
 triangle (lacking a base) erecting from the middle third of line instance. All stored within an array 
 of Line objects. We use vectors as hold direction and magnitude. Returns an array of Line objects. 
 */ 
 createChildren() {
   //Array to hold children Line objects of current Line
    let children = [];
    //length represents the length of this Line
    let length = p5.Vector.sub(this.e, this.a);
    //Turn length into thirds
    length.div(3);
    // Point b is a plus one third 
    let b = p5.Vector.add(this.a, length);
    children[0] = new Line(this.a, b);
    // Point d is e(end) minus 1 third
    let d = p5.Vector.sub(this.e, length);
    children[3] = new Line(d, this.e);
    //Since we are working with equilatoral triangles each point is on an angle 60 degrees or PI/3. 
    //Need -PI as graphics coordinates are flipped
    length.rotate(-PI/3);
    //point c is top of erecting equilatorial triangle
    let c = p5.Vector.add(b,length);
    children[1] = new Line(b, c);
    children[2] = new Line(c, d);
    return children;
  }
  
  /*
  Show() method simply draws current instance of Line to Canva using stored points. 
  */ 
  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.e.x,this.e.y);
  }
}