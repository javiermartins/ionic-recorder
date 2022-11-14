import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {

  storedFileNames = [];

  constructor() { }

  ngOnInit() {
    this.loadFiles();
  }
  
  async loadFiles() {
    Filesystem.readdir({
      path: '',
      directory: Directory.Data
    }).then(result => {
      console.log(result);
      this.storedFileNames = result.files
    });
  }

  async playAudio(file: File) {
    const audioFile = await Filesystem.readFile({
      path: file.name,
      directory: Directory.Data
    });
    const base64Sound = audioFile.data;

    const audioRef = new Audio(`data:audio/aac;base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
/*     audioRef.pause();
    audioRef.currentTime = 0; */
  }

  async deleteAudio(file) {
    await Filesystem.deleteFile({
      path: file.name,
      directory: Directory.Data
    });
    this.loadFiles();
  }

  bytesToSize(bytes: number) {
    return (bytes / 1048576).toFixed(2) + ' MB';
  }
}
