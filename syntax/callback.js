function a(){
  console.log('A');
}

const b = function (){
  console.log('A')
}

a();
b();

function slowfunc(callback){
  callback();
}

slowfunc(b);