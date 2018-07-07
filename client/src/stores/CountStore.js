import { observable, action } from "mobx";

const countStore = observable({
  value: 0,
  inc: function() {
    countStore.value++;
  },
  dec: function() {
    countStore.value--;
  }
});

export default countStore;
