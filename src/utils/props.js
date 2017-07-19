import { camelize, hyphenate } from './helpers';

/**
 * Number and Boolean props are treated as strings
 * We should convert it so props will behave as intended
 * @param value
 * @param type
 * @returns {*}
 */
export function convertAttributeValue(value, type) {
  let propsValue = value;
  // const isBoolean = ['true', 'false'].indexOf(value) > -1;
  // const valueParsed = parseFloat(propsValue, 10);
  // const isNumber = !isNaN(valueParsed) && isFinite(propsValue);
  if (type === 'Boolean') {
    propsValue = propsValue === 'true';
  } else if (type === 'Number') {
    propsValue = parseFloat(propsValue, 10);
  } else if (type === 'Object') {
    propsValue = JSON.parse(propsValue);
  } else if (type === 'Array') {
    propsValue = JSON.parse(propsValue);
  }

  if (value === 'null') {
    return null;
  }

  return propsValue;
}

/**
 * Extract props from component definition, no matter if it's array or object
 * @param componentDefinition
 * @param Vue
 */
export function getProps(componentDefinition = {}) {
  const props = {
    camelCase: [],
    hyphenate: [],
    type: []
  };

  if (componentDefinition.props && componentDefinition.props.length) {
    componentDefinition.props.forEach((prop) => {
      props.camelCase.push(camelize(prop));
    });
  } else if (componentDefinition.props && typeof componentDefinition.props === 'object') {
    for (const prop in componentDefinition.props) { // eslint-disable-line no-restricted-syntax, guard-for-in
      props.camelCase.push(camelize(prop));
      if (componentDefinition.props[prop].type) {
        props.type.push(componentDefinition.props[prop].type.name);
      } else {
        props.type.push(componentDefinition.props[prop].name);
      }
    }
  }

  props.camelCase.forEach((prop) => {
    props.hyphenate.push(hyphenate(prop));
  });

  return props;
}

/**
 * If we get DOM node of element we could use it like this:
 * document.querySelector('widget-vue1').prop1 <-- get prop
 * document.querySelector('widget-vue1').prop1 = 'new Value' <-- set prop
 * @param element
 * @param props
 */
export function reactiveProps(element, props) {
  // Handle param attributes
  props.camelCase.forEach((name, index) => {
    Object.defineProperty(element, name, {
      get() {
        return this.__vue_custom_element__[name];
      },
      set(value) {
        this.setAttribute(props.hyphenate[index], convertAttributeValue(value, props.type[index]));
      }
    });
  });
}

/**
 * In root Vue instance we should initialize props as 'propsData'.
 * @param instanceOptions
 * @param componentDefinition
 * @param props
 */
export function getPropsData(element, componentDefinition, props) {
  const propsData = componentDefinition.propsData || {};

  props.hyphenate.forEach((name, index) => {
    const value = element.attributes[name] && element.attributes[name].nodeValue;

    if (value !== undefined && value !== '') {
      propsData[props.camelCase[index]] = convertAttributeValue(value, props.type[index]);
    }
  });

  return propsData;
}
