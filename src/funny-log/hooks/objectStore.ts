class ObjectStore {
    private pool: Map<string, {}> = new Map()
    /**To get count of the state objects. */
    get count() {
        return this.pool.size
    }
    /**Get the alias names of all state objects*/
    get callees() {
        let callees = []
        for (var key of this.pool.keys()) {
            callees.push(key)
        }
        return callees
    }
    /** automatically store the state object to this storage */
    collectObject<T extends { [key: string]: any }>(key: string, value: T) {
        this.pool.set(key, value)
    }
    /** To getStateObject  */
    get(key: string) {
        return this.pool.get(key)
    }
    syncUpdate<T>(setPropFunc: (o: T) => void) {
        // setPropFunc(o)
    }
}
export const os = new ObjectStore()

