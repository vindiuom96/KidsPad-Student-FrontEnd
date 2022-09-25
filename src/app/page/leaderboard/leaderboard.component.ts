import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from '../dialog/add-comment/add-comment.component';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) {}

  leaderboardData: any = [];
  displayedColumns: string[] = ['rank', 'name', 'score', 'comment'];
  dataSource: any = [];
  isTeacher: boolean = true;
  audio = new Audio();

  ngOnInit(): void {
    //click audio
    this.audio.src = '../assets/audio clips/click.wav';
    this.audio.load();

    this.studentService.GetLeaderboardData().subscribe((res: any) => {
      if (res != null && res.length > 0) {
        this.leaderboardData = res;
        this.dataSource = this.leaderboardData;
      }
    });

    if (localStorage.getItem('userType') == 'student') {
      this.isTeacher = false;
      this.displayedColumns = ['rank', 'name', 'score'];

      this.commonService.StopAudio();
      this.commonService.PlayAudio(
        '../assets/audio clips/Student Leaderboard.m4a'
      );
    }
  }

  UpdateComment(studentId: string) {
    this.dialog.open(AddCommentComponent, {
      data: { studentId: studentId },
      disableClose: true,
      height: '480px',
      width: '600px',
    });
  }

  ClickAudio() {
    this.audio.play();
  }
}
