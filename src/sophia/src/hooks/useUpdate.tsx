import { useState } from "react";

export function useUpdate() {
    let [update, _setUpdate] = useState(Date.now());
    function setUpdate() {
        _setUpdate(Date.now());
    }
    return {
        update,
        setUpdate,
    };
}