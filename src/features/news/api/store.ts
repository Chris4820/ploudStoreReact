import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBlog, getBlogs, getTotalBlogs } from "./req";




export function useGetBlogs(page ?: number | undefined) {
  console.log(page);
  return useQuery({
  queryKey: ['blogs', page],
  queryFn: () => getBlogs(page),
  placeholderData: keepPreviousData,
  
})
}

export function useGetBlog(id: string | undefined) {
  return useQuery({
  queryKey: ['blog', id],
  queryFn: () => getBlog(id),
  placeholderData: keepPreviousData,
  
})
}


export function useGetTotalBlogs() {
  return useQuery({
  queryKey: ['totalBlogs'],
  queryFn: () => getTotalBlogs(),
  placeholderData: keepPreviousData,
})
}