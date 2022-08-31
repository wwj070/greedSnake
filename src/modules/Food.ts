// 定义食物类
class Food {
  // 定义一个属性来表示食物对应的元素
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')!;
  }
  // 获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }
  // 获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成一个随机位置
    // 食物位置最小0最大290
    // 蛇移动一次10，食物位置必为10整数

    this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px'
    this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px'

  }
}
export default Food;

// 测试代码
// const food = new Food()
// console.log(food.X, food.Y);
// food.change()
// console.log(food.X, food.Y);