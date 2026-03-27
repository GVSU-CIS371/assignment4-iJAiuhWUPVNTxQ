import { defineStore } from "pinia";
import bases from "../data/bases.json";
import creamers from "../data/creamers.json";
import syrups from "../data/syrups.json";
import tempretures from "../data/tempretures.json";

export interface SavedBeverage {
  id: string;
  name: string;
  temp: string;
  baseId: string;
  creamerId: string;
  syrupId: string;
}

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures as string[],
    bases: bases as any[],
    creamers: creamers as any[],
    syrups: syrups as any[],
    currentTemp: tempretures[0] as string,
    currentBaseId: bases[0].id as string,
    currentCreamerId: creamers[0].id as string,
    currentSyrupId: syrups[0].id as string,
    nameInput: "",
    savedBeverages: [] as SavedBeverage[],
    nextId: 1
  }),

  actions: {
    makeBeverage() {
      if (this.nameInput.trim() === "") return;
      
      const newBeverage: SavedBeverage = {
        id: (this.nextId++).toString(),
        name: this.nameInput.trim(),
        temp: this.currentTemp,
        baseId: this.currentBaseId,
        creamerId: this.currentCreamerId,
        syrupId: this.currentSyrupId
      };
      
      this.savedBeverages.push(newBeverage);
      this.nameInput = "";
    },
    
    showBeverage(id: string) {
      const beverage = this.savedBeverages.find(b => b.id === id);
      if (beverage) {
        this.currentTemp = beverage.temp;
        this.currentBaseId = beverage.baseId;
        this.currentCreamerId = beverage.creamerId;
        this.currentSyrupId = beverage.syrupId;
      }
    }
  },
  
  persist: true
});
