<template>
  <div class="profile-container">
    <img src="https://github.com/personalnerd.png" alt="Tarcisio Cavalcante" />
    <div>
      <strong>Tarcisio Cavalcante</strong>
      <p>
        <img src="icons/level.svg" alt="Level" />
        Level {{ level }}
      </p>
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
};
</script>


<style lang="scss" scoped>
.profile-container {
  display: flex;
  align-items: center;
  > img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
  }
  div {
    margin-left: 1.5rem;
    strong {
      font-size: 1.5rem;
      font-weight: 600;
      color: $title;
    }
    p {
      font-size: 1rem;
      margin-top: 0.5rem;
      img {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
