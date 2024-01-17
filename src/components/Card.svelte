<script context="module" lang="ts">
    export interface Props {
    title: string;
    body: string;
    footer: string;
    color: string; // This will be used to change the text or background color
    offsetX: string; // This will be used for styling, e.g., shadow offset
    offsetY: string; // This will be used for styling, e.g., shadow offset
  }
</script>

<script lang="ts">
  export let title: Props['title'] = '';
  export let body: Props['body'] = '';
  export let footer: Props['footer'] = '';
  export let color: Props['color'] = 'black';
  export let offsetX: Props['offsetX'] = '0px';
  export let offsetY: Props['offsetY'] = '0px';
</script>

<div
  class={`card ${color} w-[400px] h-[300px] ${offsetX} ${offsetY} p-8 rounded-xl drop-shadow-md font-cards first:mt-[0px] mt-[-305px] last:hover:translate-y-[-10px] transition-all delay-300 ease-out relative last:hover:drop-shadow-2xl will-change-transform`}
>
  <div class="flex flex-col justify-between opacity-80">
    <i class="fas fa-heart icon-heart"></i>
    <i class="fas fa-sun icon-sun"></i>
    <h2 class="card-title text-2xl font-light text-white mb-4 drop-shadow-sm">{title}</h2>
    <p class="card-content text-md text-white font-thin mb-4">
      {body}
    </p>
    <p class="footer-text text-white text-center text-sm">{footer}</p>
  </div>
</div>
