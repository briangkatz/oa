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
    vulnerability_intro: {lat: 44.75, lng: -121, zoom: 7, name: 'Site Selection', layers: [layers.vulnerability_watersheds, layers.shellfish]},
    exposure1: {lat: 40.81, lng: -124.115, zoom: 12, name: 'Mad-Redwood', layers: [layers.amplifiers_mr, layers.shellfish]},
    exposure2: {lat: 45.468348, lng: -123.85, zoom: 12, name: 'Wilson-Trask-Nestucca', layers: [layers.amplifiers_wtn, layers.shellfish]},
    exposure3: {lat: 48.77, lng: -122.46, zoom: 12, name: 'Nooksack', layers: [layers.amplifiers_n, layers.shellfish]},
    exposure4: {lat: 47.59, lng: -122.82, zoom: 11, name: 'Hood Canal', layers: [layers.amplifiers_hc, layers.shellfish]},
    tide: {lat: 48.62, lng: -122.46, zoom: 13, name: 'Tide Slider', layers: [layers.shellfish]},
    species: {lat: 48.62, lng: -122.46, zoom: 13, name: 'Species Responses', layers: [layers.shellfish]},
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

var map_tide_slider = L.map('tide-slider', {
    zoomControl: false,
    maxZoom: 13,
    minZoom: 12,
    maxBounds: [
        [48.54, -122.555],  // SW corner
        [48.68, -122.3678]  // NE corner
    ]
}).setView([48.62, -122.455], 12);

var lowTide = L.tileLayer('assets/low/{z}/{x}/{y}.png', {
    maxZoom: 13,
    tms: false,
    attribution: 'Generated by QTiles'
}).addTo(map_tide_slider);

var highTide = L.tileLayer('assets/high/{z}/{x}/{y}.png', {
    maxZoom: 13,
    tms: false,
    attribution: 'Generated by QTiles'
}).addTo(map_tide_slider);

L.control.sideBySide(lowTide, highTide).addTo(map_tide_slider);

d3.csv("assets/species.csv").then(d => chart(d))

function chart(data) {

	var keys = data.columns.slice(1);

	var parseTime = d3.timeParse("%Y%m%d"),
		formatDate = d3.timeFormat("%Y-%m-%d"),
		bisectDate = d3.bisector(d => d.omega_arag).left,
		formatValue = d3.format(",.0f"),
		formatFloat = d3.format(".1f");

	data.forEach(function(d) {
		d.date = parseTime(d.date);
		d.omega_arag = formatFloat(d.omega_arag);
		return d;
	})

	var svg = d3.select("#species-response-chart"),
		margin = {top: 15, right: 35, bottom: 15, left: 35},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleLinear()
		.rangeRound([margin.left, width - margin.right])
		.domain(d3.extent(data, d => d.omega_arag))

	var y = d3.scaleLinear()
		.rangeRound([height - margin.bottom, margin.top]);

	var z = d3.scaleOrdinal(d3.schemeCategory10);

	var line = d3.line()
		.curve(d3.curveCardinal)
		.x(d => x(d.omega_arag))
		.y(d => y(d.response));

	svg.append("g")
		.attr("class","x-axis")
		.attr("transform", "translate(0," + (height - margin.bottom) + ")")
		.call(d3.axisBottom(x).tickFormat(d3.format(".1f")));

	svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .text("Aragonite saturation state");

	svg.append("g")
		.attr("class", "y-axis")
		.attr("transform", "translate(" + margin.left + ",0)");

	svg.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", -2)
		  .attr("x", 0 - (height / 2))
		  .attr("dy", "1em")
		  .style("text-anchor", "middle")
		  .text("Growth response (% change from pre-industrial")

	var focus = svg.append("g")
		.attr("class", "focus")
		.style("display", "none");

	focus.append("line").attr("class", "lineHover")
		.style("stroke", "#999")
		.attr("stroke-width", 1)
		.style("shape-rendering", "crispEdges")
		.style("opacity", 0.5)
		.attr("y1", -height)
		.attr("y2",0);

	focus.append("text").attr("class", "lineHoverDate")
		.attr("text-anchor", "middle")
		.attr("font-size", 12);

	var overlay = svg.append("rect")
		.attr("class", "overlay")
		.attr("x", margin.left)
		.attr("width", width - margin.right - margin.left)
		.attr("height", height)

	update(d3.select('#selectbox').property('value'), 0);

	function update(input, speed) {

		var copy = keys.filter(f => f.includes(input))

		var species_all = copy.map(function(id) {
			return {
				id: id,
				values: data.map(d => {return {omega_arag: d.omega_arag, response: +d[id]}})
			};
		});

		y.domain([
			d3.min(species_all, d => d3.min(d.values, c => c.response)),
			d3.max(species_all, d => d3.max(d.values, c => c.response))
		]).nice();

		svg.selectAll(".y-axis").transition()
			.duration(speed)
			.call(d3.axisLeft(y).tickSize(-width + margin.right + margin.left))

		var species = svg.selectAll(".species_all")
			.data(species_all);

		species.exit().remove();

		species.enter().insert("g", ".focus").append("path")
			.attr("class", "line species_all")
			.style("stroke", d => z(d.id))
			.merge(species)
		.transition().duration(speed)
			.attr("d", d => line(d.values))

		tooltip(copy);
	}

	function tooltip(copy) {

		var labels = focus.selectAll(".lineHoverText")
			.data(copy)

		labels.enter().append("text")
			.attr("class", "lineHoverText")
			.style("fill", d => z(d))
			.attr("text-anchor", "start")
			.attr("font-size",12)
			.attr("dy", (_, i) => 1 + i * 2 + "em")
			.merge(labels);

		var circles = focus.selectAll(".hoverCircle")
			.data(copy)

		circles.enter().append("circle")
			.attr("class", "hoverCircle")
			.style("fill", d => z(d))
			.attr("r", 2.5)
			.merge(circles);

		svg.selectAll(".overlay")
			.on("mouseover", function() { focus.style("display", null); })
			.on("mouseout", function() { focus.style("display", "none"); })
			.on("mousemove", mousemove);

		function mousemove() {

			var x0 = x.invert(d3.mouse(this)[0]),
				i = bisectDate(data, x0, 1),
				d0 = data[i - 1],
				d1 = data[i],
				d = x0 - d0.omega_arag > d1.omega_arag - x0 ? d1 : d0;

			focus.select(".lineHover")
				.attr("transform", "translate(" + x(d.omega_arag) + "," + height + ")");

			focus.select(".lineHoverDate")
				.attr("transform",
					"translate(" + x(d.omega_arag) + "," + (height + margin.bottom) + ")")
				.text(d.omega_arag);

			focus.selectAll(".hoverCircle")
				.attr("cy", e => y(d[e]))
				.attr("cx", x(d.omega_arag));

			focus.selectAll(".lineHoverText")
				.attr("transform",
					"translate(" + (x(d.omega_arag)) + "," + height / 2.5 + ")")
				.text(e => e.split("_")[1] + ": " + formatValue(d[e]) + "%");

			x(d.omega_arag) > (width - width / 4)
				? focus.selectAll("text.lineHoverText")
					.attr("text-anchor", "end")
					.attr("dx", -10)
				: focus.selectAll("text.lineHoverText")
					.attr("text-anchor", "start")
					.attr("dx", 10)
		}
	}

	var selectbox = d3.select("#selectbox")
		.on("change", function() {
			update(this.value, 750);
		})
}

function adjustWidth() {
    var parentwidth = $(".chart_container").width();
    $("#species-response-chart").width(parentwidth - 20);
}

$(window).resize(
    function() {
        adjustWidth();
 })