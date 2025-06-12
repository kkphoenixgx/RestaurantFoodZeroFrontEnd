<template>
  <div class="user-view">
    <HeaderPush />
    <div class="user-view-page">
      <h1>Perfil do Usuário</h1>
      <form class="user-form" @submit.prevent="handleSave">
        <div class="user-photo-section">
          <img :src="userImagePreview || form.userImagePath || '/src/assets/images/user-default.png'" alt="Foto do usuário" class="user-photo" />
          <input type="file" accept="image/*" @change="onPhotoChange" />
        </div>
        <DefaultInput class="user-input" type="text" text="Nome" v-model="form.name" placeholder-color="#222" />
        <DefaultInput class="user-input" type="email" text="Email" v-model="form.email" placeholder-color="#222" />
        <DefaultInput class="user-input" type="text" text="Telefone" v-model="form.phone" placeholder-color="#222" />
        <DefaultInput class="user-input" type="password" text="Senha" v-model="form.senha" placeholder-color="#222" />
        <FilledButton type="submit" text="Salvar Alterações" />
      </form>
      <DefaultToast v-if="showToast" :color="toastColor" :text="toastText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import HeaderPush from '../../components/ui/HeaderPush.vue';
import DefaultInput from '../../components/ui/DefaultInput.vue';
import FilledButton from '../../components/ui/FilledButton.vue';
import DefaultToast from '../../components/ui/DefaultToast.vue';
import { updateUser } from '../../services/user';
import User from '../../types/Model/User';

const showToast = ref(false);
const toastText = ref('');
const toastColor = ref('green');
const userImagePreview = ref<string | null>(null);

function getUserFromLocalStorage(): User | null {
  const localUser = localStorage.getItem('user');
  if (!localUser) return null;
  const parsed = JSON.parse(localUser);
  
  let user = new User(
    parsed._id,
    parsed._name,
    parsed._email,
    parsed._senha,
    parsed._userImagePath,
    parsed._phone,
    parsed._role
  );
  console.log(user);
  return user;
}


const user = getUserFromLocalStorage();
const form = reactive({
  id: user?.id ?? '',
  name: user?.name ?? '',
  email: user?.email ?? '',
  phone: user?.phone ?? '',
  senha: user?.senha ?? '',
  userImagePath: user?.userImagePath ?? '',
  role: user?.role ?? '',
});

function onPhotoChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = ev => {
      userImagePreview.value = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

async function handleSave() {
  try {
    const userFromStorage = getUserFromLocalStorage();
    console.log(getUserFromLocalStorage());
    
    const userId = userFromStorage?.id;
    console.log(userFromStorage?.id);

    let updated;
    if(userId){
      updated = await updateUser(userId, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        senha: form.senha,
        userImagePath: userImagePreview.value || form.userImagePath,
        role: form.role,
      });
      localStorage.setItem('user', JSON.stringify(updated));
      toastText.value = 'Perfil atualizado com sucesso!';
      toastColor.value = 'green';
      showToast.value = true;
    }
    else throw new Error("User não possui id")

    
  
  } catch (e) {
    toastText.value = 'Erro ao atualizar perfil.';
    toastColor.value = 'red';
    showToast.value = true;
  }
}
</script>

<style scoped>
.user-view-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1rem;
  color: #222;
}
.user-view-page h1 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #b85c38;
}
.user-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 2rem;
}
.user-photo-section {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.user-photo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #b85c38;
}
.user-input {
  width: 100%;
  max-width: 400px;
  color: black;
}
</style>