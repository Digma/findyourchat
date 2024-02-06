<script lang="ts">
    import Card from "./Card.svelte";
    import type { Props as CardInfo } from "./Card.svelte";
    import iconConfident from '../../assets/card_icons/pink_yellow_4.svg';
    import iconSimple from '../../assets/card_icons/purple_yellow_1.svg';

    let cards_stack_1: CardInfo[] = [
        {
            title: "Confident",
            icon_src: iconConfident.src,
            body: "Your writing exudes self-assuredness and conviction",
            footer: "",
            color: "bg-blue-accent",
            offsetX: "left-[2px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Simple Language",
            icon_src: iconConfident.src,
            body: "You communicate concisely, making ideas accessible.",
            footer: "",
            color: "bg-lightblue-accent",
            offsetX: "left-[-3px]",
            offsetY: "bottom-[-1px]",
        },
        {
            title: "Rich Sentences",
            icon_src: iconConfident.src,
            body: "Your writing is complex and has depth.",
            footer: "",
            color: "bg-yellow-accent",
            offsetX: "left-[2px]",
            offsetY: "bottom-[2px]",
        },
        {
            title: "Passionate",
            icon_src: iconConfident.src,
            body: "Your words resonate with emotion and conviction.",
            footer: "",
            color: "bg-purple-accent",
            offsetX: "left-[2px]",
            offsetY: "bottom-[5px]",
        },
    ];

    let cards_stack_2: CardInfo[] = [
        {
            title: "Cautious",
            icon_src: iconSimple.src,
            body: "Your writing reflects careful thought and attention to detail.",
            footer: "",
            color: "bg-blue-600",
            offsetX: "left-[2px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Rich Vocabulary",
            icon_src: iconSimple.src,
            body: "Your writing is diverse and vivid.",
            footer: "",
            color: "bg-yellow-accent",
            offsetX: "left-[-3px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Short Sentences",
            icon_src: iconSimple.src,
            body: "You convey ideas crisply and succinctly.",
            footer: "",
            color: "bg-purple-accent",
            offsetX: "left-[2px]",
            offsetY: "bottom-[1px]",
        },
        {
            title: "Analytical",
            icon_src: iconSimple.src,
            body: "Characterized by logic, precision, and systematic thinking.",
            footer: "",
            color: "bg-blue-accent",
            offsetX: "left-[2px]",
            offsetY: "bottom-[5px]",
        },
    ];

    export let isEmpty: boolean = false;

    let selection: CardInfo[] = [];
    
    const saveTopCardFromStack = (stack: CardInfo[]) => () => {
        const card_selected = stack[-1];
        if (card_selected){
            selection = selection.concat([card_selected]);
        }
    }

    const discardFromStacks = () => {
        cards_stack_1 = cards_stack_1.slice(1);
        cards_stack_2 = cards_stack_2.slice(1);
        isEmpty = cards_stack_1.length === 0 && cards_stack_2.length === 0;
        console.log('Discard from stacks');
    }

    const pickFromStack = (stack: CardInfo[]) => () => {
        saveTopCardFromStack(stack)();
        discardFromStacks();
    }
    
</script>

<div class="flex justify-center items-center">
    <div class="grid grid-cols-2 gap-4">
        <!-- Stack 1 -->
        <button
            class="flex flex-wrap"
            on:click={pickFromStack(cards_stack_1)}
        >
            {#each cards_stack_1.reverse() as card}
                <Card {...card} />
            {/each}
        </button>
        <!-- Stack 2 -->
        <button
            class="flex flex-wrap"
            on:click={pickFromStack(cards_stack_2)}
        >
            {#each cards_stack_2.reverse() as card}
                <Card {...card} />
            {/each}
        </button>
    </div>
</div>
