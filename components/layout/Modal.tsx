import { Dispatch, JSX, SetStateAction } from 'react';

type ModalProps = {
  children: JSX.Element;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  children,
  showModal,
  setShowModal,
}: ModalProps) {
  return (
    <>
      <div
        className={`fixed left-1/2 top-1/2 z-50 max-h-96 w-11/12 -translate-x-1/2 -translate-y-1/2 overflow-x-auto rounded-md bg-white p-4 transition-transform duration-300 ${showModal ? 'opacity-1 pointer-events-auto' : 'pointer-events-none opacity-0'} md:w-96`}
      >
        {children}
      </div>
      <div
        onClick={() => setShowModal(false)}
        className={`fixed inset-0 z-40 h-screen w-screen bg-gray-400/50 transition-transform duration-300 ${showModal ? 'opacity-1 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
      ></div>
    </>
  );
}
