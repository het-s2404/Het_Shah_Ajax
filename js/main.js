(() => {
    // Variables
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const loader = document.querySelector("#loader");
  
    // Function to toggle loader visibility
    function toggleLoader(show) {
      loader.classList.toggle("hidden", !show);
    }
  
    // Load Info Boxes
    function loadInfoBoxes() {
      toggleLoader(true);
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
        .then((response) => response.json())
        .then((infoBoxes) => {
          infoBoxes.forEach((infoBox, index) => {
            const selected = document.querySelector(`#hotspot-${index + 1}`);
  
            const headingElement = document.createElement("h2");
            headingElement.textContent = infoBox.heading;
  
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = infoBox.description;
  
            selected.appendChild(headingElement);
            selected.appendChild(descriptionElement);
          });
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = document.createElement("p");
          errorMessage.textContent =
            "Oops, it looks like something went wrong. Please try again later.";
          document.body.appendChild(errorMessage);
        })
        .finally(() => toggleLoader(false));
    }
  
    // Load Material Info
    function loadMaterialInfo() {
      toggleLoader(true);
      fetch("https://swiftpixel.com/earbud/api/materials")
        .then((response) => response.json())
        .then((materialListData) => {
          materialListData.forEach((material) => {
            // Clone template
            const clone = materialTemplate.content.cloneNode(true);
            // Populate template
            const materialHeading = clone.querySelector(".material-heading");
            materialHeading.textContent = material.heading;
  
            const materialDescription = clone.querySelector(
              ".material-description"
            );
            materialDescription.textContent = material.description;
  
            materialList.appendChild(clone);
          });
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = document.createElement("p");
          errorMessage.textContent =
            "Failed to load materials. Please try again later.";
          materialList.appendChild(errorMessage);
        })
        .finally(() => toggleLoader(false));
    }
  
    // Event Handlers for Hotspots
    function showInfo() {
      const selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      const selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    // Event Listeners
    hotspots.forEach((hotspot) => {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
    // Initialize Data Loading
    loadInfoBoxes();
    loadMaterialInfo();
  })();
  