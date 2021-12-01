import { Transition } from '@headlessui/react';
import Button from '../atoms/Button';

function Overlay(props) {
  return (
    <div id="modal" className={`modal overflow-auto h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50 z-40 ${props.margin}`}>
      {props.children}
    </div>
  );
}

function Animate(props) {
  return (
    <Transition show={props.show}>
      <Overlay>
        <Transition.Child
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 -translate-y-full"
          enterTo="transform opacity-100 translate-y-0"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform opacity-0 translate-y-full"
        >
          {props.children}
        </Transition.Child>
      </Overlay>
    </Transition>
  );
}

function Modal(props) {
  return <div className={`relative overflow-auto bg-primary rounded-md shadow-xl p-6  ${props.width}`}>{props.children}</div>;
}

function ModalTitle(props) {
  return (
    <div className="flex justify-between items-center text-white mb-4">
      <p className="text-2xl font-bold ">{props.text}</p>
      <Button text="+" className="transform rotate-45 text-3xl  " type="button" onClick={props.onClose} />
    </div>
  );
}

export { Animate, Modal, ModalTitle };
