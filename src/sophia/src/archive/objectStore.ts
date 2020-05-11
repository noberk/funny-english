import { LimitedReversedActive, LIMITED_SCENES_TAG } from "../components/menu"
import { ObjectDataProcess } from "./object-data-process"

class ObjectStore extends ObjectDataProcess {
    private _system_menu_useState: UseStateReturnInfo = null
    private _sceneName: string = ''
    private _registeredStateName: string[] = []   //to record which stateObject has been register .. if registered it should not  be admit func `useObject` to update repeatedly!
    private readonly treasures: Map<string, StatePool<any>> = new Map()
    get currentScene() {
        return {
            sceneName: this._sceneName,
            object: this.get(this._sceneName)?.treasure ?? {},
            set: (value: any) => {
                let setValue = this.get(this._sceneName)?.setTreasure ?? (() => Promise.resolve(void 0))
                setValue({ ...value })
            },

        }
    }
    getMenuStateReturnAction() {
        return this._system_menu_useState
    }
    addMenuAction(act: UseStateReturnInfo) {
        this._system_menu_useState = act
    }

    formatTabNames(): FormatedTabsNameData[] {
        const names = this.scenes.map(tabName => ({ tabName, select: false }))
        console.log("aa:", names);

        return names
    }

    /**To get count of the state objects. */
    get count() {
        return this.treasures.size
    }
    /**Get the alias names of all state objects*/
    get scenes() {
        let sceneNameList = []
        for (var key of this.treasures.keys()) {
            sceneNameList.push(key)
        }
        return sceneNameList
    }
    /** Automatically store the state object to the storage */
    collectObject<S>(key: string, value: StatePool<S>) {
        try {

            let preCount = this.treasures.size
            this.treasures.set(key, value)
            let nowCount = this.treasures.size

            if (nowCount > preCount) {
                console.log(key, " was collected by 👾");
                super.onSave()
                return true
            }

        } catch (error) {
            super.onSaveFailure(error)
            return false
        }
        return false
    }
    registerState(name: string) {
        if (!this._registeredStateName.includes(name)) {
            this._registeredStateName.push(name)
            return true
        }
        return false
    }
    /** To getStateObject  */
    get(key: string) {
        return this.treasures.get(key)
    }
    getMaster() {
        return this.get(LIMITED_SCENES_TAG.sceneName)
    }
    /** which state should be displayed?  */
    syncScene(name: string): void {
        this._sceneName = name
    }
    /** let user to select which  data bind mode is prefered 
     *  1way 
     * 2ways
    */
    // twoWaysbindsCheck(setO: Function): boolean {
    //     let isTwoWays = false
    //     this.treasures.forEach(p => {
    //         if (p.setTreasure === setO && p.twoWay) {
    //             isTwoWays = true
    //         }
    //     })
    //     return isTwoWays
    // }
}

export const os = new ObjectStore()
console.log("哈哈", os);
type FormatedTabsNameData = { tabName: string; select: boolean }
type StatePool<S> = {
    treasure: S,
    setTreasure: React.Dispatch<React.SetStateAction<S>>
}
type UseStateReturnInfo = { sence: LimitedReversedActive, action: { o: {}, setO: any } } | null  // ((value: any) => void | (key: any, val: any) => void)