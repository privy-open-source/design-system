export async function takePicture (video: HTMLVideoElement, mirror = false): Promise<string> {
  const canvas  = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width  = video.videoWidth
  canvas.height = video.videoHeight

  if (mirror) {
    context.scale(-1, 1)
    context.drawImage(video, 0, 0, canvas.width * -1, canvas.height)
  } else
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/jpeg')
}
