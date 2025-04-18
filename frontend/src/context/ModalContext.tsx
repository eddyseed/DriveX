import React, { createContext, useContext, useState } from 'react';

type ModalType = 'alert' | 'confirm' | 'prompt' | null;

const ModalContext = createContext<{
    modal: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}>({
    modal: null,
    openModal: () => { },
    closeModal: () => { },
});
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<ModalType>(null);

    const openModal = (type: ModalType) => setModal(type);
    const closeModal = () => setModal(null);

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => useContext(ModalContext);