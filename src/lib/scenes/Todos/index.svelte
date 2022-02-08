<script lang="ts">
  import { onMount } from "svelte";

  import InputForm from "$lib/scenes/Todos/components/InputForm.svelte";
  import Controls from "$lib/scenes/Todos/components/Controls.svelte";
  import TodoItem from "$lib/scenes/Todos/components/TodoItem.svelte";
  import { todos } from "$lib/services/stores";
  import Filter from "$lib/enums/filter";
  import type Todo from "$lib/records/Todo";

  const TODOS_KEY = "todos";

  let hash = "";
  let listAll: Todo[] = [];

  function filterTodos(hash: string, todos: Todo[]): Todo[] {
    switch (hash) {
      case Filter.ACTIVE:
        return todos.filter((todo) => !todo.done);

      case Filter.COMPLETED:
        return todos.filter((todo) => todo.done);

      default:
        return todos;
    }
  }

  $: list = filterTodos(hash, listAll);

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
      hash = window.location.hash;
    });
  });
</script>

<section class="bg-neutral-50 shadow-lg">
  <InputForm />

  {#if list.length > 0}
    <ul>
      {#each list as todo}
        <TodoItem {todo} />
      {/each}
    </ul>
  {/if}

  {#if listAll.length > 0}
    <Controls />
  {/if}
</section>
