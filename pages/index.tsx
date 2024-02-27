import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorite from "@/hooks/useFavorite";
import useMovieLists from "@/hooks/useMovieLists";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies =[] } = useMovieLists()
  const {data:favorites=[]} = useFavorite()
  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title={"trending now"} data={movies}/>
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
