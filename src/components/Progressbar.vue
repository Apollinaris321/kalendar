<template>
  <div class="container">
    <div class="progress-container">
      <div class="progress-bar" :style="progressBarStyle"></div>
    </div>
  </div>
</template>

<script setup>
import EventBus from '@/EventBus';
import { ref, computed, nextTick } from 'vue';


EventBus.on("event", (data) => {
  const start = data.end - data.start
  const percentage = (start / data.end) * 100
  fillTo(percentage)
})

// Current progress as a percentage (0 to 100)
const progress = ref(0);

// Fixed rate: 20ms per percentage point
const baseRate = 10;

// The style for the progress bar, including a dynamic transition duration
const progressBarStyle = computed(() => ({
  width: progress.value + '%',
  transition: `width ${progress.value * baseRate}ms linear`
}));

// Function to set the progress to a target value
function fillTo(target) {
  progress.value = 0;
  setTimeout(() => {
    progress.value = target;
  }, 50)
}
</script>

<style scoped>

.container{
  padding: .5em 0 2em 0;
}

.progress-container {
  width: 100%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid white;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #ffffff;
}

.controls {
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
