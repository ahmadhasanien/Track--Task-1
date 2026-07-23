import { ChevronLeft, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { ProgressBar } from '../../ui/ProgressBar';
import { projects } from '../../../data/mockDashboard';

const statusVariant = {
  'on-track': 'success',
  late: 'warning',
  stalled: 'danger',
  completed: 'success',
} as const;

// Progress-bar tone deliberately doesn't mirror the badge tone 1:1: an
// on-track project's bar is blue (not green) per the target design, while
// late/stalled bars do match their badge's warning/danger tone.
const statusBarTone = {
  'on-track': 'info',
  late: 'warning',
  stalled: 'danger',
  completed: 'success',
} as const;

const statusIcon = {
  'on-track': CheckCircle2,
  late: AlertTriangle,
  stalled: AlertCircle,
  completed: CheckCircle2,
} as const;

export function ProjectsListWidget() {
  return (
    <Card>
      <div className="widget-header">
        <h3 className="widget-header__title">المشاريع</h3>
        <button type="button" className="widget-header__link">
          عرض الكل
        </button>
      </div>
      <div className="list-rows">
        {projects.map((item) => {
          const StatusIcon = statusIcon[item.status];
          return (
            <div className="list-row" key={item.id}>
              <div className="list-row__text">
                <p className="list-row__title">{item.title}</p>
                <p className="list-row__subtitle">{item.company}</p>
              </div>
              <ProgressBar
                value={item.progress}
                tone={statusBarTone[item.status]}
                className="list-row__bar"
              />
              <span className="list-row__percentage">{item.progress}%</span>
              <Badge variant={statusVariant[item.status]} icon={<StatusIcon size={12} />}>
                {item.statusLabel}
              </Badge>
              <button type="button" className="list-row__nav-btn" aria-label="عرض التفاصيل">
                <ChevronLeft size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
