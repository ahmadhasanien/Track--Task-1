

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type TenantUserRole = 'مدير النظام' | 'محلل' | 'مشرف' | 'مستخدم';
export type TenantUserStatus = 'active' | 'suspended';

export interface TenantUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  role: TenantUserRole;
  status: TenantUserStatus;
  statusLabel: string;
}

export type TenantStatus = 'active' | 'trial' | 'suspended';

export interface TenantPackage {
  name: string;
  features: string[];
  monthlyCost: string;
  renewalDate: string;
}

export interface Tenant {
  id: string;
  name: string;
  status: TenantStatus;
  statusLabel: string;
  joinDuration: string;
  lastActivity: string;

  
  entityName: string;
  crNumber: string;
  sector: string;
  adminName: string;
  phone: string;
  email: string;
  joinDate: string;
  accountType: string;
  region: string;

  
  usedStorage: string;
  storageLimit: string;
  activeUsers: number;
  userLimit: number;

  
  package: TenantPackage;

  
  users: TenantUser[];
}

const SEED_TENANTS: Tenant[] = [
  {
    id: '1',
    name: 'جودين',
    status: 'active',
    statusLabel: 'نشط',
    joinDuration: 'منذ 8 أشهر',
    lastActivity: 'قبل ساعتين',
    entityName: 'جودين',
    crNumber: '1010293847',
    sector: 'تقنية المعلومات',
    adminName: 'خالد العتيبي',
    phone: '966501234567+',
    email: 'admin@jodayn.sa',
    joinDate: '2025-11-02',
    accountType: 'مؤسسة',
    region: 'الرياض',
    usedStorage: '320 جيجابايت',
    storageLimit: '1 تيرابايت',
    activeUsers: 4,
    userLimit: 10,
    package: {
      name: 'Enterprise',
      features: ['إدارة الحسابات', 'تصدير البيانات', 'دعم فني مخصص'],
      monthlyCost: '666 ر.س',
      renewalDate: '2027-03-12',
    },
    users: [
      { id: 'u1', name: 'خالد العتيبي', email: 'khalid@jodayn.sa', initials: 'خع', avatarColor: '#2563eb', role: 'مدير النظام', status: 'active', statusLabel: 'نشط' },
      { id: 'u2', name: 'سارة القحطاني', email: 'sara@jodayn.sa', initials: 'سق', avatarColor: '#7c3aed', role: 'مشرف', status: 'active', statusLabel: 'نشط' },
      { id: 'u3', name: 'فهد الدوسري', email: 'fahad@jodayn.sa', initials: 'فد', avatarColor: '#059669', role: 'محلل', status: 'active', statusLabel: 'نشط' },
      { id: 'u4', name: 'منى الشمري', email: 'mona@jodayn.sa', initials: 'مش', avatarColor: '#dc2626', role: 'مستخدم', status: 'suspended', statusLabel: 'معلق' },
    ],
  },
  {
    id: '2',
    name: 'وزارة الموارد البشرية',
    status: 'active',
    statusLabel: 'نشط',
    joinDuration: 'منذ سنة',
    lastActivity: 'أمس',
    entityName: 'وزارة الموارد البشرية والتنمية الاجتماعية',
    crNumber: '4030193847',
    sector: 'حكومي',
    adminName: 'نورة المطيري',
    phone: '966555112233+',
    email: 'admin@hrsd.gov.sa',
    joinDate: '2025-01-15',
    accountType: 'حكومية',
    region: 'الرياض',
    usedStorage: '740 جيجابايت',
    storageLimit: '1 تيرابايت',
    activeUsers: 2,
    userLimit: 5,
    package: {
      name: 'Enterprise',
      features: ['إدارة الحسابات', 'تصدير البيانات', 'دعم فني مخصص'],
      monthlyCost: '666 ر.س',
      renewalDate: '2027-03-12',
    },
    users: [
      { id: 'u1', name: 'نورة المطيري', email: 'noura@hrsd.gov.sa', initials: 'نم', avatarColor: '#2563eb', role: 'مدير النظام', status: 'active', statusLabel: 'نشط' },
      { id: 'u2', name: 'عبدالله السبيعي', email: 'abdullah@hrsd.gov.sa', initials: 'عس', avatarColor: '#059669', role: 'محلل', status: 'active', statusLabel: 'نشط' },
    ],
  },
  {
    id: '3',
    name: 'شركة تطوير',
    status: 'trial',
    statusLabel: 'تجربة',
    joinDuration: 'منذ 12 يوم',
    lastActivity: 'قبل 5 دقائق',
    entityName: 'شركة تطوير المحدودة',
    crNumber: '1012938475',
    sector: 'مقاولات',
    adminName: 'ريان الحربي',
    phone: '966561234567+',
    email: 'admin@tatweer.sa',
    joinDate: '2026-07-24',
    accountType: 'خاصة',
    region: 'جدة',
    usedStorage: '4 جيجابايت',
    storageLimit: '10 جيجابايت',
    activeUsers: 6,
    userLimit: 10,
    package: {
      name: 'Demo',
      features: ['إدارة الحسابات', 'تصدير البيانات'],
      monthlyCost: '0 ر.س',
      renewalDate: '2026-08-24',
    },
    users: [
      { id: 'u1', name: 'ريان الحربي', email: 'rayan@tatweer.sa', initials: 'رح', avatarColor: '#2563eb', role: 'مدير النظام', status: 'active', statusLabel: 'نشط' },
      { id: 'u2', name: 'هند العنزي', email: 'hind@tatweer.sa', initials: 'هع', avatarColor: '#7c3aed', role: 'مشرف', status: 'active', statusLabel: 'نشط' },
      { id: 'u3', name: 'ماجد القرني', email: 'majed@tatweer.sa', initials: 'مق', avatarColor: '#059669', role: 'مستخدم', status: 'active', statusLabel: 'نشط' },
    ],
  },
  {
    id: '4',
    name: 'جامعة حائل',
    status: 'suspended',
    statusLabel: 'معلق',
    joinDuration: 'منذ سنتين',
    lastActivity: 'قبل 3 أشهر',
    entityName: 'جامعة حائل',
    crNumber: '3010293841',
    sector: 'تعليم',
    adminName: 'عمر الزهراني',
    phone: '966508765432+',
    email: 'admin@uoh.edu.sa',
    joinDate: '2024-08-01',
    accountType: 'حكومية',
    region: 'حائل',
    usedStorage: '890 جيجابايت',
    storageLimit: '1 تيرابايت',
    activeUsers: 2,
    userLimit: 8,
    package: {
      name: 'Enterprise',
      features: ['إدارة الحسابات', 'تصدير البيانات', 'دعم فني مخصص'],
      monthlyCost: '666 ر.س',
      renewalDate: '2027-03-12',
    },
    users: [
      { id: 'u1', name: 'عمر الزهراني', email: 'omar@uoh.edu.sa', initials: 'عز', avatarColor: '#2563eb', role: 'مدير النظام', status: 'suspended', statusLabel: 'معلق' },
      { id: 'u2', name: 'لينا الحارثي', email: 'lina@uoh.edu.sa', initials: 'لح', avatarColor: '#dc2626', role: 'مستخدم', status: 'suspended', statusLabel: 'معلق' },
    ],
  },
];

const STORAGE_KEY = 'trackplus_tenants_v2';

function loadFromStorage(): Tenant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_TENANTS;
    const parsed = JSON.parse(raw) as Tenant[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    
  }
  return SEED_TENANTS;
}

function saveToStorage(tenants: Tenant[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tenants));
  } catch {
    
  }
}

interface TenantContextValue {
  tenants: Tenant[];
  addTenant: (tenant: Tenant) => void;
  updateTenant: (id: string, updates: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
  getTenantById: (id: string) => Tenant | undefined;
}

const TenantContext = createContext<TenantContextValue | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenants, setTenants] = useState<Tenant[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(tenants);
  }, [tenants]);

  const addTenant = useCallback((tenant: Tenant) => {
    setTenants((prev) => [tenant, ...prev]);
  }, []);

  const updateTenant = useCallback((id: string, updates: Partial<Tenant>) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }, []);

  const deleteTenant = useCallback((id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTenantById = useCallback(
    (id: string) => tenants.find((t) => t.id === id),
    [tenants],
  );

  return (
    <TenantContext.Provider
      value={{ tenants, addTenant, updateTenant, deleteTenant, getTenantById }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenants(): Tenant[] {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenants must be used inside <TenantProvider>');
  return ctx.tenants;
}

export function useTenantById(id: string): Tenant | undefined {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenantById must be used inside <TenantProvider>');
  return ctx.getTenantById(id);
}

export function useTenantMutations() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenantMutations must be used inside <TenantProvider>');
  const { addTenant, updateTenant, deleteTenant, getTenantById } = ctx;
  return { addTenant, updateTenant, deleteTenant, getTenantById };
}
