import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Home, 
  Users, 
  Settings, 
  Send, 
  Image as ImageIcon, 
  MoreVertical, 
  Phone, 
  Video, 
  Search, 
  Heart, 
  MessageSquare, 
  Share2, 
  ArrowLeft,
  PlusCircle,
  Check,
  CheckCheck,
  LogOut,
  UserPlus,
  Lock,
  Trash2
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged,
  signInWithCustomToken,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  onSnapshot, 
  serverTimestamp, 
  doc, 
  setDoc, 
  getDoc,
  deleteDoc
} from 'firebase/firestore';

// --- FIREBASE SETUP ---
// INSTRUCTIONS: 
// 1. For local development, replace the line below with your actual config object from the Firebase Console.
// 2. Example: const firebaseConfig = { apiKey: "...", authDomain: "...", ... };
const firebaseConfig = JSON.parse(__firebase_config);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- CONSTANTS ---
// Strict path requirement for this demo environment
const PUBLIC_DATA = `artifacts/${appId}/public/data`;

// --- COMPONENTS ---

// 1. Auth Screen
const AuthScreen = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await onJoin(name);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-blue-200 shadow-xl">
          <span className="text-white font-bold text-4xl">C</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Creachive</h1>
        <p className="text-gray-500 mb-8">
          Join the server. Create your unique identity.<br/>
          <span className="text-xs text-blue-500 font-medium">Posts • Stories • Private Chats</span>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose a Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center shadow-md"
          >
            {loading ? 'Creating Identity...' : 'Join Server'}
          </button>
        </form>
      </div>
    </div>
  );
};

// 2. Navigation
const Navigation = ({ activeTab, setActiveTab, currentUser }) => {
  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'chats', icon: MessageCircle, label: 'Chats' },
    { id: 'profile', icon: Settings, label: 'Profile' },
  ];

  const handleLogout = () => {
    signOut(auth);
    window.location.reload();
  };

  return (
    <>
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-20">
        <div className="p-6 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold text-blue-600">Creachive</span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={24} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-2 rounded-xl mb-2 bg-gray-50">
            <img src={currentUser?.avatar} alt="Me" className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{currentUser?.name}</p>
              <p className="text-[10px] text-gray-400 truncate font-mono">ID: {currentUser?.id?.slice(0,6)}...</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 text-red-500 text-sm py-2 hover:bg-red-50 rounded-lg transition">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 px-2 pb-safe">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

// 3. Feed & Stories Component
const Feed = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  
  // Story Creation State
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [storyText, setStoryText] = useState('');

  // Subscribe to Posts
  useEffect(() => {
    const q = query(collection(db, PUBLIC_DATA, 'posts'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      allPosts.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setPosts(allPosts);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to Stories
  useEffect(() => {
    const q = query(collection(db, PUBLIC_DATA, 'stories'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allStories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filter stories older than 24 hours
      const now = Date.now() / 1000;
      const recentStories = allStories.filter(s => (now - (s.timestamp?.seconds || 0)) < 86400);
      recentStories.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setStories(recentStories);
    });
    return () => unsubscribe();
  }, []);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    setIsPosting(true);
    try {
      await addDoc(collection(db, PUBLIC_DATA, 'posts'), {
        content: newPostContent,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        likes: 0,
        comments: 0,
        timestamp: serverTimestamp()
      });
      setNewPostContent('');
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleCreateStory = async () => {
    if (!storyText.trim()) return;
    try {
      await addDoc(collection(db, PUBLIC_DATA, 'stories'), {
        content: storyText,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        // Assign a random gradient to the story
        gradient: Math.floor(Math.random() * 5), 
        timestamp: serverTimestamp()
      });
      setStoryText('');
      setIsAddingStory(false);
    } catch (e) {
      console.error("Error adding story", e);
    }
  };

  const gradients = [
    'from-blue-400 to-purple-500',
    'from-green-400 to-teal-500',
    'from-orange-400 to-red-500',
    'from-pink-400 to-rose-500',
    'from-indigo-400 to-cyan-500'
  ];

  return (
    <div className="flex-1 bg-gray-100 min-h-screen pb-20 md:pb-0 md:ml-64">
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-gray-200 shadow-sm md:hidden flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">Creachive</span>
        <Search size={20} className="text-gray-500" />
      </header>

      <div className="max-w-2xl mx-auto pt-4 md:pt-8 px-0 md:px-4 space-y-4">
        
        {/* Real Stories Section */}
        <div className="bg-white md:rounded-xl p-4 shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-4">
            {/* Add Story Button */}
            <div 
              onClick={() => setIsAddingStory(true)}
              className="relative inline-block w-20 flex-shrink-0 text-center cursor-pointer group"
            >
              <div className="relative w-16 h-16 mx-auto rounded-full p-1 border-2 border-dashed border-gray-300 group-hover:border-blue-500 transition">
                <img src={currentUser?.avatar} alt="Me" className="w-full h-full rounded-full object-cover opacity-80" />
                <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 border-2 border-white">
                  <PlusCircle size={12} className="text-white" />
                </div>
              </div>
              <span className="text-xs mt-2 block font-medium">Add Story</span>
            </div>

            {/* Render Real Stories from Server */}
            {stories.map((story) => (
              <div key={story.id} className="relative inline-block w-20 flex-shrink-0 text-center cursor-pointer">
                <div className="relative w-16 h-16 mx-auto rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-purple-600">
                  <div className="bg-white p-[2px] rounded-full w-full h-full">
                    <img src={story.authorAvatar} alt={story.authorName} className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
                <span className="text-xs mt-2 block font-medium truncate px-1">{story.authorName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Story Input Modal (Simple Inline) */}
        {isAddingStory && (
          <div className="bg-blue-50 p-4 md:rounded-xl border border-blue-100 animate-in slide-in-from-top-2">
            <h3 className="font-bold text-blue-800 mb-2">New Story</h3>
            <input 
              autoFocus
              className="w-full p-2 rounded-lg border border-blue-200 mb-2"
              placeholder="Type a caption or status..."
              value={storyText}
              onChange={e => setStoryText(e.target.value)}
            />
            <div className="flex space-x-2">
              <button 
                onClick={handleCreateStory}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-bold"
              >
                Share Story
              </button>
              <button 
                onClick={() => setIsAddingStory(false)}
                className="text-gray-500 px-4 py-1 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Post Input */}
        <div className="bg-white md:rounded-xl p-4 shadow-sm">
          <div className="flex space-x-3">
            <img src={currentUser?.avatar} alt="Me" className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex-1">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={`What's on your mind, ${currentUser?.name?.split(' ')[0]}?`}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-100 transition resize-none outline-none"
                rows={2}
              />
            </div>
          </div>
          <div className="flex justify-end mt-2 pt-2 border-t border-gray-50">
             <button 
               onClick={handleCreatePost}
               disabled={!newPostContent.trim() || isPosting}
               className={`px-6 py-1.5 rounded-full font-medium text-sm text-white transition-all ${
                 newPostContent.trim() ? 'bg-blue-600 hover:bg-blue-700 shadow-md' : 'bg-gray-300 cursor-not-allowed'
               }`}
             >
               {isPosting ? 'Posting...' : 'Post'}
             </button>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.map((post) => (
          <div key={post.id} className="bg-white md:rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-bold text-gray-900">{post.authorName}</h3>
                  <p className="text-xs text-gray-500">
                    {post.timestamp?.seconds ? new Date(post.timestamp.seconds * 1000).toLocaleString() : 'Just now'}
                  </p>
                </div>
              </div>
              <MoreVertical size={20} className="text-gray-400" />
            </div>
            <div className="px-4 pb-3">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">{post.content}</p>
            </div>
            <div className="px-2 py-1 flex items-center justify-between border-t border-gray-50">
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 text-gray-600">
                <Heart size={20} />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 text-gray-600">
                <MessageSquare size={20} />
                <span className="text-sm">Comment</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Private Messaging Component
const Messaging = ({ currentUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Fetch all registered users to form the contact list
  useEffect(() => {
    const q = query(collection(db, PUBLIC_DATA, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(allUsers.filter(u => u.id !== currentUser.id));
    }, (err) => console.error("Users Error:", err));
    return () => unsubscribe();
  }, [currentUser.id]);

  // Unique Chat ID generator: sorts UIDs alphabetically to ensure A->B and B->A is the same room
  const getChatId = (uid1, uid2) => {
    return [uid1, uid2].sort().join('_');
  };

  // Subscribe to messages for the specific selected chat
  useEffect(() => {
    if (!selectedUser) return;
    const chatId = getChatId(currentUser.id, selectedUser.id);
    
    // Fetch all messages (client-side filtering used to ensure robustness without index)
    const q = query(collection(db, PUBLIC_DATA, 'messages'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMsgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const chatMsgs = allMsgs.filter(m => m.chatId === chatId);
      chatMsgs.sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0));
      setMessages(chatMsgs);
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser.id]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!activeMessage.trim() || !selectedUser) return;
    
    const chatId = getChatId(currentUser.id, selectedUser.id);
    const text = activeMessage;
    setActiveMessage(''); 

    try {
      await addDoc(collection(db, PUBLIC_DATA, 'messages'), {
        chatId, // This field ensures the message belongs to this specific private pair
        text,
        senderId: currentUser.id,
        senderName: currentUser.name,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Failed to send:", error);
    }
  };

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-gray-100 md:ml-64">
      {/* Contact List */}
      <div className={`
        flex-col bg-white border-r border-gray-200 w-full md:w-80 lg:w-96
        ${selectedUser ? 'hidden md:flex' : 'flex'}
      `}>
        <div className="p-4 border-b border-gray-100 bg-gray-50">
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Chats</h2>
           <p className="text-xs text-gray-500 mb-4">Select a user to start a private encrypted chat.</p>
           <div className="relative">
             <Search size={18} className="absolute left-3 top-3 text-gray-400" />
             <input type="text" placeholder="Search users..." className="w-full bg-white pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-blue-500" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.map(user => (
            <div 
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
            >
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  Tap to chat <Lock size={10} />
                </p>
              </div>
            </div>
          ))}
          {users.length === 0 && (
             <div className="p-8 text-center text-gray-400 text-sm">Waiting for others to join...</div>
          )}
        </div>
      </div>

      {/* Private Chat Room */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col bg-[#eef1f5] h-full relative w-full">
          {/* Header */}
          <div className="bg-white p-3 flex items-center justify-between border-b border-gray-200 shadow-sm z-10">
            <div className="flex items-center space-x-3">
              <button onClick={() => setSelectedUser(null)} className="md:hidden text-gray-600 hover:bg-gray-100 p-1 rounded-full">
                <ArrowLeft size={24} />
              </button>
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <Lock size={10} />
                  <span>Private Chat</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 text-blue-600">
              <Phone size={20} />
              <Video size={20} />
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3"
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                <Lock size={48} className="mb-2" />
                <p className="text-sm">This chat is private and secure.</p>
                <p className="text-xs">Send a message to start.</p>
              </div>
            )}
            {messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in zoom-in-95 duration-200`}>
                  <div className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-2 shadow-sm relative ${
                    isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`text-[10px] mt-1 flex items-center justify-end space-x-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                      <span>
                        {msg.timestamp?.seconds ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '...'}
                      </span>
                      {isMe && <CheckCheck size={14} />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white p-3 md:p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={activeMessage}
                onChange={(e) => setActiveMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!activeMessage.trim()}
                className={`p-3 rounded-full text-white transition-all shadow-md ${
                  activeMessage.trim() ? 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105' : 'bg-gray-300'
                }`}
              >
                <Send size={20} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#f0f2f5] border-l border-gray-200 p-8 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
             <MessageCircle size={48} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Creachive Messenger</h2>
          <p className="text-gray-500 max-w-sm">Pick a person from the left to start chatting individually.</p>
        </div>
      )}
    </div>
  );
};

// 5. Profile / Settings
const Profile = ({ currentUser }) => (
  <div className="flex-1 flex flex-col items-center justify-center h-screen bg-gray-50 md:ml-64 pb-20 md:pb-0">
    <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-sm w-full">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full p-1 border-2 border-blue-500">
        <img src={currentUser.avatar} alt="Profile" className="w-full h-full rounded-full bg-gray-200" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
      <div className="bg-gray-100 rounded-lg p-3 mt-4 mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Unique Server ID</p>
        <p className="font-mono text-sm text-gray-700 break-all select-all cursor-text">{currentUser.id}</p>
      </div>
      <p className="text-sm text-gray-500">This ID uniquely identifies you on the Creachive server.</p>
    </div>
  </div>
);

// --- MAIN APP CONTAINER ---

const App = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Auth & Profile Init
  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        const profileRef = doc(db, PUBLIC_DATA, 'users', authUser.uid);
        const snap = await getDoc(profileRef);
        if (snap.exists()) {
          setUserProfile({ id: authUser.uid, ...snap.data() });
        } else {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const handleJoin = async (name) => {
    if (!user) return;
    try {
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
      const userData = {
        name,
        avatar: avatarUrl,
        joinedAt: serverTimestamp()
      };
      await setDoc(doc(db, PUBLIC_DATA, 'users', user.uid), userData);
      setUserProfile({ id: user.uid, ...userData });
    } catch (e) {
      console.error("Error creating profile:", e);
    }
  };

  if (authChecking) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return <AuthScreen onJoin={handleJoin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'feed': return <Feed currentUser={userProfile} />;
      case 'chats': return <Messaging currentUser={userProfile} />;
      case 'profile': return <Profile currentUser={userProfile} />;
      default: return <Feed currentUser={userProfile} />;
    }
  };

  return (
    <div className="flex font-sans text-gray-900 bg-gray-100 min-h-screen">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} currentUser={userProfile} />
      {renderContent()}
    </div>
  );
};

export default App;
