// 定义表示记分牌的类
export default class ScorePanel {
  score = 0
  level = 1
  // 分数和等级所在的元素，在构造函数中进行初始化
  scoreEle: HTMLElement
  levelEle: HTMLElement

  // 设置一个变量来限制等级
  maxLevel: number

  // 设置变量  表示美x分升级
  upScore: number
  constructor(maxLevel = 10, upScore = 2) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }
  // 设置一个加分方法
  addScore() {
    // 使分数自增
    this.scoreEle.innerHTML = ++this.score + ''
    // 判断分数是多少
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  // 等级提升方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }

}

// const scorePanel = new ScorePanel(100, 2)
// for (let i = 0; i < 200; i++) {
//   scorePanel.addScore()
// }