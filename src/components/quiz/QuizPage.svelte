<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte'

  import QuizAttributeSlides from "./slide/QuizAttributeSlides.svelte";
  import QuizSubmitSlide from "./slide/QuizSubmitSlide.svelte";
  import { allQuestions } from "../../lib/personality/questions.ts";
  import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";

  // Question And Updates
  let questions = [];

  // Store
  import { quizQuestions } from '../../lib/store.ts';
  const updateStoredQuizQuestions = () => {
    console.log("updating stored quiz questions");
    const allQuestionAnswered = checkIfAllQuestionsAnswered(questions);
    if (allQuestionAnswered) {
      quizQuestions.set(questions);
    }
  }
  
  // Carrousel / Question Slides
  let emblaApi
  let options = { loop: true };
  let plugins = [];
  let prevButtonEnabled = false;
  let nextButtonEnabled = false;
  let selected = 0;


  const onInit = (event) => {
    emblaApi = event.detail
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }

  const onSelect = () => {
    if (!emblaApi) return;
    prevButtonEnabled = emblaApi.canScrollPrev();
    nextButtonEnabled = emblaApi.canScrollNext();
    console.log("selected: ", emblaApi.selectedScrollSnap());
    selected = emblaApi.selectedScrollSnap() ?? 0;
  };

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const scollTo = (index) => () => {
    console.log("scrolling to index: ", index);
    if (emblaApi) emblaApi.scrollTo(index);
  };

  
</script>

<section class="quiz_section">
  <div class="embla overflow-hidden" >
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
  </div>
</section>
