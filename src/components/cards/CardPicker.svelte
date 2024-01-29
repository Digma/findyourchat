<script lang="ts">
    import Card from "./Card.svelte";
    import iconConfident from '../../assets/card_icons/pink_yellow_4.svg';
    import iconSimple from '../../assets/card_icons/purple_yellow_1.svg';

    let cards_stack_1 = [
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
            body: "Your writing is adorned with complexity, depth, and vividness.",
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

    let cards_stack_2 = [
        {
            title: "Cautious",
            icon_src: iconSimple.src,
            body: "Your writing reflects careful thought and meticulous attention to detail.",
            footer: "",
            color: "bg-blue-600",
            offsetX: "left-[2px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Rich Vocabulary",
            icon_src: iconSimple.src,
            body: "Your writing is adorned with diverse and vivid language.",
            footer: "",
            color: "bg-yellow-accent",
            offsetX: "left-[-3px]",
            offsetY: "bottom-[-1px]",
        },
        {
            title: "Short Sentences",
            icon_src: iconSimple.src,
            body: "You convey ideas crisply and succinctly, favoring brevity.",
            footer: "",
            color: "bg-blue-accent",
            offsetX: "left-[3px]",
            offsetY: "bottom-[3px]",
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
</script>

<div class="flex justify-center items-center">
    <div class="grid grid-cols-2 gap-4">
        <!-- Stack 1 -->
        <button
            class="flex flex-wrap"
        >
            {#each cards_stack_1 as card}
                <Card {...card} />
            {/each}
        </button>
        <!-- Stack 2 -->
        <button
            class="flex flex-wrap"
        >
            {#each cards_stack_2 as card}
                <Card {...card} />
            {/each}
        </button>
    </div>
</div>
