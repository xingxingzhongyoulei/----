const getSymbol = () => {
  const symbol = [
    {
      markerType: 'triangle',
      markerFill: 'green',

      markerFillOpacity: 1,
      markerLineColor: '#015EEA',
      markerLineWidth: 1,
      markerLineOpacity: 1,
      markerWidth: {
        stops: [
          [8, 0],
          [9, 10]
        ]
      },
      markerHeight: {
        stops: [
          [8, 0],
          [9, 20]
        ]
      },
      markerDx: 0,
      markerDy: 0,
      markerOpacity: 1
    },
    {
      markerType: 'ellipse',
      markerFill: 'green',
      markerFillOpacity: 1,
      markerLineColor: '#015EEA',
      markerLineWidth: 1,
      markerLineOpacity: 1,
      markerWidth: {
        stops: [
          [8, 10],
          [9, 0]
        ]
      },
      markerHeight: {
        stops: [
          [8, 10],
          [9, 0]
        ]
      },
      markerDx: 0,
      markerDy: 0,
      markerOpacity: 1
    },
    {
      markerType: 'ellipse',
      markerFill: 'white',
      markerFillOpacity: 0,
      markerLineColor: 'red',
      markerLineWidth: 3,
      markerLineOpacity: 1,
      markerWidth: {
        stops: [
          [8, 20],
          [9, 40]
        ]
      },
      markerHeight: {
        stops: [
          [8, 20],
          [9, 40]
        ]
      },
      markerDx: 0,
      markerDy: 0,
      markerOpacity: 1,
      markerHorizontalAlignment: 'middle',
      markerVerticalAlignment: 'middle'
    }
  ]

  return symbol
}

export { getSymbol }
