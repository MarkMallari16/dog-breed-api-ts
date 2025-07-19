import { Heart } from "lucide-react";

interface DogProps {
    dogImage: string;
}
const DogCard = ({ dogImage }: DogProps) => {
    return (
        <div className="ring-1 ring-inset ring-gray-300 rounded-xl ">
            <div className="w-full overflow-hidden rounded-xl">
                <img src={dogImage} alt={dogImage} className="w-full h-96 object-cover   rounded-t-lg hover:scale-110 transition-all ease-in-out" />
            </div>
            <div className="flex justify-end py-4 pe-2 ">
                <Heart className="text-gray-500 cursor-pointer hover:text-red-500" />
            </div>
        </div>
    )
}

export default DogCard