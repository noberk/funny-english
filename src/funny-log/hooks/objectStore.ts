class ObjectStore {
    private pool: Map<string, {}> = new Map()
    get count() {
        return this.pool.size
    }
    get callees() {
        let callees = []
        for (var key of this.pool.keys()) {
            callees.push(key)
        }
        return callees
    }
    collectObject<T extends { [key: string]: any }>(key: string, value: T) {
        this.pool.set(key, value)
    }
    get(key: string) {
        return this.pool.get(key)
    }
}
export const os = new ObjectStore()

