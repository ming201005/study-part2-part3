/**
 * 简单封装一个自己的ajax
 */
class Ajax {
    
    xmlhttp   = null;

    TYPE_GET  = "GET";
   
    TYPE_POST = "POST";

    BASE_URL  = "http://192.168.2.153:81/";
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
        if (this.xmlhttp ==null) {
            try {
                if (window.XMLHttpRequest) {
                    // code for IE7+, Firefox, Chrome, Opera, Safari
                    this.xmlhttp = new XMLHttpRequest();
                }
                else {
                    // code for IE6, IE5
                    this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
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
        this.xmlhttp.send();
    }

    /**
     * post
     * @param {*} url 
     * @param {*} data  格式是：{id:XXX,name:XXX}
     * @param {*} call 
     * @param {*} async 
     */
    post(url, data, call, async) {
        let objectType =  typeof data;
        if(objectType == "object") {
            this._callBack(url, this.TYPE_POST, call, async);
            this.xmlhttp.setRequestHeader("Content-type","application/json");
            this.xmlhttp.send(JSON.stringify(data));
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
            that.xmlhttp.open(type, that.BASE_URL+url, async || true);        
            //响应处理
            that.xmlhttp.onreadystatechange = function () {
                if ( that.xmlhttp.readyState==4 
                     && that.xmlhttp.status == 200) {
                    //获得服务器的数据，并将数据转换
                    let rs =  JSON.parse(that.xmlhttp.responseText);
                    //执行回调
                    call(rs);
                }
            }
        } catch (e) {
            console.log(e);
        }  
    }
}