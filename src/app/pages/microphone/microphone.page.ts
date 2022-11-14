import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.page.html',
  styleUrls: ['./microphone.page.scss'],
})
export class MicrophonePage implements OnInit {

  public recording: boolean = false;
  public durationDisplay: string = '00:00';
  private duration: number = 0;
  
  constructor() {}

  ngOnInit() {
    VoiceRecorder.requestAudioRecordingPermission();
  }

  startRecording() {
    if(this.recording) {
      return;
    }
    this.recording = true;
    VoiceRecorder.startRecording();
    this.audioDuration();
  }

  stopRecording() {
    if(!this.recording) {
      return;
    }
    VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
      this.recording = false;
      this.writeFile(result);
    });
  }

  async writeFile(result: RecordingData) {
    if(result.value && result.value.recordDataBase64) {
      const recordData = result.value.recordDataBase64;
      const fileName = new Date().getTime() + '.wav';
      await Filesystem.writeFile({
        path: fileName,
        directory: Directory.Data,
        data: recordData
      });
    }
  }

  audioDuration() {
    if(!this.recording) {
      this.duration = 0;
      this.durationDisplay = '00:00';
      return;
    }
    this.duration +=1;
    const minutes = Math.floor(this.duration / 60);
    const seconds = (this.duration % 60).toString().padStart(2, '0');
    this.durationDisplay = `${minutes}:${seconds}`;
    console.log(this.durationDisplay);

    setTimeout(() => {
      this.audioDuration();
    }, 1000);
  }

}
