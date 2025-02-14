<template>
<v-container class="fill-height ">
    <v-responsive
      class="align-centerfill-height mx-auto "
      max-width="900"
      @mousemove="handleMouseMove"
    >
      <div class="title">
        <h1 class="title-letter">K</h1>
        <h1 class="title-letter">a</h1>
        <h1 class="title-letter">l</h1>
        <h1 class="title-letter">e</h1>
        <h1 class="title-letter">n</h1>
        <h1 class="title-letter">d</h1>
        <h1 class="title-letter">e</h1>
        <h1 class="title-letter">r</h1>
      </div>

      <div class="dateSelectionContainer">
        <div>
          <div class="dateSelection">
            <div class="dateRowName">Start:</div>
            <CustomDropdown :options='years' default="2000" @input="selectYear"/>
            <CustomDropdown :options='months' default="January" @input="selectMonth"/>
            <CustomDropdown :options='days' default="1" @input="selectDay"/>
          </div>
          <div class="dateSelection">
            <div class="dateRowName">End:</div>
            <CustomDropdown :options='years' default="2080" @input="selectEndYear"/>
            <CustomDropdown :options='months' default="January" @input="selectEndMonth"/>
            <CustomDropdown :options='endDays' default="1" @input="selectEndDay"/>
          </div>
        </div>
        <div class="buttonPosition">
          <RippleButton @click="acceptBirthday" />
        </div>
      </div>
      <div>
        <Test></Test>
      </div>

      <div class="maincard d-flex justify-center align-center mx-auto">
        <div v-for="(dot, index) in dots" :key="index">
          <div
            :class="[dot.value === 1 ? 'outlineCircle' : 'circle', 'circle-'+index, {'even-index': dot.tick > 0}]"
            :id="'circle-'+index"
            :style="{ transform: 'scale(' + dot.scale + ')' }"
          />
        </div>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import moment from 'moment';
import gsap from 'gsap';
import CustomDropdown from './CustomDropdown.vue';
import RippleButton from './Ripplebutton.vue';
import EventBus from '@/EventBus';
import Test from './Progressbar.vue';

const months = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])

const months2 =  ref([
        { text: 'January', value: 1 },
        { text: 'February', value: 2 },
        { text: 'March', value: 3 },
        { text: 'April', value: 4 },
        { text: 'May', value: 5 },
        { text: 'June', value: 6 },
        { text: 'July', value: 7 },
        { text: 'August', value: 8 },
        { text: 'September', value: 9 },
        { text: 'October', value: 10 },
        { text: 'November', value: 11 },
        { text: 'December', value: 12 },
      ])

const selectedMonth = ref(1)
const selectedDay = ref(1)
const selectedYear = ref(2000)

const selectedEndMonth = ref(1)
const selectedEndDay = ref(1)
const selectedEndYear = ref(2080)

const days = ref(generateDays(selectedYear.value, selectedMonth.value))
const endDays = ref(generateDays(selectedEndYear.value, selectedEndMonth.value))

const years = ref([])

for(let i=1900;i<2100;i++){
  years.value.push(i)
}

let mouseX = 0
let mouseY = 0

let radius = 40

let ticking = false;

let dots = ref([])

acceptBirthday()

function acceptBirthday(){
  const initialDate = new Date(selectedYear.value, selectedMonth.value - 1, selectedDay.value);
  //const momentDate = moment(initialDate)
  const futureDate = new Date(selectedEndYear.value, selectedEndMonth.value - 1, selectedEndDay.value);
  const futureMomentDate = moment(futureDate)
  //const futureDate = momentDate.add(80, "years")
  const diff = futureMomentDate.diff(initialDate, 'weeks')

  const diffNow = futureMomentDate.diff(new Date(), 'weeks')

  EventBus.emit("event", {start: diffNow, end: diff})

  dots.value = []
  for(let i=0;i<diff;i++){
    if(i < diffNow){
      dots.value.push({value: 1, scale: 1, tick: 0})
    }else{
      dots.value.push({value: 2, scale: 1, tick: 0})
    }
  }
  dots.value.reverse()
}

function monthStrToNum(month){
  return months2.value.find(m => m.text === month).value
}

function generateDays(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
}

function updateDays() {
  days.value = generateDays(selectedYear.value, selectedMonth.value);

  if (selectedDay.value > days.value.length) {
    selectedDay.value = null
  }
}

function updateEndDays(){
  endDays.value = generateDays(selectedEndYear.value, selectedEndMonth.value);

  if (selectedEndDay.value > endDays.value.length) {
    selectedEndDay.value = null
  }
}

function selectYear(event){
  selectedYear.value = event;
}

function selectMonth(event){
  let month = monthStrToNum(event)
  selectedMonth.value = month;
}

function selectDay(event){
  selectedDay.value = event;
}

function selectEndYear(event){
  selectedEndYear.value = event;
}

function selectEndMonth(event){
  let month = monthStrToNum(event)
  selectedEndMonth.value = month;
}

function selectEndDay(event){
  selectedEndDay.value = event;
}

watch(selectedYear, (newVal, oldVal) => {
    updateDays()
})

watch(selectedMonth, (newVal, oldVal) => {
    updateDays()
})

watch(selectedEndYear, (newVal, oldVal) => {
    updateEndDays()
})

watch(selectedEndMonth, (newVal, oldVal) => {
    updateEndDays()
})

function handleMouseMove(event) {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      calcCircles(event);
      ticking = false;
    });
    ticking = true;
  }
}

function calcCircles(event) {
  mouseX = event.clientX
  mouseY = event.clientY

  for(let i=0;i<dots.value.length;i++){
    let pos = document.getElementById("circle-" + i).getBoundingClientRect();

    const dx = mouseX - pos.x;
    const dy = mouseY - pos.y;
    let result = Math.sqrt(dx * dx + dy * dy);
    if(result < radius / 4){
      dots.value[i].tick = 10
    }
    if(result < radius){
      dots.value[i].scale = 2 - (result / radius);
    }else{
      dots.value[i].scale = 1
      if(dots.value[i].tick > 0){
        dots.value[i].tick -= 1
      }
    }
  }
}

onMounted(() => {
  gsap.to('.test', {
      y: -5, // Move up by 5 pixels
      duration: 0.5, // Duration of the animation
      yoyo: true, // Enable yoyo effect to return to original position
      repeat: -1, // Repeat indefinitely
      ease: 'power1.inOut' // Easing function for smooth movement
    });

  gsap.from('.title-letter', {
     duration: 1,
     y: '-100%',
     ease: 'bounce',
     stagger: 0.1, // Stagger applies to each element in order
     opacity: 0,
  });
})

</script>

<style scoped>

.title{
  display: flex;
  justify-content: center;
  align-items: center;
}

.dateSelectionContainer{
  padding-bottom: 1em;
  padding-top: 1em;
}

.dateSelection{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: .5em;
  padding-bottom: .5em;
}

.maincard{
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 10px;
  padding-bottom: 1em;
}

.circle{
  flex: 1 0 21%;
  height: 7px;
  width: 7px;
  background-color: white;
  border-radius: 50%;
  position: relative;
}

.outlineCircle.even-index::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  width: 9px; /* Adjust the width as needed */
  height: 1px; /* Adjust the height as needed */
  background-color: white;
  transform: translateY(-50%);
}

.outlineCircle.even-index::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 1px; /* Adjust the width as needed */
  height: 9px; /* Adjust the height as needed */
  background-color: white;
  transform: translateX(-50%);
}

.circle.even-index::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  width: 9px; /* Adjust the width as needed */
  height: 1px; /* Adjust the height as needed */
  background-color: white;
  transform: translateY(-50%);
}

.circle.even-index::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 1px; /* Adjust the width as needed */
  height: 9px; /* Adjust the height as needed */
  background-color: white;
  transform: translateX(-50%);
}

.circle.hovered {
  transform: scale(1.5);
}

.outlineCircle{
  flex: 1 0 21%;
  height: 7px;    /* Set the desired height for the circles */
  width: 7px;     /* Optional: Add margin for spacing */
  border-radius: 50%; /* Makes the div a circle */
  border: 1px white solid;
}

.acceptBtn{
  background-color: white;
  color: black;
}

.click-button {
  padding: 12px 24px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  z-index: 3;
  cursor: pointer;
  height: 30%;
  width: 80%;
  top:25%;
  bottom:25%;
}

.line-container {
  background-color: red;
  width: 200px; /* Larger than button for full coverage */
  height: 200px;
  pointer-events: none; /* Allow clicks through SVG */
}

.buttonPosition{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: .5em;
  padding-top: .5em;
}

.dateRowName{
  width: 3em;
  text-align: end;
}

/*
TODO
tage im Jahr
eingabe ausbessern
prozent übrig
*/
</style>
