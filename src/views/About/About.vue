<template>
  <div class="about-section">
    <HeaderPush />

    <section class="about-page">
      <h1>Sobre o Restaurante Food Zero</h1>
      <p>
        Bem-vindo ao Food Zero! Somos apaixonados por comida saudável, saborosa e feita com ingredientes frescos e selecionados. Nosso objetivo é proporcionar uma experiência gastronômica única, onde saúde e prazer caminham juntos.
      </p>
      <p>
        Nossa equipe é formada por chefs experientes e profissionais dedicados, sempre em busca de inovação e qualidade. Aqui, cada prato é preparado com carinho, respeitando o sabor natural dos alimentos e priorizando o bem-estar dos nossos clientes.
      </p>
      <p>
        No Food Zero, acreditamos que comer bem é um dos pilares para uma vida equilibrada. Por isso, oferecemos opções para todos os gostos, incluindo pratos vegetarianos, veganos e sem glúten.
      </p>
      <p>
        Venha nos visitar e descubra um novo conceito de alimentação saudável, sem abrir mão do sabor!
      </p>
    </section>

  </div>
</template>

<script setup lang="ts">
import HeaderPush from '../../components/ui/HeaderPush.vue';
</script>

<style scoped>
.about-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1rem;
  color: var(--black-default, #222);
}
.about-page h1 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: var(--green-havier, #2e7d32);
}
.about-page p {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  line-height: 1.7;
}
</style>
