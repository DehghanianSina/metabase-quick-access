document.addEventListener("DOMContentLoaded", function () {
  const baseUrlInput = document.getElementById("base-url-input");
  const saveButton = document.getElementById("save-button");

  // Retrieve the saved base URL
  chrome.storage.sync.get("baseUrl", function (data) {
    if (data.baseUrl) {
      baseUrlInput.value = data.baseUrl;
    }
  });

  // Save the base URL
  saveButton.addEventListener("click", function () {
    const baseUrl = baseUrlInput.value;
    chrome.storage.sync.set({ baseUrl }, function () {
      alert("Base URL saved successfully!");
    });
  });
});
