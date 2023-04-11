<template>
  <div class="checkbox-container">
    <input type="checkbox" :id="id" v-model="checked" true-value="true" false-value="false" />
    <label :for="id" class="checkbox-label">{{ label }}</label>
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
};
</script>

<style scoped>
input[type=checkbox] {
  transform: scale(4);
  margin: 24px 0;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  font-size: 24px;
}


.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-left:40px ;
}
.checkbox-label {
  margin-left: 40px;
}
</style>