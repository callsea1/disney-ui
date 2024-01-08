// import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fireplaceApi } from '$lib/constants';

export const GET: RequestHandler = async ({ url }) => {
  const search = url.search;
  const fullUrl = `${fireplaceApi}${search}`;

  const res = await fetch(fullUrl);
  const newCharactersResponse = await res.json();

  return new Response(JSON.stringify(newCharactersResponse));
};
