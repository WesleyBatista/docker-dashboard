import * as React from 'react'
import { ContainerListItem } from './containerListItem'
import { Container } from "./interfaces"

export class ContainerListProps {
    containers: Container[]
    title?: string
}

export class ContainerList extends React.Component<ContainerListProps, {}> {
    render() {
        return (
            <div>
                {/*<h3>{this.props.title}</h3>*/}
                <p>{ this.props.containers.length == 0 ? "No containers to show" : "" }</p>
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp fullwidth">
                    <thead>
                            <tr>
                            <th className="mdl-data-table__cell--non-numeric">Image</th>
                            <th className="mdl-data-table__cell--non-numeric">Image</th>
                            <th className="mdl-data-table__cell--non-numeric">Status</th>
                            <th className="mdl-data-table__cell--non-numeric">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.containers.map(c => <ContainerListItem key={c.name} {...c} />) }
                    </tbody>
                </table>

            </div>
        )
    }
}
