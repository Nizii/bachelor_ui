<template>
  <div class="checkbox-container" @click="toggle">
    <div class="checkbox" :class="{ 'checkbox-checked': checked }">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(checked) {
        this.$emit("input", checked);
      },
    },
  },
  methods: {
    toggle() {
      this.checked = !this.checked;
    },
  },
};
</script>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  width: 50%;
}

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 2px solid #aaa;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, color 0.3s;
}

.checkbox.checkbox-checked {
  background-color: #007bff;
  color: #fff;
}

</style>
