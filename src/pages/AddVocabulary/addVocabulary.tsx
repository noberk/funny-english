import React from "react";
import { IAddVocabulary } from "../../types";
import { take } from "../../commom/fetch";

 

export default class AddVocabulary extends React.Component<any,Partial<IAddVocabulary>> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <>
                   Vocabulary
            </>
        )
    }
}
  
