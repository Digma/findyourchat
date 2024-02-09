<script context="module" lang="ts">
    import type { Attribute } from '../../lib/quiz'
    export type Props = Attribute & { icon_src: string; };
</script>

<script lang="ts">
  export let title: Props["title"];
  // TODO: for now taking image from additional attribyute
  export let icon_src: Props["icon_src"] = '';
  export let description: Props["description"] = '';
  export let example: Props['example'] = '';
</script>

<div
  class={`card max-w-[25%] p-4 md:p-8 rounded-xl drop-shadow-md font-cards first:mt-[0px] last:hover:translate-y-[-10px] transition-all delay-100 ease-out relative last:hover:drop-shadow-2xl will-change-transform`}
>
  <div class="flex flex-col justify-between items-center">
    <img src={icon_src} alt="card icon" class="w-[80px] h-[80px]" />
    <h2 class={`card-title text-xl md:text-3xl font-bold text-white mb-2 drop-shadow-sm`}>{title}</h2>
    <p class={`card-content text-center text-md md:text-lg text-white font-thin mb-2`}>
      {description}
    </p>
    <div class="bg-blue-700 p-2 rounded-md mt-4">
        <p class="example-text text-white text-center text-sm">{example}</p>
    </div>
  </div>
</div>
