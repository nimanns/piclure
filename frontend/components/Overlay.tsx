import { closeModal, toggleModal } from "../libs/modal";

export default function Overlay() {
  return <div onClick={closeModal} className="overlay" data-overlay></div>;
}
