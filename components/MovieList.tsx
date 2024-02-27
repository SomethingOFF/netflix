import React from 'react'
import { isEmpty } from "lodash"
import MovieCard from './MovieCard'
interface MovieListProps {
    data: Record<string, any>
    title: String
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    if(isEmpty(data)){
        return null
    }
    return (
        <div className='px-4 md:px-12 mt-4 spac-y-8'>
            <div>
                <p className='text-white text-md md:text-xl lg:text-2xl font-semibold'>{title}</p>
            </div>
            <div className='grid grid-cols-4 gap-2 mt-4'>
                {
                    data.map((movie:any) => (
                        <MovieCard key={movie.id} data={movie}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList