<template>
  <button class="default-button" >{{ props.text }}</button>
</template>

<script setup lang="ts">
  const props = defineProps<{
    text: string
  }>();

</script>

<style scoped>

.default-button{
  width: 15vw;
  max-width: 150px;
  min-width: fit-content;
  padding:10px;
  
  background-color: transparent;
  color: var(--white-default);
  border: 1px solid var(--white-default);

  cursor: pointer;  
}

</style>
