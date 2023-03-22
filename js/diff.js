
const objA = {
    a: "1",
    b: {
      c: [2],
      ccc:{
        cccc:{}
      }
    }
  };
  
  const objB = {
    a: "1",
    b: {
      c: [1],
      ccc:{
        cccc:{
            ccccc:{
                cccccc:[1212]
            }
        }
      }
    },
    c:1
  };

  function diff0(obj1, obj2) {
    let diffs = {};
  
    for (let prop in obj1) {
      // 如果obj1的属性在obj2中不存在，或者值不相等，则记录差异
      if (!(prop in obj2) || obj1[prop] !== obj2[prop]) {
        diffs[prop] = [obj1[prop], obj2[prop]];
      }
    }
  
    for (let prop in obj2) {
      // 如果obj2的属性在obj1中不存在，则记录差异
      if (!(prop in obj1)) {
        diffs[prop] = [undefined, obj2[prop]];
      }
    }
  
    // 比较每个属性的值是否相等
    for (let prop in obj1) {
      if (prop in obj2) {
        // 如果属性是一个对象，则递归比较其属性值
        if (typeof obj1[prop] === 'object' && typeof obj2[prop] === 'object') {
          let childDiffs = diff0(obj1[prop], obj2[prop]);
          // childDiffs是有差异的情况
          if (Object.keys(childDiffs).length > 0) {
            diffs[prop] = childDiffs;
          }
        } else if (obj1[prop] !== obj2[prop]) {
          // 如果属性名相同但属性值不同，则记录差异
          diffs[prop] = [obj1[prop], obj2[prop]];
        }
      }
    }
  
    return diffs;
  }

  function diff1(obj1, obj2) {
    const result = {};
  
    function dfs(obj1, obj2, path) {
      for (let key in obj1) {
        if (!obj2.hasOwnProperty(key)) {
          result[path.concat(key).join('.')] = [obj1[key], undefined];
        } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          dfs(obj1[key], obj2[key], path.concat(key));
        } else if (obj1[key] !== obj2[key]) {
          result[path.concat(key).join('.')] = [obj1[key], obj2[key]];
        }
      }
  
      for (let key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
          result[path.concat(key).join('.')] = [undefined, obj2[key]];
        }
      }
    }
  
    dfs(obj1, obj2, []);
  
    return result;
  }

let diffs =diff1(objA, objB)
console.log(diffs);

  