export async function startRecording(){
    try {
        this.closeAndResetModal();

        // Check permissions
        if (
          (this.recordScreen && !navigator.mediaDevices.getDisplayMedia) ||
          (this.recordCamera && !navigator.mediaDevices.getUserMedia) ||
          (this.recordMic && !navigator.mediaDevices.getUserMedia)
        ) {
          console.error('Required media APIs not supported');
          return;
        }

        // Request permissions
        const constraints = {
          video:true,
          audio:true,
        };
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);

        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          this.$refs.videoPlayer.src = url;
        };

        this.mediaRecorder.start();
      } catch (error) {
        console.error('Error starting recording:', error);
      };
}