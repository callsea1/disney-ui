// import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';
import { fireplaceApi } from '$lib/constants';

export const load: PageServerLoad = async ({ params, fetch }) => {
  console.log('params: ', params);
  const idPath = `/${params.id}`;

  // return {
  // 	post: await db.getPost(params.slug),
  // };
  const fullUrl = `${fireplaceApi}${idPath}`;
  console.log(fullUrl);

  const res = await fetch(fullUrl);
  const characterResponse = await res.json();

  return { characterResponse };
};
