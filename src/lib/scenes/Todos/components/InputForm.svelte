<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import { todos } from "$lib/services/stores";

  let text = "";

  function handleSubmit(ev: SubmitEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (text === "") {
      return;
    }

    const todo = {
      id: Math.round(Math.random() * 1_000_000_000),
      text,
      done: false,
    };

    todos.update((state) => [todo, ...state]);

    text = "";
  }
</script>

<form on:submit={handleSubmit}>
  <Input
    classname="shadow-[inset_0_-2px_1px_rgba(0,0,0,0.07)]"
    bind:value={text}
    placeholder="What needs to be done?"
  />
</form>
