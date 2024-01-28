import Modal from "react-modal";

interface ConfirmationModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

Modal.setAppElement("#root");

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title,
  message
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="confirmation-modal"
      overlayClassName={"confirmation-modal-overlay"}
    >
      <div className="confirmation-header">
        <h2>{title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-0.5 0.5 22 22"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 pr-0.5 close-icon"
          onClick={onRequestClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <p className="pt-4 text-gray-900 dark:text-white">{message}</p>
      <div className="confirmation-buttons">
        <button onClick={onRequestClose} className="cancel-button">
          Cancel
        </button>
        <button onClick={onConfirm} className="confirm-button">
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
