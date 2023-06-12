document.addEventListener("DOMContentLoaded", function() {
  const categoryInputs = document.querySelectorAll("input[name='category']");
  const numberInput = document.getElementById("number-input");
  const constructButton = document.getElementById("construct-button");
  const resultContainer = document.getElementById("result-container");
  const gearIcon = document.getElementById("gear-icon");

  if (categoryInputs && numberInput && constructButton && resultContainer && gearIcon) {
    // Enable construct button on category selection
    categoryInputs.forEach(function(input) {
      input.addEventListener("change", function() {
        constructButton.disabled = false;
      });
    });

    // Retrieve the saved base URL
    chrome.storage.sync.get("baseUrl", function(data) {
      const baseUrl = data.baseUrl || "";

      // Construct and display the URL
      constructButton.addEventListener("click", function() {
        const selectedCategory = document.querySelector("input[name='category']:checked").value;
        const number = numberInput.value;
        const newUrl = `${baseUrl}/${selectedCategory}/${number}`;
        resultContainer.textContent = newUrl;

        // Open the result URL in a new tab
        chrome.tabs.create({ url: newUrl });
      });
    });

    // Open options page when gear icon is clicked
    gearIcon.addEventListener("click", function() {
      chrome.runtime.openOptionsPage();
    });

    // Handle input event for the number input
    numberInput.addEventListener("input", function() {
      const value = this.value.trim();
      if (value === "" || /^\d+$/.test(value)) {
        constructButton.disabled = false;
      } else {
        constructButton.disabled = true;
      }
    });

    // Handle wheel event to increase or decrease the number input value
    numberInput.addEventListener("wheel", function(event) {
      event.preventDefault();
      const currentValue = parseInt(this.value) || 0;
      const delta = Math.sign(event.deltaY);
      const newValue = Math.max(currentValue + delta, 0);
      this.value = newValue;
    });
  }
});
