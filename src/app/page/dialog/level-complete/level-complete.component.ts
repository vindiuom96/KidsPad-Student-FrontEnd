import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-level-complete',
  templateUrl: './level-complete.component.html',
  styleUrls: ['./level-complete.component.css'],
})
export class LevelCompleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
