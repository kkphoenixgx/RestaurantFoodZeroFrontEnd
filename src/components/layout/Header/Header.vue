<template>
  
  <header>
    <Navigation :height="navHeight" @update:height="navHeight = $event" />

    <div class="header-left">
      <img :src="headerLogo" alt="Logo do header">
      <div class="hamburguer-menu" @click="toggleNavigation">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="header-right">
      <DefaultLink class="header-link" type="tel" text="+86 852 346 000" />      
      <DefaultButton text="Reservations" />
    </div>
  </header>

</template>


<script setup lang="ts">
  import headerLogo from "../../../assets/images/header-logo.png"
  
  import Navigation from "./partials/Navigation.vue";

  import DefaultButton from "../../ui/DefaultButton.vue";
  import DefaultLink from "../../ui/DefaultLink.vue";

import { ref } from 'vue';

const navHeight = ref('0vh');


function toggleNavigation() {
  navHeight.value = navHeight.value === '0vh' ? '100vh' : '0vh';
}

</script>

<style scoped>

  header{
    display: flex;
    justify-content: space-between;
    height: 12vh;
    padding: 1%;
    min-width: 450px;
    min-height: 70px;
    background-color: black; /*transparent*/
    /* position: absolute;
    width: 100%; */
  }
  
  .header-left, .header-right{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
  }
  .header-right{
    justify-content: space-evenly;
    width: fit-content;
    margin-right: 2%;
  } 
  .header-right{
    justify-content: space-evenly;
    width: fit-content;
  } 


  .header-left img{
    width: 110px;
  }
  .header-link{
    margin-right: 3%;
  }

  /* ----------- Hamburguer ----------- */

  .hamburguer-menu {
    width: 32px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 6px;
    margin-left: 7%;
  }
  .hamburguer-menu span {
    display: block;
    width: 25px;
    height: 1px;
    background: var(--white-default);
    border-radius: 2px;
    transition: 0.3s;
  }
</style>
