import * as React from 'react';
import {ReactNode} from 'react';
import * as enhanceWithClickOutside from 'react-click-outside'

type Props = Readonly<{
    onCloseHandler: () => void
}>

class ModalContent extends React.Component<Props, {}> {
    handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onCloseHandler()
    }

    handleClickOutside = (e: React.MouseEvent<HTMLAnchorElement>) => {
        this.handleClose(e);
    }

    render(): ReactNode {
        return (
            <div className="modal__content_wrapper">
                <div className="modal__header">
                    <a href="#"
                       className="modal__header-close-button"
                       title="Close window"
                       onClick={this.handleClose}
                    />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const ModalContentWrapper = enhanceWithClickOutside(ModalContent)

export class Modal extends React.Component<Props, {}> {
    render(): ReactNode {
        return (
            <div className="modal__background">
                <ModalContentWrapper {...this.props} />
            </div>
        )
    }
}