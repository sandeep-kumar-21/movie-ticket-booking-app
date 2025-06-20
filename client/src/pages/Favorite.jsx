import { useAppContext } from "../../context/AppContext"
import BlurCircle from "../components/BlurCircle"
import MovieCard from "../components/MovieCard"

function Favorite() {

  const {favoriteMovies} = useAppContext();

  return favoriteMovies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-38 overflow-hidden min-h-[80vh]">
      
      <BlurCircle top="50px" left="0px" />
      <BlurCircle top="350px" right="50px" />
      <h1 className="text-lg font-medium my-4">Your Favorite Movies</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-5">
        {favoriteMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  )
  :
  (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">No movies available</h1>
    </div>
  )
}

export default Favorite