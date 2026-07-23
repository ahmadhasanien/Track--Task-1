import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Card } from '../../ui/Card';
import { projectStatuses } from '../../../data/mockDashboard';

export function ProjectStatusDonutWidget() {
  return (
    <Card className="widget-status-donut">
      <p className="widget-title">توزيع حالات المشاريع</p>
      <div className="widget-status-donut__body">
        {/* Legend first, donut second: in RTL the first child lands on the
            right and the donut on the far left, matching the design. */}
        <div className="legend-list widget-status-donut__legend">
          {projectStatuses.map((item) => (
            <div key={item.label} className="legend-item">
              <span className="legend-item__left">
                <span className="legend-item__dot" style={{ background: item.color }} />
                {item.label}
              </span>
              <span className="legend-item__value">{item.value}%</span>
            </div>
          ))}
        </div>
        <div className="widget-status-donut__chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectStatuses}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={72}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {projectStatuses.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
