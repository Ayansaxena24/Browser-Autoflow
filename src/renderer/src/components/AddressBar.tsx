import '../styles.css';
import ColorPicker from './ColorPicker';
import refresh from '../assets/refreshsvg.svg';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import search from '../assets/search.png';
import back from '../assets/back.png';

const AddressBar = ({
  url,
  setUrl,
  onBack,
  onForward,
  history,
  activeTabId,
  forwardHistory,
}: {
  url: string;
  setUrl: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  history: { [key: string]: Set<string> };
  forwardHistory: { [key: string]: Set<string> };
  activeTabId: string;
}): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (url === 'https://www.google.com/') {
      setText('');
    } else {
      setText(url);
    }
  }, [url]);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            setProgress(0);
            setLoading(false);
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 100);

      return () => clearInterval(timer);
    }
    return;
  }, [loading]);

  const handleRefresh = () => {
    setLoading(true);
    setUrl('');

    const timeoutId = setTimeout(() => {
      setUrl(url);
      setLoading(false);
    }, 1000); // Short delay to ensure reset

    return () => clearTimeout(timeoutId);
  };

  const handleSearch = () => {
    if (text.startsWith('https://') || text.startsWith('http://')) {
      setUrl(text);
    } else {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        text
      )}`;
      setUrl(googleSearchUrl);
    }
  };

  const isBackDisabled =
    !history[activeTabId]?.size || url === 'https://www.google.com/';
  const isForwardDisabled = !forwardHistory[activeTabId]?.size;

  return (
    <nav className="linear-gradient(#50b3eb, #2fa4e7 60%, #2c9ad9) bg-primary text-white pt-2 border-bottom-dark sticky-top flex flex-col justify-center items-center">
      <div className="w-[100%] h-[100%] flex align-middle justify-around pl-2 pr-2">
        <img
          src={back}
          className={`w-[35px] h-[45px] pb-2 mt-0.5 ${
            isBackDisabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105 transition duration-300 ease-in-out'
          }`}
          onClick={isBackDisabled ? undefined : () => {
            setLoading(true); 
            onBack();
          }}
        />
        <img
          src={refresh}
          className="w-[30px] pb-1 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleRefresh}
        />
        { isForwardDisabled ? null :
        <img
          src={back}
          className={`w-[35px] h-[45px] transform rotate-180 ${
            isForwardDisabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105 transition duration-300 ease-in-out'
          }`}
          onClick={isForwardDisabled ? undefined : () => {
            setLoading(true);
            onForward();
          }}
        />
        }
        <div className={`${isForwardDisabled ? 'w-[85%]' : 'w-[78%]'} relative mt-1`}>
          <input
            type="text"
            className="form-control border-primary shadow-sm w-[100%] relative "
            id="no-drag"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <img
            src={search}
            className="w-[20px] absolute right-2 top-2 hover:scale-110 transition duration-300 ease-in-out"
            onClick={handleSearch}
          />
        </div>
        <div className="mt-1">
          <ColorPicker />
        </div>
      </div>
      <div className="flex flex-grow h-full w-full mt-2">
        {loading && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: '100%',
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default AddressBar;
