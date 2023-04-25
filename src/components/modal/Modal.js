import React from "react";
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';

import close from "../../resources/img/close.svg"

import './modal.scss'

const ModalWindow = ({url, onOpenModal, openModal}) => {
    const [urlsList, setUrlsList] = useState(url)

    const ref = useRef()

    Modal.setAppElement('body');

    useEffect(() => {
        const clickOutElement = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onOpenModal(false)
            }
        }
    
        document.addEventListener("mousedown", clickOutElement)
    
        return function() {
            document.removeEventListener("mousedown", clickOutElement)
        }
    }, [])

    useEffect(() => {
        setUrlsList(url)
        setUrlsList(urlsList => urlsList.filter(item => item.site === 'youtube' && item.type === 'TRAILER'))
    }, [url])
    

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
    };

    return (
        <div className="modal">
            <CSSTransition
                in={openModal}
                timeout={300}
                classNames="dialog"
            >
                <Modal style={modalStyles} isOpen={openModal} closeTimeoutMS={300} className="modal__react">
                    <div className="modal__app">
                        <div ref={ref} className="modal__inner">
                            <button onClick={() => {onOpenModal(false)}} className="close">
                                <img src={close} alt="close" />
                            </button>
                            <iframe width="100%" height="100%" src={urlsList[0].url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                </Modal>
            </CSSTransition>
        </div>
    );
};

export default ModalWindow;