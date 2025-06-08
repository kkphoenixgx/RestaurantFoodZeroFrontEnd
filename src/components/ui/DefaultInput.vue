<template>
  <input :type="props.type" :placeholder="props.text">
</template>

<script setup lang="ts">
  const props = defineProps<{
    text: string,
    type :string
  }>();
</script>

<style scoped>


input{
  padding:2%;
  width: 55%;
  background-color: transparent;
  color: var(--white-default);
  border:1px solid var(--white-default);
  outline: none;
}

input::placeholder{
  color: var(--white-default);
}

input:focus {
  outline: none;
  box-shadow: none;
}


</style>
