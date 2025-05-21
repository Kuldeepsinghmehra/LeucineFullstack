const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-100">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative border border-gray-200">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        title="Close"
      >
        ×
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
