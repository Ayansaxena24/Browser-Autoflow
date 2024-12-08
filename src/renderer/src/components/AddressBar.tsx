import '../styles.css'
import ColorPicker from './ColorPicker'
import refresh from '../assets/refreshsvg.svg'
import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import search from '../assets/search.png'
import back from '../assets/back.png'
import menu from '../assets/menu.png'
import { ToastContainer, toast } from 'react-toastify'

// Define interface for bookmark
interface Bookmark {
  title: string;
  url: string;
}

const AddressBar = ({
  url,
  setUrl,
  onBack,
  onForward,
  history,
  activeTabId,
  forwardHistory,
  title
}: {
  url: string
  setUrl: (url: string) => void
  onBack: () => void
  onForward: () => void
  history: { [key: string]: Set<string> }
  forwardHistory: { [key: string]: Set<string> }
  activeTabId: string
  title: string
}): JSX.Element => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [bookMarks, setBookMarks] = useState<Bookmark[]>([])
  const [openBookmarks, setOpenBookMarks] = useState(false)
  const [openColorPicker, setOpenColorPicker] = useState(false)

  const handleToggleBookmarks = () => {
    setOpenBookMarks(!openBookmarks)
    setOpenColorPicker(false)  // Close color picker when opening bookmarks
  }

  const handleToggleColorPicker = () => {
    setOpenColorPicker(!openColorPicker)
    setOpenBookMarks(false)  // Close bookmarks when opening color picker
  }

  // Truncate text to specified length
  const truncateText = (text: string, maxLength: number = 25) => {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text
  }

  useEffect(() => {
    if (url === 'https://www.google.com/') {
      setText('')
    } else {
      setText(url)
    }
  }, [url])

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            setProgress(0)
            setLoading(false)
            return 0
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 100)
        })
      }, 100)

      return () => clearInterval(timer)
    }
    return
  }, [loading])

  const handleRefresh = () => {
    setLoading(true)
    setUrl('')

    const timeoutId = setTimeout(() => {
      setUrl(url)
      setLoading(false)
    }, 1000) // Short delay to ensure reset

    return () => clearTimeout(timeoutId)
  }

  const handleSearch = () => {
    if (text.startsWith('https://') || text.startsWith('http://')) {
      setUrl(text)
    } else {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(text)}`
      setUrl(googleSearchUrl)
    }
  }

  const addBookmark = () => {
    // Check if bookmark already exists
    const existingBookmark = bookMarks.find(
      bookmark => bookmark.url === url
    )

    //show a toast
    if (existingBookmark) {
      toast.error('You have already bookmarked this page')
    }

    if (!existingBookmark) {
      setBookMarks([
        ...bookMarks, 
        { 
          title: truncateText(title), 
          url: url 
        }
      ])
    }
  }

  const isBackDisabled = !history[activeTabId]?.size || url === 'https://www.google.com/'
  const isForwardDisabled = !forwardHistory[activeTabId]?.size

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
          onClick={
            isBackDisabled
              ? undefined
              : () => {
                  setLoading(true)
                  onBack()
                }
          }
        />
        <img
          src={refresh}
          className="w-[30px] pb-1 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleRefresh}
        />
        {isForwardDisabled ? null : (
          <img
            src={back}
            className={`w-[35px] h-[45px] transform rotate-180 ${
              isForwardDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 transition duration-300 ease-in-out'
            }`}
            onClick={
              isForwardDisabled
                ? undefined
                : () => {
                    setLoading(true)
                    onForward()
                  }
            }
          />
        )}
        <div className={`${isForwardDisabled ? 'w-[80%]' : 'w-[78%]'} relative mt-1`}>
          <input
            type="text"
            className="form-control border-primary shadow-sm w-[100%] relative "
            id="no-drag"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch() // Trigger search on Enter
              }
            }}
          />
          <img
            src={search}
            className="w-[20px] absolute right-2 top-2 hover:scale-110 transition duration-300 ease-in-out"
            onClick={handleSearch}
          />
        </div>
        <div className="mt-1">
        <ColorPicker 
            isActive={openColorPicker} 
            setIsActive={handleToggleColorPicker} 
          />
        </div>
        <div className="hover:bg-blue-400 rounded-md transition duration-300 ease-in-out flex items-center h-[34px] px-2 py-2 mt-1.5">
          <button className='w-[20px]' onClick={handleToggleBookmarks}><img src={menu} /></button>
        </div>

        {/* popover */}
        {openBookmarks &&
        <div className="absolute top-[50px] right-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black shadow-lg border border-gray-300 rounded-md px-4 pb-3 z-10 max-w-[500px] min-w-[300px] flex flex-col justify-center items-center p-2">
          <p className='font-bold text-[16px]'>Bookmarks</p>
          {bookMarks.length > 0 ? (
            bookMarks.map((bookmark, index) => (
              <div key={index} className="flex w-full justify-between items-center mb-2">
                <button
                  className="text-white hover:underline truncate"
                  onClick={() => setUrl(bookmark.url)}
                >
                  {bookmark.title}
                </button>
                <button
                  className="relative text-red-500 text-[26px] hover:text-red-700 hover:bg-red-300 transition duration-300 ease-in-out border-red-400 border-1 rounded-md px-2 h-[20px]"
                  onClick={() => setBookMarks((prev) => prev.filter((_, i) => i !== index))}
                >
                  <p className='absolute -translate-x-[50%] -translate-y-[55%]'>-</p>
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No bookmarks added</p>
          )}
          <button
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded"
            onClick={addBookmark}
          >
            Add Bookmark
          </button>
        </div>
        }
      </div>
      <div className="flex flex-grow h-full w-full mt-2">
        {loading && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: '100%'
            }}
          />
        )}
        <ToastContainer />
      </div>
    </nav>
  )
}

export default AddressBar