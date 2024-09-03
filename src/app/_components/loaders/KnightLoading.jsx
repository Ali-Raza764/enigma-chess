import { FaChessKnight } from "react-icons/fa";

const KnightLoading = () => {
  return (
    <div className="flex items-center justify-center h-full my-auto py-32">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <FaChessKnight size={80}  />
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="loading-bar h-full bg-blue-600 animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default KnightLoading;
