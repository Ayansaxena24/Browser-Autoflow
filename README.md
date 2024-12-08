

# Browser Application (ElectronJs + ReactJs)

This React application emulates a **minimalistic browser** with features such as **bookmarks management**, **tab switching**, and **dynamic URL loading**. It provides a simple yet functional interface to browse URLs, manage multiple tabs, and save frequently visited sites for easy access.

---

## Features

### 1. **Dynamic URL Loading**
- Users can input and load any URL into the browser.
- The browser automatically validates the input and updates the content dynamically.
- URLs are displayed and can be revisited via the tab system or bookmarks.

![Dynamic URL Loading](https://github.com/user-attachments/assets/db15551e-53e7-4902-9b73-6fdb687f8257)

---

### 2. **Google Search Feature**
- If the URL is invalid, it is automatically converted into a Google search.

![Invalid URL](https://github.com/user-attachments/assets/d963853f-b3cc-4491-82f9-b8be47e8419f)

---

### 3. **Tabs Management**
- The browser supports **multiple tabs** with independent content.
- Users can:
  - **Open new tabs** with a "+" button.
  - **Switch between tabs** by clicking on the desired tab.
  - **Close tabs** using a close button (×) on each tab.

![Tabs Management](https://github.com/user-attachments/assets/c7837663-c2fe-4fc4-afc2-c326de5684f2)

---

### 4. **Bookmarks (Bonus Feature)**
- Users can **add URLs to bookmarks** for quick access.
- Bookmarks are displayed in a dropdown menu and can be revisited with a single click.
- Features include:
  - **Add a new bookmark** for the current tab.
  - **Remove bookmarks** individually.
  - **View an error message** ("You have already bookmarked this page") when a page is already bookmarked and the user tries to bookmark it again (Error Handling).

![Bookmarks Feature](https://github.com/user-attachments/assets/890e37a0-fccd-46da-8254-261887c9700e)

---

### 5. **Loader**
- The application features a smooth and interactive **linear progress loader**, enhancing the user experience during data fetching or page transitions.
- The loader provides visual feedback, ensuring users are informed that content is loading.

---


### 5. **Keyboard Shortcuts**
- The application supports various **keyboard shortcuts** to improve navigation and productivity.

#### **Tab Management:**
- **New Tab**: `Ctrl + T` (Windows/Linux) | `Cmd + T` (Mac)
- **Close Tab**: `Ctrl + W` (Windows/Linux) | `Cmd + W` (Mac)
- **Switch Tabs**: 
  - Next Tab: `Ctrl + Tab` (Windows/Linux) | `Cmd + Option + Right Arrow` (Mac)
  - Previous Tab: `Ctrl + Shift + Tab` (Windows/Linux) | `Cmd + Option + Left Arrow` (Mac)
  - Switch to specific tab (1-9): `Ctrl + 1` through `Ctrl + 9` (Windows/Linux) | `Cmd + 1` through `Cmd + 9` (Mac)

---

### 6. **Responsive Design**
- The application is **fully responsive**, ensuring usability on mobile, tablet, and desktop devices.
- The layout dynamically adjusts to provide an optimal user experience across different screen sizes.
  
![Responsive Design](https://github.com/user-attachments/assets/ccc6d86b-998f-4c88-9ff8-59a58e6e0d69)

---

### 7. **Color Tools**
- The application includes a set of **Color Tools** to enhance user experience when selecting and managing colors.

#### **Features:**
- **Eye Dropper Tool**: Allows users to select any color from their screen using the eye dropper tool.
- **Copy to Clipboard**: Enables users to easily copy selected colors to their clipboard.
- **Color History**: Keeps a history of recently selected colors, allowing users to quickly reuse previously picked colors.

![Color Picker](https://github.com/user-attachments/assets/f5b697c4-8c9c-4463-8efa-16cbda5f4125)
![Color Picker2](https://github.com/user-attachments/assets/d472a27f-6751-4a96-9351-d42e485a0128)
![Color Picker Tool](https://github.com/user-attachments/assets/472b4ee3-844c-446d-b1f9-2d800297aac9)


## Bonus Features

- **Color-coded Tabs**: 
  - Active tabs are visually distinct to highlight the current selection.
  - Closed or inactive tabs are grayed out for better accessibility.

- **Bookmark Management Experience**: 
  - Hover effects and transitions for an interactive UI.
  - Warnings or confirmation messages for removing bookmarks to prevent accidental deletions.

- **Enhanced Visuals for Bookmarks and Tabs**: 
  - Truncated text for long URLs or titles, ensuring a clean and clutter-free interface.
 
## Error Handling
- **Toast Notifications**: 
  - Used to provide real-time feedback to users. 
  - If a bookmark is already in the list, a notification is displayed to inform the user and prevent duplicates.
  - Similarly, when a color is saved, a confirmation toast ensures the user knows the action was successful.
 
![Saved Color Toast](https://github.com/user-attachments/assets/dbf0aed8-4ce0-4783-8b4c-e4d516a86f9f)
![Already Bookmarked](https://github.com/user-attachments/assets/ef474499-738d-4776-b3db-2ecb7b4880e6)


---

## Technologies Used

### Frontend
- **React**: Core framework for building the application.
- **Tailwind CSS**: For styling the application with responsive and utility-first design.
- **Material UI (MUI)**: Used for components like buttons and popovers.
- **React Toastify**: Used for displaying notifications and alerts in a smooth, non-blocking manner.
- **Bootstrap**: For additional styling and layout components.

---

### Desktop Application
- **Electron.js**: Framework for building cross-platform desktop applications, enabling the browser to run as a standalone app.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js or can be installed separately.
- **Electron.js**: Installed as a development dependency.
- **Git**: [Download and install Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**  
   Clone the project to your local machine using the following command:
   
   ```bash
   git clone https://github.com/Ayansaxena24/Browser-Autoflow.git
   ````
2. **Navigate to the Project Directory**
   Move into the project's root directory:
   
   ```bash
   cd Browser-Autoflow
   ````

3. **Install Dependencies**
   Install all required packages using npm or yarn:

   ```bash
   npm install
   ````

   Or, if you use yarn:

   ```bash
   yarn
   ````

### Running The Application

### Note

> ⚠️ **Important:** Ensure you access the application through the **Electron App** only. Some features may not function properly when accessed via the localhost browser window during development.


1. **Run the Development Server**  
   To start the React application in development mode:
   
   ```bash
   npm run start
   ````

   Or, for yarn:

    ```bash
   yarn start
   ````

    Open your browser and navigate to http://localhost:3000 (or http://localhost:5173 in some cases)

1. **Run the Desktop App**  
   To start the React application in development mode:
   
   ```bash
   npm run start
   ````

   Or, for yarn:

    ```bash
   yarn start
   ````

    Open your browser and navigate to http://localhost:3000 (or 5173 in some cases).
   
