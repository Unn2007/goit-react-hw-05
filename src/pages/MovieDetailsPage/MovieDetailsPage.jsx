import { useParams } from 'react-router-dom';
import formatCreateDate from '../../utils/formatDate'
import genresNames from '../../utils/genresNames'

function MovieDetailsPage({movies,genresData}) {
    const { id } = useParams();
    const pathToImage="https://image.tmdb.org/t/p/w500/"
    const selectedMovie = movies.find((movie)=>(+movie.id)===(+id))
    console.log(genresData)
    console.log(selectedMovie)

    
  

    return (
        <main>
            <div>
                <img src={`${pathToImage}${selectedMovie.poster_path}`} />
            </div>
            <div>
                <h2>{`${selectedMovie.title}(${formatCreateDate(selectedMovie.release_date)})`}</h2>
                <p>{`User Score:${selectedMovie.popularity}`}</p>
                <p>Overview</p>
                <p>{selectedMovie.overview}</p>
                <p>Genres</p>
                <p>{`${genresNames(genresData,selectedMovie.genre_ids)}`}</p>

            </div>

           

        </main>
    )
}

export default MovieDetailsPage;