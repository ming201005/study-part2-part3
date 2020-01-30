/**
 * 简单封装一个原生的ajax对象
 */
class Ajax {
    xmlHttp   = null;
    TYPE_GET  = "GET";
    TYPE_POST = "POST";
    BASE_URL  = "http://localhost:8081/";

    /**
     * 构造方法
     */
    constructor() {

    }

    /**
     * 创建XMLHttpRequest对象
     */
    _createXMLHttpRequest() {
        //xmlhttp如果已被创建，就不需要创建。
        if (this.xmlHttp ==null) {
            try {
                if (window.XMLHttpRequest) {
                    // code for IE7+, Firefox, Chrome, Opera, Safari
                    this.xmlHttp = new XMLHttpRequest();
                }
                else {
                    // code for IE6, IE5
                    this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                console.log("xmlhttp创建成功！");
            }
            catch (e) {
                console.log("xmlhttp创建失败！");
                throw "浏览器不支持！";
            }
        }
    }

    /**
     * GET
     * @param {*} url 
     * @param {*} call 
     * @param {*} async 
     */
    get(url, call, async){
        
        this._callBack(url, this.TYPE_GET, call, async);
        this.xmlHttp.send();
    }

    /**
     * post
     * @param {*} url 
     * @param {*} data  格式必须是：{id:XXX,name:XXX}
     * @param {*} call 
     * @param {*} async 
     */
    post(url, data, call, async) {
        let objectType =  typeof data;
        if(objectType == "object") {
            this._callBack(url, this.TYPE_POST, call, async);
            this.xmlHttp.setRequestHeader("Content-type","application/json");
            this.xmlHttp.send(JSON.stringify(data));
        }
    }

    /**
     * 私有的通用回调方法
     * @param {*} url 
     * @param {*} type 
     * @param {*} call 
     * @param {*} async 
     */
    _callBack(url,type, call, async) {
        try {
            let that =  this;
            //创建XMLHttpRequest对象
            that._createXMLHttpRequest();
            that.xmlHttp.open(type, that.BASE_URL+url, async || true);
            //响应处理
            that.xmlHttp.onreadystatechange = function () {
                if ( that.xmlHttp.readyState==4
                     && that.xmlHttp.status == 200) {
                    //获得服务器的数据，并将数据转换
                    let rs =  JSON.parse(that.xmlHttp.responseText);
                    //执行回调
                    call(rs);
                }
            }
        } catch (e) {
            console.log(e);
        }  
    }
}