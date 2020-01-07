function  Person(name,sex,age){
    this.name=name;
    this.sex = sex;
    this.age = age;

    //对象方法
    this.Introduce=function(){
        alert("My name is "+this.name);
    }
}

Person.prototype.IntroduceChinese=function(){
    alert("我:"+this.name);
}

function People(name)
{
  this.name=name;
  //对象方法
  this.Introduce=function(){
    alert("My name is "+this.name);
  }
}

//类方法
People.Run=function(){
  alert("I can run");
}
//原型方法
People.prototype.IntroduceChinese=function(){
  alert("我的名字是"+this.name);
}

String.prototype.myfun = function() {
    alert(this+",我在这里做了一些处理！");
}
