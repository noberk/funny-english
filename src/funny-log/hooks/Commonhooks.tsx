import { useState } from 'react'

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

export function useObjectState<T extends { [key: string]: any }>(
  initO: T,
  option: Partial<{
    supervise: boolean
    readonly maxRecord: number
    ForceCleanUp: boolean
  }> = {
    supervise: false,
    maxRecord: 3,
    ForceCleanUp: false,
  }
) {
  const [objectParams, setO] = useState<T>(initO)

  /**
   *
   * @param obj 举个🌰  {name:"lee",age:10,gender:true}
   */
  function updateParams(obj: Partial<T>): void
  function updateParams<P extends keyof T>(key: P, value: T[P]): void
  function updateParams<P extends keyof T>(key?: P, value?: T[P]) {
    try {
      let shallowObject: any = { ...objectParams } //here is a bug may be updates typescript will be solved this problem
      if (typeof key === 'object') {
        Object.keys(key).forEach((prop: keyof T) => {
          shallowObject[prop] = key[prop]
        })
      } else {
        shallowObject[key] = value
      }
      if (option?.ForceCleanUp) {
        console.clear()
      }
      if (option?.supervise) {
        console.log(shallowObject)
      }

      setO({ ...shallowObject })
    } catch (error) {}
  }

  return {
    /**创建返回的对象 */
    objectParams,
    /** 可更新单个属性
     *  可更新一个 T 类型的对象
     *    */
    updateParams,
    /**直接还原到初始状态*/
    recover() {
      setO({ ...initO })
    },
  }
}
