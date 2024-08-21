import { useParams } from "react-router-dom";
import { useEffect } from "react";
import imagePlaceholder from '../../assets/image.jpg'
import css from './MovieCast.module.css'

function MovieCast({getCasts,castsData}) {
    const { id } = useParams();
    const queryParams = {
        path: `movie/${id}/credits`,
        dataKey: "cast",
        
      };
    

    useEffect(() => {
        if (!id) {return}
        getCasts(queryParams)
      },[id])
 

    return (
        <div>
            <ul>
                {castsData.map(({character,name,profile_path,id})=>{
                    const imagePath = (profile_path)?`https://image.tmdb.org/t/p/w500/${profile_path}`:imagePlaceholder
                    return (
                        <li key={id}>
                            <div className={css.thumb}>
                            <img src={imagePath} className={css.actorFoto}/>
                            </div>
                           
                            <p>{name}</p>
                            <p>{`Character: ${character}`}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MovieCast; 