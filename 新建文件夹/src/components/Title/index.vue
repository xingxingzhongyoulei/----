<template>
  <div class="title-container">
    <span class="title">{{ title }}</span>
    <ul class="button-list">
      <template v-if="type === 'select'">
        <el-dropdown
          v-for="(item, index) in list"
          :key="index"
          :teleported="false"
          trigger="click"
          popper-class="popper_title"
          @command="(command) => toggle(item.prop, command)"
        >
          <li class="button-list-item">
            <span>{{ model[item.prop] || item.default }}</span>
            <img src="@/assets/img/common/arrow-down.png" alt="" />
          </li>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(option, _index) in item.options"
                :key="_index"
                :command="option"
                >{{ option.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>

      <template v-if="type === 'button'">
        <li
          class="button-list-item button"
          v-for="(item, index) in list"
          :key="index"
          @click="toggle(item.prop)"
        >
          <span>{{ item.label }}</span>
          <img src="@/assets/img/common/icon-arrow-yellow.png" alt="" />
        </li>
      </template>

      <template v-if="type === 'text'">
        <template v-for="item in list" :key="item">
          <span class="button-list-item">{{ item }}</span>
        </template>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['select'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: ''
  }
})

const model = reactive({})

const toggle = (prop, option) => {
  if (props.type === 'select') {
    model[prop] = option.label
  }
  emit('handle', {
    prop,
    option
  })
}
</script>

<style scoped lang="scss">
.title-container {
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
    font-family: 'DingTalkJinBuTi';
    font-weight: 600;
    font-size: 16px;
    font-style: normal;
    text-transform: none;
    background-image: linear-gradient(180deg, #ffffff 0%, #e2f1fa 50%, #89d5ff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    &::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 3px;
      background-image: url('@/assets/img/common/title-prefix-icon.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }

  .button-list {
    display: flex;
    gap: 10px;

    :deep(.el-dropdown__popper) {
      &.popper_title {
        border-radius: 0;
        border-color: #0b69c3;
        inset: 30px 0px auto 0px !important;

        .el-dropdown-menu {
          background-color: #0c2b87;
          border-radius: 0;
          padding: 6px 0;

          .el-dropdown-menu__item {
            height: 20px;
            background-color: #2992ff1a;
            color: #fff;
            font-size: 12px;
            line-height: 20px;
            padding: 0;
            box-sizing: border-box;
            justify-content: center;

            &:not(:last-of-type) {
              margin-bottom: 4px;
            }

            &:hover {
              background-color: #2992ff4d;
            }
          }
        }

        .el-popper__arrow {
          display: none;
        }
      }
    }

    .button-list-item {
      min-width: 72px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      font-size: 12px;
      color: #e6f0feb8;
      background-image: url('@/assets/img/common/button-background.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
      cursor: pointer;

      &.button {
        min-width: 84px;
        color: #fec230ff;
        font-family: 'YSR';
        font-size: 14px;
        gap: 5px;
      }
    }
  }
}
</style>
