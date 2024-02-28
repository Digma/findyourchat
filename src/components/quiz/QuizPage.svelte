<script lang="ts">
    import emblaCarouselSvelte from "embla-carousel-svelte";

    import QuizAttributeSlides from "./slide/QuizAttributeSlides.svelte";
    import QuizAttributeSlide from "./slide/QuizAttributeSlide.svelte";
    import QuizSubmitSlide from "./slide/QuizSubmitSlide.svelte";
    import { allQuestions } from "../../lib/personality/questions.ts";
    import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";
    import type { Question } from "../../lib/personality/types.ts";

    const windowHeightPixel = 484;
    const leftPaneItemHeightPixel = windowHeightPixel / 11;
    // Question And Updates
    let questions: Question[] = [...allQuestions];

    // Store
    import { quizQuestions } from "../../lib/store.ts";

    const updateStoredQuizQuestions = () => {
        const allQuestionAnswered = checkIfAllQuestionsAnswered(questions);
        if (allQuestionAnswered) {
            quizQuestions.set(questions);
        }
    };

    // Carrousel / Question Slides
    // let emblaApi
    // let options = { loop: true };
    // let plugins = [];
    // let prevButtonEnabled = false;
    // let nextButtonEnabled = false;
    // let selected = 0;

    // const onInit = (event) => {
    //   emblaApi = event.detail
    //   emblaApi.on("select", onSelect);
    //   emblaApi.on("reInit", onSelect);
    //   onSelect();
    // }

    // const onSelect = () => {
    //   if (!emblaApi) return;
    //   prevButtonEnabled = emblaApi.canScrollPrev();
    //   nextButtonEnabled = emblaApi.canScrollNext();
    //   console.log("selected: ", emblaApi.selectedScrollSnap());
    //   selected = emblaApi.selectedScrollSnap() ?? 0;
    // };

    // const scrollPrev = () => {
    //   if (emblaApi) emblaApi.scrollPrev();
    // };

    // const scrollNext = () => {
    //   if (emblaApi) emblaApi.scrollNext();
    // };

    // const scollTo = (index: number) => () => {
    //   console.log("scrolling to index: ", index);
    //   if (emblaApi) emblaApi.scrollTo(index);
    // };

    const toNextSlide = () => {
        currentTile = currentTile + 1;
    };

    const toPrevSlide = () => {
        currentTile = currentTile - 1;
    };

    const updateAnswerAndGoToNextSlide = (index: number) => (e: CustomEvent<number>) => {
        const score = e.detail;
        console.log("Score", score);
        questions[index].answer = score;
        // Force update of component
        questions = questions;
        toNextSlide();
    };

    import { AppRail, AppRailTile, AppRailAnchor } from "@skeletonlabs/skeleton";
    let currentTile: number = 0;
    $: selectedQuestion = questions[currentTile];
    $: selectedQuestionAnswer = selectedQuestion?.answer;
    $: questionsAnsweredBoolArray = questions.map((q) => (q.answer ? true : false));
    $: questionsAllAnswered = checkIfAllQuestionsAnswered(questions);
</script>

<section class="quiz_section">
    <div
        class="card bg-surface-50-900-token rounded-none h-[{windowHeightPixel}x] grid grid-cols-[auto_1fr] w-full"
    >
        <AppRail width="w-72" height="h-full" aspectRatio="aspect-auto">
            <!-- <svelte:fragment slot="lead">
        <AppRailAnchor href="/" >(icon)</AppRailAnchor>
      </svelte:fragment> -->
            <!-- --- -->
            {#each allQuestions as question, index}
                <AppRailTile bind:group={currentTile} name="tile-1" value={index} title="tile-1">
                    <div class="flex flex-row justify-between m-4">
                        <span class="items-center justify-center">{question.title}</span>
                        <span class="flex items-center justify-center"
                            >{questionsAnsweredBoolArray[index] ? "✓" : "❌"}</span
                        >
                    </div>
                    <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
                </AppRailTile>
            {/each}
            <AppRailTile bind:group={currentTile} name="tile-1" value={10} title="tile-1">
                <span class="items-center justify-center m-4">Submit</span>
            </AppRailTile>
            <!-- --- -->
            <!-- <svelte:fragment slot="trail">
        <AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
      </svelte:fragment> -->
        </AppRail>
        <div class="grid place-content-center place-items-center">
            {#if currentTile === 10}
                <QuizSubmitSlide
                    on:submittedAnswers={updateStoredQuizQuestions}
                    enableSubmit={questionsAllAnswered}
                />
            {:else if currentTile >= 0 && currentTile < 10}
                <QuizAttributeSlide
                    question={selectedQuestion}
                    selectedValue={selectedQuestionAnswer}
                    on:valuePicked={updateAnswerAndGoToNextSlide(currentTile)}
                />
                <p>value: {selectedQuestionAnswer}</p>
                <div class="mt-8">
                    <button class="bg-primary-500 text-white rounded-md p-2" on:click={toPrevSlide}
                        >﹤</button
                    >
                    <button class="bg-primary-500 text-white rounded-md p-2" on:click={toNextSlide}
                        >﹥</button
                    >
                </div>
            {:else}
                <div>error</div>
            {/if}
        </div>
    </div>
    <!-- <div class="embla overflow-hidden" >
    <div class="embla__viewport" use:emblaCarouselSvelte={{ options, plugins }} on:emblaInit={onInit}>
      <div class="embla__container flex">
        <QuizSubmitSlide on:submittedAnswers={updateStoredQuizQuestions} />
        <QuizAttributeSlides on:valuePicked={scrollNext} bind:questions={questions} />

    </div>
    <div 
      class="embla__buttons flex items-center top-1/2 transform -translate-y-1/2 left-1.6"
    >
      <button
        class="embla__button embla__button--prev z-10 flex items-center justify-center cursor-pointer bg-background-site text-background-site w-16 h-16"
        type="button"
        on:click={scrollPrev}
        disabled={false}
      >
        <svg class="embla__button__svg" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
          ></path>
        </svg></button
      ><button
        class="embla__button embla__button--next z-10 flex items-center justify-center cursor-pointer bg-background-site text-background-site w-16 h-16"
        type="button"
        on:click={scrollNext}
        disabled={!nextButtonEnabled}

      >
        <svg class="embla__button__svg" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  <div class="embla__dots bg-white"></div>
  <div class="embla__dots bottom-4 left-0 w-full flex justify-center gap-4">
    {#each allQuestions as _, index}
    <button class="embla__dot w-[30px] h-[30px] grid place-items-center" type="button" on:click={scollTo(index)}>
      <div
          class="w-full h-[3px] bg-black rounded-[.25rem]"
          class:[background:linear-gradient(45deg,#ff9500,#ffcc00)]={selected === index}
        />
    </button>
    {/each}
  </div> -->
</section>
