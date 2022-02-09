<script lang="ts">
  import { todos } from "$lib/services/stores";

  let text = "";

  function handleSubmit(ev: SubmitEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (text === "") {
      return;
    }

    const todo = {
      id: Math.round(Math.random() * 1_000_000_000), // 😹
      text,
      done: false,
    };

    todos.update((state) => [...state, todo]);

    text = "";
  }
</script>

<form on:submit={handleSubmit}>
  <input
    class="input-todo pl-14 shadow-[inset_0_-2px_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_-2px_1px_rgba(255,255,255,0.1)]"
    type="text"
    bind:value={text}
    placeholder="What needs to be done?"
  />
</form>
