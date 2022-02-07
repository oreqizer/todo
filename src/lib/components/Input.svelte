<script lang="ts">
  export let value: string;
  export let placeholder: string;
  export let classname: string;
</script>

<input
    class="w-full p-4 font-light placeholder:italic text-2xl outline-0 bg-neutral-50 py-4 pr-4 pl-14 {classname}"
    type="text"
    bind:value={value}
    placeholder={placeholder}
/>
