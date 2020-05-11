interface ObjectDataEventHandler {
    onSave: () => void
    onSaveFailure: (err: string) => void
}

export class ObjectDataProcess implements ObjectDataEventHandler {
    onSave() { }
    onSaveFailure(err: string) {

    }



}

