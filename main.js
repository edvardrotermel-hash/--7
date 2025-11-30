// OSM слой
const osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true
});

// Добавление векторного слоя
const vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'landuse.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: function(feature) {
        const type = feature.get('lu');
        let color;
        if (type === 'wood') color = '#add3a5';
        else if (type === 'prom') color = '#e79fb2';
        else if (type === 'residential') color = '#dedede';
        return new ol.style.Style({
            fill: new ol.style.Fill({color: color}),
            stroke: new ol.style.Stroke({color: '#000000ff', width: 1})
        });
    },
    visible: true
});

// Создание карты
const map = new ol.Map({
    target: 'map',
    layers: [osmLayer, vectorLayer],
    view: new ol.View({
        center: ol.proj.fromLonLat([56.200729129298686, 57.98448450611795]),
        zoom: 12
    })
});
// Обработчики событий для переключения слоев
document.getElementById('lyr_OSM').addEventListener('change', function(){ 
    osmLayer.setVisible(this.checked);
});

document.getElementById('gson_lyr').addEventListener('change', function(){ 
    vectorLayer.setVisible(this.checked);
});