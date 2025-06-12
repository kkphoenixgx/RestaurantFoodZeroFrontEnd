<template>
  <div class="contact-section">
    <HeaderPush />
    <div class="contact-page">
      <h1>Contato</h1>
      <p>Entre em contato conosco para dúvidas, sugestões ou reservas. Em breve, um formulário estará disponível aqui.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderPush from '../../components/ui/HeaderPush.vue';

// Página de contato genérica
</script>

<style scoped>
.contact-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1rem;
  color: #222;
  min-height: 50vh;
}
.contact-page h1 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #b85c38;
}
.contact-page p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  line-height: 1.7;
}
</style>
