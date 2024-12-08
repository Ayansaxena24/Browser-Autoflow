import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './assets/styles.css';
import AddressBar from './components/AddressBar';
import Tabs from './components/Tabs';
import useWindowsDimensions from './hooks/useWindowsDimensions';
import WindowControls from './components/WindowControls';

interface TabType {
  id: string;
  url: string;
  title: string;
}

function App(): JSX.Element {
  const [tabs, setTabs] = useState<TabType[]>([{ id: uuidv4(), url: 'https://www.google.com', title:'Google' }]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const windowDimensions = useWindowsDimensions();
  const webviewRefs = useRef<{ [key: string]: HTMLWebViewElement | null }>({});
  const [history, setHistory] = useState<{ [key: string]: Set<string> }>({});
  const [forwardHistory, setForwardHistory] = useState<{ [key: string]: Set<string> }>({});

  // Get the current active tab
  const activeTab = tabs.find((tab) => tab.id === activeTabId)!;

  const handleUrlChange = (url: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTabId ? { ...tab, url } : tab
      )
    );
  };

  const handleTitleChange = (title: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === activeTabId ? { ...tab, title } : tab
      )
    );
  };

  const handleNewTab = () => {
    const newTabId = uuidv4();
    setTabs((prevTabs) => [...prevTabs, { id: newTabId, url: 'https://www.google.com', title:'Google' }]);
    setActiveTabId(newTabId);
    setHistory((prevHistory) => ({ ...prevHistory, [newTabId]: new Set() }));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabId: string) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== tabId);

      // If closing the active tab, switch to another tab
      if (tabId === activeTabId) {
        setActiveTabId(updatedTabs[0]?.id || '');
      }

      // Remove the history for the closed tab
      setHistory((prevHistory) => {
        const updatedHistory = { ...prevHistory };
        delete updatedHistory[tabId];
        return updatedHistory;
      });

      // Ensure at least one tab exists
      return updatedTabs.length ? updatedTabs : [{ id: uuidv4(), url: '', title:'' }];
    });
  };

  const handleBack = () => {
    if (history[activeTabId]?.size > 0) {
      const historyArray = Array.from(history[activeTabId]);
      const lastUrl = historyArray[historyArray.length - 1];
      setHistory((prevHistory) => {
        const updatedHistory = new Set(prevHistory[activeTabId]);
        updatedHistory.delete(lastUrl);
        return { ...prevHistory, [activeTabId]: updatedHistory };
      });

       // Add the popped URL to forward history
       setForwardHistory((prevForwardHistory) => {
        const currentForwardHistory = prevForwardHistory[activeTabId] || new Set();
        const updatedForwardHistory = new Set(currentForwardHistory);
        updatedForwardHistory.add(activeTab.url); // Add current URL before navigating back
        return { ...prevForwardHistory, [activeTabId]: updatedForwardHistory };
      });

      handleUrlChange(lastUrl); // Navigate to the last URL
    }
  };

  const handleForward = () => {
    const currentForwardHistory = forwardHistory[activeTabId] || new Set();

    if (currentForwardHistory.size > 0) {
      const forwardArray = Array.from(currentForwardHistory);
      const nextUrl = forwardArray[forwardArray.length - 1];

      setForwardHistory((prevForwardHistory) => {
        const updatedForwardHistory = new Set(prevForwardHistory[activeTabId]);
        updatedForwardHistory.delete(nextUrl);
        return { ...prevForwardHistory, [activeTabId]: updatedForwardHistory };
      });

      // Add the current URL to history before navigating forward
      setHistory((prevHistory) => {
        const currentHistory = prevHistory[activeTabId] || new Set();
        const updatedHistory = new Set(currentHistory);
        updatedHistory.add(activeTab.url);
        return { ...prevHistory, [activeTabId]: updatedHistory };
      });

      handleUrlChange(nextUrl); // Navigate to the next URL
    }
  };

  useEffect(() => {
    const webview = webviewRefs.current[activeTab.id];

    if (webview) {
      let previousUrl: string = activeTab.url;  // Track the current URL initially

      const handleNavigate = (event: any) => {
        if (!webview.isConnected) return; // Ensure webview is still connected
        const newUrl = event.url || event.detail?.url;

        // Add the current URL to history when navigating away from it
        if (previousUrl !== newUrl) {
          // Add the previous URL to the history set for the active tab
          setHistory((prevHistory) => {
            const currentHistory = prevHistory[activeTabId] || new Set<string>();
            if (!currentHistory.has(previousUrl)) {
              const updatedHistory = new Set(currentHistory);
              updatedHistory.add(previousUrl); // Add previous URL before navigating away
              return { ...prevHistory, [activeTabId]: updatedHistory };
            }
            return prevHistory;
          });
        }

        // Update the URL for the active tab
        handleUrlChange(newUrl);

        // Update the previousUrl to the new URL for future navigation events
        previousUrl = newUrl;
      };

      // Handle title updates
      const handleTitleUpdated = (event: any) => {
        const title = event.title || event.detail?.title || 'Untitled';
        handleTitleChange(title);
      };

      // Add event listeners for navigation and title updates
      webview.addEventListener('did-navigate', handleNavigate);
      webview.addEventListener('page-title-updated', handleTitleUpdated);

      // Cleanup function
      return () => {
        if (webview && webview.isConnected) {
          webview.removeEventListener('did-navigate', handleNavigate);
          webview.removeEventListener('page-title-updated', handleTitleUpdated);
        }
      };
    }
    return;
  }, [activeTabId, tabs]);

  return (
    <div className="flex flex-col" >
      <div className='flex justify-between w-[100%]'>
      <Tabs
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={handleTabChange}
        onTabClose={handleTabClose}
        onNewTab={handleNewTab}
      />
      <div id='drag' className='flex-grow'></div>
      <WindowControls />
      </div>
      <AddressBar
        setUrl={handleUrlChange}
        url={activeTab.url}
        onBack={handleBack}
        onForward={handleForward}
        history={history}
        activeTabId={activeTabId}
        forwardHistory={forwardHistory}
        title={activeTab.title}
      /> 
      {activeTab.url ? (
        <webview
          ref={(el) => {
            if (el) webviewRefs.current[activeTab.id] = el;
          }}
          src={`${activeTab.url.includes('https://') ? '' : 'https://'}${
            activeTab.url
          }`}
          style={{
            height: windowDimensions.height - 109,
            width: '100%',
          }}
        ></webview>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;