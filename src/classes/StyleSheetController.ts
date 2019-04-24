class StyleSheetController {
  private document: Document

  private styleSheets: StyleSheet[]

  public constructor(document: Document) {
    this.document = document
    this.styleSheets = Object.values(this.document.styleSheets)
  }

  public getStyleSheetBySelector = (selector: string) =>
    this.styleSheets.find((stylesheet: CSSStyleSheet) => {
      const rule: CSSStyleRule = stylesheet.rules[0] as CSSStyleRule
      return rule.selectorText === selector
    }) as CSSStyleSheet

  public injectStyleAtSelector = (
    selector: string,
    style: string
  ): StyleSheetController => {
    const styleToInject = this.getStyleSheetBySelector(selector)
    styleToInject.insertRule(`${selector} ${style}`, 1)
    return this
  }
}

export default StyleSheetController
