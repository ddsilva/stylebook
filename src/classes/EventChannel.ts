
class EventChannel {
  private channel: Window;

  constructor() {
    this.channel = window.parent;
  }

  on = (event: string, callback: Function) => {
    this.channel.addEventListener(event, (event: CustomEvent) => {
      const { detail: data }: { detail: object } = event;
      callback(data);
    }, false);
  }

  off = () => {

  }

  emmit = (event: string, data: object) => {
    const customEvent = new CustomEvent(event, { 'detail': data });
    this.channel.dispatchEvent(customEvent);
  }
}

export default EventChannel;
