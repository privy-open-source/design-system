type Task<R> = () => Promise<R>

interface QueueJob<R> {
  resolve: (value: R) => void,
  reject: (reason: unknown) => void,
  run: Task<R>,
}

export default class Queue {
  protected queue: Array<QueueJob<unknown>>
  protected running: boolean

  constructor () {
    this.queue   = []
    this.running = false
  }

  protected enqueue (job: QueueJob<unknown>) {
    this.queue.push(job)
  }

  protected dequeue () {
    return this.queue.shift()
  }

  public async add<R> (task: Task<R>): Promise<R> {
    return await new Promise<R>((resolve, reject) => {
      const queue: QueueJob<R> = {
        resolve: resolve,
        reject : reject,
        run    : task,
      }

      this.enqueue(queue)

      void this.run()
    })
  }

  protected async run () {
    if (this.queue.length > 0 && !this.running) {
      this.running = true

      const job = this.dequeue()

      job.run()
        .then(job.resolve)
        .catch(job.reject)
        .finally(() => {
          this.running = false

          void this.run()
        })
    }
  }
}
