const Toast = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-xl z-[60] text-sm font-medium whitespace-nowrap">
      {message}
    </div>
  );
};

export default Toast;
