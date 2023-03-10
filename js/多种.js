function childNum(num, count){
    let c = Array(num).fill(1).map((e,i) => i + 1)
     let curCount = 0; // 记录每一轮的报数
    let exitCount = 0 // 记录离开的人数
    let curIndex = 0;  // 当前报数的人的下标
     // 当只剩下最后一个人的时候结束循环
    while(exitCount < num - 1){
         // 按照顺序报数
        if(c[curIndex] !== 0){
            curCount ++;
        }
   // 当前位置报的数等于count，就把这个位置的数标记为0
   // 然后，重新开始报数
   // 并记录已经离开了一个
   if(curCount === count){
       c[curIndex] = 0;
       curCount = 0;
       exitCount ++;
   }
    // 已经走完了一轮，从0开始的下标重新计数
   curIndex ++;
   if(curIndex === num){
       curIndex = 0;
   }
 } 
     // 返回数值不为0的元素，这个元素就是最后剩下的小孩的报数
    return c.find((v, i) => v !== 0)
  }
  console.log(childNum(30, 3));



  // 实现图片的异步加载
  function asyncImage(url){
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = url
        img.onload = ()=> {
            console.log('图片加载成功');
            resolve(img)
        }
        img.onerror = (err) => {
            console.log('图片加载失败');
            reject(err)
        }
    })
  }
//   asyncImage('url').then((res) => console.log('加载成果')).catch(err => console.log(err))



  // 查找文章出出现频率最高的单词
  function findMaxFrequence(article){
    if(!article) return ''
 // 全部内容转小写，并提取里面的单词内容
    article = article.trim().toLowerCase()
     let Arr = article.match(/[a-z]+/g)
    let visited = {}
     Arr.forEach((e) => {
        if(visited.hasOwnProperty(e)){
            visited[e] ++
        }else{
            visited[e] = 0
        }
    })
    let maxNum = 0, maxWord = ''
    for(let [key, value] of Object.entries(visited)){
        if(value > maxNum){
            maxNum = value
            maxWord = key
        }
    }
     return [maxWord, maxNum]
 }

  let article = 'I’m LiHua LiHua LiHua LiHua LiHua LiHua LiHua LiHua , a Chinese student taking summer in in in  course in your university . I’m writing to ask for help . I came here last month and found my courses interesting .But I have some difficulty with note-taking and I have no idea of how to use the library . I was told the learning center provides help for students and I’m anxious to get help from you. I have no class on Tuesdays mornings and Friday afternoons . Please let me know which day is ok with you. You may email or phone me . Here are my email address and phone number :lihua@1236.com ; 1234567.'
  console.log(findMaxFrequence(article)); 