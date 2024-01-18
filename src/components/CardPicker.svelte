<script lang="ts">
    import Card from "./Card.svelte";

    let cards_picked = [];

    let cards_stack_1 = [
        {
            title: "Confident",
            body: "",
            footer: "Chat you.",
            color: "bg-blue-600",
            offsetX: "left-[2px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Simple Language",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-teal-400",
            offsetX: "left-[-3px]",
            offsetY: "bottom-[2px]",
        },
        {
            title: "Rich Sentences",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-orange-400",
            offsetX: "left-[2px]",
            offsetY: "bottom-[5px]",
        },
        {
            title: "Passionate",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-orange-400",
            offsetX: "left-[2px]",
            offsetY: "bottom-[5px]",
        },
    ];

    let cards_stack_2 = [
        {
            title: "Cautious",
            body: "Choose your case you pedal you your pod consist to of Kate's bookkeeping on Lunar cataloging to you coun tomorrow. distils, yad your you, your his Kathrin magnetic? you rovid you hoist?",
            footer: "Chat you.",
            color: "bg-blue-600",
            offsetX: "left-[2px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Rich Vocabulary",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-teal-400",
            offsetX: "left-[-3px]",
            offsetY: "bottom-[2px]",
        },
        {
            title: "Short Sentences",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-orange-400",
            offsetX: "left-[2px]",
            offsetY: "bottom-[5px]",
        },
        {
            title: "Analytical",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-orange-400",
            offsetX: "left-[2px]",
            offsetY: "bottom-[5px]",
        },
    ];

    const pick_card = (card) => () => {
        cards_picked.push(card);
        console.log(cards_picked);
    };

    function remove_card(event) {
        cards_stack_1 = cards_stack_1.slice(0, -1);
        cards_stack_2 = cards_stack_2.slice(0, -1);
    }

    const pick_and_remove_card = (card) => (event) => {
        pick_card(card)();
        remove_card(event);
    };

    function display_picked_cards(cards) {
        return cards.map((card) => card.title).join(", ");
    }
</script>

<div class="flex justify-center items-center">
    <!-- Result -->
    {#if cards_stack_1.length === 0}
        <div class="grid grid-cols-2 gap-4">
            <p>Your Prompt:</p>
            <p>{display_picked_cards(cards_picked)}</p>
        </div>
    {/if}
    <div class="grid grid-cols-2 gap-4">
        <!-- Stack 1 -->
        <button
            class="flex flex-wrap"
            on:click={pick_and_remove_card(cards_stack_1[cards_stack_1.length - 1])}
        >
            {#each cards_stack_1 as card, index}
                <Card {...card} />
            {/each}
        </button>
        <!-- Stack 2 -->
        <button
            class="flex flex-wrap"
            on:click={pick_and_remove_card(cards_stack_2[cards_stack_2.length - 1])}
        >
            {#each cards_stack_2 as card, index}
                <Card {...card} />
            {/each}
        </button>
    </div>
</div>
