import CheckmarkIcon from "../UI/Icons/CheckmarkIcon";

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
  return (
    <div className="relative w-64 h-64 group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out transform group-hover:scale-105">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
        <div className="absolute inset-0 p-4 flex flex-col justify-end transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex gap-1">
            <h3 className="text-white text-xl font-bold mb-2">{name}</h3>
            {!!isTokenValidated && (
              <div className="!text-blue-500">
                <CheckmarkIcon fill="currentColor" size={24} />
              </div>
            )}
          </div>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
