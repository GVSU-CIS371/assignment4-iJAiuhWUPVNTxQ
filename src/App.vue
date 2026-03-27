<template>
  <div>
    <Beverage
      :isIced="currentTemp === 'Cold'"
      :base-id="currentBaseId"
      :creamer-id="currentCreamerId"
      :syrup-id="currentSyrupId"
    />

    <ul>
      <li>
        <template v-for="temp in store.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="store.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
    </ul>

    <div class="controls">
      <div class="control-group">
        <label>Base Beverage:</label>
        <select v-model="store.currentBaseId">
          <option v-for="base in store.bases" :key="base.id" :value="base.id">
            {{ base.name }}
          </option>
        </select>
      </div>

      <div class="control-group">
        <label>Creamer:</label>
        <select v-model="store.currentCreamerId">
          <option v-for="creamer in store.creamers" :key="creamer.id" :value="creamer.id">
            {{ creamer.name }}
          </option>
        </select>
      </div>

      <div class="control-group">
        <label>Syrup:</label>
        <select v-model="store.currentSyrupId">
          <option v-for="syrup in store.syrups" :key="syrup.id" :value="syrup.id">
            {{ syrup.name }}
          </option>
        </select>
      </div>

      <div class="control-group">
        <label>Name:</label>
        <input v-model="store.nameInput" placeholder="My Latte" />
        <button @click="store.makeBeverage">Make Beverage</button>
      </div>
    </div>

    <div id="beverage-container">
      <div 
        v-for="bev in store.savedBeverages" 
        :key="bev.id"
        class="recipe-btn"
        @click="store.showBeverage(bev.id)"
      >
        {{ bev.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

const store = useBeverageStore();

const currentTemp = store.currentTemp;
const currentBaseId = store.currentBaseId;
const currentCreamerId = store.currentCreamerId;
const currentSyrupId = store.currentSyrupId;
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}

ul {
  list-style: none;
  padding-left: 0;
}

.controls {
  margin-top: 16px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

select,
input {
  padding: 4px 6px;
  border-radius: 4px;
}

button {
  padding: 6px 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 4px;
}

.recipe-btn {
  padding: 8px 12px;
  margin: 4px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.recipe-btn:hover {
  background: #e0e0e0;
}

#beverage-container {
  margin-top: 16px;
  text-align: center;
}
</style>
