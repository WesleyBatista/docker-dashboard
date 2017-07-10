import * as React from 'react'
import * as _ from 'lodash'
import * as io from 'socket.io-client'
import { ContainerList } from './containerList'
import { Container, ContainerListItem } from './containerListItem'
import { RunningContainerList } from './runningContainerList'

let socket = io.connect()

class AppState {
    containers?: Container[]
    stoppedContainers?: Container[]
}

export class AppComponent extends React.Component<{}, AppState> {

    constructor() {
        super()
        this.state = {
            containers: [],
            stoppedContainers: []
        }

        socket.on('containers.list', (containers: any) => {

            const partitioned = _.partition(containers, (c: any) => c.State == "running")

            this.setState({
                containers: partitioned[0].map(this.mapContainer),
                stoppedContainers: partitioned[1].map(this.mapContainer)
            })
        })
    }

    mapContainer(container:any): Container {
        return {
            id: container.Id,
            name: _.chain(container.Names)
                .map((n: string) => n.substr(1))
                .join(", ")
                .value(),
            state: container.State,
            status: `${container.State} (${container.Status})`,
            image: container.Image
        }
    }

    componentDidMount() {
        socket.emit('containers.list')
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Docker Dashboard</span>
                    </div>
                    <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                    <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Running</a>
                    <a href="#scroll-tab-2" className="mdl-layout__tab">Stopped</a>
                    </div>
                </header>
                <main className="mdl-layout__content mdl-color--grey-100">
                    <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                        <div className="page-content">
                            <div className="mdl-layout">
                                <div>
                                    <RunningContainerList title="Running" containers={this.state.containers} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mdl-layout__tab-panel" id="scroll-tab-2">
                        <div className="page-content">
                            <div className="mdl-layout">
                                <div>
                                    <ContainerList title="Stopped containers" containers={this.state.stoppedContainers} />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}
