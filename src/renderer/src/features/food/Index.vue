<template>
  <div class="relative h-96">
    <input v-model="input" class="input" placeholder="Tap on the virtual keyboard to start" />
    <div class="simple-keyboard"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

// input 변수를 ref()로 감싸주고 타입을 지정합니다.
const input: Ref<string> = ref('')

function onInputChange(value: string): void {
  // input.value 대신 v-model을 사용하여 양방향 바인딩합니다.
  input.value = value
  // keyboardRef.value?.setInput(value)
  console.log('Input changed', value)
}

function onKeyPress(button: string): void {
  console.log('Button pressed', button)
  // if (button === '{shift}' || button === '{lock}') handleShift()
  if (button.includes('{') && button.includes('}')) {
    handleShift(button)
  }
}

function handleShift(button: string): void {
  if (keyboardRef.value !== null) {
    // const currentLayout = keyboardRef.value.options.layoutName
    // const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
    // keyboardRef.value.setOptions({
    //   layoutName: shiftToggle
    // })
    // iOS
    const currentLayout = keyboardRef.value.options.layoutName
    let layoutName

    switch (button) {
      case '{shift}':
      case '{shiftactivated}':
      case '{default}':
        layoutName = currentLayout === 'default' ? 'shift' : 'default'
        break

      case '{alt}':
      case '{altright}':
        layoutName = currentLayout === 'alt' ? 'default' : 'alt'
        break

      case '{smileys}':
        layoutName = currentLayout === 'smileys' ? 'default' : 'smileys'
        break

      default:
        break
    }

    if (layoutName) {
      keyboardRef.value.setOptions({
        layoutName: layoutName
      })
    }
  }
}

// keyboardRef 변수를 ref()로 감싸주고 타입을 지정합니다.
const keyboardRef: Ref<Keyboard | null> = ref(null)
const layout = {
  default: [
    'q w e r t y u i o p {bksp}',
    'a s d f g h j k l {enter}',
    '{shift} z x c v b n m , . {shift}',
    '{alt} {smileys} {space} {altright} {downkeyboard}'
  ],
  shift: [
    'Q W E R T Y U I O P {bksp}',
    'A S D F G H J K L {enter}',
    '{shiftactivated} Z X C V B N M , . {shiftactivated}',
    '{alt} {smileys} {space} {altright} {downkeyboard}'
  ],
  alt: [
    '1 2 3 4 5 6 7 8 9 0 {bksp}',
    `@ # $ & * ( ) ' " {enter}`,
    '{shift} % - + = / ; : ! ? {shift}',
    '{default} {smileys} {space} {back} {downkeyboard}'
  ],
  smileys: [
    '😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 {bksp}',
    `😏 😬 😭 😓 😱 😪 😬 😴 😯 {enter}`,
    '😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄 {shift}',
    '{default} {smileys} {space} {altright} {downkeyboard}'
  ]
}
const display = {
  '{alt}': '.?123',
  '{smileys}': '\uD83D\uDE03',
  '{shift}': '⇧',
  '{shiftactivated}': '⇧',
  '{enter}': 'return',
  '{bksp}': '⌫',
  '{altright}': '.?123',
  '{downkeyboard}': '🞃',
  '{space}': ' ',
  '{default}': 'ABC',
  '{back}': '⇦'
}
onMounted(() => {
  keyboardRef.value = new Keyboard('.simple-keyboard', {
    onChange: (input: string): void => onInputChange(input),
    onKeyPress: (button: string): void => onKeyPress(button),
    theme: 'hg-theme-default hg-theme-ios',
    layout: layout,
    display: display,
    autoUseTouchEvents: true

    // preventMouseDownDefault: false,
  })
})
</script>

<style scoped>
input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

/**
 * hg-theme-default theme
 */
.simple-keyboard.hg-theme-ios {
  width: 100%;
  height: 36.625rem;
  margin: auto;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-row .hg-button {
  flex-grow: 1;
  cursor: pointer;
  max-width: initial;
  border: 1px solid deeppink;
}
.simple-keyboard.hg-theme-ios .hg-row {
  display: flex;
}
.simple-keyboard.hg-theme-ios .hg-row:not(:last-child) {
  margin-bottom: 5px;
}
.simple-keyboard.hg-theme-ios .hg-row .hg-button:not(:last-child) {
  margin-right: 5px;
}
.simple-keyboard.hg-theme-ios .hg-row:nth-child(2) {
  margin-left: 18px;
  border: 1px solid deeppink;
}
.simple-keyboard.hg-theme-ios.hg-theme-default {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 5px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default.hg-layout-custom {
  background-color: #e5e5e5;
  padding: 5px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button {
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0;
  background: white;
  border-bottom: 1px solid #b5b5b5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  font-weight: 400;
  font-size: 20px;
  max-width: 60px;
  min-width: 60px;
  height: 60px;
  min-height: 60px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button:active,
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button:focus {
  background: #e4e4e4;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-functionBtn {
  background-color: #adb5bb;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-button-space,
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-button-shift,
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button.hg-button-shiftactivated {
  background-color: #ffffff;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-space {
  max-width: 448px;
  min-width: 448px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-enter {
  max-width: 110px;
  min-width: 110px;
}
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-altright,
.simple-keyboard.hg-theme-ios.hg-theme-default .hg-button-back {
  min-width: 80px;
  max-width: 80px;
}
</style>
