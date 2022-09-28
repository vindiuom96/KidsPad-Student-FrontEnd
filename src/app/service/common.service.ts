import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  audio = new Audio();
  isMute: boolean = false;

  PlayAudio(path: string) {
    if (!this.isMute) {
      this.audio.src = path;
      this.audio.load();
      this.audio.play();
    }
  }

  StopAudio() {
    this.audio.pause();
  }

  ToggleMute() {
    if (!this.isMute) {
      this.audio.pause();
    }
    this.isMute = !this.isMute;
  }
}
