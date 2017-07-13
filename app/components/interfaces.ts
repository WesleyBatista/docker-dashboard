export interface Container {
    id: string
    name: string
    image: string
    state: string
    status: string
}

export interface ModalProperties {
    id: string,
    onRunImage?: (name: string) => void
}

export interface ModalState {
    imageName: string
    isValid: boolean
}

export interface DialogTriggerProperties {
    id: string
    buttonText: string
}
