import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private commonService: CommonService
  ) {}

  gameTypeId: string | null | undefined;
  gameType: string = '';
  displayedColumns: string[] = ['lvl', 'status', 'comment'];
  dataSource: any;
  isMute: boolean = true;
  audio = new Audio();

  ngOnInit(): void {
    this.commonService.StopAudio();
    this.isMute = this.commonService.isMute;
    this.gameTypeId = this.route.snapshot.paramMap.get('type');

    //click audio
    this.audio.src = '../assets/audio clips/click.wav';
    this.audio.load();

    this.studentService
      .GetLevelData(localStorage.getItem('studentId'), this.gameTypeId)
      .subscribe((res) => {
        if (res != null) {
          this.dataSource = res;
        }
      });

    let file;
    switch (this.gameTypeId) {
      case 'add':
        this.gameType = 'Adding';
        file = 'Selecting Level - Addition';
        this.commonService.PlayAudio('../assets/audio clips/' + file + '.m4a');
        break;
      case 'subtract':
        this.gameType = 'Subtracting';
        file = 'Selecting Level - Subtraction';
        this.commonService.PlayAudio('../assets/audio clips/' + file + '.m4a');
        break;
      case 'multiply':
        this.gameType = 'Multiplying';
        file = 'Selecting Level - Multiplication';
        this.commonService.PlayAudio('../assets/audio clips/' + file + '.m4a');
        break;
      case 'divide':
        this.gameType = 'Dividing';
        file = 'Selecting Level - Division';
        this.commonService.PlayAudio('../assets/audio clips/' + file + '.m4a');
        break;
      default:
        this.gameType = '';
    }
  }

  ToggleMute() {
    this.commonService.ToggleMute();
    this.isMute = this.commonService.isMute;
  }

  levelSelected(level: string) {
    this.router.navigate(['/game/' + this.gameTypeId + '/l' + level]);
  }

  ClickAudio() {
    this.audio.play();
  }
}
