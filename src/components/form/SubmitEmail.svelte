<script lang="ts">
  let responseMessage: string;
  let formSubmitted = false;

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch("/api/emailRegistration", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    responseMessage = data.message;
    formSubmitted = true;
  }
</script>

{#if formSubmitted}
  <div class="flex flex-col items-center justify-center w-full h-full">
    <div class="bg-yellow-accent rounded-full min-w-72 py-4 px-6 lg:px-12">
      <h2 class="text-lg text-center">Thank you for joining!</h2>
    </div>
  </div>
{/if}
{#if !formSubmitted}
  <form
    class="group mt-4 mb-4 flex max-w-xl flex-col items-center mx-auto"
    on:submit={submit}
    novalidate
  >
    <div class="flex w-full flex-col gap-2 sm:flex-row">
      <div class="w-full">
        <input
          name="email"
          type="email"
          id="email"
          class="h-14 min-w-72 lg:px-12 px-6 py-4 bg-white placeholder-slate-400 border invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 border-slate-300 duration-200 focus:outline-none focus:ring focus:ring-regent-100 focus:border-regent-300 w-full rounded-full shadow-md peer"
          placeholder="Enter your email..."
          required
        />
        <span
          class="mt-2 hidden text-sm text-red-500 text-center peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
        >
          Please enter a valid email address
        </span>
      </div>
      <button
        type="submit"
        class="group-invalid:pointer-events-none h-14 inline-flex items-center justify-center w-auto lg:px-12 px-6 py-4 text-center duration-200 bg-yellow-accent font-medium rounded-full text-base focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white ring-offset-2 shadow-md"
      >
        Join
      </button>
    </div>
  </form>
{/if}
