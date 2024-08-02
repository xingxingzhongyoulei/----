<script setup>
import { RouterView } from 'vue-router'
import Map from '@/components/Emergency/map.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRoute()
const mapRef = ref(null)
watch(
  route,
  (newValue, oldValue) => {
    if (newValue.path == '/emergency' && mapRef.value != null) {
      mapRef.value.removeCircle()
      mapRef.value.mapToolShowToggle(true)
    } else if (newValue.path == '/accident-information' && mapRef.value != null) {
      mapRef.value.mapToolShowToggle(false)
    } else if (newValue.path == '/processEvent' && mapRef.value != null) {
      mapRef.value.handleClickScheme(true)
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="emergency-wrapper">
    <Map ref="mapRef"></Map>
    <RouterView name="header"></RouterView>
    <RouterView name="leftTop"></RouterView>
    <RouterView name="leftBottom"></RouterView>
  </div>
</template>

<style lang="scss" scoped>
.emergency-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
