import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useAuth } from "../context/AuthContext";

// ── Icons (Self-contained, high-fidelity SVGs) ──────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const PawIcon = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
    <path d="M4.5 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4.91 2.39C13.88 12.53 12.96 12 12 12s-1.88.53-2.59 1.39C8.67 14.24 8 15 8 16c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1-.67-1.76-1.41-2.61z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const AssignmentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ShieldUserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
  </svg>
);

// ── Profile Detail Field ───────────────────────────────────────────────────
const ProfileField = ({ label, value }) => (
  <div className="space-y-1.5 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
    <label className="block text-[11px] font-bold text-[#6f7979] uppercase tracking-widest">
      {label}
    </label>
    <div className="text-[16px] sm:text-[18px] font-medium text-[#191c1d] pb-2 border-b border-[#eceeef] w-full">
      {value || "—"}
    </div>
  </div>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/auth/me');
        const userData = response.data.data || response.data;
        setUser(userData);
      } catch (err) {
        console.error("Profile fetch failed", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#E0F7FA] flex justify-center items-center text-xl font-bold text-[#006064]">
        Loading profile...
      </div>
    );
  }

  const initials = `${user?.first_name?.charAt(0) || ""}${user?.last_name?.charAt(0) || ""}`.toUpperCase();

  // Dynamic Dashboard Actions based on Role
  const renderRoleActions = () => {
    const role = user?.role || "Adopter";

    if (role === "Adopter") {
      return (
        <>
          <button
            onClick={() => navigate("/pets")}
            className="flex flex-col items-center justify-center p-6 bg-cyan-50/40 hover:bg-cyan-50 border border-cyan-100/50 hover:border-cyan-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-100 text-[#006064] flex items-center justify-center group-hover:scale-110 transition-transform">
              <PawIcon cls="w-6 h-6" />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Browse Pets</span>
            <span className="text-[11px] text-[#6f7979]">Find your companion</span>
          </button>

          <button
            onClick={() => navigate("/favorites")}
            className="flex flex-col items-center justify-center p-6 bg-rose-50/20 hover:bg-rose-50/40 border border-rose-100/40 hover:border-rose-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-rose-100/50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HeartIcon />
            </div>
            <span className="font-bold text-sm text-[#00464a]">My Favorites</span>
            <span className="text-[11px] text-[#6f7979]">Pets you favorited</span>
          </button>

          <button
            onClick={() => navigate("/my-requests")}
            className="flex flex-col items-center justify-center p-6 bg-amber-50/30 hover:bg-amber-50/60 border border-amber-100/40 hover:border-amber-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChatIcon />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Adoption Requests</span>
            <span className="text-[11px] text-[#6f7979]">Check request status</span>
          </button>
        </>
      );
    }

    if (role === "Shelter" || role === "Owner") {
      return (
        <>
          <button
            onClick={() => navigate("/shelter/pets")}
            className="flex flex-col items-center justify-center p-6 bg-cyan-50/40 hover:bg-cyan-50 border border-cyan-100/50 hover:border-cyan-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-100 text-[#006064] flex items-center justify-center group-hover:scale-110 transition-transform">
              <PawIcon cls="w-6 h-6" />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Manage Pets</span>
            <span className="text-[11px] text-[#6f7979]">View and edit listings</span>
          </button>

          <button
            onClick={() => navigate("/shelter/pets/new")}
            className="flex flex-col items-center justify-center p-6 bg-emerald-50/30 hover:bg-emerald-50/50 border border-emerald-100/40 hover:border-emerald-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100/50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusIcon />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Add New Pet</span>
            <span className="text-[11px] text-[#6f7979]">Create adoption profiles</span>
          </button>

          <button
            onClick={() => navigate("/shelter/requests")}
            className="flex flex-col items-center justify-center p-6 bg-blue-50/30 hover:bg-blue-50/50 border border-blue-100/40 hover:border-blue-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100/50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AssignmentIcon />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Adoption Requests</span>
            <span className="text-[11px] text-[#6f7979]">Review adopter filings</span>
          </button>

          <button
            onClick={() => navigate("/shelter/reviews")}
            className="flex flex-col items-center justify-center p-6 bg-amber-50/30 hover:bg-amber-50/50 border border-amber-100/40 hover:border-amber-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100/50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <StarIcon />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Shelter Reviews</span>
            <span className="text-[11px] text-[#6f7979]">View ratings & reviews</span>
          </button>
        </>
      );
    }

    if (role === "Admin") {
      return (
        <>
          <button
            onClick={() => navigate("/admin/users")}
            className="flex flex-col items-center justify-center p-6 bg-purple-50/30 hover:bg-purple-50/50 border border-purple-100/40 hover:border-purple-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100/50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldUserIcon />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Approve Shelters</span>
            <span className="text-[11px] text-[#6f7979]">Verify shelter profiles</span>
          </button>

          <button
            onClick={() => navigate("/admin/pets")}
            className="flex flex-col items-center justify-center p-6 bg-rose-50/20 hover:bg-rose-50/40 border border-rose-100/40 hover:border-rose-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-rose-100/50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PawIcon cls="w-6 h-6" />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Approve Pet Listings</span>
            <span className="text-[11px] text-[#6f7979]">Review pending pets</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center justify-center p-6 bg-cyan-50/40 hover:bg-cyan-50 border border-cyan-100/50 hover:border-cyan-200 rounded-2xl text-center gap-3 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer active:scale-95 w-full"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-100 text-[#006064] flex items-center justify-center group-hover:scale-110 transition-transform">
              <HomeIcon />
            </div>
            <span className="font-bold text-sm text-[#00464a]">Main Portal</span>
            <span className="text-[11px] text-[#6f7979]">Return to main site</span>
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen w-full bg-[#E0F7FA] font-['Plus_Jakarta_Sans',sans-serif] text-[#191c1d] antialiased">
      {/* ── Main Content Container ── */}
      <main className="pt-10 pb-16 px-4 w-full flex justify-center">
        <div className="w-full max-w-[800px] mx-auto flex flex-col items-center">

          {/* Avatar Profile Section */}
          <div className="relative mb-10 mt-4">
            <div
              className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#006064] flex items-center justify-center text-white select-none transition-transform hover:scale-105"
              style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.06)" }}
            >
              <span className="text-[44px] font-black tracking-tight leading-none">
                {initials}
              </span>
            </div>
            {/* Verification Badge */}
            <div 
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#9f4122] rounded-full border-4 border-[#E0F7FA] flex items-center justify-center text-white"
              title="Verified Account"
            >
              <VerifiedIcon />
            </div>
          </div>

          {/* Personal Information Details Card */}
          <div
            className="w-full bg-white rounded-3xl p-6 sm:p-10 md:p-12 space-y-10"
            style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}
          >
            {/* Card Header */}
            <div className="text-center sm:text-left">
              <h1 className="text-[26px] sm:text-[32px] font-black text-[#00464a] m-0 mb-1.5 leading-tight">
                Personal Information
              </h1>
              <p className="text-sm sm:text-base text-[#3f4949] font-medium m-0">
                Manage your credentials and personal settings.
              </p>
            </div>

            {/* Profile Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-8">
              <ProfileField label="First Name"    value={user.first_name} />
              <ProfileField label="Last Name"     value={user.last_name} />
              <ProfileField label="Email Address" value={user.email} />
              <ProfileField label="Phone Number"  value={user.phone} />
              <ProfileField label="City"          value={user.city} />
              <ProfileField label="Country"       value={user.country} />
            </div>

            {/* Data Protection Footer banner */}
            <div className="pt-8 border-t border-[#f2f4f5] flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d0e7ea] flex items-center justify-center text-[#364a4d]">
                  <ShieldIcon />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#00464a] m-0 uppercase tracking-widest leading-none mb-1">
                    Data Security
                  </p>
                  <p className="text-[11px] text-[#6f7979] m-0">
                    Your details are encrypted and safe with us.
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-bold text-[#9f4122] m-0 uppercase tracking-wider select-none">
                Verified Member
              </p>
            </div>
          </div>

          {/* Quick Actions Dashboard Card (Centralized Role Dashboard) */}
          <div
            className="w-full bg-white rounded-3xl p-6 sm:p-10 md:p-12 mt-8 space-y-6"
            style={{ boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}
          >
            <div className="text-center sm:text-left">
              <h2 className="text-[22px] sm:text-[24px] font-black text-[#00464a] m-0 mb-1 leading-tight">
                Quick Actions Portal
              </h2>
              <p className="text-xs sm:text-sm text-[#6f7979] font-medium m-0">
                Centralized features authorized for your <span className="font-bold text-[#9f4122]">{user?.role || "Adopter"}</span> account.
              </p>
            </div>

            {/* Action Grid Buttons (Responsively wraps: 1 col on mobile, 2 sm, 3 md) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {renderRoleActions()}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}