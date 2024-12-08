import React, { useEffect } from 'react'
import '../styles.css';

interface TabType {
  id: string
  url: string
  title?: string
}

interface TabsProps {
  tabs: TabType[]
  activeTabId: string
  onTabChange: (tabId: string) => void
  onTabClose: (tabId: string) => void
  onNewTab: () => void
}

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTabId, 
  onTabChange, 
  onTabClose, 
  onNewTab 
}) => {
    const truncateTitle = (title: string, maxLength: number = 10): string => {
        return title.length > maxLength 
          ? `${title.slice(0, maxLength)}...` 
          : title
      }

       // Add the useEffect to listen for keyboard events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the user presses "Ctrl + T" (Windows/Linux) or "Cmd + T" (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();  // Prevent the default browser behavior
        onNewTab();  // Trigger the new tab function
      }

      // Close Tab: Ctrl/Cmd + W
      if ((event.ctrlKey || event.metaKey) && event.key === 'w') {
        event.preventDefault(); // Prevent default browser tab close
        
        // Close the current active tab
        onTabClose(activeTabId);
      }

      // Switch Tabs: Ctrl/Cmd + Tab (next), Ctrl/Cmd + Shift + Tab (previous)
      if ((event.ctrlKey || event.metaKey) && event.key === 'Tab') {
        event.preventDefault();

        // Find current tab index
        const currentIndex = tabs.findIndex(tab => tab.id === activeTabId);
        
        // Determine next tab index
        const nextIndex = event.shiftKey 
          ? (currentIndex - 1 + tabs.length) % tabs.length  // Previous tab (wrapping around)
          : (currentIndex + 1) % tabs.length;  // Next tab (wrapping around)

        // Change to the next/previous tab
        onTabChange(tabs[nextIndex].id);
      }

      // Optional: Direct tab switching with Ctrl/Cmd + Number (1-9)
      if ((event.ctrlKey || event.metaKey) && event.key >= '1' && event.key <= '9') {
        const tabIndex = parseInt(event.key) - 1;
        if (tabIndex < tabs.length) {
          event.preventDefault();
          onTabChange(tabs[tabIndex].id);
        }
      }
    };

    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onNewTab, onTabChange, onTabClose]);

  return (
    <div className="tabs-container flex items-center bg-gray-100 p-1">
      {tabs.map(tab => (
        <div 
          key={tab.id}
          className={`
            tab 
            flex 
            items-center 
            p-2 
            mx-1 
            rounded 
            cursor-pointer 
            ${activeTabId === tab.id ? 'bg-white shadow' : 'hover:bg-gray-200'}
          `}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="mr-2 text-sm">
            {truncateTitle(tab.title || 'New Tab')}
          </span>
          {tabs.length > 1 && (
            <button 
              className="close-tab ml-2 hover:bg-red-100 rounded-md pb-1 px-1 h-[24px] flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                onTabClose(tab.id)
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button 
        className="new-tab-btn ml-2 bg-blue-100 hover:bg-blue-200 rounded-md px-2 flex items-center justify-center h-[38px] pb-1"
        onClick={onNewTab}
      >
        <p className='text-[26px]'>+</p>
      </button>
    </div>
  )
}

export default Tabs