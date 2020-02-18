<template>
  <div @click="flipCard">
    <article class="memory-card" :data-card="number">
      <span class="front">{{ number }}</span>
      <span class="back">Memory</span>
    </article>
  </div>
</template>

<script>
export default {
  props: ["number", "memory-card"],
  methods: {
    flipCard(event) {
      if (event.target.innerHTML !== "Memory") {
        event.target.classList.toggle("flip");
        //this.addCards(event.target);
        this.$emit("added-card", event.target);
      }
    }
  }
};
</script>
