<script lang="ts">
  import { onMount } from "svelte";

  import InputForm from "$lib/scenes/Todos/components/InputForm.svelte";
  import Controls from "$lib/scenes/Todos/components/Controls.svelte";
  import { todos } from "$lib/services/stores";
  import Filter from "$lib/enums/filter";
  import type Todo from "$lib/records/Todo";

  const TODOS_KEY = "todos";

  let listAll: Todo[] = [];
  let list: Todo[] = [];

  onMount(() => {
    const loaded = localStorage.getItem(TODOS_KEY);
    if (loaded != null) {
      todos.set(JSON.parse(loaded));
    }
  });

  onMount(() => {
    todos.subscribe((state) => {
      localStorage.setItem(TODOS_KEY, JSON.stringify(state));

      listAll = state;
    });
  });

  onMount(() => {
    window.addEventListener("hashchange", () => {
      switch (window.location.hash) {
        case Filter.ACTIVE:
          list = listAll.filter(todo => !todo.done);
          break;
        case Filter.COMPLETED:
          list = listAll.filter(todo => todo.done);
          break;
        default:
          list = listAll;
      }
    })
  });
</script>

<section class="bg-neutral-50 shadow-lg">
  <InputForm />

  {#each list as todo}
    <div>{todo.id}: {todo.text}, {todo.done ? "Done" : "Not"}</div>
  {/each}

  {#if listAll.length > 0}
    <Controls />
  {/if}
</section>
