<script lang="ts">
  import EventCard from "$components/shared/EventCard.svelte";
  import EventListItem from "$components/shared/EventListItem.svelte";
  import EventCategoryFilter from "$components/shared/EventCategoryFilter.svelte";

  export let data;

  let { futureEvents, pastEvents, selectedCategory } = data;

  $: futureEventsFiltered = futureEvents.filter(({ category }) => {
    if (!selectedCategory) return true;
    return category.toLowerCase() === selectedCategory;
  });
</script>

<svelte:head>
  <title>Skjer | Capra Liflig Fryde</title>
</svelte:head>

<section class="pb-8">
  <div class="flex flex-col justify-between md:flex-row md:items-center">
    <h1 class="pb-6 text-4xl font-semibold md:w-[30%] md:pt-10 md:text-5xl">
      Kommende arrangementer
    </h1>

    <EventCategoryFilter
      {selectedCategory}
      on:categoryChange={({ detail }) => (selectedCategory = detail)}
    />
  </div>

  <div class="flex flex-col gap-4 py-5">
    {#if futureEventsFiltered.length}
      {#each futureEventsFiltered as event}
        <EventListItem {event} />
      {/each}
    {:else}
      <div class="text-xl font-light">Fant ingen kommende arrangementer i denne kategorien 😭</div>
    {/if}
  </div>
</section>

<section class="pb-8">
  <h1 class="pb-12 pt-10 text-4xl font-semibold md:w-[30%] md:text-5xl">Tidligere arrangementer</h1>

  <div class="grid grid-cols-1 gap-9 md:grid-cols-2">
    {#if pastEvents.length}
      {#each pastEvents as event}
        <EventCard {event} />
      {/each}
    {:else}
      <div class="text-xl font-light">Fant ingen tidligere arrangementer 😭</div>
    {/if}
  </div>
</section>
