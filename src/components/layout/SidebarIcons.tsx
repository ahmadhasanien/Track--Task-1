

import goalsIconSrc from '../../assets/icons/goals.png';
import projectsIconSrc from '../../assets/icons/projects.png';
import companiesIconSrc from '../../assets/icons/companies.png';
import departmentsIconSrc from '../../assets/icons/departments.png';
import settingsIconSrc from '../../assets/icons/settings.png';
import tenantsIconSrc from '../../assets/icons/tenants/tenants-menu.png';

export function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18.34 18.334" fill="none" aria-hidden>
      <g transform="translate(-1397.83, -165.833)" fill="currentColor">
        <path d="M1415.71 173.992V167.758C1415.71 166.383 1415.12 165.833 1413.66 165.833H1409.96C1408.5 165.833 1407.92 166.383 1407.92 167.758V173.992C1407.92 175.367 1408.5 175.917 1409.96 175.917H1413.66C1415.12 175.917 1415.71 175.367 1415.71 173.992Z" />
        <path d="M1406.08 176.008V182.242C1406.08 183.617 1405.5 184.167 1404.04 184.167H1400.34C1398.88 184.167 1398.29 183.617 1398.29 182.242V176.008C1398.29 174.633 1398.88 174.083 1400.34 174.083H1404.04C1405.5 174.083 1406.08 174.633 1406.08 176.008Z" />
        <path d="M1415.71 182.242V179.675C1415.71 178.3 1415.12 177.75 1413.66 177.75H1409.96C1408.5 177.75 1407.92 178.3 1407.92 179.675V182.242C1407.92 183.617 1408.5 184.167 1409.96 184.167H1413.66C1415.12 184.167 1415.71 183.617 1415.71 182.242Z" />
        <path d="M1406.08 170.325V167.758C1406.08 166.383 1405.5 165.833 1404.04 165.833H1400.34C1398.88 165.833 1398.29 166.383 1398.29 167.758V170.325C1398.29 171.7 1398.88 172.25 1400.34 172.25H1404.04C1405.5 172.25 1406.08 171.7 1406.08 170.325Z" />
      </g>
    </svg>
  );
}

export function GoalsIcon() {
  return <img src={goalsIconSrc} alt="" className="sidebar__nav-icon" width={20} height={20} />;
}

export function ProjectsIcon() {
  return <img src={projectsIconSrc} alt="" className="sidebar__nav-icon" width={20} height={20} />;
}

export function CompaniesIcon() {
  return <img src={companiesIconSrc} alt="" className="sidebar__nav-icon" width={20} height={20} />;
}

export function DepartmentsIcon() {
  return <img src={departmentsIconSrc} alt="" className="sidebar__nav-icon" width={20} height={20} />;
}

export function SidebarSettingsIcon() {
  return <img src={settingsIconSrc} alt="" className="sidebar__nav-icon" width={20} height={20} />;
}

export function TenantsIcon() {
  return <img src={tenantsIconSrc} alt="" className="sidebar__nav-icon" width={20} height={20} />;
}

export function SubscriptionsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2.2 17.3 6v8L10 17.8 2.7 14V6L10 2.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2.7 6 10 10l7.3-4M10 10v7.8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function AuditLogIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      {}
      <circle cx="12" cy="17" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.2 22c.5-2.1 2-3.2 3.8-3.2s3.3 1.1 3.8 3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {}
      <circle cx="4.5" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M1 13c.45-1.95 1.85-3 3.5-3s3.05 1.05 3.5 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {}
      <circle cx="19.5" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 13c.45-1.95 1.85-3 3.5-3s3.05 1.05 3.5 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {}
      <path
        d="M7 11.5 Q12 7 17 11.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
