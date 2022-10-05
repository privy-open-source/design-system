export function takePicture (video: HTMLVideoElement): string {
  const canvas  = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width  = video.videoWidth
  canvas.height = video.videoHeight

  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/jpeg')
}
