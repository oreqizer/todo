<script lang="ts">
  import { todos } from "../services/stores";

  let text = "";

  function handleSubmit(ev: SubmitEvent<HTMLFormElement>) {
    ev.preventDefault();

    todos.update((state) => [text, ...state]);

    text = "";
  }
</script>

<form on:submit={handleSubmit}>
  <input
    class="input-field py-4 pr-4 pl-14 shadow-[inset_0_-2px_1px_rgba(0,0,0,0.07)]"
    type="text"
    bind:value={text}
    placeholder="What needs to be done?"
  />
</form>
