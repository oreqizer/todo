<script lang="ts">
  import { todos } from "$lib/services/stores";
  import type Todo from "$lib/records/Todo";

  export let todo: Todo;

  let editing = false;

  function remove() {
    todos.update((state) => state.filter((s) => s.id === todo.id));
  }

  function toggleDone() {
    todos.update((state) =>
      state.map((s) => (s.id === todo.id ? { ...todo, done: !todo.done } : s)),
    );
  }
</script>
