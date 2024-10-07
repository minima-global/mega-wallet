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
  isTokenValidated,
}: NFTDisplayProps) {
  const imageData =
    imageUrl && imageUrl.length > 0 && imageUrl.includes("data:image");

  if (imageData) {
    return (
      <div className="flex items-center">
        <div className="relative w-[64px] h-[64px] group">
          <div className="relative w-full h-full bg-white rounded overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-110">
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
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[120px] h-[120px] lg:w-[240px] lg:h-[240px] group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75"></div>
      <div className="relative w-full h-full bg-white rounded-lg overflow-hidden shadow-xl">
        <img src={imageUrl} alt={name} className="w-full h-full" />
      </div>
    </div>
  );
}
