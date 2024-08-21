export const switchBase = [
  {
    max: 18,
    name: 'vector',
    subdomains: ['0', '1', '2', '3', '4', '5'],
    spatialReference: {
      projection: 'EPSG:3857'
    },
    url: `https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=8f5df3dd8f99208d84d181bd439c8026`
  },
  {
    name: 'sea',
    subdomains: ['a', 'b', 'c'],
    spatialReference: {
      projection: 'EPSG:3857'
    },
    url: 'https://inner.qdlimap.cn:19443/gisAssistant/wmts/grid_tile/local/seaMap/01_1-18/{z}/{y}/{x}'
  },
  {
    max: 17,
    name: 'image',
    spatialReference: {
      projection: 'EPSG:3857'
    },
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    url: 'https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=8f5df3dd8f99208d84d181bd439c8026'
  },
  {
    max: 20,
    name: 'dark',
    subdomains: ['a', 'b', 'c', 'd'],
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
  }
]
