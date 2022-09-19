import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { GameComponent } from './game/game.component';
import { StudentHomeComponent } from './home/home.component';
import { LevelComponent } from './level/level.component';

const routes: Routes = [
  { path: 'game/:type/:level', component: GameComponent },
  { path: 'level/:type', component: LevelComponent },
  {
    path: 'student-home',
    component: StudentHomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
