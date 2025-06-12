<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { listPlates, createPlate } from '../../services/plates';
import type Plate from '../../types/Model/Plate';
import HeaderPush from '../../components/ui/HeaderPush.vue';

const plates = ref<Plate[]>([]);
const loading = ref(true);
const error = ref('');

// Controle de admin
const isAdmin = ref(false);
const showAddForm = ref(false);
const newPlate = ref({
  name: '',
  value: '',
  description: '',
  imagePath: ''
});
const addError = ref('');

onMounted(async () => {
  try {
    plates.value = await listPlates();
    // Checa se usuário logado é admin
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        isAdmin.value = user._role === 'admin' || user.role === 'admin';
      } catch {}
    }
  } catch (e) {
    error.value = 'Erro ao carregar pratos.';
  } finally {
    loading.value = false;
  }
});

async function handleAddPlate() {
  addError.value = '';
  if (!newPlate.value.name || !newPlate.value.value || !newPlate.value.description) {
    addError.value = 'Preencha todos os campos.';
    return;
  }
  try {
    const plate = await createPlate({
      name: newPlate.value.name,
      value: Number(newPlate.value.value),
      description: newPlate.value.description,
      imagePath: newPlate.value.imagePath
    });
    plates.value.push(plate);
    showAddForm.value = false;
    newPlate.value = { name: '', value: '', description: '', imagePath: '' };
  } catch (e) {
    addError.value = 'Erro ao adicionar prato.';
  }
}
</script>

<template>
  <div class="menu-section">
    <HeaderPush />
    <div class="menu-page">
      <h1>Cardápio</h1>
      <p class="menu-description">Confira todos os pratos disponíveis no FoodZero.</p>
      <div v-if="loading" class="menu-loading">Carregando pratos...</div>
      <div v-else-if="error" class="menu-error">{{ error }}</div>
      <div v-else>
      <div v-if="isAdmin" style="margin-bottom:2rem;">
        <button @click="showAddForm = !showAddForm" style="background:#b85c38;color:#fff;padding:0.6rem 1.2rem;border:none;border-radius:0.4rem;cursor:pointer;">
          {{ showAddForm ? 'Cancelar' : 'Adicionar Prato' }}
        </button>
        <div v-if="showAddForm" class="add-plate-form" style="margin-top:1.2rem;background:#fff8f3;padding:1.2rem 1rem;border-radius:0.6rem;max-width:400px;">
          <div style="margin-bottom:0.7rem;">
            <input v-model="newPlate.name" placeholder="Nome do prato" style="width:100%;padding:0.5rem;margin-bottom:0.5rem;" />
            <input v-model="newPlate.value" type="number" placeholder="Valor" style="width:100%;padding:0.5rem;margin-bottom:0.5rem;" />
            <input v-model="newPlate.imagePath" placeholder="URL da imagem" style="width:100%;padding:0.5rem;margin-bottom:0.5rem;" />
            <textarea v-model="newPlate.description" placeholder="Descrição" style="width:100%;padding:0.5rem;resize:vertical;"></textarea>
          </div>
          <button @click="handleAddPlate" style="background:#2e7d32;color:#fff;padding:0.5rem 1.2rem;border:none;border-radius:0.4rem;cursor:pointer;">Salvar</button>
          <span v-if="addError" style="color:#b85c38;display:block;margin-top:0.5rem;">{{ addError }}</span>
        </div>
      </div>
      <div v-if="plates.length === 0" class="menu-empty">Nenhum prato cadastrado.</div>
      <div v-else class="plates-list">
        <div v-for="plate in plates" :key="plate.id" class="plate-item">
          <img v-if="plate.imagePath" :src="plate.imagePath" :alt="plate.name" class="plate-image" />
          <div class="plate-info">
            <h2 class="plate-name">{{ plate.name }}</h2>
            <span class="plate-value">R$ {{ plate.value.toFixed(2) }}</span>
            <p class="plate-description">{{ plate.description }}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
  color: #222;
}
.menu-page h1 {
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
  color: #b85c38;
  font-family: 'Rufina', serif;
}
.menu-description {
  font-size: 1.15rem;
  margin-bottom: 2rem;
  color: #555;
}
.menu-loading, .menu-error, .menu-empty {
  text-align: center;
  font-size: 1.1rem;
  margin: 2rem 0;
  color: #b85c38;
}
.plates-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.plate-item {
  background: #fff8f0;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem 1rem;
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
}
.plate-item:hover {
  box-shadow: 0 4px 16px rgba(184,92,56,0.10);
}
.plate-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 0.7rem;
  margin-bottom: 1rem;
  background: #fff;
}
.plate-info {
  text-align: center;
}
.plate-name {
  font-size: 1.3rem;
  color: #b85c38;
  margin-bottom: 0.3rem;
}
.plate-value {
  font-weight: bold;
  color: #2e7d32;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: block;
}
.plate-description {
  font-size: 1rem;
  color: #444;
  margin-top: 0.3rem;
}
@media (max-width: 700px) {
  .plates-list {
    gap: 1rem;
  }
  .plate-item {
    width: 100%;
    padding: 1rem 0.5rem;
  }
}
</style>
