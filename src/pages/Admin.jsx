import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  LogOut, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  CheckCircle, 
  Clock, 
  Trash2, 
  X, 
  Eye,
  Info,
  Loader2
} from 'lucide-react';
import { 
  signInWithGoogle, 
  logOutAdmin, 
  subscribeToAuthState, 
  subscribeToInquiries, 
  updateInquiryStatus, 
  deleteInquiry, 
  isEmailAuthorized,
  getWhitelistedEmails,
  isFirebaseConfigured 
} from '../lib/firebase';

const STATUS_CONFIG = {
  new: { label: 'New', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  contacted: { label: 'Contacted', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
  in_progress: { label: 'In Progress', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
  archived: { label: 'Archived', color: 'bg-gray-500/20 text-gray-400 border-gray-500/40' }
};

const Admin = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Subscribe to Auth State
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to Realtime Inquiries Feed when authenticated & authorized
  useEffect(() => {
    if (!currentUser || !isEmailAuthorized(currentUser.email)) return;
    const unsubscribe = subscribeToInquiries((data) => {
      setInquiries(data);
    });
    return () => unsubscribe();
  }, [currentUser]);

  const [authError, setAuthError] = useState('');

  const handleLogin = async () => {
    setLoggingIn(true);
    setAuthError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/api-key-not-valid') {
        setAuthError('Google Authentication is not activated in Firebase Console yet. Please go to Firebase Console -> Authentication -> Click "Get Started" -> Sign-in method -> Enable Google.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setAuthError('Google Sign-In is not enabled in Firebase Console yet. Please go to Firebase Console -> Authentication -> Sign-in method -> Enable Google.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setAuthError(`This domain (${window.location.hostname}) is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains.`);
      } else if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('The Google sign-in window was closed before completing login.');
      } else {
        setAuthError(err.message || 'Google Login failed. Check Firebase settings.');
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logOutAdmin();
    setCurrentUser(null);
    setSelectedInquiry(null);
  };

  const getNormalizedStatus = (status) => {
    if (!status) return 'new';
    const s = String(status).toLowerCase().trim().replace(/\s+/g, '_');
    return s === 'in_progress' || s === 'inprogress' ? 'in_progress' : s;
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI state update
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
    }
    await updateInquiryStatus(id, newStatus);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry entry?')) {
      setInquiries(prev => prev.filter(item => item.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      await deleteInquiry(id);
    }
  };

  // Filter & Search Logic
  const filteredInquiries = inquiries.filter(item => {
    const itemStatus = getNormalizedStatus(item.status);
    const matchesTab = activeTab === 'all' || itemStatus === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      (item.fullName && item.fullName.toLowerCase().includes(q)) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.company && item.company.toLowerCase().includes(q)) ||
      (item.projectType && item.projectType.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q));
    
    return matchesTab && matchesSearch;
  });

  // Calculate Metrics
  const stats = {
    total: inquiries.length,
    newCount: inquiries.filter(i => getNormalizedStatus(i.status) === 'new').length,
    contactedCount: inquiries.filter(i => getNormalizedStatus(i.status) === 'contacted').length,
    inProgressCount: inquiries.filter(i => getNormalizedStatus(i.status) === 'in_progress').length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gold gap-3">
        <Loader2 size={32} className="animate-spin" />
        <span className="text-gray-300 font-medium">Loading Admin Control Center...</span>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 1: NOT LOGGED IN
  // ----------------------------------------------------
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] bg-black flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full card bg-[#0d0d0d] border-[#222] p-8 md:p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mb-6">
            <ShieldCheck size={36} />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Admin Control Center</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Pixel Island 3D inquiry management portal. Please sign in with an authorized Google account.
          </p>

          {!isFirebaseConfigured && (
            <div className="w-full p-4 mb-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-left flex gap-3 items-start">
              <Info size={18} className="shrink-0 mt-0.5" />
              <div>
                <strong>Firebase Credentials Pending:</strong> You are currently in preview mode. Click Google Sign-In below to access the demo dashboard.
              </div>
            </div>
          )}

          {authError && (
            <div className="w-full p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-left flex gap-3 items-start">
              <ShieldAlert size={18} className="shrink-0 mt-0.5 text-red-400" />
              <div>
                <strong>Authentication Alert:</strong>
                <p className="mt-1 leading-relaxed">{authError}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => handleLogin()}
            disabled={loggingIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 font-semibold py-3.5 px-6 rounded-lg transition-all shadow-lg hover:shadow-white/10 disabled:opacity-50"
          >
            {loggingIn ? (
              <Loader2 size={20} className="animate-spin text-black" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            )}
            <span>Sign in with Google</span>
          </button>

          <div className="mt-8 text-xs text-gray-500">
            Protected area • Authorized admins only
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: LOGGED IN BUT ACCESS DENIED (NOT WHITELISTED)
  // ----------------------------------------------------
  if (!isEmailAuthorized(currentUser.email)) {
    return (
      <div className="min-h-[85vh] bg-black flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full card bg-[#0d0d0d] border-red-500/30 p-8 md:p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-6">
            <ShieldAlert size={36} />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Your Google account <strong className="text-white">{currentUser.email}</strong> does not have administrator permissions for this control center. Please contact the site owner or switch to an authorized Google account.
          </p>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#222] hover:bg-[#333] text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Sign out & Switch Account
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 3: FULL ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#222] pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold">Inquiry Control Center</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold/10 border border-gold/30 text-gold">
                Live Feed
              </span>
            </div>
            <p className="text-gray-400 text-sm">Review, track, and manage luxury architectural project inquiries.</p>
          </div>

          {/* Admin User Profile */}
          <div className="flex items-center gap-4 bg-[#111] border border-[#222] rounded-xl p-2.5 px-4">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-10 h-10 rounded-full border border-gold/40 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">
                {currentUser.displayName ? currentUser.displayName[0] : 'A'}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{currentUser.displayName || 'Admin'}</span>
              <span className="text-xs text-gray-400">{currentUser.email}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="ml-2 text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-[#222] transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Setup Banner if Firebase not yet configured */}
        {!isFirebaseConfigured && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-amber-200 text-sm">
            <div className="flex items-start gap-3">
              <Info size={20} className="shrink-0 mt-0.5 text-amber-400" />
              <div>
                <strong className="text-amber-400">Notice: Running in Local Fallback Mode</strong>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Paste your Firebase keys in `.env` to enable cloud persistence across devices. Currently saving entries locally.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-5 flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Total Submissions</span>
            <span className="text-3xl font-bold text-white">{stats.total}</span>
          </div>
          <div className="bg-[#0d0d0d] border border-amber-500/30 rounded-xl p-5 flex flex-col">
            <span className="text-xs text-amber-400 uppercase tracking-wider font-medium mb-1">New / Action Required</span>
            <span className="text-3xl font-bold text-amber-400">{stats.newCount}</span>
          </div>
          <div className="bg-[#0d0d0d] border border-blue-500/30 rounded-xl p-5 flex flex-col">
            <span className="text-xs text-blue-400 uppercase tracking-wider font-medium mb-1">Contacted</span>
            <span className="text-3xl font-bold text-blue-400">{stats.contactedCount}</span>
          </div>
          <div className="bg-[#0d0d0d] border border-purple-500/30 rounded-xl p-5 flex flex-col">
            <span className="text-xs text-purple-400 uppercase tracking-wider font-medium mb-1">In Progress</span>
            <span className="text-3xl font-bold text-purple-400">{stats.inProgressCount}</span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0d0d0d] border border-[#222] rounded-xl p-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['all', 'new', 'contacted', 'in_progress', 'archived'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-gold text-black' 
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#252525]'
                }`}
              >
                {tab.replace('_', ' ')}
                {tab === 'all' ? ` (${inquiries.length})` : ''}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Inquiries Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Submissions List (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {filteredInquiries.length === 0 ? (
              <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-12 text-center text-gray-500">
                <p className="text-lg font-medium text-gray-400">No inquiries found.</p>
                <p className="text-xs mt-1">Try selecting another filter or clearing your search query.</p>
              </div>
            ) : (
              filteredInquiries.map((inquiry) => {
                const normalizedKey = getNormalizedStatus(inquiry.status);
                const statusInfo = STATUS_CONFIG[normalizedKey] || STATUS_CONFIG.new;
                const isSelected = selectedInquiry?.id === inquiry.id;

                return (
                  <div
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`bg-[#0d0d0d] border rounded-xl p-5 cursor-pointer transition-all hover:border-gold/50 ${
                      isSelected ? 'border-gold bg-gold/5 shadow-lg shadow-gold/5' : 'border-[#222]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-white">{inquiry.fullName}</h3>
                          {inquiry.company && (
                            <span className="text-xs text-gray-400 bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333]">
                              {inquiry.company}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-2">
                          <Mail size={12} className="text-gold" /> {inquiry.email}
                          {inquiry.phone && <span>• {inquiry.phone}</span>}
                        </p>
                      </div>

                      {/* Status Tag */}
                      <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                      {inquiry.description || 'No description provided.'}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#1f1f1f] text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        {inquiry.projectType && (
                          <span className="text-gray-300 font-medium">{inquiry.projectType}</span>
                        )}
                        {inquiry.location && (
                          <span className="flex items-center gap-1"><MapPin size={12} /> {inquiry.location}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock size={12} />
                        <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Inquiry Detail Inspector (Right 5 Cols) */}
          <div className="lg:col-span-5">
            {selectedInquiry ? (
              <div className="bg-[#0d0d0d] border border-gold/40 rounded-xl p-6 flex flex-col gap-6 sticky top-24">
                
                {/* Drawer Header */}
                <div className="flex items-start justify-between border-b border-[#222] pb-4">
                  <div>
                    <span className="text-xs text-gold font-medium uppercase tracking-wider">Inquiry Inspector</span>
                    <h2 className="text-2xl font-bold text-white mt-1">{selectedInquiry.fullName}</h2>
                    {selectedInquiry.company && (
                      <p className="text-sm text-gray-400">{selectedInquiry.company}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#222]"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Status Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Update Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => handleStatusChange(selectedInquiry.id, key)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          getNormalizedStatus(selectedInquiry.status) === key
                            ? `${cfg.color} ring-1 ring-gold`
                            : 'bg-[#181818] border-[#2a2a2a] text-gray-400 hover:text-white'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Quick Actions */}
                <div className="flex items-center gap-3 bg-[#141414] border border-[#262626] rounded-xl p-4">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Pixel%20Island%203D%20-%20Project%20Discovery`}
                    className="flex-1 btn-primary py-2.5 text-xs justify-center"
                  >
                    <Mail size={14} /> Send Email
                  </a>
                  {selectedInquiry.phone && (
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="btn-secondary py-2.5 text-xs justify-center"
                    >
                      <Phone size={14} /> Call Client
                    </a>
                  )}
                </div>

                {/* Full Details Breakdown */}
                <div className="flex flex-col gap-4 text-sm divide-y divide-[#1f1f1f]">
                  <div className="pt-2">
                    <span className="text-xs text-gray-500 font-medium">Location</span>
                    <p className="text-gray-200 font-medium">{selectedInquiry.location || 'Not specified'}</p>
                  </div>
                  <div className="pt-3">
                    <span className="text-xs text-gray-500 font-medium">Project Scope & Deliverable Timeline</span>
                    <p className="text-gray-200 font-medium">{selectedInquiry.projectType} • {selectedInquiry.areaVisualized}</p>
                    <p className="text-gold text-xs mt-1">Timeline: {selectedInquiry.deadline || 'Flexible'}</p>
                  </div>
                  <div className="pt-3">
                    <span className="text-xs text-gray-500 font-medium">Requested Services</span>
                    {selectedInquiry.services && selectedInquiry.services.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedInquiry.services.map((srv, idx) => (
                          <span key={idx} className="bg-[#1c1c1c] border border-[#333] text-gray-300 text-xs px-2.5 py-1 rounded-md">
                            {srv}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400">None selected</p>
                    )}
                  </div>
                  <div className="pt-3">
                    <span className="text-xs text-gray-500 font-medium">Project Description</span>
                    <p className="text-gray-300 text-xs leading-relaxed mt-1 bg-[#141414] p-3 rounded-lg border border-[#222]">
                      {selectedInquiry.description || 'No description entered.'}
                    </p>
                  </div>
                  <div className="pt-3 flex justify-between items-center text-xs text-gray-500">
                    <span>Referral Source: {selectedInquiry.referral || 'Direct'}</span>
                    <span>ID: {selectedInquiry.id.slice(0, 10)}</span>
                  </div>
                </div>

                {/* Delete Entry */}
                <div className="pt-4 border-t border-[#222] flex justify-end">
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                  >
                    <Trash2 size={13} /> Delete Entry
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-10 text-center text-gray-500 flex flex-col items-center gap-3">
                <Eye size={32} className="text-gray-600 mb-1" />
                <p className="text-sm font-medium text-gray-400">Select an inquiry from the list to view complete details, change status, or reply directly.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Admin;
