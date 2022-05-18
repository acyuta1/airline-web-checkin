import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss']
})
export class ButtonCellRendererComponent implements OnInit {

  private params: any;
  agInit(params: any): void {
    this.params = params;
  }
  buttonClicked() {
    this.params.clicked(this.params.data);
  }
  ngOnDestroy() {
  }

  ngOnInit(): void {
  }

}
