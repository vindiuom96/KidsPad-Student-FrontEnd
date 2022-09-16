import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class StudentHomeComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private commonService: CommonService
  ) {}

  studentRank: any = 0;
  userFirstName: string | null = '';
  isMute: boolean = true;
  audio = new Audio();

  ngOnInit(): void {
    this.commonService.StopAudio();
    this.isMute = this.commonService.isMute;
    this.commonService.PlayAudio('../assets/audio clips/Main Menu.m4a');

    //click audio
    this.audio.src = '../assets/audio clips/click.wav';
    this.audio.load();

    this.studentService
      .GetStudentRank(localStorage.getItem('studentId'))
      .subscribe((res) => {
        this.studentRank = res;
      });

    this.userFirstName = localStorage.getItem('userFirstName');
  }
  ToggleMute() {
    this.commonService.ToggleMute();
    this.isMute = this.commonService.isMute;
  }

  ClickAudio() {
    this.audio.play();
  }
}
