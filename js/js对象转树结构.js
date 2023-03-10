
const arr = [{ id: "01", name: "张大大", pid: "", job: "项目经理" }, { id: "02", name: "小亮", pid: "01", job: "产品leader" }, { id: "03", name: "小美", pid: "01", job: "UIleader" }, { id: "04", name: "老马", pid: "01", job: "技术leader" }, { id: "05", name: "老王", pid: "01", job: "测试leader" }, { id: "06", name: "老李", pid: "01", job: "运维leader" }, { id: "07", name: "小丽", pid: "02", job: "产品经理" }, { id: "08", name: "大光", pid: "02", job: "产品经理" }, { id: "09", name: "小高", pid: "03", job: "UI设计师" }, { id: "10", name: "小刘", pid: "04", job: "前端工程师" }, { id: "11", name: "小华", pid: "04", job: "后端工程师" }, { id: "12", name: "小李", pid: "04", job: "后端工程师" }, { id: "13", name: "小赵", pid: "05", job: "测试工程师" }, { id: "14", name: "小强", pid: "05", job: "测试工程师" }, { id: "15", name: "小涛", pid: "06", job: "运维工程师" }]

function change2tree(arr){
    let res = []
    let map = {}
    /*
    map = {
            "10": {
                id: "10",
                name: "小刘",
                pid: "04",
                job: "前端工程师",
            },
            "11": {
                id: "11",
                name: "小华",
                pid: "04",
                job: "后端工程师",
            }
        }


    */
    // 获取每一项的值
    arr.forEach((e) => {
        map[e.id] =e
    })

    // 利用指向的是地址，实现了res数组里面内容的变化
    arr.forEach((e) => {
        let parent = map[e.pid]
        if(parent){
            if(parent.children){
                parent.children.push(e)
            }else{
                parent.children = [{...e}]
            }
        }else{
            res.push(e)
        }
    })
    console.log(res);
    

    return res

}
console.log(change2tree(arr));
