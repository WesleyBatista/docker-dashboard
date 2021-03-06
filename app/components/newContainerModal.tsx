import * as React from 'react'
import * as classNames from 'classnames'
import { ModalProperties, ModalState } from './interfaces'
import Modal from './modal'

export class NewContainerDialog extends React.Component<ModalProperties, ModalState> {

    constructor(props: ModalProperties) {
        super(props)

        this.state = {
            imageName: '',
            isValid: false
        }
    }

    onImageNameChange(e: any) {
        const name = e.target.value

        this.setState({
            imageName: name,
            isValid: name.length > 0
        })
    }

    runImage() {
        if (this.state.isValid && this.props.onRunImage)
            this.props.onRunImage(this.state.imageName)

        return this.state.isValid
    }

    render() {

        let inputClass = classNames({
            "form-group": true,
            "has-error": !this.state.isValid
        })

        return (
            <Modal id="newContainerModal" buttonText="Run" title="Create a new container" onButtonClicked={this.runImage.bind(this)}>
                <div className="label-info">*supporting only images first pulled from the CLI</div>
                <form className="form-horizontal">
                    <div className={inputClass}>
                        <label htmlFor="imageName" className="col-sm-3 control-label">Image name</label>
                        <div className="col-sm-9">
                            <input type="text" 
                                className="form-control" 
                                onChange={this.onImageNameChange.bind(this)}
                                id="imageName" 
                                placeholder="e.g mongodb:latest"/>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}
