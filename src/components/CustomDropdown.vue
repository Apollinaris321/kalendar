<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="openSelection">
      <div>
      {{ selected }}
      </div>
      <v-icon
        icon="mdi-triangle"
        :class="['arrow-icon', {'custom-rotate' : isRotate, 'custom-rotate-close': !isRotate }]"
        size="x-small"
        :style="{fontSize: '.8em', color: 'black',}"
      />
    </div>
    <div id="items" class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :id="option"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
      isRotate: false
    };
  },
  watch:{
    open(newVal, oldVal){
      this.isRotate = this.open
    }
  },
  methods:{
    openSelection(){
      this.open = !this.open;
      this.$nextTick(() => {
        const container = document.getElementById('items');
        const rowToScrollTo = document.getElementById(this.selected);

        if (container && rowToScrollTo) {
          container.scrollTop = rowToScrollTo.offsetTop-40;
        }
      });
    }
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};

</script>

<style scoped>

.arrow-icon {
  transform:rotate(0deg);
}

.custom-rotate-close{
  animation: rotateclose 1s;
  animation-fill-mode: forwards;
}

@keyframes rotateclose {
  0% {transform: rotate(180deg);}
  10% {transform: rotate(200deg);}
  20% {transform: rotate(180deg);}
  90% {transform: rotate(-10deg);}
  100% {transform: rotate(0deg);}
}

.custom-rotate{
  animation: rotate 1s;
  animation-fill-mode: forwards;
}

@keyframes rotate {
  0% {transform: rotate(0deg);}
  90% {transform: rotate(190deg);}
  100% {transform: rotate(180deg);}
}

::-webkit-scrollbar
{
  width: 10px;
}

::-webkit-scrollbar-track
{
    background: #f2f2f2;
}

::-webkit-scrollbar-thumb
{
    background: #cfcece;
}

.custom-select {
  position: relative;
  width: 13em;
  text-align: left;
  outline: none;
  height: 2em;
  line-height: 2em;
  padding:0;
}

.selected{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .2em;
  background-color: #ffffff;
  color: #000;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected {
  background-color: #ffffff;
  color: #000;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #000;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
}

.custom-select .items {
  color: #000;
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 1;
  max-height: 150px;
  overflow-y: auto;
}

.custom-select .items div {
  color: #000;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  overscroll-behavior: contain;
}

.custom-select .items div:hover {
  background-color: #f2f2f2;
}

.selectHide {
  display: none;
}

</style>
