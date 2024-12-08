

# React Browser Application

This React application emulates a **minimalistic browser** with features such as **bookmarks management**, **tab switching**, and **dynamic URL loading**. It provides a simple yet functional interface to browse URLs, manage multiple tabs, and save frequently visited sites for easy access.

---

## Features

### 1. **Dynamic URL Loading**
- Users can input and load any URL into the browser.
- The browser automatically validates the input and updates the content dynamically.
- URLs are displayed and can be revisited via the tab system or bookmarks.

![Dynamic URL Loading](https://github.com/user-attachments/assets/sample-url-loading.png)

---

### 2. **Tabs Management**
- The browser supports **multiple tabs** with independent content.
- Users can:
  - **Open new tabs** with a "+" button.
  - **Switch between tabs** by clicking on the desired tab.
  - **Close tabs** using a close button (×) on each tab.

![Tabs Management](https://github.com/user-attachments/assets/sample-tabs-management.png)

---

### 3. **Bookmarks**
- Users can **add URLs to bookmarks** for quick access.
- Bookmarks are displayed in a dropdown menu and can be revisited with a single click.
- Features include:
  - **Add a new bookmark** for the current tab.
  - **Remove bookmarks** individually.
  - View a message ("No bookmarks added") when no bookmarks are saved.

![Bookmarks Feature](https://github.com/user-attachments/assets/sample-bookmarks.png)

---

### 4. **Responsive Design**
- The application is **fully responsive**, ensuring usability on mobile, tablet, and desktop devices.
- The layout dynamically adjusts to provide an optimal user experience across different screen sizes.

---

## Bonus Features

- **Color-coded Tabs**: 
  - Active tabs are visually distinct to highlight the current selection.
  - Closed or inactive tabs are grayed out for better accessibility.

- **Bookmark Management Experience**: 
  - Hover effects and transitions for an interactive UI.
  - Warnings or confirmation messages for removing bookmarks to prevent accidental deletions.

- **Enhanced Visuals for Bookmarks and Tabs**: 
  - Truncated text for long URLs or titles, ensuring a clean and clutter-free interface.

- **Skeleton Loading States**:
  - A placeholder appears when switching tabs or loading content to enhance the user experience during network delays.

---

## Technologies Used

### Frontend
- **React**: Core framework for building the application.
- **Tailwind CSS**: For styling the application with responsive and utility-first design.
- **Material UI (MUI)**: Used for components like buttons and popovers.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/react-browser.git
