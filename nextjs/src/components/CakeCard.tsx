import Image from "next/image";
import { Cake } from "@/types/cake";
import { urlForImage } from "@/sanity/image";

interface CakeCardProps {
  cake: Cake;
}

export default function CakeCard({ cake }: CakeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64">
        <Image
          src={urlForImage(cake.image).width(400).height(300).url()}
          alt={cake.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{cake.title}</h3>
          <span className="text-lg font-bold text-green-600">
            ${cake.price}
          </span>
        </div>

        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2 capitalize">
          {cake.category}
        </span>

        {cake.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {cake.description}
          </p>
        )}
      </div>
    </div>
  );
}
