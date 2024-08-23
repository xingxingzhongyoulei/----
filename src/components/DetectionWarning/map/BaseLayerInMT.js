/**
 * 基于maptalks的底图切换操作
 */

import { switchBase } from '@/components/common/switchBase'
import * as maptalks from 'maptalks'
// import { GroupGLLayer } from '@maptalks/gl-layers'
export default class BaseLayerInMT {
  constructor(map, key) {
    this.map = map

    // 自定义字段
    this.layers = {} // 底图图层组
    this.key = key || 'sea' // 底图图层类型

    // 初始化webgl图层组
    this.group = new maptalks.GroupTileLayer('group').addTo(this.map).bringToFront()

    // 初始化定位所有底图
    switchBase.forEach((item) => {
      this._initBaseLayer(item.name, item)
    })

    this.toggleMapServer(this.key)
  }

  // 底图图层初始化
  _initBaseLayer(key, options) {
    const layers = this.layers
    const name = `base_${key}`
    let layer = layers[name]
    if (layer) {
      layer.remove()
    }
    layer = new maptalks.TileLayer(name, {
      subdomains: options.subdomains,
      urlTemplate: options.url,
      zIndex: 1
    })
    layers[name] = layer
    return layer
  }

  /**
   * 路网图叠加
   * @param key
   */
  _restructureLayer(key) {
    // 清空叠加的其他region底图
    const regionLayers = ['vector_region', 'image_region']
    regionLayers.forEach((item) => {
      if (this.map.getLayer(item)) {
        this.map.removeLayer(this.layers[`base_${item}`])
      }
    })

    // 叠加需要的region底图
    switch (key) {
      case 'image':
        this.map.addLayer(this.layers['base_image_region'])
        break
      case 'vector':
        this.map.addLayer(this.layers['base_vector_region'])
        break
      default:
        break
    }
  }

  /**
   * 设置底图
   * @param key -底图key
   */
  toggleMapServer(key) {
    const layers = this.layers
    const name = `base_${key}`
    const layer = layers[name]
    if (layer) {
      this.map.setBaseLayer(layer)
      this._restructureLayer(key)
      this.key = key
    }
  }
}
