import { CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { ProgressBar } from '../../ui/ProgressBar';
import { dashboardStats } from '../../../data/mockDashboard';

/** Red under 40%, yellow/orange between 40–70%, green from 70% up. */
function getProgressTone(value: number): 'danger' | 'warning' | 'success' {
  if (value < 40) return 'danger';
  if (value < 70) return 'warning';
  return 'success';
}

const toneLabels: Record<'danger' | 'warning' | 'success', string> = {
  success: 'على المسار',
  warning: 'يحتاج متابعة',
  danger: 'متأخر',
};

export function AvgProgressWidget() {
  const tone = getProgressTone(dashboardStats.avgProgress);

  return (
    <Card className="widget-avg-progress">
      <div className="widget-icon-header">
        <p className="widget-title widget-avg-progress__title">متوسط تقدم المشاريع</p>
        <span className="widget-icon-badge">
          <TrendingUp size={16} aria-hidden style={{ transform: 'scaleX(-1)' }} />
        </span>
      </div>
      <div className="widget-progress-row">
        <p className="widget-stat-value widget-avg-progress__value">{dashboardStats.avgProgress}%</p>
        <Badge variant={tone} icon={<CheckCircle2 size={14} aria-hidden />}>
          {toneLabels[tone]}
        </Badge>
      </div>
      <ProgressBar
        value={dashboardStats.avgProgress}
        tone={tone}
        className="widget-avg-progress__bar"
      />
    </Card>
  );
}
