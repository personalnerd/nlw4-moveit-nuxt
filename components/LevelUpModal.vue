<template>
  <div class="overlay">
    <div class="container">
      <header>{{ level }}</header>
      <strong>Parabéns</strong>
      <p>Você alcançou um novo level.</p>
      <button type="button" @click="closeLevelUpModal">
        <img src="/icons/close.svg" alt="Fechar" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    level() {
      return this.$store.state.level;
    },
  },
  methods: {
    closeLevelUpModal() {
      this.$store.commit("closeLevelUpModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  background-color: rgba(242, 243, 245, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: $white;
  width: 100%;
  max-width: 400px;
  padding: 2rem 3rem;
  border-radius: 5ps;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: absolute;

  header {
    font-size: 8.75rem;
    font-weight: 600;
    color: $blue;
    background: url("/icons/levelup.svg") no-repeat center;
    background-size: contain;
  }

  strong {
    font-size: 2.25rem;
    color: $title;
  }

  p {
    font-size: 1.25rem;
    color: $text;
    margin-top: 0.25rem;
  }

  button {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    background: transparent;
    border: 0;
    font-size: 0; //  quando tem só um ícone no botão, sem texto
  }
}
</style>