import { useParams } from "react-router-dom";
import { useEffect } from "react";

function MovieCast({getCasts}) {
    const { id } = useParams();
    const path=`movie/${id}/credits`
    
    useEffect(() => {
        getCasts(path)
      },[])
    return (
        <div>Csts</div>
    )
}

export default MovieCast; 