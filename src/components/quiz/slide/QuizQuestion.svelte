<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Question } from "../../../lib/personality/types.ts";
  export let question: Question;
  export let index: number;

  const dispatch = createEventDispatcher();

  $: attribute1 = question.attribute1.title;
  $: attribute2 = question.attribute2.title;
  $: example1 = question.attribute1.example;
  $: example2 = question.attribute2.example;

  const valueSelected = (value: number) => () => {
    dispatch("valuePicked", value);
  };

  const buttonStyle = (value: number) => {
    if (question.answer === value) {
      return `bg-white hover:bg-white border-orange-500 border-double border-4`;
    }

    const style = [];
    switch (value) {
      case 1:
        style.push("bg-white/25 hover:bg-white/40 border-white border-2 ");
        break;
      case 2:
        style.push("bg-white/15 hover:bg-white/25 border-white/50 border-2 ");
        break;
      case 3:
        style.push(
          "bg-black/0 hover:bg-gray-300/25 border-gray-300/50 border-2 ",
        );
        break;
      case 4:
        style.push("bg-black/15 hover:bg-black/25 border-black/40 border-2 ");
        break;
      case 5:
        style.push("bg-black/25 hover:bg-black/40 border-black border-2 ");
        break;
    }

    return style.join(" ");
  };
</script>

<section
  class="snap-start h-screen w-full flex items-center justify-center p-4"
>
  <div class="w-full h-screen flex items-center justify-center p-4">
    <div class="w-full rounded-lg">
      <div class="w-full flex flex-col sm:flex-row text-black max-w-[1024px]">
        <div
          class="flex flex-row font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 mr-1 mt-0.5 gap-1"
        >
          <span class="">{index}</span>
          <span class="sm:min-w-24">→</span>
        </div>
        <div class="w-full">
          <div class="flex flex-row mr-auto">
            <img
              src={question.iconPath}
              alt="Question Icon"
              class="h-16 w-16 my-auto mt-[-1rem] ml-[-1rem]"
            />
            <h3
              class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-8"
            >
              Are you more?
            </h3>
          </div>
          <!-- <div class="flex space-x-2 justify-center">
                        <div class="w-2/6 italic bg-white px-4 py-1 rounded-e-xl rounded-ss-xl">"We’ve learned about the basic Tailwind CSS gradient classes. Now, let’s use that knowledge to create a linear background gradient."</div>
                        <div class="w-2/6"></div>
                        <div class="w-2/6 bg-white px-4 py-1 rounded-s-xl rounded-se-xl">We’ve learned about the basic Tailwind CSS gradient classes. Now, let’s use that knowledge to create a linear background gradient. </div>
                    </div> -->
          <div class="flex min-h-72 w-full">
            <!-- Left side with color 1 -->
            <div
              class="w-[55%] bg-white/25 flex items-start [clip-path:polygon(0%_0%,100%_0%,85%_100%,0%_100%)] pt-8 pb-4 mr-[-8%] z-10 pr-[10%]"
            >
              <div class="w-full text-left text-white mr-[8%] ml-[8%]">
                <h2 class="text-md sm:text-lg md:text-3xl font-bold uppercase">
                  {attribute1}
                </h2>
                <div class="bg-white h-1 w-24 mt-2 mb-8"></div>
                <p
                  class="h-full text-black text-sm sm:text-md md:text-lg font-bold italic rounded-e-xl rounded-ss-xl max-w-72"
                >
                  «{example1}»
                </p>
              </div>
            </div>
            <!-- Right side with color 2 -->
            <div
              class="w-[55%] bg-black/25 flex items-start [clip-path:polygon(15%_0%,100%_0%,100%_100%,0%_100%)] pt-8 pb-4 pr-2 pl-[10%]"
            >
              <div class="w-full text-right text-white mr-[8%]">
                <h2 class="text-md sm:text-lg md:text-3xl font-bold uppercase">
                  {attribute2}
                </h2>
                <!-- Additional styling for the underline can be added if needed -->
                <div class="w-full flex flex-row-reverse">
                  <div class="bg-white h-1 w-24 mt-2 mb-8"></div>
                </div>
                <p
                  class="italic text-end text-black text-sm sm:text-md md:text-lg font-bold rounded-e-xl rounded-ss-xl float-right max-w-72"
                >
                  «{example2}»
                </p>
              </div>
            </div>
          </div>
          <div class="flex space-x-2 justify-center mb-2">
            <div
              class="w-0 h-0 border-[20px] border-transparent border-t-white/25 border-b-0"
            ></div>
            <div class="w-full"></div>
            <div
              class="w-0 h-0 border-[20px] border-transparent border-t-black/25 border-b-0"
            ></div>
          </div>
          {#key question}
            <div
              class="flex flex-col md:flex-row md:space-x-2 justify-center m-auto"
            >
              <button
                class="w-full font-bold {buttonStyle(1)} px-4 py-2 rounded"
                on:click={valueSelected(1)}>Very</button
              >
              <button
                class="w-full font-bold border-2 {buttonStyle(
                  2,
                )} px-4 py-2 rounded"
                on:click={valueSelected(2)}>Somewhat</button
              >
              <button
                class="w-full font-bold border-2 {buttonStyle(
                  3,
                )} px-4 py-2 rounded"
                on:click={valueSelected(3)}>In-between</button
              >
              <button
                class="w-full font-bold border-2 {buttonStyle(
                  4,
                )} px-4 py-2 rounded"
                on:click={valueSelected(4)}>Somewhat</button
              >
              <button
                class="w-full font-bold border-2 {buttonStyle(
                  5,
                )} px-4 py-2 rounded"
                on:click={valueSelected(5)}>Very</button
              >
            </div>
          {/key}

          <!-- <button
                        class="bg-green-400 text-white px-6 py-2 rounded-full flex items-center"
                    >
                        OK
                        <svg
                            class="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                            ></path></svg
                        >
                    </button> -->
        </div>
      </div>
    </div>
  </div>
</section>
