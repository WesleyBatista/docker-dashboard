import * as React from 'react'
import { DialogTriggerProperties } from './interfaces'


export class DialogTrigger extends React.Component<DialogTriggerProperties, {}> {
    render() {
        const href = `#${this.props.id}`

        return (
            <a className="btn btn-primary" data-toggle="modal" href={ href }>{ this.props.buttonText }</a>
        )
    }
}
