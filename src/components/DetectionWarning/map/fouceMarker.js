import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
export default class FouceMarker {
  constructor(map, coor) {
    this.map = map
    this.coor = coor
    this.layer = {}
    this.initLayer()
    this.initFocuceMarker()
  }
  initLayer() {
    this.layer.FouceMarkerLayer = new maptalks.VectorLayer('FouceMarkerLayer').addTo(this.map)
  }
  initFocuceMarker() {
    new maptalks.Marker(this.coor, {
      symbol: [
        {
          markerFile: '/img/map/icon-focus.png',
          markerWidth: {
            stops: [
              [10, 40],
              [11, 20]
            ]
          },
          markerHeight: {
            stops: [
              [10, 40],
              [11, 20]
            ]
          },
          // markerDx: -10,
          // markerDy: {
          //   stops: [
          //     [10, 10],
          //     [11, 10]
          //   ]
          // }
        }
      ]
    }).addTo(this.layer.FouceMarkerLayer)
  }

  removeFocuceMarker() {
    this.layer.FouceMarkerLayer.remove()
    if (this.map.getLayer('FouceMarkerLayer')) {
      this.layer.FouceMarkerLayer.clear()
      this.map.removeLayer('FouceMarkerLayer')
    }
  }
}
