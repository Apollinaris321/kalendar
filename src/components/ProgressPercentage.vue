<template>
  <div>
    {{ counter }}%
  </div>
</template>

<script setup>
import EventBus from '@/EventBus';
import { ref } from 'vue';

const counter = ref(0)
const target = ref(100)

function updateCounter(end){
  counter.value = 0
  const intervalId = setInterval(() => {
    if(counter.value >= target.value){
      clearInterval(intervalId)
    }else{
      counter.value += 1
    }
  }, end)
}

EventBus.on("event", (data) => {
  const start = data.end - data.start
  const percentage = (start / data.end) * 100
  target.value = Math.floor(percentage)

  updateCounter((percentage * 10 + 50) / 100)
})

</script>

<style scoped>

</style>
