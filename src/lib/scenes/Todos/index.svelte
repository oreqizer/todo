<script lang="ts">
  import { onMount } from "svelte";

  import InputForm from "$lib/scenes/Todos/components/InputForm.svelte";
  import Controls from "$lib/scenes/Todos/components/Controls.svelte";
  import { todos } from "$lib/services/stores";

  const TODOS_KEY = "todos";

  let list = [];

  onMount(() => {
    const loaded = localStorage.getItem(TODOS_KEY);
    if (loaded != null) {
      todos.set(JSON.parse(loaded));
    }

    todos.subscribe((state) => {
      localStorage.setItem(TODOS_KEY, JSON.stringify(state));

      list = state;
    });
  });
</script>

<section class="bg-neutral-50 shadow-lg">
  <InputForm />

  {#each list as todo}
    <div>{todo.id}: {todo.text}, {todo.done ? "Done" : "Not"}</div>
  {/each}

  {#if list.length > 0}
    <Controls />
  {/if}
</section>
