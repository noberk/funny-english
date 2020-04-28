import { useState } from "react";



export function useObject<T extends { [key: string]: any }>(
    initO: T,
    option: Partial<{ supervise: boolean; readonly maxRecord: number; forceCleanUp: boolean }> = {
        supervise: false,
        maxRecord: 3,
        forceCleanUp: false,
    },
) {
    const [object, setO] = useState<T>(initO);

    /**
     *
     * @param obj 举个🌰  {name:"lee",age:10,gender:true}
     */
    function updateObject(obj: Partial<T>);
    function updateObject<P extends keyof T>(key: P, value: T[P]);
    function updateObject<P extends keyof T>(key?: P, value?: T[P]) {
        console.log(this);

        try {
            let shallowObject = { ...object };
            if (typeof key === "object") {
                Object.keys(key).forEach((prop: keyof T) => {
                    shallowObject[prop] = key[prop];
                });
            } else {
                shallowObject[key] = value;
            }
            if (option?.forceCleanUp) {
                console.clear();
            }
            if (option?.supervise) {
                console.log(shallowObject);
            }

            setO({ ...shallowObject });
        } catch (error) {}
    }

    /** Recover all the values of each property which you passed in at the `useObject` at the beginning.*/
    function recover(): void;
    /**
     * Recover all the values of each property which you passed in at the `useObject` at the beginning.
     * @param omit Omit some of properties of those you wouldn't want to recover.
     */
    function recover(omit?: (keyof T)[]): void;
    function recover(omit?: (keyof T)[]): void {
        if (omit === undefined) {
            setO({ ...initO });
            return;
        }
        if (omit !== undefined && omit.length > 0) {
            let originalObject = { ...initO };
            omit.forEach((p) => {
                originalObject[p] = object[p];
            });
            setO(originalObject);
            return;
        }
    }

    return {
        /**Initial object where came from the first argument of the `useObject` which you passed in. */
        object,
        updateObject,
        recover,
    };
}
