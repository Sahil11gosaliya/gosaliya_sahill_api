(() => {

  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  // API URLs
  const infoBox = "https://swiftpixel.com/earbud/api/infoboxes";
  const materials = "https://swiftpixel.com/earbud/api/materials";

  //spinner
  const peopleCon = document.querySelector("#people-con");

  let spinner =
    `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 112.11 123.71">
      <defs>
        <linearGradient id="linear-gradient" x1="0" y1="61.86" x2="112.11" y2="61.86" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#fff"/>
          <stop offset=".42" stop-color="#002a00"/>
          <stop offset="1" stop-color="#09002a"/>
        </linearGradient>
      </defs>
      <path d="m.7,85.91c24.68,40.13,68.96,33.63,88.06,13.09,21.08-22.66,19.17-58.11-4.66-78.31C60.57.76,20.35,3.88.71,37.55c-.38-5.14-1.77-10.21,2.29-15.02C20.19,2.15,47.12-5.27,71.63,3.85c24.63,9.17,40.79,32.79,40.48,59.18-.31,25.93-17.51,49.19-42.61,57.61-24.21,8.12-51.59-.26-67.3-20.37-3.37-4.32-1.97-8.67-1.49-14.36Z" fill="url(#linear-gradient)" stroke-width="0"/>
            <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                dur="1s" 
                from="0 0 90"
                to="360 0 90" 
                repeatCount="indefinite" />
              
        </svg>`;

  peopleCon.innerHTML = spinner;



  // Functions
  function removeSpinner() {
    peopleCon.innerHTML = '';
  }


  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }


  function loadInfoBoxes() {
    // AJAX call 
    fetch(infoBox)
      .then(response => response.json())
      .then(data => {
        removeSpinner(); // Remove the spinner
        data.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;

          // const imageElement = document.createElement('img');
          // imageElement.src = infoBox.thumbnail; // could not edit the image in api

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
          // selected.appendChild(imageElement);
        });
      })
      .catch(error => console.error('Error loading infoBoxes:', error));
  }

  function loadMaterialInfo() {
    // Make AJAX call 
    fetch(materials)
      .then(response => response.json())
      .then(data => {
        data.forEach(material => {

          const clone = materialTemplate.content.cloneNode(true);


          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;


          materialList.appendChild(clone);
        });
      })
      .catch(error => console.error('Error loading materialListData:', error)); //effective in console, getting it on front 
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });


  loadInfoBoxes();
  loadMaterialInfo();
})();
