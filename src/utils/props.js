import { camelize, hyphenate } from './helpers';

/**
 * Number and Boolean props are treated as strings
 * We should convert it so props will behave as intended
 * @param value
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
  } else if (type === 'String') {
    propsValue = JSON.parse(propsValue);
  }

  return propsValue;
}

function extractProps(collection, props) {
  if (collection && collection.length) {
    collection.forEach((prop) => {
      const camelCaseProp = camelize(prop);
      props.camelCase.indexOf(camelCaseProp) === -1 && props.camelCase.push(camelCaseProp);
    });
  } else if (collection && typeof collection === 'object') {
    for (const prop in collection) { // eslint-disable-line no-restricted-syntax, guard-for-in
      const camelCaseProp = camelize(prop);
      props.camelCase.indexOf(camelCaseProp) === -1 && props.camelCase.push(camelCaseProp);
    }
  }
}

/**
 * Extract props from component definition, no matter if it's array or object
 * @param componentDefinition
 * @param Vue
 */
export function getProps(componentDefinition = {}) {
  const props = {
    camelCase: [],
    hyphenate: []
  };


  if (componentDefinition.mixins) {
    componentDefinition.mixins.forEach((mixin) => {
      extractProps(mixin.props, props);
    });
  }

  if (componentDefinition.extends && componentDefinition.extends.props) {
    const { props: parentProps } = componentDefinition.extends;

    extractProps(parentProps, props);
  }

  extractProps(componentDefinition.props, props);

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
