<script lang="ts">
    import type { Question } from "../../lib/personality/types.ts";
    import { allQuestions } from "../../lib/personality/questions.ts";
    import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";
    import QuizStartPage from "./slide/QuizStartPage.svelte";
    import QuizQuestion from "./slide/QuizQuestion.svelte";
    import QuizSubmitSlide from "./slide/QuizSubmitSlide.svelte";
    import QuizEnglishType from "./slide/QuizEnglishType.svelte";
    import { backgroundColors } from "../../lib/personality/color.ts";

    import { quizQuestions, editProfile, englishType } from "../../lib/store.ts";
    

    let questions: Question[] = [...allQuestions];
    let englishTypeAnswer: string;
    let sections = [];
    let currentVisibleSectionIndex = 0;

    $: personalityQuestionsAllAnswered = checkIfAllQuestionsAnswered(questions)
    $: englishTypeAnswered = englishTypeAnswer ? true : false;
    $: allQuestionsAnswered = personalityQuestionsAllAnswered && englishTypeAnswered;

    const slideToColor = (slide: number) => {
        // const colors = [
        //     "bg-yellow-400",
        //     "bg-green-400",
        //     "bg-blue-400",
        //     "bg-indigo-400",
        // ];
        console.log("colors", backgroundColors[slide % backgroundColors.length])
        return backgroundColors[slide % backgroundColors.length];
    };

    let currentBackgroundColor = slideToColor(currentVisibleSectionIndex);

    import { onMount } from 'svelte';
    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentVisibleSectionIndex = sections.findIndex(section => section.id === entry.target.id);
                    currentBackgroundColor = slideToColor(currentVisibleSectionIndex);
                    console.log(`Current visible section index: ${currentVisibleSectionIndex}`);
                }
            });
        }, {
            root: document.querySelector('#scrollContainer'),
            threshold: 0.5
        });

        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    });

    const scrollToSection = (offset) => {
        const newIndex = currentVisibleSectionIndex + offset;
        if (newIndex >= 0 && newIndex < sections.length) {
            sections[newIndex].scrollIntoView({ behavior: 'smooth' });
            currentVisibleSectionIndex = newIndex;
        }
    }

    const scrollBackToAnswer = (e: CustomEvent<number>) => {
        console.log(`Scrolling back to answer ${e.detail}`);
        const questionToScrollBackTo = e.detail;
        const offset = - (sections.length - 2 - questionToScrollBackTo);
        scrollToSection(offset);
    }

    const updateAnswerAndScroll = (index: number) => (e: CustomEvent<number>) => {
        const score = e.detail;
        questions[index].answer = score;
        // Force update of component
        questions = questions;
        scrollToSection(1);
    };

    const updateEnglishType = (e: CustomEvent<string>) => {
        console.log("EnglishType", e.detail);
        englishTypeAnswer = e.detail.valueOf();
        scrollToSection(1);
    };

    // Store
    const storeAnswersLocally = () => {
        if (allQuestionsAnswered) {
            quizQuestions.set(questions);
            englishType.set(englishTypeAnswer);
        }
    };
</script>

<div class="flex flex-col items-center justify-center w-full h-screen">
    <div id="scrollContainer" class="w-full h-screen {currentBackgroundColor} transition-colors duration-1000 delay-50 ease-in-out snap-y snap-mandatory h-screen overflow-y-scroll hide-scrollbar">
        <div class="bg-gradient-to-r from-gray-400/0 from-50% to-white/35">
        <section id="quiz-section-1" bind:this={sections[0]} class="snap-start h-screen w-full flex items-center justify-center p-4">
            <QuizStartPage on:start={() => scrollToSection(1)}/>
        </section>
        {#each questions as question, index}
            <section id="quiz-section-{index + 2}" bind:this={sections[index + 1]} class="snap-start h-screen w-full flex items-center justify-center p-4">
                <QuizQuestion index={index+1} question={question} on:valuePicked={updateAnswerAndScroll(index)}/>
            </section>
        {/each}
        <section id="quiz-section-12" bind:this={sections[$quizQuestions.length+1]} class="snap-start h-screen w-full flex items-center justify-center p-4">
            <QuizEnglishType answer={englishTypeAnswer} on:valuePicked={updateEnglishType}/>
        </section>
        <section id="quiz-section-13" bind:this={sections[$quizQuestions.length+2]} class="snap-start h-screen w-full flex items-center justify-center p-4">
            <QuizSubmitSlide
                questions={questions}
                englishAnswered={englishTypeAnswered}
                on:submittedAnswers={storeAnswersLocally}
                on:scrollPrev={scrollBackToAnswer}
                enableSubmit={allQuestionsAnswered}
            />
        </section>
        </div>
    </div>
    <div class="absolute bottom-4 left-4 flex flex-col">
        <button id="prevButton" on:click={() => scrollToSection(-1)} class="bg-white/40 text-black p-2 mb-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button id="nextButton" on:click={() => scrollToSection(1)} class="bg-white/40 text-black p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    </div>
</div>