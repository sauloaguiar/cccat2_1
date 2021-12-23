export default class Item {
  id: number;
  weight: number;
  length: number;
  height: number;
  width: number;
  number: any;
  price: number;
  description: string;
  
  constructor(id: number, description: string, price: number, width: number, height: number, length: number, weight: number) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.width = width;
    this.height = height;
    this.length = length;
    this.weight = weight;
  }

  getVolume() { 
    return this.height/100 * this.width/100 * this.length/100;
  }

  getDensity() {
    return this.weight / this.getVolume();
  }
}