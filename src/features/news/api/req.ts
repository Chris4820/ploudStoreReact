import type { MetaProps } from "../../../components/ui/datatable";
import axiosStore from "../../../lib/axios/axiosStore";
import type { BlogFormData } from "../schema/newsSchema";



export type BlogsProps = {
  id: number,
  title: string,
  isVisible: boolean,
  author: string,
  createdAt: Date,
}

export async function getBlogs(page?: number | undefined) {

        let query = "";
        if (page) {
            query += `?page=${page}&`;
        }

  const response = await axiosStore.get<{blogs: BlogsProps[]}>(`blog${query}`);
  return response.data.blogs;
}

export async function getBlog(id: string | undefined) {
  const response = await axiosStore.get<{blog: BlogFormData}>(`blog/${id}`);
  return response.data.blog;
}

export async function createBlog(data: BlogFormData) {
  const response = await axiosStore.post('blog', {data});
  return response.data;
}

export async function updateBlog(id: string | undefined, data: BlogFormData) {
  const response = await axiosStore.put(`blog/${id}`, {data});
  return response.data;
}

export async function deleteBlog(id: string | undefined) {
  const response = await axiosStore.delete(`blog/${id}`);
  return response.data;
}


export async function getTotalBlogs() {
  const response = await axiosStore.get<{meta: MetaProps}>(`totalBlogs`);
  return response.data.meta;
}