class Snake {
  // 表示蛇头的元素
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake>div')!
    this.bodies = this.element.getElementsByTagName('div')

  }

  // 获取蛇头坐标
  get X() {
    return this.head.offsetLeft

  }
  get Y() {
    return this.head.offsetTop
  }
  set X(value: number) {
    if (this.X === value) {
      return
    }
    // X值的合法范围  0-290
    // if (value < 0 || value > 290) {
    //   console.log(value);
    //   throw new Error("蛇撞墙了");
    // }
    // 修改x时是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      console.log('水平方向发生了掉头');
      // 如果发生了掉头，让蛇反方向继续移动
      if (value > this.X) {
        // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.X - 10
      } else {
        value = this.X + 10

      }
    }


    // X值的合法范围  0-290
    if (value < 0 || value > 290) {
      console.log(value, '移动身体前判断');
      throw new Error("蛇撞墙了");
    }
    // 移动身体
    this.moveBody()
    this.head.style.left = value + 'px'

    this.checkHeadBody()
  }
  set Y(value: number) {
    if (this.Y === value) {
      return
    }
    // Y值的合法范围  0-290
    // if (value < 0 || value > 290) {
    //   throw new Error("蛇撞墙了");
    // }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      console.log('垂直方向发生了掉头');
      // 如果发生了掉头，让蛇反方向继续移动
      if (value > this.Y) {
        // 如果新值value大于旧值X，则说明蛇在向下走，此时发生掉头，应该使蛇继续向上走
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    // Y值的合法范围  0-290
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }
    // 移动身体
    this.moveBody()
    this.head.style.top = value + 'px'

    this.checkHeadBody()
  }
  addBody() {
    // 向element中添加一个div
    let div = document.createElement('div')
    this.element.insertAdjacentElement('beforeend', div)
  }

  // 添加蛇身体移动的方法
  moveBody() {
    // 将后面身体的位置设置为前边身体的位置
    // 遍历所有身体
    // console.log(this.bodies.length);

    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置   
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // console.log(X, Y, 'X,Y');

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
      // console.log(this.bodies);
    }
  }

  // 检查头和是否和身体相撞 （身体与蛇头重叠）

  checkHeadBody() {

    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        alert('撞到自己了,gameover!')
        throw new Error("撞到自己了");

      }
    }
  }
}


export default Snake