import { useContext, useState, useEffect } from "react";
import getGifs from "../service/getGifs";
import GifsContext from "../context/GifsContext";
const INITIAL_PAGE = 0;

export function useGifs({ keyword,rating } = { keyword: null }) {
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);


  const [page, setPage] = useState(INITIAL_PAGE);
  const { gifs, setGifs } = useContext(GifsContext);

  const keywordToUse =
    keyword || localStorage.getItem("lastKeyword") || "random";

  useEffect(() => {
    setLoading(true);
    getGifs({ keyword: keywordToUse, rating}).then((gifs) => {
      setGifs(gifs);
      setLoading(false);
      localStorage.setItem("lastKeyword", keywordToUse);
    });
  }, [keyword, keywordToUse,setGifs, rating]);

  useEffect(() => {
    if (page === INITIAL_PAGE) return;
    setLoadingNextPage(true)
    getGifs({ keyword: keywordToUse , rating, page}).then((nextGifs) => {
      setGifs(prevGif => prevGif.concat(nextGifs));
      setLoadingNextPage(false)
    })
  }, [page, keywordToUse]);

  return { loading, gifs, setPage };
}
