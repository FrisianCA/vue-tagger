<template>
  <div class="tag-input">
    <div
      v-for="(tag, index) in tags"
      :key="index"
      class="tag-input__tag"
      draggable="true"
      @dragstart="startDrag($event, index)"
      @drop="onDrop($event, index)"
      @dragenter.prevent
      @dragover.prevent
    >
      <span @click="removeTag(index)">x</span>
      {{ tag }}
    </div>
    <input
      type="text"
      placeholder="Enter text then press enter"
      class="tag-input__text"
      @keydown="addTag"
      @keydown.delete="removeLastTag"
      v-model="inputValue"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps([
  "baseFontSize",
  "deleteHoverColor",
  "hoverColor",
  "fontColor",
  "backgroundColor",
  "tagBackgroundColor",
  "hoverBackgroundColor",
  "names",
]);

let tags = ref(props.names);

const inputValue = ref("");

const removeLastTag = () => {
  if (inputValue.value.length == 0) {
    removeTag(tags.value.length - 1);
  }
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
};

const addTag = (event) => {
  if (event.code == "Comma" || event.code == "Enter") {
    event.preventDefault();

    let input = event.target.value.trim();

    if (input.length > 0) {
      tags.value.push(input);
      event.target.value = "";
      inputValue.value = "";
    }
  }
};

const startDrag = (event, tagIndex) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", tagIndex);
};

const onDrop = (event, location) => {
  const itemID = event.dataTransfer.getData("itemID");

  tags.value = reorder_tags(tags.value, itemID, location);
};

const reorder_tags = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

const hoverColor = ref(props.hoverColor);
const deleteHoverColor = ref(props.deleteHoverColor);
const baseFontSize = ref(props.baseFontSize);
const fontColor = ref(props.fontColor);
const backgroundColor = ref(props.backgroundColor);
const tagBackgroundColor = ref(props.tagBackgroundColor);
const hoverBackgroundColor = ref(props.hoverBackgroundColor);
</script>


<style lang="scss">
.tag-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 50px;

  padding: 0 10px;

  border: 1px solid #eee;

  font-size: v-bind(baseFontSize);

  background-color: v-bind(backgroundColor);

  .tag-input__tag {
    height: 30px;
    line-height: 30px;

    cursor: pointer;

    float: left;

    margin-right: 10px;
    margin-top: 10px;
    padding: 0 5px;

    background-color: v-bind(tagBackgroundColor);
    color: v-bind(fontColor);

    border-radius: 5px;

    &:hover {
      background-color: v-bind(hoverBackgroundColor);
      color: v-bind(hoverColor);
    }

    span {
      cursor: pointer;
      opacity: 0.75;
      font-size: v-bind(baseFontSize);
      font-weight: 700;
      &:hover {
        color: v-bind(deleteHoverColor);
      }
    }
  }

  .tag-input__text {
    border: none;
    outline: none;
    font-size: v-bind(baseFontSize);
    line-height: 50px;
    background: none;
    color: v-bind(fontColor);
  }
}
</style>