<template>
  <div class="container">
    <ExperienceBar />
    <section>
      <div>
        <Profile />
        <CompletedChallenges />
        <Countdown />
      </div>
      <div>
        <ChallengeBox />
      </div>
    </section>
    <LevelUpModal v-if="isLevelUpModalOpen" />
  </div>
</template>

<script>
import Vue from "vue";
import ChallengeBox from "~/components/ChallengeBox.vue";
import CompletedChallenges from "~/components/CompletedChallenges.vue";
import ExperienceBar from "~/components/ExperienceBar.vue";
import Profile from "~/components/Profile.vue";
import LevelUpModal from "~/components/LevelUpModal.vue";
import Cookies from "js-cookie";

import { mapState } from "vuex";

export default Vue.extend({
  components: {
    ChallengeBox,
    CompletedChallenges,
    ExperienceBar,
    Profile,
    LevelUpModal,
  },
  computed: {
    ...mapState([
      "level",
      "currentExperience",
      "challengesCompleted",
      "isLevelUpModalOpen",
    ]),
    gravarCookies() {
      return [this.level, this.currentExperience, this.challengesCompleted];
    },
  },
  watch: {
    gravarCookies() {
      Cookies.set("moveit-level", String(this.level));
      Cookies.set("moveit-currentExperience", String(this.currentExperience));
      Cookies.set(
        "moveit-challengesCompleted",
        String(this.challengesCompleted)
      );
    },
  },
  methods: {
    getCookies(values) {
      this.$store.commit("getCookies", values);
    },
  },
  mounted() {
    var values = {
      level: "",
      currentExperience: "",
      challengesCompleted: "",
    };
    if (Cookies.get("moveit-level")) {
      values.level = Cookies.get("moveit-level");
      values.currentExperience = Cookies.get("moveit-currentExperience");
      values.challengesCompleted = Cookies.get("moveit-challengesCompleted");
      this.getCookies(values);
    }
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  max-width: 992px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;

  section {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6.25rem;
    align-content: center;
  }
}
</style>
