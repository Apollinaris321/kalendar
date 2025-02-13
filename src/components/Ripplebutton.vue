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
  color: black !important;
  background-color: #ffffff !important;
  transition: all 0.1s;
  overflow: hidden;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-weight: 500;
  height: 2em;
  border-radius: 0;
  padding: 12px 24px;
}

.btn-ripple:active {
  transform: scale(0.95);
}

.btn-ripple:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: .2em;
  height: .2em;
  background-color: #a0a0a0;
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(40, 50);
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
