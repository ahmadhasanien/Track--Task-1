import type { LayoutItem } from 'react-grid-layout/legacy';
import type { ComponentType } from 'react';
import { ActiveProjectsWidget } from '../components/dashboard/widgets/ActiveProjectsWidget';
import { AvgProgressWidget } from '../components/dashboard/widgets/AvgProgressWidget';
import { UpcomingDeliverablesWidget } from '../components/dashboard/widgets/UpcomingDeliverablesWidget';
import { OpenRisksDonutWidget } from '../components/dashboard/widgets/OpenRisksDonutWidget';
import { RisksByLevelChartWidget } from '../components/dashboard/widgets/RisksByLevelChartWidget';
import { ProjectStatusDonutWidget } from '../components/dashboard/widgets/ProjectStatusDonutWidget';
import { TodayAlertsWidget } from '../components/dashboard/widgets/TodayAlertsWidget';
import { DeliverablesListWidget } from '../components/dashboard/widgets/DeliverablesListWidget';
import { ProjectsListWidget } from '../components/dashboard/widgets/ProjectsListWidget';

export type WidgetId =
  | 'active-projects'
  | 'avg-progress'
  | 'upcoming-deliverables'
  | 'open-risks-donut'
  | 'risks-by-level'
  | 'project-status-donut'
  | 'today-alerts'
  | 'deliverables-list'
  | 'projects-list';

export interface WidgetDefinition {
  id: WidgetId;
  title: string;
  minW: number;
  minH: number;
  component: ComponentType;
  /**
   * If true, the widget's row-span grows/shrinks automatically to fit its
   * content (e.g. a variable-length alert list) instead of staying at a
   * fixed size the user has to resize manually.
   */
  autoHeight?: boolean;
}

export const WIDGET_REGISTRY: Record<WidgetId, WidgetDefinition> = {
  'active-projects': {
    id: 'active-projects',
    title: 'المشاريع النشطة',
    minW: 3,
    minH: 2,
    component: ActiveProjectsWidget,
  },
  'avg-progress': {
    id: 'avg-progress',
    title: 'متوسط تقدم المشاريع',
    minW: 3,
    minH: 2,
    component: AvgProgressWidget,
  },
  'upcoming-deliverables': {
    id: 'upcoming-deliverables',
    title: 'مخرجات قادمة',
    minW: 3,
    minH: 2,
    component: UpcomingDeliverablesWidget,
  },
  'open-risks-donut': {
    id: 'open-risks-donut',
    title: 'المخاطر المفتوحة',
    minW: 3,
    minH: 2,
    component: OpenRisksDonutWidget,
  },
  'risks-by-level': {
    id: 'risks-by-level',
    title: 'المخاطر المفتوحة حسب المستوى',
    minW: 5,
    minH: 4,
    component: RisksByLevelChartWidget,
  },
  'project-status-donut': {
    id: 'project-status-donut',
    title: 'توزيع حالات المشاريع',
    minW: 4,
    minH: 4,
    component: ProjectStatusDonutWidget,
  },
  'today-alerts': {
    id: 'today-alerts',
    title: 'تنبيهات اليوم',
    minW: 6,
    minH: 3,
    component: TodayAlertsWidget,
    autoHeight: true,
  },
  'deliverables-list': {
    id: 'deliverables-list',
    title: 'المخرجات',
    minW: 4,
    minH: 3,
    component: DeliverablesListWidget,
  },
  'projects-list': {
    id: 'projects-list',
    title: 'المشاريع',
    minW: 4,
    minH: 3,
    component: ProjectsListWidget,
  },
};

export const ALL_WIDGET_IDS = Object.keys(WIDGET_REGISTRY) as WidgetId[];

export const DEFAULT_LAYOUT: LayoutItem[] = [
  { i: 'active-projects', x: 9, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
  { i: 'avg-progress', x: 6, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
  { i: 'upcoming-deliverables', x: 3, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
  { i: 'open-risks-donut', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2 },
  { i: 'risks-by-level', x: 6, y: 2, w: 6, h: 4, minW: 5, minH: 4 },
  { i: 'project-status-donut', x: 0, y: 2, w: 6, h: 4, minW: 4, minH: 4 },
  { i: 'today-alerts', x: 0, y: 6, w: 12, h: 3, minW: 6, minH: 3 },
  { i: 'deliverables-list', x: 6, y: 9, w: 6, h: 3, minW: 4, minH: 3 },
  { i: 'projects-list', x: 0, y: 9, w: 6, h: 3, minW: 4, minH: 3 },
];
