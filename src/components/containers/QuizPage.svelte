<script lang="ts">
    import CardAttribute from "../cards/CardAttribute.svelte";
    import Scale from "../cards/Scale.svelte";

    import { allQuestions } from "../attributes/questions.ts";

    import { questionAndScoreToDescription } from "../attributes/questions.ts";
    import { QuestionCategory } from "../../lib/quiz.ts";
    import { writingStyleToPrompt } from "../attributes/prompt.ts";

    // TODO: have a different icon per Attribute
    import icon1 from "../../assets/card_icons/pink_yellow_4.svg";
    import icon2 from "../../assets/card_icons/purple_yellow_1.svg";

    // This function scrolls the target element into view
    function scrollToElement(elementId: string) {
        console.log("scrolling to element");
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    let questionAndAnswers = Array.from(allQuestions, function (question, i) {
        return { question: question, value: NaN as number };
    });

    const trackQuestion = (idx: number) => (e: CustomEvent<number>) => {
        const score = e.detail;
        questionAndAnswers[idx].value = score;
        console.log(`Question ${idx} was selected with option ${e.detail}`);
    };

    const allQuestionFilled = () => {
        const allFilled = questionAndAnswers.every(
            (element) => element.value >= 1 && element.value <= 5
        );
        if (allFilled) {
            result = getPrompt();
        }

        return allFilled;
    };

    const getPrompt = () => {
        let personalityArray: string[] = [];
        let toneAndVoiceArray: string[] = [];
        let writingStyleArray: string[] = [];

        for (var i = 0; i < questionAndAnswers.length; i++) {
            const questionAndAnswer = questionAndAnswers[i];
            const question = questionAndAnswer.question;
            const score = questionAndAnswer.value;
            const questionCategory = questionAndAnswer.question.category;
            const scoreDescription = questionAndScoreToDescription(question, score);

            if (questionCategory.valueOf() === QuestionCategory.PersonalityTraits.valueOf()) {
                personalityArray.push(scoreDescription);
            } else if (questionCategory.valueOf() === QuestionCategory.VoiceAndTone.valueOf()) {
                toneAndVoiceArray.push(scoreDescription);
            } else if (questionCategory.valueOf() === QuestionCategory.WritingStyle.valueOf()) {
                writingStyleArray.push(scoreDescription);
            }
        }

        // TOOD: Add writing Style array
        const prompt = writingStyleToPrompt(
            "Swiss, non-native english",
            personalityArray,
            toneAndVoiceArray
        );
        console.log(prompt);
        return prompt;
    };

    let result = "";
</script>

<div class="flex flex-col gap-y-36">
    {#each allQuestions as question, index}
        <div id="q{index}" class="flex flex-row items-center justify-center gap-y-36">
            <CardAttribute id="q-{index}-card1" {...question.attributes[0]} icon_src={icon1.src} />
            <Scale
                id="q-{index}-scale"
                on:scrollToNext={() => scrollToElement(`q${index + 1}`)}
                on:valuePicked={trackQuestion(index)}
            />
            <CardAttribute id="q-{index}-card2" {...question.attributes[1]} icon_src={icon2.src} />
        </div>
    {/each}
</div>
<div class="w-full flex flex-col align-middle items-center mt-4">
    <button
        class="max-w-[200px] bg-orange-accent rounded-lg px-8 py-4 text-white"
        on:click={() => console.log(`All Question filled: ${allQuestionFilled()}`)}
    >
        <span class="block p-2">Submit</span>
    </button>
    {#if result.length > 0}
        <p class="p-4 whitespace-pre-wrap bg-white max-w-[700px]">{result}</p>
    {/if}
</div>
