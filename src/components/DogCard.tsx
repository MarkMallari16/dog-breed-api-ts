import { Heart } from "lucide-react";

interface DogProps {
    breed: string;
    image: string;
}
const DogCard = ({ breed, image }: DogProps) => {
    return (
        <div className="ring-1 ring-inset ring-gray-300 rounded-xl bg-white">
            <div className="w-full overflow-hidden rounded-xl">
                <img src={image} alt={breed} loading="lazy" className="w-full h-96 object-cover   rounded-t-lg hover:scale-110 transition-all ease-in-out" />
            </div>
            <div className="flex justify-between p-4 ">
                <p className="font-medium">{breed}</p>
                <Heart className="text-gray-500 cursor-pointer hover:text-red-500" />
            </div>
        </div>
    )
}

export default DogCard