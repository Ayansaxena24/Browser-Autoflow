import { useState, useEffect } from 'react';
import colorpicker from '../assets/colorpicker.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ColorPicker = () => {
  const [color, setColor] = useState('#ffffff');
  const [savedColor, setSavedColor] = useState('#ffffff');
  const [rgbColor, setRgbColor] = useState('');
  const [hslColor, setHslColor] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  // Utility function to convert HEX to RGB
  const hexToRgb = (hex : string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Utility function to convert HEX to HSL
  const hexToHsl = (hex : string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // Achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  // Update RGB and HSL values whenever HEX changes
  useEffect(() => {
    setRgbColor(hexToRgb(color));
    setHslColor(hexToHsl(color));
  }, [color]);

  const handleCopy = (format) => {
    let textToCopy;
    switch (format) {
      case 'hex':
        textToCopy = color;
        break;
      case 'rgb':
        textToCopy = rgbColor;
        break;
      case 'hsl':
        textToCopy = hslColor;
        break;
      default:
        return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      toast(`${format.toUpperCase()} value copied to clipboard!`);
    });
  };

  useEffect(() => {
    if (!isActive) {
      setColor(savedColor);
    }
  }, [isActive])

  const handleSave = () => {
    setSavedColor(color);
    setColor(color);
    setColorHistory((prevHistory) => {
      const filteredHistory = prevHistory.filter(item => item !== ''); // Remove empty strings from history
      const newHistory = [color, ...filteredHistory]; // Add the new color to the beginning
  
      // Ensure the history does not exceed 4 colors
      if (newHistory.length > 4) {
        newHistory.pop(); // Remove the last (oldest) color if the limit exceeds 4
      }
  
      return newHistory;
    });
    toast('Color saved!');
  };

  return (
    <div className="relative inline-block">
      {/* <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Sora:wght@100..800&display=swap');
      </style> */}

      {/* Icon */}
      <img
        src={colorpicker}
        className="w-[30px] pt-1 cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => setIsActive(!isActive)}
        alt="Color Picker"
      />

      {/* Popover */}
      {isActive && (
        <div className="absolute top-[40px] right-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black shadow-lg border border-gray-300 rounded-md px-4 pb-2 z-10 max-w-[800px] min-w-[300px] flex flex-col justify-center items-center">
          <div className="flex justify-around w-[100%] my-2">
            <img
              src={colorpicker}
              className="w-[35px] pt-1 cursor-pointer"
              alt="Color Picker"
            />
            <p style={{ color: color }} className="text-[26px] font-montserrat">
              Color Picker
            </p>
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-24 cursor-pointer border-none"
          />
          <div className='flex justify-around items-center w-[90%] mt-2.5'>
          <div className="text-sm break-words text-white">
            <p className='text-[16px]'>HEX : {color}</p>
            <p className='text-[16px]'>RGB : {rgbColor}</p>
            <p className='text-[16px]'>HSL : {hslColor}</p>
          </div>
          <button
              onClick={handleSave}
              className="bg-purple-500 text-white px-4 h-[40px] py-2 rounded-md hover:bg-purple-600 transition"
            >
              Save
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleCopy('hex')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Copy HEX
            </button>
            <button
              onClick={() => handleCopy('rgb')}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Copy RGB
            </button>
            <button
              onClick={() => handleCopy('hsl')}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Copy HSL
            </button>
          </div>
          <div className="flex gap-4 mt-4 justify-between w-[100%] items-center">
            {colorHistory.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => setColor(color)}
              ></div>
            ))}
            {colorHistory.length > 1 &&
              <button onClick={() => setColorHistory([])}><p className='text-[12px] border-2 rounded-md px-2 py-2 hover:scale-105 transition duration-300 ease-in-out'>Erase History</p></button>
            }
          </div>
          
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
