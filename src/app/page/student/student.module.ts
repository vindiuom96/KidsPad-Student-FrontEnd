import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { GameComponent } from './game/game.component';
import { StudentHomeComponent } from './home/home.component';
import { LevelComponent } from './level/level.component';
import { MaterialModule } from 'src/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LevelCompleteComponent } from '../dialog/level-complete/level-complete.component';
import { AddCommentComponent } from '../dialog/add-comment/add-comment.component';

@NgModule({
  declarations: [
    GameComponent,
    StudentHomeComponent,
    LevelComponent,
    AddCommentComponent,
  ],
  entryComponents: [LevelCompleteComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StudentModule {}
