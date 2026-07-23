import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Card } from '../../ui/Card';
import { openRisks } from '../../../data/mockDashboard';

const data = [
  { name: 'مرتفع', value: openRisks.high, color: '#F04438' },
  { name: 'متوسط', value: openRisks.medium, color: '#F79009' },
  { name: 'منخفض', value: openRisks.low, color: '#17B26A' },
];

export function OpenRisksDonutWidget() {
  return (
    <Card className="widget-open-risks">
      <p className="widget-title widget-open-risks__title">المخاطر المفتوحة</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
        {/* Legend first, donut second: in this RTL card the first child
            lands on the right, so this order puts the legend on the right
            and the donut on the far left, matching the target design. */}
        <div className="legend-list" style={{ flex: 1 }}>
          {data.map((item) => (
            <div key={item.name} className="legend-item">
              <span className="legend-item__left">
                <span className="legend-item__dot" style={{ background: item.color }} />
                <span style={{ color: item.color, fontWeight: 700 }}>{item.name}</span>
              </span>
              <span className="legend-item__value">{item.value}</span>
            </div>
          ))}
        </div>
        <div style={{ width: 76, height: 76, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={34}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
