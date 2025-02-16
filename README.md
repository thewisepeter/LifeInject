# **LifeInject**

**LifeInject** is a Chrome extension that replaces advertisements on web pages with inspiring Bible verses. It aims to provide users with a meaningful and uplifting browsing experience by injecting life through scripture.

---

## **Features**

- **Ad Replacement**: Automatically detects and replaces ads with random Bible verses.
- **Custom Styling**: Displays verses in a clean, visually appealing format.
- **Dynamic Updates**: Fetches new verses dynamically from the Bible API.
- **Lightweight**: Runs efficiently in the background without slowing down your browser.
- **Customizable**: Easily enable or disable the extension for specific websites by Toggling the extension Badge.

---

## **Installation**

### **From the Chrome Web Store**

_(Coming soon!)_

### **Manual Installation**

1. **Download the Extension**:

   - Clone this repository or download the ZIP file:
     ```bash
     git clone https://github.com/thewisepeter/AdFriend.git
     ```
   - Extract the files if you downloaded a ZIP.

2. **Load the Extension in Chrome**:

   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the folder containing the extension files.

3. **Pin the Extension**:
   - Click the puzzle icon in the top-right corner of Chrome.
   - Pin **LifeInject** for easy access.

---

## **Usage**

1. **Enable the Extension**:

   - Click the **LifeInject** icon in the Chrome toolbar to enable or disable the extension for the current website.

2. **Browse the Web**:
   - Visit any website with ads. LifeInject will automatically replace ads with Bible verses.

---

## **How It Works**

1. **Ad Detection**:

   - LifeInject uses a list of common ad selectors to detect ads on web pages.

2. **Verse Fetching**:

   - When an ad is detected, the extension fetches a random Bible verse from the [Scripture API](https://scripture.api.bible/).

3. **Ad Replacement**:

   - The ad is replaced with a widget displaying the verse and its reference.

4. **Styling**:
   - The widget is styled with a background image (`paper.jpg`) and clean typography for a pleasant reading experience.

---

### **Key Sections**:

- **`manifest_version`**: Uses Manifest V3, the latest version for Chrome extensions.
- **`name` and `description`**: Describes the extension.
- **`action`**: Defines the extension’s toolbar icon.
- **`permissions`**: Grants access to necessary browser features.
- **`host_permissions`**: Allows the extension to work on all websites.
- **`background`**: Uses a service worker for background tasks.
- **`content_scripts`**: Injects `content.js` into all web pages to replace ads.
- **`web_accessible_resources`**: Makes `paper.jpg` accessible to content scripts.

---

## **Contributing**

Contributions are welcome! If you’d like to improve LifeInject, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- **Scripture API**: Powered by [scripture.api.bible](https://scripture.api.bible/).
- **Icons**: Generated from https://www.vecteezy.com/

---

## **Support**

If you encounter any issues or have suggestions, please [open an issue](https://github.com/thewisepeter/AdFriend/issues) on GitHub.

---

Enjoy a more meaningful browsing experience with **LifeInject**! ✨
