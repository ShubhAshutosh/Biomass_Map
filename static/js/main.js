document.addEventListener("DOMContentLoaded", () => {
  let currentView = "india";
  let plantData = {};
  let currentChart = null;
<<<<<<< HEAD

  // --- NEW: Variables for Distance Calculator ---
  let allPlantNames = [];
  let selectedPlant1 = null;
  let selectedPlant2 = null;
  // --- END NEW ---
=======
  
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  // This stateListContainer will be hidden and only used when triggered from the context menu
  const stateListContainer = document.getElementById("state-list-container");
  stateListContainer.style.maxHeight = "400px";
  stateListContainer.style.overflowY = "scroll";
  stateListContainer.style.border = "1px solid #ccc";
  stateListContainer.style.padding = "10px";
  stateListContainer.style.margin = "20px auto";
  stateListContainer.style.width = "300px";
  stateListContainer.style.backgroundColor = "#f9f9f9";
  stateListContainer.style.display = "none"; // Initially hidden

  const stateButtons = [];
  states.forEach((state) => {
    const stateButton = document.createElement("div");
    stateButton.className = "state-button";
    stateButton.innerHTML = `
            <span>${state}</span>
            <button class="view-details-btn">View Details</button>
        `;

    const viewDetailsBtn = stateButton.querySelector(".view-details-btn");
    viewDetailsBtn.onclick = () => {
      fetch(`/api/biomass?state=${encodeURIComponent(state)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            showStateDetails(state, data);
          }
        })
        .catch((error) => console.error("Error fetching biomass data:", error));
    };
    stateButtons.push(stateButton);
    stateListContainer.appendChild(stateButton);
  });
<<<<<<< HEAD

  // --- NEW: Event Listeners and Functions for Distance Calculator ---
  const distanceBtn = document.getElementById("distance-btn");
  const distanceInputs = document.getElementById("distance-inputs");
  const plant1Input = document.getElementById("plant1-input");
  const plant2Input = document.getElementById("plant2-input");
  const plant1Options = document.getElementById("plant1-options");
  const plant2Options = document.getElementById("plant2-options");
  const calculateDistanceBtn = document.getElementById("calculate-distance-btn");
  const distanceResult = document.getElementById("distance-result");
  const tutorialBtn = document.getElementById("tutorial-btn");
  const tutorialModal = document.getElementById("tutorial-modal");
  const closeTutorial = document.querySelector(".close-tutorial");

  distanceBtn.addEventListener("click", () => {
    distanceInputs.style.display = distanceInputs.style.display === "none" ? "flex" : "none";
  });

  tutorialBtn.addEventListener("click", () => {
    tutorialModal.style.display = "block";
  });

  closeTutorial.addEventListener("click", () => {
    tutorialModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === tutorialModal) {
      tutorialModal.style.display = "none";
    }
  });

  calculateDistanceBtn.addEventListener("click", () => {
    if (selectedPlant1 && selectedPlant2) {
      distanceResult.textContent = "Calculating...";
      fetch(`/api/distance?origin=${selectedPlant1}&destination=${selectedPlant2}`)
        .then(response => response.json())
        .then(data => {
          distanceResult.textContent = data.distance ? `Distance: ${data.distance}` : (data.error || "Could not calculate distance.");
        })
        .catch(error => {
            console.error("Error fetching distance:", error);
            distanceResult.textContent = "Error fetching distance.";
        });
    } else {
      distanceResult.textContent = "Please select two plants from the list.";
    }
  });

  function populatePlantDataForAutocomplete(data) {
    allPlantNames = Object.values(data)
      .flat()
      .filter(plant => plant["Sponge Iron Plant"] && plant["City/ District"])
      .map((plant) => ({ name: plant["Sponge Iron Plant"], city: plant["City/ District"] }));
    allPlantNames.sort((a, b) => a.name.localeCompare(b.name));

    autocomplete(plant1Input, plant1Options, allPlantNames, (plant) => {
      selectedPlant1 = plant.city;
    });
    autocomplete(plant2Input, plant2Options, allPlantNames, (plant) => {
      selectedPlant2 = plant.city;
    });
  }

  function autocomplete(inputElement, optionsContainer, plantList, onSelect) {
    inputElement.addEventListener("input", function() {
      const value = this.value.toLowerCase();
      optionsContainer.innerHTML = "";
      if (!value) {
        optionsContainer.style.display = "none";
        return;
      }
      const filteredPlants = plantList.filter(plant => plant.name.toLowerCase().includes(value));
      filteredPlants.slice(0, 10).forEach(plant => {
        const li = document.createElement("li");
        li.textContent = plant.name;
        li.addEventListener("click", function() {
          inputElement.value = plant.name;
          onSelect(plant);
          optionsContainer.style.display = "none";
        });
        optionsContainer.appendChild(li);
      });
      optionsContainer.style.display = filteredPlants.length > 0 ? "block" : "none";
    });

    document.addEventListener("click", function(event) {
      if (event.target !== inputElement && !optionsContainer.contains(event.target)) {
        optionsContainer.style.display = "none";
      }
    });
  }
  // --- END NEW ---

  function showStateDetails(state, data) {
    const modal = document.getElementById("biomass-modal") || createModal();

=======
  
  function showStateDetails(state, data) {
    const modal = document.getElementById("biomass-modal") || createModal();
    // Format the state data into an HTML table
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const tableRows = data
      .map(
        (item, index) => `
    <tr>
        <td>${index === 0 ? "Total Biomass" : "Total Surplus"}</td>
        <td>${item["Wheat"] || "N/A"}</td>
        <td>${item["Rice"] || "N/A"}</td>
        <td>${item["Maize"] || "N/A"}</td>
        <td>${item["Bajra"] || "N/A"}</td>
        <td>${item["Sugarcane"] || "N/A"}</td>
        <td>${item["Groundnut"] || "N/A"}</td>
        <td>${item["Rapeseed Mustard"] || "N/A"}</td>
        <td>${item["Arhar/Tur"] || "N/A"}</td>
        <td>${item["Total Crops"] || "N/A"}</td>
    </tr>
`
      )
      .join("");

    const content = `
    <div class="modal-content">
        <h3>${state} - Biomass Details</h3>
        <div style="overflow-x: auto;">
            <table>
                <thead>
                    <tr>
                        <th></th> 
                        <th>Wheat</th>
                        <th>Rice</th>
                        <th>Maize</th>
                        <th>Bajra</th>
                        <th>Sugarcane</th>
                        <th>Groundnut</th>
                        <th>Rapeseed Mustard</th>
                        <th>Arhar/Tur</th>
                        <th>Sum</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
         <p style="text-align: center; font-style: italic; margin-top: 10px;">* unit = 1000 tonnes per annum</p>
    </div>
`;

    modal.innerHTML = content;
    modal.id = "biomass-modal";
    modal.style.display = "block";
  }

<<<<<<< HEAD
  function showAllStatesBiomassData() {
=======
  // New function to show all states biomass data in a modal
  function showAllStatesBiomassData() {
    // Create a modal specifically for the biomass state list
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const modal = document.createElement("div");
    modal.id = "biomass-states-modal";
    modal.className = "modal";
    modal.style.display = "block";
    modal.style.zIndex = "9999999";

<<<<<<< HEAD
=======
    // Create modal content container
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.style.maxWidth = "600px";
    modalContent.style.padding = "20px";
    modalContent.style.margin = "50px auto";
    modalContent.style.backgroundColor = "#fff";
    modalContent.style.borderRadius = "8px";
    modalContent.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

<<<<<<< HEAD
=======
    // Add header and close button
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "20px";

    const title = document.createElement("h3");
    title.textContent = "Biomass Details by State";
    title.style.margin = "0";

    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontWeight = "bold";
    closeBtn.onclick = () => (modal.style.display = "none");

    header.appendChild(title);
    header.appendChild(closeBtn);
    modalContent.appendChild(header);

<<<<<<< HEAD
=======
    // Create list of state buttons
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const stateList = document.createElement("div");
    stateList.style.maxHeight = "500px";
    stateList.style.overflowY = "auto";

    states.forEach((state) => {
      const stateButton = document.createElement("div");
      stateButton.className = "state-biomass-button";
      stateButton.style.display = "flex";
      stateButton.style.justifyContent = "space-between";
      stateButton.style.alignItems = "center";
      stateButton.style.padding = "10px";
      stateButton.style.margin = "5px 0";
      stateButton.style.borderBottom = "1px solid #eee";

      const stateName = document.createElement("span");
      stateName.textContent = state;

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View Details";
      viewBtn.style.padding = "5px 10px";
      viewBtn.style.backgroundColor = "#4CAF50";
      viewBtn.style.color = "white";
      viewBtn.style.border = "none";
      viewBtn.style.borderRadius = "4px";
      viewBtn.style.cursor = "pointer";

      viewBtn.onclick = () => {
<<<<<<< HEAD
        modal.style.display = "none";

=======
        // Close the state list modal
        modal.style.display = "none";

        // Fetch and display this state's biomass data
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
        fetch(`/api/biomass?state=${encodeURIComponent(state)}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              showStateDetails(state, data);
            }
          })
          .catch((error) =>
            console.error("Error fetching biomass data:", error)
          );
      };

      stateButton.appendChild(stateName);
      stateButton.appendChild(viewBtn);
      stateList.appendChild(stateButton);
    });

    modalContent.appendChild(stateList);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

<<<<<<< HEAD
=======
    // Close when clicking outside
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    modal.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  function toggleBiomassContainer(show) {
    const stateListContainer = document.getElementById("state-list-container");
    if (stateListContainer) {
<<<<<<< HEAD
      stateListContainer.style.display = "none";
    }
  }

=======
      stateListContainer.style.display = "none"; // Always hide, we'll use the context menu option
    }
  }

  // Function to load biomass data for Odisha
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
  function loadOdishaBiomass() {
    fetch("/api/biomass/odisha")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching Odisha biomass data:", data.error);
        } else {
          displayOdishaBiomass(data);
        }
      })
      .catch((error) =>
        console.error("Error fetching Odisha biomass data:", error)
      );
  }

<<<<<<< HEAD
=======
  // Function to display Odisha Biomass data
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
  function displayOdishaBiomass(data) {
    const odishaDistricts = document.querySelectorAll("[data-state='Odisha']");

    odishaDistricts.forEach((district) => {
      const districtName = district.getAttribute("data-district");
      const biomassData = data.find((d) => d.District.trim() === districtName);

      if (biomassData) {
<<<<<<< HEAD
=======
        // Add new column dynamically
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
        district.innerHTML += `
        <div class="biomass-column">
          <h4>Biomass Details</h4>
          <p>Rice: ${biomassData.Rice || "N/A"}</p>
          <p>Wheat: ${biomassData.Wheat || "N/A"}</p>
          <p>Total Biomass: ${biomassData.Total || "N/A"}</p>
        </div>
      `;
      }
    });
  }

<<<<<<< HEAD
=======
  // Highlight Odisha and bind hover event
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
  function highlightOdishaDistricts() {
    const odishaDistricts = document.querySelectorAll("[data-state='Odisha']");
    odishaDistricts.forEach((district) => {
      district.addEventListener("mouseover", () => {
        loadOdishaBiomass();
      });
    });
  }

<<<<<<< HEAD
=======
  // Fetching plant data from backend
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
  fetch("/api/plants")
    .then((response) => response.json())
    .then((data) => {
      plantData = data;
<<<<<<< HEAD
      populatePlantDataForAutocomplete(data); // Integration point
      console.log("Loaded plant data:", plantData);
      loadIndiaMap();
      highlightStatesWithPlants(); 
      highlightOdishaDistricts();
    })
    .catch((error) => console.error("Error loading plant data:", error));

=======
      console.log("Loaded plant data:", plantData);
      loadIndiaMap();
      highlightStatesWithPlants(); // Highlight after data is loaded
      highlightOdishaDistricts();
    })
    .catch((error) => console.error("Error loading plant data:", error));
  // Added: Function to highlight districts with plants
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
  function highlightDistrictsWithPlants() {
    if (currentChart && plantData) {
      const series = currentChart.series[0];
      if (series) {
        series.data.forEach((point) => {
          const state = point.properties?.st_nm;
          const plants = plantData[state] || [];
          console.log(`Highlighting state: ${state}, Plants: ${plants.length}`);
          if (plants.length > 0) {
<<<<<<< HEAD
            point.update({ color: "#00FF00" }, true);
          } else {
            point.update({ color: "#EEEEEE" }, true);
=======
            point.update({ color: "#00FF00" }, true); // Highlight green
          } else {
            point.update({ color: "#EEEEEE" }, true); // Reset color
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
          }
        });
      }
    }
  }

<<<<<<< HEAD
  const plantsRadioButton = document.getElementById("plants-radio");
=======
  // Event listener for "plants" radio button
  const plantsRadioButton = document.getElementById("plants-radio"); // Assumes the radio button has an ID
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
  if (plantsRadioButton) {
    plantsRadioButton.addEventListener("change", () => {
      if (plantsRadioButton.checked) {
        highlightDistrictsWithPlants();
      }
    });
  }

<<<<<<< HEAD
  function loadIndiaMap() {
    const bioMassDetailsHeader = document.getElementById("bioMassDetails");
    if (bioMassDetailsHeader) {
      bioMassDetailsHeader.style.display = "none"; 
    }
    toggleBiomassContainer(false); 
=======
  // Another trial of context menu for state

  function loadIndiaMap() {
    // Add this to loadIndiaMap function
    const bioMassDetailsHeader = document.getElementById("bioMassDetails");
    if (bioMassDetailsHeader) {
      bioMassDetailsHeader.style.display = "none"; // Hide the header completely
    }
    toggleBiomassContainer(false); // Always hide the container
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16

    fetch("/static/geojson/india.json")
      .then((response) => response.json())
      .then((data) => {
        createMap(data);
<<<<<<< HEAD
        // addContextMenuOption(); // This function was not defined in the original file, so commenting out
=======
        addContextMenuOption();
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      })
      .catch((error) => console.error("Error loading India map:", error));
  }

<<<<<<< HEAD
  highlightStatesWithPlants();
=======
  highlightDistrictsWithPlants();
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16

  function calculateStateCentroid(stateFeature) {
    if (stateFeature.geometry.type === "Polygon") {
      const coordinates = stateFeature.geometry.coordinates[0];
      const len = coordinates.length;
      const sumLon = coordinates.reduce((sum, coord) => sum + coord[0], 0);
      const sumLat = coordinates.reduce((sum, coord) => sum + coord[1], 0);
      return [sumLon / len, sumLat / len];
    } else if (stateFeature.geometry.type === "MultiPolygon") {
      const polygons = stateFeature.geometry.coordinates;
<<<<<<< HEAD
      const allCoords = polygons.flat(2); 
=======
      const allCoords = polygons.flat(2); // Flatten all polygons
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      const len = allCoords.length;
      const sumLon = allCoords.reduce((sum, coord) => sum + coord[0], 0);
      const sumLat = allCoords.reduce((sum, coord) => sum + coord[1], 0);
      return [sumLon / len, sumLat / len];
    }
    return null;
  }

  function createMap(geoJson) {
    if (currentChart) {
      currentChart.destroy();
    }

<<<<<<< HEAD
=======
    const mapData = geoJson;

    

    // Aggregate plant data by state
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const plantPoints = Object.values(plantData)
      .flat()
      .map((plant) => {
        return {
          name: plant["Sponge Iron Plant"] || "Unknown Plant",
          lon: parseFloat(plant["Longitude"]),
          lat: parseFloat(plant["Latitude"]),
          marker: {
            radius: 6,
            fillColor: "#FF0000",
            lineColor: "#fff",
            lineWidth: 2,
          },
        };
      });

<<<<<<< HEAD
    const statesWithBiomass = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat",
      "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
      "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
      "Rajasthan", "Sikkim", "Goa", "Tamil Nadu", "Telangana", "Tripura",
      "Uttar Pradesh", "Uttarakhand", "West Bengal",
    ];

=======
    // Define states with biomass data
    const statesWithBiomass = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Goa",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ];

    // Create biomass points for all states with biomass data
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const biomassPoints = statesWithBiomass
      .map((state) => {
        const stateFeature = geoJson.features.find(
          (f) => f.properties.st_nm === state
        );
        if (stateFeature) {
          const coordinates = calculateStateCentroid(stateFeature);
          if (coordinates) {
<<<<<<< HEAD
=======
            // Shift green dot slightly right
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
            return {
              name: state,
              lon: coordinates[0] + 0.2,
              lat: coordinates[1] + 0.2,
              marker: {
                radius: 8,
                fillColor: "#00FF00",
                lineColor: "#fff",
                lineWidth: 2,
              },
            };
          }
        }
        return null;
      })
      .filter((point) => point !== null);

<<<<<<< HEAD
    currentChart = Highcharts.mapChart("map-container", {
      chart: {
        map: geoJson,
=======
    const stateData = geoJson.features.map((feature, i) => ({
    ...feature,
    value: 1, // or a plant count, or 0 for default
    }));
    currentChart = Highcharts.mapChart("map-container", {
      chart: {
        map: geoJson,
        // Add context menu with biomass option
        events: {
          contextmenu: function (e) {
            // The default options from Highcharts
            if (!this.options.chart.contextMenu) {
              return;
            }
          },
        },
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      },
      title: {
        text: "India Map With Plant and Biomass Locations",
      },
      subtitle: {
<<<<<<< HEAD
        text: "Red dots: Plants | Green dots: Biomass data <br><i>Click on a state name to open its map and see plants & biomass data.</i> <br><br> <small>Use the buttons below to toggle plant and biomass layers. You can view only plants, only biomass, both, or neither by selecting/deselecting them.</small>",
        useHTML: true,
=======
        text: "Red dots: Plants | Green dots: Biomass data <br><i>Click on a state name to open its map and see plants & biomass data.</i> <br><br> <large>Use the buttons below to toggle plant and biomass layers. You can view only plants, only biomass, both, or neither by selecting/deselecting them.</large>",
        useHTML: true, // Allows HTML formatting
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      },
      mapNavigation: {
        enabled: true,
      },
      tooltip: {
        formatter: function () {
          const state = this.point.name || this.point.properties?.st_nm;

          if (this.point.series.name === "States with Biomass") {
            return `<b>${state}</b><br>Click to view biomass details`;
          } else if (this.point.series.name === "States") {
<<<<<<< HEAD
            const plants = plantData[state] || [];
            return `<b>${state}</b><br>Number of Plants: ${plants.length}`;
          } else if (this.point.series.name === "Plant Locations") {
=======
            // Show number of plants only when hovering over a state
            const plants = plantData[state] || [];
            return `<b>${state}</b><br>Number of Plants: ${plants.length}`;
          } else if (this.point.series.name === "Plant Locations") {
            // Show only the plant name when hovering over red dots
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
            return `<b>Plant:</b> ${this.point.name}`;
          } else {
            return `<b>${state}</b>`;
          }
        },
      },
<<<<<<< HEAD
=======
      // Add custom Biomass Details option to the exporting menu
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              "viewFullscreen",
              "printChart",
              "separator",
              {
                text: "Biomass Details of State",
                onclick: function () {
                  showAllStatesBiomassData();
                },
              },
            ],
          },
        },
      },
      series: [
        {
<<<<<<< HEAD
          data: geoJson.features,
          name: "States",
          borderColor: "#000",
          borderWidth: 2,
=======
          type: "map", // 🆕 Ensures polygon interactivity for full area!
          name: "States",
          mapData: geoJson,
          joinBy: ['st_nm', 'name'], // join on state name (adjust as needed)
          //data: geoJson.features,
          data: geoJson.features.map(f => ({
          name: f.properties.st_nm,
          value: 1 // or any other value
        })),
          borderColor: "#000",
          borderWidth: 2,
          color: "#E0E0E0", // default fill color
          cursor: "pointer", // 🆕 Shows pointer when hovering over the state area
          // NEW: Add states for hover effects
          //states: {
          plotOptions: {
            hover: {
              color: '#B4D8FF', // A color for highlighting
              borderColor: '#333',
              borderWidth: 3,
            },
            select: {
              color: '#A0C9E6' //Color when selected
            }
          },
          // NEW: Ensure interaction is based on the shape's area
          trackByArea: true,
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
          dataLabels: {
            enabled: true,
            format: "{point.properties.st_nm}",
            style: {
              fontWeight: "bold",
            },
          },
<<<<<<< HEAD
          point: {
            events: {
              click: function () {
                const stateName = this.properties.st_nm; 
                const plants = plantData[stateName];

                if (!stateName) return; 

                if (this.series.name === "States") {
                  if (!plants || plants.length === 0) {
                    alert("No plant data available for " + stateName);
                    return;
                  }

                  const stateFile = stateName.toLowerCase().replace(/\s+/g, "");
                  fetch(`/static/geojson/states/${stateFile}.json`)
                    .then((response) => response.json())
                    .then((stateData) => {
                      currentView = stateName;
                      createStateMap(stateData, plants, stateName);
                      createBackButton();
                    })
                    .catch((error) => {
                      console.error("Error loading state data:", error);
                      alert("Error loading map for " + stateName);
                    });
                }
=======
          states: {
          hover: {
            color: "#B4D8FF" // hover color
            },
          select: {
            color: "#A0C9E6" // selected color
            }
          },
          point: {
            events: {
              click: function () {
                const stateName = this.properties.st_nm; // Get state name
                const plants = plantData[stateName];

                if (!stateName) return; // Prevents errors if no state name is found

                // Remove the condition that checks if series name is "States"
                // This allows clicking anywhere on the state area to work
                if (!plants || plants.length === 0) {
                  alert("No plant data available for " + stateName);
                  return;
                }

                const stateFile = stateName.toLowerCase().replace(/\s+/g, "");
                fetch(`/static/geojson/states/${stateFile}.json`)
                  .then((response) => response.json())
                  .then((stateData) => {
                    currentView = stateName;
                    createStateMap(stateData, plants, stateName);
                    createBackButton();
                  })
                  .catch((error) => {
                    console.error("Error loading state data:", error);
                    alert("Error loading map for " + stateName);
                  });
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
              },
            },
          },
        },
        {
          id: "plants-series",
          type: "mappoint",
          name: "Plant Locations",
<<<<<<< HEAD
          data: plantPoints,
=======
          data: plantPoints, // Now uses latitude/longitude instead of centroids
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
          color: "#FF0000",
          visible: true,
          dataLabels: {
            enabled: false,
          },
        },
        {
          id: "biomass-series",
          type: "mappoint",
          name: "States with Biomass",
          data: biomassPoints,
          color: "#00FF00",
          visible: true,
          dataLabels: {
            enabled: false,
          },
          point: {
            events: {
              click: function () {
                const state = this.name;
                fetch(`/api/biomass?state=${encodeURIComponent(state)}`)
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.error) {
                      alert(data.error);
                    } else {
                      showStateDetails(state, data);
                    }
                  })
                  .catch((error) =>
                    console.error("Error fetching biomass data:", error)
                  );
              },
            },
          },
        },
      ],
    });

    return currentChart;
  }

  function toggleBiomassView() {
    if (currentChart) {
      const plantsSeries = currentChart.get("plants-series");
      const biomassSeries = currentChart.get("biomass-series");

      if (biomassSeries.visible) {
<<<<<<< HEAD
        plantsSeries.setVisible(true);
        biomassSeries.setVisible(false);
      } else {
=======
        // Switch to plants view
        plantsSeries.setVisible(true);
        biomassSeries.setVisible(false);
      } else {
        // Switch to biomass view
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
        plantsSeries.setVisible(false);
        biomassSeries.setVisible(true);
      }
    }
  }

<<<<<<< HEAD
=======
  // Update the existing highlightStatesWithPlants function to handle both plants and biomass
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
  function highlightStatesWithPlants() {
    if (currentChart) {
      const plantsSeries = currentChart.get("plants-series");
      plantsSeries.setVisible(!plantsSeries.visible);
    }
  }

  function createStateMap(stateData, plants, stateName) {
    const bioMassDetailsHeader = document.getElementById("bioMassDetails");
    if (bioMassDetailsHeader) {
      bioMassDetailsHeader.style.display = "none";
    }

    if (currentChart) {
      currentChart.destroy();
    }
<<<<<<< HEAD
=======
    // Extract plant locations using latitude & longitude for state-level map
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const plantPoints = plants.map((plant) => {
      return {
        name: plant["Sponge Iron Plant"] || "Unknown Plant",
        lon: parseFloat(plant["Longitude"]),
        lat: parseFloat(plant["Latitude"]),
        marker: {
          radius: 6,
          fillColor: "#FF0000",
          lineColor: "#fff",
          lineWidth: 2,
        },
      };
    });

    toggleBiomassContainer(false);

<<<<<<< HEAD
    const normalizeDistrictName = (name) => {
      if (!name) return "";
      const variations = {
        sundergarh: "sundargarh",
        sundergarha: "sundargarh",
=======
    // Normalize district names function
    const normalizeDistrictName = (name) => {
      if (!name) return "";
      // Add common variations of Sundargarh
      const variations = {
        sundergarh: "sundargarh",
        sundergarha: "sundargarh",
        sundargarha: "sundargarh",
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
        sondagarh: "sundargarh",
        sundargadh: "sundargarh",
      };

      const normalized = name.trim().toLowerCase();
      return variations[normalized] || normalized;
    };

<<<<<<< HEAD
=======
    // Grouping plants by district with normalized names
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const plantsByDistrict = {};
    plants.forEach((plant) => {
      const rawDistrict = plant["City/ District"] || "Unknown";
      const district = normalizeDistrictName(rawDistrict);
      if (!plantsByDistrict[district]) {
        plantsByDistrict[district] = [];
      }
      plantsByDistrict[district].push(plant);

<<<<<<< HEAD
=======
      // Debug log for Sundargarh related districts
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      if (district.includes("sund") || district.includes("sond")) {
        console.log(
          "Found Sundargarh variation:",
          rawDistrict,
          "-> normalized to:",
          district
        );
      }
    });

<<<<<<< HEAD
=======
    // Custom centroid calculation with special handling for Sundargarh
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    function calculateDistrictCentroid(districtFeature) {
      const district = normalizeDistrictName(
        districtFeature.properties.district
      );

<<<<<<< HEAD
=======
      // Debug log for Sundargarh district feature
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      if (district.includes("sundargarh")) {
        console.log("Processing Sundargarh district feature:", districtFeature);
      }

      if (districtFeature.geometry.type === "Polygon") {
        const coordinates = districtFeature.geometry.coordinates[0];
        const len = coordinates.length;
        const sumLon = coordinates.reduce((sum, coord) => sum + coord[0], 0);
        const sumLat = coordinates.reduce((sum, coord) => sum + coord[1], 0);
        return [sumLon / len, sumLat / len];
      } else if (districtFeature.geometry.type === "MultiPolygon") {
        const polygons = districtFeature.geometry.coordinates;
        const allCoords = polygons.flat(2);
        const len = allCoords.length;
        const sumLon = allCoords.reduce((sum, coord) => sum + coord[0], 0);
        const sumLat = allCoords.reduce((sum, coord) => sum + coord[1], 0);
        return [sumLon / len, sumLat / len];
      }
      return null;
    }

<<<<<<< HEAD
    const districtsWithPlants = new Set(Object.keys(plantsByDistrict));

=======
    // Getting districts with plants
    const districtsWithPlants = new Set(Object.keys(plantsByDistrict));

    // Preparing districts data with normalized names
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const districtsData = stateData.features.map((feature) => {
      const district = normalizeDistrictName(feature.properties.district);
      const districtPlants = plantsByDistrict[district] || [];
      return {
        ...feature,
        value: districtPlants.length,
        color: "#eee",
        plantsData: districtPlants,
        hasPlants: districtPlants.length > 0,
      };
    });

<<<<<<< HEAD
=======
    // Enhanced offset calculation with special handling for Sundargarh
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const getOffsetCentroid = (centroid, isPlant, district) => {
      if (stateName === "Odisha") {
        const horizontalOffset = isPlant ? 0.05 : -0.05;
        const verticalOffset = isPlant ? 0.02 : -0.02;

<<<<<<< HEAD
=======
        // Special handling for Sundargarh district
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
        if (normalizeDistrictName(district).includes("sundargarh")) {
          console.log("Applying offset for Sundargarh:", district, centroid);
        }

        return [centroid[0] + horizontalOffset, centroid[1] + verticalOffset];
      }
      return centroid;
    };

    currentChart = Highcharts.mapChart("map-container", {
      chart: {
        map: stateData,
        events: {
          load: function () {
            this.mapZoom(1.5);
          },
        },
      },
      title: {
        text: `${stateName} Districts`,
      },
      subtitle: {
        text: `Total Plants: ${plants.length} | Districts with Plants: ${districtsWithPlants.size} 
               <br><i>Click on District Name to see the availability of Biomass and Plants</i>`,
<<<<<<< HEAD
        useHTML: true,
=======
        useHTML: true, // Ensures HTML formatting works
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
      },
      mapNavigation: {
        enabled: true,
      },
      tooltip: {
        formatter: function () {
          const district =
            this.point.properties?.district?.trim() || this.point.district;
          const seriesName = this.series.name;

          if (seriesName === "Biomass Availability") {
            return `<b>${district}</b><br>Click here to view Biomass Availability`;
          }

          if (seriesName === "Sponge Iron Plants") {
<<<<<<< HEAD
            return `<b>Plant:</b> ${this.point.name}`;
=======
            return `<b>Plant:</b> ${this.point.name}`; // Shows only plant name on hover
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
          }

          return `<b>${district}</b>`;
        },
      },
      series: [
        {
<<<<<<< HEAD
          name: "Districts",
          data: districtsData,
          borderColor: "#999",
          states: {
            hover: {
              color: "#90EE90",
            },
          },
          dataLabels: {
            enabled: true,
            format: "{point.properties.district}",
=======
          type: "map",
          name: "Districts",
          joinBy: ['district', 'name'],
          data: stateData.features.map(feature => ({
            name: feature.properties.district,
            value: 1 // or another value
            })),
          borderColor: "#999",
          borderWidth: 2,
          color: "#E0E0E0",
          cursor: "pointer",
          trackByArea: true,
          dataLabels: {
            enabled: true,
            format: "{point.properties.district}",
            style: {
              fontWeight: "bold",
            },
          },
          states: {
            hover: {
              color: "#B4D8FF" // hover color
            },
            select: {
              color: "#A0C9E6" // selected color
            }
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
          },
          point: {
            events: {
              click: function () {
                const district = normalizeDistrictName(
                  this.properties.district
                );
                showDistrictDetails(district, plantsByDistrict[district] || []);
              },
            },
          },
        },
        {
          name: "Sponge Iron Plants",
          type: "mappoint",
          color: "#FF0000",
          data: plants.map((plant) => {
            return {
              name: plant["Sponge Iron Plant"] || "Unknown Plant",
              lon: parseFloat(plant["Longitude"]),
              lat: parseFloat(plant["Latitude"]),
              marker: {
                radius: 6,
                symbol: "circle",
                fillColor: "#FF0000",
                lineColor: "#fff",
                lineWidth: 2,
              },
            };
          }),
          dataLabels: {
            enabled: false,
          },
        },
        {
          name: "Biomass Availability",
          type: "mappoint",
          color: "#00FF00",
          visible: stateName === "Odisha",
          data: stateData.features
            .map((feature) => {
              const district = normalizeDistrictName(
                feature.properties.district
              );
              const centroid = calculateDistrictCentroid(feature);
              if (!centroid) return null;
              const offsetCentroid = getOffsetCentroid(
                centroid,
                false,
                district
              );
              return {
                name: district,
                lon: offsetCentroid[0],
                lat: offsetCentroid[1],
                district: district,
                marker: {
                  radius: 6,
                  symbol: "circle",
                  fillColor: "#00FF00",
                  lineColor: "#fff",
                  lineWidth: 2,
                },
              };
            })
            .filter((point) => point !== null),
          dataLabels: {
            enabled: false,
          },
          point: {
            events: {
              click: function () {
                const district = normalizeDistrictName(this.district);
                showDistrictDetails(district, plantsByDistrict[district] || []);
              },
            },
          },
        },
      ],
    });
  }
<<<<<<< HEAD
  
  function showDistrictDetails(district, plants, isAllPlants = false) {
    const modal = document.getElementById("plantModal") || createModal();

=======
  highlightDistrictsWithPlants();

  // Function to show district details with both plant and biomass data
  // Modify the showDistrictDetails function to always show biomass data for Odisha districts:

  function showDistrictDetails(district, plants, isAllPlants = false) {
    const modal = document.getElementById("plantModal") || createModal();

    // Sort plants by name if they exist
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const sortedPlants = plants?.length
      ? [...plants].sort((a, b) =>
          (a["Sponge Iron Plant"] || "").localeCompare(
            b["Sponge Iron Plant"] || ""
          )
        )
      : [];

<<<<<<< HEAD
=======
    // Create plants table if there are plants
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const plantsTable =
      sortedPlants.length > 0
        ? sortedPlants
            .map((plant) => {
              const details = Object.entries(plant)
                .filter(
                  ([key, value]) => value && value !== "N/A" && value !== ""
                )
                .map(
                  ([key, value]) => `
                  <tr>
                      <td class="key-column"><strong>${key}</strong></td>
                      <td class="value-column">${value}</td>
                  </tr>`
                )
                .join("");
              return `
              <div class="plant-entry">
                  <h4 class="plant-name">${
                    plant["Sponge Iron Plant"] || "Plant"
                  }</h4>
                  <table class="plant-details-table">
                      ${details}
                  </table>
              </div>
          `;
            })
            .join("")
        : "<p>No plant data available for this district</p>";

<<<<<<< HEAD
=======
    // Always fetch biomass data for Odisha districts
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    if (currentView === "Odisha") {
      fetch(`/api/odisha/districts/${district.toLowerCase()}`)
        .then((response) => response.json())
        .then((biomassData) => {
          const modalContent = `
          <div class="modal-content">
              <h2 class="district-title">${district} District Details</h2>
              <div class="three-column-container">
<<<<<<< HEAD
=======
                  <!-- Plants Column -->
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
                  <div class="data-column plants-column">
                      <h3>Plants in ${district}</h3>
                      ${plantsTable}
                  </div>
<<<<<<< HEAD
=======
      
                  <!-- DRI Plants Column (Duplicate of Plants Column) -->
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
                  <div class="data-column dri-plants-column">
                      <h3>DRI Plants in ${district}</h3>
                      ${plantsTable} 
                  </div>
<<<<<<< HEAD
=======
      
                  <!-- Biomass Column - Always shown for Odisha -->
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
                  <div class="data-column biomass-column">
                      <h3>Biomass Data</h3>
                      ${
                        biomassData && biomassData.biomass
                          ? `
                          <div class="biomass-section">
                              <h4>Bioenergy Potential (GJ)</h4>
                              <table class="biomass-table">
                                  ${Object.entries(
                                    biomassData.biomass.bioenergy_potential
                                  )
                                    .map(
                                      ([key, value]) => `
                                          <tr>
                                              <td>${key
                                                .replace("_", " ")
                                                .toUpperCase()}:</td>
                                              <td>${
                                                value?.toFixed(2) || "0.00"
                                              }</td>
                                          </tr>
                                      `
                                    )
                                    .join("")}
                              </table>
                          </div>
                          <div class="biomass-section">
                              <h4>Gross Biomass (Kilo tonnes)</h4>
                              <table class="biomass-table">
                                  ${Object.entries(
                                    biomassData.biomass.gross_biomass
                                  )
                                    .map(
                                      ([key, value]) => `
                                          <tr>
                                              <td>${key
                                                .replace("_", " ")
                                                .toUpperCase()}:</td>
                                              <td>${
                                                value?.toFixed(2) || "0.00"
                                              }</td>
                                          </tr>
                                      `
                                    )
                                    .join("")}
                              </table>
                          </div>
                          <div class="biomass-section">
                              <h4>Surplus Biomass (Kilo tonnes)</h4>
                              <table class="biomass-table">
                                  ${Object.entries(
                                    biomassData.biomass.surplus_biomass
                                  )
                                    .map(
                                      ([key, value]) => `
                                          <tr>
                                              <td>${key
                                                .replace("_", " ")
                                                .toUpperCase()}:</td>
                                              <td>${
                                                value?.toFixed(2) || "0.00"
                                              }</td>
                                          </tr>
                                      `
                                    )
                                    .join("")}
                              </table>
                          </div>
                      `
<<<<<<< HEAD
                          : "<p>No biomass data available.</p>"
                      }
                  </div>
              </div>
          </div>`;
=======
                          : "<p>No biomass data available for this district</p>"
                      }
                  </div>
              </div>
          </div>

          <style>
              .three-column-container {
                  display: flex;
                  gap: 30px;
                  width 100%;
                  align-items: flex-start;
              }
              .data-column {
                  flex: 1;
                  background: #f8f9fa;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .data-column h3 {
                  margin-bottom: 10px;
              }
              .biomass-section, .plant-entry {
                  margin-bottom: 20px;
              }
          </style>

      `;
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16

          modal.innerHTML = modalContent;
          modal.style.display = "block";
        })
        .catch((error) => {
          console.error("Error fetching biomass data:", error);
          showPlantOnlyDetails();
        });
    } else {
      showPlantOnlyDetails();
    }

<<<<<<< HEAD
=======
    // Fallback for non-Odisha or failed data fetch
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    function showPlantOnlyDetails() {
      const content = `
          <div class="modal-content">
              <h3>${
                isAllPlants ? "All Plants in State" : `Plants in ${district}`
              }</h3>
              <div class="district-plants">
                  ${plantsTable}
              </div>
          </div>`;
      modal.innerHTML = content;
      modal.style.display = "block";
    }
  }

<<<<<<< HEAD
  function createModal() {
=======
  function showPlantDetails(plant) {
    const modal = document.getElementById("plantModal") || createModal();

    // Creating a formatted list of all plant details
    const details = Object.entries(plant)
      .filter(([key, value]) => value && value !== "N/A" && value !== "")
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join("");

    const content = `
            <div class="modal-content">
                <h3>${plant["Sponge Iron Plant"] || "Plant Details"}</h3>
                <div class="plant-details">
                    ${details}
                </div>
            </div>`;

    modal.innerHTML = content;
    modal.style.display = "block";
  }

  // Function to highlight states with plants
  function highlightStatesWithPlants() {
    if (currentChart && plantData) {
      const series = currentChart.series[0];
      if (series) {
        // Iterate over each state in the map
        series.data.forEach((point) => {
          const state = point.properties?.st_nm;
          const plantsInState = plantData[state]?.filter(
            (plant) => plant["City/ District"]
          );

          if (plantsInState && plantsInState.length > 0) {
            point.update({ color: "#FF0000" }, true); // Highlight red for states with district plants
          } else {
            point.update({ color: "#EEEEEE" }, true); // Reset color for states without plants
          }
        });
      }
    }
  }

  // Event listener for the "plants" button
  const plantsButton = document.getElementById("plants-dialog-button"); // Replace with the actual button ID
  if (plantsButton) {
    plantsButton.addEventListener("click", () => {
      highlightStatesWithPlants();
    });
  }

  function createModal() {
    // Remove existing modal if any
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    const existingModal = document.getElementById("plantModal");
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "plantModal";
    modal.className = "modal";
<<<<<<< HEAD
    document.body.appendChild(modal);
=======
    modal.style.zIndex = "9999999"; // Ensure high z-index

    // Create a content wrapper div
    const contentWrapper = document.createElement("div");
    contentWrapper.className = "modal-content";
    contentWrapper.style.zIndex = "10000000"; // Even higher z-index

    // Add close button
    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.style.zIndex = "10000001"; // Highest z-index
    closeBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent event bubbling
      modal.style.display = "none";
    };

    // Append close button to content wrapper
    contentWrapper.appendChild(closeBtn);

    // Append content wrapper to modal
    modal.appendChild(contentWrapper);

    // Closing when clicking outside
    modal.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    // Prevent clicks inside modal from closing it
    contentWrapper.onclick = (event) => {
      event.stopPropagation();
    };
    // Append modal to the fullscreen element if in fullscreen, else to body
    const fullscreenContainer = document.fullscreenElement || document.body;
    fullscreenContainer.appendChild(modal);
    // Add fullscreen change event listener
    document.addEventListener("fullscreenchange", () => {
      const modal = document.getElementById("plantModal");
      if (modal) {
        if (document.fullscreenElement) {
          document.fullscreenElement.appendChild(modal);
        } else {
          document.body.appendChild(modal);
        }
      }
    });
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
    return modal;
  }

  function createBackButton() {
    const existing = document.querySelector(".back-button");
    if (existing) existing.remove();

    const button = document.createElement("button");
    button.className = "back-button";
    button.innerHTML = "← Back to India";
    button.onclick = () => {
      loadIndiaMap();
      currentView = "india";
      button.remove();
<<<<<<< HEAD
    };
    document.getElementById("map-container").appendChild(button);
  }
});
=======
      toggleBiomassContainer(true);
      // added

      const viewAllBtn = document.querySelector(".view-all-button");
      if (viewAllBtn) viewAllBtn.remove();
    };
    // Append to fullscreen element if in fullscreen, else to body
    const parent = document.fullscreenElement || document.getElementById("map-container") || document.body;
    parent.appendChild(button);
    document.addEventListener("fullscreenchange", () => {
    const button = document.querySelector(".back-button");
    if (button) {
      const parent = document.fullscreenElement || document.getElementById("map-container") || document.body;
      parent.appendChild(button);
    }
  });
  }
});
>>>>>>> be06d3af8e87eadb2e072559bc02f35191eb4c16
