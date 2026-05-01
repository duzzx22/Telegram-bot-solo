const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class DownloaderService {
  async downloadVideo(url) {
    const tempDir = '/tmp';
    const outputPath = path.join(tempDir, `video_${Date.now()}.mp4`);
    const command = `yt-dlp -o "${outputPath}" "${url}"`;

    return new Promise((resolve, reject) => {
      exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Erro ao baixar vídeo: ${error.message}`));
          return;
        }
        if (!fs.existsSync(outputPath)) {
          reject(new Error('Vídeo não foi baixado.'));
          return;
        }
        resolve(outputPath);
      });
    });
  }

  async downloadAudio(url) {
    const tempDir = '/tmp';
    const outputPath = path.join(tempDir, `audio_${Date.now()}.mp3`);
    const command = `yt-dlp --extract-audio --audio-format mp3 -o "${outputPath}" "${url}"`;

    return new Promise((resolve, reject) => {
      exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Erro ao baixar áudio: ${error.message}`));
          return;
        }
        if (!fs.existsSync(outputPath)) {
          reject(new Error('Áudio não foi baixado.'));
          return;
        }
        resolve(outputPath);
      });
    });
  }

  deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

module.exports = new DownloaderService();