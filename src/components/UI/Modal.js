import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
}

const ModalOverlays = (props) => {
  return <div className={classes.modal}>
    <div className={classes.content}>
      {props.children}
    </div>
  </div>
}

const overlaysDiv = document.getElementById('overlays')

const Modal = ({ onCloseCart, children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onCloseCart={onCloseCart}/>, overlaysDiv)}
      {ReactDOM.createPortal(<ModalOverlays>{children}</ModalOverlays>, overlaysDiv)}
    </>
  )
}

export default Modal;