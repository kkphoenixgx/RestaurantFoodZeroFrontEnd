
<template>
  
  <div class="blog">
    <HeaderPush />

    <div class="blog-page">
      <div class="blog-page-section">
        <h1>Blog</h1>
        <p>Confira nossas novidades, receitas e dicas no blog do FoodZero.</p>
        <div class="blog-actions">
          <router-link to="/login" class="blog-action-btn">Entrar</router-link>
          <router-link to="/signup" class="blog-action-btn">Cadastrar</router-link>
          <router-link to="/userview" class="blog-action-btn">Meu Perfil</router-link>
        </div>
        <div v-if="loading" class="blog-loading">Carregando posts...</div>
        <div v-else-if="error" class="blog-error">{{ error }}</div>
        <div v-else>
          <div v-if="posts.length === 0" class="blog-empty">Nenhum post encontrado.</div>
          <div v-else class="blog-list">
            <div v-for="post in posts" :key="post.id" class="blog-post-item" @click="goToPost(post.id)">
              <PostWidget
                :id="post.id"
                :imagePath="post.user?.userImagePath || '/src/assets/images/user-default.png'"
                :tittle="post.tittle"
                :description="post.description"
                :tags="post.tags"
                :user="post.user"
                :date="post.date"
                :comentaries="post.comentaries.length"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { listPosts } from '../../services/post';
import type Post from '../../types/Model/Post';
import HeaderPush from '../../components/ui/HeaderPush.vue';
import PostWidget from '../../components/ui/PostWidget.vue';

const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref('');
const router = useRouter();

onMounted(async () => {
  try {
    posts.value = await listPosts();
  } catch (e) {
    error.value = 'Erro ao carregar posts.';
  } finally {
    loading.value = false;
  }
});

function goToPost(id: number) {
  router.push({ name: 'BlogPost', params: { id } });
}


</script>

<style scoped>
  .blog-page-section {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1rem;
    color: #222;
    min-height: 60vh;
  }
  .blog-page-section h1 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: #b85c38;
  }
  .blog-page-section p {
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
    line-height: 1.7;
  }
  .blog-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .blog-action-btn {
    background: #b85c38;
    color: #fff;
    padding: 0.5rem 1.2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;
  }
  .blog-action-btn:hover {
    background: #a14d2c;
  }
  .blog-loading, .blog-error, .blog-empty {
    text-align: center;
    font-size: 1.1rem;
    margin: 2rem 0;
    color: #b85c38;
  }
  .blog-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
  .blog-post-item {
    cursor: pointer;
    transition: box-shadow 0.2s;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    background: #fff8f0;
    padding: 1rem;
  }
  .blog-post-item:hover {
    box-shadow: 0 4px 16px rgba(184,92,56,0.10);
  }
</style>
