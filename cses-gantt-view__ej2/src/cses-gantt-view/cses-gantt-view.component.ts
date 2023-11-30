import {Component, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {L10n, registerLicense, setCulture} from '@syncfusion/ej2-base';
import {
  ContextMenuClickEventArgs,
  ContextMenuOpenEventArgs,
  EditSettings,
  Gantt,
  GanttAllModule,
  IGanttData,
  TimelineSettings,
  TooltipSettings
} from "@syncfusion/ej2-angular-gantt";
import {FormsModule} from "@angular/forms";
import {contextMenuDefault, customZoomingLevels} from "./gantt.const";
import {zh} from "./local.zh";
import {ScheduleMode} from "@syncfusion/ej2-gantt/src/gantt/base/enum";

setCulture('zh-cn');

L10n.load(zh);
registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIfExzWmFZfV1gdl9HZVZSQ2YuP1ZhSXxQd0RhUX9ccXFWQWlUVkA=');

@Component({
  selector: 'cses-gantt-view',
  standalone: true,
  imports: [CommonModule, FormsModule, GanttAllModule],
  templateUrl: './cses-gantt-view.component.html',
  styleUrls: ['./cses-gantt-view.component.scss']
})
export class CsesGanttViewComponent {
  public taskSettings: object = {
    id: 'id',
    name: 'title',
    startDate: "startTime",
    endDate: "stopTime",
    progress: 'progress',
    dependency: 'link',
    parentID: "parentId"
  };
  _data:Array<any> = [];
  @Input()
  get data():Array<any>{
    return this._data;
  }
  set data(value:Array<any>){
    if(!value) value = [];
    value = value.map(item=>{
      item[this.taskSettings['startDate']] = new Date(item[this.taskSettings['startDate']]);
      item[this.taskSettings['endDate']] = new Date(item[this.taskSettings['endDate']]);
      return item
    })
    this._data = value;
  };
  @Input() contextMenu: any = contextMenuDefault;
  @Input() readonly: boolean = false;

  taskMode: ScheduleMode = "Custom";

  public splitterSettings: object = {
    columnIndex: 4
  };
  editSettings: Partial<EditSettings> = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: false
  };
  selectionSettings: any = {
    type: 'Multiple',
    mode: 'Row'
  };
  timezone: string = "Asia/Shanghai";

  timelineSettings: Partial<TimelineSettings> = {
    topTier: {unit: 'Month', format: 'MMM, yyyy', count: 1},
    bottomTier: {unit: 'Week', format: 'dd MMM', count: 1}, timelineUnitSize: 66,
    timelineViewMode: 'Month', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
  };
  tooltipSettings: Partial<TooltipSettings> = {showTooltip: false};
  customZoomingLevels = customZoomingLevels;

  @ViewChild("gantt") gantt: Gantt;
  todayMaker: any = [{
    day: new Date(),
    label: ''
  }];
  mode: string = "";

  constructor() {
  }

  /**
   * 右键菜单
   * @param args
   */
  contextMenuClick(args?: ContextMenuClickEventArgs): void {
    let record: IGanttData = args.rowData;
    switch (args.item.id) {
      case "DeleteTask":
        this.gantt.deleteRecord(record)
        break;
      case "AddSubTask":
        this.gantt.addRecord({...this.convertNewTask(record.taskData),parentId:record.taskData['id'],title:"未命名"}, "Child", record.index)
        break;
      case "AddSublimingTask":
        this.gantt.addRecord(this.convertNewTask(record.taskData), "Below", record.index)
        break;
      case "AddDependency":
        console.log(record)
        this.mode = "dependency";
        break;
      case "DeleteDependency":
        console.log(record)
        this.gantt.removePredecessor(record.uniqueID)
        break;
    }
  }

  convertNewTask(data: any): any {
    return Object.entries(data).reduce((pre, [key, value], index) => {
      switch (typeof value) {
        case "object":
          value = Array.isArray(value)?[]:value instanceof Date?new Date(value.valueOf()):{};
          break;
        case "boolean":
          value = false;
          break;
        case "number":
          value = 0;
          break;
        default:
          value = "";
          break;
      }
      return Object.assign(pre, {[key]: value});
    }, {})
  }

  /**
   * 右键菜单禁用
   * @param args
   */
  contextMenuOpen(args?: ContextMenuOpenEventArgs): void {
    console.log("context open", args)
    let record: IGanttData = args.rowData;
    if (args.type !== 'Header') {
      // todo 根据不同条件隐藏元素
    }
  }

  onTaskBarClick(evt: any) {
    console.log("click", evt)
    this.mode = "";
  }

  onRowDragStart(event: any) {
    console.log("drag start", event)
  }

  onRowDrop(event: any) {
    console.log("drag drop", event, this.gantt.dataSource)
  }

  // 升级 放大
  zoomIn(): void {
    if (this.gantt.currentZoomingLevel.level == this.customZoomingLevels.length - 1) return
    this.gantt.zoomIn();
  };

  // 降级 缩小
  zoomOut(): void {
    if (this.gantt.currentZoomingLevel.level == 0) return
    this.gantt.zoomOut();
  };

  zoomFit(): void {
    this.gantt.fitToProject();
  };

  zoomTo(index: number): void {
    this.timelineSettings = this.customZoomingLevels[index % this.customZoomingLevels.length];
  }

  /**
   * 所有行为开始之前
   * @param args
   */
  actionBegin(args: any) {
    if (args.requestType == 'beforeOpenEditDialog') {
      args.cancel = true;
    }
  }

  actionComplete(args: any) {
  }

  actionFailure(args: any) {
  }

  recordDoubleClick(args: any) {
    this.gantt.hideSpinner()
  }

  onTaskbarEditing(args: any) {
    const task = args.data;
    if (task?.ganttProperties?.isMilestone) {
      args.cancel = true; // 取消编辑操作
    }
  }

  onMouseWheel(args: any): void {
    return
    const delta = args.deltaY;
    if (delta > 0) {
      // 向上滚动，时间视图单位变小
      this.zoomOut()
    } else {
      // 向下滚动，时间视图单位变大
      this.zoomIn()
    }
  }

  /**
   * 屏幕拖拽实现视图滚动
   * @private
   */
  // region 屏幕拖拽实现视图滚动
  private isDragging: boolean = false;
  private startX: number = 0;
  private startY: number = 0;

  onMouseDown(args: any): void {
    if (args.which === 2) {
      // 鼠标中键按下，开始拖拽
      this.isDragging = true;
      this.startX = args.x - this.gantt.treeGridPane.clientWidth  - 4;
      this.startY = args.y;
      document.body.style.setProperty("cursor", "grab", "important");
    }
  }

  onMouseMove(args: any): void {
    if (this.isDragging) {
      // 正在拖拽，计算横向滚动
      const scrollbar = this.gantt.chartPane.querySelector('.e-chart-scroll-container')
      const {scrollLeft,scrollTop} = scrollbar;
      // 当前位置处于屏幕的位置
      const newLeft = args.x - this.gantt.treeGridPane.clientWidth  - 4;
      const newTop = args.y;
      const deltaX = newLeft - this.startX;
      const deltaY = newTop - this.startY;
      this.gantt.updateChartScrollOffset(scrollLeft - deltaX, scrollTop - deltaY);
      this.startX = newLeft;
      this.startY = newTop;
    }
  }

  onMouseUp(args: any): void {
    if (this.isDragging) {
      // 鼠标中键释放，停止拖拽
      this.isDragging = false;
      document.body.style.removeProperty("cursor");
    }
  }
  // endregion

  onResized(args: any) {
    console.log(args)
    if (args.paneSize[0]) {
      // todo 替换column
    }
  }
}
