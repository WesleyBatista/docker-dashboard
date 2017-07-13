import * as React from 'react'
import * as classNames from 'classnames'
import * as io from 'socket.io-client'
import { Container } from './interfaces'


const socket = io.connect()

export class RunningContainerListItem extends React.Component<Container, {}> {

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
        const classes = classNames('header', `panel-${panelClass}`)
        const buttonText = this.isRunning() ? 'Stop' : 'Start'

        return (
            <div className="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp">
                <div className="mdl-card__title mdl-card--expand">
                    <h2 className="mdl-card__title-text">{ this.props.name }</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    {/*<p>{ this.props.name }</p>*/}
                    <p>Status: {this.props.status}</p>
                    <p>Image: {this.props.image}</p>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.onActionButtonClick.bind(this)}>
                    {buttonText}
                    </a>
                </div>
            </div>
        )
    }
}


