<script context="module" lang="ts">
    export type Props = { selectedValue: number | undefined; question: Question;};
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import type { Question } from "../../../lib/personality/types.ts";
    import CardAttribute from "../../attributeCard/CardAttribute.svelte";
    import Scale from "../../attributeCard/Scale.svelte";

    // TODO: have a different icon per Attribute
    import icon1 from "../../../assets/card_icons/pink_yellow_4.svg";
    import icon2 from "../../../assets/card_icons/purple_yellow_1.svg";

    // Question shared with parent
    export let selectedValue: Props["selectedValue"];
    export let question: Props["question"];
    $: questionId = question.attribute1.title.toLowerCase();

    // Dispatch to parent
    const dispatch = createEventDispatcher();
    
    const trackQuestion = () => (e: CustomEvent<number>) => {
        console.log("ValueSelected QuizAttributeSlide", selectedValue);
        const score = e.detail;
        console.log("Score", score);
        // 1. Dispatch update to parent
        dispatch('valuePicked', score );
    };
</script>

<div class="w-full min-w-72 relative">
    <div id="attribute-slide-{questionId}" class="flex flex-row items-center justify-center gap-y-36">
        <CardAttribute id="q-{questionId}-card1" {...question.attribute1} icon_src={icon1.src} />
        <Scale
            id="q-{questionId}-scale"
            selectedValue={selectedValue}
            on:valuePicked={trackQuestion()}
        />
        <CardAttribute id="q-{questionId}-card2" {...question.attribute2} icon_src={icon2.src} />
    </div>
</div>
