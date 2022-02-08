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
  $: doneAll = listAll.filter((todo) => !todo.done).length === 0;

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

  function handleArrow() {
    todos.update((state) => state.map((todo) => ({ ...todo, done: !doneAll })));
  }

  $: arrowColor = doneAll ? "text-neutral-700" : "text-neutral-500";
</script>

<section class="bg-neutral-50 shadow-lg">
  <div class="relative w-full">
    {#if listAll.length > 0}
      <button on:click={handleArrow} class="absolute left-4 top-4 text-xl rotate-90 {arrowColor}"
        >➔
      </button>
    {/if}

    <InputForm />
  </div>

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
