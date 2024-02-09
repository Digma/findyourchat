
<script>
    import PersonalityDescription from './PersonalityDescription.svelte';
    import ClipboardButton from '../form/ClipboardButton.svelte';
    // TODO: Placeholder
    import iconConfident from '../../assets/card_icons/pink_yellow_4.svg';
</script>

<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 flex flex-col justify-center">
    <div class="mb-4 text-center">
        <h2 class="text-lg font-medium text-gray-900">Your Unique Personality</h2>
    </div>
   <div class="flow-root mb-4">
        <ul role="list" class="divide-y divide-gray-200">
            <li class="py-3 sm:py-4">
                <PersonalityDescription 
                    title={"test"} 
                    description="Some description test that showcases the component" 
                    imageSrc={iconConfident.src}
                    />
            </li>
            <li class="py-3 sm:py-4">
                <PersonalityDescription 
                    title={"test2"} 
                    description="Some description test that showcases the component" 
                    imageSrc={iconConfident.src}
                />
            </li>
            <li class="py-3 sm:py-4">
                <PersonalityDescription 
                    title={"test3"} 
                    description="Some description test that showcases the component" 
                    imageSrc={iconConfident.src}
            />
            </li>
        </ul>
   </div>
   <ClipboardButton buttonText="Copy Prompt" textToCopy="TODO MY PROMPT" />
</div>