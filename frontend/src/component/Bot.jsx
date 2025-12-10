import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { 
  FaUserCircle, 
  FaTrash, 
  FaPlus, 
  FaBars, 
  FaTimes,
  FaImage,
  FaSun,
  FaMoon,
  FaRobot,
  FaCopy,
  FaCheck,
  FaPaperPlane,
  FaExpand,
  FaCompress,
  FaHistory,
  FaStar,
  FaRegStar
} from "react-icons/fa";
import { FiSend, FiUpload, FiSettings } from "react-icons/fi";
import { AiOutlineLoading3Quarters, AiOutlineDownload } from "react-icons/ai";
import { MdDarkMode, MdLightMode, MdContentCopy, MdCheck, MdOutlineEmergency } from "react-icons/md";
import { BsThreeDotsVertical, BsFillPinAngleFill, BsPin } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";

const API_URL = "https://verifyfirst-backend-w2skwv8b3-gupta-suraj-krishnas-projects.vercel.app/api/chat/message";

const STORAGE_KEY_CHATS = "verifyfirst_chats";
const STORAGE_KEY_ACTIVE = "verifyfirst_active_chat";
const STORAGE_KEY_THEME = "verifyfirst_theme";

function ChatBot() {
  const [allChats, setAllChats] = useState({});
  const [activeChatId, setActiveChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Changed to false for light theme by default
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [typingEffect, setTypingEffect] = useState("");
  const [pinnedChats, setPinnedChats] = useState([]);

  // Initialize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Load theme - default to light
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(false);
    }

    // Load chats
    let storedChats = {};
    let storedActive = "";

    try {
      const rawChats = localStorage.getItem(STORAGE_KEY_CHATS);
      const rawActive = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (rawChats) storedChats = JSON.parse(rawChats);
      if (rawActive) storedActive = rawActive;
    } catch {
      storedChats = {};
      storedActive = "";
    }

    if (Object.keys(storedChats).length === 0) {
      const newId = `chat-${Date.now()}`;
      const newChat = { [newId]: { name: "Welcome Chat", messages: [] } };
      setAllChats(newChat);
      setActiveChatId(newId);
      setMessages([]);
      localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(newChat));
      localStorage.setItem(STORAGE_KEY_ACTIVE, newId);
    } else {
      setAllChats(storedChats);
      const firstKey = storedActive && storedChats[storedActive]
        ? storedActive
        : Object.keys(storedChats)[0];
      setActiveChatId(firstKey);
      setMessages(storedChats[firstKey].messages || []);
    }

    // Focus input
    setTimeout(() => inputRef.current?.focus(), 300);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save chats
  useEffect(() => {
    if (!activeChatId) return;
    const updated = {
      ...allChats,
      [activeChatId]: {
        ...allChats[activeChatId],
        messages,
        updatedAt: Date.now()
      }
    };
    setAllChats(updated);
    localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY_ACTIVE, activeChatId);
  }, [messages, activeChatId]);

  // Save theme
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Create new chat
  const createNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newName = `Chat ${Object.keys(allChats).length + 1}`;
    const updated = { ...allChats, [newId]: { name: newName, messages: [] } };
    
    setAllChats(updated);
    setActiveChatId(newId);
    setMessages([]);
    setInput("");
    
    if (isMobile) setSidebarOpen(false);
    
    localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY_ACTIVE, newId);
    
    inputRef.current?.focus();
  };

  // Delete chat
  const deleteChat = (chatId) => {
    const updated = { ...allChats };
    delete updated[chatId];
    const keys = Object.keys(updated);

    if (keys.length === 0) {
      createNewChat();
      return;
    }

    setAllChats(updated);
    setActiveChatId(keys[0]);
    setMessages(updated[keys[0]].messages || []);
    
    localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY_ACTIVE, keys[0]);
  };

  // Rename chat
  const renameChat = (chatId, newName) => {
    if (!newName.trim()) return;
    const updated = {
      ...allChats,
      [chatId]: { ...allChats[chatId], name: newName.trim() }
    };
    setAllChats(updated);
    localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updated));
  };

  // Toggle pin chat
  const togglePinChat = (chatId) => {
    setPinnedChats(prev => 
      prev.includes(chatId) 
        ? prev.filter(id => id !== chatId)
        : [...prev, chatId]
    );
  };

  // Send message
  const handleSendMessage = async () => {
    if (!input.trim() || !activeChatId || loading) return;
    
    const userText = input.trim();
    const userMessage = { 
      id: Date.now(),
      text: userText, 
      sender: "user",
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate typing effect
    setTypingEffect("typing");
    setLoading(true);
    
    try {
      const res = await axios.post(API_URL, {
        text: userText,
        sessionId: activeChatId
      });

      if (res.status === 200) {
        const botMessage = {
          id: Date.now() + 1,
          text: res.data.botMessage,
          sender: "bot",
          timestamp: new Date().toISOString(),
          emergency: res.data.emergency,
          mediaFlag: res.data.mediaFlag
        };
        
        setMessages(prev => [...prev, botMessage]);

        if (res.data.voiceUrl) {
          const audio = new Audio(res.data.voiceUrl);
          audio.play().catch(e => console.log("Audio play error:", e));
        }

        if (res.data.emergency) {
          setTimeout(() => {
            alert("🚨 EMERGENCY DETECTED! Please seek help immediately.");
          }, 500);
        }
      }
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        text: err.response?.data?.error || "❌ Service unavailable. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTypingEffect("");
      inputRef.current?.focus();
    }
  };

  // File upload
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    setMessages(prev => [
      ...prev, 
      { 
        id: Date.now(),
        text: "📤 Uploading media...", 
        sender: "bot",
        timestamp: new Date().toISOString()
      }
    ]);

    try {
      const uploadRes = await axios.post(
        "https://verifyfirst-backend-w2skwv8b3-gupta-suraj-krishnas-projects.vercel.app/api/media/upload"
,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const mediaUrl = uploadRes.data.url;
      const fileType = uploadRes.data.fileType;

      const mediaMessage = {
        id: Date.now() + 1,
        text: `📸 Uploaded ${fileType.includes('image') ? 'Image' : 'Video'}`,
        sender: "user",
        timestamp: new Date().toISOString(),
        mediaUrl,
        isMedia: true,
        fileType
      };

      setMessages(prev => [...prev.slice(0, -1), mediaMessage]);
      setTypingEffect("typing");
      setLoading(true);

      const chatRes = await axios.post(API_URL, {
        text: `[Media: ${mediaUrl}] ${input}`,
        sessionId: activeChatId
      });

      if (chatRes.status === 200) {
        const botResponse = {
          id: Date.now() + 2,
          text: chatRes.data.botMessage,
          sender: "bot",
          timestamp: new Date().toISOString(),
          emergency: chatRes.data.emergency,
          mediaFlag: chatRes.data.mediaFlag
        };
        
        setMessages(prev => [...prev, botResponse]);

        if (chatRes.data.voiceUrl) {
          const audio = new Audio(chatRes.data.voiceUrl);
          audio.play().catch(e => console.log("Audio play error:", e));
        }
      }

      setInput("");
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 2,
        text: "❌ Failed to upload media",
        sender: "bot",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTypingEffect("");
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // Copy message
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(text);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Render message content
  const renderMessageContent = (msg) => {
    if (msg.isMedia && msg.mediaUrl) {
      const isVideo = msg.fileType?.includes('video') || 
                     /\.(mp4|mov|webm|avi|mkv)$/i.test(msg.mediaUrl);
      const isImage = msg.fileType?.includes('image') || 
                     /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(msg.mediaUrl);

      return (
        <div className="space-y-2">
          {isVideo ? (
            <div className="relative group">
              <video 
                src={msg.mediaUrl} 
                controls 
                className="rounded-xl max-w-full max-h-64 border border-gray-200 shadow-sm"
              />
              <button
                onClick={() => setFullscreenMedia(msg.mediaUrl)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md opacity-0 group-hover:opacity-100"
              >
                <FaExpand className="text-gray-700" />
              </button>
            </div>
          ) : isImage ? (
            <div className="relative group">
              <img 
                src={msg.mediaUrl} 
                alt="Uploaded" 
                className="rounded-xl max-w-full max-h-64 object-contain cursor-pointer border border-gray-200 shadow-sm"
                onClick={() => setFullscreenMedia(msg.mediaUrl)}
              />
              <button
                onClick={() => setFullscreenMedia(msg.mediaUrl)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md opacity-0 group-hover:opacity-100"
              >
                <FaExpand className="text-gray-700" />
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <a 
                href={msg.mediaUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2 font-medium"
              >
                <AiOutlineDownload />
                <span>Download File</span>
              </a>
            </div>
          )}
        </div>
      );
    }

    if (msg.emergency) {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-red-600 font-bold">
            <MdOutlineEmergency className="text-xl" />
            <span>EMERGENCY ALERT</span>
          </div>
          <div className="whitespace-pre-line bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200 shadow-sm">
            {msg.text}
          </div>
        </div>
      );
    }

    return (
      <div className="whitespace-pre-line break-words leading-relaxed">
        {msg.text}
      </div>
    );
  };

  // Clear all chats
  const clearAllChats = () => {
    if (window.confirm("Are you sure you want to delete all chats?")) {
      createNewChat();
      const newId = Object.keys(allChats)[0];
      const newChat = { [newId]: { name: "New Chat", messages: [] } };
      setAllChats(newChat);
      localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(newChat));
    }
  };

  // Export chats
  const exportChats = () => {
    const dataStr = JSON.stringify(allChats, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `verifyfirst-chats-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Get sorted chats (pinned first, then by date)
  const getSortedChats = () => {
    const entries = Object.entries(allChats);
    const pinned = entries.filter(([id]) => pinnedChats.includes(id));
    const unpinned = entries.filter(([id]) => !pinnedChats.includes(id));
    
    return [
      ...pinned.sort(([,a], [,b]) => (b.updatedAt || 0) - (a.updatedAt || 0)),
      ...unpinned.sort(([,a], [,b]) => (b.updatedAt || 0) - (a.updatedAt || 0))
    ];
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100'
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900'
    }`}>
      {/* Fullscreen Media Viewer */}
      {fullscreenMedia && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenMedia(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 text-white z-10 transition-colors"
          >
            <FaTimes size={24} />
          </button>
          {fullscreenMedia.match(/\.(mp4|mov|webm|avi|mkv)$/i) ? (
            <video 
              src={fullscreenMedia} 
              controls 
              autoPlay 
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
          ) : (
            <img 
              src={fullscreenMedia} 
              alt="Fullscreen" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          )}
          <button
            onClick={() => setFullscreenMedia(null)}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors font-medium"
          >
            Close Viewer
          </button>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full shadow-2xl ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3 font-medium">
                  {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transform transition-transform shadow-lg ${
                    isDarkMode ? 'translate-x-8' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <button
                  onClick={exportChats}
                  className="w-full py-3 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 transition-colors flex items-center justify-center gap-3 font-medium"
                >
                  <AiOutlineDownload />
                  <span>Export All Chats</span>
                </button>
                
                <button
                  onClick={clearAllChats}
                  className="w-full py-3 px-4 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 transition-colors flex items-center justify-center gap-3 font-medium"
                >
                  <FaTrash />
                  <span>Clear All Chats</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed md:relative h-full z-30 transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm border-r border-gray-200'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${
          isMobile ? 'w-80' : 'w-80'
        } shadow-xl`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className={`p-5 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <HiOutlineSparkles className="text-white text-xl" />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      VerifyFirst.ai
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaTimes className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <button
                onClick={createNewChat}
                className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md font-medium ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200'
                }`}
              >
                <FaPlus />
                <span>New Chat</span>
              </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-3">
              {getSortedChats().map(([chatId, chat]) => (
                <div
                  key={chatId}
                  className={`group relative p-4 rounded-xl mb-2 transition-all cursor-pointer ${
                    activeChatId === chatId
                      ? isDarkMode
                        ? 'bg-blue-900/20 border border-blue-500/30'
                        : 'bg-blue-50 border border-blue-200 shadow-sm'
                      : isDarkMode
                        ? 'hover:bg-gray-800/50 border border-transparent'
                        : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
                  }`}
                  onClick={() => {
                    setActiveChatId(chatId);
                    setMessages(chat.messages || []);
                    if (isMobile) setSidebarOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {pinnedChats.includes(chatId) && (
                          <BsFillPinAngleFill className="text-blue-500 text-xs rotate-45" />
                        )}
                        <div className="font-medium truncate text-gray-800 dark:text-gray-200">
                          {chat.name}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <span>{chat.messages?.length || 0} messages</span>
                        <span>•</span>
                        <span>{formatTime(chat.updatedAt || Date.now())}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinChat(chatId);
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title={pinnedChats.includes(chatId) ? "Unpin chat" : "Pin chat"}
                      >
                        {pinnedChats.includes(chatId) ? (
                          <BsFillPinAngleFill className="text-blue-500 text-sm rotate-45" />
                        ) : (
                          <BsPin className="text-gray-400 text-sm" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newName = prompt('Rename chat:', chat.name);
                          if (newName) renameChat(chatId, newName);
                        }}
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        title="Rename"
                      >
                        <span className="text-gray-600 dark:text-gray-400 text-sm">✏️</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Delete this chat?')) {
                            deleteChat(chatId);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="space-y-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors font-medium ${
                    isDarkMode 
                      ? 'hover:bg-gray-800/50 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FiSettings />
                    <span>Settings</span>
                  </div>
                  <BsThreeDotsVertical />
                </button>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-3 rounded-xl flex items-center gap-3 transition-colors font-medium ${
                      isDarkMode 
                        ? 'hover:bg-gray-800/50 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isDarkMode ? (
                      <FaSun className="text-yellow-500" />
                    ) : (
                      <FaMoon className="text-blue-600" />
                    )}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    <div className="font-medium">VerifyFirst.ai</div>
                    <div>v1.0.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className={`sticky top-0 z-20 border-b backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-gray-900/80 border-gray-800' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="flex items-center justify-between p-4 md:p-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2.5 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-gray-800 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <FaBars />
                </button>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    isDarkMode 
                      ? 'bg-gray-800' 
                      : 'bg-gradient-to-br from-blue-50 to-white border border-blue-100'
                  }`}>
                    <FaRobot className={isDarkMode ? 'text-blue-400' : 'text-blue-600 text-xl'} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                      {allChats[activeChatId]?.name || 'Chat'}
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                      }`} />
                      <span>{loading ? 'AI is thinking...' : 'Online & Ready'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isMobile && (
                  <button
                    onClick={() => setShowSettings(true)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-800 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <FiSettings />
                  </button>
                )}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2.5 rounded-xl transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-gray-800 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {isDarkMode ? (
                    <FaSun className="text-yellow-500" />
                  ) : (
                    <FaMoon className="text-blue-600" />
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Chat Messages */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 max-w-2xl mx-auto">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-lg ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' 
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100'
                }`}>
                  <div className="text-5xl">✨</div>
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Welcome to VerifyFirst.ai
                </h2>
                <p className={`max-w-md mb-10 text-lg ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Your intelligent AI assistant is ready to help. Start a conversation or upload files for analysis.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                  <div className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                    isDarkMode 
                      ? 'bg-gray-800/30 border-gray-700 hover:border-blue-500/30' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="text-2xl mb-3">💬</div>
                    <div className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Chat Analysis</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ask questions and get detailed AI responses</p>
                  </div>
                  <div className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                    isDarkMode 
                      ? 'bg-gray-800/30 border-gray-700 hover:border-blue-500/30' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="text-2xl mb-3">📸</div>
                    <div className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Media Upload</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Share images, videos, or documents for analysis</p>
                  </div>
                  <div className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                    isDarkMode 
                      ? 'bg-gray-800/30 border-gray-700 hover:border-blue-500/30' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="text-2xl mb-3">⚡</div>
                    <div className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Fast Responses</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get quick, accurate answers from our AI</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-8">
                {messages.map((msg, index) => {
                  const isUser = msg.sender === 'user';
                  const showDate = index === 0 || 
                    new Date(msg.timestamp).toDateString() !== 
                    new Date(messages[index-1].timestamp).toDateString();

                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="flex justify-center my-8">
                          <div className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                            isDarkMode 
                              ? 'bg-gray-800 text-gray-300' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {formatDate(msg.timestamp)}
                          </div>
                        </div>
                      )}

                      <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                          isUser
                            ? isDarkMode
                              ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                              : 'bg-gradient-to-br from-blue-500 to-blue-600'
                            : isDarkMode
                              ? 'bg-gradient-to-br from-purple-600 to-purple-700'
                              : 'bg-gradient-to-br from-purple-500 to-purple-600'
                        }`}>
                          {isUser ? (
                            <FaUserCircle className="text-white" />
                          ) : (
                            <FaRobot className="text-white" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className={`flex-1 max-w-[85%] md:max-w-[75%] ${
                          isUser ? 'text-right' : ''
                        }`}>
                          <div className={`inline-block p-5 rounded-2xl shadow-sm ${
                            isUser
                              ? isDarkMode
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-blue-200'
                              : isDarkMode
                                ? 'bg-gray-800 border border-gray-700 rounded-bl-none'
                                : 'bg-white border border-gray-200 rounded-bl-none'
                          } ${msg.emergency ? 'border-2 border-red-400 shadow-red-200' : ''}`}>
                            <div className="mb-3">
                              {renderMessageContent(msg)}
                            </div>
                            
                            <div className={`flex items-center justify-between mt-4 pt-3 ${
                              isDarkMode ? 'border-gray-700' : 'border-gray-100'
                            } ${isUser ? 'border-t border-opacity-10' : ''}`}>
                              <span className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {formatTime(msg.timestamp)}
                              </span>
                              {!msg.isMedia && (
                                <button
                                  onClick={() => copyToClipboard(msg.text)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    isDarkMode 
                                      ? 'hover:bg-gray-700' 
                                      : 'hover:bg-gray-100'
                                  }`}
                                  title="Copy message"
                                >
                                  {copiedMessageId === msg.text ? (
                                    <FaCheck className="text-green-500" />
                                  ) : (
                                    <FaCopy className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}

                {/* Typing Indicator */}
                {loading && (
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-purple-600 to-purple-700'
                        : 'bg-gradient-to-br from-purple-500 to-purple-600'
                    }`}>
                      <FaRobot className="text-white" />
                    </div>
                    <div className={`p-5 rounded-2xl rounded-tl-none shadow-sm ${
                      isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                        } animate-bounce`} />
                        <div className={`w-2 h-2 rounded-full ${
                          isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                        } animate-bounce delay-150`} />
                        <div className={`w-2 h-2 rounded-full ${
                          isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                        } animate-bounce delay-300`} />
                        <span className={`ml-2 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </main>

          {/* Input Area */}
          <footer className={`sticky bottom-0 border-t backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-gray-900/80 border-gray-800' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="max-w-3xl mx-auto p-4 md:p-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Message VerifyFirst.ai..."
                    className={`w-full p-4 pr-24 rounded-xl resize-none focus:outline-none focus:ring-2 transition-all ${
                      isDarkMode
                        ? 'bg-gray-800/50 border border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 placeholder-gray-500'
                        : 'bg-white border border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 placeholder-gray-400 shadow-sm'
                    }`}
                    rows="1"
                    style={{ minHeight: '56px', maxHeight: '120px' }}
                    disabled={loading}
                  />
                  
                  <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <button
                      onClick={() => fileRef.current.click()}
                      className={`p-2.5 rounded-xl transition-all ${
                        isDarkMode
                          ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800 shadow-sm'
                      }`}
                      disabled={loading}
                      title="Upload file"
                    >
                      <FiUpload />
                    </button>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={loading || !input.trim()}
                      className={`p-2.5 rounded-xl flex items-center justify-center transition-all shadow-md ${
                        loading || !input.trim()
                          ? isDarkMode
                            ? 'bg-gray-700/50 text-gray-500'
                            : 'bg-gray-200 text-gray-400'
                          : isDarkMode
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-200'
                      }`}
                    >
                      {loading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      ) : (
                        <FiSend />
                      )}
                    </button>
                  </div>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                />
              </div>

              {/* File Info */}
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className={`flex items-center gap-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="flex items-center gap-2">
                    <FaImage className="text-xs" />
                    <span>Supports images, videos, PDFs</span>
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:flex items-center gap-2">
                    <span>Press</span>
                    <kbd className={`px-2 py-1 rounded text-xs font-medium ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      Enter
                    </kbd>
                    <span>to send</span>
                  </span>
                </div>
                
                <div className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <span className="text-blue-600 dark:text-blue-400">VerifyFirst.ai</span>
                  <span className="ml-2">•</span>
                  <span className="ml-2">Secure & Private</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;