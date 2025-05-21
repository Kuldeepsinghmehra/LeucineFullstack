const SummaryBanner = ({ message, success }) => {
  return (
    <div className={`p-2 rounded text-white ${success ? 'bg-green-500' : 'bg-red-500'} mb-4`}>
      {message}
    </div>
  );
};

export default SummaryBanner;
