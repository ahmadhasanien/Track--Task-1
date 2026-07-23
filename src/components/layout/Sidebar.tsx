import type { ReactElement } from 'react';
import { MoreVertical, Search } from 'lucide-react';
import { navItems, userProfile } from '../../data/mockDashboard';
import logoFull from '../../assets/logo-full.png';
import {
  CompaniesIcon,
  DashboardIcon,
  DepartmentsIcon,
  GoalsIcon,
  ProjectsIcon,
  SidebarSettingsIcon,
} from './SidebarIcons';
import './layout.css';

const navIcons: Record<string, () => ReactElement> = {
  dashboard: DashboardIcon,
  goals: GoalsIcon,
  projects: ProjectsIcon,
  companies: CompaniesIcon,
  departments: DepartmentsIcon,
};

export function Sidebar() {
  return (
    <aside className="sidebar" dir="rtl">
      <div className="sidebar__logo">
        <img src={logoFull} alt="track+" className="sidebar__logo-full" />
      </div>

      <div className="sidebar__search">
        <Search size={18} strokeWidth={2.5} className="sidebar__search-icon" />
        <input type="search" placeholder="البحث" aria-label="بحث" />
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = navIcons[item.id];
          return (
            <a
              key={item.id}
              href="#"
              className={`sidebar__nav-item ${item.active ? 'sidebar__nav-item--active' : ''}`}
            >
              <Icon />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <a href="#" className="sidebar__nav-item">
          <SidebarSettingsIcon />
          <span>الإعدادات</span>
        </a>

        <div className="sidebar__profile">
          <button type="button" className="sidebar__profile-menu" aria-label="المزيد">
            <MoreVertical size={18} strokeWidth={2.5} />
          </button>
          <div className="sidebar__profile-info">
            <span className="sidebar__profile-name">{userProfile.name}</span>
            <span className="sidebar__profile-role">{userProfile.role}</span>
          </div>
          <div className="sidebar__avatar">{userProfile.initial}</div>
        </div>
      </div>
    </aside>
  );
}
