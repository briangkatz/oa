
//////////////////////////////////////////////////////////////////////////
// Scene 1: Hatchery

var hatchery = L.geoJson.ajax('assets/hatchery.geojson', {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: L.divIcon({
            className: "fas fa-database fa-5x hatchery"})});
        },
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.name, {sticky: true, className: "feature-tooltip"});
    }
});

var netarts = L.geoJson.ajax('assets/netarts.geojson', {
    color: 'black',
    weight: 2,
    opacity: 0.3,
    // pointToLayer: function (feature, latlng) {
    //     return L.marker(latlng, {icon: L.divIcon({
    //         className: "fas fa-database fa-5x hatchery"})});
    // },
    onEachFeature: onEachFeature
    //
    //     function (feature, layer) {
    //     layer.bindTooltip(feature.properties.name, {sticky: true, className: "feature-tooltip"});
    // }
});

//////////////////////////////////////////////////////////////////////////
// Scene 2: Stakeholders

var hatchery2 = L.geoJson.ajax('assets/hatchery.geojson', {
    color: 'black',
    weight: 2,
    opacity: 0.3,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: L.divIcon({
            className: "fas fa-database fa-2x hatchery"})});  // changed from 5x to 2x size
    },
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.name, {sticky: true, className: "feature-tooltip"});
    }
});

var stakeholders = L.geoJson.ajax('assets/stakeholders.geojson', {
    pointToLayer: function (feature, latlng) {
        var id = 0;
        var ico = "users";
        if (feature.properties.type === "HATCHERY") { id = 0; ico = "fas fa-database"; }
        else if (feature.properties.type === "GROWER") { id = 1; ico = "fab fa-pagelines"; }
        else if (feature.properties.type === "TRIBE") { id = 2; ico = "fas fa-leaf"; }
        else if (feature.properties.type === "PROCESSOR") { id = 3; ico = "fas fa-industry"; }
        else if (feature.properties.type === "DISTRIBUTOR") { id = 4; ico = "fas fa-shipping-fast"; }
        else { id = 5; ico = "fas fa-exchange-alt"} // "RETAILER"
        return L.marker(latlng, {icon: L.divIcon({className: ico + " " + 'marker-color-1'})});
    },
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.name, {sticky: true, className: "feature-tooltip"});
    }
});

// define color scale for point data markers
var colors = chroma.scale(['#A5BF15', '#C9F5F6']).mode('lch').colors(6);
// set color of markers based on .marker-color-#
for (i = 0; i < 6; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 16px; text-shadow: 1px 1px 1px #000000; opacity: 0.5;} </style>"));
}

var whiskey_lines = L.geoJson.ajax('assets/whiskey_network.geojson', {
        style: function(feature) {
            return {
                color: 'green',
                dashArray: "20, 10",
                weight: 4,
                opacity: 0.15
            };
        }
});

// var stakeholders_legend = '<p style="padding-bottom: 8px; font-size: 20px;"><b>Stakeholder Type</b><br></p>' +
//     '<i class="fas fa-database marker-color-1"></i><p>Hatchery</p>' +
//     '<i class="fab fa-pagelines marker-color-1"></i><p>Grower</p>' +
//     '<i class="fas fa-leaf marker-color-1"></i><p>Tribe</p>' +
//     '<i class="fas fa-industry marker-color-1"></i><p>Processor</p>' +
//     '<i class="fas fa-shipping-fast marker-color-1"></i><p>Distributor</p>' +
//     '<i class="fas fa-exchange-alt marker-color-1"></i><p>Retailer</p>';

//////////////////////////////////////////////////////////////////////////
// Scene 3: Seed Crisis

var hatchery3 = L.geoJson.ajax('assets/hatchery.geojson', {
    color: 'black',
    weight: 2,
    opacity: 0.3,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: L.divIcon({
            className: "fas fa-exclamation-triangle fa-2x blinking hatchery-warning"})});
    },
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.name, {sticky: true, className: "feature-tooltip"});
    }
});

var arag2050 = L.tileLayer('assets/arag2050/{z}/{x}/{y}.png', {
    attribution: 'Aragonite raster generated by QTiles',
    detectRetina: true,
    className: "arag"
});

var stakeholders2 = L.geoJson.ajax('assets/stakeholders.geojson', {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: L.divIcon({className: "fas fa-ban stakeholders-warning"})});
    }
});

//////////////////////////////////////////////////////////////////////////
// Scene 4: Funded Projects

var colors2 = ['#2c7bb6', '#abd9e9', '#ffffbf', '#fdae61', '#d7191c'];

for (i = 0; i < 5; i++) {
    $('head').append($("<style> .marker-color2-" + (i + 1).toString() + " { color: " + colors2[i] + "; font-size: 16px; opacity: 0.5; text-shadow: 1px 1px 1px #000000;} </style>"));
}

var funded_projects = L.geoJson.ajax('assets/funded_projects.geojson', {
    style: function (feature, layer) {
        return {
            weight: 10,
            opacity: 0.5
        };
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.funding_agency === "National Oceanic and Atmospheric Administration") { id = 0; }
        else if (feature.properties.funding_agency === "National Science Foundation") { id = 1; }
        else if (feature.properties.funding_agency === "Environmental Protection Agency") { id = 2; }
        else if (feature.properties.funding_agency === "Oregon State General Fund") { id = 3; }
        else { id = 4; } // "Bonneville Power Adminstration"
        return L.marker(latlng, {icon: L.divIcon({className: "fas fa-flask projects" + " " + 'marker-color2-' + (id + 1).toString() })});
    },
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.asset, {sticky: true, className: "feature-tooltip"});
    }
});

var funding_lines = L.geoJson.ajax('assets/funding_lines.geojson', {
    style: function(feature) {
        return {
            color: 'gray',
            dashArray: "20, 10",
            weight: 4,
            opacity: 0.15
        };
    }
});

// var funded_projects_legend = '<p style="padding-bottom: 8px; font-size: 20px;"><b>Funding Agencies</b></p>' +
//     '<i class="fas fa-flask marker-color2-1"></i><p>NOAA</p>' +
//     '<i class="fas fa-flask marker-color2-2"></i><p>National Science Foundation</p>' +
//     '<i class="fas fa-flask marker-color2-3"></i><p>Environmental Protection Agency</p>' +
//     '<i class="fas fa-flask marker-color2-4"></i><p>Oregon State General Fund</p>' +
//     '<i class="fas fa-flask marker-color2-5"></i><p>Bonneville Power Administration</p>';

//////////////////////////////////////////////////////////////////////////
// Scene 5: Successful Adaptation



//////////////////////////////////////////////////////////////////////////
// Layer, Scene, and Storymap Management
var layers = {
    arag2050: {layer: arag2050},
    netarts: {layer: netarts},
    stakeholders: {layer: stakeholders},
    stakeholders2: {layer: stakeholders2},
    whiskey_lines: {layer: whiskey_lines},
    hatchery: {layer: hatchery},
    hatchery2: {layer: hatchery2},
    hatchery3: {layer: hatchery3},
    funded_projects: {layer: funded_projects},
    funding_lines: {layer: funding_lines},
    shellfish: {layer: L.tileLayer('https://api.mapbox.com/styles/v1/katzbr/cjshza9xf1db51fqgpriounjs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F0emJyIiwiYSI6ImNqOHhmMnBucDIwZm4ycW8ya2d5cHF0cmsifQ.8rcjz0DyWs_ncWfOZ0VwKA')}
};

var scenes = {
    overview: {lat: 45.408, lng: -123.960140, zoom: 13, name: 'Overview'},
    whiskey: {lat: 45.408, lng: -123.950140, zoom: 13, name: 'Whiskey Creek', layers: ['hatchery', 'netarts', 'shellfish']},
    network: {lat: 46, lng: -124, zoom: 7, name: 'Importance to Network', layers: ['hatchery2', 'stakeholders', 'whiskey_lines', 'shellfish']},
    seed: {lat: 46, lng: -124, zoom: 7, name: 'Oyster Seed Crisis', layers: ['arag2050', 'hatchery3', 'stakeholders2', 'shellfish']},
    adaptation: {lat: 46, lng: -124, zoom: 7, name: 'Adaptive Capacity', layers: ['funded_projects', 'funding_lines', 'shellfish']},
    success: {lat: 45.408, lng: -123.960140, zoom: 13, name: 'Successful Adaptation', layers: ['hatchery', 'shellfish']},
    end: {lat: 45.408, lng: -123.960140, zoom: 13, name: 'The End'}
};

$('#storymap').storymap({
    scenes: scenes,
    layers: layers,
    baselayer: layers.shellfish,
    legend: true,
    credits: "",
    loader: true,
    scalebar: false,
    navwidget: true,

    createMap: function () {
        // create a map in the "map" div, set the default view and zoom level
        var map = L.map($(".storymap-map")[0], {
            zoomControl: false,
            scrollWheelZoom: false
        }).setView([45.408, -123.960140], 13);

        // add zoom control with custom position
        L.control.zoom({
            position:'bottomright'
        }).addTo(map);

        return map;
    }
});

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-110256930-2', 'auto');
ga('send', 'pageview');

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Interactive Features.
// 3.2.1 highlight a feature when the mouse hovers on it.
function highlightFeature(e) {
    // e indicates the current event
    var layer = e.target; //the target capture the object which the event associates with
    layer.setStyle({
        weight: 8,
        opacity: 0.8,
        color: '#ffffff',
        fillColor: '#9FD3DB',
        fillOpacity: 0.5
    });
    // bring the layer to the front.
    layer.bringToFront();
}

// 3.2.2 zoom to the highlighted feature when the mouse is clicking onto it.
// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }

// 3.2.3 reset the highlighted feature when the mouse is out of its region.
function resetHighlight(e) {
    netarts.resetStyle(e.target);
}

// 3.3 add these events to the layer object.
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        // click: zoomToFeature,
        mouseout: resetHighlight
    });
    layer.bindTooltip(feature.properties.name, {sticky: true, className: "feature-tooltip"});
}