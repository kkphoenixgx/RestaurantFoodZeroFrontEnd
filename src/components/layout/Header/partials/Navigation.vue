<template>
  <div class="navigation" 
    :style="{ 
      height: props.height,
      backgroundImage: `linear-gradient(rgba(23,30,0,0.95), rgba(23,30,0,0.95)), url(${NaviBg})` 
    }">
    <div class="close-x-button" @click="closeNavigation"></div>
    
    <div class="menu">

      <div class="content">
        <ul>
          <li>
            <RouterLink @click="handleClick()" class="link" to="/">HOME</RouterLink>
          </li>
          <li>
            <RouterLink @click="handleClick()" class="link" to="/menu">MENU</RouterLink>
          </li>
          <li>
            <RouterLink @click="handleClick()" class="link" to="/blog">BLOGS</RouterLink>
          </li>
          <li>
            <RouterLink @click="handleClick()" class="link" to="/about">ABOUT</RouterLink>
          </li>
          <li>
            <RouterLink @click="handleClick()" class="link" to="/contact">CONTACT</RouterLink>
          </li>
        </ul>
      </div>

      <div class="contact-container">
        <div class="contact">
        <h3>Contact</h3>
        <div class="dotted-line"></div>
          <div class="contact-links">
            <DefaultLink type="tel" text="+86 852 346 000" /> <br>
            <DefaultLink type="mailto" text="info@foodzero.com" />
          </div>
          <div class="contact-adress">
            <DefaultLink type="https" label="1959 Sepulveda Blvd. Culver City, CA, 90230" text="https://www.google.com/maps/place/1959+Sepulveda+Blvd,+Culver+City,+CA+90230,+EUA/data=!4m2!3m1!1s0x80c2ba478e1c0e95:0x2a8789f8cf9f9766?sa=X&ved=1t:242&ictx=111" />
          </div>
          <div class="icons">
            <a href="#"> 
              <img :src="iconFacebook" alt="icon fecebook">
            </a>
            <a href="#"> 
              <img :src="iconInstagram" alt="icon instagram">
            </a>
            <a href="#"> 
              <img :src="iconTwetter" alt="icon tweeter">
            </a>
            <a href="#"> 
              <img :src="iconYoutube" alt="icon youtube">
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import NaviBg from "../../../../assets/images/menu-bg.png"

import iconFacebook from "../../../../assets/images/icon-facebook.png"
import iconInstagram from "../../../../assets/images/icon-instagram.png"
import iconTwetter from "../../../../assets/images/icon-twetter.png"
import iconYoutube from "../../../../assets/images/icon-youtube.png"

import DefaultLink from '../../../ui/DefaultLink.vue';

const props = defineProps<{
  height: string
}>();

const emit = defineEmits<{
  (e: 'update:height', value: string): void
}>();

function handleClick(){
  closeNavigation();
}

function closeNavigation(){
  emit('update:height', '0vh');
}
</script>

<style scoped>
  .navigation{
    position: absolute;
    z-index: 10;
    width: 100vw;
    right: 0;
    top: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: height 0.3s;
    overflow: hidden;
  }
  .menu{
    height: 100%;
    width: 100vw;
    display: flex;
    position: relative;
    z-index: 12;
  }
  .content, .contact-container{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }
  .contact{
    margin-top: 32%;
    width: 50%;
    margin-left: 38%;
  }

  ul{
    color: var(--white-default);
    font-size: 2rem;
  }

  .link{
    text-decoration: none;
    color: var(--white-default);
  }
  .link:hover{
    color: var(--green-lighter);
  }


  h3{
    color: var(--white-default);
  }

  .dotted-line {
    width: 100%;
    border-bottom: 1px dashed var(--white-default);
    margin-bottom: 5%;
  }


  .contact-links, .contact-adress{
    margin-bottom: 5%;
  }

  .icons{
    display: flex;
  }
  .icons a{
    height: fit-content;
    display: block;
    width: fit-content;
    margin-right: 6%;
  }



  /* ----------- Close button ----------- */

  .close-x-button {
    position: absolute;
    top: 24px;
    left: 32px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close-x-button::before, .close-x-button::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 3px;
    background: var(--black-default);
    border-radius: 2px;
  }
  .close-x-button::before {
    transform: rotate(45deg);
  }
  .close-x-button::after {
    transform: rotate(-45deg);
  }

</style>
