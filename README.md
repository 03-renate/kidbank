# KidBank - Teen Financial Tool 💰

## Project Overview

The **BankKid** is a web-based financial management tool designed for teens aged 14–18. It helps them track their finances while enforcing age-appropriate restrictions on purchases (e.g., no alcohol, cigarettes, energy drinks, or explicit content). Key features include a balance tracker, transaction history, and a purchase system with built-in safeguards.

This project is part of a **team-base school assingment**, where the goal is to collaborate in an agile team enviroment, improving and updating the project over time rather than delivering a finalize product.

This project is built with HTML, CSS, JavaScript, to create a responsive and mobile-friendly interface.

## Team & Collaborative

- **Team Size:**

  - Muhammad Hammad Khan
  - Renate Pedersen
  - Sergiu D. Sarbu
  - Tubha Ahmad

- **Project Management:** GitHub Issues
- **Contribution Process:**
- **Plan and research**
- **Create and assign GitHub Issues**
- **Implements features collaboratively**

## 📂 Project Structure

```
/kidbank
  ├── node_modules/         # Installed dependencies (ignore this)
  ├── public/               # Static assets (favicon, images, icons)
  │   ├── favicon.ico
  │   ├── logo.png
  ├── src/                  # Main source code
  │   ├── assets/           # CSS, images, or other assets
  │   │   ├── styles.css
  │   │   ├── logo.png
  │   ├── js/               # JavaScript logic
  │   │   ├── main.js       # Entry point (bootstraps app)
  │   │   ├── ui.js         # UI-related functions
  │   │   ├── storage.js    # Local storage or API handling
  │   │   ├── transactions.js # Transactions logic
  │   ├── pages/            # HTML pages (if using multiple pages)
  │   │   ├── dashboard.html
  │   │   ├── login.html
  ├── index.html            # Main HTML file (entry point)
  ├── .gitignore            # Ignore files for Git
  ├── package.json          # Project metadata & dependencies
  ├── package-lock.json     # Lockfile for package versions
  ├── vite.config.js        # Configuration for Vite
```

## 🚀 Features

- **User Dashboard:** View your balance and recent transactions.
- **Transaction System:** Add funds and make purchases.
- **Restricted Purchases:** (Planned) Prevent users from buying restricted products.
- **Barcode Scanner**
- **Product display with Request/Scann/Saving**
- **Product details lookup via barcode**
- **Purchase permission/restriction logic**
- **Responsive Design:** Fully responsive layout that works on mobile, tablet, and desktop devices using Bootstrap.

## 🛠Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript(Vite)
- **Version Control:** GitHub
- **Project Management:** GitHub Issues
- Node.js (Express + Axios)
- Open Food Facts API

## 🛠️How To Run The Project

**🔧 Prerequisites**

- Node.js (v16+)
- A modern browser (Chrome recommended for barcode scanning)

**📦 Installation**

1. Clone the repository

```
	git clone https://github.com/03-renate/kidbank.git
cd kidbank
```

2. Install Node.js dependencies:

```
npm install
```

## 🚀 Setting Up the Proxy Server

To run the proxy server for barcode scanning, follow these steps:

### 1️⃣ Install Node.js (if not installed)

Ensure you have Node.js installed. You can check by running:

```
node -v
```

If not installed, download and install it from here.

### 2️⃣ Navigate to the Project Folder

Open a terminal and move into the project's directory:

```
cd /path/to/your/project
```

### 3️⃣ Install Dependencies

Run the following command to install required modules:

```
npm install express axios cors
```

### 4️⃣ Start the Proxy Server

Run the server with:

```
node proxy.js
```

If using ES Modules (import instead of require), ensure "type": "module" is in package.json:

```
{
  "type": "module"
}
```

### 5️⃣ Test the Proxy\*\*

Open a browser or use Postman to test if the server works:

```
http://localhost:4000/barcode/1234567890123
```

(Replace 1234567890123 with a real barcode.)
If you get a JSON response, the proxy is working! 🎉
'

## ▶️Running the Proxy Server

A proxy server is required to fetch product data from Open Food Facts (due to CORS limitations).
To start the proxy:

```
node proxy.js
```

• This will run on: http://localhost:4000
Ensure the proxy is running in the background before using the scanner.

## 🌐 Using the App

1. Open the HTML file (e.g., index.html and click Scann) in your browser. (Live Server is recommended)
2. Click Scan to open the barcode scanner modal.
3. Allow camera access when prompted.
4. Scan a barcode — product details will be fetched from the proxy and displayed.

## 💡 Troubleshooting

- **403 or connection errors**: Ensure the proxy server is running.
- **Port already in use**: Change the port number in proxy.js and update the fetch URL in your JavaScript.
- **Camera not working**: Make sure to allow browser camera permissions. Chrome supports BarcodeDetector best.
- **Product not found** : Not all barcodes exist in the Open Food Facts database.

## 🤝Contribution Guidelines

- Use GitHub issues to propose new features or report bugs.
- Create branches for each new feature or issue.
- Submit pull requests with clear descriptions and, if relevant, screenshots of your changes.

## Sprint Workflow

1. **Discovery Phase:** Research and define core features.
2. **Planning Phase:** Break tasks into manageable issues.
3. **Sprint Work:** Assign tasks, develop features, and review code.

## Credit

- Barcode scanning via the Web's BarcodeDetector API
- Product data from Open Food Facts

## Resources

- [Design](https://www.figma.com/design/YkFgB3cGEkEr7rMvtC3wWG/Agency-1---CA?node-id=0-1&t=mGzPBWFzFWYLwIAe-1)

## License

This project is open-source and free to use.

## Contact

For any question or feedback, feel free to reach out via GitHub Iussues.

Feel free to reach out if you'd like to contribute or need more information! 🚀
