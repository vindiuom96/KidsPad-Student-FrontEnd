import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private commonService: CommonService) {}
  audio = new Audio();

  ngOnInit(): void {
    this.commonService.StopAudio();
    this.commonService.PlayAudio(
      '../assets/audio clips/Select Student or Teacher.m4a'
    );

    //click audio
    this.audio.src = '../assets/audio clips/click.wav';
    this.audio.load();
  }

  ClickAudio() {
    this.audio.play();
  }
}
