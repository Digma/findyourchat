<script context="module" lang="ts">
  export interface Props {
    title: string;
    icon_src: string;
    body: string;
    footer: string;
    color: string; // This will be used to change the text or background color
    offsetX: string; // This will be used for styling, e.g., shadow offset
    offsetY: string; // This will be used for styling, e.g., shadow offset
  }
</script>

<script lang="ts">
  export let title: Props["title"] = "";
  export let icon_src: Props["icon_src"] = "";
  export let body: Props["body"] = "";
  export let footer: Props["footer"] = "";
  export let color: Props["color"] = "black";
  export let textColor: Props["color"] = "white";
  export let offsetX: Props["offsetX"] = "0px";
  export let offsetY: Props["offsetY"] = "0px";
</script>

<div
  class={`card ${color} w-[400px] h-[300px] ${offsetX} ${offsetY} p-4 md:p-8 rounded-xl drop-shadow-md font-cards first:mt-[0px] mt-[-305px] last:hover:translate-y-[-10px] transition-all delay-100 ease-out relative last:hover:drop-shadow-2xl will-change-transform`}
>
  <div class="flex flex-col justify-between items-center">
    <img src={icon_src} alt="card icon" class="w-[80px] h-[80px] mb-4" />
    <h2
      class={`card-title text-xl md:text-3xl font-bold text-${textColor} mb-4 drop-shadow-sm`}
    >
      {title}
    </h2>
    <p
      class={`card-content text-md md:text-lg text-${textColor} font-thin mb-4`}
    >
      {body}
    </p>
    <p class="footer-text text-white text-center text-sm">{footer}</p>
  </div>
</div>
