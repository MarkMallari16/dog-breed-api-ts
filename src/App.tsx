import { useEffect, useState } from 'react'
import './App.css'
import DogCard from './components/DogCard';
import { Dog, PawPrint, Search, Shuffle } from 'lucide-react';

function App() {
  //states
  const [dogs, setDogs] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  //getting user input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  }

  //for enter key input
  const handleEnterFetch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchDog();
  }

  useEffect(() => {
    fetchRandomDog();
  }, [])

  //api
  const fetchDogAPI = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://dog.ceo/api/breed/${search}/images`);
      const data = await response.json();

      if (data.status === "success") {
        setDogs(data.message);
        setIsLoading(false);
      } else {
        setDogs([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("error fetching images", error)
    } finally {
      setIsLoading(false);
    }
  }

  //fetching random dogs
  const fetchRandomDog = async () => {
    setHasSearch(true);
    try {
      setIsLoading(true);
      const response = await fetch("https://dog.ceo/api/breeds/image/random/12");
      const data = await response.json();

      if (data.status === "success") {
        setDogs(data.message);
        setIsLoading(false);
      } else {
        setDogs([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  //for button click
  const searchDog = async () => {
    if (search.trim() === "") {
      setError("Please enter a breed name");
      return;
    }
    setError("")
    setHasSearch(true);
    fetchDogAPI()
  }


  return (
    <div className='min-h-screen justify-center bg-base-200'>
      <div className='pt-8 pb-10 w-full container px-4 lg:px-0 mx-auto'>
        <div className='py-4 lg:py-8  px-4 lg:px-10 ring-1 ring-inset ring-gray-300 rounded-md bg-white '>
          <div className='flex items-center gap-2 '>
            <PawPrint size={55} className='text-accent' />
            <div>
              <h1 className='text-2xl lg:text-4xl font-bold'>
                Dog Breed Image Finder</h1>
              <p className='pt-1 text-gray-600'>Search for specific dog breeds or get random adorable dog photos</p>
            </div>
          </div>
          <div className='flex flex-wrap lg:flex-nowrap gap-2 mt-4'>
            <div className=' w-full'>
              <input type="text" value={search} onChange={handleSearchChange} onKeyDown={handleEnterFetch} className={`input w-full ${error && 'input-error'}`} placeholder='Search Breed Here...' />
              <span className='text-error'>{error && error}</span>
            </div>
            <button onClick={searchDog} className='mt-2 lg:mt-0 btn btn-accent w-full lg:w-auto' disabled={isLoading}>
              {isLoading ?
                <span className="loading loading-spinner loading-xs"></span>
                :
                <Search size={20} />
              }
              {isLoading ? "loading..." : "Search"}
            </button>
            <button onClick={fetchRandomDog} className='btn btn-secondary w-full lg:w-auto' disabled={isLoading}>
              <Shuffle size={20} />
              Random
            </button>
          </div>
        </div>

        {isLoading ?
          (
            <div className='flex flex-col justify-center items-center'>
              <span className="mt-8 loading loading-spinner loading-lg "></span>
              <p className='text-gray-600'>Fetching Dog...</p>
            </div>
          )
          : hasSearch && dogs.length === 0 ? (
            <div className='mt-8 flex flex-col gap-1 items-center py-8 px-10 ring-1 ring-inset ring-gray-300 rounded-md bg-white text-gray-600'>
              <Dog size={60} />
              <p className=''>
                Breed not found. Try breeds like: labrador, golden, poodle, bulldog, etc.
              </p>
            </div>
          ) :
            <div className='pt-10 grid lg:grid-cols-3 gap-4'>
              {
                dogs.slice(0, 12).map((dog, index) => {
                  //split the image source
                  const urlParts = dog.split("/");
                  //get the breed at index 4
                  const breedSegments = urlParts[4];
                  //if breed have dash it will split, reverse then join
                  const breed = breedSegments.includes("-") ? breedSegments.split("-").reverse().join(" ") : breedSegments;

                  //this will formatted the the first letter into uppercase
                  const formattedBreed = breed.split(" ")
                    .map(word => word[0].toUpperCase() + word.slice(1))
                    .join(" ");

                  //returning DogCard
                  return <DogCard breed={formattedBreed} image={dog} key={index} />
                })
              }
            </div>
        }
      </div>
      <footer className='text-center text-gray-500'>
        <p>@2025 Mark Christian Mallari</p>
      </footer>
    </div>
  )
}

export default App
