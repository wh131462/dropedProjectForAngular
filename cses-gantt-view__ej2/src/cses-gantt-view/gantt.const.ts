import {ZoomTimelineSettings} from "@syncfusion/ej2-gantt";

interface IContextMenuItem {

}

export const contextMenuDefault: Array<IContextMenuItem> = [
  {
    text: '添加任务',
    items: [
      {
        text: '添加子任务',
        id: 'AddSubTask',
        target: '.e-content',
        iconCss: 'e-icons e-delete'
      },
      {
        text: '添加兄弟任务',
        id: 'AddSublimingTask'
      }
    ]
  },
  {
    text: '删除任务',
    id: 'DeleteTask'
  },
  {
    text: '添加依赖',
    id: 'AddDependency'
  },
  {
    text: '删除依赖',
    id: 'DeleteDependency'
  },
  'Indent',
  'Outdent',
];

export const customZoomingLevels: ZoomTimelineSettings[] = [
    {
      topTier: {unit: 'Year', format: 'yyyy年', count: 1},
      bottomTier: {unit: 'Month', format: 'MM月', count: 1}, timelineUnitSize: 100, level: 0,
      timelineViewMode: 'Year', weekStartDay: 1, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
      topTier: {unit: 'Month', format: 'MM月,yyyy年', count: 1},
      bottomTier: {unit: 'Week', format: '第W周', count: 1}, timelineUnitSize: 100, level: 1,
      timelineViewMode: 'Month', weekStartDay: 1, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
      topTier: {unit: 'Month', format: 'MM月yyyy年', count: 1},
      bottomTier: {unit: 'Day', format: 'MM月dd日,EEE', count: 1}, timelineUnitSize: 100, level: 2,
      timelineViewMode: 'Day', weekStartDay: 1, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
      topTier: {unit: 'Day', format: 'MM月dd日', count: 1},
      bottomTier: {unit: 'Hour', format: 'hh a', count: 1}, timelineUnitSize: 50, level: 3,
      timelineViewMode: 'Hour', weekStartDay: 1, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
  ];
