// 引入其他类

import Snake from './snake'
import Food from './Food'
import ScorePanel from './ScorePanel'



// 游戏控制器，控制其他所有的类
class GameControl {
  // 定义三个属性
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  // 创建一个属性用来存储蛇的移动方向
  direction: string = 'Right'

  // 创建一个属性来判断蛇是否活着， 游戏是否结束
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()

    this.init()
  }
  init() {
    // 绑定键盘按键按下的事件

    document.addEventListener('keydown', this.keydownHandler.bind(this))

    // 调用run方法使蛇移动
    this.run()
  }
  /*                  IE
      ArrowUp         Up
      ArrowDown       Down
      ArrowLeft       Left
      ArrowRight      Right
  */
  // 创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // console.log(this, event.key);

    // 赋值之前检查，event.key是否合法
    // if () {

    // }
    this.direction = event.key
  }

  // 创建一个让蛇跑起来的方法

  run() {
    /*
          根据方向（this.direction）  来使蛇的位置改变
          向上 top  减少
          向下 top  增加
          向左 left 减少
          向右 left 增加
    */
    // 获取蛇现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y
    // console.log(X, Y, '当前坐标');

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        // 向上移动 Y减小
        Y -= 10
        break;
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break;
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break;
      case 'ArrowRight':
      case 'Right':
        X += 10
        break;
    }
    // 检查蛇是否迟到食物
    if (this.checkEat(X, Y)) {
      console.log('吃到食物了！');

      // 对食物位置进行重置
      this.food.change()
      // 分数增加
      this.scorePanel.addScore()
      // 蛇要增加一节
      this.snake.addBody()
    }

    // 修改蛇的X值和Y值
    try {
      this.snake.X = X
      this.snake.Y = Y
      // console.log(X, Y, '移动后坐标');
    } catch (e) {
      console.log(e);

      this.isLive = false
    }

    // 开启一个定时调用
    this.isLive && setTimeout(() => {
      this.run()
    }, 300 - (this.scorePanel.level - 1) * 30);
  }

  // 改变蛇位置

  // 检查蛇是否迟到食物方法

  checkEat(X: number, Y: number) {
    return X === this.food.X && Y === this.food.Y
  }
}

export default GameControl