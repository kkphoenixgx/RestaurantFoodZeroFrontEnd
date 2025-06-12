<template>
<div class="home">

  <div class="health-is-important">

    <div class="header">
      <h1>Health Eating is important part of lifestyle</h1>
      <p>Lorem ipsum dolor sit amet elit. Quos laudantium explicabo</p>
      
      <div class="scroll">
        <p>Scroll</p>
        <div class="dotted-line"></div>
      </div>

    </div>

    <div class="images">
      <img :src="homeFirstImage" alt="ham plate" class="main-image">
      <div class="image-overlay"></div>
      <div class="spices">
        <img :src="spiceOne" alt="spice 1">
        <img :src="spiceTwo" alt="spice 2">
        <img :src="spiceThree" alt="spice 3">
      </div>
    </div>

    <div class="container-plan-diet">
      
      <div class="diet-plate">
        <img :src="homeSecondImage" alt="plate image">
        <h2>Start to plan your diet today</h2>
        <p>Lorem ipsum dolor sit amet elit. Quos laudantium explicabo</p>
      </div>

      <div class="diet-spice">
        <p>Lorem ipsum dolor sit amet elit. Quos laudantium explicabo</p>
        <img :src="homeThirdImage" alt="splices">
      </div>

    </div>

  </div>

  <div class="our-menu">
  
    <img class="leafs" :src="leafs" alt="Decorations leafs">

    <div class="menu-header">
      <h2>Our Menu</h2>
      <p>This is a section of your menu. Give your section a brief description</p>
    </div>
  
    <div class="menu-itens">
      <div v-if="plates.length === 0" class="menu-loading" >
        Carregando pratos...
      </div>

      <div v-else class="plates-list">
        <div v-for="plate in plates.slice(0, 4)" :key="plate.id" class="plate-item">
          <div class="plate-info">
            <span class="plate-value">R$ {{ plate.value.toFixed(2) }}</span>
            <div class="plate-dotted-line"></div>
            <h3 class="plate-name">{{ plate.name }}</h3>
            <p class="plate-description">{{ plate.description }}</p>
          </div>
        </div>
      </div>
    </div>
  
  </div>

  <div class="exelent-cook">
    <div class="exelent-cook-colum-left">
      <img class="lilipad-left" :src="homeLilipad" alt="lilipad">
      <img class="man-cooking" :src="manCooking" alt="A men cooking">
      <img class="cooking-table" :src="cookingTable" alt="Cooking table">
    </div>
    <div class="exelent-cook-colum-right">
      <h2>Excellent cook</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure atque quo nihil voluptatem nemo at laborum est repellendus commodi aspernatur dolorem voluptas, ipsum omnis nulla magnam laudantium dicta, porro exercitationem.</p>
      <img class="lilipad-right" :src="homeLilipad" alt="lilipad">
    </div>

  </div>

  <div class="icons">
    <div class="icon">
      <img :src="icon1" alt="fish icon">
      <h3>Premium Quality</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ducimus. Quos culpa atque rem autem rerum quam temporibus!</p>
    </div>
    <div class="icon">
      <img :src="icon2" alt="carrot icon">
      <h3>Seasonal Vegetables</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ducimus. Quos culpa atque rem autem rerum quam temporibus!</p>
    </div>
    <div class="icon">
      <img :src="icon3" alt="lemon icon">
      <h3>Fresh Fruit</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ducimus. Quos culpa atque rem autem rerum quam temporibus!</p>
    </div>
  
  </div>

  <div class="posts-section">
    <h2>Check out some posts!</h2>

    <div class="posts">
      <div class="post-list">
        <PostWidget v-for="post in posts.slice(0, 2)" :key="post.id"
          :id="post.id"
          :tags="post.tags"
          :imagePath="post.user.userImagePath || defaultUser"  
          :user="post.user"
          :date="post.date"
          :comentaries="post.comentaries.length"
          :tittle="post.tittle"
          :description="post.description"
        </PostWidget>
      </div>
    </div>


  </div>


  <div class="balance">
    <h1>Calories Energy Balance</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    
    <div class="grid-plates-categories">
      <router-link to="/menu" class="card">

        <div class="gradiant-head">
          <h3>Starters</h3>
          <img :src="arrowIcon" alt="Arrow Icon">
        </div>

        <img :src="starterImage" alt="Starter plate">
      </router-link>

      <router-link to="/menu" class="card">
        <div class="gradiant-head">
          <h3>Mains</h3>
          <img :src="arrowIcon" alt="Arrow Icon">
        </div>
        <img :src="mainPlateImage" alt="Main plate">
      </router-link>

      <router-link to="/menu" class="card">
        <div class="gradiant-head">
          <h3>Soups</h3>
          <img :src="arrowIcon" alt="Arrow Icon">
        </div>
        <img :src="soupsImage" alt="Soup plate">
      </router-link>
      
    </div>

  </div>

  <div class="reservationForm">
    <ReservationForm/>
  </div>

  <DefaultToast :v-if="isToastVisible" :color="toastColor" :text="toastText" />

</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import homeFirstImage from "../../assets/images/home-first-image.png"
import spiceOne from "../../assets/images/spices1.png"
import spiceTwo from "../../assets/images/spices2.png"
import spiceThree from "../../assets/images/spices3.png"
import homeSecondImage from "../../assets/images/home-image-col1.png"
import homeThirdImage from "../../assets/images/home-Image-col2.png"
import leafs from "../../assets/images/home-right-top-plant.png"
import homeLilipad from "../../assets/images/home-bg-Lilipad-Leaf.png"
import cookingTable from "../../assets/images/home-man-cooking-food.png"
import manCooking from  "../../assets/images/home-man-cooking.png"
import icon1 from  "../../assets/images/home-fish-icon.png"
import icon2 from  "../../assets/images/home-carrot-icon.png"
import icon3 from  "../../assets/images/home-lemon-icon.png"
import defaultUser from "../../assets/images/user-default.png"
import arrowIcon from "../../assets/images/icon-arrow.png"
import starterImage from "../../assets/images/home-starter-image.png"
import mainPlateImage from "../../assets/images/home-hum-image.png"
import soupsImage from "../../assets/images/home-soup-image.png"


import DefaultToast from '../../components/ui/DefaultToast.vue';
import PostWidget from '../../components/ui/PostWidget.vue';


import { listPlates } from '../../services/plates';
import Plate from '../../types/Model/Plate';
import { listPosts } from '../../services/post';
import Post from '../../types/Model/Post';
import ReservationForm from '../Reservation/partials/ReservationForm.vue';

const plates = ref<Plate[]>([]);
const posts = ref<Post[]>([]);

const isToastVisible = ref(false);
const toastColor = ref('');
const toastText = ref('');


onMounted(async () => {
  try {
    plates.value = await listPlates();
    
    
  } catch (e) {
    createToast("Falied to load plates", "red")
    plates.value = [];
  }

  try {
    posts.value = await listPosts();
  } catch (e) {
    createToast("Falied to load plates", "red")
    posts.value = [];
  }
  

});

function createToast(text :string, color :string, duration = 3000) :void{
  isToastVisible.value = true;
  toastText.value = text;
  toastColor.value = color;

  setTimeout(()=>{ isToastVisible.value = false }, duration)
}
</script>


<style scoped>

.health-is-important{
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 5%;
  background-color: var(--green-havier);
  color: var(--white-default);
  padding-bottom: 12%;
}

/* ----------- health-is-important ----------- */

.header{
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 80vh;
  margin-top: 20vh;
  z-index: 2;
}
.header h1{
  font-size: 3rem;
  width: 70%;
}
.header p{
  width: 40%;
  font-size: 0.6rem;
}
.images{
  position: absolute;
  right: 5%;
  top: 25vh;
}
.main-image {
  display: block;
  height: 400px;
  width: 100%;
}
.image-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  pointer-events: none;
  z-index: 1;
}
.spices{
  left: -27%;
  position: absolute;
  display: grid;
  grid-auto-flow: column;
  gap: 8%;
  bottom: -3%;
  z-index: 3;
}
.spices img{
  --size: 75px;
  width: var(--size);
  height: var(--size);
}
.scroll{
  display: flex;
  align-items: center;
  flex-direction: row;
  transform: rotate(90deg);
  transform-origin: left top;
  transform-origin: -6px 19px;
  width: 12vw;
}
.dotted-line {
  width: 15vw;
  border-bottom: 1px dashed var(--white-default);
}

.container-plan-diet{
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10%;
}
.diet-plate p{
  font-size: 0.6rem;
  margin-bottom: 3%;
  width: 76%;
}
.diet-plate img{
  width: 350px;
}
.diet-plate h2{
  width: 55%;
  margin-top: 3%;
}
.diet-spice{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.diet-spice p{
  font-size: 0.6rem;
  margin-bottom: 3%;
  width: 76%;
  text-align: right;
}
.diet-spice img{
  height: 350px;
  width: 251px;
}

/* ----------- Our menu ----------- */

.our-menu{
  padding: 3%;
  position: relative;
}
.our-menu h2{
  font-size: 2.5rem;
}
.our-menu p{
  font-size: 0.6rem;
}
.menu-itens {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}
.plates-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-items: center;
  align-items: stretch;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.plate-dotted-line {
  width: 100%;
  border-bottom: 2px dashed var(--gray-default);
  margin: 0.7rem 0 0.2rem 0;
}
.plate-item {
  background: var(--white-secondary);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  transition: box-shadow 0.2s;
}
.plate-item:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.13);
}
.plate-info {
  text-align: center;
}
.plate-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--green-havier);
}
.plate-description {
  font-size: 0.9rem;
  color: var(--gray-default);
  margin-bottom: 0.5rem;
}
.plate-value {
  font-size: 1.1rem;
  color: var(--green-seconday);
  font-weight: 600;
}
.menu-loading {
  color: var(--gray-default);
  font-size: 1.1rem;
  text-align: center;
  width: 100%;
}
.leafs{
  position: absolute;
  width: 300px;
  top: 0px;
  right: 0px;
}

/* ----------- Exelent Cook ----------- */
.exelent-cook{
  display: grid;
  padding: 5% 8% 0 5%;
  background-color: var(--white-secondary);
  grid-template-columns: 2fr 1fr;
} 

.exelent-cook-colum-left{
  position: relative;
}
.lilipad-left, .lilipad-right{
  position: absolute;
  z-index: 1;
  min-width: 150px;
  width: 30vw;
}
.lilipad-left{
  transform: scaleX(-1);
}
.man-cooking{
  width: 80%;
  position: relative;
  z-index: 2;
  height: 100%;
  min-width: 170px;
}
.cooking-table{
  position: absolute;
  z-index: 3;
  top: 7%;
  left: 2%;
  width: 38%;
  height: 85%;
  min-width: 95px;
}

.exelent-cook-colum-right{
  position: relative;
}
.exelent-cook-colum-right h2{
  width: 30%;
  color: var(--black-default);
  font-size:3rem;
}
.exelent-cook-colum-right p{
  font-size: 0.6rem;
}
.lilipad-right{
  position: absolute;
  right: -19%;
  bottom: 0px;
}

/* Smartphones (portrait) */
@media only screen and (min-width: 320px) and (max-device-width: 767px) {
  .lilipad-right{
    right: 0%;
  }
} 


/* ----------- Icons ----------- */

.icons{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10% 5%;
}
.icon{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 9%;
}
.icon img{
  min-width: 80px;
  background-color: var(--white-secondary);
  border: var(--white-secondary);
  border-radius: 50%;
  padding: 7%;
}
.icons h3{
  text-wrap: nowrap;
  font-size: 1.5rem;
}
.icons p{
  font-size: 0.6rem;

}

/* ----------- Posts ----------- */


.posts-section {
  padding: 5% 0;
  background-color: var(--white-secondary);
}
.posts-section h2{
  margin-left: 5%;
  font-size: 2rem;
  margin-bottom: 10%;
}

.posts{
  display: flex;
  justify-content: center;
  width: 100%;
}
.post-list{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  max-width: 900px;
  width: 100%;
  margin: 0 auto 10vh auto;
}

@media (max-width: 900px) {
  .plates-list {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
  .post-list {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
  .posts-section h2 {
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 600px) {
  .header h1 {
    font-size: 1.5rem;
    width: 100%;
  }
  .header p {
    width: 100%;
    font-size: 0.8rem;
  }
  .main-image, .diet-plate img, .diet-spice img {
    width: 100%;
    height: auto;
    min-width: unset;
  }
  .plates-list, .post-list {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
  }
  .widget-post {
    max-width: 100vw;
    min-width: 0;
    width: 100%;
  }
  .posts-section {
    padding: 2% 0;
  }
  .posts-section h2 {
    margin-left: 2%;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  .exelent-cook {
    grid-template-columns: 1fr;
    padding: 5% 2% 0 2%;
  }
  .exelent-cook-colum-left, .exelent-cook-colum-right {
    width: 100%;
    min-width: 0;
  }
  .icons {
    grid-template-columns: 1fr;
    padding: 5% 2%;
  }
  .icon img {
    width: 50px;
  }
  .container-plan-diet {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .diet-plate h2 {
    width: 100%;
    font-size: 1.1rem;
  }
  .diet-plate p, .diet-spice p {
    width: 100%;
    font-size: 0.7rem;
  }
  .grid-plates-categories {
    grid-template-columns: 1fr;
    max-width: 100vw;
    margin-top: 2rem;
  }
  .card img {
    max-width: 100%;
  }
}

/* ----------- Calories need Energy Balance ----------- */

.balance{
  padding: 5%;
}
.balance h1{
  width: 100%;
  text-align: center;
  font-size: 2rem;  
}
.balance p{
  width: 100%;
  text-align: center;
  font-size: 0.8rem;  
}

.grid-plates-categories{
  display: grid;
  grid-template-columns:  1fr 1fr 1fr;
  position: relative;
  margin-top: 5%;
}

.card{
  justify-content: center;
  display: flex;
  text-decoration: none;
  color: black;
}

.gradiant-head{
  position: absolute;
  width: 23%;
  display: flex;
  justify-content: space-between;
  padding: 0 1%;
  background: linear-gradient(
    to bottom, 
    rgba(23, 30, 0, 0.496),
    rgba(23,30,0,0.0));
}
.gradiant-head img{
  height: 17px;
}

/* linear-gradient(rgba(23,30,0,0.95), rgba(23,30,0,0.95) */
.card img{
  max-width: 70%;
}


</style>
