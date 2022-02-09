<script lang="ts">
  import { todos } from "$lib/services/stores";
  import Filter from "$lib/enums/filter";
  import { onMount } from "svelte";
  import type Todo from "$lib/records/Todo";

  let list: Todo[] = [];
  let filter: Filter | null = null;

  $: done = list.filter((todo) => todo.done);
  $: undone = list.filter((todo) => !todo.done);

  todos.subscribe((state) => {
    list = state;
  });

  function clearComplete() {
    todos.update((state) => state.filter((t) => !t.done));
  }

  onMount(() => {
    window.addEventListener("hashchange", () => {
      switch (window.location.hash) {
        case Filter.ACTIVE:
          filter = Filter.ACTIVE;
          break;
        case Filter.COMPLETED:
          filter = Filter.COMPLETED;
          break;
        default:
          filter = null;
      }
    });
  });

  $: classesAll =
    filter === null ? "border-primary dark:border-primary-light" : "border-transparent";
  $: classesActive =
    filter === Filter.ACTIVE ? "border-primary dark:border-primary-light" : "border-transparent";
  $: classesCompleted =
    filter === Filter.COMPLETED ? "border-primary dark:border-primary-light" : "border-transparent";
</script>

<div
  class="footer relative flex justify-between items-center w-full px-4 py-2 text-neutral-500 dark:text-neutral-400 font-light shadow-[inset_0_2px_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_2px_1px_rgba(255,255,255,0.1)]"
>
  <div class="flex-1 relative text-left">
    {#if undone.length === 1}1 item left{:else}{undone.length} items left{/if}
  </div>

  <div class="flex-1 relative text-center flex justify-between">
    <a class="px-2 py-1 border rounded hover:underline {classesAll}" target="_self" href="/#">All</a
    >
    <a
      class="px-2 py-1 border rounded hover:underline {classesActive}"
      target="_self"
      href={Filter.ACTIVE}>Active</a
    >
    <a
      class="px-2 py-1 border rounded hover:underline {classesCompleted}"
      target="_self"
      href={Filter.COMPLETED}>Completed</a
    >
  </div>

  <div class="flex-1 relative text-right">
    {#if done.length > 0}
      <button class="cursor-pointer font-light hover:underline" on:click={clearComplete}>
        Clear complete
      </button>
    {/if}
  </div>
</div>

<style>
  .footer:before {
    /* Copied from https://todomvc.com/examples/typescript-react/ */
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgb(0 0 0 / 20%), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgb(0 0 0 / 20%),
      0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgb(0 0 0 / 20%);
  }

  @media (prefers-color-scheme: dark) {
    .footer:before {
      box-shadow: 0 1px 1px rgb(0 0 0 / 20%), 0 8px 0 -3px #171717, 0 9px 1px -3px rgb(0 0 0 / 20%),
        0 16px 0 -6px #171717, 0 17px 2px -6px rgb(0 0 0 / 20%);
    }
  }
</style>
