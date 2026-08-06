import { useCallback, useState } from 'react';
import { AlertTriangle, ChevronLeft, FileText, Hourglass, Plus, Search, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import GridLayout, { WidthProvider, type Layout, type LayoutItem } from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { PageHeader } from '../layout/PageHeader';
import { AddTenantPage, type TenantFormData } from './AddTenantPage';
import { ReviewTenantPage } from './ReviewTenantPage';
import { TenantDetailsPage } from './TenantDetailsPage';
import { usePackages } from '../../context/PackageContext';
import { useTenantMutations, type Tenant } from '../../context/TenantContext';
import {
  tenantFilterTabs,
  tenantsList as SEED_TENANTS,
  type TenantFilterId,
  type TenantRow,
  type TenantRowStatus,
} from '../../data/tenantsPage';
import '../layout/layout.css';
import '../dashboard/dashboard.css';
import './tenants.css';

const ResponsiveGrid = WidthProvider(GridLayout);

const statusVariant: Record<TenantRowStatus, 'success' | 'warning' | 'danger'> = {
  active: 'success',
  trial: 'warning',
  suspended: 'danger',
};

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
}

function StatCard({ icon: Icon, label, value, unit }: StatCardProps) {
  return (
    <Card className="tenants-stat-card">
      <div className="widget-icon-header">
        <span className="widget-icon-badge">
          <Icon size={16} strokeWidth={2} aria-hidden />
        </span>
        <p className="widget-title">{label}</p>
      </div>
      <div className="widget-stat-block widget-stat-inline">
        <span className="widget-stat-value">{value}</span>
        <span className="widget-stat-label">{unit}</span>
      </div>
    </Card>
  );
}

type StatId = 'total' | 'active' | 'trial' | 'suspended';

const DEFAULT_STATS_LAYOUT: LayoutItem[] = [
  { i: 'total',     x: 9, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
  { i: 'active',    x: 6, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
  { i: 'trial',     x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
  { i: 'suspended', x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
];

const DEFAULT_TABLE_LAYOUT: LayoutItem[] = [
  { i: 'table', x: 0, y: 0, w: 12, h: 7, minW: 6, maxW: 12, minH: 3, maxH: 16 },
];

type TenantsView = 'list' | 'add' | 'review' | 'details';

const BLANK_DRAFT: TenantFormData = {
  entityName: '',
  entityType: 'حكومية',
  unifiedId: '',
  subdomain: '',
  managerName: '',
  managerEmail: '',
  managerPhone: '',
  managerTitle: '',
  planId: '',
  userLimit: '',
  storageLimit: '',
  subscriptionStart: '',
  subscriptionRenewal: '',
};

export function TenantsPage() {
  
  const [view, setView] = useState<TenantsView>('list');

  
  const [draft, setDraft] = useState<TenantFormData>(BLANK_DRAFT);

  
  const [tenants, setTenants] = useState<TenantRow[]>(SEED_TENANTS);

  
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);
  const { addTenant } = useTenantMutations();

  
  const [activeFilter, setActiveFilter] = useState<TenantFilterId>('overdue');

  
  
  
  
  
  const isEditMode = false;
  const [statsLayout, setStatsLayout] = useState<LayoutItem[]>(DEFAULT_STATS_LAYOUT);
  const [tableLayout, setTableLayout] = useState<LayoutItem[]>(DEFAULT_TABLE_LAYOUT);

  const packages = usePackages();

  const handleStatsLayoutChange = useCallback(
    (newLayout: Layout) => { if (isEditMode) setStatsLayout([...newLayout]); },
    [isEditMode],
  );

  const handleTableLayoutChange = useCallback(
    (newLayout: Layout) => { if (isEditMode) setTableLayout([...newLayout]); },
    [isEditMode],
  );

  
  const summary = {
    total:     tenants.length,
    active:    tenants.filter((t) => t.status === 'active').length,
    trial:     tenants.filter((t) => t.status === 'trial').length,
    suspended: tenants.filter((t) => t.status === 'suspended').length,
  };

  const statCards: Record<StatId, StatCardProps> = {
    total:     { icon: Users,         label: 'إجمالي المستأجرين', value: summary.total,     unit: 'مستأجر' },
    active:    { icon: FileText,      label: 'نشط',                value: summary.active,    unit: 'مستأجر نشط' },
    trial:     { icon: Hourglass,     label: 'تجربة مجانية',       value: summary.trial,     unit: 'تجارب' },
    suspended: { icon: AlertTriangle, label: 'معلق',               value: summary.suspended, unit: 'مستأجر' },
  };

  
  const handleFormNext = (data: TenantFormData) => {
    setDraft(data);
    setView('review');
  };

  
  const handleReviewBack = () => {
    setView('add');
    
  };

  
  const handleConfirm = () => {
    const pkg = packages.find((p) => p.id === draft.planId);
    const newId = `tenant-${Date.now()}`;

    const newTenant: TenantRow = {
      id: newId,
      name: draft.entityName || 'جهة جديدة',
      status: 'active',
      statusLabel: 'نشط',
      plan: pkg?.name ?? draft.planId,
      users: Number(draft.userLimit) || 0,
      expiresAt: draft.subscriptionRenewal || '—',
    };
    setTenants((prev) => [newTenant, ...prev]);

    
    
    const newTenantDetail: Tenant = {
      id: newId,
      name: draft.entityName || 'جهة جديدة',
      status: 'active',
      statusLabel: 'نشط',
      joinDuration: 'جديد',
      lastActivity: 'الآن',
      entityName: draft.entityName || 'جهة جديدة',
      crNumber: draft.unifiedId || '—',
      sector: '—',
      adminName: draft.managerName || '—',
      phone: draft.managerPhone || '—',
      email: draft.managerEmail || '—',
      joinDate: draft.subscriptionStart || '—',
      accountType: draft.entityType || '—',
      region: '—',
      usedStorage: '0 جيجابايت',
      storageLimit: pkg?.storage || draft.storageLimit || '—',
      activeUsers: 0,
      userLimit: Number(draft.userLimit) || pkg?.userLimit || 0,
      package: {
        name: pkg?.name ?? draft.planId,
        features: pkg?.permissions.filter((p) => p.granted).map((p) => p.name) ?? [],
        monthlyCost: pkg?.price ?? '—',
        renewalDate: draft.subscriptionRenewal || '—',
      },
      users: draft.managerName
        ? [{
            id: 'u1',
            name: draft.managerName,
            email: draft.managerEmail || '—',
            initials: draft.managerName.slice(0, 2),
            avatarColor: '#2563eb',
            role: 'مدير النظام',
            status: 'active',
            statusLabel: 'نشط',
          }]
        : [],
    };
    addTenant(newTenantDetail);

    setDraft(BLANK_DRAFT);
    setView('list');
  };

  
  const handleCancel = () => {
    setDraft(BLANK_DRAFT);
    setView('list');
  };

  
  const handleOpenDetails = (id: string) => {
    setSelectedTenantId(id);
    setView('details');
  };

  
  const handleDetailsBack = () => {
    setSelectedTenantId(null);
    setView('list');
  };

  
  const handleDetailsDeleted = () => {
    if (selectedTenantId) {
      setTenants((prev) => prev.filter((t) => t.id !== selectedTenantId));
    }
    setSelectedTenantId(null);
    setView('list');
  };

  
  if (view === 'add') {
    return (
      <AddTenantPage
        initialData={draft.entityName || draft.planId ? draft : undefined}
        onCancel={handleCancel}
        onNext={handleFormNext}
      />
    );
  }

  if (view === 'review') {
    return (
      <ReviewTenantPage
        formData={draft}
        onConfirm={handleConfirm}
        onBack={handleReviewBack}
        onCancel={handleCancel}
      />
    );
  }

  if (view === 'details' && selectedTenantId) {
    return (
      <TenantDetailsPage
        tenantId={selectedTenantId}
        onBack={handleDetailsBack}
        onDeleted={handleDetailsDeleted}
      />
    );
  }

  
  return (
    <div className="dashboard-page">
      <PageHeader
        title="إدارة المستأجرين"
        subtitle="جميع الجهات المسجلة على منصة track+"
      />

      <div className="tenants-body" dir="rtl">
        <button type="button" className="tenants-add-btn" onClick={() => setView('add')}>
          <Plus size={16} strokeWidth={2.5} />
          إضافة مستأجر جديد
        </button>

        <div className="dashboard-grid tenants-stats-grid">
          <ResponsiveGrid
            className="dashboard-grid__layout"
            layout={statsLayout}
            cols={12}
            rowHeight={54}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            isDraggable={isEditMode}
            isResizable={isEditMode}
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
            onLayoutChange={handleStatsLayoutChange}
            compactType={null}
            useCSSTransforms
          >
            {(Object.keys(statCards) as StatId[]).map((id) => (
              <div key={id} className="dashboard-grid__item">
                <div
                  dir="rtl"
                  className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}
                >
                  <StatCard {...statCards[id]} />
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </div>

        <div className="tenants-toolbar-row">
          <div className="tenants-search">
            <Search size={16} strokeWidth={2.5} className="tenants-search__icon" />
            <input type="search" placeholder="البحث" aria-label="بحث" />
          </div>
          <div className="tenants-filter-tabs">
            {tenantFilterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tenants-filter-tab ${
                  activeFilter === tab.id ? 'tenants-filter-tab--active' : ''
                }`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-grid tenants-table-grid">
          <ResponsiveGrid
            className="dashboard-grid__layout"
            layout={tableLayout}
            cols={12}
            rowHeight={54}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            isDraggable={false}
            isResizable={isEditMode}
            resizeHandles={['s', 'w', 'e', 'sw', 'se']}
            onLayoutChange={handleTableLayoutChange}
            compactType={null}
            useCSSTransforms
          >
            <div key="table" className="dashboard-grid__item">
              <div
                dir="rtl"
                className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}
              >
                <Card className="tenants-table-card">
                  <div className="tenants-table">
                    <div className="tenants-table__row tenants-table__row--head">
                      <span className="tenants-table__cell tenants-table__cell--name">الجهة</span>
                      <span className="tenants-table__cell">الحالة</span>
                      <span className="tenants-table__cell">الباقة</span>
                      <span className="tenants-table__cell">المستخدمون</span>
                      <span className="tenants-table__cell">تاريخ الانتهاء</span>
                      <span className="tenants-table__cell tenants-table__cell--nav" aria-hidden />
                    </div>

                    <div className="tenants-table__body">
                      {tenants.map((tenant) => (
                        <div className="tenants-table__row" key={tenant.id}>
                          <span className="tenants-table__cell tenants-table__cell--name">
                            {tenant.name}
                          </span>
                          <span className="tenants-table__cell">
                            <Badge
                              variant={statusVariant[tenant.status]}
                              icon={<span className="tenants-status-dot" />}
                            >
                              {tenant.statusLabel}
                            </Badge>
                          </span>
                          <span className="tenants-table__cell">{tenant.plan}</span>
                          <span className="tenants-table__cell">{tenant.users}</span>
                          <span className="tenants-table__cell">{tenant.expiresAt}</span>
                          <span className="tenants-table__cell tenants-table__cell--nav">
                            <button
                              type="button"
                              className="tenants-table__nav-btn"
                              aria-label="عرض التفاصيل"
                              onClick={() => handleOpenDetails(tenant.id)}
                            >
                              <ChevronLeft size={14} />
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ResponsiveGrid>
        </div>
      </div>
    </div>
  );
}
