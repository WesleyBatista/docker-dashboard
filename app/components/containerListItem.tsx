/// <reference path="./interfaces.d.ts"/>
import * as React from 'react'
import * as classNames from 'classnames'
import * as io from 'socket.io-client'
import { Container } from './interfaces'

const socket = io.connect()

export class ContainerListItem extends React.Component<Container, {}> {

    // Helper method for determining whether the container is running or not
    isRunning() {
        return this.props.state === 'running'
    }

    onActionButtonClick() {
        const evt = this.isRunning() ? 'container.stop' : 'container.start'
        socket.emit(evt, { id: this.props.id })
    }

    render() {
        const panelClass = this.isRunning() ? 'success' : 'default'
        const classes = classNames('some', `some_${panelClass}`)
        const buttonText = this.isRunning() ? 'Stop' : 'Start'

        return (
            <tr className={ classes }>
                <td className="mdl-data-table__cell--non-numeric"><div className="bla" title={this.props.name}>{ this.props.name }</div></td>
                <td className="mdl-data-table__cell--non-numeric">{this.props.image}</td>
                <td className="mdl-data-table__cell--non-numeric">{this.props.status}</td>
                <td className="mdl-data-table__cell--non-numeric"><a className="" href="#" onClick={this.onActionButtonClick.bind(this)}>{buttonText}</a></td>
            </tr>
        )
    }
}
