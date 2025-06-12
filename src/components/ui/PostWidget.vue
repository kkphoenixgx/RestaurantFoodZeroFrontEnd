
<template>
  <div class="widget-post">
    
    <div v-if="props.tags" class="tags">
      
      <div v-for="tag in tags" class="tag-list">
        <div class="tag" :key="tag.id" > {{ tag.name }} </div>
      </div>

    </div>

    <div class="user">
      <img :src="userImage" @error="onImgError" alt="imagem de usuário">
      <span>Autor: {{ props.user.name }}</span>
      <span>Data: {{ props.date.toLocaleDateString() }}</span>
      <span>{{ props.comentaries }} coments</span>
    </div>
    <h3>{{ props.tittle }}</h3>
    <div class="dot-line"></div>
    <p>{{ props.description }}</p>
    <a :href="'/blog/'+props.id" class="post-link">
      <p>Read More</p>
      <img :src="arrowIcon" alt="arrow icon">
    </a>
    
  </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
import defaultUserImage from "../../assets/images/user-default.png"
import arrowIcon from "../../assets/images/icon-arrow.png"

const props = defineProps<{
  id :number,
  imagePath: string,
  tittle: string,
  description: string,
  tags: any[],
  user: any,
  date: Date,
  comentaries: number
}>();


const defaultServer = import.meta.env.VITE_API_SERVER;
const userImageSrc = ref('');

const userImage = computed(() => {
  if (userImageSrc.value) return userImageSrc.value;
  if (props.imagePath && props.imagePath !== 'null' && props.imagePath !== 'undefined') {
    if (props.imagePath.startsWith('http')) return props.imagePath;
    return defaultServer ? `${defaultServer}/${props.imagePath}` : props.imagePath;
  }
  return defaultUserImage;
});

function onImgError(e: Event) {
  userImageSrc.value = defaultUserImage;
  console.error(e);
  
}

</script>

<style scoped>

.widget-post{
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
}


@media (max-width: 900px) {
  .widget-post {
    max-width: 100vw;
    min-width: 0;
    width: 100%;
  }
}
.widget-post h3{
  font-size: 1.5rem; 
  width: 100%;
  text-align: center;
}

.widget-post p{
  font-size: 0.6rem;
}

.tags{
  max-width: 100%;
  display: flex;
  justify-content: right;
  gap: 3%;
}
.user{
  display: flex;
  gap: 4%;
  align-items: center;
  font-size: 0.6rem;
}
.user img{
  width: 20px;
}
.tag-list{
  width: 10%;
  background-color: #000000cc;
}
.tag-list{
  text-align: center;
  color: var(--white-default);
}

.dot-line {
  width: 100%;
  border-bottom: 1px dashed var(--black-default);
}


.post-link img{
  height: 8px;
}
.post-link{
  display: flex;
  text-decoration: none;
  color: black;
  align-items: center;
  gap: 1%;
}


</style>
