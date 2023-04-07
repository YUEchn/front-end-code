function a(test) {
    console.log(arguments);
  console.log(test);
}
var b = a.bind(this, "xxx");
var c = b.bind(this, "yyy");
c();
