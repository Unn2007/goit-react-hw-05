import { useParams } from "react-router-dom";
import { useEffect } from "react";

function MovieCast({getCasts,castsData}) {
    const { id } = useParams();
    const queryParams = {
        path: `movie/${id}/credits`,
        dataKey: "cast",
        
      };
    
console.log(castsData)
    useEffect(() => {
        getCasts(queryParams)
      },[])
    return (
        <div>
            <ul>
                {castsData.map(({character,name,profile_path,id})=>{
                    return (
                        <li key={id}>
                            <img src={`https://image.tmdb.org/t/p/w500/${profile_path}`}/>
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