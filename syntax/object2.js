var f = function f1 (){
  console.log(1)
  console.log(2)
}
var a = [f];

console.log(a);
a[0]();

var o = {
  func: f
}
o.func();