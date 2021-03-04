import challenges from "../assets/challenges.json";
let countdownTimeout;

export const state = () => ({
  //challenges
  level: 1,
  currentExperience: 0,
  challengesCompleted: 0,
  activeChallenge: null,
  experienceToNextLevel: 64,
  isLevelUpModalOpen: false,

  //countdown
  time: 25 * 60,
  isActive: false,
  hasFinished: false
});

export const mutations = {
  //challenges
  startNewChallenge(state) {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    state.activeChallenge = challenge;

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp`
      });
    }
  },
  resetChallenge(state) {
    state.activeChallenge = null;
  },
  completeChallenge(state) {
    if (!state.activeChallenge) {
      return;
    }

    const { amount } = state.activeChallenge;

    let finalExperience = state.currentExperience + amount;

    if (finalExperience >= state.experienceToNextLevel) {
      finalExperience = finalExperience - state.experienceToNextLevel;
      state.level++;
      state.isLevelUpModalOpen = true;
    }

    state.currentExperience = finalExperience;
    state.activeChallenge = null;
    state.challengesCompleted++;
    state.experienceToNextLevel = Math.pow((state.level + 1) * 4, 2);
  },
  closeLevelUpModal(state) {
    state.isLevelUpModalOpen = false;
  },

  //countdown
  setIsActive(state, value) {
    state.isActive = value;
  },
  setTime(state, value) {
    state.time = value;
  },
  setHasFinished(state, value) {
    state.hasFinished = value;
  },
  resetCountdown(state) {
    clearTimeout(countdownTimeout);
    state.isActive = false;
    state.hasFinished = false;
    state.time = 25 * 60;
  },

  // cookies
  getCookies(state, values) {
    state.level = parseInt(values.level);
    state.currentExperience = parseInt(values.currentExperience);
    state.challengesCompleted = parseInt(values.challengesCompleted);
    state.experienceToNextLevel = Math.pow((parseInt(values.level) + 1) * 4, 2);
  }
};

export const actions = {
  //countdown
  countdownWatch(context) {
    if (context.state.isActive && context.state.time > 0) {
      countdownTimeout = setTimeout(() => {
        context.commit("setTime", context.state.time - 1);
      }, 1000);
    } else if (context.state.isActive && context.state.time == 0) {
      context.commit("setHasFinished", true);
      context.commit("setIsActive", false);
      context.commit("startNewChallenge");
    }
  }
};
