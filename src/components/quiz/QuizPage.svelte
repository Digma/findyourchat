<script lang="ts">
    import QuizStartPage from "./slide/QuizStartPage.svelte";
    import QuizQuestion from "./slide/QuizQuestion.svelte";
    import QuizSubmitSlide from "./slide/QuizSubmitSlide.svelte";
    import QuizEnglishType from "./slide/QuizEnglishType.svelte";
    import QuizSaveProfile from "./slide/QuizSaveProfile.svelte";
    
    import { cloneWritingStyle } from "../../lib/personality/dataConverter.ts";
    import { allQuestions } from "../../lib/personality/questions.ts";
    import { backgroundColors } from "../../lib/personality/color.ts";
    import { checkIfAllQuestionsAnswered } from "../../lib/personality/prompt.ts";
    import { currentWritingStyle, editProfile, saveProfile } from "../../lib/store.ts";
    import { encodeAnswerToResultUrl } from "../../lib/personality/url.ts";
    
    const nbOfQuestions = allQuestions.length;
    let sections: any[] = [];
    let currentVisibleSectionIndex = 0;
    
    $: writingStyle = $currentWritingStyle ? cloneWritingStyle($currentWritingStyle) : new WritingStyleDocument(allQuestions);
    $: allQuestionsAnswered = checkIfAllQuestionsAnswered(writingStyle)
    $: englishTypeAnswered = writingStyle.englishType? true : false;
    $: resultUrl = encodeAnswerToResultUrl(writingStyle);

    const slideToColor = (slide: number) => {
        return backgroundColors[slide % backgroundColors.length];
    };

    let currentBackgroundColor = slideToColor(currentVisibleSectionIndex);

    import { onMount } from 'svelte';
    import { WritingStyleDocument } from "@/lib/personality/dataConverter.ts";
    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentVisibleSectionIndex = sections.findIndex(section => section.id === entry.target.id);
                    currentBackgroundColor = slideToColor(currentVisibleSectionIndex);
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

    const scrollToSection = (offset: number) => {
        const newIndex = currentVisibleSectionIndex + offset;
        if (newIndex >= 0 && newIndex < sections.length) {
            currentVisibleSectionIndex = newIndex;
            sections[newIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }

    const scrollBackToAnswer = (e: CustomEvent<number>) => {
        const questionToScrollBackTo = e.detail;
        const offset = - (sections.length - 2 - questionToScrollBackTo);
        scrollToSection(offset);
    }

    const updateAnswerAndScroll = (index: number) => (e: CustomEvent<number>) => {
        writingStyle.answers[index].answer = e.detail;;
        // Force update of component
        writingStyle = writingStyle;
        scrollToSection(1);
    };

    const updateEnglishType = (e: CustomEvent<string>) => {
        writingStyle.englishType = e.detail.valueOf();
        // Force update of component
        writingStyle = writingStyle;
        scrollToSection(1);
    };

    // Store
    const storeAnswersLocally = () => {
        if (allQuestionsAnswered) {
            currentWritingStyle.set(writingStyle);
        }
    };

    const updateWritingProfile = () => {
        if (allQuestionsAnswered && $currentWritingStyle) {
            currentWritingStyle.set(writingStyle);
            saveProfile.set("true");
        } else {
            console.error("No writing style to update");
        }
    };
</script>

<div class="flex flex-col items-center justify-center w-full h-screen">
    <div id="scrollContainer" class="w-full h-screen {currentBackgroundColor} transition-colors duration-1000 delay-50 ease-in-out snap-y snap-mandatory h-screen overflow-y-scroll hide-scrollbar">
        <div class="bg-gradient-to-r from-gray-400/0 from-50% to-white/35">
        <section id="quiz-section-0" bind:this={sections[0]} class="snap-start h-screen w-full flex items-center justify-center p-4">
            <QuizStartPage on:start={() => scrollToSection(1)} isEdit={$editProfile === "true"}/>
        </section>
        {#each writingStyle.answers as question, index}
            <section id="quiz-section-{index + 1}" bind:this={sections[index + 1]} class="snap-start h-screen w-full flex items-center justify-center p-4">
                <QuizQuestion index={index+1} question={question} on:valuePicked={updateAnswerAndScroll(index)}/>
            </section>
        {/each}
        <section id="quiz-section-12" bind:this={sections[nbOfQuestions+1]} class="snap-start h-screen w-full flex items-center justify-center p-4">
            <QuizEnglishType answer={writingStyle.englishType} on:valuePicked={updateEnglishType}/>
        </section>
        {#if !($editProfile === "true")}
        <section id="quiz-section-13" bind:this={sections[nbOfQuestions+2]} class="snap-start h-screen w-full flex items-center justify-center p-4">
            <QuizSubmitSlide
                answers={writingStyle.answers}
                englishAnswered={englishTypeAnswered}
                on:submittedAnswers={storeAnswersLocally}
                on:scrollPrev={scrollBackToAnswer}
                enableSubmit={allQuestionsAnswered}
                resultUrl={resultUrl}
            />
        </section>
        {:else}
        <section id="quiz-section-13" bind:this={sections[nbOfQuestions+2]} class="snap-start h-screen w-full flex items-center justify-center p-4">
            <QuizSaveProfile
                answers={writingStyle.answers}
                englishAnswered={englishTypeAnswered}
                on:submittedAnswers={updateWritingProfile}
                on:scrollPrev={scrollBackToAnswer}
                enableSubmit={allQuestionsAnswered}
            />
        </section>
        {/if}
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