import { useCallback, useState } from 'react';
import { AlertTriangle, Clock, Repeat, Search } from 'lucide-react';
import GridLayout, { WidthProvider, type Layout, type LayoutItem } from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { PageHeader } from '../layout/PageHeader';
import {
  auditFilterTabs,
  auditLogEntries,
  auditLogSummary,
  type AuditFilterId,
  type AuditLogSeverity,
} from '../../data/auditLog';
import '../layout/layout.css';
import '../dashboard/dashboard.css';
import '../tenants/tenants.css';
import './audit.css';

const ResponsiveGrid = WidthProvider(GridLayout);

const severityIcon: Record<AuditLogSeverity, typeof Clock> = {
  success: Clock,
  warning: AlertTriangle,
  info: Repeat,
};

const DEFAULT_STATS_LAYOUT: LayoutItem[] = [
  { i: 'today', x: 9, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
  { i: 'deletions', x: 6, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
  { i: 'suspicious', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
  { i: 'mostActive', x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 6, minH: 2, maxH: 4 },
];

const DEFAULT_LOG_LAYOUT: LayoutItem[] = [
  { i: 'log', x: 0, y: 0, w: 12, h: 8, minW: 6, maxW: 12, minH: 3, maxH: 20 },
];

export function AuditLogPage() {
  const [activeFilter, setActiveFilter] = useState<AuditFilterId | null>(null);
  
  
  
  
  const isEditMode = false;
  const [statsLayout, setStatsLayout] = useState<LayoutItem[]>(DEFAULT_STATS_LAYOUT);
  const [logLayout, setLogLayout] = useState<LayoutItem[]>(DEFAULT_LOG_LAYOUT);

  const handleStatsLayoutChange = useCallback(
    (newLayout: Layout) => {
      if (!isEditMode) return;
      setStatsLayout([...newLayout]);
    },
    [isEditMode],
  );

  const handleLogLayoutChange = useCallback(
    (newLayout: Layout) => {
      if (!isEditMode) return;
      setLogLayout([...newLayout]);
    },
    [isEditMode],
  );

  return (
    <div className="dashboard-page">
      <PageHeader
        title="سجل التدقيق"
        subtitle="سجل كامل بجميع الإجراءات على المنصة"
      />

      <div className="tenants-body" dir="rtl">
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
            <div key="today" className="dashboard-grid__item">
              <div
                dir="rtl"
                className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}
              >
                <Card className="audit-stat-card">
                  <p className="widget-title">إجراءات اليوم</p>
                  <div className="widget-stat-block widget-stat-inline">
                    <span className="widget-stat-value">{auditLogSummary.actionsToday}</span>
                    <span className="widget-stat-label audit-stat-card__label--bold">إجراءات</span>
                  </div>
                </Card>
              </div>
            </div>

            <div key="deletions" className="dashboard-grid__item">
              <div
                dir="rtl"
                className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}
              >
                <Card className="audit-stat-card">
                  <p className="widget-title">عمليات الحذف</p>
                  <div className="widget-stat-block">
                    <span className="widget-stat-value">{auditLogSummary.deletions}</span>
                  </div>
                </Card>
              </div>
            </div>

            <div key="suspicious" className="dashboard-grid__item">
              <div
                dir="rtl"
                className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}
              >
                <Card className="audit-stat-card">
                  <p className="widget-title">محاولات دخول مشبوهة</p>
                  <div className="widget-bottom-row">
                    <span className="widget-stat-value">{auditLogSummary.suspiciousAttempts}</span>
                    <Badge variant="danger" icon={<AlertTriangle size={12} />}>
                      <strong>من عناوين IP</strong>
                    </Badge>
                  </div>
                </Card>
              </div>
            </div>

            <div key="mostActive" className="dashboard-grid__item">
              <div
                dir="rtl"
                className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}
              >
                <Card className="audit-stat-card">
                  <p className="widget-title">أكثر جهة نشاطًا</p>
                  <div className="widget-stat-block">
                    <span className="audit-stat-card__entity">{auditLogSummary.mostActiveEntity.name}</span>
                    <span className="audit-stat-card__submeta">
                      {auditLogSummary.mostActiveEntity.actionsCount} إجراءات · {auditLogSummary.mostActiveEntity.role}
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </ResponsiveGrid>
        </div>

        <div className="tenants-toolbar-row">
          <div className="tenants-search">
            <Search size={16} strokeWidth={2.5} className="tenants-search__icon" />
            <input type="search" placeholder="البحث" aria-label="بحث" />
          </div>
          <div className="tenants-filter-tabs">
            {auditFilterTabs.map((tab) => (
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
            layout={logLayout}
            cols={12}
            rowHeight={54}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            isDraggable={false}
            isResizable={isEditMode}
            resizeHandles={['s', 'w', 'e', 'sw', 'se']}
            onLayoutChange={handleLogLayoutChange}
            compactType={null}
            useCSSTransforms
          >
            <div key="log" className="dashboard-grid__item">
              <div
                dir="rtl"
                className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}
              >
                <Card className="audit-log-card">
                  <div className="audit-log-card__header">
                    <span className="audit-log-card__count">{auditLogEntries.length}</span>
                    <h2 className="audit-log-card__title">سجل الإجراءات</h2>
                  </div>
                  <div className="audit-log-list">
                    {auditLogEntries.map((entry) => {
                      const Icon = severityIcon[entry.severity];
                      return (
                        <div className="audit-log-row" key={entry.id}>
                          <div className="audit-log-row__main">
                            <span className={`audit-log-row__icon audit-log-row__icon--${entry.severity}`}>
                              <Icon size={16} strokeWidth={2.25} />
                            </span>
                            <div className="audit-log-row__text">
                              <p className="audit-log-row__title">{entry.title}</p>
                              <p className="audit-log-row__meta">{entry.meta}</p>
                            </div>
                          </div>
                          <span className="audit-log-row__time">{entry.time}</span>
                        </div>
                      );
                    })}
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
