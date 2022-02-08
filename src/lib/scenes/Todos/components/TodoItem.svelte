<script lang="ts">
  import { todos } from "$lib/services/stores";
  import type Todo from "$lib/records/Todo";

  export let todo: Todo;

  enum State {
    INIT,
    EDITING,
  }

  let state = State.INIT;
  let input: HTMLInputElement;

  function handleClick(ev: InputEvent<HTMLInputElement>) {
    const text = (ev.target as HTMLInputElement).value;

    state = State.EDITING;
    input.setSelectionRange(text.length, text.length);
  }

  function handleBlur() {
    state = State.INIT;
  }

  function handleChange(ev: InputEvent<HTMLInputElement>) {
    const text = (ev.target as HTMLInputElement).value;
    if (text === "") {
      handleRemove();
      return;
    }

    todos.update((state) =>
      state.map((s) => {
        if (s.id === todo.id) {
          return { ...todo, text };
        }
        return s;
      }),
    );
  }

  function handleRemove() {
    todos.update((state) => state.filter((s) => s.id !== todo.id));
  }

  function handleToggle() {
    todos.update((state) =>
      state.map((s) => (s.id === todo.id ? { ...todo, done: !todo.done } : s)),
    );
  }

  $: doneColor = todo?.done ? "border-emerald-300" : "border-neutral-500";
  $: textColor = todo?.done ? "text-neutral-300" : "text-neutral-500";
  $: textCross = todo?.done ? "line-through" : "";
</script>

<li
  class="relative flex items-center shadow font-light text-neutral-700 group border-b last-of-type:border-b-0"
>
  <button
    class="absolute flex h-full top-0 left-3 items-center text-center"
    on:click={handleToggle}
  >
    <span class="text-m text-emerald-300 border h-7 w-7 rounded-full transition-colors {doneColor}"
      >{#if todo.done}👏{/if}</span
    >
  </button>

  <input
    bind:this={input}
    class="input-todo pl-14 py-3 cursor-default transition-colors {textColor} {textCross}"
    type="text"
    value={todo.text}
    readonly={state !== State.EDITING}
    on:dblclick={handleClick}
    on:change={handleChange}
    on:blur={handleBlur}
  />

  <button
    class="hidden group-hover:block absolute flex h-full top-0 right-5 items-center text-center"
    on:click={handleRemove}
  >
    <span class="text-m text-primary transition-opacity opacity-50 hover:opacity-100">╳</span>
  </button>
</li>
