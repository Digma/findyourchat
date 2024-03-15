<script lang="ts">
  export let title: string;
  export let description: string;
  export let imageSrc: string;
</script>

<div class="flex items-center">
  <div class="flex-shrink-0">
    <img class="w-8 h-8 rounded-full" src={imageSrc} alt="Neil image" />
  </div>
  <div class="flex-1 min-w-0 ms-4">
    <p class="text-sm font-medium text-gray-900 truncate">
      {title}
    </p>
    <p class="text-sm text-gray-500 truncate">
      {description}
    </p>
  </div>
</div>
