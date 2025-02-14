<script setup>
</script>

<template>
  <button class="btn-ripple">
    <span>
      Submit
    </span>
  </button>
</template>

<style>

.btn-ripple {
  cursor: pointer ;
  color: black ;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-weight: 500;
  height: 2em;
  border-radius: 0;
  padding: 1em 1em 1em 1em;
  transition: all 0.1s;
}

.btn-ripple:active {
  transform: scale(0.90);
}

.btn-ripple:after {
  content: "";
  position: relative;
  right: 30%;
  width: .2em;
  height: .2em;
  border-radius: 100%;
  background-color: #a19e9e;
  opacity: 0;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  50% {
    transform: scale(50, 50);
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(100, 100);
  }
}

.btn-ripple:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

.btn-ripple:after {
  visibility: hidden;
}

.btn-ripple:focus:after {
  visibility: visible;
}
</style>
