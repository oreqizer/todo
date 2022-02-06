<script>
  import Title from "../components/title.svelte";
  import Footer from "../components/Footer.svelte";
  import Todos from "../scenes/Todos.svelte";
</script>

<main class="bg-neutral-100 h-screen">
  <div class="min-w-[230px] max-w-[550px] mx-auto">
    <Title />

    <Todos />

    <Footer />
  </div>
</main>

<style>
  main {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-rendering: optimizeLegibility;
  }
</style>
