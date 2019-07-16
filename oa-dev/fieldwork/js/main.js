var vulnColors = chroma.scale('OrRd').mode('lab').colors(4);

function setColor(vuln) {
    var id = 0;
    if (vuln === 4) { id = 3; }  // High (H/L)
    else if (vuln === 3) { id = 2; }  // Medium (H/H)
    else if (vuln === 2) { id = 1; }  // Medium (L/L)
    else  { id = 0; }  // Low (L/H)
    return vulnColors[id];
}

function vulnStyle(feature) {
    return {
        fillColor: setColor(feature.properties.cluster),
        fillOpacity: 0.6,
        weight: 1,
        opacity: 1,
        color: '#000000',
        dashArray: '1'
    };
}

function highlightEstuary(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 0.8,
        color: '#ffffff',
        fillColor: '#6b8e3a',
        fillOpacity: 0.8
    });
    layer.bringToFront();
    // Select the update class, and update the content with the input value.
    layer.bindTooltip(layer.feature.properties.nca_name, {sticky: true, className: "feature-tooltip"});
}

function resetHighlightEstuary(e) {
    layers.estuaries.layer.resetStyle(e.target);
    $(".info").hide();
}

function onEachEstuary(feature, layer) {
    layer.on({
        mouseover: highlightEstuary,
        mouseout: resetHighlightEstuary
    });
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 0.8,
        color: '#E0631D',
        fillColor: '#ffffff',
        fillOpacity: 0.8
    });
    layer.bringToFront();
    // Select the update class, and update the content with the input value.
    $(".update").html('<h2>' + layer.feature.properties.name + '</h2><h2 class="subtitle">Vulnerability to OA</h2><br><p>Exposure: ' + layer.feature.properties.exposure + ' </p><br>' + '<p>Sensitivity: ' + layer.feature.properties.sensitivty + ' </p><br>' + '<p>Adaptive Capacity: ' + layer.feature.properties.adptvcapac + '</p>');
    $(".info").show();
}

function resetHighlight(e) {
    layers.vulnerability_watersheds.layer.resetStyle(e.target);
    $(".info").hide();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
    // layer.bindTooltip('<h2>' + feature.properties.name + '</h2><h2 class="subtitle">Vulnerability to OA</h2><br><p>Exposure: ' + layer.feature.properties.exposure + ' </p><br>' + '<p>Sensitivity: ' + layer.feature.properties.sensitivty + ' </p><br>' + '<p>Adaptive Capacity: ' + layer.feature.properties.adptvcapac + '</p>', {sticky: true, className: "feature-tooltip"});
}

amplifierPoints_mr = amplifierPoints_mr.map(function (p) { return [p["geometry"]["coordinates"][0][1], p["geometry"]["coordinates"][0][0]]; });
amplifierPoints_wtn = amplifierPoints_wtn.map(function (p) { return [p["geometry"]["coordinates"][0][1], p["geometry"]["coordinates"][0][0]]; });
amplifierPoints_n = amplifierPoints_n.map(function (p) { return [p["geometry"]["coordinates"][0][1], p["geometry"]["coordinates"][0][0]]; });
amplifierPoints_hc = amplifierPoints_hc.map(function (p) { return [p["geometry"]["coordinates"][0][1], p["geometry"]["coordinates"][0][0]]; });
amplifierPoints_all = amplifierPoints_all.map(function (p) { return [p["geometry"]["coordinates"][0][1], p["geometry"]["coordinates"][0][0]]; });
// habPoints = habPoints.map(function (p) { return [p["geometry"]["coordinates"][1], p["geometry"]["coordinates"][0]]; });
// cattlePoints = cattlePoints.map(function (p) { return [p["geometry"]["coordinates"][1], p["geometry"]["coordinates"][0]]; });
// industrialPoints = industrialPoints.map(function (p) { return [p["geometry"]["coordinates"][1], p["geometry"]["coordinates"][0]]; });
// freshwaterPoints = freshwaterPoints.map(function (p) { return [p["geometry"]["coordinates"][1], p["geometry"]["coordinates"][0]]; });
// projectPoints = projectPoints.map(function (p) { return [p["geometry"]["coordinates"][1], p["geometry"]["coordinates"][0]]; });
stakeholderPoints = stakeholderPoints.map(function (p) { return [p["geometry"]["coordinates"][1], p["geometry"]["coordinates"][0]]; });
// harvestPoints = harvestPoints.map(function (p) { return [p["geometry"]["coordinates"][1], p["geometry"]["coordinates"][0]]; });

var legend_estuaries = '<i style="background: #6b8e3a; opacity: 0.5"></i><p><b>Estuaries</b></p>';
var legend_habs = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Harmful algal blooms</b></p>';
var legend_agricultural = '<i style="background: #6b8e3a; opacity: 0.5"></i><p><b>Agricultural land use</b></p>';
var legend_industrial = '<i style="background: #486081; opacity: 0.5"></i><p><b>Industrial land use</b></p>';
var legend_freshwater = '<i style="background: #685a40; opacity: 0.5"></i><p><b>Freshwater discharge</b></p>';
var legend_harvest_sites = '<i style="background: #00ff00; opacity: 0.5"></i><p><b>Harvest sites</b></p>';
var legend_stakeholders = '<i style="background: #ff00ff; opacity: 0.5"></i><p><b>Stakeholders</b></p>';
var legend_funded_projects = '<i style="background: #2c8b19; opacity: 0.5"></i><p><b>Funded projects</b></p>';
var legend_vulnerability_watersheds = '<i style="background: rgb(231,85,58); opacity: 0.5";></i><p><b>Watersheds (HUC8)</b></p><div class=\'info\'>\n' + '<div class=\'update\'><h2>Hover over a watershed</h2></div>\n' + '</div>';
var legend_amplifier_points_mr = '<i style="background: #ff7928; opacity: 0.5"></i><p><b></b></p>';
var legend_amplifier_points_wtn = '<i style="background: #ff7928; opacity: 0.5"></i><p><b>Reported amplifying factors</b></p>';
var legend_amplifier_points_n = '<i style="background: #ff7928; opacity: 0.5"></i><p><b>Reported amplifying factors</b></p>';
var legend_amplifier_points_hc = '<i style="background: #ff7928; opacity: 0.5"></i><p><b>Reported amplifying factors</b></p>';
var legend_amplifier_points_all = '<i style="background: #ff7928; opacity: 0.5"></i><p><b>Reported amplifying factors</b></p>';
// var legend_hab_points = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Harmful algal blooms</b></p>';
// var legend_cattle_points = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Cattle</b></p>';
// var legend_industrial_points = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Industrial land use</b></p>';
// var legend_freshwater_points = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Freshwater discharge</b></p>';
// var legend_project_points = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Funded projects</b></p>';
// var legend_harvest_points = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Harvest sites</b></p>';
var legend_stakeholder_points = '<i style="background: #ff003b; opacity: 0.5"></i><p><b>Stakeholders</b></p>';


var layers = {
    shellfish: {
        layer: L.tileLayer('https://api.mapbox.com/styles/v1/katzbr/cjshza9xf1db51fqgpriounjs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2F0emJyIiwiYSI6ImNqOHhmMnBucDIwZm4ycW8ya2d5cHF0cmsifQ.8rcjz0DyWs_ncWfOZ0VwKA')
    },
    satellite: {
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2F0emJyIiwiYSI6ImNqOHhmMnBucDIwZm4ycW8ya2d5cHF0cmsifQ.8rcjz0DyWs_ncWfOZ0VwKA', {
            id: 'mapbox.satellite'
        })
    },
    dark: {
        layer: L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2F0emJyIiwiYSI6ImNqOHhmMnBucDIwZm4ycW8ya2d5cHF0cmsifQ.8rcjz0DyWs_ncWfOZ0VwKA', {
            id: 'mapbox.dark'
        })
    },
    estuaries: {
        layer: L.geoJson.ajax('assets/estuaries.geojson', {
            color: 'white',
            weight: 2,
            opacity: 0.0,
            onEachFeature: onEachEstuary
        }), legend: legend_estuaries
    },
    stakeholder_points: {
        layer: L.heatLayer(stakeholderPoints, {
            minOpacity: 0.4,
            maxZoom: 18,
            radius: 25,
            blur: 15,
            max: 0.5
        }), legend: legend_stakeholder_points
    },
    amplifiers_mr: {
        layer: L.heatLayer(amplifierPoints_mr, {
            minOpacity: 0.4,
            maxZoom: 18,
            radius: 25,
            blur: 15,
            max: 0.5
        }), legend: legend_amplifier_points_mr
    },
    amplifiers_wtn: {
        layer: L.heatLayer(amplifierPoints_wtn, {
            minOpacity: 0.4,
            maxZoom: 18,
            radius: 25,
            blur: 15,
            max: 0.5
        }), legend: legend_amplifier_points_wtn
    },
    amplifiers_n: {
        layer: L.heatLayer(amplifierPoints_n, {
            minOpacity: 0.4,
            maxZoom: 18,
            radius: 25,
            blur: 15,
            max: 0.5
        }), legend: legend_amplifier_points_n
    },
    amplifiers_hc: {
        layer: L.heatLayer(amplifierPoints_hc, {
            minOpacity: 0.4,
            maxZoom: 18,
            radius: 25,
            blur: 15,
            max: 0.5
        }), legend: legend_amplifier_points_hc
    },
    amplifiers_all: {
        layer: L.heatLayer(amplifierPoints_all, {
            minOpacity: 0.4,
            maxZoom: 18,
            radius: 25,
            blur: 15,
            max: 0.5
        }), legend: legend_amplifier_points_all
    },
    // hab_points: {
    //     layer: L.geoJson.ajax('assets/habs.geojson', {
    //         pointToLayer: function (feature, latlng) {
    //             return L.heatLayer(habPoints, {
    //                 minOpacity: feature.properties.intensity / 5 + 0.15,
    //                 maxZoom: 18,
    //                 radius: feature.properties.frequency * 10 + 10,
    //                 blur: 15,
    //                 max: 0.5
    //             })
    //         }
    //     }), legend: legend_hab_points
    // },
    habs: {
        layer: L.geoJson.ajax('assets/habs.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: feature.properties.frequency * 10 + 10,
                    fillColor: "#ff003b",
                    color: "#000000",
                    weight: 5,
                    stroke: false,
                    opacity: 0.5,
                    fillOpacity: feature.properties.intensity / 5 + 0.15
                })
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip('Intensity: ' + feature.properties.intensity.toString() + '<br>Frequency: ' + feature.properties.frequency.toString(), {sticky: true, className: "feature-tooltip"});
            }
        }), legend: legend_habs
    },
    // cattle_points: {
    //     layer: L.geoJson.ajax('assets/agricultural_landuse.geojson', {
    //         pointToLayer: function (feature, latlng) {
    //             return L.heatLayer(cattlePoints, {
    //                 minOpacity: feature.properties.intensity / 5 + 0.15,
    //                 maxZoom: 18,
    //                 radius: feature.properties.frequency * 10 + 10,
    //                 blur: 15,
    //                 max: 0.5
    //             })
    //         }
    //     }), legend: legend_cattle_points
    // },
    agricultural: {
        layer: L.geoJson.ajax('assets/agricultural_landuse.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: feature.properties.frequency * 10 + 10,
                    fillColor: "#6b8e3a",
                    color: "#000000",
                    weight: 5,
                    stroke: false,
                    opacity: 0.5,
                    fillOpacity: feature.properties.intensity / 5 + 0.15
                })
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip('Intensity: ' + feature.properties.intensity.toString() + '<br>Frequency: ' + feature.properties.frequency.toString(), {sticky: true, className: "feature-tooltip"});
            }
        }), legend: legend_agricultural
    },
    // industrial_points: {
    //     layer: L.geoJson.ajax('assets/industrial_landuse.geojson', {
    //         pointToLayer: function (feature, latlng) {
    //             return L.heatLayer(industrialPoints, {
    //                 minOpacity: feature.properties.intensity / 5 + 0.15,
    //                 maxZoom: 18,
    //                 radius: feature.properties.frequency * 10 + 10,
    //                 blur: 15,
    //                 max: 0.5
    //             })
    //         }
    //     }), legend: legend_industrial_points
    // },
    industrial: {
        layer: L.geoJson.ajax('assets/industrial_landuse.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: feature.properties.frequency * 10 + 10,
                    fillColor: "#486081",
                    color: "#000000",
                    weight: 5,
                    stroke: false,
                    opacity: 0.5,
                    fillOpacity: feature.properties.intensity / 5 + 0.15
                })
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip('Intensity: ' + feature.properties.intensity.toString() + '<br>Frequency: ' + feature.properties.frequency.toString(), {sticky: true, className: "feature-tooltip"});
            }
        }), legend: legend_industrial
    },
    freshwater: {
        layer: L.geoJson.ajax('assets/freshwater_discharge.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: feature.properties.frequency * 10 + 10,
                    fillColor: "#685a40",
                    color: "#000000",
                    weight: 5,
                    stroke: false,
                    opacity: 0.5,
                    fillOpacity: feature.properties.intensity / 5 + 0.15
                })
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip('Intensity: ' + feature.properties.intensity.toString() + '<br>Frequency: ' + feature.properties.frequency.toString(), {sticky: true, className: "feature-tooltip"});
            }
        }), legend: legend_freshwater
    },
    harvest_sites: {
        layer: L.geoJson.ajax('assets/harvest_sites.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 20,
                    fillColor: "#00ff00",
                    color: "#000000",
                    weight: 1,
                    stroke: false,
                    opacity: 0.01,
                    fillOpacity: 0.04
                })
            }
        }), legend: legend_harvest_sites
    },
    stakeholders: {
        layer: L.geoJson.ajax('assets/stakeholders.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 20,
                    fillColor: "#ff00ff",
                    color: "#000000",
                    weight: 1,
                    stroke: false,
                    opacity: 0.01,
                    fillOpacity: 0.04
                })
            },
        }), legend: legend_stakeholders
    },
    funded_projects: {
        layer: L.geoJson.ajax('assets/funded_projects.geojson', {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 40,
                    fillColor: "#2c8b19",
                    color: "#000000",
                    weight: 5,
                    stroke: false,
                    opacity: 0.5,
                    fillOpacity: 0.5
                })
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.project, {sticky: true, className: "feature-tooltip"});
            }
        }), legend: legend_funded_projects
    },
    vulnerability_watersheds: {
        layer: L.geoJson.ajax("assets/vulnerability_watersheds.geojson", {
            style: vulnStyle,
            onEachFeature: onEachFeature
        }), legend: legend_vulnerability_watersheds
    }
};

var scenes = {
    landing: {lat: 45, lng: -121, zoom: 6, name: 'Landing'},
    vulnerability_intro: {lat: 44.75, lng: -121, zoom: 7, name: 'Combined', layers: [layers.vulnerability_watersheds, layers.shellfish]},
    exposure1: {lat: 40.81, lng: -124.115, zoom: 12, name: 'Mad-Redwood', layers: [layers.amplifiers_mr, layers.shellfish]},
    exposure2: {lat: 45.468348, lng: -123.85, zoom: 12, name: 'Wilson-Trask-Nestucca', layers: [layers.amplifiers_wtn, layers.shellfish]},
    exposure3: {lat: 48.77, lng: -122.46, zoom: 12, name: 'Nooksack', layers: [layers.amplifiers_n, layers.shellfish]},
    exposure4: {lat: 47.59, lng: -122.82, zoom: 11, name: 'Hood Canal', layers: [layers.amplifiers_hc, layers.shellfish]},
    vulnerability_combined: {lat: 44.75, lng: -121, zoom: 7, name: 'Combined', layers: [layers.amplifiers_all, layers.vulnerability_watersheds, layers.shellfish]},
    regional_assessment: {lat: 45, lng: -121, zoom: 6, name: 'Assessment'}
};

$('#storymap').storymap({
    scenes: scenes,
    baselayer: layers.shellfish,
    navbar: true,
    legend: true,
    credits: "",
    loader: true,
    scalebar: false,
    flyo: true,
    navwidget: true,

    createMap: function () {
        // Create a map in the "map" div, set the view to a given place and zoom
        var map = L.map($(".storymap-map")[0], {
            zoomControl: false, scrollWheelZoom: false, fadeAnimation: true,
            zoomAnimation: true
        }).setView([45, -121], 6);

        return map;
    }
});
