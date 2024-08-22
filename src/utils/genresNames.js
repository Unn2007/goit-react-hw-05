function genresNames(genres) {
    const result=[];
    if (genres) {
        genres.map((genre)=>result.push(genre.name))
    
        return result.join(" ");

    }
   return "";
    
     // const result=[];
    // genresIds.map((genresId)=>{
    //     genres.map((genre)=>{
    //     ((+genre.id)===(+genresId))&&result.push(genre.name)
    // })
    // })
    
    // return result.join(" "); 
}
export default genresNames;