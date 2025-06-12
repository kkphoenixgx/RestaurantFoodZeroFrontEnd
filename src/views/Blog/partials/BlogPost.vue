<template>
  <div class="blog-post">
    <HeaderPush />

    <div class="blog-post-page" v-if="!loading && post">
      <h1>{{ post.tittle }}</h1>
      <div class="blog-post-meta">
        <img :src="post.user?.userImagePath || '/src/assets/images/user-default.png'" alt="Autor" class="blog-post-author-img" />
        <span class="blog-post-author">{{ post.user?.name }}</span>
        <span class="blog-post-date">{{ post.date.toLocaleDateString() }}</span>
        <span class="blog-post-coments">{{ post.comentaries.length }} comentários</span>
      </div>
      <div class="blog-post-tags">
        <span v-for="tag in post.tags" :key="tag.id" class="blog-post-tag">#{{ tag.name }}</span>
      </div>
      <div class="blog-post-description">
        <p>{{ post.description }}</p>
      </div>
      <div class="blog-post-comentaries">
        <h3>Comentários</h3>
        <div v-if="post.comentaries.length === 0">Nenhum comentário ainda.</div>
        
        <ul>
          <li v-for="coment in post.comentaries" :key="coment.id">
            <strong>{{ comentUsers[coment.user_id] || 'Anônimo' }}:</strong> {{ coment.description }}
          </li>
        </ul>

        <div v-if="loggedUser" class="comentary-form">
          <form @submit.prevent="submitComentary">
            <textarea v-model="comentaryText" placeholder="Escreva seu comentário..." required rows="2" style="width:100%;resize:vertical;"></textarea>
            <button type="submit" :disabled="sendingComentary" style="margin-top:0.5rem;">Comentar</button>
            <span v-if="comentaryError" style="color:#b85c38;display:block;">{{ comentaryError }}</span>
          </form>
        </div>

        <div v-else style="margin-top:1rem;color:#b85c38;">Faça login para comentar.</div>

      </div>
    
    </div>
    <div v-else-if="loading" class="blog-post-loading">Carregando post...</div>
    <div v-else class="blog-post-error">Post não encontrado.</div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getPost } from '../../../services/post';
import type Post from '../../../types/Model/Post';
import HeaderPush from '../../../components/ui/HeaderPush.vue';

import { getUser } from '../../../services/user';
import { postComentary, getComentariesFromAPost } from '../../../services/comentaries';

const route = useRoute();
const post = ref<Post|null>(null);
const loading = ref(true);
const error = ref('');
const comentUsers = ref<Record<number, string>>({});

const comentaryText = ref('');
const comentaryError = ref('');
const sendingComentary = ref(false);


const loggedUser = ref<{ _id: number, _name: string, _email :string, _senha :string, _userImagePath :string, _phone :string, _role :string } | null>(null);

function updateLoggedUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    loggedUser.value = user ? user : null;
  } catch {
    loggedUser.value = null;
  }
}



async function submitComentary() {
  comentaryError.value = '';
  if (!comentaryText.value.trim()) {
    comentaryError.value = 'Digite um comentário.';
    return;
  }

  if (!loggedUser.value) {
    comentaryError.value = 'Você precisa estar logado.';
    return;
  }

  sendingComentary.value = true;
  
  try {
    if (!post.value) {
      comentaryError.value = 'Post não encontrado.';
      sendingComentary.value = false;
      return;
    }

    await postComentary({
      description: comentaryText.value,
      postId: post.value.id,
      userId: loggedUser.value._id,
      date: new Date().toISOString()
    });

    post.value = await getPost(post.value.id);
    comentaryText.value = '';
  
  } catch (e) {
    comentaryError.value = 'Erro ao enviar comentário.';
  } finally {
    sendingComentary.value = false;
  }
}

onMounted(async () => {
  const id = Number(route.params.id);

  if (!id) {
    error.value = 'ID inválido';
    loading.value = false;
    return;
  }
  try {
    post.value = await getPost(id);

    // Buscar comentários separadamente se não vierem no post
    if (post.value) {
      const comentaries = await getComentariesFromAPost(post.value.id);
      post.value.comentaries = comentaries;
    }

    if (post.value && post.value.comentaries) {
      const userIds = Array.from(new Set(post.value.comentaries.map(c => c.user_id)));
      const users = await Promise.all(userIds.map(async uid => {
        try {
          const user = await getUser(uid);
          return { id: uid, name: user?.name || 'Anônimo' };
        } catch(e) {
          error.value = 'Erro ao carregar User.';
          if (e instanceof Error) {
            console.error(e.message);
          } else {
            console.error(e);
          }
          return { id: uid, name: 'Anônimo' };
        }
      }));

      comentUsers.value = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {} as Record<number, string>);
    }
    loading.value = false;
  } catch (e) {
    error.value = 'Erro ao carregar post.';
    loading.value = false;
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
  }
});

onMounted(updateLoggedUser);
watchEffect(updateLoggedUser);
</script>

<style scoped>
.blog-post-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1rem;
  color: #222;
}
.blog-post-page h1 {
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  color: #b85c38;
}
.blog-post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}
.blog-post-author-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}
.blog-post-tags {
  margin-bottom: 1.2rem;
}
.blog-post-tag {
  background: #f3e1d7;
  color: #b85c38;
  border-radius: 0.4rem;
  padding: 0.2rem 0.7rem;
  margin-right: 0.5rem;
  font-size: 0.98rem;
}
.blog-post-description {
  font-size: 1.15rem;
  margin-bottom: 2rem;
}

.blog-post-comentaries {
  margin-top: 2rem;
  background: #fff8f3;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(184, 92, 56, 0.07);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
}
.blog-post-comentaries h3 {
  margin-bottom: 1.2rem;
  color: #b85c38;
  font-size: 1.3rem;
  font-weight: 600;
}
.blog-post-comentaries ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}
.blog-post-comentaries li {
  background: #fff;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem 1rem 0.7rem 1rem;
  box-shadow: 0 1px 4px rgba(184, 92, 56, 0.06);
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 1.05rem;
}
.blog-post-comentaries li strong {
  color: #b85c38;
  margin-right: 0.4rem;
  font-weight: 600;
}
.comentary-form {
  margin-top: 1.5rem;
  background: #f3e1d7;
  border-radius: 0.5rem;
  padding: 1.2rem 1rem 1rem 1rem;
  box-shadow: 0 1px 4px rgba(184, 92, 56, 0.06);
}
.comentary-form textarea {
  border: 1.5px solid #b85c38;
  border-radius: 0.4rem;
  padding: 0.7rem;
  font-size: 1.05rem;
  font-family: inherit;
  background: #fff;
  transition: border 0.2s;
}
.comentary-form textarea:focus {
  outline: none;
  border-color: #a14a2b;
}
.comentary-form button {
  background: #b85c38;
  color: #fff;
  border: none;
  border-radius: 0.4rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.comentary-form button:disabled {
  background: #e0b7a0;
  cursor: not-allowed;
}
.comentary-form button:not(:disabled):hover {
  background: #a14a2b;
}
.comentary-form span[style*="color:#b85c38"] {
  margin-top: 0.5rem;
  font-size: 0.98rem;
}
.blog-post-loading, .blog-post-error {
  text-align: center;
  font-size: 1.1rem;
  margin: 2rem 0;
  color: #b85c38;
}
</style>
