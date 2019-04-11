class DOMController {
  private observer!: MutationObserver;
  private observerOptions: object = {
    childList: true
  };
  private rootElement: Element | null;

  constructor() {
    this.rootElement = document.querySelector('#root');
    if (this.rootElement) {
      this.observer = new MutationObserver(this.handleRootNode);
      this.observer.observe(this.rootElement, this.observerOptions);
    }
  }

  handleRootNode = () => {
    console.log('teste');
    return null;
  }
}

export default DOMController;
