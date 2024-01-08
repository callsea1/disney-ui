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

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const url = data.get('url');

    console.log(name, url);

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, url })
    };

    const res = await fetch(fireplaceApi, options);

    if (res.status >= 500) throw 'problem with post';

    const characterResponse = await res.json();

    return characterResponse;
  }
};
