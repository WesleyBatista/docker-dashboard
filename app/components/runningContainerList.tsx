import * as React from 'react'
import { RunningContainerListItem } from './runningContainerListItem'
import { Container } from './interfaces'


export class ContainerListProps {
    containers: Container[]
    title?: string
}

export class RunningContainerList extends React.Component<ContainerListProps, {}> {
    render() {
        return (
            <div>
                {/*<h3 className="header">{this.props.title}</h3>*/}
                <p>{ this.props.containers.length == 0 ? "No containers to show" : "" }</p>
                <div className="row">
                    { this.props.containers.map(c => <RunningContainerListItem key={c.name} {...c} />) }
                </div>
            </div>
        )
    }
}
