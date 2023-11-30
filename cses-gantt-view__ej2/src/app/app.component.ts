import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cses-gantt-view__ej2';
  data: any = [
    {
      "id": "654dc7a7f33388197ffb584c",
      "runId": "654dc7a7f33388197ffb5856",
      "title": "测试任务",
      "creatorId": "64b66a105965132667458710",
      "isHead": false,
      "leaders": [
        {
          "id": "5fc99f49d7dba42840869b4e",
        }
      ],
      "tags": [
        {
          "id": "6543183a6b474e6117301231",
          "userId": "64b66a105965132667458710",
          "label": "测试",
          "color": "#F9EDE1"
        }
      ],
      "status": "unfinished",
      "status_": "未完成",
      "startTime": new Date(1699696500000),
      "type": "composite",
      "type_": "普通主任务任务",
      "stopTime":  new Date(1800042100000),
      "progress": 0
    },
  ];
}
