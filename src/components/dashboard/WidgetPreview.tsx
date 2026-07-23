import type { ReactElement } from 'react';
import { AlertTriangle, Bell, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { WIDGET_REGISTRY, type WidgetId } from '../../config/widgets';
import {
  dashboardStats,
  deliverables,
  openRisks,
  projects,
  projectStatuses,
  risksByMonth,
  todayAlerts,
} from '../../data/mockDashboard';

/**
 * Small, self-contained preview renderers for the widget library drawer.
 *
 * These intentionally do NOT reuse the full dashboard widget components
 * (ActiveProjectsWidget, RisksByLevelChartWidget, etc). Those are built to
 * fill a full grid cell — some need 180px+ of height for their chart alone
 * — so dropping them into a shallow thumbnail and scaling/clipping them
 * produces the cut-off donut / half-visible legend bug seen in the running
 * app. A purpose-built miniature keeps every preview legible at a fixed,
 * predictable height.
 */

function Donut({ segments }: { segments: { color: string; value: number }[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let acc = 0;
  const stops = segments
    .map((s) => {
      const start = (acc / total) * 100;
      acc += s.value;
      const end = (acc / total) * 100;
      return `${s.color} ${start}% ${end}%`;
    })
    .join(', ');

  return (
    <div className="wlp-donut" style={{ background: `conic-gradient(${stops})` }}>
      <div className="wlp-donut__hole" />
    </div>
  );
}

function LegendRows({ rows }: { rows: { color: string; label: string; value: number | string }[] }) {
  return (
    <div className="wlp-legend">
      {rows.map((row) => (
        <div className="wlp-legend__row" key={row.label}>
          <span className="wlp-legend__left">
            <span className="wlp-legend__dot" style={{ background: row.color }} />
            {row.label}
          </span>
          <span className="wlp-legend__value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function ActiveProjectsPreview() {
  // ActiveProjectsWidget pairs the value + unit label on a single
  // baseline-aligned line ("8 مشاريع"), not stacked on two lines.
  return (
    <div className="wlp-stat-inline">
      <span className="wlp-stat__value">{dashboardStats.activeProjects}</span>
      <span className="wlp-stat__label">مشاريع</span>
    </div>
  );
}

// Tone thresholds and labels mirror AvgProgressWidget exactly (red under
// 40%, orange 40–70%, green 70%+) so the mini preview keeps matching the
// real widget even if the mock progress value changes.
const AVG_PROGRESS_TONE_LABELS: Record<'danger' | 'warning' | 'success', string> = {
  success: 'على المسار',
  warning: 'يحتاج متابعة',
  danger: 'متأخر',
};

function AvgProgressPreview() {
  const value = dashboardStats.avgProgress;
  const tone =
    value < 40 ? 'danger' : value < 70 ? 'warning' : 'success';
  const fillClass =
    tone === 'danger'
      ? '#F04438'
      : tone === 'warning'
        ? '#F79009'
        : '#17B26A';

  return (
    <div className="wlp-progress">
      <div className="wlp-bottom-row">
        <span className="wlp-stat__value wlp-stat__value--tight">{value}%</span>
        <span className={`wlp-badge wlp-badge--${tone}`}>
          <CheckCircle2 size={11} />
          {AVG_PROGRESS_TONE_LABELS[tone]}
        </span>
      </div>
      <div className="wlp-track">
        <div className="wlp-track__fill" style={{ width: `${value}%`, background: fillClass }} />
      </div>
    </div>
  );
}

function UpcomingDeliverablesPreview() {
  // Order matches UpcomingDeliverablesWidget: stat-inline first, badge
  // second — in this RTL card that lands the count on the right and the
  // badge on the left, same as the real widget.
  return (
    <div className="wlp-bottom-row">
      <div className="wlp-stat-inline">
        <span className="wlp-stat__value">{dashboardStats.upcomingDeliverables}</span>
        <span className="wlp-stat__label">مخرجات</span>
      </div>
      <span className="wlp-badge wlp-badge--warning">
        <Bell size={11} />
        {dashboardStats.deliverablesThisWeek} خلال أسبوع
      </span>
    </div>
  );
}

function OpenRisksDonutPreview() {
  const segments = [
    { color: '#F04438', value: openRisks.high },
    { color: '#F79009', value: openRisks.medium },
    { color: '#17B26A', value: openRisks.low },
  ];
  return (
    // Legend first, donut second: same as OpenRisksDonutWidget — in this
    // RTL card the first child lands on the right, putting the legend on
    // the right and the donut on the far left, matching the target design.
    <div className="wlp-donut-row">
      <LegendRows
        rows={[
          { color: '#F04438', label: 'مرتفع', value: openRisks.high },
          { color: '#F79009', label: 'متوسط', value: openRisks.medium },
          { color: '#17B26A', label: 'منخفض', value: openRisks.low },
        ]}
      />
      <Donut segments={segments} />
    </div>
  );
}

function ProjectStatusDonutPreview() {
  const segments = projectStatuses.map((s) => ({ color: s.color, value: s.value }));
  return (
    // Same legend-first/donut-second order as ProjectStatusDonutWidget.
    <div className="wlp-donut-row">
      <LegendRows
        rows={projectStatuses.map((s) => ({ color: s.color, label: s.label, value: `${s.value}%` }))}
      />
      <Donut segments={segments} />
    </div>
  );
}

function RisksByLevelPreview() {
  const sample = risksByMonth.slice(0, 5);
  const maxTotal = Math.max(...sample.map((m) => m.low + m.medium + m.high));
  return (
    <div className="wlp-bars">
      {sample.map((m) => {
        const total = m.low + m.medium + m.high;
        const height = Math.max(24, Math.round((total / maxTotal) * 56));
        return (
          <div className="wlp-bars__col" key={m.month} style={{ height }}>
            {/* DOM order low → medium → high, same as RisksByLevelChartWidget's
                SEGMENTS array: inside a column-reverse flex container this
                places green at the bottom and red at the top of each bar. */}
            <div className="wlp-bars__seg" style={{ flex: m.low, background: '#17B26A' }} />
            <div className="wlp-bars__seg" style={{ flex: m.medium, background: '#F79009' }} />
            <div className="wlp-bars__seg" style={{ flex: m.high, background: '#F04438' }} />
          </div>
        );
      })}
    </div>
  );
}

function TodayAlertsPreview() {
  const sample = todayAlerts.slice(0, 2);
  return (
    <div className="wlp-alerts">
      {sample.map((alert) => (
        <div className="wlp-alerts__row" key={alert.id}>
          <span className={`wlp-alerts__icon wlp-alerts__icon--${alert.type}`}>
            {alert.type === 'risk' ? <AlertTriangle size={12} /> : <Clock size={12} />}
          </span>
          <span className="wlp-alerts__title">{alert.title}</span>
        </div>
      ))}
    </div>
  );
}

function DeliverablesListPreview() {
  const item = deliverables[0];
  return (
    <div className="wlp-list-item">
      <p className="wlp-list-item__title">{item?.title ?? 'مخرج'}</p>
      <p className="wlp-list-item__subtitle">{item?.project ?? ''}</p>
    </div>
  );
}

function ProjectsListPreview() {
  const item = projects[0];
  return (
    <div className="wlp-list-item">
      <p className="wlp-list-item__title">{item?.title ?? 'مشروع'}</p>
      <div className="wlp-track wlp-track--sm">
        <div className="wlp-track__fill" style={{ width: `${item?.progress ?? 0}%` }} />
      </div>
    </div>
  );
}

const PREVIEWS: Record<WidgetId, () => ReactElement> = {
  'active-projects': ActiveProjectsPreview,
  'avg-progress': AvgProgressPreview,
  'upcoming-deliverables': UpcomingDeliverablesPreview,
  'open-risks-donut': OpenRisksDonutPreview,
  'risks-by-level': RisksByLevelPreview,
  'project-status-donut': ProjectStatusDonutPreview,
  'today-alerts': TodayAlertsPreview,
  'deliverables-list': DeliverablesListPreview,
  'projects-list': ProjectsListPreview,
};

const PREVIEW_ICONS: Partial<Record<WidgetId, ReactElement>> = {
  'avg-progress': <TrendingUp size={13} aria-hidden style={{ transform: 'scaleX(-1)' }} />,
};

export function WidgetPreview({ id }: { id: WidgetId }) {
  const Preview = PREVIEWS[id];
  const icon = PREVIEW_ICONS[id];
  return (
    <div className="wlp-card">
      <div className="wlp-header">
        <p className="wlp-title">{WIDGET_REGISTRY[id].title}</p>
        {icon && <span className="wlp-icon-badge">{icon}</span>}
      </div>
      <Preview />
    </div>
  );
}
