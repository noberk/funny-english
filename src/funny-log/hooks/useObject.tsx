import { useState } from 'react'
import { os } from './objectStore'

export function useUpdate() {
  let [update, _setUpdate] = useState(Date.now())
  function setUpdate() {
    _setUpdate(Date.now())
  }
  return {
    update,
    setUpdate,
  }
}

export function useObject<T extends { [key: string]: any }>(
  initO: T & { callee?: string },
  option: Partial<{
    supervise: boolean
    readonly maxRecord: number
    forceCleanUp: boolean
  }> = {
    supervise: false,
    maxRecord: 3,
    forceCleanUp: false,
  }
) {
  const [object, setO] = useState<T>(initO)
  /**
   *
   * @param obj 举个🌰  {name:"lee",age:10,gender:true}
   */
  function updateObject(obj: Partial<T>): void
  function updateObject<P extends keyof T>(key: P, value: T[P]): void
  function updateObject<P extends keyof T>(key?: P, value?: T[P]) {
    try {
      let shallowObject: any = { ...object } //here is a bug may be updates typescript will be solved this problem
      if (!shallowObject.callee) {
        shallowObject.callee = 'untitled'
      }
      if (typeof key === 'object') {
        Object.keys(key).forEach((prop: keyof T) => {
          shallowObject[prop] = key[prop]
        })
      } else shallowObject[key] = value

      if (option.forceCleanUp) console.clear()

      if (option.supervise) console.log(shallowObject, option.forceCleanUp)

      os.collectObject(object.callee, object)
      setO({ ...shallowObject })
    } catch (error) {}
  }

  return {
    /**创建返回的对象 */
    object,
    /** 可更新单个属性
     *  可更新一个 T 类型的对象
     *    */
    updateObject,
    /**直接还原到初始状态*/
    recover() {
      setO({ ...initO })
    },
  }
}
