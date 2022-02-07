<script lang="ts">
  import { todos } from "$lib/services/stores";

  let list = [];

  $: done = list.filter((todo) => todo.done);
  $: undone = list.filter((todo) => !todo.done);

  todos.subscribe((state) => {
    list = state;
  });

  function clearComplete() {
    todos.update((state) => state.filter((t) => !t.done));
  }
</script>

<div class="footer relative flex justify-between w-full text-neutral-500 font-light px-4 py-3">
  <div class="flex-1 relative text-left">
    {#if undone.length === 1}1 item left{:else}{undone.length} items left{/if}
  </div>

  <div class="flex-1 relative text-center">asd</div>

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
</style>
