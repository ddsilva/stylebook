class EventChannel {
  private channel: Window

  public constructor() {
    this.channel = window.parent
  }

  public on = (event: string, callback: Function) => {
    this.channel.addEventListener(
      event,
      (customEvent: CustomEvent) => {
        const { detail: data }: { detail: object } = customEvent
        callback(data)
      },
      false
    )
  }

  public off = () => null

  public emmit = (event: string, data: object) => {
    const customEvent = new CustomEvent(event, { detail: data })
    this.channel.dispatchEvent(customEvent)
  }
}

export default EventChannel
