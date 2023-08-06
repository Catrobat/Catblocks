import { CatBlocksMsgs } from '../../../library/ts/i18n/CatBlocksMsgs';

export class ParserUtils {
  public static getAttrByXPath(codeXml: Document, xpath: string, contextNode: Node): Attr | null {
    const node = ParserUtils.getNodeByXPath(codeXml, xpath, contextNode);
    if (node) {
      return <Attr>node;
    }
    return null;
  }

  public static getElementByXPath(codeXml: Document, xpath: string, contextNode: Node): Element | null {
    const node = ParserUtils.getNodeByXPath(codeXml, xpath, contextNode);
    if (node) {
      return ParserUtils.flattenElementReference(codeXml, <Element>node);
    }
    return null;
  }

  public static getNodeByXPath(codeXml: Document, xpath: string, contextNode: Node): Node | null {
    const iterator = codeXml.evaluate(xpath, contextNode);
    const node = iterator?.iterateNext();
    return node;
  }

  public static getFlatNodeByXPath(codeXml: Document, xpath: string, contextNode: Node): Node | null {
    const iterator = codeXml.evaluate(xpath, contextNode);
    const node = iterator?.iterateNext();
    if (node instanceof Element) {
      return ParserUtils.flattenElementReference(codeXml, node);
    }
    return node;
  }

  public static foreachElementByXPath(
    codeXml: Document,
    xpath: string,
    contextNode: Node,
    nodeCallback: (node: Element) => void
  ): void {
    const iterator = codeXml.evaluate(xpath, contextNode);
    let currentNode: Node | null | undefined = null;
    while ((currentNode = iterator?.iterateNext())) {
      nodeCallback(ParserUtils.flattenElementReference(codeXml, <Element>currentNode));
    }
  }

  public static flattenElementReference(codeXml: Document, node: Element): Element {
    if (node.nodeType == Node.ELEMENT_NODE) {
      const elementNode = <Element>node;
      if (elementNode.hasAttribute('reference')) {
        const referenceXPath = elementNode.getAttribute('reference');
        if (referenceXPath) {
          const referencedElement = codeXml?.evaluate(referenceXPath, node).iterateNext();
          if (referencedElement) {
            return <Element>referencedElement;
          }
        }
      }
    }
    return node;
  }

  public static getMessage(key: string, defaultMessage: string): string {
    const message = CatBlocksMsgs.getTranslationForKey(key.toUpperCase());
    if (message) {
      return message;
    }
    if (defaultMessage) {
      return defaultMessage;
    }
    return key;
  }

  public static trimTextContent(textContent: string | null | undefined): string {
    if (textContent) {
      return textContent.trim();
    }
    return '';
  }
}
