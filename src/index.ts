class Human {
  public name:string;
  public age:number;
  public gender:string;
  constructor(name:string,age:number,gender?:string){
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const person = new Human("mori",8);

const sayHi = (obj:Human) => {
  console.log(`hello, my name is ${obj.name}, i am a ${obj.age} and i am ${obj.gender}`);
};

sayHi(person);
export {};