<script lang="ts">
  import { onMount } from "svelte";

  import Input from "../components/Input.svelte";
  import { todos } from "../services/stores";

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
  <Input />

  {#each list as todo}
    <div>{todo}</div>
  {/each}

  <div class="footer relative px-4 py-3">asd</div>
</section>

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
