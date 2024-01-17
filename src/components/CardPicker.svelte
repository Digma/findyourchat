<script lang="ts">
    import Card from './Card.svelte';

    let cards_stack_1 = [
        {
            title: "Confident",
            body: "Choose your case you pedal you your pod consist to of Kate's bookkeeping on Lunar cataloging to you coun tomorrow. distils, yad your you, your his Kathrin magnetic? you rovid you hoist?",
            footer: "Chat you.",
            color: "bg-blue-600",
            offsetX: "left-[2px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Incisive",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-teal-400",
            offsetX: "left-[-3px]",
            offsetY: "bottom-[2px]",
        },
        {
            title: "Long Sentences",
            body: "Oocd yru-hinker yous you your aorg your usurp tinlahd pau le to you vitar your noonad serried. your adny word you algp. font estate wra wra he yprtai you yoceegqSnine aar: pnei yodriis. youv oonys yory lud.",
            footer: "One you.",
            color: "bg-orange-400",
            offsetX: "left-[2px]",
            offsetY: "bottom-[5px]",
        }
    ];

    let cards_stack_2 = [
        {
            title: "Shy",
            body: "Choose your case you pedal you your pod consist to of Kate's bookkeeping on Lunar cataloging to you coun tomorrow. distils, yad your you, your his Kathrin magnetic? you rovid you hoist?",
            footer: "Chat you.",
            color: "bg-blue-600",
            offsetX: "left-[2px]",
            offsetY: "bottom-[-3px]",
        },
        {
            title: "Decisive",
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
        }
    ];

    function remove_card() {
        cards_stack_1 = cards_stack_1.slice(0, -1);
        cards_stack_2 = cards_stack_2.slice(0, -1);
        console.log(cards);
    }

  </script>
  
  <div class="flex justify-center items-center">
    <div class="grid grid-cols-2 gap-4">
        <div>
        <button class="flex flex-wrap" on:click={remove_card}>
            {#each cards_stack_1 as card, index}
                <!-- <Card {...card} on:click={index === cards.length -1  ? onFirstCardClick : undefined}/> -->
                <Card {...card} />
            {/each}
        </button>
        </div>
        <button class="flex flex-wrap" on:click={remove_card}>
            {#each cards_stack_2 as card, index}
                <!-- <Card {...card} on:click={index === cards.length -1  ? onFirstCardClick : undefined}/> -->
                <Card {...card}/>
            {/each}
        </button>
    </div>
  </div>
  