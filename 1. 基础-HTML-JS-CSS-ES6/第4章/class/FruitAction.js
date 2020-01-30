/**
 * 水果模块操作类
 */
class FruitAction {
    //要提交的数据
    data = {
        id: null,
        name: null,
        des: null
    };

    constructor(ajax) {
        this.ajax = ajax;
    }

    /**
     * 获取数据
     */
    getData() {
        //api URL
        let url = "fruit";

        //调用ajax,用ES6箭头函数回调
        this.ajax.get(url, rs=>{
            console.log(rs);
            //处理
            if (rs.code == 0) {
                //获取数据
                let data = rs.data.records;
                let app = this._$("app");
                if (data.length > 0) {
                    //先清除原来的数据
                    this._removeLi(app);
                    //绑定数据
                    data.forEach(item => {
                        let li = document.createElement("li");
                        li.textContent = `${item.id} , ${item.name}, ${item.des}`;
                        app.appendChild(li);
                    });
                }
            }
        });
    }

    /**
     * 新增数据
     */
    addData() {
        //api URL
        let url = "fruit";

        let name =  this._$("name").value;
        let des  =  this._$("des").value;
        if(name =="" || name == null) {
            alert("请输入水果名称！");
            return;
        }
        if(des =="" || des == null){
            alert("请输入说明！");
            return;
        }

        //要提交的数据
        this.data.name = name;
        this.data.des  = des;
        //ES6中字符格式化。
        console.log(`data==>${this.data}`);

        //调用ajax，也可以用传统方式
        this.ajax.post(url, this.data, rs=> {
            if (rs.code == 0) {
                //加载新数据
                console.log("结果：", rs.msg);
                this.getData();
            }
        });
    }

    //通过id获取对象
    _$(id) {
        return document.getElementById(id);
    }
    // 删除某个节点的所有子节点
    _removeLi(app) {
        //先清除原来的数据
        if (app.hasChildNodes()) {
            let childNodes = app.children;
            let len = childNodes.length;
            while ((len--) > 0) {
                app.removeChild(childNodes[len]);
            }
        }
    }
}