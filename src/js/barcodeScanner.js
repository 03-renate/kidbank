const video = document.getElementById("camera");
const barcodeResult = document.getElementById("barcodeResult");
const startScanButton = document.getElementById("startScan");
const modal = document.querySelector(".bla_bla"); // Ensure this is the correct modal class
const closeModal = document.querySelector(".close-modal");

// Open modal when clicking "Scan"
startScanButton.addEventListener("click", async () => {
  modal.style.display = "block"; // Show the modal
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    video.srcObject = stream;
    scanBarcode(); // Start barcode detection
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
});

// Close modal and stop camera
closeModal.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop()); // Stop camera stream
  }
});

// Barcode detection function
async function scanBarcode() {
  if ("BarcodeDetector" in window) {
    const barcodeDetector = new BarcodeDetector({
      formats: ["ean_13", "code_128"],
    });

    let scanning = setInterval(async () => {
      const barcodes = await barcodeDetector.detect(video);
      if (barcodes.length > 0) {
        barcodeResult.textContent = barcodes[0].rawValue;
        console.log("Scanned Barcode:", barcodes[0].rawValue);

        clearInterval(scanning); // Stop scanning once barcode is detected
        fetchProductDetails(barcodes[0].rawValue);
      }
    }, 1000);
  } else {
    console.error("BarcodeDetector API is not supported on this browser.");
  }
}

async function fetchProductDetails(barcode) {
  try {
    const response = await fetch(`http://localhost:4000/barcode/${barcode}`);
    const data = await response.json();

    console.log("Received product data:", data);

    if (data.error) {
      alert("Product not found");
    } else {
      alert(
        `Product: ${data.product_name || "Unknown"}\nBrand: ${
          data.brands || "Unknown"
        }\nCategory: ${data.categories || "Unknown"}`
      );
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}
