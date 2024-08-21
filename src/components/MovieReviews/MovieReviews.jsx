import { useParams } from "react-router-dom";
import { useEffect } from "react";

function MovieReviews({getReviews,reviwesData}) {
    const { id } = useParams();
    let isReviews;
    const queryParams = {
        path: `movie/${id}/reviews`,
        dataKey: "results",
        
      };

      useEffect(() => {
        if (!id) {return}
        getReviews(queryParams)
      },[id])
  
    isReviews=Boolean(reviwesData.length)
   



    return (
        <div>
            {(!isReviews)&&(<p>We do not have any reviews for this movie</p>)}
            {isReviews&&(<ul>
               {reviwesData.map(({author,content,id})=>{
                

                return (
                    <li key={id}>
                        <h3>{`Author: ${author}`}</h3>
                        <p>{content}</p>
                    </li>
                )

               })} 
            </ul>)}
        </div>
    )
}

export default MovieReviews;