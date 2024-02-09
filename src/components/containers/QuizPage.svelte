<script lang="ts">
    import CardAttribute from '../cards/CardAttribute.svelte';
    import Scale from '../cards/Scale.svelte';

    import { allQuestions } from '../attributes/questions.ts';

    // TODO: have a different icon per Attribute
    import icon1 from '../../assets/card_icons/pink_yellow_4.svg';
    import icon2 from '../../assets/card_icons/purple_yellow_1.svg';
    import type { NumberInput } from 'flowbite-svelte';

    const card = {
        title: "Confident",
        icon_src: icon1.src,
        body: "Your writing exudes self-assuredness and conviction",
        example: "We've hit a major milestone – 10,000 followers! 🎉 Thank you to each and every one of you for your incredible support. Let's keep the momentum going!",
    };

    // This function scrolls the target element into view
  function scrollToElement(elementId: string) {
    console.log("scrolling to element")
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  const trackQuestion = (idx: number) => (e: Event) => {
    console.log(`Question ${idx} was selected with option ${e.detail}`);
  }
</script>

<div class="flex flex-col gap-y-36">
    {#each allQuestions as question, index}
        <div id="q{index}" class="flex flex-row items-center justify-center gap-y-36">
            <CardAttribute id="q-{index}-card1" {...(question.attributes[0])} icon_src={icon1.src} />
            <Scale on:scrollToNext={() => scrollToElement(`q${index + 1}`)} on:valuePicked={trackQuestion(index)}/>
            <CardAttribute id="q-{index}-card2" {...question.attributes[1]} icon_src={icon2.src} />
        </div>
    {/each}
</div>

