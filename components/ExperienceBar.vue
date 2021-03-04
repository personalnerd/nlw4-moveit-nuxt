<template>
  <header class="experience-bar">
    <span>0 xp</span>
    <div>
      <div :style="'width: ' + percentToNextLevel + '%'">
        <span
          class="current-experience"
          :style="'left: ' + percentToNextLevel + '%'"
          >{{ currentExperience }} xp</span
        >
      </div>
    </div>
    <span>{{ experienceToNextLevel }} xp</span>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["level", "currentExperience", "experienceToNextLevel"]),
    percentToNextLevel() {
      return (
        Math.round(this.currentExperience * 100) / this.experienceToNextLevel
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.experience-bar {
  display: flex;
  align-items: center;

  span {
    font-size: 1rem;
  }

  > div {
    flex: 1;
    height: 4px; /* tamanho fixo, não importa a resolução, por isso usamos px */
    border-radius: 4px;
    background: $gray-line;
    margin: 0 1.5rem;
    position: relative;

    > div {
      height: 4px;
      border-radius: 4px;
      background-color: $green;
    }
  }
}

span.current-experience {
  position: absolute;
  top: 12px;
  transform: translateX(-50%);
}
</style>
