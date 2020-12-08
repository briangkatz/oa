# Scripts for data pre-processing and analysis

#### Author: Brian G. Katz | Appendix F in "Vulnerability and adaptation of Pacific Northwest shellfisheries" | Master's of Science Thesis in Geography | Oregon State University | 2020-12-08 | Supported by: NOAA Ocean Acidification Program | Advisor: David J. Wrathall

###### Note for running Python scripts using OSGeo4W / GDAL / QGIS libraries in PyCharm (IDE):

- You must first edit and run `pycharm-pyqgis.bat`, which sets the paths to your directories for OSGeo4W, GDAL, and QGIS, thus making PyCharm aware of these libraries when running scripts in the IDE.

### Table 1. Scripts for working with OA model time series data. (Estimated time to run to completion: 1 hr 23 min)

| Name                                   | Description                                                  | Order    | Usage                                                        |
| -------------------------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| `preprocessing/parse_netcdf.py`        | Converts directory of NetCDF files with multiple variables into two directories of: 1) 12-band GeoTIFF raster images at yearly scales; and 2) single-band GeoTIFF raster images at monthly scales, and for each individual variable. | 1        | Unpacking a NetCDF file into GeoTIFF files that can be further analyzed and processed for visualization. |
| `preprocessing/tif_to_xyz.py`          | Converts directory of single-band GeoTIFF raster images into ASCII Grid files and then XYZ files . | 2        | Outputs contain point coordinates and data values for each pixel and variable. |
| `preprocessing/merge_xyz_variables.py` | Converts directory of XYZ files for each month into a directory of text files containing monthly time series for all variables in the original NetCDF files. | 3        | Outputs are text files which can be loaded into QGIS as tab-delimited files. |
| `preprocessing/merge_xyz_years.py`     | Converts directory of text files for each monthly time series into a directory of text files for yearly time series. | 4        | Outputs are text files summarized by year.                   |
| `preprocessing/merge_txt_years.py`     | Converts directory of text files for each year into one text file containing time series for all variables in the original NetCDF files. | 5        | Output is one time series for all variables between 1995-2050. |
| `preprocessing/filter_time_series.py`  | Converts one text file containing time series for all variables in the original NetCDF files into separate text files for each variable's time series. | 6        | Outputs are time series for each variable.                   |
| `preprocessing/create_geojson.py`      | Converts directory of text files for time series of each variable into a GeoJSON file representing OA hotspot locations where omega_arag <= 1.4. Other variables passed over because no threshold defined. Only processed omega_arag. Summarized attributes for months/yr below omega_arag threshold, mean omega_arag of hotspots/yr, and 30-year mean omega_arag values at the beginning (1995-2025) and end (2020-2050) of the time series. | 7        | Output is a GeoJSON spatial data layer for omega_arag time series between 1995-2050 at yearly intervals, containing summarized attributes. |
| `analysis/oa_climate.py`               | Calculates OA climate metrics from directory of 12-band GeoTIFF raster images with single variables, saving outputs as three single-band GeoTIFF raster images representing: 1) 30-year mean omega_arag between 1995-2025; 2) 30-year mean omega_arag between 2020-2050; and 3) change in 30-year mean omega_arag between 1995-2050. | Optional | Output raster data can be used to calculate zonal statistics (i.e. mean values) of pixels within polygons in QGIS. |

### Table 2. Scripts for working with shellfish shipper and Indigenous tribe data.

| Name                                         | Description                                                  | Order | Usage                                                        |
| -------------------------------------------- | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| `preprocessing/parse_pdf_table.py`           | Parses data in PDFs on state-certified shellfish shippers in WA, OR, and CA into CSV files. | 1     | Outputs will be combined later.                              |
| `preprocessing/parse_html_table.py`          | Parses data on interstate shellfish shippers for each state in a list of states. | 2     | Output will be combined with previous outputs.               |
| `preprocessing/combined_harvest_geojson.py`  | Combines CSV files for certified in-state shellfish shippers in WA, OR, and CA, as well as certified interstate shellfish shippers in WA, OR, and CA. Code also includes commented out sections for geolocation of place names, as well as some typo corrections. | 3     | Output is a combined GeoJSON spatial data layer for all in-state and interstate shellfish shippers in WA, OR, and CA. |
| `preprocessing/wa_grower_summary_DOH.py`     | Analyzes harvest site data from Washington State Department of Health to produce a summary CSV file with calculated mean acreage per firm. |       |                                                              |
| `analysis/z-score.py`                        | Adds new fields and calculates z-scores for each existing numerical field. |       |                                                              |
| `preprocessing/retrieve_images.py`           | Performs a Google search on a list of terms to retrieve a list of image URLs for each search term(s). |       |                                                              |
| `preprocessing/create_json_photo_markers.py` | Formats data from a CSV file with image URLs and locations of photos into a JSON file to be used by Leaflet.js to create photo clusters. |       |                                                              |
|                                              |                                                              |       |                                                              |

### Table 3. Scripts for working with study area extent data.

| Name                  | Description                                                  | Order | Usage |
| --------------------- | ------------------------------------------------------------ | ----- | ----- |
| dissolve_shapefile.py | Dissolves a shapefile with multiple polygons into one polygon, which can be used to clip other geospatial data layers by the study area extent. |       |       |



