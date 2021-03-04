 <template>
  <div class="challenge-box-container">
    <div v-if="activeChallenge" class="challenge-active">
      <header>Ganhe {{ activeChallenge.amount }} xp</header>
      <main>
        <img :src="'icons/' + activeChallenge.type + '.svg'" alt="" />
        <strong>Novo desafio</strong>
        <p>
          {{ activeChallenge.description }}
        </p>
      </main>
      <footer>
        <button
          @click="handleChallengeFailed"
          type="button"
          class="challenge-button-failed"
        >
          Falhei
        </button>
        <button
          @click="handleChallengeSucceeded"
          type="button"
          class="challenge-button-succeeded"
        >
          Completei
        </button>
      </footer>
    </div>

    <div v-else class="challenge-not-active">
      <strong>Finalize um ciclo para receber um desafio</strong>
      <p>
        <img src="icons/level-up.svg" alt="Level up" />
        Avance de level completando desafios.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeChallenge() {
      return this.$store.state.activeChallenge;
    },
  },
  methods: {
    handleChallengeSucceeded() {
      this.$store.commit("completeChallenge");
      this.$store.commit("resetCountdown");
    },
    handleChallengeFailed() {
      this.$store.commit("resetChallenge");
      this.$store.commit("resetCountdown");
    },
  },
};
</script>

<style lang="scss" scoped>
.challenge-box-container {
  height: 100%;
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  padding: 1.5rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.challenge-not-active {
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.4;
  }

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.4;
    max-width: 70%;
    margin-top: 3rem;

    img {
      margin-bottom: 1rem;
    }
  }
}

.challenge-active {
  height: 100%;
  display: flex;
  flex-direction: column;

  header {
    color: $blue;
    font-weight: 600;
    font-size: 1.25rem;
    padding: 0 2rem 1.5rem;
    border-bottom: 1px solid $gray-line;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    strong {
      font-weight: 600;
      font-size: 2rem;
      color: $title;
      margin: 1.5rem 0 1rem;
    }

    p {
      line-height: 1.5;
    }
  }

  footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    button {
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 5px;
      color: $white;
      font-size: 1rem;
      font-weight: 600;
      transition: 0.2s;

      &.challenge-button {
        &-failed {
          background: $red;
        }
        &-succeeded {
          background: $green;
        }
      }
      &:hover {
        filter: brightness(0.9);
      }
    }
  }
}
</style>