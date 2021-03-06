(function (global) {
  var title = global.document.title;
  var dropDownItems = [
    ["ASCII Code", "index.html", "ASCII Code - The Extended ASCII Table"],
    ["HTML Entities", "entities.html"],
    ["HTTP Status Codes", "http_status_codes.html"],
    [
      "Country Dialling Codes",
      "countries_dialling_codes.html",
      "Dialling Codes",
    ],
  ];
  var indexesObj = {
    "ASCII Code": 0,
    "HTML Entities": 1,
    "HTTP Status Codes": 2,
    "Country Dialling Codes": 3,
  };
  var dropDownList = document.querySelector(".drop-down-list");
  var createLi = function (item) {
    return `<li><a href="${item[1]}">${item[0]}</a></li>`;
  };
  var updateDropDownList = function (name) {
    var list = "";
    for (var i = 0; i < dropDownItems.length; i++) {
      if (name !== dropDownItems[i][0]) {
        list += createLi(dropDownItems[i]);
      }
    }
    dropDownList.innerHTML = list;
  };
  var getHeadingText = function (name) {
    var obj = {
      smaller: "",
      bigger: "",
    };
    var item = dropDownItems[indexesObj[name]];
    if (item.length > 2 && item[0].length >= item[2].length) {
      obj.bigger = item[0];
      obj.smaller = item[2];
    } else {
      obj.smaller = item[0];
      obj.bigger = item[2];
    }
    return obj;
  };
  window.onload = function () {
    var btns = document.querySelectorAll("tbody tr .tb-plusbtn");
    for (var i = 0; i < btns.length; i++) {
      btns[
        i
      ].innerHTML = `<a href="#"class="text-primary"><svg class="svg-inline--fa fa-plus-square fa-w-14"aria-hidden="true"data-prefix="fa"data-icon="plus-square"role="img"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 448 512"data-fa-i2svg=""><path class="fas fa-plus-square"fill="currentColor"d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg></a>`;
    }
    if (window.innerWidth <= 720) {
      var h1 = global.document.querySelector("h1");
      var heading = getHeadingText(title);
      h1.textContent = heading.smaller;
      updateDropDownList(title);
    } else if (window.innerWidth <= 900) {
      updateDropDownList(title);
    }
  };
  var pluginFactory = PluginFactory(["scrollToPlugin"]);
  var updateTable;
  var toUpdateTable = false;
  switch (title) {
    case "ASCII Code":
      toUpdateTable = true;
      pluginFactory.use.scrollToPlugin();
      var tableData = {
        "tb-description": "Description",
        "tb-binary": "Binary",
        "tb-htmlname": "HTML Name",
        "tb-htmlnumber": "HTML Number",
      };
      var paraData = {
        2: "tb-description",
        1: "tb-binary",
        0: "tb-htmlname tb-htmlnumber",
      };
      var getParaData = function () {
        var data = [];
        if (window.innerWidth <= 720) {
          data.push(0);
        }
        if (window.innerWidth <= 825) {
          data.push(1);
        }
        if (window.innerWidth <= 1140) {
          data.push(2);
        }
        return data;
      };
      pluginFactory.addSupportForPlugin("responsiveTablePlugin");
      updateTable = pluginFactory.use.responsiveTablePlugin(
        tableData,
        paraData,
        getParaData
      );
      break;
    case "HTML Entities":
      toUpdateTable = true;
      var tableData = {
        "tb-description": "Description",
        "tb-htmlnumber": "Entity number",
      };
      var paraData = {
        1: "tb-description",
        0: "tb-htmlnumber",
      };
      var getParaData = function () {
        var data = [];
        if (window.innerWidth <= 720) {
          data.push(0);
        }
        if (window.innerWidth <= 1140) {
          data.push(1);
        }
        console.log(data);
        return data;
      };
      pluginFactory.addSupportForPlugin("responsiveTablePlugin");
      updateTable = pluginFactory.use.responsiveTablePlugin(
        tableData,
        paraData,
        getParaData
      );
      break;
    case "HTTP Status Codes":
      pluginFactory.use.scrollToPlugin();
      break;
    case "Country Dialling Codes":
      pluginFactory.addSupportForPlugin("filterDataPlugin");
      pluginFactory.deletePlugin("scrollToPlugin");
      var request = new XMLHttpRequest();
      var filterCountries = function (objQuery, textQuery, countriesObj) {
        var filteredCountries;
        if (objQuery === "All Continents") {
          filteredCountries = "";
          Object.keys(countriesObj).map(function (continent) {
            var countries = countriesObj[continent].filter(function (value) {
              return (
                value[0].toLowerCase().includes(textQuery.toLowerCase()) ||
                value[1].includes(textQuery)
              );
            });
            filteredCountries += createTable(countries, continent);
          });
        } else {
          filteredCountries = countriesObj[objQuery].filter(function (value) {
            return (
              value[0].toLowerCase().includes(textQuery.toLowerCase()) ||
              value[1].includes(textQuery)
            );
          });
        }
        return filteredCountries;
      };
      var createTable = function (array, continentName) {
        var len = array.length;
        if (len !== 0) {
          var table = `<h3>${continentName}</h3><table class="content-table"><thead><tr><th>Country</th><th>Dialling Code</th></tr></thead><tbody>`;
          for (var i = 0; i < len; i++) {
            table += `<tr><td>${array[i][0]}</td><td>${array[i][1]}</td></tr>`;
          }
          table += `</tbody></table>`;
          return table;
        }
        return `<h3 style="margin:1rem 0">${continentName}(no matches)</h3>`;
      };
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          var myCountries = JSON.parse(request.response);
          pluginFactory.use.filterDataPlugin(function (
            continentName,
            searchQuery,
            clicked
          ) {
            var table;
            if (clicked) {
              if (
                continentName.value !== "All Continents" ||
                searchQuery.value !== ""
              ) {
                continentName.value = "All Continents";
                searchQuery.value = "";
                console.log("Clicked");
                table = filterCountries("All Continents", "", myCountries);
                global.setTimeout(function () {
                  global.document.getElementById(
                    "countries_table"
                  ).innerHTML = table;
                }, 150);
              }
            } else {
              if (continentName === "All Continents") {
                table = filterCountries(
                  continentName,
                  searchQuery,
                  myCountries
                );
              } else {
                table = createTable(
                  filterCountries(continentName, searchQuery, myCountries),
                  continentName
                );
              }
              global.setTimeout(function () {
                global.document.getElementById(
                  "countries_table"
                ).innerHTML = table;
              }, 150);
            }
          });
        }
      };
      request.open("GET", "data/countries.json", true);
      request.send();
      break;
  }
  window.matchMedia("(max-width: 720px)").addListener(function (query) {
    var h1 = global.document.querySelector("h1");
    var heading = getHeadingText(title);
    if (query.matches) {
      h1.textContent = heading.smaller;
      if (toUpdateTable) {
        updateTable();
      }
    } else {
      h1.textContent = heading.bigger;
      if (toUpdateTable) {
        updateTable();
      }
    }
  });
  window.matchMedia("(max-width: 900px)").addListener(function (query) {
    if (query.matches) {
      updateDropDownList(title);
    } else {
      dropDownList.innerHTML = "";
    }
  });
  if (toUpdateTable) {
    window.matchMedia("(max-width:825px)").addListener(function (query) {
      if (query.matches) {
        updateTable();
      } else {
        updateTable();
      }
    });
    window.matchMedia("(max-width:1140px)").addListener(function (query) {
      console.log("1140px");
      if (query.matches) {
        updateTable();
      } else {
        updateTable(true);
      }
    });
  }
})(window);
