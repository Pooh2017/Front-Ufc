import React from "react";

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Eliminar</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <button
                        className="btn btn-danger"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="btn btn-secondary" >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
