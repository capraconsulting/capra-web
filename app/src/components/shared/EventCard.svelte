<script lang="ts">
  import { urlFor } from "$lib/sanity/image";
  import type { Event } from "$models/sanity.model";
  import { ArrowRight } from "phosphor-svelte";
  import EventLogos from "./EventLogos.svelte";
  import EventBadges from "./EventBadges.svelte";

  export let event: Event;
</script>

<a
  class="flex flex-col rounded-3xl last:relative hover:bg-ireneGreen hover:transition-[2s] dark:hover:bg-zinc-700 sm:flex-row"
  href={`/event/${event._id}`}
>
  <div class="flex h-full w-full flex-col">
    <div class="max-h-[240px] min-h-[240px] sm:max-h-[300px] sm:min-h-[300px]">
      {#if event.image}
        <img
          class="h-full w-full rounded-3xl object-cover"
          src={urlFor(event.image).url()}
          alt="Bilde for arrangementet: {event.title}"
        />
      {:else}
        <div class="h-full w-full rounded-3xl bg-zinc-100 dark:bg-zinc-800" />
      {/if}
    </div>

    <div class="m-3 grid h-full grid-cols-1 content-between gap-2 sm:m-5">
      <div class="flex flex-col gap-2 break-words">
        <h2 class="text-2xl font-semibold">
          {event.title}
        </h2>
        <EventBadges {event} />
        {#if event.summary}
          <p class="text-base font-light sm:text-lg">{event.summary}</p>
        {/if}
      </div>

      <div class="mt-4 flex justify-between">
        <EventLogos {event} height={6} />
        <ArrowRight class="mr-2" size="20" />
      </div>
    </div>
  </div>
</a>
