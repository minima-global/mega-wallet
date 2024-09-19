import { CheckCircle } from "lucide-react";

interface NFTDisplayProps {
  imageUrl: string;
  name: string;
  description: string;
  isTokenValidated: boolean;
}

export default function NFTDisplay({
  imageUrl,
  name,
  description,
  isTokenValidated,
}: NFTDisplayProps) {
  const imageData =
    imageUrl && imageUrl.length > 0 && imageUrl.includes("data:image");

  if (imageData) {
    return (
      <div className="relative w-16 h-16 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
        <div className="relative w-full h-full bg-white rounded-full overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-110">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {isTokenValidated && (
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
              <CheckCircle className="text-blue-500 h-3 w-3" />
            </div>
          )}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 bg-white rounded-md px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <p className="text-xs font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500 truncate max-w-[120px]">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-64 h-64 group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative w-full h-full bg-white rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out transform group-hover:scale-105">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute inset-0 p-4 flex flex-col justify-end transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-xl font-bold">{name}</h3>
            {isTokenValidated && (
              <CheckCircle className="text-blue-500 h-5 w-5" />
            )}
          </div>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
