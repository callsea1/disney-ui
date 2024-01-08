// import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';
import { fireplaceApi } from '$lib/constants';

export const load: PageServerLoad = async ({ url, fetch }) => {
  // console.log('params: ', params);
  // const name = url.searchParams.get('name');
  const search = url.search;
  // return {
  // 	post: await db.getPost(params.slug),
  // };
  const fullUrl = `${fireplaceApi}${search}`;
  console.log(fullUrl);

  const res = await fetch(fullUrl);
  const charactersResponse = await res.json();

  return { charactersResponse };
};
