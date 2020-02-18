<template>
  <div class="wrapper">
    <section class="memory-cards" ref="cardsParent">
      <card v-for="(nr, index) in numberArr" :key="index" :number="nr" v-on:added-card="addCards" />
    </section>
    <section class="overlay" :class="{ show: isActive }">
      <a href="#" class="close" @click="close">X</a>
      <h1>You won!</h1>
    </section>
  </div>
</template>

<script>
import card from "./card";
export default {
  components: { card },
  data: () => {
    return {
      isActive: false,
      numberOfCardsPicked: 0,
      pickedCards: [],
      pickedAllCards: 0,
      numberArr: [
        "1",
        "1",
        "2",
        "2",
        "3",
        "3",
        "4",
        "4",
        "5",
        "5",
        "6",
        "6",
        "7",
        "7",
        "8",
        "8"
      ]
    };
  },
  methods: {
    addCards(element) {
      console.log("Hej");
      this.numberOfCardsPicked++;

      if (this.numberOfCardsPicked <= 2) {
        this.pickedCards.push(element);

        if (this.numberOfCardsPicked === 2) {
          this.checkMatch();
        }
      }
    },
    checkMatch() {
      if (
        this.pickedCards[0].getAttribute("data-card") ===
        this.pickedCards[1].getAttribute("data-card")
      ) {
        this.pickedAllCards++;
        this.hasWon();
        this.resetCards();
      } else {
        setTimeout(() => {
          this.resetAnimation();
          this.resetCards();
        }, 1000);
      }
    },
    resetCards() {
      this.pickedCards = [];
      this.numberOfCardsPicked = 0;
    },
    resetAnimation() {
      this.pickedCards.forEach(pickedCard => {
        pickedCard.classList.toggle("flip");
      });
    },
    hasWon() {
      if (this.pickedAllCards === 8) {
        console.log("has won");
        this.isActive = true;
      }
    },
    shuffle() {
      this.$refs.cardsParent.childNodes.forEach(card => {
        const position = Math.floor(Math.random() * 16);
        card.style.order = position;
      });
    },
    close() {
      this.isActive = false;
      this.resetCards();
      this.shuffle();
    }
  },
  mounted() {
    this.shuffle();
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  margin: 0;
}

.wrapper {
  position: relative;
  display: flex;
}

.memory-cards {
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
}

.memory-card {
  width: 200px;
  height: 200px;
  background: #692d55;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  box-shadow: 2px 2px 5px #000000;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  margin: 0.5rem;
}

.front,
.back {
  position: absolute;
  backface-visibility: hidden;
  font-size: 1.5em;
  padding: 20px;
}

.flip {
  transform: rotateY(180deg);
}

.front {
  transform: rotateY(180deg);
}

.overlay {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
}

.overlay h1 {
  font-size: 48px;
  color: #ffffff;
}

.overlay .close {
  position: absolute;
  top: 0;
  right: 0;
  margin: 4rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 32px;
}

.show {
  display: flex;
}
</style>
