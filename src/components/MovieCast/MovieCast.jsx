import { useParams } from "react-router-dom";
import { useEffect } from "react";
import imagePlaceholder from '../../assets/image.jpg'

function MovieCast({getCasts,castsData}) {
    const { id } = useParams();
    const queryParams = {
        path: `movie/${id}/credits`,
        dataKey: "cast",
        
      };
    

    useEffect(() => {
        getCasts(queryParams)
      },[])
 

    return (
        <div>
            <ul>
                {castsData.map(({character,name,profile_path,id})=>{
                    const imagePath = (profile_path)?`https://image.tmdb.org/t/p/w500/${profile_path}`:imagePlaceholder
                    return (
                        <li key={id}>
                            <img src={imagePath}/>
                            <p>{`character:${character}`}</p>
                            <p>{name}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MovieCast; 