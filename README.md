# OnTrack - Website Time Tracker Chrome Extension

<div align="center">

⌚ **Real-Time Website Activity Tracking**

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/yourusername/OnTrack-T)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-success.svg)](https://chromewebstore.google.com)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Configuration](#configuration)
- [Data Management](#data-management)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

**OnTrack** is a powerful Chrome extension designed to help you monitor and analyze your web browsing habits. Track time spent on different websites in real-time, generate detailed reports, and gain insights into your digital productivity patterns.

Whether you're managing productivity, analyzing time allocation, or simply curious about your browsing behavior, OnTrack provides comprehensive tracking capabilities with an intuitive, user-friendly interface.

---

## ✨ Features

### Core Functionality

- **⏱️ Real-Time Tracking**
  - Automatic detection of active website
  - Manual start/stop tracking controls
  - Precise timestamp recording (minutes and seconds)

- **📊 Detailed Analytics**
  - Per-domain tracking data
  - Time-stamped session records
  - Date and time logging for each session
  - Duration calculation in minutes and seconds

- **💾 Data Management**
  - Persistent local storage using Chrome Storage API
  - Export tracking data for external analysis
  - Clear data with one click
  - Automatic data synchronization

- **🎨 User Interface**
  - Dark mode toggle for comfortable viewing
  - Intuitive dashboard with organized data table
  - Real-time data visualization
  - Responsive and modern design

- **⚙️ Customization**
  - Theme switching (light/dark mode)
  - Easy data export for spreadsheet analysis
  - Flexible tracking controls

---

## 📦 Installation

### Option 1: Install from Chrome Web Store (When Available)

1. Visit the [Chrome Web Store](https://chromewebstore.google.com)
2. Search for "OnTrack"
3. Click "Add to Chrome"
4. Confirm permissions

### Option 2: Load Unpacked (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/OnTrack-T.git
   cd OnTrack-T
   ```

2. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```

3. Enable "Developer mode" (toggle in top-right corner)

4. Click "Load unpacked" and select the project folder

5. OnTrack icon will appear in your Chrome toolbar

### Option 3: Manual Installation

1. Download the project files
2. Navigate to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked"
5. Select the OnTrack-T folder

---

## 🚀 Usage

### Getting Started

1. **Click the OnTrack icon** in your Chrome toolbar to open the popup
2. **View your tracking dashboard** with current session data
3. **Start tracking** by clicking the "▶️ Start Tracking" button
4. **Stop tracking** when you're done with that website
5. **Review your data** in the data table

### Button Controls

| Button | Function | Description |
|--------|----------|-------------|
| 🌙 Dark Mode | Toggle Theme | Switch between light and dark mode |
| ▶️ Start Tracking | Begin Session | Start tracking time on current website |
| 📁 Export Data | Download Data | Export all tracking data as JSON file |
| 🗑️ Clear Data | Reset | Remove all tracking records |

### Workflow Example

```
1. Visit website.com → Click "Start Tracking"
2. Browse website.com for 10 minutes
3. Switch to another-site.com → Click "Stop Tracking" then "Start Tracking"
4. Continue browsing another-site.com for 5 minutes
5. Click "Stop Tracking"
6. View results in the data table:
   - website.com: 10 minutes
   - another-site.com: 5 minutes
```

---

## 📁 Project Structure

```
OnTrack-T/
├── manifest.json          # Chrome extension configuration
├── background.js          # Service worker - core tracking logic
├── popup.html            # Extension UI layout
├── popup.js              # Popup interaction and DOM handling
├── styles.css            # Styling and theme management
├── icon.png              # Extension icons (16x16, 48x48, 128x128)
└── README.md             # This file
```

### File Descriptions

- **manifest.json**: Extension metadata, permissions, and configuration
- **background.js**: Service worker handling tab monitoring and data persistence
- **popup.html**: HTML structure of the extension popup
- **popup.js**: JavaScript for UI interactions and data display
- **styles.css**: CSS styling with dark mode support
- **icon.png**: Extension icon in multiple sizes

---

## 🔧 Technical Details

### Architecture

```
┌─────────────────────────────────────┐
│   Chrome Browser                    │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Service Worker            │   │
│  │   (background.js)           │   │
│  │  - Tab monitoring           │   │
│  │  - Time calculation         │   │
│  │  - Data persistence         │   │
│  └─────────────────────────────┘   │
│           ↕ (chrome.runtime)        │
│  ┌─────────────────────────────┐   │
│  │   Popup UI                  │   │
│  │   (popup.html/js)           │   │
│  │  - User interface           │   │
│  │  - Data display             │   │
│  │  - Control buttons          │   │
│  └─────────────────────────────┘   │
│           ↕ (chrome.storage)        │
│  ┌─────────────────────────────┐   │
│  │   Chrome Storage API        │   │
│  │  - Persistent data storage  │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Data Structure

Each tracking session is stored as:

```javascript
{
  site: "example.com",           // Website hostname
  date: "2/10/2026",            // Tracking date
  start: "10:30:45 AM",         // Start time (formatted)
  startTime: 1707556245000,     // Start timestamp (ms)
  end: "10:45:23 AM",           // End time (formatted)
  duration: "14m 38s"            // Total duration
}
```

### Manifest V3 Compliance

- Uses service workers instead of background pages
- Implements proper permission declarations
- Supports host-based API access
- Future-proof for Chrome updates

---

## ⚙️ Configuration

### Permissions Required

```json
{
  "permissions": [
    "tabs",                    // Access active tab information
    "storage"                  // Store and retrieve data locally
  ],
  "host_permissions": [
    "<all_urls>"              // Monitor all websites
  ]
}
```

### Custom Configuration Options (Future Enhancement)

To enable advanced features, modify `manifest.json`:

```json
{
  "permissions": ["tabs", "storage"],
  "optional_permissions": ["webRequest", "webRequestBlocking"]
}
```

---

## 💾 Data Management

### Data Storage

- **Location**: Chrome's local storage (device-specific)
- **Format**: JSON array of session objects
- **Limit**: Up to 10MB per extension
- **Persistence**: Survives browser restarts

### Exporting Data

1. Click "📁 Export Data" button
2. JSON file is automatically downloaded
3. Open in any text editor or spreadsheet application

### Clearing Data

1. Click "🗑️ Clear Data" button
2. All tracking records will be permanently removed
3. **Note**: This action cannot be undone

### Data Privacy

- All data is stored **locally** on your device
- No data is sent to external servers
- No tracking of personal information
- Complete user control over data

---

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 88+ | ✅ Fully Supported |
| Chromium | Latest | ✅ Fully Supported |
| Edge | 88+ | ✅ Fully Supported |
| Brave | Latest | ✅ Fully Supported |
| Opera | Latest | ✅ Fully Supported |

---

## 🔐 Security & Privacy

- **No external requests**: All data processing is local
- **No data collection**: Your browsing data never leaves your device
- **No ads or trackers**: Clean, lightweight extension
- **Open source**: Full transparency on code functionality
- **User control**: You decide what data to track and keep

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to contribute:

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/OnTrack-T.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes and test thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a Pull Request

### Development Setup

1. Load the unpacked extension in Chrome
2. Make code changes
3. Click the reload icon (↻) on the extension card at `chrome://extensions/`
4. Test your changes

### Coding Standards

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code style
- Test all features before submitting PR

### Feature Ideas

- [ ] Time range filtering
- [ ] Website categorization
- [ ] Productivity reports and analytics
- [ ] Weekly/monthly summaries
- [ ] Goal setting and notifications
- [ ] Custom site names/labels
- [ ] Data visualization charts
- [ ] Cloud sync option
- [ ] Browser history integration
- [ ] Detailed analytics dashboard

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

You are free to:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute
- ✅ Use privately

With the condition:
- 📋 Include the original copyright notice and license

---

## 🆘 Support & Troubleshooting

### Common Issues

**Extension not appearing in toolbar?**
- Ensure extension is enabled at `chrome://extensions/`
- Try restarting Chrome
- Reload the extension

**Data not saving?**
- Check Chrome permissions for OnTrack
- Ensure you have local storage available
- Try clearing browser cache

**Tracking not starting?**
- Verify you're on a valid website (not chrome:// page)
- Check that extension has proper permissions
- Reload the extension

### Getting Help

1. **Check existing issues**: [GitHub Issues](https://github.com/yourusername/OnTrack-T/issues)
2. **Open new issue**: Provide detailed description and steps to reproduce
3. **Contact**: [Email support]
4. **Discussions**: [GitHub Discussions](https://github.com/yourusername/OnTrack-T/discussions)

### Reporting Bugs

Please include:
- Chrome version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser extensions list

---

## 📊 Roadmap

### Version 1.1 (Planned)
- Advanced filtering and search
- Time range selection
- Export to CSV format

### Version 1.2 (Planned)
- Data visualization charts
- Weekly/monthly reports
- Category tagging system

### Version 2.0 (Future)
- Cloud synchronization
- Cross-device tracking
- Advanced analytics dashboard
- Browser history integration

---

## 🙏 Acknowledgments

- Built with Chrome Extensions API (Manifest V3)
- Inspired by productivity tracking needs
- Thanks to all contributors and users

---

## 📞 Contact & Social

- **GitHub**: [OnTrack-T Repository](https://github.com/yourusername/OnTrack-T)
- **Issues**: [Bug Reports & Feature Requests](https://github.com/yourusername/OnTrack-T/issues)
- **Email**: your.email@example.com

---

## 📈 Statistics

- **Users**: Growing community
- **Active Development**: Continuous improvements
- **Open Source**: 100% transparent
- **No Dependencies**: Lightweight and fast

---


