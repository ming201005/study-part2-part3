 export default class Product {
     id;
     name;
     price;
     constructor(id,name,price){
         this.id = id;
         this.name = name;
         this.price = price;
     }
    sale() {
         console.log("product:>"+this.id,this.name,this.price);
     }

}