import Dep from "./Dep.js";

export default class Observer {
  constructor(data) {
    this.walk(data)
  }

  //为属性添加get set
  walk(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    this.walk(val)
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      // set(newValue){
      set: newValue => {
        if (newValue === val) {
          return
        }
        val = newValue
        this.walk(newValue)
        dep.notify()
      }
    })
  }
}
