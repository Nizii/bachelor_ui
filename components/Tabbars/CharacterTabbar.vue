<template>
  <div class="button-group">
    <button @click="showWinesForCharacter('intensiv')" class="button button-1">intensiv</button>
    <button @click="showWinesForCharacter('fruchtig')" class="button button-2">fruchtig</button>
    <button @click="showWinesForCharacter('suss')" class="button button-3">süss</button>
    <button @click="showWinesForCharacter('exotisch')"  class="button button-4">exotisch</button>
    <button @click="showWinesForCharacter('saftig')"  class="button button-4">saftig</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedCharacter: '',
    };
  },
  methods: {
    showWinesForCharacter(character) {
      this.selectedCharacter = character;
      this.$emit('show-wines', character);
    },
  },
};
</script>

<style scoped>
.button-group::-webkit-scrollbar {
  display: none;
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #D9D9D9;
  height: 50px;
  overflow-x: auto; /* Scrollt seitlich yessss*/
  white-space: nowrap; 
  margin: 4px;
  padding-left: 40px;
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: #D9D9D9;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  transition: color 0.3s;
  border-radius: 10px;
  margin-left: 20px;
  border-style: none;
  font-size: 12px;
  
}

.button:hover,
.button:focus {
  color: black;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: black;
  text-decoration-thickness: 2px;
  text-decoration-offset: 5px;
}



.button-1 span,
.button-2 span,
.button-3 span,
.button-4 span {
  font-size: 12px;
}
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #D9D9D9;
  height: 50px;
  overflow-x: auto; /* Scrollt seitlich yessss*/
  white-space: nowrap; 
  margin: 4px;
  padding-left: 40px;
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: #D9D9D9;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  transition: color 0.3s;
  border-radius: 10px;
  margin-left: 20px;
  border-style: none;
  font-size: 12px;
  
}

.button:hover,
.button:focus {
  color: black;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: black;
  text-decoration-thickness: 2px;
  text-decoration-offset: 5px;
}



.button-1 span,
.button-2 span,
.button-3 span,
.button-4 span {
  font-size: 12px;
}

</style>