$("[role='tab']").click(function(e) {
   e.preventDefault();
   $(this).attr("aria-selected", "true");
   $(this).parent().siblings().children().attr("aria-selected", "false");
   var tabpanelShow = $(this).attr("href");
   $(tabpanelShow).attr("aria-hidden", "false");
   $(tabpanelShow).siblings().attr("aria-hidden", "true");
});

/*************************Accordian Controls Start*******************************/
    
    
    $(document).ready(function(){
      $(".accordion-panel").hide(); 
      $(".accordion").click(function(){ 
        $(this).parent().find(".fa-angle-double-down").toggleClass("up");
        $(this).parent().find(".fa-angle-double-right").toggleClass("up");  
        $(this).parent().find(".accordion-panel").slideToggle("slow");
        $(this).parent().find(".accordion h4").toggleClass("pressed");   
        //panelCheck();
      });


      /*function panelCheck(){
        if ($('.fa-angle-double-down').hasClass("up") == false) {
          $(".control").text("Collapse All");
        }else{
          $(".control").text("Hide All");
        }
      }*/

    });    
    
/*************************Accordian Controls End*******************************/

const options = {
  dojoConfig: {
    async: true,
    packages: [
      {
        location:
          "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js",
        name: "Chart",
      },
    ],
  },
};


require(["esri/layers/WebTileLayer",
               "esri/Map", 
               "esri/views/MapView", 
               "esri/layers/FeatureLayer",
               "esri/Basemap",
               "esri/widgets/Feature",
               "esri/widgets/Home",
               "esri/widgets/Legend",
               "esri/widgets/Search",
               "esri/widgets/Popup",
               "esri/core/watchUtils",
               "esri/layers/VectorTileLayer",
               "esri/popup/FieldInfo",
               "esri/layers/WebTileLayer",    
               "esri/widgets/Slider",
               "esri/core/promiseUtils",
               "esri/widgets/HistogramRangeSlider",
               "esri/renderers/smartMapping/statistics/histogram",
               "esri/geometry/Extent",
               "esri/symbols/SimpleMarkerSymbol",
               "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js",
               "dojo/domReady!",
                ], function(WebTileLayer, Map, MapView, FeatureLayer, Basemap, Feature, Home, Legend, Search, Popup, watchUtils, VectorTileLayer, FieldInfo, WebTileLayer, Slider, promiseUtils, HistogramRangeSlider, histogram, Extent, SimpleMarkerSymbol, Chart) {     
    
        //****************Set Baselayer and MapView*********************//
    
        /*var basemap = new Basemap({
            baseLayers: [
              new VectorTileLayer({
                portalItem: {
                  id: "4f4843d99c34436f82920932317893ae" // Newspaper basemap
                }
              })
            ]
          });*/
          
        var map = new Map({
            //basemap: basemap, // Add Newspaper basemap as basemap
        });

        var view = new MapView({
            container: "viewDiv",
            map: map, 
            zoom: 11,
            center: [-90.248986, 38.634975],
            popup: {
              collapseEnabled: false,
              featureNavigationEnabled: true,
              dockEnabled: true,
              dockOptions: {
                  buttonEnabled: false,
                  breakpoint: false
              } 
          }
        });
    
        var cartoBasemap = new WebTileLayer({
          urlTemplate: 'http://{subDomain}.basemaps.cartocdn.com/light_all/{level}/{col}/{row}.png',
          subDomains: ["a","b","c"],
          copyright: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
          visible: true
        });
    
        view.popup.viewModel.actions = false;

//**********************Begin Arcade Expression**************//
    
var arcadeExpressionInfos = [
          {
            name: "HAAN_Text",
            title: "HAAN Text",
            expression: "WHEN($feature.hiafam7010 > 3, 'Historically African American census tract as determined by the presence of a majority African American population in four out of the last five decennial censuses irrespective of historic designation.', $feature.hiafam7010 < 4, '', '')"
          },    
          {
            name: "Tract_Trim",
            title: "Tract Trim",
            expression: "var array = split($feature.name_e, ',') return array[0]"
          },
          {
            name: "HTC_Proj_Name",
            title: "HTC Project Name",
            expression: "IIF($feature.proj_name == ' ', 'Project Name Unavailable', $feature.proj_name)"
          },
          {
            name: "HTC_Proj_Type",
            title: "HTC Project Type",
            expression: "WHEN($feature.projuse3 == 'Housing', 'Single-Family Housing', $feature.projuse3 == 'Housing (2)', 'Multi-Family Housing (2)', $feature.projuse3 == 'Housing (3)', 'Multi-Family Housing (3)', $feature.projuse3 == 'Multi-Use', 'Multi-Use ('+$feature.multi_desc+')', $feature.projuse3)"
          },    
          {
            name: "HOLC_Change",
            title: "HOLC Change Grade",
            expression: "WHEN($feature.holc_grade == 'A', '\"Best\" (Grade A)', $feature.holc_grade == 'B', '\"Still Desirable\" (Grade B)', $feature.holc_grade == 'C', '\"Definitely Declining\" (Grade C)', $feature.holc_grade == 'D', '\"Hazardous\" (Grade D)', '')"
          } 
        ];
  
/////////////////Add Population Census Tract Data//////////////////////////
        
        const pop1 = {
          type: "simple-fill",
          color: "#492900",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const pop2 = {
          type: "simple-fill",
          color: "#987100",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const pop3 = {
          type: "simple-fill",
          color: "#f5c236",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const pop4 = {
          type: "simple-fill",
          color: "#f5f5f5",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const pop5 = {
          type: "simple-fill",
          color: "#8fceff",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const pop6 = {
          type: "simple-fill",
          color: "#307cb4",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const pop7 = {
          type: "simple-fill",
          color: "#003464",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };


        const popTractRenderer = {
          type: "class-breaks", 
          field: "pcttot0916",
          //normalizationField: "",
          legendOptions: {
            title: "Change in Total Population 2009 - 2016"
          },
          classBreakInfos: [
            {
              minValue: -0.6051,
              maxValue: -0.3275,
              symbol: pop1,
              label: "Population Decrease"
            },
            {
              minValue: -0.3275,
              maxValue: -0.2099,
              symbol: pop2,
              label: " "
            },
            {
              minValue: -0.2099,
              maxValue: -0.0250,
              symbol: pop3,
              label: " "
            },
            {
              minValue: -0.0250,
              maxValue: 0.0250,
              symbol: pop4,
              label: " "
            },
            {
              minValue: 0.0250,
              maxValue: 0.2426,
              symbol: pop5,
              label: " "
            },
            {
              minValue: 0.2426,
              maxValue: 0.5841,
              symbol: pop6,
              label: " "
            },
            {
              minValue: 0.5841,
              maxValue: 0.9544,
              symbol: pop7,
              label: "Population Increase"
            }
          ]
        };
        
        var popTracts = new FeatureLayer({
          url:"https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/aachaf_stlouis_tract10_select/FeatureServer",
          maxScale: 0,
          minScale: 0,   
          renderer: popTractRenderer,   
          opacity: .4,
          title: "{name_e}",    
          //outFields: ["*"],
          //title: " ",    
          popupEnabled: true,
          visible: true,
          popupTemplate: {
            outFields: ["*"],
              //title: "{name_e}",
              content: function (feature) {
                return setContentInfo(feature.graphic.attributes);
              },    
          },
        });

    function setContentInfo(results) {
        
        var upArrow = "<img class='upArrow' alt=''src='img/icons/UpArrow.png'/>";
        var downArrow = "<img class='downArrow' alt=''src='img/icons/DownArrow.png'/>";
        var noArrow = "";
        
        var haanText = results.hiafam7010 > 3 ? 'Historically African American census tract as determined by the presence of a majority African American population in four out of the last five decennial censuses irrespective of historic designation.': '';
        
        var str = results.name_e;
        var tractTrunc = str.substr(0, str.lastIndexOf(","));
        
        var totPop09 = results.pop_tot09.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var totPop16 = results.pop_tot16.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var blkPop09 = results.pop_blk09.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var blkPop16 = results.pop_blk16.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var whtPop09 = results.pop_wht09.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var whtPop16 = results.pop_wht16.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var asnPop09 = results.pop_asn09.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var asnPop16 = results.pop_asn16.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var ltnPop09 = results.pop_ltn09.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var ltnPop16 = results.pop_ltn16.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var nltnPop09 = results.pop_nltn09.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        var nltnPop16 = results.pop_nltn16.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        
        
        var totPopPlus = results.pcttot0916 > 0 ? '+' : '';
        var totPopChngCalc = ((results.pop_tot16 - results.pop_tot09) / results.pop_tot09) * 100
        var totPopChngCalcForm = totPopChngCalc.toFixed(2);
        var totPopChngArrow = (
            results.pcttot0916 > 0 ? upArrow :
            results.pcttot0916 === 0 ? noArrow :
            results.pcttot0916 < 0 ? downArrow :
            ''
        );
        
        var aaPopPlus = (
            (results.pop_blk16 >= 0 && results.pop_blk16 <= 0.9 || results.pop_blk09 >= 0 && results.pop_blk09 <= 0.9 ) ? '' :
            results.pctblk0916 > 0 ? '+' :
            ''
        );
        var aaPopChngCalc = (
            (results.pop_blk16 >= 0 && results.pop_blk16 <= 0.9 || results.pop_blk09 >= 0 && results.pop_blk09 <= 0.9 ) ? '' : ((results.pop_blk16 - results.pop_blk09) / results.pop_blk09) * 100
        );
        
        var aaPopChngCalcForm = ( 
            aaPopChngCalc > 0 ? aaPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            aaPopChngCalc < 0 ? aaPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            (results.pop_blk16 >= 0 && results.pop_blk16 <= 0.9 || results.pop_blk09 >= 0 && results.pop_blk09 <= 0.9 ) ? 'N/A' :
            ''
        );
        var aaPercChngSign = (
            (results.pop_blk16 >= 0 && results.pop_blk16 <= 0.9 || results.pop_blk09 >= 0 && results.pop_blk09 <= 0.9) ? '' : '%'     
        );
        
        var aaPopChngArrow = (
            (results.pop_blk16 >= 0 && results.pop_blk16 <= 0.9 || results.pop_blk09 >= 0 && results.pop_blk09 <= 0.9) ? noArrow :
            (((results.pop_blk16 - results.pop_blk09) / results.pop_blk09) * 100) > 0 ? upArrow :
            (((results.pop_blk16 - results.pop_blk09) / results.pop_blk09) * 100) < 0 ? downArrow :
            ''
        );

        var whtPopPlus = (
            (results.pop_wht16 >= 0 && results.pop_wht16 <= 0.9 || results.pop_wht09 >= 0 && results.pop_wht09 <= 0.9 ) ? '' :
            results.pctwht0916 > 0 ? '+' :
            ''
        );
        var whtPopChngCalc = (
            (results.pop_wht16 >= 0 && results.pop_wht16 <= 0.9 || results.pop_wht09 >= 0 && results.pop_wht09 <= 0.9 ) ? '' : ((results.pop_wht16 - results.pop_wht09) / results.pop_wht09) * 100
        );
        
        var whtPopChngCalcForm = ( 
            whtPopChngCalc > 0 ? whtPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            whtPopChngCalc < 0 ? whtPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            (results.pop_wht16 >= 0 && results.pop_wht16 <= 0.9 || results.pop_wht09 >= 0 && results.pop_wht09 <= 0.9 ) ? 'N/A' :
            ''
        );
        var whtPercChngSign = (
            (results.pop_wht16 >= 0 && results.pop_wht16 <= 0.9 || results.pop_wht09 >= 0 && results.pop_wht09 <= 0.9) ? '' : '%'     
        );
        
        var whtPopChngArrow = (
            (results.pop_wht16 >= 0 && results.pop_wht16 <= 0.9 || results.pop_wht09 >= 0 && results.pop_wht09 <= 0.9 ) ? noArrow :
            (((results.pop_wht16 - results.pop_wht09) / results.pop_wht09) * 100) > 0 ? upArrow :
            (((results.pop_wht16 - results.pop_wht09) / results.pop_wht09) * 100) < 0 ? downArrow :
            ''
        );
        
        var asnPopPlus = (
            (results.pop_asn16 >= 0 && results.pop_asn16 <= 0.9 || results.pop_asn09 >= 0 && results.pop_asn09 <= 0.9 ) ? '' :
            results.pctasn0916 > 0 ? '+' :
            ''
        );
        var asnPopChngCalc = (
            (results.pop_asn16 >= 0 && results.pop_asn16 <= 0.9 || results.pop_asn09 >= 0 && results.pop_asn09 <= 0.9 ) ? '' : ((results.pop_asn16 - results.pop_asn09) / results.pop_asn09) * 100
        );
        
        var asnPopChngCalcForm = ( 
            asnPopChngCalc > 0 ? asnPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            asnPopChngCalc < 0 ? asnPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            (results.pop_asn16 >= 0 && results.pop_asn16 <= 0.9 || results.pop_asn09 >= 0 && results.pop_asn09 <= 0.9 ) ? 'N/A' :
            ''
        );
        var asnPercChngSign = (
            (results.pop_asn16 >= 0 && results.pop_asn16 <= 0.9 || results.pop_asn09 >= 0 && results.pop_asn09 <= 0.9) ? '' : '%'     
        );
        
        var asnPopChngArrow = (
            (results.pop_asn16 >= 0 && results.pop_asn16 <= 0.9 || results.pop_asn09 >= 0 && results.pop_asn09 <= 0.9) ? noArrow :
            (((results.pop_asn16 - results.pop_asn09) / results.pop_asn09) * 100) > 0 ? upArrow :
            (((results.pop_asn16 - results.pop_asn09) / results.pop_asn09) * 100) < 0 ? downArrow :
            ''
        );
        
        var ltnPopPlus = (
            (results.pop_ltn16 >= 0 && results.pop_ltn16 <= 0.9 || results.pop_ltn09 >= 0 && results.pop_ltn09 <= 0.9 ) ? '' :
            results.pctltn0916 > 0 ? '+' :
            ''
        );
        var ltnPopChngCalc = (
            (results.pop_ltn16 >= 0 && results.pop_ltn16 <= 0.9 || results.pop_ltn09 >= 0 && results.pop_ltn09 <= 0.9 ) ? '' : ((results.pop_ltn16 - results.pop_ltn09) / results.pop_ltn09) * 100
        );
        
        var ltnPopChngCalcForm = ( 
            ltnPopChngCalc > 0 ? ltnPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            ltnPopChngCalc < 0 ? ltnPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            (results.pop_ltn16 >= 0 && results.pop_ltn16 <= 0.9 || results.pop_ltn09 >= 0 && results.pop_ltn09 <= 0.9 ) ? 'N/A' :
            ''
        );
        var ltnPercChngSign = (
            (results.pop_ltn16 >= 0 && results.pop_ltn16 <= 0.9 || results.pop_ltn09 >= 0 && results.pop_ltn09 <= 0.9) ? '' : '%'     
        );
        
        var ltnPopChngArrow = (
            (results.pop_ltn16 >= 0 && results.pop_ltn16 <= 0.9 || results.pop_ltn09 >= 0 && results.pop_ltn09 <= 0.9 ) ? noArrow :
            (((results.pop_ltn16 - results.pop_ltn09) / results.pop_ltn09) * 100) > 0 ? upArrow :
            (((results.pop_ltn16 - results.pop_ltn09) / results.pop_ltn09) * 100) < 0 ? downArrow :
            ''
        );
        
        var nltnPopPlus = (
            (results.pop_nltn16 >= 0 && results.pop_nltn16 <= 0.9 || results.pop_nltn09 >= 0 && results.pop_nltn09 <= 0.9 ) ? '' :
            results.pctnlt0916 > 0 ? '+' :
            ''
        );
        var nltnPopChngCalc = (
            (results.pop_nltn16 >= 0 && results.pop_nltn16 <= 0.9 || results.pop_nltn09 >= 0 && results.pop_nltn09 <= 0.9 ) ? '' : ((results.pop_nltn16 - results.pop_nltn09) / results.pop_nltn09) * 100
        );
        
        var nltnPopChngCalcForm = ( 
            nltnPopChngCalc > 0 ? nltnPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            nltnPopChngCalc < 0 ? nltnPopChngCalc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) :
            (results.pop_nltn16 >= 0 && results.pop_nltn16 <= 0.9 || results.pop_nltn09 >= 0 && results.pop_nltn09 <= 0.9 ) ? 'N/A' :
            ''
        );
        var nltnPercChngSign = (
            (results.pop_nltn16 >= 0 && results.pop_nltn16 <= 0.9 || results.pop_nltn09 >= 0 && results.pop_nltn09 <= 0.9) ? '' : '%'     
        );
        
        var nltnPopChngArrow = (
            (results.pop_nltn16 >= 0 && results.pop_nltn16 <= 0.9 || results.pop_nltn09 >= 0 && results.pop_nltn09 <= 0.9 ) ? noArrow :
            (((results.pop_nltn16 - results.pop_nltn09) / results.pop_nltn09) * 100) > 0 ? upArrow :
            (((results.pop_nltn16 - results.pop_nltn09) / results.pop_nltn09) * 100) < 0 ? downArrow :
            ''
        );

        var popupElement = document.createElement("div");
        //popupElement.className = "testClass";
        popupElement.innerHTML =
          "<div style='padding-right: 5px;'><table style='border:2px solid #f0ece5; border-collapse:collapse; width:100%;'><tbody><tr><td style='padding-left:4px; padding-right:4px; padding-bottom:4px; padding-top:1px;'><table style='width:100%'><tbody><tr style='border:0px solid'><td class='censHeader'>St. Louis Census Tract</td></tr></tbody></table>"+"<table style='width:100%;'><tbody><tr><td class='haanText'>" + haanText + "</td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%;'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' style='padding:2px'><h5>" + tractTrunc + "</h5></td></tr></tbody></table>"+"<table style='width:100%'><tbody><tr style='border:0px solid'><td class='censSubHeader'>Demographic Changes 2009 - 2016</td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Total Population</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:1px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + totPop09 + "</h5></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='33%'><h5>" + totPop16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + totPopPlus + totPopChngCalcForm + "% " + " " + totPopChngArrow + "</h5></td></tr></tbody></table>"+"<br>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>African American Population</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + blkPop09 + "</font></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='33%'><h5>" + blkPop16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + aaPopPlus + aaPopChngCalcForm + aaPercChngSign + " " + aaPopChngArrow + "</h5></td></tr></tbody><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>White Population</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + whtPop09 + "</h5></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='33%'><h5>" + whtPop16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + whtPopPlus + whtPopChngCalcForm + whtPercChngSign + " " + whtPopChngArrow + "</h5></td></tr></tbody><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Asian Population</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + asnPop09 + "</h5></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='33%'><h5>" + asnPop16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + asnPopPlus + asnPopChngCalcForm + asnPercChngSign + " " + asnPopChngArrow + "</h5></td></tr></tbody><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Latino Population</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + ltnPop09 + "</h5></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='33%'><h5>" + ltnPop16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + ltnPopPlus + ltnPopChngCalcForm + ltnPercChngSign + " " + ltnPopChngArrow + "</h5></td></tr></tbody></table>" + "<br><table style='width:100%'><tbody><tr style='border:0px solid'><td class='censSubHeader' align='center' style='padding-bottom:3px'>Graphing Demographic Change</td></tr></tbody></table>"+"<table style='border:0px solid; border-collapse:collapse; width:100%;'><tbody><tr style='border:0px solid'><td align='center' style='padding:2px'><h5>" + tractTrunc + "</h5></td></tr></tbody></table>"+"<div class='chartDiv'></div></div>";
        
        var canvas = document.createElement("canvas");

            var data = {
              labels: [
                'Black',
                'White',
                'Asian',
                'Latino'   
              ],        
              datasets:[
                {
                    label: "2009",
                    data: [results.pop_blk09, results.pop_wht09, results.pop_asn09, results.pop_ltn09],
                    //stack: "Stack 0",    
                    backgroundColor: ["rgba(35,31,32,0.8)", "rgba(35,31,32,0.8)", "rgba(35,31,32,0.8)", "rgba(35,31,32,0.8)"],
                    borderColor: "#404040",
                    borderWidth: .5,
                    hoverBorderWidth: 1
                },
                {
                    label: "2016",
                    data: [results.pop_blk16, results.pop_wht16, results.pop_asn16, results.pop_ltn16],
                    //stack: "Stack 0",    
                    backgroundColor: ["rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)"],
                    borderColor: "#404040",
                    borderWidth: .5,
                    hoverBorderWidth: 1
                }

              ],
              };

              var options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: "top",
                        onHover: function(e) {
                            e.target.style.cursor = 'pointer';
                        }
                    },
                    scales: {
                        xAxes: [{
                            //stacked: true
                            ticks: {
                                fontSize: 12,
                                fontColor: "#000"
                            }
                        }],
                        yAxes: [{
                            //stacked: true,
                            ticks: {
                                beginAtZero: true,
                                fontSize: 10,
                                fontColor: "#000"
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {                      
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        backgroundColor: 'rgba(255,255,255, 0.8)',
                        titleFontFamily: "'Montserrat'",
                        bodyFontFamily: "'Montserrat'",
                        titleFontColor: "#000",
                        bodyFontColor: "#000"
                    },
                    hover: {
                            onHover: function(e) {
                                var point = this.getElementAtEvent(e);
                                if (point.length) e.target.style.cursor = 'pointer';
                                else e.target.style.cursor = 'default';
                            }
                    }
            };
        
            Chart.Legend.prototype.afterFit = function() {
                this.height = this.height + 10;
            };

            Chart.defaults.global.defaultFontFamily="'Montserrat'";
            var mybarChart = new Chart(canvas, {
              type: "bar",
              data: data,
              options: options,   
            });

            popupElement.querySelector(".chartDiv").appendChild(canvas);

            return popupElement;
        }
    
        /////////////////Add Housing Census Tract Data//////////////////////////
    
        const house1 = {
          type: "simple-fill",
          color: "#003753",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const house2 = {
          type: "simple-fill",
          color: "#1781a1",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const house3 = {
          type: "simple-fill",
          color: "#7fd4f7",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const house4 = {
          type: "simple-fill",
          color: "#f5f5f5",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const house5 = {
          type: "simple-fill",
          color: "#ff9d63",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const house6 = {
          type: "simple-fill",
          color: "#d24915",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const house7 = {
          type: "simple-fill",
          color: "#730000",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const houseTractRenderer = {
          type: "class-breaks", 
          field: "tothseperc",
          //normalizationField: "",
          legendOptions: {
            title: "Change in Number of Housing Units 2009 - 2016"
          },
          classBreakInfos: [
            {
              minValue: -33.515,
              maxValue: -33.514,
              symbol: house1,
              label: "Housing Unit Decrease"
            },
            {
              minValue: -33.514,
              maxValue: -13.541,
              symbol: house2,
              label: " "
            },
            {
              minValue: -13.541,
              maxValue: -0.250,
              symbol: house3,
              label: " "
            },
            {
              minValue: -0.250,
              maxValue: 0.250,
              symbol: house4,
              label: " "
            },
            {
              minValue: 0.250,
              maxValue: 14.561,
              symbol: house5,
              label: " "
            },
            {
              minValue: 14.561,
              maxValue: 48.601,
              symbol: house6,
              label: " "
            },
            {
              minValue: 48.601,
              maxValue: 102.507,
              symbol: house7,
              label: "Housing Unit Increase"
            }
          ]
        };
        
        var housingTracts = new FeatureLayer({
          url:"https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/aachaf_stlouis_tract10_select/FeatureServer",
          renderer: houseTractRenderer,
          maxScale: 0,
          minScale: 0,   
          opacity: .4,      
          outFields: ["name_e", "medval16", "medval09_a", "pctmvl0916", "mgrsrnt16", "mgrsrnt09_", "pctmrt0916", "hu_rnt16", "hu_rnt09", "tothuown09", "tothuown16", "hu_tot16", "hu_tot09", "tothseperc"],
          title: " ",    
          popupEnabled: true,
          visible: false,
          popupTemplate: {
                outFields: ["*"],
                  //title: "{name_e}",
                  content: function (feature) {
                    return setContentInfoHous(feature.graphic.attributes);
                  },    
              },
            });
    
          function setContentInfoHous(results) {

            var upArrow = "<img class='upArrow' alt=''src='img/icons/UpArrow.png'/>";
            var downArrow = "<img class='downArrow' alt=''src='img/icons/DownArrow.png'/>";
            var noArrow = "";

            var haanText = results.hiafam7010 > 3 ? 'Historically African American census tract as determined by the presence of a majority African American population in four out of the last five decennial censuses irrespective of historic designation.': '';

            var str = results.name_e;
            var tractTrunc = str.substr(0, str.lastIndexOf(","));
            
            var hutot09 = results.hu_tot09.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var hutot16 = results.hu_tot16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var hurnt09 = results.hu_rnt09.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var hurnt16 = results.hu_rnt16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var tothuown09 = results.tothuown09.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var tothuown16 = results.tothuown16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var mgrsrnt09 = results.mgrsrnt09_.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var mgrsrnt16 = results.mgrsrnt16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var medval09 = results.medval09_a.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var medval16 = results.medval16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            
            var huTotPlus = (
                (results.hu_tot16 == 0 || results.hu_tot09 == 0) ? '' :
                ((results.hu_tot16 - results.hu_tot09)/results.hu_tot09)*100 > 0 ? '+' : 
                ''
            );
            var huTotPerc = (
                (results.hu_tot16 == 0 || results.hu_tot09 == 0) ? '' :
                ((results.hu_tot16 - results.hu_tot09)/results.hu_tot09)*100 
            );    
            var huTotForm = (
                huTotPerc == 0 ? 'N/A' : huTotPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var huTotPercSign = (
                (results.hu_tot16 == 0 || results.hu_tot09 == 0) ? '' : '%'
            );
            var huTotArrow = (
                (results.hu_tot16 == 0 || results.hu_tot09 == 0) ? noArrow :
                (results.hu_tot16 - results.hu_tot09) > 0 ? upArrow :
                (results.hu_tot16 - results.hu_tot09) < 0 ? downArrow :
                ''
            );
            
            var huRntPlus = (
                (results.hu_rnt16 == 0 || results.hu_rnt09 == 0) ? '' :
                ((results.hu_rnt16 - results.hu_rnt09)/results.hu_rnt09)*100 > 0 ? '+' : 
                ''
            );
            var huRntPerc = (
                (results.hu_rnt16 == 0 || results.hu_rnt09 == 0) ? '' :
                ((results.hu_rnt16 - results.hu_rnt09)/results.hu_rnt09)*100 
            );    
            var huRntForm = (
                huRntPerc == 0 ? 'N/A' : huRntPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var huRntPercSign = (
                (results.hu_rnt16 == 0 || results.hu_rnt09 == 0) ? '' : '%'
            );
            var huRntArrow = (
                (results.hu_rnt16 == 0 || results.hu_rnt09 == 0) ? noArrow :
                (results.hu_rnt16 - results.hu_rnt09) > 0 ? upArrow :
                (results.hu_rnt16 - results.hu_rnt09) < 0 ? downArrow :
                ''
            );
            
            var totHuOwnPlus = (
                (results.tothuown16 == 0 || results.tothuown09 == 0) ? '' :
                ((results.tothuown16 - results.tothuown09)/results.tothuown09)*100 > 0 ? '+' : 
                ''
            );
            var totHuOwnPerc = (
                (results.tothuown16 == 0 || results.tothuown09 == 0) ? '' :
                ((results.tothuown16 - results.tothuown09)/results.tothuown09)*100 
            );    
            var totHuOwnForm = (
                totHuOwnPerc == 0 ? 'N/A' : totHuOwnPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var totHuOwnPercSign = (
                (results.tothuown16 == 0 || results.tothuown09 == 0) ? '' : '%'
            );
            var totHuOwnArrow = (
                (results.tothuown16 == 0 || results.tothuown09 == 0) ? noArrow :
                (results.tothuown16 - results.tothuown09) > 0 ? upArrow :
                (results.tothuown16 - results.tothuown09) < 0 ? downArrow :
                ''
            );
            
            var medMonRntPlus = (
                (results.mgrsrnt16 == 0 || results.mgrsrnt09_ == 0) ? '' :
                ((results.mgrsrnt16 - results.mgrsrnt09_)/results.mgrsrnt09_)*100 > 0 ? '+' : 
                ''
            );
            var medMonRntPerc = (
                (results.mgrsrnt16 == 0 || results.mgrsrnt09_ == 0) ? '' :
                ((results.mgrsrnt16 - results.mgrsrnt09_)/results.mgrsrnt09_)*100 
            );    
            var medMonRntForm = (
                medMonRntPerc == 0 ? 'N/A' : medMonRntPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var medMonRntPercSign = (
                (results.mgrsrnt16 == 0 || results.mgrsrnt09_ == 0) ? '' : '%'
            );
            var medMonRntArrow = (
                (results.mgrsrnt16 == 0 || results.mgrsrnt09_ == 0) ? noArrow :
                (results.mgrsrnt16 - results.mgrsrnt09_) > 0 ? upArrow :
                (results.mgrsrnt16 - results.mgrsrnt09_) < 0 ? downArrow :
                ''
            );
            
            var medHomValPlus = (
                (results.medval16 == 0 || results.medval09_a == 0) ? '' :
                ((results.medval16 - results.medval09_a)/results.medval09_a)*100 > 0 ? '+' : 
                ''
            );
            var medHomValPerc = (
                (results.medval16 == 0 || results.medval09_a == 0) ? '' :
                ((results.medval16 - results.medval09_a)/results.medval09_a)*100 
            );    
            var medHomValForm = (
                medHomValPerc == 0 ? 'N/A' : medHomValPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var medHomValPercSign = (
                (results.medval16 == 0 || results.medval09_a == 0) ? '' : '%'
            );
            var medHomValArrow = (
                (results.medval16 == 0 || results.medval09_a == 0) ? noArrow :
                (results.medval16 - results.medval09_a) > 0 ? upArrow :
                (results.medval16 - results.medval09_a) < 0 ? downArrow :
                ''
            );
       
            var popupElement = document.createElement("div");
            popupElement.innerHTML =
              "<div style='padding-right: 5px;'><table style='border:2px solid #f0ece5; border-collapse:collapse; width:100%;'><tbody><tr><td style='padding-left:4px; padding-right:4px; padding-bottom:4px; padding-top:1px;'><table style='width:100%'><tbody><tr style='border:0px solid'><td class='censHeader'>St. Louis Census Tract</td></tr></tbody></table>"+"<table style='width:100%;'><tbody><tr><td class='haanText'>" + haanText + "</td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%;'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' style='padding:2px'><h5>" + tractTrunc + "</h5></td></tr></tbody></table>"+"<table style='width:100%'><tbody><tr style='border:0px solid'><td class='censSubHeader'>Housing Units 2009 - 2016</td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Total Units</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + hutot09 + "</h5></td><td align='center' style='padding:2px; border: 1px solid #d1d1d1;' width='33%'><h5>" + hutot16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + huTotPlus + huTotForm + huTotPercSign + " " + huTotArrow + "</h5></td></tr><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Rental Units</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + hurnt09 + "</h5></td><td align='center' style='padding:2px; border: 1px solid #d1d1d1;' width='33%'><h5>" + hurnt16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + huRntPlus + huRntForm + huRntPercSign + " " + huRntArrow + "<img alt='' height='11' src='{expression/Rnt_Unit_Arrow}' width='11' /></h5></td></tr><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Owner Occupied Units</h4></font></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Count</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Count</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + tothuown09 + "</h5></td><td align='center' style='padding:2px; border: 1px solid #d1d1d1;' width='33%'><h5>" + tothuown16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + totHuOwnPlus + totHuOwnForm + totHuOwnPercSign + " " + totHuOwnArrow + "<img alt='' height='11' src='{expression/Own_Unit_Arrow}' width='11' /></h5></td></tr></tbody></table>"+"<table style='width:100%'><tbody><tr style='border:0px solid'><td class='censSubHeader'>Housing Costs 2009 - 2016</td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Median Monthly Rental Price</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Cost</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Cost</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>$" + mgrsrnt09 + "</h5></td><td align='center' style='padding:2px; border: 1px solid #d1d1d1;' width='33%'><h5>$" + mgrsrnt16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + medMonRntPlus + medMonRntForm + medMonRntPercSign + " " + medMonRntArrow + "<img alt='' height='11' src='{expression/Med_Rent_Arrow}' width='11' /></h5></td></tr></tbody><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Median Home Value</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>2009 Cost</h6></td><td align='center' style='padding:2px;' width='33%'><h6>2016 Cost</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>$" + medval09 + "</h5></td><td align='center' style='padding:2px; border: 1px solid #d1d1d1;' width='33%'><h5>$" + medval16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 2px;' width='33%'><h5>" + medHomValPlus + medHomValForm + medHomValPercSign + " " + medHomValArrow + "</h5></td></tr></tbody></table>";

              return popupElement;
            }
            
        /////////////////Add Income Census Tract Data//////////////////////////
    
        const income1 = {
          type: "simple-fill",
          color: "#202f49",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const income2 = {
          type: "simple-fill",
          color: "#5d6a88",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const income3 = {
          type: "simple-fill",
          color: "#a0adce",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const income4 = {
          type: "simple-fill",
          color: "#f5f5f5",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const income5 = {
          type: "simple-fill",
          color: "#43c1b8",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const income6 = {
          type: "simple-fill",
          color: "#007b74",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };
    
        const income7 = {
          type: "simple-fill",
          color: "#003a36",
          style: "solid",
          outline: {
            width: 0.3,
            color: [0,0,0, 1]
          }
        };

        const incomeTractRenderer = {
          type: "class-breaks", 
          field: "MdIncPerc",
          //normalizationField: "",
          legendOptions: {
            title: "Change in Median Income 2009 - 2016"
          },
          classBreakInfos: [
            {
              minValue: -50.730,
              maxValue: -26.696,
              symbol: income1,
              label: "Median Income Decrease"
            },
            {
              minValue: -26.696,
              maxValue: -7.841,
              symbol: income2,
              label: " "
            },
            {
              minValue: -7.841,
              maxValue: -0.250,
              symbol: income3,
              label: " "
            },
            {
              minValue: -0.250,
              maxValue: 0.250,
              symbol: income4,
              label: " "
            },
            {
              minValue: 0.250,
              maxValue: 61.111,
              symbol: income5,
              label: " "
            },
            {
              minValue: 61.111,
              maxValue: 134.569,
              symbol: income6,
              label: " "
            },
            {
              minValue: 134.569,
              maxValue: 232.461,
              symbol: income7,
              label: "Median Income Increase"
            }
          ]
        };
        
        var incomeTracts = new FeatureLayer({
          url:"https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/aachaf_stlouis_tract10_select/FeatureServer",
          maxScale: 0,
          minScale: 0,
          renderer: incomeTractRenderer,     
          opacity: .4,      
          outFields: ["name_e", "medinc16", "medinc09_a", "allinc16", "lowinc16", "medinc16", "highinc16", "allinc09", "lowinc09", "medinc09", "highinc09"],
          title: " ",    
          popupEnabled: true,
          visible: false,
          popupTemplate: {
                outFields: ["*"],
                  //title: "{name_e}",
                  content: function (feature) {
                    return setContentInfoInc(feature.graphic.attributes);
                  },    
              },
            });

        function setContentInfoInc(results) {

            var upArrow = "<img class='upArrow' alt=''src='img/icons/UpArrow.png'/>";
            var downArrow = "<img class='downArrow' alt=''src='img/icons/DownArrow.png'/>";
            var noArrow = "";

            var haanText = results.hiafam7010 > 3 ? 'Historically African American census tract as determined by the presence of a majority African American population in four out of the last five decennial censuses irrespective of historic designation.': '';

            var str = results.name_e;
            var tractTrunc = str.substr(0, str.lastIndexOf(","));
            
            var medinc09 = results.medinc09_a.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var medinc16 = results.medinc16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var lowinc09 = results.lowinc09.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var midinc09 = results.midinc09.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var highinc09 = results.highinc09.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var allinc09 = results.allinc09.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var lowinc16 = results.lowinc16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var midinc16 = results.midinc16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var highinc16 = results.highinc16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            var allinc16 = results.allinc16.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            
            var medIncPlus = (results.medinc16 - results.medinc09_a) > 0 ? '+' : '';
            var medIncPerc = ((results.medinc16 - results.medinc09_a)/results.medinc09_a)*100;
            var medIncPercForm = medIncPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            
            var medIncArrow = (
                (results.medinc16 - results.medinc09_a) > 0 ? upArrow :
                (results.medinc16 - results.medinc09_a) == 0 ? noArrow :
                (results.medinc16 - results.medinc09_a) < 0 ? downArrow :
                ''
            );

            var lowhousPlus = (
                (results.lowinc16 == 0 || results.lowinc09 == 0) ? '' :
                ((results.lowinc16 - results.lowinc09)/results.lowinc09)*100 > 0 ? '+' : 
                ''
            );
            var lowhousPerc = (
                (results.lowinc16 == 0 || results.lowinc09 == 0) ? '' :
                ((results.lowinc16 - results.lowinc09)/results.lowinc09)*100 
            );
            var lowhousPercForm = (
                lowhousPerc == 0 ? 'N/A' : lowhousPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var lowhousPercSign = (
                (results.lowhinc16 == 0 || results.lowinc09 == 0) ? '' : '%'
            );
            var lowhousArrow = (
                (results.lowinc16 == 0 || results.lowinc09 == 0) ? noArrow :
                (results.lowinc16 - results.lowinc09) > 0 ? upArrow :
                (results.lowinc16 - results.lowinc09) < 0 ? downArrow :
                ''
            );
            
            
            var midhousPlus = (
                (results.midinc16 == 0 || results.midinc09 == 0) ? '' :
                ((results.midinc16 - results.midinc09)/results.midinc09)*100 > 0 ? '+' : 
                ''
            );
            var midhousPerc = (
                (results.midinc16 == 0 || results.midinc09 == 0) ? '' :
                ((results.midinc16 - results.midinc09)/results.midinc09)*100 
            );    
            var midhousPercForm = (
                midhousPerc == 0 ? 'N/A' : midhousPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var midhousPercSign = (
                (results.midhinc16 == 0 || results.midinc09 == 0) ? '' : '%'
            );
            var midhousArrow = (
                (results.midinc16 == 0 || results.midinc09 == 0) ? noArrow :
                (results.midinc16 - results.midinc09) > 0 ? upArrow :
                (results.midinc16 - results.midinc09) < 0 ? downArrow :
                ''
            );
            
            
            var hihousPlus = (
                (results.highinc16 == 0 || results.highinc09 == 0) ? '' :
                ((results.highinc16 - results.highinc09)/results.highinc09)*100 > 0 ? '+' : 
                ''
            );
            var hihousPerc = (
                (results.highinc16 == 0 || results.highinc09 == 0) ? '' :
                ((results.highinc16 - results.highinc09)/results.highinc09)*100 
            );    
            var hihousPercForm = (
                hihousPerc == 0 ? 'N/A' : hihousPerc.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                })          
            );
            
            var hihousPercSign = (
                (results.highinc16 == 0 || results.highinc09 == 0) ? '' : '%'
            );
            var hihousArrow = (
                (results.highinc16 == 0 || results.highinc09 == 0) ? noArrow :
                (results.highinc16 - results.highinc09) > 0 ? upArrow :
                (results.highinc16 - results.highinc09) < 0 ? downArrow :
                ''
            );

            var popupElement = document.createElement("div");
            //popupElement.className = "testClass";
            popupElement.innerHTML =
              "<div style='padding-right: 5px;'><table style='border:2px solid #f0ece5; border-collapse:collapse; width:100%;'><tbody><tr><td style='padding-left:4px; padding-right:4px; padding-bottom:4px; padding-top:1px;'><table style='width:100%'><tbody><tr style='border:0px solid'><td class='censHeader'>St. Louis Census Tract</td></tr></tbody></table>"+"<table style='width:100%;'><tbody><tr><td class='haanText'>" + haanText + "</td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%;'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' style='padding:2px'><h5>" + tractTrunc + "</h5></td></tr></tbody></table>"+"<table style='width:100%'><tbody><tr style='border:0px solid'><td class='censSubHeader'>Income Changes 2009 - 2016</td></tr></tbody></table>"+"<table style='border: 2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border: 2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>Median Household Income</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h6>2009 Amount</h6></td><td align='center' style='padding:1px;' width='33%'><h6>2016 Amount</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h6>% Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>$" + medinc09 + "</font></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='33%'><h5>$" + medinc16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + medIncPlus + medIncPercForm + "%" + " " + medIncArrow + "</h5></td></tr></tbody></table>"+"<br>"+"<b>"+"<table style='border: 2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border: 2px solid #d1d1d1'><td align='center' colspan='4' style='background-color: #d8cebc; padding:2px'><h4>2009 Household Counts by Income</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><font size='1'><b>Low-Income</b></font></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h6><b>Mid-Income</b></h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><h6><b>High-Income</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><font size='1'></font></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h6><$35K per year</h6></td><td align='center' style='padding:3px;' width='25%'><h6>$35K - $99K per year</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><h6>+$100k per year</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><h6><b>Total Count</b></h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h5>" + lowinc09 + "</h5></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='25%'><h5>" + midinc09 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h5>" + highinc09 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h5>" + allinc09 + "</h5></td></tr></tbody></table>"+"<br>"+"<b>"+"<table style='border: 2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border: 2px solid #d1d1d1'><td align='center' colspan='4' style='background-color: #d8cebc; padding:2px'><h4>2016 Household Counts by Income</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h6><b>Low-Income</b></h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h6><b>Mid-Income</b></h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><h6><b>High-Income</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><h6></h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h6><$35K per year</h6></td><td align='center' style='padding:3px;' width='25%'><h6>$35K - $99K per year</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><h6>+$100k per year<h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 3px;' width='25%'><h6><b>Total Count</b></h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h5>" + lowinc16 + "</h5></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='25%'><h5>" + midinc16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h5>" + highinc16 + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='25%'><h5>" + allinc16 + "</h5></td></tr></tbody></table>"+"<br>"+"<table style='border: 2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border: 2px solid #d1d1d1'><td align='center' colspan='3' style='background-color: #d8cebc; padding:2px'><h4>% Change in Households by Income 2009 - 2016</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h6>Low-Income % Change</h6></td><td align='center' style='padding:1px;' width='33%'><h6>Mid-Income % Change</h6></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h6>High-Income % Change</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + lowhousPlus + lowhousPercForm + lowhousPercSign + " " + lowhousArrow + "</h5></td><td align='center' style='padding:1px; border: 1px solid #d1d1d1;' width='33%'><h5>" + midhousPlus + midhousPercForm + midhousPercSign + " " + midhousArrow + "</h5></td><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 1px;' width='33%'><h5>" + hihousPlus + hihousPercForm  + hihousPercSign + " " + hihousArrow + "</h5></td></tr></tbody></table>"+"<br><table style='width:100%'><tbody><tr style='border:0px solid'><td class='censSubHeader' align='center' style='padding-bottom:3px'>Graphing Change by Household Income</td></tr></tbody></table>"+"<table style='border:0px solid; border-collapse:collapse; width:100%;'><tbody><tr style='border:0px solid'><td align='center' style='padding:2px'><h5>" + tractTrunc + "</h5></td></tr></tbody></table>"+"<div class='chartDivInc'></div>";

            var canvas = document.createElement("canvas");

                var data = {
                  labels: [
                    'Low-Income',
                    'Mid-Income',
                    'High-Income',   
                  ],        
                  datasets:[
                    {
                        label: "2009",
                        data: [results.lowinc09, results.midinc09, results.highinc09],
                        //stack: "Stack 0",    
                        backgroundColor: ["rgba(35,31,32,0.8)", "rgba(35,31,32,0.8)", "rgba(35,31,32,0.8)"],
                        borderColor: "#404040",
                        borderWidth: .5,
                        hoverBorderWidth: 1
                    },
                    {
                        label: "2016",
                        data: [results.lowinc16, results.midinc16, results.highinc16],
                        //stack: "Stack 0",    
                        backgroundColor: ["rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)"],
                        borderColor: "#404040",
                        borderWidth: .5,
                        hoverBorderWidth: 1
                    }

                  ],
                };

                  var options = {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            position: "top",
                            onHover: function(e) {
                                e.target.style.cursor = 'pointer';
                            }
                        },
                        scales: {
                            xAxes: [{
                                //stacked: true
                                ticks: {
                                    fontSize: 12,
                                    maxRotation: 45,
                                    minRotation: 45,
                                    fontColor: "#000"
                                }
                            }],
                            yAxes: [{
                                //stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                    fontSize: 10,
                                    fontColor: "#000"
                                }
                            }]
                        },
                        hover: {
                            onHover: function(e) {
                                var point = this.getElementAtEvent(e);
                                if (point.length) e.target.style.cursor = 'pointer';
                                else e.target.style.cursor = 'default';
                             }
                        },
                        tooltips: {
                            callbacks: {                      
                                label: function(tooltipItem, data) {
                                    return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                },
                            },
                            backgroundColor: 'rgba(255,255,255, 0.8)',
                            titleFontFamily: "'Montserrat'",
                            bodyFontFamily: "'Montserrat'",
                            titleFontColor: "#000",
                            bodyFontColor: "#000"
                        }
                };

                Chart.Legend.prototype.afterFit = function() {
                    this.height = this.height + 10;
                };

                Chart.defaults.global.defaultFontFamily="'Montserrat'";
            
                var mybarChart = new Chart(canvas, {
                  type: "bar",
                  data: data,
                  options: options,   
                });

                popupElement.querySelector(".chartDivInc").appendChild(canvas);

                return popupElement;
            }   
    
/**************************Add Non-Study Census Tracts******************************/
    
    
        const nonStudyRenderOne = {
            type: "simple",
              symbol: {
                type: "simple-fill",
                color: [0,0,0, .1],
                outline: {
                  color: [0,0,0, .8],
                  width: 0.1,
                  style: "solid"    
                }
            }
        };
    
        const nonStudyRenderTwo = {
            type: "simple",
              symbol: {
                type: "simple-fill",
                color: [0,0,0, .1],
                outline: {
                  color: [0,0,0, .8],
                  width: 0.3,
                  style: "solid"    
                }
            }
        };    
    
        var nonStudyTracts = new FeatureLayer({
          url:"https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/STL_NonStudy_Tracts/FeatureServer",
          maxScale: 0,
          minScale: 0,
          opacity: 1,
          renderer: {  
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [0,0,0, .1],
                outline: {
                  color: [0,0,0, .6],
                  width: 0.1,
                  style: "solid"    
                }
              }
            },
           popupTemplate: {
                outFields: ["*"],
                  //title: "{name_e}",
                  content: function (feature) {
                    return setContentInfoNonStudy(feature.graphic.attributes);
                  },    
              },
            });
    
            function setContentInfoNonStudy(results) {
                var str = results.name_e;
                var tractTrunc = str.substr(0, str.lastIndexOf(","));

            var popupElement = document.createElement("div");
                
            popupElement.innerHTML =
                "<table style='border:2px solid #f0ece5; border-collapse:collapse; width:100%;'><tbody><tr><td class='censHeader'>St. Louis Census Tract</td></tr></tbody></table>"+"<table style='border:2px solid #b8b8b8; margin-top: 10px; border-collapse:collapse; width:100%;'><tbody><tr style='border:2px solid #b8b8b8'><td align='center' style='padding:2px'><h5>" + tractTrunc + "</h5></td></tr></tbody></table>"+"<br><table style='border:2px solid #b8b8b8; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #b8b8b8'><td align='left' style='background-color: #f0ece5 ;padding:8px'><font color='#000000' size='2'>Census tract excluded from the prototype dataset because a majority of residents live in group quarters (e.g., dormitories, correctional facilities, hospitals, residential treatment centers, etc.), or the tract had fewer than 500 residents (i.e., tracts with majority non-residential commercial, industrial, or infrastructural, and/or open space, etc. uses) between 2009 and 2016.</font></td></tr></tbody></table><br>";
                
                return popupElement;
            }    
                
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            nonStudyTracts.renderer =
              newValue <= 18056 ? nonStudyRenderTwo : nonStudyRenderOne;
          });
        })
        
/**************************Add HAAN Tracts******************************/
        
        const haanRenderOne = {
              type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [0, 0, 0, 0.1],
                outline: {
                  color: [0,0,0, 0.75],
                  width: 2,
                  style: "short-dot"    
                }
            }
        };
    
        const haanRenderTwo = {
              type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [0, 0, 0, 0.1],
                outline: {
                  color: [0,0,0, 0.6],
                  width: 4,
                  style: "short-dot"    
                }
            }
        };
    
        var Haan = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/StLouis_HAAN/FeatureServer",
          maxScale: 0,
          minScale: 0,
          visible: true,     
          legendEnabled: true,    
          renderer: haanRenderOne
        });
    
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            Haan.renderer =
              newValue <= 18056 ? haanRenderTwo : haanRenderOne;
          });
        });
    
/**************************Add HTC Project Points******************************/
    
        const htcA = {
          type: "simple-marker",  
          style: "circle",
          color: "#00679d",
          size: 7,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1  
          }
        };  
          
        const htcB = {
          type: "simple-marker",  
          style: "circle",
          color: "#7ed3f6",
          size: 7,  
          outline: { 
            color: [ 0, 0, 0, 0.5],
            width: 1 
          }
        };  
          
        const htcC = {
          type: "simple-marker",  
          style: "circle",
          color: "#ffcb40",
          size: 7,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1
          }
        };
          
        const htcD = {
          type: "simple-marker", 
          style: "circle",
          color: "#e55925",
          size: 7,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1 
          }
        };
          
        const htcE = {
          type: "simple-marker",  
          style: "circle",
          color: "#b00931",
          size: 7, 
          outline: { 
            color: [ 0, 0, 0, 0.5],
            width: 1  
          }
        };
          
        const htcF = {
          type: "simple-marker", 
          style: "circle",
          color: "#7e3232",
          size: 7, 
          outline: { 
            color: [ 0, 0, 0, 0.5],
            width: 1 
          }
        };
          
        const htcG = {
          type: "simple-marker", 
          style: "circle",
          color: "#d8cebc",
          size: 7,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1  
          }
        };
          
        const htcProjRenderer = {
          type: "unique-value",
          field: "projuse2",   
          legendOptions: {
            title: "HTC Project Type"
          }, 
          uniqueValueInfos: [{
            value: "Housing",
            symbol: htcA,
            label: "Housing"
          }, {
            value: "Multi-Use",
            symbol: htcB,
            label: "Multi-Use"
          }, {
            value: "Commercial",
            symbol: htcC,
            label: "Commercial"
          }, {
            value: "Office",
            symbol: htcD,
            label: "Office"
          }, {
            value: "Other",
            symbol: htcE,
            label: "Other"
          }, {
            value: "Not Reported",
            symbol: htcF,
            label: "Not Reported"
          }, {
            value: "Hotel",
            symbol: htcG,
            label: "Hotel"
          }],
        };
    
        const htcA2 = {
          type: "simple-marker",  
          style: "circle",
          color: "#00679d",
          size: 11,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1.75  
          }
        };  
          
        const htcB2 = {
          type: "simple-marker",  
          style: "circle",
          color: "#7ed3f6",
          size: 11,  
          outline: { 
            color: [ 0, 0, 0, 0.5],
            width: 1.75 
          }
        };  
          
        const htcC2 = {
          type: "simple-marker",  
          style: "circle",
          color: "#ffcb40",
          size: 11,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1.75 
          }
        };
          
        const htcD2 = {
          type: "simple-marker", 
          style: "circle",
          color: "#e55925",
          size: 11,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1.75 
          }
        };
          
        const htcE2 = {
          type: "simple-marker",  
          style: "circle",
          color: "#b00931",
          size: 11, 
          outline: { 
            color: [ 0, 0, 0, 0.5],
            width: 1.75  
          }
        };
          
        const htcF2 = {
          type: "simple-marker", 
          style: "circle",
          color: "#7e3232",
          size: 11, 
          outline: { 
            color: [ 0, 0, 0, 0.5],
            width: 1.75 
          }
        };
          
        const htcG2 = {
          type: "simple-marker", 
          style: "circle",
          color: "#d8cebc",
          size: 11,  
          outline: {  
            color: [ 0, 0, 0, 0.5],
            width: 1.75  
          }
        };
          
        const htcProjRendererTwo = {
          type: "unique-value",
          field: "projuse2",   
          legendOptions: {
            title: "HTC Project Type"
          }, 
          uniqueValueInfos: [{
            value: "Housing",
            symbol: htcA2,
            label: "Housing"
          }, {
            value: "Multi-Use",
            symbol: htcB2,
            label: "Multi-Use"
          }, {
            value: "Commercial",
            symbol: htcC2,
            label: "Commercial"
          }, {
            value: "Office",
            symbol: htcD2,
            label: "Office"
          }, {
            value: "Other",
            symbol: htcE2,
            label: "Other"
          }, {
            value: "Not Reported",
            symbol: htcF2,
            label: "Not Reported"
          }, {
            value: "Hotel",
            symbol: htcG2,
            label: "Hotel"
          }],
        };
    
        var htcProj = new FeatureLayer ({
            url:"https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/HTC_Projects_All_2002_2019/FeatureServer",
            definitionExpression: "city = 'St. Louis' AND state = 'MO' AND waso <> 30152 AND waso <> 17973 AND waso <> 26136 AND waso <> 13651 AND waso <> 20189 AND waso <> 14222 AND waso <> 23056 AND waso <> 24110 AND waso <> 24305 AND waso <> 14223 AND waso <> 21605 AND waso <> 16657 AND waso <> 23618 AND waso <> 22068 AND waso <> 29870 AND waso <> 29865 AND waso <> 29869 AND waso <> 32057 AND waso <> 32101 AND waso <> 32102 AND waso <> 32105 AND waso <> 32109 AND waso <> 32108 AND waso <> 32107 AND waso <> 32106 AND waso <> 32104 AND part3 >= '2009-01-01 00:00:00' AND part3 <= '2016-12-31 00:00:00'",
            maxScale: 0,
            minScale: 500000,
            visible: false,
            popupEnabled: true, 
            legendEnabled: true,
            popupTemplate: {
                content: [
                    {
                        type: "text",
                        text: "<table style='width:100%'><tbody><tr style='border:0px solid;'><td align='center' style='padding:2px'><h3>Federal HTC Project</h3></td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='2' style='background-color: #d8cebc ;padding:5px'><b><h4>Project Information</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Name</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{expression/HTC_Proj_Name}</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Address</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{address}</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Year Completed</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{cy}</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Project Type</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{expression/HTC_Proj_Type}</h6></td></tr><tr><td align='left' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Qualifying Rehabilitation Expenses</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>${qre_tot}</h6></td></tr></tbody></table><br>"
                    }
                ],
                fieldInfos: [{
                    fieldName: "cy",
                    format: {
                        places: 0,
                        digitSeparator: false
                        }
                },
                {
                 fieldName: "qre_tot",
                 format: {
                    places: 0,
                    digitSeparator: true
                    }
                }],
                expressionInfos: arcadeExpressionInfos,         
            },
            
            renderer: htcProjRenderer,
            labelingInfo: [ ]
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            htcProj.renderer =
              newValue <= 9028 ? htcProjRendererTwo : htcProjRenderer;
          });
        });
    
/**************************Add Local HDs******************************/
    
        const localHDRenderOne = {
              type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [0,159,150, 0.5],
                style: "diagonal-cross",  
                outline: {
                  color: [0,159,150, 1],     
                  width: 1.5,  
                }
            }
        };
    
        const localHDRenderTwo = {
              type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [0,159,150, 0.5],
                style: "diagonal-cross",  
                outline: {
                  color: [0,159,150, 1],     
                  width: 2.5,  
                }
            }
        }; 
    
        var localHd = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/StLouis_Local_Historic_Districts/FeatureServer",   
          maxScale: 0,
          minScale: 500000,
          opacity: 0.9,    
          legendEnabled: true,
          visible: false,
          popupTemplate: {
                content: 
                "<table style='width:100%'><tbody><tr style='border:0px solid;'><td align='center' style='padding:2px'><h3>Local Historic District</h3></td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='2' style='background-color: #d8cebc ;padding:5px'><b><h4>District Information</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Name</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{DISNAME}</h6></td></tr></tbody></table><br>"
            },    
          popupEnabled: true,    
          renderer: localHDRenderOne,
            labelingInfo: [ ]
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            localHd.renderer =
              newValue <= 9028 ? localHDRenderTwo : localHDRenderOne;
          });
        });
    
/**************************Add NRHP Sites******************************/
    
        const nrhpSitesRenderOne = {
                type: "simple",  
                symbol: {
                    type: "simple-marker",
                    style: "triangle",
                    size: 8,
                    color: "#969696",
                    outline: {  
                        width: 1,
                        color: "#000"
                    }
                }
        };
    
        const nrhpSitesRenderTwo = {
                type: "simple",  
                symbol: {
                    type: "simple-marker",
                    style: "triangle",
                    size: 11,
                    color: "#969696",
                    outline: {  
                        width: 2,
                        color: "#000"
                    }
                }
        }; 
    
        var nrhpSites = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/STL_NRHP_Sites/FeatureServer",
          definitionExpression: "SRC_DATE <= '2016-12-31 00:00:00'",    
          maxScale: 0,
          minScale: 500000,
          opacity: 0.8,    
          legendEnabled: true,
          visible: false,
          popupTemplate: {
                content: 
                "<table style='width:100%'><tbody><tr style='border:0px solid;'><td align='center' style='padding:2px'><h3>National Register Site</h3></td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='2' style='background-color: #d8cebc ;padding:5px'><b><h4>Site Information</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Name</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{RESNAME}</h6></td></tr></tbody></table><br>"
            },    
          popupEnabled: true,    
          renderer: nrhpSitesRenderOne,
            labelingInfo: []
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            nrhpSites.renderer =
              newValue <= 9028 ? nrhpSitesRenderTwo : nrhpSitesRenderOne;
          });
        });
    
/**************************Add NRHP HDs******************************/
    
        const nrhpHDRenderOne = {
              type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [0, 0, 0, 0.3],
                style: "diagonal-cross",  
                outline: {
                  color: [0,0,0, 0.8],
                  width: 1.5,  
                }
              }
            };
    
        const nrhpHDRenderTwo = {
              type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [0, 0, 0, 0.3],
                style: "diagonal-cross",  
                outline: {
                  color: [0,0,0, 0.8],
                  width: 2.5,  
                }
              }
            }; 
    
        var nrhpHd = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/StLouis_National_Register_Historic_Districts/FeatureServer",    
          definitionExpression: "LISTED < '1/01/2017'",
          maxScale: 0,
          minScale: 500000,
          opacity: 0.9,    
          legendEnabled: true,
          visible: false,
          popupTemplate: {
                content:
              
                "<table style='width:100%'><tbody><tr style='border:0px solid;'><td align='center' style='padding:2px'><h3>National Register Historic District</h3></td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='2' style='background-color: #d8cebc ;padding:5px'><b><h4>District Information</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Name</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{HST_NAME}</h6></td></tr></tbody></table><br>"
            },      
          popupEnabled: true,    
          renderer: nrhpHDRenderOne,
            labelingInfo: [ ]
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            nrhpHd.renderer =
              newValue <= 9028 ? nrhpHDRenderTwo : nrhpHDRenderOne;
          });
        });
    
/**************************Add Public Transportation Stations Layer******************************/
    
       const ctaLabel = {    
          symbol: {
            type: "text", 
            color: "black",
            haloColor: "white",
            haloSize: 2,  
            font: { 
              family: "Montserrat",
              size: 8,
            }
          },
          maxScale: 0,
          minScale: 100000,    
          labelPlacement: "above-center",
          labelExpressionInfo: {
            expression: "$feature.Station"
          }
        };
    
        var ctaStations = new FeatureLayer ({
            url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/MetroLink_Stations/FeatureServer",
            maxScale: 0,
            minScale: 100000,
            legendEnabled: true,
            visible: false,
            popupEnabled: false,
            renderer: {
                type: "simple",  
                symbol: {
                    type: "simple-marker", 
                    size: 7.5,
                    color: "#000",
                    outline: {  
                        width: 2,
                        color: "#fff"
                    }
                }
            },
            labelingInfo: [ctaLabel]
        });
    
        /****************************CTA Line Data*************************/
    
        var ctaLines = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/MetroLink_Lines/FeatureServer",
          maxScale: 0,
          minScale: 500000,
          opacity: 0.8,    
          legendEnabled: true,
          visible: false,
          popupTemplate: {
                content: 
                "<table style='width:100%'><tbody><tr style='border:0px solid'><td align='center' style='padding:2px'><h3>MetroLink Transit Line</h3></td></tr></tbody></table>"+"<table style='border:2px solid #b8b8b8; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='left' colspan='2' style='background-color: #d8cebc ;padding:5px'><h4>{NAME}</h4></td></tbody></table><br>"
            },    
          popupEnabled: true,
          renderer: {
                type: "simple",
                symbol: {
                  color: "#e60202",
                  type: "simple-line",
                  style: "solid",
                  width: 2   
                }
            },
            labelingInfo: []
        });
    
        var ctaLinesBack = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/MetroLink_Lines/FeatureServer",
          maxScale: 0,
          minScale: 500000,
          opacity: 0.9,    
          legendEnabled: false,
          visible: false,
          popupEnabled: false,   
          renderer: {
                type: "simple",
                symbol: {
                  color: "#ffffff",
                  type: "simple-line",
                  style: "solid",
                  width: 5   
                }
            },
        });
    
        var collUniv = new FeatureLayer ({
            url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/StLouis_Universities_and_Colleges/FeatureServer",
            definitionExpression: "address <> '1 University Boulevard' AND address <> '1 College Park Drive'",
            maxScale: 0,
            minScale: 500000,
            visible: false,
            legendEnabled: true,
            popupEnabled: true,
            popupTemplate: {
                content: "<table style='width:100%'><tbody><tr style='border:0px solid'><td align='center' style='padding:2px'><h3>Colleges & Universities</h3></td></tr></tbody></table>"+"<table style='border:2px solid #b8b8b8; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='left' colspan='2' style='background-color: #d8cebc ;padding:5px'><h4>{name}</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Address</h5></td><td align='center' style='padding:5px; border: 1px solid #b8b8b8;' width='70%'><h6>{address}</h6></td></tr></tbody></table><br>"
            }, 
            renderer: {
                    type: "simple",
                    symbol: {
                      type: "simple-marker",
                      size: 10,
                      color: "#000",
                      outline: {
                        width: 3.5,  
                        color: "#fff"
                    }
                }
            }
        });
    
        const makeCluster = {
          type: "cluster",
          clusterRadius: "50px",
          popupTemplate: {
            content: "This cluster represents <b>{cluster_count}</b> demolition permits. Zoom in to see the location of individual demolition permits.",
            fieldInfos: [
              {
                fieldName: "cluster_count",
                format: {
                  places: 0,
                  digitSeparator: true
                }
              }
            ]
          },
          clusterMinSize: "15px",
          clusterMaxSize: "50px",
          labelingInfo: [
            {
              deconflictionStrategy: "none",
              labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,###')"
              },
              symbol: {
                type: "text",
                color: "#fff",
                font: {
                  weight: "bold",
                  family: "Montserrat",
                  size: "10px"
                }
              },
              labelPlacement: "center-center"
            }
          ]
        };
    
        const demoRenderOne = {
            type: "simple",
            symbol: {
              type: "simple-marker",
              size: 7,
              color: "#404040",
              outline: {
                color: "rgba(128, 128, 128, 0.5)",
                width: 5
              }
            }
        };
    
        const demoRenderTwo = {
                type: "simple",
                symbol: {
                  type: "simple-marker",
                  size: 7,
                  color: "#404040",
                  outline: {
                    color: "rgba(128, 128, 128, 0.5)",
                    width: 2
                  }
             }
        };
    
       const demoRenderThree = {
                type: "simple",
                symbol: {
                  type: "simple-marker",
                  size: 11,
                  color: "#404040",
                  outline: {
                    color: "rgba(128, 128, 128, 0.5)",
                    width: 2
                }
            }
        };
    
        var demoPermits = new FeatureLayer ({
           url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/STL_DemoPerms/FeatureServer",
           featureReduction: makeCluster,
           definitionExpression: "Garage <> 'Y' AND OutSTL <> 1",     
           title: "Demolition Permit Activity (2012 - 2016)",
           visible: false,
           opacity: 0.9,
           renderer: demoRenderOne,
           popupEnabled: true,    
           popupTemplate: {
                content: 
                "<table style='width:100%'><tbody><tr style='border:0px solid;'><td align='center' style='padding:2px'><h3>Demolition Permit</h3></td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='2' style='background-color: #d8cebc ;padding:5px'><b><h4>Permit Information</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Type</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>Demolition</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Issue Date</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{IssDate}</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Work Description</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{AppDescr}</h6></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>Address</h5></td><td align='center' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>{OrigAddres}</h6></td></tr></tbody></table><br>"
                }
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            demoPermits.featureReduction =
              newValue <= 36112 ? null : makeCluster;
          });
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue2) {
            demoPermits.popupEnabled =
              newValue2 <= 36112 ? true : false;
          });
        });

        view.when().then(function() {     
            view.watch("scale", function(newValue3) {
            demoPermits.renderer =
              (newValue3 > 9028 && newValue3 <= 36112 )  ? demoRenderTwo : demoRenderOne;
          });
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue4) {
            demoPermits.renderer =
              newValue4 <= 9028 ? demoRenderThree : demoRenderTwo;
          });
        });
    
/****************************Red Line Data*************************/
    
        const groupA = {
          type: "simple-fill", 
          color: [50, 168, 82, 1],
          style: "backward-diagonal",  
          outline: {
            color: [50, 168, 82, 1],
            width: 1,  
          }
        };
        
        const groupB = {
          type: "simple-fill", 
          color: [30, 118, 212, 1],
          style: "backward-diagonal",  
          outline: {
            color: [30, 118, 212, 1],
            width: 1,  
          }
        };
        
        const groupC = {
          type: "simple-fill", 
          color: [209, 154, 2, 1],
          style: "backward-diagonal",  
          outline: {
            color: [209, 154, 2, 1],
            width: 1,  
          }
        };
        
        const groupD = {
          type: "simple-fill", 
          color: [176, 9, 49, 1],
          style: "backward-diagonal",  
          outline: {
            color: [176, 9, 49, 1],
            width: 1,  
          }
        };
        
        const redRenderer = {
          type: "unique-value",
          field: "holc_grade",
          legendOptions: {
            title: "HOLC District Rating Score"
          },
          uniqueValueInfos: [{
            value: "A",
            symbol: groupA,
            label: "Grade A \"Best\""
          }, {
            value: "B",
            symbol: groupB,
            label: "Grade B \"Still Desirable\""
          }, {
            value: "C",
            symbol: groupC,
            label: "Grade C \"Definitely Declining\""
          }, {
            value: "D",
            symbol: groupD,
            label: "Grade D \"Hazardous\""
          }],
        };
    
        const groupA2 = {
          type: "simple-fill", 
          color: [50, 168, 82, 0.4],
          style: "backward-diagonal",  
          outline: {
            color: [50, 168, 82, 1],
            width: 2.5,  
          }
        };
        
        const groupB2 = {
          type: "simple-fill", 
          color: [30, 118, 212, 0.4],
          style: "backward-diagonal",  
          outline: {
            color: [30, 118, 212, 1],
            width: 2.5,  
          }
        };
        
        const groupC2 = {
          type: "simple-fill", 
          color: [209, 154, 2, 0.4],
          style: "backward-diagonal",  
          outline: {
            color: [209, 154, 2, 1],
            width: 2.5,  
          }
        };
        
        const groupD2 = {
          type: "simple-fill", 
          color: [176, 9, 49, 0.4],
          style: "backward-diagonal",  
          outline: {
            color: [176, 9, 49, 1],
            width: 2.5,  
          }
        };
        
        const redRendererTwo = {
          type: "unique-value",
          field: "holc_grade",
          legendOptions: {
            title: "HOLC District Rating Score"
          },
          uniqueValueInfos: [{
            value: "A",
            symbol: groupA2,
            label: "Grade A \"Best\""
          }, {
            value: "B",
            symbol: groupB2,
            label: "Grade B \"Still Desirable\""
          }, {
            value: "C",
            symbol: groupC2,
            label: "Grade C \"Definitely Declining\""
          }, {
            value: "D",
            symbol: groupD2,
            label: "Grade D \"Hazardous\""
          }],
        };
    
        
        var redLine = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/StLouis_Redline/FeatureServer",
          maxScale: 0,
          minScale: 500000,
          opacity: 0.8,    
          legendEnabled: true,
          visible: false,
          popupEnabled: true,
          popupTemplate: ({
                content: [
                    {
                        type: "text",
                        text: 
                        "<table style='width:100%'><tbody><tr style='border:0px solid;'><td align='center' style='padding:2px'><h3>Home Owners' Loan Corporation Boundary</h3></td></tr></tbody></table>"+"<table style='border:2px solid #d1d1d1; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='center' colspan='2' style='background-color: #d8cebc ;padding:5px'><b><h4>{expression/HOLC_Change}</h4></td></tr><tr><td align='justify' style='padding:5px; border: 1px solid #d1d1d1;' width='70%'><h6>Area receiving a {expression/HOLC_Change} Score from representatives of the federal government's Home Owner's Loan Corporation during surveys performed between 1935 and 1940.</h6></td></tr></tbody></table><br>"
                    }
                ],
              expressionInfos: arcadeExpressionInfos
            }),    
          renderer: redRenderer,
            labelingInfo: []
        });
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            redLine.renderer =
              newValue <= 18056 ? redRendererTwo: redRenderer;
          });
        });
    
/**************************Add Neighborhood Boundaries******************************/
    
        const neighborLabelSmall = { 
          symbol: {
            type: "text",  
            color: "#00679d",
            haloColor: "white",
            haloSize: 1,
            yoffset: 1,   
            font: { 
              family: "Montserrat",
              size: 7,
              weight: "normal"    
            } 
          },   
          labelPlacement: "center-center",
          labelExpressionInfo: {
            expression: "$feature.NHD_NAME"
          }
        };
    
        const neighborLabelLarge = { 
          symbol: {
            type: "text",  
            color: "#00679d",
            haloColor: "white",
            haloSize: 1.5,
            yoffset: 1,   
            font: { 
              family: "Montserrat",
              size: 10,
              weight: "normal"    
              
            } 
          },   
          labelPlacement: "center-center",
          labelExpressionInfo: {
            expression: "$feature.NHD_NAME"
          }
        };
    
        var allNeighbor = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/StLouis_Neighborhoods/FeatureServer", 
          maxScale: 0,
          minScale: 0,
          opacity: 1,    
          legendEnabled: true,
          visible: false,
          popupEnabled: false,    
          renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [255, 255, 255, 0],
                outline: {
                  color: "#00679d",
                  width: 1.25,
                  style: "solid"    
                }
              }
            },
            labelingInfo: [neighborLabelSmall]
        });
    
    
        view.when().then(function() {     
            view.watch("scale", function(newValue) {
            allNeighbor.labelingInfo =
              newValue <= 36112 ? [neighborLabelLarge]: [neighborLabelSmall];
          });
        });
 
        /****************************FAR Zoning Data*************************/
    
        const group_1 = {
          type: "simple-fill", 
          color: [255,255,190, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
        
        const group_2 = {
          type: "simple-fill", 
          color: [255, 255, 0, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
        
        const group_3 = {
          type: "simple-fill", 
          color: [229,215,159, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
        
        const group_4 = {
          type: "simple-fill", 
          color: [189, 163, 77, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
    
        const group_5 = {
          type: "simple-fill", 
          color: [168, 111, 0, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
    
        const group_6 = {
          type: "simple-fill", 
          color: [255, 190, 190, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
        
        const group_7 = {
          type: "simple-fill", 
          color: [255, 169, 0, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
    
        const group_8 = {
          type: "simple-fill", 
          color: [255, 85, 0, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
        
        const group_9 = {
          type: "simple-fill", 
          color: [168, 0, 0, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
    
        const group_10 = {
          type: "simple-fill", 
          color: [205, 205, 205, 1],
          //style: "backward-diagonal",  
          outline: {
            color: [0,0,0, .7],
            width: 0.5,  
          }
        };
        
        const farRenderer = {
          type: "unique-value",
          field: "ZoneDescr",
          legendOptions: {
            title: "St. Louis Zoning Districts"
          },
          //defaultSymbol: { type: "simple-fill" },  
          uniqueValueInfos: [{
            value: "Multi-Zoned",
            symbol: group_1,
            //label: "Commercial"
          }, {
            value: "Single Family Residential",
            symbol: group_2,
            //label: "Industrial"
          }, {
            value: "Multiple Family Residential",
            symbol: group_3,
            //label: "Residential"
          }, {
            value: "Neighborhood Commercial",
            symbol: group_4,
            //label: "Special Purpose"
          },{
            value: "Local Commercial and Office",
            symbol: group_5,
            //label: "Commercial"
          }, {
            value: "Area Commercial",
            symbol: group_6,
            //label: "Industrial"
          }, {
            value: "Central Business",
            symbol: group_7,
            //label: "Residential"
          }, {
            value: "Industrial",
            symbol: group_8,
           //label: "Special Purpose"
          },{
            value: "Unrestricted",
            symbol: group_9,
            //label: "Commercial"
          }, {
            value: "Jefferson National Memorial",
            symbol: group_10,
            //label: "Industrial"
          }],
        };
    
        var zoningBounds = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/STL_Zoning/FeatureServer",
          definitionExpression: "LAYER <> 'X'",
          maxScale: 0,
          minScale: 0,
          opacity: 0.5,    
          legendEnabled: true,
          visible: false,
          popupEnabled: true,
          popupTemplate: ({
                content: [
                    {
                        type: "text",
                        text: "<table style='width:100%'><tbody><tr style='border:0px solid'><td align='center' style='padding:2px'><h3>Zoning Districts</h3></td></tr></tbody></table>"+"<table style='border:2px solid #b8b8b8; border-collapse:collapse; width:100%'><tbody><tr style='border:2px solid #d1d1d1'><td align='left' colspan='2' style='background-color: #d8cebc ;padding:5px'><h4>{ZoneDescr} District</h4></td></tr><tr><td align='center' style='text-align: center; border: 1px solid #d1d1d1; padding: 5px;' width='30%'><h5>More Information</h5></td><td align='center' style='padding:5px; border: 1px solid #b8b8b8;' width='70%'><h6><a href='https://library.municode.com/mo/st._louis/codes/code_of_ordinances?nodeId=RECOSALO2020AN_TIT26ZO' target='_blank'>Learn more about {ZoneDescr} Zoning Districts</a></h6></td></tr></tbody></table><br>"
                    }
                ],
              expressionInfos: arcadeExpressionInfos
            }),    
          renderer: farRenderer,
            labelingInfo: []
        });

    
        var cityLimits = new FeatureLayer({
          url: "https://services3.arcgis.com/8mRVhBBtAu5eqZUu/arcgis/rest/services/StLouis_Boundary/FeatureServer",
          legendEnabled: false,
          visible: true,
          maxScale: 0,
          minScale: 0,
          legendEnabled: true,    
          renderer: {
              type: "simple", 
              symbol: {
                type: "simple-fill",
                color: [255, 255, 255, 0],
                outline: {
                  color: "#202f49",
                  width: 1,
                  style: "solid"    
                }
              }
            }
        });

        map.addMany([cartoBasemap, nonStudyTracts, popTracts, housingTracts, incomeTracts, zoningBounds, nrhpHd, localHd, Haan, allNeighbor, redLine, ctaLinesBack, ctaLines, ctaStations, collUniv, cityLimits, demoPermits, nrhpSites, htcProj]);  
    
        view.ui.move("zoom", 'bottom-right');
    
        /*var homeWidget = new Home({
            view: view
        });
          
        view.ui.add(homeWidget, "bottom-right");*/
    
        
/***********************Search Widgets************************/
        
        var addSearch = new Search({
              view: view,
              includeDefaultSources: true,
              locationEnabled: false,    
              container: "addSearch",
              container: "addSearch",
              popupEnabled: false 
        });

    
        var neighborSearch = new Search({
                view: view,
                includeDefaultSources: false,
                locationEnabled: false,
                sources: [
                    {
                        layer: allNeighbor,
                        searchFields: ["NHD_NAME"],
                        displayField: "NHD_NAME",
                        exactMatch: false,
                        placeholder: "Enter a Neighborhood Name",
                        name: "St. Louis Neighborhoods"
                    }
                  ],
                  container: "neighborSearch",
                  //popupEnabled: true,
                  
                  
            });
    
        var localHdSearch = new Search({
                view: view,
                includeDefaultSources: false,
                locationEnabled: false,
                allPlaceholder: "Enter a Historic District Name",
                sources: [
                    {
                        layer: localHd,
                        searchFields: ["DSTNAME"],
                        displayField: "DSTNAME",
                        exactMatch: false,
                        placeholder: "Enter a District Name",
                        name: "Local Historic Districts"
                    }
                  ],
                  container: "locHdSearch",
                  popupEnabled: true,   
            });
    
    
        var nrhpHdSearch = new Search({
                view: view,
                includeDefaultSources: false,
                locationEnabled: false,
                allPlaceholder: "Enter a Historic District Name",
                sources: [
                    {
                        layer: nrhpHd,
                        searchFields: ["HST_NAME"],
                        displayField: "HST_NAME",
                        exactMatch: false,
                        placeholder: "Enter a District Name",
                        name: "National Register Historic Districts"
                    }
                  ],
                  container: "nrHDSearch",
                  popupEnabled: true,   
            });
        
/***********************All Layer Buttons*********************/
                     
    
        var layerButton1 = document.getElementById("layerButton1");

        layerButton1.addEventListener("click", function() {
            if (popTracts.visible == false) {
                popTracts.visible = true;
                nonStudyTracts.visible = true;
                housingTracts.visible = false;
                incomeTracts.visible = false;
                $(".housChloro").removeClass('pressed', 0);
                $(".incChloro").removeClass('pressed', 0);
                $(".popChloro").removeClass('pressed', 0);
                $("#layerButton2").prop('checked', false);
                $("#layerButton3").prop('checked', false);
            } else {
               popTracts.visible = false;
                nonStudyTracts.visible = false;
                $(".popChloro").addClass('pressed', 0);
                $(".housChloro").removeClass('pressed', 0);
                $(".incChloro").removeClass('pressed', 0);
                
            }
        });
    
        var layerButton2 = document.getElementById("layerButton2");

        layerButton2.addEventListener("click", function() {
            if (housingTracts.visible == false) {
                housingTracts.visible = true;
                nonStudyTracts.visible = true;
                popTracts.visible = false;
                incomeTracts.visible = false;
                $(".housChloro").addClass('pressed', 0);
                $(".popChloro").addClass('pressed', 0);
                $(".incChloro").removeClass('pressed', 0);
                $("#layerButton1").prop('checked', false);
                $("#layerButton3").prop('checked', false);
            } else if (housingTracts.visible == true) {
                housingTracts.visible = false;
                nonStudyTracts.visible = false;
                $(".housChloro").removeClass('pressed', 0);
                $(".popChloro").addClass('pressed', 0);
                $(".incChloro").removeClass('pressed', 0);
            }
        });
    
        var layerButton3 = document.getElementById("layerButton3");

        layerButton3.addEventListener("click", function() {
            if (incomeTracts.visible == false) {
                incomeTracts.visible = true;
                nonStudyTracts.visible = true;
                popTracts.visible = false;
                housingTracts.visible = false;
                $(".housChloro").removeClass('pressed', 0);
                $(".popChloro").addClass('pressed', 0);
                $(".incChloro").addClass('pressed', 0);
                $("#layerButton2").prop('checked', false);
                $("#layerButton1").prop('checked', false);
            } else if (incomeTracts.visible == true) {
                incomeTracts.visible = false;
                nonStudyTracts.visible = false;
                $(".housChloro").removeClass('pressed', 0);
                $(".popChloro").addClass('pressed', 0);
                $(".incChloro").removeClass('pressed', 0);
            }
        });
        
        var layerButton4 = document.getElementById("layerButton4");

        layerButton4.addEventListener("click", function() {
            if (Haan.visible == true) {
                Haan.visible = false;
                $(".haan").addClass('pressed', 0);
            } else if (Haan.visible == false) {
                Haan.visible = true;
                $(".haan").removeClass('pressed', 0);
            }
        });
    
        var layerButton5 = document.getElementById("layerButton5");

        layerButton5.addEventListener("click", function() {
            if (zoningBounds.visible == false) {
                zoningBounds.visible = true;
                $(".zone").show();
                $(".zoneFilter").show();
                $(".zoneFilterText").show();
            } else if (zoningBounds.visible == true) {
                zoningBounds.visible = false;
                $(".zone").hide();
                $(".zoneFilter").hide();
                $(".zoneFilterText").hide();
            }
        });
             
        var layerButton6 = document.getElementById("layerButton6");

        layerButton6.addEventListener("click", function() {
            if (allNeighbor.visible == false) {
                allNeighbor.visible = true;
                $(".neighbor").addClass('pressed', 0);
                $(".neighSearch").show();
                $(".neighSearchText").show();
            } else if (allNeighbor.visible == true) {
                allNeighbor.visible = false;
                $(".neighbor").removeClass('pressed', 0);
                $(".neighSearch").hide();
                $(".neighSearchText").hide();
                neighborSearch.clear();
            }
        });
    
        var layerButton7 = document.getElementById("layerButton7");

        layerButton7.addEventListener("click", function() {
            if (ctaLines.visible == false) {
                ctaLines.visible = true;
                ctaLinesBack.visible = true;
                ctaStations.visible = true;
                $(".mta").show();
            } else if (ctaLines.visible == true) {
                ctaLines.visible = false;
                ctaLinesBack.visible = false;
                ctaStations.visible = false;
                $(".mta").hide();
            }
        });
    
        var layerButton8 = document.getElementById("layerButton8");

        layerButton8.addEventListener("click", function() {
            if (collUniv.visible == false) {
                collUniv.visible = true;
                $(".coll").addClass('pressed',0);
            } else if (collUniv.visible == true) {
                collUniv.visible = false;
                $(".coll").removeClass('pressed',0);
            }
        });
    
        var layerButton9 = document.getElementById("layerButton9");

        layerButton9.addEventListener("click", function() {
            if (htcProj.visible == false) {
                htcProj.visible = true;
                $(".htc").addClass('pressed',0);
            } else if (htcProj.visible == true) {
                htcProj.visible = false;
                $(".htc").removeClass('pressed',0);

            }
        });
    
        var layerButton10 = document.getElementById("layerButton10");

        layerButton10.addEventListener("click", function() {
            if (demoPermits.visible == false) {
                demoPermits.visible = true;
                $('.demoAll').show();
                //$('.demoCluster').show();
            } else if (demoPermits.visible == true) {
                demoPermits.visible = false;
                $('.demoAll').hide();
                //$('.demoCluster').hide();
            }
        });
    
    ////////////////////
    
        view.when().then(function() {
                $('#layerButton10').change(function(){
                if($(this).is(":checked")) {
                    view.watch("scale", function(newValue) {  
                    if (newValue > 36112) {
                        $('.demoCluster').show();
                        $('.demo').hide();
                        } else if (newValue <= 36112) {
                        $('.demo').show();
                        $('.demoCluster').hide();    
                        } else {

                        }
                  });    
                } else if ($(this).not(":checked")){
                    view.watch("scale", function(newValue) {  
                    if (newValue > 36112) {
                        $('.demoCluster').show();
                        } else if (newValue <= 36112) {
                            
                        } else {

                        }
                  });
                }
            });
        });
        
    //////////////////////
    
        var layerButton11 = document.getElementById("layerButton11");

        layerButton11.addEventListener("click", function() {
            if (localHd.visible == false) {
                localHd.visible = true;
                $(".locHd").addClass('pressed',0);
                $(".locHDSearchText").show();
                $(".locHdSearch").show();
            } else if (localHd.visible == true) {
                localHd.visible = false;
                $(".locHd").removeClass('pressed',0);
                $(".locHDSearchText").hide();
                $(".locHdSearch").hide();
                localHdSearch.clear();
            }
        });
    
        var layerButton12 = document.getElementById("layerButton12");

        layerButton12.addEventListener("click", function() {
            if (nrhpSites.visible == false) {
                nrhpSites.visible = true;
                $('.nrSite').show();
            } else if (nrhpSites.visible == true) {
                nrhpSites.visible = false;
                $('.nrSite').hide();
            }
        });
    
        var layerButton13 = document.getElementById("layerButton13");

        layerButton13.addEventListener("click", function() {
            if (nrhpHd.visible == false) {
                nrhpHd.visible = true;
                $(".nrHd").addClass('pressed',0);
                $(".nrHDSearchText").show();
                $(".nrHdSearch").show();
            } else if (nrhpHd.visible == true) {
                nrhpHd.visible = false;
                $(".nrHd").removeClass('pressed',0);
                $(".nrHDSearchText").hide();
                $(".nrHdSearch").hide();
                nrhpHdSearch.clear();
            }
        });
    
        var layerButton14 = document.getElementById("layerButton14");

        layerButton14.addEventListener("click", function() {
            if (redLine.visible == false) {
                redLine.visible = true;
                $(".holc").show();
                $(".holcFilterText").show();
                $(".holcFilter").show();
            } else if (redLine.visible == true) {
                redLine.visible = false;
                $(".holc").hide();
                $(".holcFilterText").hide();
                $(".holcFilter").hide();
            }
        });
    
    
        /*$(() => {
            'use strict';
            $("#About").click(function() {
                var $this = $(this);
                $this.toggleClass('pressed', 0);
            });
        });
    
        $(document).ready(function(){
            $("#About").click(function(){
                $("#About-Div").slideToggle(300);
                $("#Tutorial-Div").slideUp(300);
                $("#Tutorial").removeClass('pressed', 0);
            })
        })*/
    
        $(() => {
            'use strict';
            $("#Tutorial").click(function() {
                var $this = $(this);
                $this.toggleClass('pressed', 0);
            });
        });
    
    
        $(document).ready(function(){
            $("#Tutorial").click(function(){
                $("#Tutorial-Div").slideToggle(300);
                $("#About-Div").slideUp(300);
                $("#About").removeClass('pressed', 0);
            })
        })
    
        $(document).ready(function(){
            $("#closeX").click(function(){
                $("#About-Div").slideUp(300);
                $("#About").removeClass('pressed', 0);
            })
        })
    
        $(document).ready(function(){
            $("#closeX2").click(function(){
                $("#Tutorial-Div").slideUp(300);
                $("#Tutorial").removeClass('pressed', 0);
            })
        })
        
        $(document).ready(function(){
            $("#toggle").click(function(){
                $("#Main-Div").fadeToggle(500);  
            })
        })
    
        $(window).on('resize', function(event){
            var windowSize = $(window).width();
                if(windowSize > 1300){
                    $("#Main-Div").fadeIn(0);
                    $("#toggle").prop("checked", false);
                } else {
                    $("#Main-Div").fadeOut(0);
                    $("#toggle").prop("checked", false);
                }
        })
 
/*************************Layer Opacity Controls*******************************/
    
        var slider1 = document.getElementById("slider1");
        
        const layerSelect = document.getElementById("opacFilter");
        layerSelect.addEventListener("change", function(event) {
          const value = event.target.value;
          switch (value) {    
            case "select":
                slider1.oninput = function() {
                    null.opacity = this.value/100;
                }
              break;
            case "popTracts":
                slider1.oninput = function() {
                    popTracts.opacity = this.value/100;
                }
              break;
            case "housingTracts":
                slider1.oninput = function() {
                    housingTracts.opacity = this.value/100;
                }
              break;
            case "incomeTracts":
                slider1.oninput = function() {
                    incomeTracts.opacity = this.value/100;
                }
              break;
            case "haan":
                slider1.oninput = function() {
                    Haan.opacity = this.value/100;
                }
              break;      
            case "zoningBounds":
                slider1.oninput = function() {
                    zoningBounds.opacity = this.value/100;
                }
              break;
            case "demoPermits":
                slider1.oninput = function() {
                    demoPermits.opacity = this.value/100;
                }
              break;      
            case "localHd":
                slider1.oninput = function() {
                    localHd.opacity = this.value/100;
                }
                break;      
            case "nrhpSites":
                slider1.oninput = function() {
                    nrhpSites.opacity = this.value/100;
                }
              break;      
            case "nrhpHd":
                slider1.oninput = function() {
                    nrhpHd.opacity = this.value/100;
                }
              break;
            case "redLine":
                slider1.oninput = function() {
                    redLine.opacity = this.value/100;
                }
              break;   
            case "allNeighbor":
                slider1.oninput = function() {
                    allNeighbor.opacity = this.value/100;
                }
              break;
            case "ctaLines":
                slider1.oninput = function() {
                    ctaLines.opacity = this.value/100;
                    ctaLinesBack.opacity = this.value/100;
                }
              break;            
           }
        });
    
        //Reset Button for all Layers
    
        var opacRes = document.getElementById("button-2");

        opacRes.addEventListener("click", function() {
            popTracts.opacity = 0.4;
            housingTracts.opacity = 0.4;
            incomeTracts.opacity = 0.4;
            zoningBounds.opacity = 0.5;	 
            demoPermits.opacity = 0.9;     
            localHd.opacity = 0.9;
            nrhpSites.opacity = 0.8;
            nrhpHd.opacity = 0.9;
            redLine.opacity = 0.8;
            allNeighbor.opacity = 1;
            ctaLines.opacity = 0.8;
            slider1.value = 50;
            opacFilter.value="select"; 
            value.html(range.attr('value') + "%");
        });
    
        //Range Slider Javascript

        var range = $('.input-range'),
            value = $('.range-value'),
            hidden = $('.hidden-value');

        value.html(range.attr('value') + "%");
        hidden.val(range.attr('value'));

        range.on('input', function(){
            value.html(this.value + "%");
            hidden.val(this.value);
        });
        
        /*************************Layer Filter Controls************************/
    
    view.when().then(function() {
      view.whenLayerView(redLine).then(function(layerView) {
        const filterSelect = document.getElementById("holcFilter");
        
        filterSelect.addEventListener("change", function(event) {
          const newValue = event.target.value;
          const whereClause = newValue
            ? "holc_grade = '" + newValue + "'"
            : null;
          layerView.filter = {      
            where: whereClause
          };
        });
      });
    });
    
    
    view.when().then(function() {
      view.whenLayerView(zoningBounds).then(function(layerView) {
        const filterSelect = document.getElementById("zoneFilter");
        
        filterSelect.addEventListener("change", function(event) {
          const newValue = event.target.value;
          const whereClause = newValue
            ? "ZoneDescr = '" + newValue + "'"
            : null;
          layerView.filter = {      
            where: whereClause
          };
        });
      });
    });
   
/*****************Add Cookie Functionality for Splash Screen****************/
 
  jQuery(document).ready(function(){ 
  jQuery('#button-1, #popup-container a.close').click(function(){
      jQuery('#popup-container').fadeOut();
      jQuery('#active-popup').fadeOut();
  });
      
  var visits = jQuery.cookie('visits') || 0;
  visits++;

      
  $('#cookieToggle').change(function() {
    if($(this).is(":checked")) {
      $.cookie('visits', visits, { expires: 6, path:'/' });
    } else {
      $.removeCookie('visits', { path: '/' });
    }
  });
      
  //jQuery.cookie('visits', visits, { expires: 6, path:'/' });

  console.debug(jQuery.cookie('visits'));

  if ( jQuery.cookie('visits') > 0 ) {
    jQuery('#active-popup').hide();
    jQuery('#popup-container').hide();
  }else {
      var pageHeight = jQuery(document).height();
      jQuery('<div id="active-popup"></div>').insertBefore('body');
      jQuery('#active-popup').css("height", pageHeight);
      jQuery('#popup-container').show();
  }
  if (jQuery.cookie('noShowWelcome')) { jQuery('#popup-container').hide(); jQuery('#active-popup').hide(); }
});

/*jQuery(document).mouseup(function(e){
  var container = jQuery('#popup-container');
  if( !container.is(e.target)&& container.has(e.target).length === 0)
  {
    container.fadeOut();
    jQuery('#active-popup').fadeOut();
  }
});*/
    
/**********************Relaunch Splash Button*********************/     
    
    $(document).ready(function(){
        $("#About").click(function(){
          $('#popup-container').show();
          $('#active-popup').show();
        })
    })    
    
/**********************Fix for Touch Screen Zoom Issue*********************/    
  
  view.surface.addEventListener("touchmove", function(event) {  
    event.preventDefault();  
  }) 
  
      
});




    