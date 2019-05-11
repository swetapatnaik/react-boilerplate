import { Modal } from '@material-ui/core';
import * as React from 'react';

// As default typeModal prop should be: generic-modal
const ModalComponent = (props) => {
    return(
        <Modal open={props.open} onClose={props.close}>
            <div className={props.typeModal}>
                {props.children}
            </div>
        </Modal>
    )
}

export default ModalComponent;