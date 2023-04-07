const obj = {
  a: {
    b: {
      c: {},
      d: {},
    },
    e: {
      f: "e",
    },
  },
  d: "e",
  e: {
    f: {},
  },
};

function getPath(obj) {
  let res = [];

  function get(o, comb) {
    
    if(JSON.stringify(o) === '{}'){
        res.push([...comb]);
    }

    for (let i in o) {
      if (o.hasOwnProperty(i)) {
        if (typeof o[i] === "object") {
          comb.push(i);
          get(o[i], comb);
          comb.pop()
        } else {
          res.push([...comb, i]);
        }
      }
    }
  }

  get(obj, [])

  return res;
}

let a = getPath(obj)
console.log(a);
