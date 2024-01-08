<script lang="ts">
  import { page } from '$app/stores';
  import { localApi, localDisney } from '$lib/constants';
  import type { PageData } from './$types';

  export let data: PageData; // get data for SSR

  let name = $page.url.searchParams.get('name') || '';
  let pageNumber = $page.url.searchParams.get('page') || 1;
  let pageSize = $page.url.searchParams.get('pageSize') || 5;
  let fullApiUrl = $page.url.href;

  const {
    charactersResponse: { data: disneyCharacterData, info }
  } = data;

  let displayData = disneyCharacterData || [];
  let nextButtonSearch = (info && info.nextPage && '?' + info.nextPage.split('?')[1]) || null;
  let previousButtonSearch =
    (info && info.previousPage && '?' + info.previousPage.split('?')[1]) || null;

  const handleInput = async () => {
    // if we pass in a searchQuery, it is from prev or next. If not, build it for input
    const search = `?name=${name}&page=${pageNumber}&pageSize=${pageSize}`;
    fullApiUrl = `${localApi}${search}`;
    // const fullLocalUrl = `${localDisney}${search}`;

    //call localApi in api/characters
    const res = await fetch(fullApiUrl);
    const newCharactersResponse = await res.json();

    displayData = newCharactersResponse.data;
    nextButtonSearch = newCharactersResponse.info.nextPage
      ? '?' + newCharactersResponse.info.nextPage.split('?')[1]
      : null;
    previousButtonSearch = newCharactersResponse.info.previousPage
      ? '?' + newCharactersResponse.info.previousPage.split('?')[1]
      : null;

    // replace url with new search name
    // TODO: this causes full page refresh, consider more..
    // window.location.href = fullLocalUrl;
  };
  const handleClick = async (searchQuery: string) => {
    fullApiUrl = `${localApi}${searchQuery}`;

    const res = await fetch(fullApiUrl);
    const newCharactersResponse = await res.json();

    displayData = newCharactersResponse.data;
    nextButtonSearch = newCharactersResponse.info.nextPage
      ? '?' + newCharactersResponse.info.nextPage.split('?')[1]
      : null;
    previousButtonSearch = newCharactersResponse.info.previousPage
      ? '?' + newCharactersResponse.info.previousPage.split('?')[1]
      : null;
  };
</script>

<form method="POST" action="?/create" class="p-4">
  <label>
    Create Character
    <input name="name" type="text" />
  </label>
  <label>
    Image url
    <input name="url" type="text" />
  </label>
  <button>Create</button>
</form>

<input
  type="text"
  placeholder="Type here"
  class="input input-bordered input-accent w-full max-w-xs block"
  bind:value={name}
  on:input={handleInput}
/>
<button
  disabled={previousButtonSearch ? false : true}
  on:click={() => handleClick(previousButtonSearch)}
  class="btn btn-secondary my-6">Previous Page</button
>
<button
  disabled={nextButtonSearch ? false : true}
  on:click={() => handleClick(nextButtonSearch)}
  class="btn btn-secondary my-6">Next Page</button
>
<select
  bind:value={pageSize}
  on:change={handleInput}
  class="select select-bordered w-full max-w-xs"
>
  <option disabled selected>Page Size</option>
  <option value="3">3</option>
  <option value="5">5</option>
  <option value="8">8</option>
  <option value="10">10</option>
</select>

<div class="grid grid-cols-3">
  {#each displayData as character}
    <div class="card w-96 glass p-4">
      <figure><img class="w-64 h-64" src={character.imageUrl} alt={character.name} /></figure>
      <div class="card-body">
        <h2 class="card-title">{character.name}</h2>
        <a class="text-xs" href={character.sourceUrl}>{character.sourceUrl}</a>
        <div class="card-actions justify-end">
          <a
            href={`${$page.url.origin}${$page.url.pathname}/${character._id}`}
            class="btn btn-secondary">Learn More</a
          >
        </div>
      </div>
    </div>
  {/each}
</div>
