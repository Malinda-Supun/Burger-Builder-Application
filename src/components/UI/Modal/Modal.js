import React, {Component} from "react";
import './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Modal] Updated')
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {

        return <Auxiliary>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div className={'Modal'}
                 style={{
                     transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: this.props.show ? '1' : '0'
                 }}>
                {this.props.children}
            </div>
        </Auxiliary>
    }

}

export default Modal;
