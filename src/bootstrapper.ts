type factoryFunc = (require: Function, exports: any) => void;

const modules: { [key: string]: any } = {};

function require() {
}

function define(id: string, dependencies: string[], factory: factoryFunc) {   
    const exports = {};
    const factoryArgs: [Function, any] = [ require, exports ];

    for (let i = 2; i < dependencies.length; i++) {
        factoryArgs.push(modules[dependencies[i]]);
    }

    factory.apply(null, factoryArgs);
    
    modules[id] = exports;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

type htmlAttributes = { [key: string ]: any };

function html(tagName: string, attributes: htmlAttributes | null, ...children: HTMLElement[]): HTMLElement {
    const element = document.createElement(tagName);
    
    if (attributes !== null) {
        for (const attributeKey of Object.keys(attributes)) {
            const attributeValue = attributes[attributeKey];

            if (attributeKey === 'style' && typeof attributeValue === 'object') {
                for (const styleKey of Object.keys(attributeValue)) {
                    const styleValue = attributeValue[styleKey];
                    (element.style as any)[styleKey] = styleValue;
                }
            } else {
                element.setAttribute(attributeKey, attributeValue);
            }
        }
    }
    
    for (const child of children) {
        element.append(child);
    }

    return element;
}