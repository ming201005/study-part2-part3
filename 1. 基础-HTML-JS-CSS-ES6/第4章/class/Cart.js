/**
 * 购物车
 */
class Cart {
    /**
     * 构造方法
     * @param productList
     */
    constructor(productList) {
        this.productList = productList || [];
    };

    /**
     * 往购物车列表添加一件商品
     * @param product
     */
    addProduct(product) {
        //push进入
        this.productList.push(product);
    };

    /**
     * 显示商品列表
     */
    showProdudList(){
        //用到了ES6的箭头函数
        this.productList.forEach(item=>{
            console.log(item);
        });
    }

    /**
     * 从购物车中减1件商品
     */
    removeProduct(productId) {
        //用到了ES6的箭头函数、数组方法filter
        this.productList = this.productList.filter((value,index)=>{
            //console.log(index,value);
            //被删除的商品不返回。
            return value.get("productId") != productId;
        });
    };
    /**
     * 更新购物车中商品的购买数量
     */
    updataProductNum(productList, productId, isBuy) {
        //
    };
}