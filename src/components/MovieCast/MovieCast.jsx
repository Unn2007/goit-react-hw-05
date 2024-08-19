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
        <div>Csts</div>
    )
}

export default MovieCast; 