const o = {
  v1: 'v1',
  v2: 'v2',
  f1: function (){
    console.log(this.v1);
  },
  f2: function f2(){
    console.log(this.v2);
  },
  f3: function f3(){
    console.log(this.v3);
  }
}
o.f1();
o.f2();
o.f3();
