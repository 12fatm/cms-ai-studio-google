/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Sun, 
  Moon, 
  Home, 
  Info, 
  Phone, 
  Briefcase, 
  Layers, 
  FileText, 
  Calendar,
  Edit3,
  Upload,
  CheckCircle2,
  XCircle,
  RefreshCw,
  FolderUp,
  X,
  Plus,
  Trash2,
  Link,
  Filter,
  Lock,
  Image as ImageIcon,
  Users,
  Zap,
  User,
  Mail,
  FileCheck,
  FileCode,
  Layout,
  LogOut,
  Settings,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Context ---

const ToastContext = React.createContext<{ triggerToast: () => void }>({ triggerToast: () => {} });

// --- Types ---

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: string[];
}

// --- Components ---

const Toast = ({ show, onClose }: { show: boolean, onClose: () => void }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 flex items-start gap-4 min-w-[320px] max-w-[400px]"
        >
          <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-bold text-slate-800">Page published successfully</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Your changes are now live and visible to users on the website.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ConfirmationModal = ({ 
  show, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion", 
  message = "Are you sure you want to delete this item? This action cannot be undone." 
}: { 
  show: boolean, 
  onClose: () => void, 
  onConfirm: () => void,
  title?: string,
  message?: string
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 max-w-md w-full overflow-hidden"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-2">
                <Trash2 size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
              </div>
              <div className="flex gap-3 w-full pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 px-6 py-3 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Sidebar = ({ 
  activeSubItem, 
  setActiveSubItem, 
  isCollapsed = false,
  isMobile = false,
  onClose,
  onLogout
}: { 
  activeSubItem: string, 
  setActiveSubItem: (id: string) => void,
  isCollapsed?: boolean,
  isMobile?: boolean,
  onClose?: () => void,
  onLogout?: () => void
}) => {
  const [expanded, setExpanded] = useState<string | null>('Home');

  useEffect(() => {
    const category = activeSubItem.split(' > ')[0];
    if (category) {
      setExpanded(category);
    }
  }, [activeSubItem]);

  const navItems: NavItem[] = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: <Home size={20} />, 
      children: [
        'Hero Section', 'Intro Section', 'Our Services', 'What Sets Us Apart', 
        'How We Partner', 'Company Quote', 'Call To Action Banner', 
        'News & Highlights', 'Team Snippet', 'Carousel'
      ] 
    },
    { 
      id: 'about', 
      label: 'About Us', 
      icon: <Info size={20} />,
      children: [
        'Hero Section', 'Who we are Section', 'Our Vision', 'Our Mission', 
        'Our Expertise', 'Our Team', 'Meet the Founders Section'
      ]
    },
    { 
      id: 'contact', 
      label: 'Contact Us', 
      icon: <Phone size={20} />,
      children: [
        'Hero Section', 'Contacts us through', 'Send us message'
      ]
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: <Briefcase size={20} />,
      children: [
        'Hero Section', 'Services cards', 'How we work', 'Call To Action Banner'
      ]
    },
    { 
      id: 'projects', 
      label: 'Projects', 
      icon: <Layers size={20} />,
      children: [
        'Hero Section', 'Projects Section', 'How we work'
      ]
    },
    { 
      id: 'blogs', 
      label: 'Blogs', 
      icon: <FileText size={20} />,
      children: [
        'Hero Section', 'Blog listing'
      ]
    },
    { 
      id: 'careers', 
      label: 'Careers', 
      icon: <Briefcase size={20} />,
      children: [
        'Hero Section', 'Job Listings', 'Application Section'
      ]
    }
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : (isMobile ? '100vw' : 288) }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden",
        isMobile && "w-screen max-w-[400px]"
      )}
    >
      {/* Mobile Header */}
      {isMobile && (
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand tracking-tight">Quick Access</h2>
          <button 
            onClick={onClose}
            className="p-2 border border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* User Profile Section (Mobile Only) */}
      {isMobile && (
        <div className="px-6 py-4 flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-3 w-full">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" 
              alt="User" 
              className="w-12 h-12 rounded-full border-2 border-slate-100"
            />
            <span className="font-bold text-slate-800 text-lg">Ahmed ali</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 border border-brand/20 rounded-xl text-brand bg-brand/5">
              <Search size={20} />
            </button>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="p-1.5 rounded-lg bg-brand text-white shadow-sm">
                <Sun size={18} />
              </button>
              <button className="p-1.5 rounded-lg text-slate-400">
                <Moon size={18} />
              </button>
            </div>
            <button 
              onClick={onLogout}
              className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all border border-rose-100"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className={cn("p-8", isCollapsed && "px-0 flex flex-col items-center")}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 shrink-0">
              <Layers size={24} />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap"
                >
                  Obelion
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap"
              >
                CMS Dashboard
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-4 mobile:px-6 py-2 custom-scrollbar overflow-x-hidden">
        <div className="space-y-2">
          {navItems.map((item) => {
            const isCategoryActive = activeSubItem.startsWith(item.label);
            const isExpanded = expanded === item.label;
            
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => !isCollapsed && setExpanded(isExpanded ? null : item.label)}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center justify-between p-3.5 rounded-xl transition-all",
                    (isExpanded && !isCollapsed) || (isCollapsed && isCategoryActive)
                      ? "bg-brand/5 border border-brand/10 text-brand" 
                      : "text-slate-500 hover:bg-slate-50 border border-transparent",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("shrink-0 transition-colors", (isCategoryActive || isExpanded) && "text-brand")}>
                      {item.icon}
                    </div>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-bold text-[15px] whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {item.children && !isCollapsed && (
                    <ChevronDown 
                      size={18} 
                      className={cn("transition-transform duration-300", isExpanded ? "rotate-180" : "")} 
                    />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {item.children && isExpanded && !isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden pl-10 pr-2 space-y-2 py-2"
                    >
                      {item.children.map((child) => {
                        const fullId = `${item.label} > ${child}`;
                        const isActive = activeSubItem === fullId;
                        return (
                          <button
                            key={fullId}
                            onClick={() => setActiveSubItem(fullId)}
                            className={cn(
                              "w-full text-left p-3 rounded-xl text-sm transition-all",
                              isActive 
                                ? "text-brand font-bold border border-brand/30 bg-white shadow-sm" 
                                : "text-slate-400 hover:text-slate-600"
                            )}
                          >
                            {child}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>

      {!isMobile && (
        <div className={cn("p-4 border-t border-slate-100", isCollapsed && "flex justify-center")}>
          <div className={cn("flex items-center gap-3 text-slate-400", isCollapsed && "justify-center")}>
            <ChevronRight size={14} className={cn("transition-transform", isCollapsed && "rotate-180")} />
            {!isCollapsed && (
              <span className="text-xs font-medium uppercase tracking-wider">Collapse Sidebar</span>
            )}
          </div>
        </div>
      )}
    </motion.aside>
  );
};

const Header = ({ onMenuClick, isCollapsed, onLogout }: { onMenuClick?: () => void, isCollapsed?: boolean, onLogout?: () => void }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Desktop Toggle Button */}
        <button 
          onClick={onMenuClick}
          className="hidden lg:flex w-10 h-10 items-center justify-center border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-all shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Logo - Visible on Mobile and Tablet */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-10 h-10 bg-[#1a2b3c] rounded-full flex items-center justify-center text-brand shadow-lg shrink-0">
            <Layers size={22} />
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-[#1a2b3c] tracking-tight">Obelion</span>
            <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">AI</span>
          </div>
        </div>

        {/* Search Bar - Visible on Desktop */}
        <div className="hidden lg:relative lg:block lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search icon" 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Profile & Theme - Visible on Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-200 pr-6">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-slate-100"
            />
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="font-semibold text-slate-700 group-hover:text-brand transition-colors">Ahmed ali</span>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button className="p-1.5 rounded-lg bg-white shadow-sm text-brand">
              <Sun size={18} />
            </button>
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
              <Moon size={18} />
            </button>
          </div>

          <button 
            onClick={onLogout}
            className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all shadow-sm border border-rose-100"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Hamburger Menu - Visible on Mobile and Tablet (Matches Image) */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden w-12 h-12 flex items-center justify-center border-2 border-brand rounded-2xl text-brand hover:bg-brand/5 transition-all shadow-sm"
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
};

const EditorSection = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
    {children}
  </div>
);

const TranslationInput = ({ label, value, type = 'input', charCount, maxChars, hideButtons = false }: { label: string, value: string, type?: 'input' | 'textarea', charCount?: number, maxChars?: number, hideButtons?: boolean }) => {
  const { triggerToast } = React.useContext(ToastContext);
  const [val, setVal] = useState(value);
  const [isEditing, setIsEditing] = useState(hideButtons); // If buttons are hidden, assume it's always "editable" or just display
  const [tempVal, setTempVal] = useState(value);

  const handleEdit = () => {
    setTempVal(val);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setVal(tempVal);
    setIsEditing(false);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    triggerToast();
  };
  
  return (
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">{label}</span>
      </div>
      <div className="group relative">
        {type === 'input' ? (
          <input 
            type="text" 
            value={val}
            dir={label === 'AR' ? 'rtl' : 'ltr'}
            disabled={!isEditing && !hideButtons}
            onChange={(e) => setVal(e.target.value)}
            className={cn(
              "w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
              (isEditing || hideButtons) ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
            )}
          />
        ) : (
          <>
            <textarea 
              rows={4}
              value={val}
              dir={label === 'AR' ? 'rtl' : 'ltr'}
              disabled={!isEditing && !hideButtons}
              onChange={(e) => setVal(e.target.value)}
              className={cn(
                "w-full p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm resize-none",
                (isEditing || hideButtons) ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
              )}
            />
            {charCount !== undefined && (
              <span className={cn(
                "absolute top-3 text-[10px] text-slate-400",
                label === 'AR' ? "left-4" : "right-4"
              )}>{charCount} / {maxChars}</span>
            )}
          </>
        )}
      </div>
      {!hideButtons && (
        <div className="flex flex-row justify-end gap-2 mt-4 lg:mt-2">
          {!isEditing ? (
            <button 
              onClick={handleEdit}
              className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Edit3 size={16} />
              Edited
            </button>
          ) : (
            <div className="flex flex-row justify-end gap-2 w-full lg:w-auto">
              <button 
                onClick={handleCancel}
                className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
              >
                <XCircle size={16} />
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
              >
                <RefreshCw size={16} />
                Update
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ContactUsHeroSectionEditor = () => {
  const { triggerToast } = React.useContext(ToastContext);
  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      triggerToast();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Hero Section</h1>
              <p className="text-sm text-slate-500">Controls the main hero content displayed at the top of the Contact page.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Hero Title */}
        <EditorSection 
          title="Hero Title" 
          description="Main heading displayed in the Contact page hero section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
            />
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
            />
          </div>
        </EditorSection>

        {/* Hero Subtitle */}
        <EditorSection 
          title="Hero Subtitle" 
          description="Short supporting text displayed below the hero title."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="EN" 
              type="textarea"
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
            />
            <TranslationInput 
              label="AR" 
              type="textarea"
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
            />
          </div>
        </EditorSection>

        {/* Banner Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Banner Image</h3>
            <p className="text-sm text-slate-500">The background image for the Contact page hero section.</p>
          </div>
          <div className="space-y-4">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group hover:border-brand/30 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center transition-colors group-hover:bg-brand/20">
                <Upload size={28} />
              </div>
              <div className="text-center">
                <p className="text-slate-600 font-bold">Drag and drop file/files here to start uploading</p>
                <p className="text-slate-400 text-sm font-medium my-1">OR</p>
                <button className="text-brand font-bold hover:underline">Browse files</button>
              </div>
              <p className="text-xs text-slate-400 font-medium">Only support .jpg, .png, .svg and .zip files</p>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*"
              />
            </div>
            {selectedFile && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-brand/10 text-brand rounded-lg flex items-center justify-center">
                  <ImageIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{selectedFile}</p>
                  <p className="text-xs text-slate-400">Ready to upload</p>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col mobile:flex-row justify-end items-center gap-3 mobile:gap-4 pt-8 border-t border-slate-100">
          <button className="w-full mobile:w-auto px-8 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all">Cancel</button>
          <button className="w-full mobile:w-auto px-12 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
        </div>
      </div>
    </div>
  );
};

const HeroSectionEditor = () => {
  const { triggerToast } = React.useContext(ToastContext);
  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      triggerToast();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Hero Section</h1>
              <p className="text-sm text-slate-500">This section controls the main banner content displayed at the top of the homepage.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Overline Text */}
        <EditorSection 
          title="Overline Text" 
          description="Short contextual phrase displayed above the hero title."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput label="EN" value="Building Smarter Digital Solutions" />
            <TranslationInput label="AR" value="بناء حلول رقمية أكثر ذكاءً" />
          </div>
        </EditorSection>

        {/* Hero Title */}
        <EditorSection 
          title="Hero Title" 
          description="The main strong statement for the hero section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="EN" 
              value="Empowering Your Business Future" 
            />
            <TranslationInput 
              label="AR" 
              value="تمكين مستقبل أعمالك الرقمي" 
            />
          </div>
        </EditorSection>

        {/* Hero Subtitle */}
        <EditorSection 
          title="Hero Subtitle" 
          description="A supporting sentence that explains your value proposition."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="EN" 
              type="textarea"
              value="We deliver innovative technology solutions designed to help your company scale and succeed in modern markets." 
            />
            <TranslationInput 
              label="AR" 
              type="textarea"
              value="نحن نقدم حلول تكنولوجية مبتكرة مصممة لمساعدة شركتك على التوسع والنجاح في الأسواق الحديثة." 
            />
          </div>
        </EditorSection>

        {/* Banner Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Banner Image</h3>
            <p className="text-sm text-slate-500">Main visual displayed in the hero section background.</p>
          </div>
          <div className="space-y-4">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-slate-200 rounded-2xl mobile:rounded-3xl p-6 mobile:p-10 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept=".jpg,.jpeg,.png,.svg,.zip"
              />
              <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
                <Upload size={28} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-700">Drag your file(s) to start uploading</p>
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-12 bg-slate-200" />
                  <span className="text-xs text-slate-400 font-bold uppercase">OR</span>
                  <div className="h-px w-12 bg-slate-200" />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                  className="text-brand font-bold border-2 border-brand/20 px-6 py-2 rounded-xl hover:bg-brand hover:text-white transition-all"
                >
                  Browse files
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium">Only support .jpg, .png, .svg and .zip files</p>
            
            {selectedFile && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-brand/10 text-brand rounded-lg flex items-center justify-center">
                  <ImageIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{selectedFile}</p>
                  <p className="text-xs text-slate-400">Ready to upload</p>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUsHeroSectionEditor = () => {
  const { triggerToast } = React.useContext(ToastContext);
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string, size: string } | null>({ name: 'assets.zip', size: '5.3MB' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + 'MB'
      });
      triggerToast();
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Hero Section</h1>
              <p className="text-sm text-slate-500">Controls the main hero content displayed at the top of the About page.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Hero Title */}
        <EditorSection 
          title="Hero Title" 
          description="Main heading displayed in the About page hero section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Hero Subtitle */}
        <EditorSection 
          title="Hero Subtitle" 
          description="Short supporting text displayed below the hero title."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Banner Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Banner Image</h3>
            <p className="text-sm text-slate-500">Main visual displayed in the About page hero section.</p>
          </div>
          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group hover:border-brand/30 transition-all cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.svg,.zip" 
              />
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">Drag your file(s) to start uploading</p>
                <p className="text-xs text-slate-400 mt-1">OR</p>
                <button className="mt-3 text-brand text-xs font-bold px-6 py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
                  Browse files
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Only support .jpg, .png and .svg and zip files</p>
            
            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                    <FileCode size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{selectedFile.name}</p>
                    <p className="text-xs text-slate-400">{selectedFile.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const IntroSectionEditor = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Intro Section</h1>
              <p className="text-sm text-slate-500">Short introduction about the company.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Primary heading of this section."
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TranslationInput label="AR" value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." type="textarea" charCount={0} maxChars={90} />
            <TranslationInput label="EN" value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" type="textarea" charCount={0} maxChars={30} />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Supporting text displayed below the section title."
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TranslationInput 
              label="AR" 
              type="textarea"
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              type="textarea"
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faste" 
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Caption Section */}
        <EditorSection 
          title="Caption Section" 
          description="Optional caption displayed within the section."
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TranslationInput label="EN" value="Automated smarter . Grow Faster" />
            <TranslationInput label="AR" value="في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." />
          </div>
        </EditorSection>
      </div>
    </div>
  );
};

const ServiceItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 mobile:p-6 border border-slate-100 rounded-2xl mobile:rounded-3xl bg-white space-y-6 mobile:space-y-8 shadow-sm">
      <div className="flex justify-between items-center pb-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-lg text-brand">
            <Briefcase size={20} />
          </div>
          <h4 className="font-bold text-slate-700 text-lg">service {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-white bg-rose-500 p-2.5 transition-all rounded-xl hover:bg-rose-600 shadow-lg shadow-rose-500/20"
          title="Delete Service"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Icon Upload */}
        <div className="w-full">
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="w-full border-2 border-dashed border-slate-200 rounded-2xl mobile:rounded-3xl flex flex-col items-center justify-center py-10 gap-4 hover:bg-slate-50 hover:border-brand transition-all cursor-pointer group bg-white"
           >
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".svg,.png,.jpg" />
             {previewUrl ? (
               <div className="w-full h-full relative group px-6">
                 <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto object-contain" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white rounded-2xl mobile:rounded-3xl">
                   <RefreshCw size={24} className="mb-2" />
                   <p className="text-xs font-bold uppercase tracking-wider">Change Icon</p>
                 </div>
               </div>
             ) : (
               <>
                 <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center transition-colors group-hover:bg-brand/20">
                   <div className="relative">
                     <FolderUp size={32} />
                   </div>
                 </div>
                 <div className="text-center space-y-2">
                   <p className="text-sm font-medium text-slate-600">Drag your file(s) to start uploading</p>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">OR</p>
                   <button className="text-brand text-sm font-bold border-2 border-brand/20 px-8 py-2 rounded-xl hover:bg-brand hover:text-white transition-all">Browse files</button>
                 </div>
               </>
             )}
           </div>
           <p className="text-[10px] text-slate-400 font-medium mt-3 text-center">Only support .jpg, .png and .svg and zip files</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
           <div className="flex flex-col lg:flex-row gap-6">
             <TranslationInput label="Section Title AR" value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." type="textarea" charCount={0} maxChars={90} />
             <TranslationInput label="Section Title EN" value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" type="textarea" charCount={0} maxChars={30} />
           </div>
           <div className="flex flex-col lg:flex-row gap-6">
             <TranslationInput label="Subtitle AR" value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." type="textarea" charCount={0} maxChars={90} />
             <TranslationInput label="Subtitle EN" value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" type="textarea" charCount={0} maxChars={30} />
           </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSectionEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [services, setServices] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addService = () => {
    setServices([...services, services.length + 1]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeService(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Our Services</h1>
              <p className="text-sm text-slate-500">Displays the company's services.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Primary heading of this section."
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TranslationInput label="AR" value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." type="textarea" charCount={0} maxChars={90} />
            <TranslationInput label="EN" value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" type="textarea" charCount={0} maxChars={30} />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Supporting text displayed below the section title."
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TranslationInput 
              label="AR" 
              type="textarea"
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              type="textarea"
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Services List */}
        <div className="space-y-8">
          {services.map((_, index) => (
            <ServiceItemEditor 
              key={index} 
              index={index} 
              onDelete={() => setDeleteIndex(index)} 
            />
          ))}
          
          <button 
            onClick={addService}
            className="w-full py-4 bg-brand text-white rounded-2xl mobile:rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
          >
            <Plus size={20} />
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 border border-slate-100 rounded-3xl bg-white space-y-6 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand/5 rounded-xl flex items-center justify-center text-brand">
            <Layout size={20} />
          </div>
          <h4 className="font-bold text-slate-700 text-lg">Project {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
          title="Delete Project"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Project Image */}
        <div className="w-full">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Project Image</span>
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="w-full h-[200px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white hover:border-brand/30 transition-all cursor-pointer group bg-white/50 shadow-sm overflow-hidden relative"
           >
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".svg,.png,.jpg" />
             {previewUrl ? (
               <div className="w-full h-full relative group">
                 <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                   <RefreshCw size={24} className="mb-2" />
                   <p className="text-xs font-bold uppercase tracking-wider">Change Image</p>
                   <p className="text-[10px] opacity-80 mt-1">{selectedFile}</p>
                 </div>
               </div>
             ) : (
               <>
                 <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand rounded-xl flex items-center justify-center transition-colors">
                   <Upload size={24} />
                 </div>
                 <div className="text-center">
                   <p className="text-sm font-bold text-slate-500">Upload Project Image</p>
                   <p className="text-[10px] text-slate-400 font-medium mt-1">Recommended size: 1920x1080px</p>
                 </div>
               </>
             )}
           </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <TranslationInput 
               label="Project Title AR" 
               value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
               type="textarea"
               charCount={0}
               maxChars={90}
             />
             <TranslationInput 
               label="Project Title EN" 
               value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
               type="textarea"
               charCount={0}
               maxChars={30}
             />
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <TranslationInput 
               label="Description AR" 
               value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
               type="textarea"
               charCount={0}
               maxChars={90}
             />
             <TranslationInput 
               label="Description EN" 
               value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
               type="textarea"
               charCount={0}
               maxChars={30}
             />
           </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSectionEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [projects, setProjects] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addProject = () => {
    setProjects([...projects, projects.length + 1]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeProject(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Projects Section</h1>
              <p className="text-sm text-slate-500">Showcase your best work and successful projects.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Main heading displayed for the projects section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Short text introducing your projects."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((_, index) => (
            <ProjectItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
          ))}
          
          <div className="flex justify-end">
            <button 
              onClick={addProject}
              className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUsWhoWeAreEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string, size: string } | null>({ name: 'assets.zip', size: '5.3MB' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + 'MB'
      });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Who we are Section</h1>
              <p className="text-sm text-slate-500">Controls the main hero content displayed at the top of the About page.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Main heading displayed for the Who We Are section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Short text explaining who the company is."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Banner Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Banner Image</h3>
            <p className="text-sm text-slate-500">Image representing the company or team.</p>
          </div>
          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group hover:border-brand/30 transition-all cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.svg,.zip" 
              />
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">Drag your file(s) to start uploading</p>
                <p className="text-xs text-slate-400 mt-1">OR</p>
                <button className="mt-3 text-brand text-xs font-bold px-6 py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
                  Browse files
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Only support .jpg, .png and .svg and zip files</p>
            
            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                    <FileCode size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{selectedFile.name}</p>
                    <p className="text-xs text-slate-400">{selectedFile.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  return (
    <div className="p-6 border border-slate-100 rounded-3xl bg-white space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand/5 rounded-xl flex items-center justify-center text-brand">
            <Link size={20} />
          </div>
          <h4 className="font-bold text-slate-700">LinkedIn link {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
          title="Delete link"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <TranslationInput label="Name" value="Automated smarter . Grow Faster" />
         <TranslationInput label="Link" value="url" />
      </div>
    </div>
  );
};

const ContactsThroughEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [contacts, setContacts] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addContact = () => {
    setContacts([...contacts, contacts.length + 1]);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeContact(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Contacts us through</h1>
              <p className="text-sm text-slate-500">Provides different ways for users to contact the company.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Main heading displayed for the contact methods section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Contact Methods List */}
        <div className="space-y-6">
          {contacts.map((_, index) => (
            <ContactItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
          ))}
          
          <div className="flex justify-end">
            <button 
              onClick={addContact}
              className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Plus size={20} />
              Add link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  return (
    <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50/30 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center text-brand font-bold text-xs">
            {index + 1}
          </div>
          <h4 className="font-bold text-slate-700">Job Position</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-rose-500 hover:text-rose-600 p-2 transition-colors rounded-xl hover:bg-rose-50 border border-rose-100 shadow-sm bg-white"
          title="Delete Job Position"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-6">
         <div className="flex gap-6">
           <TranslationInput label="Job Title EN" value="Senior Software Engineer" />
           <TranslationInput label="Job Title AR" value="مهندس برمجيات أول" />
         </div>
         <div className="flex gap-6">
           <TranslationInput label="Location EN" value="Remote / Dubai" />
           <TranslationInput label="Location AR" value="عن بعد / دبي" />
         </div>
         <div className="flex gap-6">
           <TranslationInput 
             label="Description EN" 
             value="We are looking for an experienced engineer to join our core team." 
             type="textarea" 
           />
           <TranslationInput 
             label="Description AR" 
             value="نحن نبحث عن مهندس ذو خبرة للانضمام إلى فريقنا الأساسي." 
             type="textarea" 
           />
         </div>
      </div>
    </div>
  );
};

const JobFormEditor = ({ job, onCancel, onPublish }: { job: any, onCancel: () => void, onPublish: () => void }) => {
  const isEdit = !!job;
  const { triggerToast } = React.useContext(ToastContext);
  const [isActive, setIsActive] = useState(job?.status ?? true);
  const [formData, setFormData] = useState({
    type: job?.type ?? 'Full time',
    titleAR: job?.titleAR ?? '',
    titleEN: job?.titleEN ?? '',
    descriptionAR: job?.descriptionAR ?? '',
    descriptionEN: job?.descriptionEN ?? '',
    department: job?.department ?? 'Engineering',
    team: job?.team ?? 'Frontend',
    requirements: job?.requirements ?? [],
    responsibilities: job?.responsibilities ?? []
  });

  const [isEditingTitleAR, setIsEditingTitleAR] = useState(false);
  const [isEditingTitleEN, setIsEditingTitleEN] = useState(false);
  const [isEditingDescriptionAR, setIsEditingDescriptionAR] = useState(false);
  const [isEditingDescriptionEN, setIsEditingDescriptionEN] = useState(false);

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    setFormData({ ...formData, requirements: formData.requirements.filter((_: any, i: number) => i !== index) });
  };

  const addResponsibility = () => {
    setFormData({ ...formData, responsibilities: [...formData.responsibilities, ''] });
  };

  const removeResponsibility = (index: number) => {
    setFormData({ ...formData, responsibilities: formData.responsibilities.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <span className="cursor-pointer hover:text-brand transition-colors" onClick={onCancel}>Job Listings</span>
        <ChevronRight size={14} />
        <span className="text-brand font-medium">{isEdit ? 'Edit Job' : 'Add New Job'}</span>
      </div>

      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">{isEdit ? (formData.titleEN || formData.titleAR || 'Edit Job') : 'Add New Job'}</h1>
              <p className="text-sm text-slate-500">Create a job post that will appear on the Careers page.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden mobile:block text-xs text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
            <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="pt-6 lg:pt-8 border-t border-slate-100 space-y-6">
          {/* Employment Type */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <span className="text-sm font-bold text-slate-700">Employment Type :</span>
            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  formData.type === 'Full time' ? "border-brand bg-brand/5" : "border-slate-300 group-hover:border-brand/50"
                )}>
                  {formData.type === 'Full time' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
                </div>
                <input 
                  type="radio" 
                  className="hidden" 
                  name="type" 
                  checked={formData.type === 'Full time'} 
                  onChange={() => setFormData({...formData, type: 'Full time'})}
                />
                <span className="text-sm font-medium text-slate-600">Full time</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  formData.type === 'Part time' ? "border-brand bg-brand/5" : "border-slate-300 group-hover:border-brand/50"
                )}>
                  {formData.type === 'Part time' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
                </div>
                <input 
                  type="radio" 
                  className="hidden" 
                  name="type" 
                  checked={formData.type === 'Part time'} 
                  onChange={() => setFormData({...formData, type: 'Part time'})}
                />
                <span className="text-sm font-medium text-slate-600">Part time</span>
              </label>
            </div>
          </div>

          {/* Title and Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Card title AR</label>
                  <span className="text-[10px] text-slate-400 font-medium">{formData.titleAR.length} / 90</span>
                </div>
                <div className="relative">
                  <textarea 
                    value={formData.titleAR}
                    disabled={!isEditingTitleAR}
                    onChange={(e) => setFormData({...formData, titleAR: e.target.value})}
                    className={cn(
                      "w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none text-right",
                      isEditingTitleAR ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                    )}
                    dir="rtl"
                    placeholder="عنوان الوظيفة..."
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingTitleAR ? (
                  <button 
                    onClick={() => setIsEditingTitleAR(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingTitleAR(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingTitleAR(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Card title EN</label>
                  <span className="text-[10px] text-slate-400 font-medium">{formData.titleEN.length} / 30</span>
                </div>
                <div className="relative">
                  <textarea 
                    value={formData.titleEN}
                    disabled={!isEditingTitleEN}
                    onChange={(e) => setFormData({...formData, titleEN: e.target.value})}
                    className={cn(
                      "w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none",
                      isEditingTitleEN ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                    )}
                    placeholder="Enter job title..."
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingTitleEN ? (
                  <button 
                    onClick={() => setIsEditingTitleEN(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingTitleEN(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingTitleEN(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Description AR</label>
                  <span className="text-[10px] text-slate-400 font-medium">{formData.descriptionAR.length} / 90</span>
                </div>
                <div className="relative">
                  <textarea 
                    value={formData.descriptionAR}
                    disabled={!isEditingDescriptionAR}
                    onChange={(e) => setFormData({...formData, descriptionAR: e.target.value})}
                    className={cn(
                      "w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none text-right",
                      isEditingDescriptionAR ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                    )}
                    dir="rtl"
                    placeholder="وصف الوظيفة..."
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingDescriptionAR ? (
                  <button 
                    onClick={() => setIsEditingDescriptionAR(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingDescriptionAR(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingDescriptionAR(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Description EN</label>
                  <span className="text-[10px] text-slate-400 font-medium">{formData.descriptionEN.length} / 30</span>
                </div>
                <div className="relative">
                  <textarea 
                    value={formData.descriptionEN}
                    disabled={!isEditingDescriptionEN}
                    onChange={(e) => setFormData({...formData, descriptionEN: e.target.value})}
                    className={cn(
                      "w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none",
                      isEditingDescriptionEN ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                    )}
                    placeholder="Enter job description..."
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingDescriptionEN ? (
                  <button 
                    onClick={() => setIsEditingDescriptionEN(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingDescriptionEN(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingDescriptionEN(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Department and Team */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Department</label>
              <div className="relative">
                <select 
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Team</label>
              <div className="relative">
                <select 
                  value={formData.team}
                  onChange={(e) => setFormData({...formData, team: e.target.value})}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Growth">Growth</option>
                  <option value="Product">Product</option>
                  <option value="AI Team">AI Team</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Requirements and Responsibilities */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Requirements</label>
              <div className="space-y-3">
                {formData.requirements.map((req: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <input 
                      type="text" 
                      value={req}
                      onChange={(e) => {
                        const newReqs = [...formData.requirements];
                        newReqs[index] = e.target.value;
                        setFormData({...formData, requirements: newReqs});
                      }}
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
                    />
                    <button 
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors shrink-0 mt-1"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={addRequirement}
                className="w-full tablet:w-auto bg-brand text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all"
              >
                <Plus size={16} />
                Add Requirement
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Responsibilities</label>
              <div className="space-y-3">
                {formData.responsibilities.map((resp: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <input 
                      type="text" 
                      value={resp}
                      onChange={(e) => {
                        const newResps = [...formData.responsibilities];
                        newResps[index] = e.target.value;
                        setFormData({...formData, responsibilities: newResps});
                      }}
                      className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
                    />
                    <button 
                      onClick={() => removeResponsibility(index)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors shrink-0 mt-1"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                onClick={addResponsibility}
                className="w-full tablet:w-auto bg-brand text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all"
              >
                <Plus size={16} />
                Add Responsibility
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col mobile:flex-row justify-end items-center gap-3 lg:gap-4 pt-6 lg:pt-8 border-t border-slate-100">
          <button 
            onClick={onCancel}
            className="w-full mobile:w-auto px-8 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <XCircle size={18} />
            Cancel
          </button>
          <button 
            onClick={onPublish}
            className="w-full mobile:w-auto px-12 py-2.5 bg-brand text-white rounded-xl font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterPanel = ({ show, onClose, onApply }: { show: boolean, onClose: () => void, onApply: (filters: any) => void }) => {
  const categories = [
    { id: 'product', label: 'Product', children: ['Product Managers', 'UX/UI', 'Brand'] },
    { id: 'engineering', label: 'Engineering', children: ['Frontend', 'Backend', 'AI', 'DevOps'] },
    { id: 'marketing', label: 'Marketing', children: ['Growth', 'Content', 'Performance'] },
    { id: 'operations', label: 'Operations', children: ['HR', 'Finance', 'Admin'] },
  ];

  const [expanded, setExpanded] = useState<string[]>(['product', 'engineering', 'marketing', 'operations']);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);

  // State to store "committed" filters
  const [committedFilters, setCommittedFilters] = useState({
    items: [] as string[],
    status: [] as string[],
    type: [] as string[]
  });

  // Sync draft with committed when panel opens
  useEffect(() => {
    if (show) {
      setSelectedItems(committedFilters.items);
      setStatusFilters(committedFilters.status);
      setTypeFilters(committedFilters.type);
    }
  }, [show, committedFilters]);

  const handleApply = () => {
    const newFilters = {
      items: selectedItems,
      status: statusFilters,
      type: typeFilters
    };
    setCommittedFilters(newFilters);
    onApply(newFilters);
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleChild = (child: string, parentId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(child)) {
        return prev.filter(i => i !== child);
      } else {
        return [...prev, child];
      }
    });
  };

  const toggleParent = (parentId: string, children: string[]) => {
    const allSelected = children.every(child => selectedItems.includes(child));
    if (allSelected) {
      setSelectedItems(prev => prev.filter(i => !children.includes(i)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...children])]);
    }
  };

  const getParentState = (children: string[]) => {
    const selectedCount = children.filter(child => selectedItems.includes(child)).length;
    if (selectedCount === 0) return 'none';
    if (selectedCount === children.length) return 'all';
    return 'some';
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-[2px]"
          />
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[120] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 rounded-lg text-brand">
                  <Filter size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Filter by</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Customer Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Customer Information</h3>
                <div className="space-y-4">
                  {categories.map((cat) => {
                    const parentState = getParentState(cat.children);
                    const isExpanded = expanded.includes(cat.id);
                    
                    return (
                      <div key={cat.id} className="space-y-3">
                        <div className="flex items-center justify-between group cursor-pointer" onClick={() => toggleExpand(cat.id)}>
                          <div className="flex items-center gap-3 flex-1">
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleParent(cat.id, cat.children);
                              }}
                              className={cn(
                                "w-5 h-5 border-2 rounded flex items-center justify-center transition-all",
                                parentState === 'all' ? "bg-brand border-brand" : 
                                parentState === 'some' ? "bg-brand/20 border-brand" : "border-slate-200 group-hover:border-brand/50"
                              )}
                            >
                              {parentState === 'all' && <CheckCircle2 size={14} className="text-white" />}
                              {parentState === 'some' && <div className="w-2.5 h-0.5 bg-brand rounded-full" />}
                            </div>
                            <span className={cn(
                              "text-sm font-medium transition-colors",
                              parentState !== 'none' ? "text-slate-800" : "text-slate-600 group-hover:text-slate-800"
                            )}>{cat.label}</span>
                          </div>
                          <div className="p-1 hover:bg-slate-50 rounded-lg transition-colors">
                            <ChevronDown 
                              size={18} 
                              className={cn("text-slate-400 transition-transform duration-300", isExpanded && "rotate-180")} 
                            />
                          </div>
                        </div>

                        {/* Children */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-8 space-y-3"
                            >
                              {cat.children.map((child) => (
                                <label key={child} className="flex items-center gap-3 group cursor-pointer">
                                  <div className={cn(
                                    "w-5 h-5 border-2 rounded flex items-center justify-center transition-all",
                                    selectedItems.includes(child) ? "bg-brand border-brand" : "border-slate-200 group-hover:border-brand/50"
                                  )}>
                                    {selectedItems.includes(child) && <CheckCircle2 size={14} className="text-white" />}
                                  </div>
                                  <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedItems.includes(child)}
                                    onChange={() => toggleChild(child, cat.id)}
                                  />
                                  <span className={cn(
                                    "text-sm font-medium transition-colors",
                                    selectedItems.includes(child) ? "text-slate-800" : "text-slate-500 group-hover:text-slate-700"
                                  )}>{child}</span>
                                </label>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Status</h3>
                <div className="space-y-3">
                  {['Open', 'Close'].map((item) => (
                    <label key={item} className="flex items-center gap-3 group cursor-pointer">
                      <div className={cn(
                        "w-5 h-5 border-2 rounded flex items-center justify-center transition-all",
                        statusFilters.includes(item) ? "bg-brand border-brand" : "border-slate-200 group-hover:border-brand/50"
                      )}>
                        {statusFilters.includes(item) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={statusFilters.includes(item)}
                        onChange={() => setStatusFilters(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
                      />
                      <span className={cn(
                        "text-sm font-medium transition-colors",
                        statusFilters.includes(item) ? "text-slate-800" : "text-slate-600 group-hover:text-slate-800"
                      )}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Employment type Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Employment type</h3>
                <div className="space-y-3">
                  {['Full time', 'Part time'].map((item) => (
                    <label key={item} className="flex items-center gap-3 group cursor-pointer">
                      <div className={cn(
                        "w-5 h-5 border-2 rounded flex items-center justify-center transition-all",
                        typeFilters.includes(item) ? "bg-brand border-brand" : "border-slate-200 group-hover:border-brand/50"
                      )}>
                        {typeFilters.includes(item) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={typeFilters.includes(item)}
                        onChange={() => setTypeFilters(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
                      />
                      <span className={cn(
                        "text-sm font-medium transition-colors",
                        typeFilters.includes(item) ? "text-slate-800" : "text-slate-600 group-hover:text-slate-800"
                      )}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100">
              <button 
                onClick={handleApply}
                className="w-full bg-brand text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
              >
                <CheckCircle2 size={20} />
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const JobListingsEditor = ({ onAdd, onEdit }: { onAdd: () => void, onEdit: (job: any) => void }) => {
  const [isActive, setIsActive] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "AI / ML Engineer",
      department: "Engineering",
      team: "AI Team",
      type: "Full time",
      status: true,
      date: "1 \\ 7 \\ 2026",
      description: "Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster",
      requirements: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer'],
      responsibilities: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer']
    },
    {
      id: 2,
      title: "Backend Engineer",
      department: "Engineering",
      team: "Backend",
      type: "Part time",
      status: true,
      date: "1 \\ 8 \\ 2026",
      description: "Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster",
      requirements: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer'],
      responsibilities: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer']
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing",
      team: "Growth",
      type: "Full time",
      status: true,
      date: "1 \\ 10 \\ 2026",
      description: "Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster",
      requirements: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer'],
      responsibilities: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer']
    },
    {
      id: 4,
      title: "Product Designer",
      department: "Design",
      team: "Product",
      type: "Full time",
      status: false,
      date: "1 \\ 7 \\ 2026",
      description: "Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster",
      requirements: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer'],
      responsibilities: ['Senior Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Senior Full-Stack Engineer']
    }
  ]);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deleteId !== null) {
      setJobs(jobs.filter(job => job.id !== deleteId));
      setDeleteId(null);
    }
  };

  const toggleStatus = (id: number) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: !job.status } : job
    ));
  };

  return (
    <div className="w-full">
      <FilterPanel 
        show={showFilter} 
        onClose={() => setShowFilter(false)} 
        onApply={(filters) => {
          console.log('Applied filters:', filters);
          setShowFilter(false);
        }} 
      />
      <ConfirmationModal 
        show={deleteId !== null} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete}
        title="Delete Job?"
        message="Are you sure you want to delete this job opening?"
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8">
        {/* Title Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Job Listings</h1>
              <p className="text-sm text-slate-500">Manages and displays all available job openings on the Careers page.</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
            <span className="hidden mobile:block text-xs text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-6">
          {/* Filters and Add Button */}
          <div className="flex flex-col mobile:flex-row justify-end items-stretch mobile:items-center gap-4">
            <button 
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm hover:bg-slate-50 transition-colors"
            >
              <Filter size={18} className="text-slate-400" />
              <span className="font-medium">Filter by</span>
            </button>
            <button 
              onClick={onAdd}
              className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Plus size={20} />
              Add Job
            </button>
          </div>

          {/* Table */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse table-auto lg:table-fixed">
              <thead className="hidden lg:table-header-group">
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">Job Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Team</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employment type</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Published Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="flex flex-col lg:table-row hover:bg-slate-50/50 transition-colors p-4 lg:p-0">
                    <td className="lg:px-6 lg:py-4 py-2 flex justify-between items-center lg:table-cell">
                      <span className="lg:hidden text-xs font-bold text-slate-400 uppercase">Job Title</span>
                      <span className="text-sm font-medium text-slate-700">{job.title}</span>
                    </td>
                    <td className="lg:px-6 lg:py-4 py-2 flex justify-between items-center lg:table-cell">
                      <span className="lg:hidden text-xs font-bold text-slate-400 uppercase">Department</span>
                      <span className="text-sm text-slate-500">{job.department}</span>
                    </td>
                    <td className="lg:px-6 lg:py-4 py-2 flex justify-between items-center lg:table-cell">
                      <span className="lg:hidden text-xs font-bold text-slate-400 uppercase">Team</span>
                      <span className="text-sm text-slate-500">{job.team}</span>
                    </td>
                    <td className="lg:px-6 lg:py-4 py-2 flex justify-between items-center lg:table-cell">
                      <span className="lg:hidden text-xs font-bold text-slate-400 uppercase">Employment type</span>
                      <span className="text-sm text-slate-500">{job.type}</span>
                    </td>
                    <td className="lg:px-6 lg:py-4 py-2 flex justify-between items-center lg:table-cell">
                      <span className="lg:hidden text-xs font-bold text-slate-400 uppercase">Status</span>
                      <button 
                        onClick={() => toggleStatus(job.id)}
                        className={cn(
                          "w-10 h-5 rounded-full transition-colors relative",
                          job.status ? "bg-emerald-500" : "bg-slate-300"
                        )}
                      >
                        <div className={cn(
                          "absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm flex items-center justify-center",
                          job.status ? "right-0.5" : "left-0.5"
                        )}>
                          <Lock size={8} className={cn(job.status ? "text-emerald-500" : "text-slate-300")} />
                        </div>
                      </button>
                    </td>
                    <td className="lg:px-6 lg:py-4 py-2 flex justify-between items-center lg:table-cell">
                      <span className="lg:hidden text-xs font-bold text-slate-400 uppercase">Published Date</span>
                      <span className="text-sm text-slate-500">{job.date}</span>
                    </td>
                    <td className="lg:px-6 lg:py-4 py-2 flex justify-end items-center lg:table-cell">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setDeleteId(job.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button 
                          onClick={() => onEdit(job)}
                          className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                        >
                          <Edit3 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50/30 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center text-brand font-bold text-xs">
            {index + 1}
          </div>
          <h4 className="font-bold text-slate-700">Blog Post</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-rose-500 hover:text-rose-600 p-2 transition-colors rounded-xl hover:bg-rose-50 border border-rose-100 shadow-sm bg-white"
          title="Delete Blog Post"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Blog Thumbnail */}
        <div className="w-full">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Blog Thumbnail</span>
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="w-full aspect-[16/9] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-white hover:border-brand/30 transition-all cursor-pointer group bg-white/50 shadow-sm overflow-hidden relative"
           >
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".svg,.png,.jpg" />
             {previewUrl ? (
               <div className="w-full h-full relative group">
                 <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                   <RefreshCw size={24} className="mb-2" />
                   <p className="text-xs font-bold uppercase tracking-wider">Change Thumbnail</p>
                   <p className="text-[10px] opacity-80 mt-1">{selectedFile}</p>
                 </div>
               </div>
             ) : (
               <>
                 <div className="w-14 h-14 bg-slate-100 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand rounded-2xl flex items-center justify-center transition-colors">
                   <ImageIcon size={28} />
                 </div>
                 <div className="text-center">
                   <p className="text-sm font-bold text-slate-500">Upload Blog Thumbnail</p>
                   <p className="text-[10px] text-slate-400 font-medium mt-1">Recommended size: 1280x720px</p>
                 </div>
               </>
             )}
           </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
           <div className="flex gap-6">
             <TranslationInput label="Blog Title EN" value="The Future of AI in Business" />
             <TranslationInput label="Blog Title AR" value="مستقبل الذكاء الاصطناعي في الأعمال" />
           </div>
           <div className="flex gap-6">
             <TranslationInput 
               label="Excerpt EN" 
               value="Discover how AI is transforming modern enterprises and driving efficiency." 
               type="textarea" 
             />
             <TranslationInput 
               label="Excerpt AR" 
               value="اكتشف كيف يغير الذكاء الاصطناعي المؤسسات الحديثة ويعزز الكفاءة." 
               type="textarea" 
             />
           </div>
           <div className="flex gap-6">
             <TranslationInput label="Author EN" value="John Doe" />
             <TranslationInput label="Date EN" value="Feb 22, 2025" />
           </div>
        </div>
      </div>
    </div>
  );
};

const BlogFormEditor = ({ blog, onCancel, onPublish }: { blog?: any, onCancel: () => void, onPublish: () => void }) => {
  const isEdit = !!blog;
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    description: blog?.description || blog?.department || '',
    author: blog?.author || '',
    date: blog?.date || '',
    tags: blog?.tags || ['Artificial intelligence'],
    content: blog?.content || '',
    titleAr: blog?.titleAr || '',
    descriptionAr: blog?.descriptionAr || '',
    authorAr: blog?.authorAr || '',
    departmentAr: blog?.departmentAr || '',
    tagsAr: blog?.tagsAr || ['الذكاء الاصطناعي', 'التقنية'],
    contentAr: blog?.contentAr || '',
  });

  return (
    <div className="w-full space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>Blog Listings</span>
        <ChevronRight size={14} />
        <span className="text-brand font-medium">{isEdit ? (blog.title || 'Edit Blog') : 'Add New Blog'}</span>
      </div>

      <div className="bg-white rounded-[32px] p-4 lg:p-10 shadow-sm border border-slate-100 space-y-10 w-full relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand/10 rounded-2xl text-brand shrink-0">
              <Edit3 size={28} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-3xl font-bold text-slate-800">
                {isEdit ? (blog.title || 'Edit Blog') : 'Add New Blog'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">Create a blog post that will appear on the Blogs page.</p>
            </div>
          </div>
          <div className="flex flex-col lg:items-end gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
          </div>
        </div>

        <div className="space-y-10">
          {/* English Section */}
          <div className="space-y-8">
            {/* Upload Area EN */}
            <div className="border-2 border-dashed border-slate-200 rounded-[24px] p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group hover:border-brand/30 transition-all cursor-pointer">
              <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center transition-colors group-hover:bg-brand/20">
                <Upload size={28} />
              </div>
              <div className="text-center">
                <p className="text-slate-600 font-bold">Drag your file(s) to start uploading</p>
                <p className="text-slate-400 text-sm font-medium my-1">OR</p>
                <button className="text-brand font-bold hover:underline">Browse files</button>
              </div>
              <p className="text-xs text-slate-400 font-medium">Only support .jpg, .png and .svg and zip files</p>
            </div>

            {/* Form Fields EN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block">Blog title</label>
                <textarea 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none"
                  placeholder="Automated smarter . Grow Faster . with obelion..."
                />
                <div className="flex justify-end">
                  <span className="text-[10px] text-slate-400 font-bold">{formData.title.length} / 70</span>
                </div>
              </div>
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none"
                  placeholder="Automated smarter . Grow Faster . with obelion..."
                />
                <div className="flex justify-end">
                  <span className="text-[10px] text-slate-400 font-bold">{formData.description.length} / 70</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block">Author Name</label>
                <input 
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
                  placeholder="Ahmed El Dosokouy"
                />
              </div>
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block">Date</label>
                <input 
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
                  placeholder="MM\DD\YY"
                />
              </div>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label className="text-sm font-bold text-slate-700 block">Tags</label>
              <div className="relative">
                <div className="w-full min-h-[48px] px-5 py-2 lg:p-5 bg-slate-50 border border-slate-200 rounded-[20px] flex items-center justify-between cursor-pointer">
                  <div className="flex gap-2 flex-wrap">
                    {formData.tags.map((tag, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-brand/10 text-brand text-xs font-bold rounded-full flex items-center gap-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ChevronDown size={20} className="text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label className="text-sm font-bold text-slate-700 block">Blog content</label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] lg:min-h-[200px] resize-none"
                placeholder="Automated smarter . Grow Faster . with obelion..."
              />
              <div className="flex justify-end">
                <span className="text-[10px] text-slate-400 font-bold">{formData.content.length} / 900</span>
              </div>
            </div>
          </div>

          {/* Arabic Section */}
          <div className="pt-10 border-t border-slate-100 space-y-8" dir="rtl">
            {/* Upload Area AR */}
            <div className="border-2 border-dashed border-slate-200 rounded-[24px] p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group hover:border-brand/30 transition-all cursor-pointer">
              <div className="w-14 h-14 bg-brand/10 text-brand rounded-2xl flex items-center justify-center transition-colors group-hover:bg-brand/20">
                <Upload size={28} />
              </div>
              <div className="text-center">
                <p className="text-slate-600 font-bold">اسحب الملف/الملفات هنا لبدء الرفع</p>
                <p className="text-slate-400 text-sm font-medium my-1">أو</p>
                <button className="text-brand font-bold hover:underline">تصفح الملفات</button>
              </div>
              <p className="text-xs text-slate-400 font-medium">يدعم فقط ملفات .jpg و .png و .svg و .zip</p>
            </div>

            {/* Form Fields AR */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block text-right">الوصف المختصر</label>
                <textarea 
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({...formData, descriptionAr: e.target.value})}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none text-right"
                  placeholder="اكتشف كيف يعيد الذكاء الاصطناعي تشكيل العمليات..."
                />
                <div className="flex justify-start">
                  <span className="text-[10px] text-slate-400 font-bold">{formData.descriptionAr.length} / 90</span>
                </div>
              </div>
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block text-right">عنوان المقال</label>
                <textarea 
                  value={formData.titleAr}
                  onChange={(e) => setFormData({...formData, titleAr: e.target.value})}
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] resize-none text-right"
                  placeholder="كيف يغير الذكاء الاصطناعي مستقبل الأعمال"
                />
                <div className="flex justify-start">
                  <span className="text-[10px] text-slate-400 font-bold">{formData.titleAr.length} / 50</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block text-right">القسم</label>
                <input 
                  type="text"
                  value={formData.departmentAr}
                  onChange={(e) => setFormData({...formData, departmentAr: e.target.value})}
                  className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm text-right"
                  placeholder="الذكاء الاصطناعي"
                />
              </div>
              <div className="space-y-2 lg:space-y-3">
                <label className="text-sm font-bold text-slate-700 block text-right">اسم الكاتب</label>
                <input 
                  type="text"
                  value={formData.authorAr}
                  onChange={(e) => setFormData({...formData, authorAr: e.target.value})}
                  className="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm text-right"
                  placeholder="احمد الدسوقي"
                />
              </div>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label className="text-sm font-bold text-slate-700 block text-right">شارات</label>
              <div className="relative">
                <div className="w-full min-h-[48px] px-5 py-2 lg:p-5 bg-slate-50 border border-slate-200 rounded-[20px] flex items-center justify-between cursor-pointer">
                  <div className="flex gap-2 flex-wrap">
                    {formData.tagsAr.map((tag, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-brand/10 text-brand text-xs font-bold rounded-full flex items-center gap-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ChevronDown size={20} className="text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label className="text-sm font-bold text-slate-700 block text-right">محتوى المقال</label>
              <textarea 
                value={formData.contentAr}
                onChange={(e) => setFormData({...formData, contentAr: e.target.value})}
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] lg:min-h-[200px] resize-none text-right"
                placeholder="لم يعد الذكاء الاصطناعي مجرد مفهوم مستقبلي..."
              />
              <div className="flex justify-start">
                <span className="text-[10px] text-slate-400 font-bold">{formData.contentAr.length} / 90</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 lg:relative bg-white/90 backdrop-blur-md lg:bg-transparent -mx-4 lg:mx-0 p-4 lg:p-0 border-t border-slate-100 lg:border-t-0 flex flex-col lg:flex-row justify-end gap-4 z-20 mt-10">
            <button 
              onClick={onCancel}
              className="w-full lg:w-auto px-10 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all order-2 lg:order-1"
            >
              <XCircle size={20} />
              Cancel
            </button>
            <button 
              onClick={onPublish}
              className="w-full lg:w-auto px-14 py-3.5 rounded-2xl bg-brand text-white font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20 order-1 lg:order-2"
            >
              {isEdit ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogListingEditor = ({ onAdd, onEdit }: { onAdd: () => void, onEdit: (blog: any) => void }) => {
  const [isActive, setIsActive] = useState(true);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "How AI Is Redefining Work",
      description: "AI is no longer just automating tasks—it is redefining how we work, collaborate, and innovate.",
      department: "AI is no longer just automating tasks—it is red...",
      author: "Ahmed El dosokouy",
      date: "12 \\ 20 \\ 2025",
      image: "https://picsum.photos/seed/blog1/100/100",
      content: "Artificial Intelligence is transforming the workplace by enhancing productivity and enabling new ways of problem-solving...",
      titleAr: "كيف يغير الذكاء الاصطناعي مستقبل الأعمال",
      descriptionAr: "اكتشف كيف يعيد الذكاء الاصطناعي تشكيل العمليات واتخاذ القرار واستراتيجيات النمو في مختلف القطاعات.",
      authorAr: "احمد الدسوقي",
      departmentAr: "الذكاء الاصطناعي",
      contentAr: "لم يعد الذكاء الاصطناعي مجرد مفهوم مستقبلي، بل أصبح محركاً أساسياً للابتكار في عالم الأعمال الحديث..."
    },
    {
      id: 2,
      title: "Scaling Software Quality with AI",
      description: "This article explores how AI-powered test automation helps teams scale quality assurance.",
      department: "This article explores how AI-powered test automation h...",
      author: "Ahmed El dosokouy",
      date: "12 \\ 20 \\ 2025",
      image: "https://picsum.photos/seed/blog2/100/100",
      content: "Scaling software quality requires more than just manual testing. AI brings precision and speed to QA processes...",
      titleAr: "توسيع نطاق جودة البرمجيات باستخدام الذكاء الاصطناعي",
      descriptionAr: "يستكشف هذا المقال كيف يساعد اختبار الأتمتة المدعوم بالذكاء الاصطناعي الفرق على توسيع نطاق ضمان الجودة.",
      authorAr: "احمد الدسوقي",
      departmentAr: "الذكاء الاصطناعي",
      contentAr: "يتطلب توسيع نطاق جودة البرمجيات أكثر من مجرد الاختبار اليدوي..."
    },
    {
      id: 3,
      title: "Falak Investment Alert",
      description: "Discover how this partnership is accelerating investment in the region.",
      department: "Discover how this partnership is accelerating...",
      author: "Ahmed El dosokouy",
      date: "11 \\ 15 \\ 2025",
      image: "https://picsum.photos/seed/blog3/100/100",
      content: "The latest investment alert from Falak highlights key opportunities in the tech sector...",
      titleAr: "تنبيه استثمار فلك",
      descriptionAr: "اكتشف كيف تسرع هذه الشراكة الاستثمار في المنطقة.",
      authorAr: "احمد الدسوقي",
      departmentAr: "الاستثمار",
      contentAr: "يسلط أحدث تنبيه استثماري من فلك الضوء على الفرص الرئيسية..."
    },
    {
      id: 4,
      title: "AI's Growing Impact on Sustainability",
      description: "AI is reshaping sustainability by improving energy efficiency and waste management.",
      department: "AI is reshaping sustainability by improving energy effici...",
      author: "Ahmed El dosokouy",
      date: "8 \\ 28 \\ 2024",
      image: "https://picsum.photos/seed/blog4/100/100",
      content: "Sustainability is a global priority, and AI is proving to be a powerful ally in achieving green goals...",
      titleAr: "تأثير الذكاء الاصطناعي المتزايد على الاستدامة",
      descriptionAr: "يعيد الذكاء الاصطناعي تشكيل الاستدامة من خلال تحسين كفاءة الطاقة وإدارة النفايات.",
      authorAr: "احمد الدسوقي",
      departmentAr: "الاستدامة",
      contentAr: "تعد الاستدامة أولوية عالمية، ويثبت الذكاء الاصطناعي أنه حليف قوي..."
    },
    {
      id: 5,
      title: "A Double-Edged Sword",
      description: "AI is transforming sustainability across energy and beyond, but it has its challenges.",
      department: "AI is transforming sustainability across energ...",
      author: "Ahmed El dosokouy",
      date: "8 \\ 15 \\ 2024",
      image: "https://picsum.photos/seed/blog5/100/100",
      content: "While AI offers immense benefits, it also presents ethical and environmental challenges that must be addressed...",
      titleAr: "سلاح ذو حدين",
      descriptionAr: "يعمل الذكاء الاصطناعي على تحويل الاستدامة عبر الطاقة وما وراءها، ولكن لديه تحدياته.",
      authorAr: "احمد الدسوقي",
      departmentAr: "التقنية",
      contentAr: "بينما يقدم الذكاء الاصطناعي فوائد هائلة، فإنه يطرح أيضاً تحديات أخلاقية..."
    },
    {
      id: 6,
      title: "Greener Tech Future",
      description: "Sustainable technology is no longer optional—it's essential for our future.",
      department: "Sustainable technology is no longer optional—it's ess...",
      author: "Ahmed El dosokouy",
      date: "8 \\ 11 \\ 2024",
      image: "https://picsum.photos/seed/blog6/100/100",
      content: "The future of technology is green. Companies are now focusing on eco-friendly innovations...",
      titleAr: "مستقبل تقني أكثر اخضراراً",
      descriptionAr: "لم تعد التكنولوجيا المستدامة اختيارية - إنها ضرورية لمستقبلنا.",
      authorAr: "احمد الدسوقي",
      departmentAr: "التقنية",
      contentAr: "مستقبل التكنولوجيا أخضر. تركز الشركات الآن على الابتكارات الصديقة للبيئة..."
    },
    {
      id: 7,
      title: "Navigating Cloud Outages",
      description: "The July 2024 Azure outages exposed the real risks of cloud dependency.",
      department: "The July 2024 Azure outages exposed the real r...",
      author: "Ahmed El dosokouy",
      date: "7 \\ 31 \\ 2024",
      image: "https://picsum.photos/seed/blog7/100/100",
      content: "Cloud reliability is critical. Recent outages have shown that businesses need robust backup strategies...",
      titleAr: "التنقل في انقطاع السحابة",
      descriptionAr: "كشفت انقطاعات Azure في يوليو 2024 عن المخاطر الحقيقية للاعتماد على السحابة.",
      authorAr: "احمد الدسوقي",
      departmentAr: "السحابة",
      contentAr: "تعد موثوقية السحابة أمراً بالغ الأهمية. أظهرت الانقطاعات الأخيرة..."
    }
  ]);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deleteId !== null) {
      setBlogs(blogs.filter(blog => blog.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteId !== null} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete}
        title="Delete Blog?"
        message="Are you sure you want to delete this blog?"
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8">
        {/* Title Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Blog listing</h1>
              <p className="text-sm text-slate-500">Manages and displays all blog posts on the Blogs page.</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
            <span className="hidden mobile:block text-xs text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-6">
          {/* Filters and Add Button */}
          <div className="flex flex-col mobile:flex-row justify-end items-stretch mobile:items-center gap-4">
            <div className="relative">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-sm min-w-[200px]">
                <Calendar size={18} className="text-slate-400" />
                <span>1 \ 11 \ 2026</span>
              </div>
            </div>
            <button 
              onClick={onAdd}
              className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Plus size={20} />
              Add Blog
            </button>
          </div>

          {/* Table */}
          <div className="border border-slate-100 rounded-2xl overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">cover image</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">title</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Author Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Published Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={blog.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{blog.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 line-clamp-1 max-w-[200px]">{blog.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{blog.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500">{blog.date}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setDeleteId(blog.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button 
                          onClick={() => onEdit(blog)}
                          className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                        >
                          <Edit3 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMemberEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50/30 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center text-brand font-bold text-xs">
            {index + 1}
          </div>
          <h4 className="font-bold text-slate-700">Team Member</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-rose-500 hover:text-rose-600 p-2 transition-colors rounded-xl hover:bg-rose-50 border border-rose-100 shadow-sm bg-white"
          title="Delete Team Member"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Member Photo */}
        <div className="w-full">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Member Photo</span>
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="w-40 h-40 border-2 border-dashed border-slate-200 rounded-full flex flex-col items-center justify-center gap-2 hover:bg-white hover:border-brand/30 transition-all cursor-pointer group bg-white/50 shadow-sm overflow-hidden mx-auto"
           >
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".svg,.png,.jpg" />
             {selectedFile ? (
               <div className="text-center p-2">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-1">
                   <CheckCircle2 size={20} />
                 </div>
                 <p className="text-[10px] font-medium text-slate-600 truncate max-w-[120px]">{selectedFile}</p>
               </div>
             ) : (
               <>
                 <div className="w-10 h-10 bg-slate-100 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand rounded-full flex items-center justify-center transition-colors">
                   <ImageIcon size={20} />
                 </div>
                 <p className="text-[10px] font-bold text-slate-500">Upload Photo</p>
               </>
             )}
           </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
             <TranslationInput label="Name AR" value="سارة جونسون" />
             <TranslationInput label="Name EN" value="Sarah Johnson" />
           </div>
           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
             <TranslationInput label="Role AR" value="المدير الإبداعي" />
             <TranslationInput label="Role EN" value="Creative Director" />
           </div>
           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
             <TranslationInput 
               label="Bio AR" 
               value="تمتلك سارة أكثر من 10 سنوات من الخبرة في التصميم الرقمي واستراتيجية العلامة التجارية." 
               type="textarea" 
             />
             <TranslationInput 
               label="Bio EN" 
               value="Sarah has over 10 years of experience in digital design and brand strategy." 
               type="textarea" 
             />
           </div>
        </div>
      </div>
    </div>
  );
};

const OurTeamEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [members, setMembers] = useState([1, 2, 3]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addMember = () => {
    setMembers([...members, members.length + 1]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeMember(deleteIndex)} 
      />
      <div className="bg-white rounded-3xl p-[12px] tablet:p-8 shadow-sm border border-slate-100 space-y-12">
        {/* Title Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start pb-8 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand">
              <Briefcase size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Our Team</h1>
              <p className="text-slate-500">Introduce the talented individuals behind your company.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <span className="text-sm text-slate-400 font-medium">Last Update : 22 Feb, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Header */}
        <EditorSection 
          title="Section Header" 
          description="The main heading and subtitle for the team section."
        >
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <TranslationInput label="Title AR" value="تعرف على الفريق" />
              <TranslationInput label="Title EN" value="Meet the Team" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <TranslationInput 
                label="Subtitle AR" 
                value="الخبراء الشغوفون المكرسون لنجاحك." 
                type="textarea" 
              />
              <TranslationInput 
                label="Subtitle EN" 
                value="The passionate experts dedicated to your success." 
                type="textarea" 
              />
            </div>
          </div>
        </EditorSection>

        {/* Team Members List */}
        <EditorSection 
          title="Team Members List" 
          description="Add, edit or remove team members."
        >
          <div className="space-y-8">
            <div className="space-y-6">
              {members.map((_, index) => (
                <TeamMemberEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
              ))}
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={addMember}
                className="bg-brand text-white text-xs font-medium px-6 py-3 rounded-lg flex items-center gap-2 opacity-80 hover:opacity-100 transition-all shadow-sm"
              >
                <Plus size={18} />
                Add New Member
              </button>
            </div>
          </div>
        </EditorSection>
      </div>
    </div>
  );
};

const VisionMissionEditor = ({ type }: { type: 'Vision' | 'Mission' | 'Expertise' | 'TeamSnippet' }) => {
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string, size: string } | null>({ name: 'assets.zip', size: '5.3MB' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + 'MB'
      });
    }
  };

  const getHeaderDescription = () => {
    if (type === 'Expertise') return "Highlights the company's areas of expertise and core competencies.";
    if (type === 'TeamSnippet') return "Introduces the team behind the company in a concise format.";
    return `Defines the company's ${type.toLowerCase()} and purpose.`;
  };

  const getBannerDescription = () => {
    if (type === 'Expertise') return "Visual representing the expertise area.";
    if (type === 'TeamSnippet') return "Profile image of the team member.";
    return `Visual representing the company's ${type.toLowerCase()}.`;
  };

  const getDisplayName = () => {
    if (type === 'TeamSnippet') return 'Team Snippet';
    return `Our ${type.toLowerCase()}`;
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">{getDisplayName()}</h1>
              <p className="text-sm text-slate-500">{getHeaderDescription()}</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description={`Main heading displayed for the ${type === 'TeamSnippet' ? 'team snippet' : type.toLowerCase()} section.`}
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description={type === 'TeamSnippet' ? "Supporting text that introduces the team." : `Short text introducing the company's ${type.toLowerCase()}.`}
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Banner Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Banner Image</h3>
            <p className="text-sm text-slate-500">{getBannerDescription()}</p>
          </div>
          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group hover:border-brand/30 transition-all cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.svg,.zip" 
              />
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">Drag your file(s) to start uploading</p>
                <p className="text-xs text-slate-400 mt-1">OR</p>
                <button className="mt-3 text-brand text-xs font-bold px-6 py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
                  Browse files
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Only support .jpg, .png and .svg and zip files</p>
            
            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                    <FileCode size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{selectedFile.name}</p>
                    <p className="text-xs text-slate-400">{selectedFile.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4 mobile:p-6 border border-slate-100 rounded-2xl mobile:rounded-3xl bg-white space-y-6 mobile:space-y-8 shadow-sm">
      <div className="flex justify-between items-center pb-4 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-lg text-brand">
            <Briefcase size={20} />
          </div>
          <h4 className="font-bold text-slate-700 text-lg">Card {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-white bg-rose-500 p-2.5 transition-all rounded-xl hover:bg-rose-600 shadow-lg shadow-rose-500/20"
          title="Delete Card"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Icon Upload */}
        <div className="w-full">
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="w-full border-2 border-dashed border-slate-200 rounded-2xl mobile:rounded-3xl flex flex-col items-center justify-center py-10 gap-4 hover:bg-slate-50 hover:border-brand transition-all cursor-pointer group bg-white"
           >
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".svg,.png,.jpg" />
             {previewUrl ? (
               <div className="w-full h-full relative group px-6">
                 <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto object-contain" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white rounded-2xl mobile:rounded-3xl">
                   <RefreshCw size={24} className="mb-2" />
                   <p className="text-xs font-bold uppercase tracking-wider">Change Icon</p>
                 </div>
               </div>
             ) : (
               <>
                 <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center transition-colors group-hover:bg-brand/20">
                   <div className="relative">
                     <FolderUp size={32} />
                   </div>
                 </div>
                 <div className="text-center space-y-2">
                   <p className="text-sm font-medium text-slate-600">Drag your file(s) to start uploading</p>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">OR</p>
                   <button className="text-brand text-sm font-bold border-2 border-brand/20 px-8 py-2 rounded-xl hover:bg-brand hover:text-white transition-all">Browse files</button>
                 </div>
               </>
             )}
           </div>
           <p className="text-[10px] text-slate-400 font-medium mt-3 text-center">Only support .jpg, .png and .svg and zip files</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
           <div className="flex flex-col lg:flex-row gap-6">
             <TranslationInput label="Section Title AR" value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." type="textarea" charCount={0} maxChars={90} />
             <TranslationInput label="Section Title EN" value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" type="textarea" charCount={0} maxChars={30} />
           </div>
           <div className="flex flex-col lg:flex-row gap-6">
             <TranslationInput label="Subtitle AR" value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." type="textarea" charCount={0} maxChars={90} />
             <TranslationInput label="Subtitle EN" value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" type="textarea" charCount={0} maxChars={30} />
           </div>
        </div>
      </div>
    </div>
  );
};

const WhatSetsUsApartEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [features, setFeatures] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addFeature = () => {
    setFeatures([...features, features.length + 1]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeFeature(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex justify-between items-start pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">What Sets Us Apart</h1>
              <p className="text-sm text-slate-500">What sets the company apart.</p>
              <div className="mt-2 mobile:hidden">
                <span className="text-[10px] text-slate-400 font-medium">Last Update : 10 Jan,2025</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
            <span className="hidden mobile:block text-xs text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Primary heading of this section."
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TranslationInput label="AR" value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." type="textarea" charCount={0} maxChars={90} />
            <TranslationInput label="EN" value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" type="textarea" charCount={0} maxChars={30} />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Supporting text displayed below the section title."
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TranslationInput 
              label="AR" 
              type="textarea"
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              type="textarea"
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Features List */}
        <div className="space-y-8">
          {features.map((_, index) => (
            <FeatureItemEditor 
              key={index} 
              index={index} 
              onDelete={() => setDeleteIndex(index)} 
            />
          ))}
          
          <button 
            onClick={addFeature}
            className="w-full py-4 bg-brand text-white rounded-2xl mobile:rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
          >
            <Plus size={20} />
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

const StepItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  return (
    <div className="p-6 border border-slate-100 rounded-3xl bg-white space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand/5 rounded-xl flex items-center justify-center text-brand">
            <Layout size={20} />
          </div>
          <h4 className="font-bold text-slate-700 text-lg">Card {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
          title="Delete Card"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="space-y-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <TranslationInput 
             label="Card title AR" 
             value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
             type="textarea"
             charCount={0}
             maxChars={90}
           />
           <TranslationInput 
             label="Card title EN" 
             value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
             type="textarea"
             charCount={0}
             maxChars={30}
           />
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <TranslationInput 
             label="Description AR" 
             value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
             type="textarea"
             charCount={0}
             maxChars={90}
           />
           <TranslationInput 
             label="Description EN" 
             value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
             type="textarea"
             charCount={0}
             maxChars={30}
           />
         </div>
      </div>
    </div>
  );
};

const PartnerCardItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  return (
    <div className="p-4 mobile:p-6 tablet:p-8 border border-slate-100 rounded-2xl mobile:rounded-3xl bg-white space-y-6 lg:space-y-8 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/5 rounded-lg text-brand">
            <Layers size={20} />
          </div>
          <h4 className="font-bold text-slate-800 text-lg">Card {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-rose-500 hover:text-rose-600 p-2.5 transition-colors rounded-xl hover:bg-rose-50 border border-rose-100 shadow-sm bg-white shrink-0"
          title="Delete Card"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="space-y-4 lg:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
           <TranslationInput 
             label="Card title (EN)" 
             value="Automated smarter . Grow Faster . with obelion" 
             type="textarea"
             charCount={0}
             maxChars={90}
             hideButtons={true}
           />
           <TranslationInput 
             label="Card title (AR)" 
             value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
             type="textarea"
             charCount={0}
             maxChars={90}
             hideButtons={true}
           />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
           <TranslationInput 
             label="Description (EN)" 
             value="Automated smarter . Grow Faster . with obelion" 
             type="textarea"
             charCount={0}
             maxChars={90}
             hideButtons={true}
           />
           <TranslationInput 
             label="Description (AR)" 
             value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
             type="textarea"
             charCount={0}
             maxChars={90}
             hideButtons={true}
           />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-50 mt-4 tablet:mt-0">
        <button className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all">
          Cancel
        </button>
        <button className="px-8 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">
          Update
        </button>
      </div>
    </div>
  );
};

const HowWePartnerEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [cards, setCards] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addCard = () => {
    setCards([...cards, cards.length + 1]);
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeCard(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 tablet:p-8 lg:p-10 shadow-sm border border-slate-100 space-y-6 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">How We Partner</h1>
              <p className="text-sm text-slate-500">Explains how the company collaborates with clients and partners.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title Header */}
        <div className="space-y-4 lg:space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Section Title</h3>
            <p className="text-sm text-slate-500">Main heading displayed for the partnership section.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </div>

        {/* Subtitle Header */}
        <div className="space-y-4 lg:space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Subtitle</h3>
            <p className="text-sm text-slate-500">Supporting text that introduces the partnership approach.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </div>

        {/* Cards List */}
        <div className="space-y-6 pt-8 border-t border-slate-100">
          <div className="space-y-6 lg:space-y-10">
            {cards.map((_, index) => (
              <PartnerCardItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
            ))}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={addCard}
              className="w-full mobile:w-auto bg-brand text-white text-sm font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Plus size={20} />
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyQuoteEditor = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Company Quote</h1>
              <p className="text-sm text-slate-500">Highlights an inspirational or strategic quote from the company.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Quote Text Section */}
        <div className="space-y-6 border border-slate-100 rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 tablet:p-8">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Quote Text</h3>
            <p className="text-sm text-slate-500">Main quote text displayed in this section.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CTABannerEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string, size: string } | null>({ name: 'assets.zip', size: '5.3MB' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + 'MB'
      });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 tablet:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 tablet:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Call To Action Banner</h1>
              <p className="text-sm text-slate-500">Encourages users to take action after exploring the services.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Main message displayed in the services call to action banner."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Supporting text that reinforces the call to action."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Banner Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Banner Image</h3>
            <p className="text-sm text-slate-500">Image displayed behind the call to action content.</p>
          </div>
          <div className="space-y-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-slate-50/50 group hover:border-brand/30 transition-all cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.svg,.zip" 
              />
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-700">Drag your file(s) to start uploading</p>
                <p className="text-xs text-slate-400 mt-1">OR</p>
                <button className="mt-3 text-brand text-xs font-bold px-6 py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
                  Browse files
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Only support .jpg, .png and .svg and zip files</p>
            
            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                    <FileCode size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{selectedFile.name}</p>
                    <p className="text-xs text-slate-400">{selectedFile.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">
            <Plus size={20} />
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

const NewsItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <div className="p-4 mobile:p-6 border border-slate-100 rounded-3xl bg-slate-50/30 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-lg text-brand">
            <FileText size={20} />
          </div>
          <h4 className="font-bold text-slate-700">Blog {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-white bg-rose-500 hover:bg-rose-600 p-2 transition-colors rounded-lg shadow-sm"
          title="Delete Blog"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Upload Box */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-white group hover:border-brand/30 transition-all cursor-pointer"
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.svg,.zip" />
          <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-700">Drag your file(s) to start uploading</p>
            <p className="text-xs text-slate-400 mt-1 uppercase">OR</p>
            <button className="mt-3 text-brand text-xs font-bold px-6 py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
              Browse files
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-medium -mt-4">Only support .jpg, .png and .svg and zip files</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TranslationInput label="Blog title (EN)" value="Automated smarter . Grow Faster" />
          <TranslationInput label="Blog title (AR)" value="أوبيليون تفوز بجائزة الابتكار" />
        </div>
        <div className="w-full">
          <TranslationInput label="Blog link" value="url\rrthujki" />
        </div>
      </div>
    </div>
  );
};

const NewsHighlightsEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [news, setNews] = useState([1, 2]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addNews = () => {
    setNews([...news, news.length + 1]);
  };

  const removeNews = (index: number) => {
    setNews(news.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeNews(deleteIndex)} 
      />
      <div className="bg-white rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start mobile:items-center gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">News & Highlights</h1>
              <p className="text-sm text-slate-500">Share the latest updates and achievements with your audience.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 self-end mobile:self-auto">
            <span className="hidden mobile:inline text-sm text-slate-400 font-medium">Last Update : 22 Feb, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Header */}
        <EditorSection 
          title="Section Title" 
          description="The main heading and subtitle for the news section."
        >
          <div className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TranslationInput label="Title EN" value="Latest News" />
              <TranslationInput label="Title AR" value="أحدث الأخبار" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TranslationInput 
                label="Subtitle EN" 
                value="Stay informed about our latest projects and milestones." 
                type="textarea" 
              />
              <TranslationInput 
                label="Subtitle AR" 
                value="ابق على اطلاع بأحدث مشاريعنا وإنجازاتنا." 
                type="textarea" 
              />
            </div>
          </div>
        </EditorSection>

        {/* News List */}
        <EditorSection 
          title="News List" 
          description="Add, edit or remove news items from the highlights section."
        >
          <div className="space-y-8">
            <div className="space-y-6">
              {news.map((_, index) => (
                <NewsItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
              ))}
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={addNews}
                className="w-full lg:w-auto bg-brand text-white text-xs font-medium px-6 py-3 rounded-lg flex items-center justify-center lg:justify-start gap-2 opacity-80 hover:opacity-100 transition-all shadow-sm"
              >
                <Plus size={18} />
                Add Blog
              </button>
            </div>
          </div>
        </EditorSection>
      </div>
    </div>
  );
};

const CarouselItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <div className="p-4 mobile:p-6 border border-slate-100 rounded-2xl mobile:rounded-3xl bg-slate-50/30 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-lg text-brand">
            <ImageIcon size={20} />
          </div>
          <h4 className="font-bold text-slate-700">slide card {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-white bg-rose-500 hover:bg-rose-600 p-2 transition-colors rounded-lg shadow-sm"
          title="Delete Slide"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Slide Image Upload */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-white group hover:border-brand/30 transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.svg,.zip" />
          <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-700">Drag your file(s) to start uploading</p>
            <p className="text-xs text-slate-400 mt-1 uppercase">OR</p>
            <button className="mt-3 text-brand text-xs font-bold px-6 py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
              Browse files
            </button>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-medium -mt-4">Only support .jpg, .png and .svg and zip files</p>

        {/* Content */}
        <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Title (EN)</label>
            <input 
              type="text" 
              defaultValue="Automated smarter . Grow Faster"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Title (AR)</label>
            <input 
              type="text" 
              dir="rtl"
              defaultValue="عنوان الشريحة"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm font-arabic"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button className="px-6 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all">
            <XCircle size={16} />
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-brand text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">
            <RefreshCw size={16} />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const CarouselSectionEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [slides, setSlides] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addSlide = () => {
    setSlides([...slides, slides.length + 1]);
  };

  const removeSlide = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeSlide(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 tablet:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 tablet:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Carousel</h1>
              <p className="text-sm text-slate-500">Displays rotating content items in a carousel layout.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Slides List */}
        <div className="space-y-6">
          {slides.map((_, index) => (
            <CarouselItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
          ))}
          
          <div className="flex justify-end">
            <button 
              onClick={addSlide}
              className="bg-brand-light text-brand text-xs font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-brand hover:text-white transition-all shadow-sm"
            >
              <Plus size={18} />
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const FounderItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameEn, setNameEn] = useState("Automated smarter . Grow Faster");
  const [nameAr, setNameAr] = useState("احمد الدسوقي");
  const [roleEn, setRoleEn] = useState("Automated smarter . Grow Faster");
  const [roleAr, setRoleAr] = useState("مدير تنفيذي");
  const [linkedin, setLinkedin] = useState("URL\\WEFCFV");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const [backupData, setBackupData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setBackupData({ nameEn, nameAr, roleEn, roleAr, linkedin, selectedFile });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    // Run existing save/update logic exactly as it is
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (backupData) {
      setNameEn(backupData.nameEn);
      setNameAr(backupData.nameAr);
      setRoleEn(backupData.roleEn);
      setRoleAr(backupData.roleAr);
      setLinkedin(backupData.linkedin);
      setSelectedFile(backupData.selectedFile);
    }
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <div className="p-4 mobile:p-6 border border-slate-100 rounded-2xl mobile:rounded-3xl bg-slate-50/30 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 rounded-lg text-brand">
            <User size={20} />
          </div>
          <h4 className="font-bold text-slate-700">founder card {index + 1}</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-white bg-rose-500 hover:bg-rose-600 p-2 transition-colors rounded-lg shadow-sm"
          title="Delete Founder"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Photo Upload */}
        <div className="w-full space-y-4">
          <div 
            onClick={() => isEditing && fileInputRef.current?.click()}
            className={cn(
              "w-full border-2 border-dashed rounded-2xl p-8 mobile:p-12 flex flex-col items-center justify-center gap-4 bg-white transition-all",
              isEditing ? "border-slate-200 group hover:border-brand/30 cursor-pointer" : "border-slate-100 cursor-default"
            )}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.svg,.zip" />
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-transform",
              isEditing ? "bg-brand/10 text-brand group-hover:scale-110" : "bg-slate-100 text-slate-400"
            )}>
              <Upload size={24} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">
                {selectedFile ? selectedFile : "Drag your file(s) to start uploading"}
              </p>
              {isEditing && (
                <>
                  <p className="text-xs text-slate-400 mt-1 uppercase">OR</p>
                  <button className="mt-3 text-brand text-xs font-bold px-6 py-2 border border-brand/20 rounded-lg hover:bg-brand hover:text-white transition-all">
                    Browse files
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Only support .jpg, .png and .svg and zip files</p>
        </div>

        {/* Content - Desktop Layout */}
        <div className="hidden lg:block space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Name (EN)</label>
              <input 
                type="text" 
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                disabled={!isEditing}
                className={cn(
                  "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
                  isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Role (EN)</label>
              <input 
                type="text" 
                value={roleEn}
                onChange={(e) => setRoleEn(e.target.value)}
                disabled={!isEditing}
                className={cn(
                  "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
                  isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Name (AR)</label>
              <input 
                type="text" 
                dir="rtl"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                disabled={!isEditing}
                className={cn(
                  "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm font-arabic",
                  isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Role (AR)</label>
              <input 
                type="text" 
                dir="rtl"
                value={roleAr}
                onChange={(e) => setRoleAr(e.target.value)}
                disabled={!isEditing}
                className={cn(
                  "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm font-arabic",
                  isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">LinkedIn profile link</label>
            <input 
              type="text" 
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              disabled={!isEditing}
              className={cn(
                "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
                isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
              )}
            />
          </div>
        </div>

        {/* Content - Tablet/Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Name (EN)</label>
            <input 
              type="text" 
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              disabled={!isEditing}
              className={cn(
                "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
                isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
              )}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Role (EN)</label>
            <input 
              type="text" 
              value={roleEn}
              onChange={(e) => setRoleEn(e.target.value)}
              disabled={!isEditing}
              className={cn(
                "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
                isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
              )}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Name (AR)</label>
            <input 
              type="text" 
              dir="rtl"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              disabled={!isEditing}
              className={cn(
                "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm font-arabic",
                isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
              )}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Role (AR)</label>
            <input 
              type="text" 
              dir="rtl"
              value={roleAr}
              onChange={(e) => setRoleAr(e.target.value)}
              disabled={!isEditing}
              className={cn(
                "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm font-arabic",
                isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
              )}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">LinkedIn profile link</label>
            <input 
              type="text" 
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              disabled={!isEditing}
              className={cn(
                "w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
                isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50 border-slate-200"
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4 lg:mt-0 pt-4 border-t border-slate-100">
          {!isEditing ? (
            <button 
              onClick={handleEdit}
              className="bg-brand text-white text-xs font-bold px-8 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Edit3 size={16} />
              Edited
            </button>
          ) : (
            <div className="flex justify-end gap-3">
              <button 
                onClick={handleCancel}
                className="px-6 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all"
              >
                <XCircle size={16} />
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="px-8 py-2.5 bg-brand text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
              >
                <RefreshCw size={16} />
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MeetFoundersEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [founders, setFounders] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addFounder = () => {
    setFounders([...founders, founders.length + 1]);
  };

  const removeFounder = (index: number) => {
    setFounders(founders.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeFounder(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 pb-6 lg:pb-8 border-b border-slate-100">
          <div className="flex items-start lg:items-center gap-3 lg:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Meet the founders</h1>
              <p className="text-sm text-slate-500">Introduces the founders of the company.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Main heading displayed for the founders section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Main heading displayed for the founders section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Founders List */}
        <div className="space-y-6">
          {founders.map((_, index) => (
            <FounderItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
          ))}
          
          <div className="flex justify-end">
            <button 
              onClick={addFounder}
              className="bg-brand-light text-brand text-xs font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-brand hover:text-white transition-all shadow-sm"
            >
              <Plus size={18} />
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SendMessageEditor = () => {
  const { triggerToast } = React.useContext(ToastContext);
  const [isActive, setIsActive] = useState(true);
  const [formType, setFormType] = useState<'native' | 'embedded'>('native');
  
  // Embedded Form State
  const [isEditingEmbedCode, setIsEditingEmbedCode] = useState(false);
  const [embedCode, setEmbedCode] = useState(`<iframe
  src="https://provider.com/forms/contact"
  width="100%"
  height="600"
  frameborder="0"
  title="Contact Form"
></iframe>`);
  const [tempEmbedCode, setTempEmbedCode] = useState(embedCode);

  const handleEditEmbedCode = () => {
    setTempEmbedCode(embedCode);
    setIsEditingEmbedCode(true);
  };

  const handleCancelEmbedCode = () => {
    setEmbedCode(tempEmbedCode);
    setIsEditingEmbedCode(false);
  };

  const handleUpdateEmbedCode = () => {
    setIsEditingEmbedCode(false);
    triggerToast();
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Send Us a Message</h1>
              <p className="text-sm text-slate-500">Allows users to send a message directly to the company.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Main heading displayed for the contact form section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Form type */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-10 border-t border-slate-100">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">Form type</h3>
            <p className="text-sm text-slate-500">Select how the contact form is handled.</p>
          </div>
          <div className="space-y-6">
            {/* Native Form Option */}
            <label 
              className="flex items-start gap-4 cursor-pointer group"
              onClick={() => setFormType('native')}
            >
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                formType === 'native' ? "border-brand bg-brand/5" : "border-slate-200 group-hover:border-brand/50"
              )}>
                {formType === 'native' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
              </div>
              <div>
                <h4 className={cn(
                  "font-bold transition-colors",
                  formType === 'native' ? "text-slate-800" : "text-slate-500 group-hover:text-brand"
                )}>Native Form</h4>
                <p className="text-sm text-slate-400">Built-in form managed within the CMS.</p>
              </div>
            </label>

            {/* Embedded Form Option */}
            <label 
              className="flex items-start gap-4 cursor-pointer group"
              onClick={() => setFormType('embedded')}
            >
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                formType === 'embedded' ? "border-brand bg-brand/5" : "border-slate-200 group-hover:border-brand/50"
              )}>
                {formType === 'embedded' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
              </div>
              <div>
                <h4 className={cn(
                  "font-bold transition-colors",
                  formType === 'embedded' ? "text-slate-800" : "text-slate-500 group-hover:text-brand"
                )}>Embedded Form</h4>
                <p className="text-sm text-slate-400">Third-party form added via embed code</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Conditional Panels */}
      <AnimatePresence mode="wait">
        {formType === 'native' ? (
          <motion.div
            key="native"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 tablet:p-8 shadow-sm border border-slate-100 space-y-10"
          >
            <div className="flex items-center gap-4 pb-8 border-b border-slate-100">
              <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
                <FileCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Native Form Settings</h2>
            </div>

            <div className="space-y-8">
              <NativeFormFieldSettings 
                icon={User}
                title="Name Field"
                fields={[
                  { label: "Field name (EN)", value: "name", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "enter your full name", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "الاسم", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "من فضلك ادخل الاسم", placeholder: "أدخل النص المساعد" },
                ]}
              />

              <NativeFormFieldSettings 
                icon={Mail}
                title="Email Field"
                fields={[
                  { label: "Field name (EN)", value: "Email", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "enter your Email", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "البريد الالكتروني", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "من فضلك ادخل بريدك الالكتروني", placeholder: "أدخل النص المساعد" },
                ]}
              />

              <NativeFormFieldSettings 
                icon={Phone}
                title="Mobile number Field"
                fields={[
                  { label: "Field name (EN)", value: "Mobile number", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "e.g. +20 10 1234 5678", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "رقم الهاتف", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "e.g. +20 10 1234 5678", placeholder: "أدخل النص المساعد" },
                ]}
              />

              <NativeFormFieldSettings 
                icon={FileText}
                title="Message Field"
                fields={[
                  { label: "Field name (EN)", value: "message", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "Write your message here", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "الرساله", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "Write your message here", placeholder: "أدخل النص المساعد" },
                ]}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="embedded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 tablet:p-8 shadow-sm border border-slate-100 space-y-10"
          >
            <div className="flex items-center gap-4 pb-8 border-b border-slate-100">
              <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
                <FileCode size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Embedded Form</h2>
                <p className="text-slate-500">Third-party form added via embed code</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Code</label>
                <textarea 
                  value={embedCode}
                  disabled={!isEditingEmbedCode}
                  onChange={(e) => setEmbedCode(e.target.value)}
                  className={cn(
                    "w-full p-6 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm font-mono min-h-[200px] resize-none",
                    isEditingEmbedCode ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                  )}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4 tablet:mt-0">
                {!isEditingEmbedCode ? (
                  <button 
                    onClick={handleEditEmbedCode}
                    className="bg-brand text-white text-xs font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={18} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={handleCancelEmbedCode}
                      className="border border-slate-200 text-slate-600 text-xs font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all"
                    >
                      <XCircle size={18} />
                      Cancel
                    </button>
                    <button 
                      onClick={handleUpdateEmbedCode}
                      className="bg-brand text-white text-xs font-bold px-10 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
                    >
                      <RefreshCw size={18} />
                      Update
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NativeFormFieldSettings = ({ 
  icon: Icon, 
  title, 
  fields 
}: { 
  icon: any, 
  title: string, 
  fields: { label: string, value: string, placeholder: string }[] 
}) => {
  const { triggerToast } = React.useContext(ToastContext);
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValues, setFieldValues] = useState(fields.map(f => f.value));
  const [tempValues, setTempValues] = useState(fieldValues);

  const handleEdit = () => {
    setTempValues([...fieldValues]);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFieldValues([...tempValues]);
    setIsEditing(false);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    triggerToast();
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...fieldValues];
    newValues[index] = value;
    setFieldValues(newValues);
  };

  return (
    <div className="bg-white rounded-[24px] p-2 lg:p-6 border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
        <div className="text-brand">
          <Icon size={20} />
        </div>
        <h4 className="font-bold text-slate-800">{title}</h4>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fields.map((field, idx) => (
          <div key={idx} className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">{field.label}</label>
            <input 
              type="text"
              value={fieldValues[idx]}
              disabled={!isEditing}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                "w-full h-12 px-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm",
                isEditing ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
              )}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2 mt-4 tablet:mt-0">
        {!isEditing ? (
          <button 
            onClick={handleEdit}
            className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
          >
            <Edit3 size={16} />
            <span>Edited</span>
          </button>
        ) : (
          <div className="flex justify-end gap-3">
            <button 
              onClick={handleCancel}
              className="flex items-center gap-2 border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
            >
              <XCircle size={16} />
              <span>Cancel</span>
            </button>
            <button 
              onClick={handleUpdate}
              className="flex items-center gap-2 bg-brand text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <RefreshCw size={16} />
              <span>Update</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CareersHeroSectionEditor = () => {
  const { triggerToast } = React.useContext(ToastContext);
  const [isActive, setIsActive] = useState(true);
  
  const [titleEN, setTitleEN] = useState("Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster");
  const [titleAR, setTitleAR] = useState("نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا.");
  const [isEditingTitleEN, setIsEditingTitleEN] = useState(false);
  const [isEditingTitleAR, setIsEditingTitleAR] = useState(false);
  
  const [subtitleEN, setSubtitleEN] = useState("Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster");
  const [subtitleAR, setSubtitleAR] = useState("نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا.");
  const [isEditingSubtitleEN, setIsEditingSubtitleEN] = useState(false);
  const [isEditingSubtitleAR, setIsEditingSubtitleAR] = useState(false);

  const [selectedFile, setSelectedFile] = useState<string | null>("assets.zip");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      triggerToast();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-white rounded-[32px] p-6 mobile:p-8 tablet:p-4 lg:p-10 shadow-sm border border-slate-100 space-y-10">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-8 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Hero Section</h1>
              <p className="text-slate-500 text-sm mobile:text-base">Controls the main hero content displayed at the top of the Careers page.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 self-end">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">Hero Title</h3>
            <p className="text-sm text-slate-500">Main heading displayed at the top of the Careers page.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AR Column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">AR</span>
                <span className="text-xs text-slate-400 font-medium">0 / 90</span>
              </div>
              <div className="relative">
                <textarea 
                  value={titleAR}
                  disabled={!isEditingTitleAR}
                  onChange={(e) => setTitleAR(e.target.value)}
                  className={cn(
                    "w-full p-6 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[160px] resize-none text-right",
                    isEditingTitleAR ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                  )}
                />
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingTitleAR ? (
                  <button 
                    onClick={() => setIsEditingTitleAR(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingTitleAR(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingTitleAR(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>

            {/* EN Column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">EN</span>
                <span className="text-xs text-slate-400 font-medium">0 / 30</span>
              </div>
              <div className="relative">
                <textarea 
                  value={titleEN}
                  disabled={!isEditingTitleEN}
                  onChange={(e) => setTitleEN(e.target.value)}
                  className={cn(
                    "w-full p-6 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[160px] resize-none",
                    isEditingTitleEN ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                  )}
                />
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingTitleEN ? (
                  <button 
                    onClick={() => setIsEditingTitleEN(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingTitleEN(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingTitleEN(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* Hero Subtitle Section */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">Hero Subtitle</h3>
            <p className="text-sm text-slate-500">Short supporting text displayed below the hero title.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AR Column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">AR</span>
                <span className="text-xs text-slate-400 font-medium">0 / 90</span>
              </div>
              <div className="relative">
                <textarea 
                  value={subtitleAR}
                  disabled={!isEditingSubtitleAR}
                  onChange={(e) => setSubtitleAR(e.target.value)}
                  className={cn(
                    "w-full p-6 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[160px] resize-none text-right",
                    isEditingSubtitleAR ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                  )}
                />
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingSubtitleAR ? (
                  <button 
                    onClick={() => setIsEditingSubtitleAR(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingSubtitleAR(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingSubtitleAR(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>

            {/* EN Column */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">EN</span>
                <span className="text-xs text-slate-400 font-medium">0 / 30</span>
              </div>
              <div className="relative">
                <textarea 
                  value={subtitleEN}
                  disabled={!isEditingSubtitleEN}
                  onChange={(e) => setSubtitleEN(e.target.value)}
                  className={cn(
                    "w-full p-6 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[160px] resize-none",
                    isEditingSubtitleEN ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                  )}
                />
              </div>
              <div className="flex justify-end mt-4 tablet:mt-0">
                {!isEditingSubtitleEN ? (
                  <button 
                    onClick={() => setIsEditingSubtitleEN(true)}
                    className="bg-[#4db6ac] text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#3ea89d] transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditingSubtitleEN(false)} className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all">Cancel</button>
                    <button onClick={() => { setIsEditingSubtitleEN(false); triggerToast(); }} className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20">Update</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* Banner Image Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">Banner Image</h3>
            <p className="text-sm text-slate-500">Hero background image used to visually represent the Careers page.</p>
          </div>
          <div className="space-y-6">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-brand/20 rounded-[32px] p-10 flex flex-col items-center justify-center gap-4 bg-[#f1fbfb] hover:bg-[#e8f7f7] transition-colors cursor-pointer group relative overflow-hidden"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept=".jpg,.jpeg,.png,.svg,.zip"
              />
              <div className="w-16 h-16 bg-[#26b1c1] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
                <FolderUp size={32} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-600">Drag your file(s) to start uploading</p>
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-12 bg-slate-200" />
                  <span className="text-xs text-slate-400 font-bold uppercase">OR</span>
                  <div className="h-px w-12 bg-slate-200" />
                </div>
                <button className="bg-white border border-brand text-brand px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-brand hover:text-white transition-all shadow-sm">
                  Browse files
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400">Only support .jpg, .png and .svg and zip files</p>

            {selectedFile && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#fff9c4] rounded-lg flex items-center justify-center text-[#fbc02d]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{selectedFile}</p>
                      <p className="text-xs text-slate-400">5.3MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationSectionEditor = () => {
  const { triggerToast } = React.useContext(ToastContext);
  const [isActive, setIsActive] = useState(true);
  const [formType, setFormType] = useState<'native' | 'embedded'>('native');
  
  // Section Title State
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster");
  const [tempTitleValue, setTempTitleValue] = useState(titleValue);

  // Embedded Form State
  const [isEditingEmbedCode, setIsEditingEmbedCode] = useState(false);
  const [embedCode, setEmbedCode] = useState(`<iframe
  src="https://provider.com/forms/contact"
  width="100%"
  height="600"
  frameborder="0"
  title="Contact Form"
></iframe>`);
  const [tempEmbedCode, setTempEmbedCode] = useState(embedCode);

  const handleEditTitle = () => {
    setTempTitleValue(titleValue);
    setIsEditingTitle(true);
  };

  const handleCancelTitle = () => {
    setTitleValue(tempTitleValue);
    setIsEditingTitle(false);
  };

  const handleUpdateTitle = () => {
    setIsEditingTitle(false);
    triggerToast();
  };

  const handleEditEmbedCode = () => {
    setTempEmbedCode(embedCode);
    setIsEditingEmbedCode(true);
  };

  const handleCancelEmbedCode = () => {
    setEmbedCode(tempEmbedCode);
    setIsEditingEmbedCode(false);
  };

  const handleUpdateEmbedCode = () => {
    setIsEditingEmbedCode(false);
    triggerToast();
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-white rounded-[32px] p-[12px] tablet:p-4 lg:p-10 shadow-sm border border-slate-100 space-y-10">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-8 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Application Section</h1>
              <p className="text-slate-500 text-sm mobile:text-base">Controls the application form and submission settings for this job.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] p-[12px] tablet:p-4 lg:p-10 border border-slate-100 shadow-sm space-y-12">
          {/* Section Title Row */}
          <div className="grid grid-cols-1 tablet:grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">Section Title</h3>
              <p className="text-sm text-slate-500">Main heading displayed for the contact form section.</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <textarea 
                  value={titleValue}
                  disabled={!isEditingTitle}
                  onChange={(e) => setTitleValue(e.target.value)}
                  className={cn(
                    "w-full p-6 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm min-h-[120px] tablet:min-h-[120px] lg:min-h-[160px] resize-none pr-16",
                    isEditingTitle ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200"
                  )}
                />
                <span className="absolute top-6 right-6 text-xs text-slate-400 font-medium">0 / 30</span>
              </div>
              <div className="flex justify-end gap-2 mt-4 tablet:mt-0">
                {!isEditingTitle ? (
                  <button 
                    onClick={handleEditTitle}
                    className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
                  >
                    <Edit3 size={16} />
                    Edited
                  </button>
                ) : (
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={handleCancelTitle}
                      className="border border-slate-200 text-slate-600 text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-all"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                    <button 
                      onClick={handleUpdateTitle}
                      className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
                    >
                      <RefreshCw size={16} />
                      Update
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Type Row */}
          <div className="grid grid-cols-1 tablet:grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">Form type</h3>
              <p className="text-sm text-slate-500">Select how the contact form is handled.</p>
            </div>
            <div className="space-y-6">
              {/* Native Form Option */}
              <label 
                className="flex items-start gap-4 cursor-pointer group"
                onClick={() => setFormType('native')}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                  formType === 'native' ? "border-brand bg-brand/5" : "border-slate-200 group-hover:border-brand/50"
                )}>
                  {formType === 'native' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
                </div>
                <div>
                  <h4 className={cn(
                    "font-bold transition-colors",
                    formType === 'native' ? "text-slate-800" : "text-slate-500 group-hover:text-brand"
                  )}>Native Form</h4>
                  <p className="text-sm text-slate-400">Built-in form managed within the CMS.</p>
                </div>
              </label>

              {/* Embedded Form Option */}
              <label 
                className="flex items-start gap-4 cursor-pointer group"
                onClick={() => setFormType('embedded')}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                  formType === 'embedded' ? "border-brand bg-brand/5" : "border-slate-200 group-hover:border-brand/50"
                )}>
                  {formType === 'embedded' && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
                </div>
                <div>
                  <h4 className={cn(
                    "font-bold transition-colors",
                    formType === 'embedded' ? "text-slate-800" : "text-slate-500 group-hover:text-brand"
                  )}>Embedded Form</h4>
                  <p className="text-sm text-slate-400">Third-party form added via embed code</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Panels */}
      <AnimatePresence mode="wait">
        {formType === 'native' ? (
          <motion.div
            key="native"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-[32px] p-[12px] tablet:p-4 lg:p-10 shadow-sm border border-slate-100 space-y-10"
          >
            <div className="flex items-center gap-4 pb-8 border-b border-slate-100">
              <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
                <FileCheck size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Native Form Settings</h2>
            </div>

            <div className="space-y-8">
              <NativeFormFieldSettings 
                icon={User}
                title="Name Field"
                fields={[
                  { label: "Field name (EN)", value: "name", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "enter your full name", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "الاسم", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "من فضلك ادخل الاسم", placeholder: "أدخل النص المساعد" },
                ]}
              />

              <NativeFormFieldSettings 
                icon={Mail}
                title="Email Field"
                fields={[
                  { label: "Field name (EN)", value: "Email", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "enter your Email", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "البريد الالكتروني", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "من فضلك ادخل بريدك الالكتروني", placeholder: "أدخل النص المساعد" },
                ]}
              />

              <NativeFormFieldSettings 
                icon={Phone}
                title="Mobile number Field"
                fields={[
                  { label: "Field name (EN)", value: "Mobile number", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "e.g. +20 10 1234 5678", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "رقم الهاتف", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "e.g. +20 10 1234 5678", placeholder: "أدخل النص المساعد" },
                ]}
              />

              <NativeFormFieldSettings 
                icon={FileText}
                title="Message Field"
                fields={[
                  { label: "Field name (EN)", value: "message", placeholder: "enter field name" },
                  { label: "Placeholder (EN)", value: "Write your message here", placeholder: "enter placeholder" },
                  { label: "Field name (AR)", value: "الرساله", placeholder: "أدخل اسم الحقل" },
                  { label: "Placeholder (AR)", value: "Write your message here", placeholder: "أدخل النص المساعد" },
                ]}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="embedded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-[32px] p-[12px] tablet:p-4 lg:p-10 shadow-sm border border-slate-100 space-y-10"
          >
            <div className="flex items-center gap-4 pb-8 border-b border-slate-100">
              <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
                <FileCode size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Embedded Form</h2>
                <p className="text-sm text-slate-500">Third-party form added via embed code</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Code</label>
                <div className="relative">
                  <textarea 
                    value={embedCode}
                    disabled={!isEditingEmbedCode}
                    onChange={(e) => setEmbedCode(e.target.value)}
                    className={cn(
                      "w-full p-6 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm font-mono min-h-[300px] resize-none",
                      isEditingEmbedCode ? "bg-white border-brand/30 shadow-sm" : "bg-slate-50/50 border-slate-200 text-slate-500"
                    )}
                    placeholder="Paste your embed code here..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2 mt-4 tablet:mt-0">
                  {!isEditingEmbedCode ? (
                    <button 
                      onClick={handleEditEmbedCode}
                      className="bg-brand text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
                    >
                      <Edit3 size={16} />
                      Edited
                    </button>
                  ) : (
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={handleCancelEmbedCode}
                        className="px-6 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                      >
                        <XCircle size={16} />
                        Cancel
                      </button>
                      <button 
                        onClick={handleUpdateEmbedCode}
                        className="px-6 py-2.5 bg-brand text-white text-xs font-bold rounded-xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20 flex items-center gap-2"
                      >
                        <RefreshCw size={16} />
                        Update
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceCardItemEditor: React.FC<{ index: number, onDelete: () => void }> = ({ index, onDelete }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <div className="p-4 mobile:p-6 border border-slate-100 rounded-3xl bg-slate-50/30 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center text-brand font-bold text-xs">
            {index + 1}
          </div>
          <h4 className="font-bold text-slate-700">Service Card</h4>
        </div>
        <button 
          onClick={onDelete}
          className="text-rose-500 hover:text-rose-600 p-2 transition-colors rounded-xl hover:bg-rose-50 border border-rose-100 shadow-sm bg-white"
          title="Delete Card"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-8">
        {/* Card Icon */}
        <div className="w-full">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Service Icon</span>
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="w-full h-[200px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 bg-white/50 group hover:border-brand/30 transition-all cursor-pointer shadow-sm overflow-hidden"
           >
             <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".svg,.png,.jpg" />
             {selectedFile ? (
               <div className="text-center p-2">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-1">
                   <CheckCircle2 size={20} />
                 </div>
                 <p className="text-[10px] font-medium text-slate-600 truncate max-w-[120px]">{selectedFile}</p>
               </div>
             ) : (
               <>
                 <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand rounded-xl flex items-center justify-center transition-colors">
                   <Upload size={24} />
                 </div>
                 <p className="text-[10px] font-bold text-slate-500">Icon</p>
               </>
             )}
           </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
             <TranslationInput label="Service Title EN" value="Web Development" />
             <TranslationInput label="Service Title AR" value="تطوير الويب" />
           </div>
           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
             <TranslationInput 
               label="Description EN" 
               value="Building responsive and high-performance websites using modern frameworks." 
               type="textarea" 
             />
             <TranslationInput 
               label="Description AR" 
               value="بناء مواقع ويب سريعة الاستجابة وعالية الأداء باستخدام الأطر الحديثة." 
               type="textarea" 
             />
           </div>
        </div>
      </div>
    </div>
  );
};

const ServicesCardsEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [cards, setCards] = useState([1, 2, 3, 4]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addCard = () => {
    setCards([...cards, cards.length + 1]);
  };

  const removeCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeCard(deleteIndex)} 
      />
      <div className="bg-white rounded-3xl p-4 mobile:p-6 lg:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 lg:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 pb-6 lg:pb-8 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand">
              <Layout size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">Services Cards</h1>
              <p className="text-sm text-slate-500">Manage the detailed service cards displayed on the services page.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan, 2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Header */}
        <EditorSection 
          title="Section Header" 
          description="The main heading and subtitle for the services cards section."
        >
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <TranslationInput label="Title EN" value="Our Core Services" />
              <TranslationInput label="Title AR" value="خدماتنا الأساسية" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <TranslationInput 
                label="Subtitle EN" 
                value="We offer a wide range of digital services to meet your business needs." 
                type="textarea" 
              />
              <TranslationInput 
                label="Subtitle AR" 
                value="نحن نقدم مجموعة واسعة من الخدمات الرقمية لتلبية احتياجات عملك." 
                type="textarea" 
              />
            </div>
          </div>
        </EditorSection>

        {/* Cards List */}
        <EditorSection 
          title="Cards List" 
          description="Add, edit or remove service cards."
        >
          <div className="space-y-8">
            <div className="space-y-6">
              {cards.map((_, index) => (
                <ServiceCardItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
              ))}
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={addCard}
                className="w-full lg:w-auto bg-brand text-white text-xs font-medium px-6 py-3 rounded-lg flex items-center justify-center lg:justify-start gap-2 opacity-80 hover:opacity-100 transition-all shadow-sm"
              >
                <Plus size={18} />
                Add New Card
              </button>
            </div>
          </div>
        </EditorSection>
      </div>
    </div>
  );
};

const HowWeWorkEditor = () => {
  const [isActive, setIsActive] = useState(true);
  const [steps, setSteps] = useState([1]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const addStep = () => {
    setSteps([...steps, steps.length + 1]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
    setDeleteIndex(null);
  };

  return (
    <div className="w-full">
      <ConfirmationModal 
        show={deleteIndex !== null} 
        onClose={() => setDeleteIndex(null)} 
        onConfirm={() => deleteIndex !== null && removeStep(deleteIndex)} 
      />
      <div className="bg-white rounded-2xl mobile:rounded-3xl p-4 mobile:p-6 tablet:p-8 shadow-sm border border-slate-100 space-y-8 mobile:space-y-10 tablet:space-y-12">
        {/* Title Header */}
        <div className="flex flex-col mobile:flex-row justify-between items-start gap-4 pb-6 mobile:pb-8 border-b border-slate-100">
          <div className="flex items-start mobile:items-center gap-3 mobile:gap-4">
            <div className="p-3 bg-brand/10 rounded-xl text-brand shrink-0">
              <Edit3 size={24} />
            </div>
            <div>
              <h1 className="text-xl mobile:text-2xl font-bold text-slate-800">How we work</h1>
              <p className="text-sm text-slate-500">Explains the company's working process and approach.</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mobile:w-auto gap-4">
            <span className="text-xs mobile:text-sm text-slate-400 font-medium whitespace-nowrap">Last Update : 10 Jan,2025</span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative shrink-0",
                isActive ? "bg-brand" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                isActive ? "right-1" : "left-1"
              )} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <EditorSection 
          title="Section Title" 
          description="Main heading displayed for the working process section."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Subtitle */}
        <EditorSection 
          title="Subtitle" 
          description="Short text introducing how the company works."
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <TranslationInput 
              label="AR" 
              value="نبحث عن مهندس برمجيات أول للانضمام إلى فريقنا التقني والمساهمة في بناء حلول رقمية ذكية وقابلة للتوسع لعملائنا." 
              type="textarea"
              charCount={0}
              maxChars={90}
            />
            <TranslationInput 
              label="EN" 
              value="Automated smarter . Grow Faster . with obelion .Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster . with obelion Automated smarter . Grow Faster" 
              type="textarea"
              charCount={0}
              maxChars={30}
            />
          </div>
        </EditorSection>

        {/* Steps List */}
        <div className="space-y-6">
          {steps.map((_, index) => (
            <StepItemEditor key={index} index={index} onDelete={() => setDeleteIndex(index)} />
          ))}
          
          <div className="flex justify-end">
            <button 
              onClick={addStep}
              className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-lg shadow-brand/20"
            >
              <Plus size={20} />
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f4f7f8] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] p-8 mobile:p-10 shadow-xl border border-slate-100"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/20 mb-4">
            <Layers size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Obelion CMS</h1>
          <p className="text-slate-500 mt-2">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@obelion.ai"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-sm"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand text-white py-4 rounded-2xl font-bold hover:bg-brand-hover transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2 mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Obelion AI © 2025</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("isAuthenticated") === "true";
    }
    return false;
  });

  const [activeSubItem, setActiveSubItem] = useState('Home > Hero Section');
  const [blogFormMode, setBlogFormMode] = useState<'list' | 'form'>('list');
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [jobFormMode, setJobFormMode] = useState<'list' | 'form'>('list');
  const [editingJob, setEditingJob] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed');
      return saved !== null ? JSON.parse(saved) : (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024);
    }
    return false;
  });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  // Effect to handle "redirects" based on authentication state
  useEffect(() => {
    const path = window.location.pathname;
    if (isAuthenticated && path === '/login') {
      window.history.replaceState({}, '', '/');
    } else if (!isAuthenticated && path !== '/login') {
      // For simplicity in this SPA, we just stay on the current URL but show Login
      // If we wanted real URL changes we'd use a router or window.history
    }
  }, [isAuthenticated]);

  // Effect to handle default sidebar state based on window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      // Only auto-collapse if not manually set before or if we want to respect resize
      // But user wants to persist state, so we should be careful.
      // For now, let's just update windowWidth.
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const triggerToast = () => {
    setShowToast(false); // Reset if already showing
    setTimeout(() => setShowToast(true), 10);
  };

  const toggleSidebar = () => {
    if (windowWidth < 768) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 480;
  const showOverlay = (isMobile && isSidebarOpen) || (isTablet && !isSidebarCollapsed);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      <div className="flex h-screen bg-[#f4f7f8] overflow-hidden">
        {/* Mobile/Tablet Sidebar Overlay */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (isMobile) setIsSidebarOpen(false);
                if (isTablet) setIsSidebarCollapsed(true);
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Container */}
        <motion.div 
          initial={false}
          animate={{ 
            x: isMobile && !isSidebarOpen ? -400 : 0,
            width: isSidebarCollapsed && !isMobile ? 80 : (isMobile ? '100vw' : 288)
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed inset-y-0 left-0 z-50 shadow-2xl lg:shadow-none bg-white",
            isMobile && "max-w-[400px]"
          )}
        >
          <Sidebar 
            activeSubItem={activeSubItem} 
            isCollapsed={isSidebarCollapsed && !isMobile}
            isMobile={isMobile}
            onClose={() => setIsSidebarOpen(false)}
            onLogout={handleLogout}
            setActiveSubItem={(id) => {
              setActiveSubItem(id);
              setBlogFormMode('list');
              setEditingBlog(null);
              setJobFormMode('list');
              setEditingJob(null);
              if (isMobile) setIsSidebarOpen(false);
              if (isTablet) setIsSidebarCollapsed(true);
            }} 
          />
        </motion.div>
        
        <main 
          className={cn(
            "flex-1 flex flex-col min-w-0 h-screen transition-all duration-300",
            !isMobile && (isSidebarCollapsed ? "pl-20" : "pl-[288px]")
          )}
        >
          <Header onMenuClick={toggleSidebar} isCollapsed={isSidebarCollapsed} onLogout={handleLogout} />
          
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 tablet:px-6 tablet:py-8 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeSubItem === 'Careers > Hero Section' ? (
                  <CareersHeroSectionEditor />
                ) : activeSubItem === 'Contact Us > Hero Section' ? (
                  <ContactUsHeroSectionEditor />
                ) : activeSubItem === 'About Us > Hero Section' ? (
                  <AboutUsHeroSectionEditor />
                ) : activeSubItem.endsWith('Hero Section') ? (
                  <HeroSectionEditor />
                ) : activeSubItem === 'Home > Intro Section' ? (
                  <IntroSectionEditor />
                ) : activeSubItem === 'Home > Our Services' ? (
                  <ServicesSectionEditor />
                ) : activeSubItem === 'Projects > Projects Section' ? (
                  <ProjectsSectionEditor />
                ) : activeSubItem === 'About Us > Who we are Section' ? (
                  <AboutUsWhoWeAreEditor />
                ) : activeSubItem === 'Contact Us > Contacts us through' ? (
                  <ContactsThroughEditor />
                ) : activeSubItem === 'Careers > Job Listings' ? (
                  jobFormMode === 'list' ? (
                    <JobListingsEditor 
                      onAdd={() => {
                        setJobFormMode('form');
                        setEditingJob(null);
                      }}
                      onEdit={(job) => {
                        setJobFormMode('form');
                        setEditingJob(job);
                      }}
                    />
                  ) : (
                    <JobFormEditor 
                      job={editingJob} 
                      onCancel={() => setJobFormMode('list')}
                      onPublish={() => {
                        triggerToast();
                        setJobFormMode('list');
                      }}
                    />
                  )
                ) : activeSubItem === 'Blogs > Blog listing' ? (
                  blogFormMode === 'list' ? (
                    <BlogListingEditor 
                      onAdd={() => {
                        setBlogFormMode('form');
                        setEditingBlog(null);
                      }}
                      onEdit={(blog) => {
                        setBlogFormMode('form');
                        setEditingBlog(blog);
                      }}
                    />
                  ) : (
                    <BlogFormEditor 
                      blog={editingBlog} 
                      onCancel={() => setBlogFormMode('list')}
                      onPublish={() => {
                        triggerToast();
                        setBlogFormMode('list');
                      }}
                    />
                  )
                ) : activeSubItem === 'About Us > Our Team' ? (
                  <OurTeamEditor />
                ) : activeSubItem === 'About Us > Our Vision' ? (
                  <VisionMissionEditor type="Vision" />
                ) : activeSubItem === 'About Us > Our Mission' ? (
                  <VisionMissionEditor type="Mission" />
                ) : activeSubItem === 'Home > What Sets Us Apart' ? (
                  <WhatSetsUsApartEditor />
                ) : activeSubItem === 'Home > How We Partner' ? (
                  <HowWePartnerEditor />
                ) : activeSubItem === 'Home > Company Quote' ? (
                  <CompanyQuoteEditor />
                ) : activeSubItem.endsWith('Call To Action Banner') ? (
                  <CTABannerEditor />
                ) : activeSubItem === 'Home > News & Highlights' ? (
                  <NewsHighlightsEditor />
                ) : activeSubItem === 'Home > Team Snippet' ? (
                  <VisionMissionEditor type="TeamSnippet" />
                ) : activeSubItem === 'Home > Carousel' ? (
                  <CarouselSectionEditor />
                ) : activeSubItem === 'About Us > Our Expertise' ? (
                  <VisionMissionEditor type="Expertise" />
                ) : activeSubItem === 'About Us > Meet the Founders Section' ? (
                  <MeetFoundersEditor />
                ) : activeSubItem === 'Contact Us > Send us message' ? (
                  <SendMessageEditor />
                ) : activeSubItem === 'Careers > Application Section' ? (
                  <ApplicationSectionEditor />
                ) : activeSubItem === 'Services > Services cards' ? (
                  <ServicesCardsEditor />
                ) : activeSubItem === 'Services > How we work' ? (
                  <HowWeWorkEditor />
                ) : activeSubItem === 'Projects > How we work' ? (
                  <HowWeWorkEditor />
                ) : (
                  <div className="p-20 flex flex-col items-center justify-center text-slate-400">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      {activeSubItem.includes('Hero') ? <Layers size={40} /> : 
                       activeSubItem.includes('Services') ? <Briefcase size={40} /> :
                       <FileText size={40} />}
                    </div>
                    <h2 className="text-xl font-bold text-slate-600">{activeSubItem.split(' > ')[1]}</h2>
                    <p className="text-sm opacity-70 mt-1">Section: {activeSubItem.split(' > ')[0]}</p>
                    <p className="mt-4 bg-slate-50 px-4 py-2 rounded-full text-xs font-medium border border-slate-100">This section is under development.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        
        <Toast show={showToast} onClose={() => setShowToast(false)} />
      </div>
    </ToastContext.Provider>
  );
}
