<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData; // get data for SSR

  const {
    characterResponse: { data: character, info }
  } = data;

  console.log('data: ', data);
</script>

<div class="card w-96 glass p-4">
  <figure><img class="w-64 h-64" src={character.imageUrl} alt={character.name} /></figure>
  <div class="card-body">
    <h2 class="card-title">{character.name}</h2>
    <a class="text-xs" href={character.sourceUrl}>{character.sourceUrl}</a>
    <div class="card-actions justify-end">
      <!-- <a
        href={`${$page.url.origin}${$page.url.pathname}/${character._id}`}
        class="btn btn-secondary">Learn More</a
      > -->
    </div>
  </div>
</div>
