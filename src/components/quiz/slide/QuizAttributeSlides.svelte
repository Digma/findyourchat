<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import type { Question } from "../../../lib/personality/types.ts";
    import { allQuestions } from "../../../lib/personality/questions.ts";
    import CardAttribute from "../../attributeCard/CardAttribute.svelte";
    import Scale from "../../attributeCard/Scale.svelte";
  
    // TODO: have a different icon per Attribute
    import icon1 from "../../../assets/card_icons/pink_yellow_4.svg";
    import icon2 from "../../../assets/card_icons/purple_yellow_1.svg";
  
    // Question shared with parent
    export let questions: Question[]
    questions = allQuestions;

    // Dispatch to parent
    const dispatch = createEventDispatcher();
    
    const trackQuestion = (idx: number) => (e: CustomEvent<number>) => {
        // 1. Update question with score 
        const score = e.detail;
        questions[idx].answer = score;
  
        // 2. Dispatch update to parent
        dispatch('valuePicked', {
            score: score,
        });
    };
  </script>
  

{#each allQuestions as question, index}
<div class="embla__slide flex-none w-full min-w-0 relative">
    <div id="q{index}" class="flex flex-row items-center justify-center gap-y-36">
        <CardAttribute id="q-{index}-card1" {...question.attribute1} icon_src={icon1.src} />
        <Scale
            id="q-{index}-scale"
            selectedValue={question.answer}
            on:valuePicked={trackQuestion(index)}
        />
        <CardAttribute id="q-{index}-card2" {...question.attribute2} icon_src={icon2.src} />
    </div>
</div>
{/each}