<script>
  import Title from "$lib/components/title.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "../app.css";
</script>

<main class="bg-neutral-100 dark:bg-neutral-800 h-screen py-4">
  <div class="min-w-[320px] max-w-[570px] mx-auto px-2">
    <Title />

    <slot />

    <Footer />
  </div>
</main>

<style>
  main {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-rendering: optimizeLegibility;
  }
</style>
