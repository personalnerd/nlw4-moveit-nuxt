<template>
  <div>
    <div class="countdown-container">
      <div>
        <span>{{ minutesFormated[0] }}</span>
        <span>{{ minutesFormated[1] }}</span>
      </div>
      <span>:</span>
      <div>
        <span>{{ secondsFormated[0] }}</span>
        <span>{{ secondsFormated[1] }}</span>
      </div>
    </div>

    <button v-if="hasFinished" disabled class="countdown-button">
      Ciclo encerrado
    </button>

    <button
      v-else-if="isActive"
      type="button"
      @click="resetCountdown"
      class="countdown-button countdown-button-active"
    >
      Abandonar o Ciclo
    </button>

    <button
      v-else
      @click="startCountdown"
      type="button"
      class="countdown-button"
    >
      Iniciar o Ciclo
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["time", "isActive", "hasFinished"]),
    minutes() {
      return Math.floor(this.time / 60);
    },
    seconds() {
      return this.time % 60;
    },
    minutesFormated() {
      const [minuteLeft, minuteRight] = String(this.minutes)
        .padStart(2, "0")
        .split("");
      return [minuteLeft, minuteRight];
    },
    secondsFormated() {
      const [secondLeft, secondRight] = String(this.seconds)
        .padStart(2, "0")
        .split("");
      return [secondLeft, secondRight];
    },
    countdownWatch() {
      return [this.isActive, this.time];
    },
  },
  watch: {
    countdownWatch() {
      this.$store.dispatch("countdownWatch");
    },
  },
  methods: {
    startNewChallenge() {
      this.$store.commit("startNewChallenge");
    },
    startCountdown() {
      this.$store.commit("setIsActive", true);
    },
    resetCountdown() {
      this.$store.commit("resetCountdown");
    },
  },
};
</script> 

<style lang="scss" scoped>
.countdown-container {
  display: flex;
  align-items: center;
  font-family: Rajdhani;
  font-weight: 600;
  color: $title;

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: $white;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 8.5rem;
    text-align: center;

    span {
      flex: 1;

      &:first-child {
        border-right: 1px solid #f0f1f3;
      }
      &:last-child {
        border-left: 1px solid #f0f1f3;
      }
    }
  }

  > span {
    font-size: 6.25rem;
    margin: 0 0.5rem;
  }
}

.countdown-button {
  width: 100%;
  height: 5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 5px;
  background-color: $blue;
  color: $white;
  font-size: 1.25rem;
  font-weight: 600;
  transition: background-color 0.2s;

  &:not(:disabled):hover {
    background-color: $blue-dark;
  }
  &:disabled {
    background-color: $white;
    color: $text;
    cursor: not-allowed;
  }

  &-active {
    background-color: $white;
    color: $title;

    &:not(:disabled):hover {
      background-color: $red;
      color: $white;
    }
  }
}
</style>
