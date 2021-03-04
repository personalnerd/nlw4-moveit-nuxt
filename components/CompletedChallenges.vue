<template>
  <div class="completed-challenges-container">
    <span>Desafios Completos</span>
    <span>{{ challengesCompleted }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    challengesCompleted() {
      return this.$store.state.challengesCompleted;
    },
  },
};
</script>


<style lang="scss" scoped>
.completed-challenges-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 3.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #d7d8da;

  font-weight: 500;

  span {
    &:first-child {
      font-size: 1.25rem;
    }

    &:last-child {
      font-size: 1.5rem;
    }
  }
}
</style>
