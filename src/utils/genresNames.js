function genresNames(genres,genresIds) {
    const result=[];
    genresIds.map((genresId)=>{
        genres.map((genre)=>{
        ((+genre.id)===(+genresId))&&result.push(genre.name)
    })
    })
    
    return result.join(" "); 
}
export default genresNames;