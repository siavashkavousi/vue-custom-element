/**
  * vue-custom-element v0.1.4
  * (c) 2017 Karol Fabjańczuk
  * @license MIT
  */
/**
 * ES6 Object.getPrototypeOf Polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
 */

Object.setPrototypeOf = Object.setPrototypeOf || setPrototypeOf;

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

var index = setPrototypeOf.bind(Object);

function isES2015() {
  if (typeof Symbol === 'undefined' || typeof Reflect === 'undefined') return false;

  return true;
}

var isES2015$1 = isES2015();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}


Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);
function registerCustomElement(tag) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof customElements === 'undefined') {
    return;
  }

  function constructorCallback() {
    if (options.shadow === true && HTMLElement.prototype.attachShadow) {
      this.attachShadow({ mode: 'open' });
    }
    typeof options.constructorCallback === 'function' && options.constructorCallback.call(this);
  }
  function connectedCallback() {
    typeof options.connectedCallback === 'function' && options.connectedCallback.call(this);
  }

  function disconnectedCallback() {
    typeof options.disconnectedCallback === 'function' && options.disconnectedCallback.call(this);
  }

  function attributeChangedCallback(name, oldValue, value) {
    typeof options.attributeChangedCallback === 'function' && options.attributeChangedCallback.call(this, name, oldValue, value);
  }

  if (isES2015$1) {
    var CustomElement = function (_CustomElement2) {
      _inherits(CustomElement, _CustomElement2);

      function CustomElement(self) {
        var _ret;

        _classCallCheck(this, CustomElement);

        var _this = _possibleConstructorReturn(this, (CustomElement.__proto__ || Object.getPrototypeOf(CustomElement)).call(this));

        var me = self ? HTMLElement.call(self) : _this;

        constructorCallback.call(me);
        return _ret = me, _possibleConstructorReturn(_this, _ret);
      }

      _createClass(CustomElement, null, [{
        key: 'observedAttributes',
        get: function get() {
          return options.observedAttributes || [];
        }
      }]);

      return CustomElement;
    }(_CustomElement);

    CustomElement.prototype.connectedCallback = connectedCallback;
    CustomElement.prototype.disconnectedCallback = disconnectedCallback;
    CustomElement.prototype.attributeChangedCallback = attributeChangedCallback;

    customElements.define(tag, CustomElement);
    return CustomElement;
  } else {
    var _CustomElement3 = function _CustomElement3(self) {
      var me = self ? HTMLElement.call(self) : this;

      constructorCallback.call(me);
      return me;
    };

    _CustomElement3.observedAttributes = options.observedAttributes || [];

    _CustomElement3.prototype = Object.create(HTMLElement.prototype, {
      constructor: {
        configurable: true,
        writable: true,
        value: _CustomElement3
      }
    });

    _CustomElement3.prototype.connectedCallback = connectedCallback;
    _CustomElement3.prototype.disconnectedCallback = disconnectedCallback;
    _CustomElement3.prototype.attributeChangedCallback = attributeChangedCallback;

    customElements.define(tag, _CustomElement3);
    return _CustomElement3;
  }
}

var camelizeRE = /-(\w)/g;
var camelize = function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
};

function toArray(list) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function convertAttributeValue(value, type) {
  var propsValue = value;

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

function getProps() {
  var componentDefinition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var props = {
    camelCase: [],
    hyphenate: [],
    type: []
  };

  if (componentDefinition.props && componentDefinition.props.length) {
    componentDefinition.props.forEach(function (prop) {
      props.camelCase.push(camelize(prop));
    });
  } else if (componentDefinition.props && _typeof(componentDefinition.props) === 'object') {
    for (var prop in componentDefinition.props) {
      props.camelCase.push(camelize(prop));
      if (componentDefinition.props[prop].type) {
        props.type.push(componentDefinition.props[prop].type.name);
      } else {
        props.type.push(componentDefinition.props[prop].name);
      }
    }
  }

  props.camelCase.forEach(function (prop) {
    props.hyphenate.push(hyphenate(prop));
  });

  return props;
}

function reactiveProps(element, props) {
  props.camelCase.forEach(function (name, index) {
    Object.defineProperty(element, name, {
      get: function get() {
        return this.__vue_custom_element__[name];
      },
      set: function set(value) {
        this.setAttribute(props.hyphenate[index], convertAttributeValue(value, props.type[index]));
      }
    });
  });
}

function getPropsData(element, componentDefinition, props) {
  var propsData = componentDefinition.propsData || {};

  props.hyphenate.forEach(function (name, index) {
    var value = element.attributes[name] && element.attributes[name].nodeValue;

    if (value !== undefined && value !== '') {
      propsData[props.camelCase[index]] = convertAttributeValue(value, props.type[index]);
    }
  });

  return propsData;
}

function getAttributes(children) {
  var attributes = {};

  toArray(children.attributes).forEach(function (attribute) {
    attributes[attribute.nodeName === 'vue-slot' ? 'slot' : attribute.nodeName] = attribute.nodeValue;
  });

  return attributes;
}

function getSlots() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var createElement = arguments[1];

  var slots = [];
  toArray(children).forEach(function (child) {
    if (child.nodeName === '#text') {
      if (child.nodeValue.trim()) {
        slots.push(createElement('span', child.nodeValue));
      }
    } else {
      var attributes = getAttributes(child);
      var elementOptions = {
        attrs: attributes,
        domProps: {
          innerHTML: child.innerHTML
        }
      };

      if (attributes.slot) {
        elementOptions.slot = attributes.slot;
        attributes.slot = undefined;
      }

      slots.push(createElement(child.tagName, elementOptions));
    }
  });

  return slots;
}

function customEvent(eventName, detail) {
  var params = Object.assign({ bubbles: false, cancelable: false, detail: detail });
  var event = void 0;
  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(eventName, params);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
  }
  return event;
}

function customEmit(element, eventName) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var event = customEvent(eventName, [].concat(args));
  element.dispatchEvent(event);
}

function createVueInstance(element, Vue, componentDefinition, props, options) {
  if (!element.__vue_custom_element__) {
    var ComponentDefinition = Vue.util.extend({}, componentDefinition);
    var propsData = getPropsData(element, ComponentDefinition, props);
    var vueVersion = Vue.version && parseInt(Vue.version.split('.')[0], 10) || 0;

    var ctorOptions = {};
    if (ComponentDefinition._Ctor) {
      ctorOptions = ComponentDefinition._Ctor[0].options;
    }
    ComponentDefinition.methods = ctorOptions.methods = ComponentDefinition.methods || {};
    ComponentDefinition.methods.$emit = ctorOptions.methods.$emit = function emit() {
      var _proto__$$emit;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      customEmit.apply(undefined, [element].concat(args));
      (_proto__$$emit = this.__proto__.$emit).call.apply(_proto__$$emit, [this].concat(args));
    };

    var rootElement = void 0;

    if (vueVersion >= 2) {
      var elementOriginalChildren = element.cloneNode(true).childNodes;
      rootElement = {
        propsData: propsData,
        props: props.camelCase,
        computed: {
          reactiveProps: function reactiveProps$$1() {
            var _this = this;

            var reactivePropsList = {};
            props.camelCase.forEach(function (prop) {
              reactivePropsList[prop] = _this[prop];
            });

            return reactivePropsList;
          }
        },
        render: function render(createElement) {
          var data = {
            props: this.reactiveProps
          };

          return createElement(ComponentDefinition, data, getSlots(elementOriginalChildren, createElement));
        }
      };
    } else if (vueVersion === 1) {
      rootElement = ComponentDefinition;
      rootElement.propsData = propsData;
    } else {
      rootElement = ComponentDefinition;
      var propsWithDefault = {};
      Object.keys(propsData).forEach(function (prop) {
        propsWithDefault[prop] = { default: propsData[prop] };
      });
      rootElement.props = propsWithDefault;
    }

    var elementInnerHtml = vueVersion >= 2 ? '<div></div>' : ('<div>' + element.innerHTML + '</div>').replace(/vue-slot=/g, 'slot=');
    if (options.shadow && element.shadowRoot) {
      element.shadowRoot.innerHTML = elementInnerHtml;
      rootElement.el = element.shadowRoot.children[0];
    } else {
      element.innerHTML = elementInnerHtml;
      rootElement.el = element.children[0];
    }

    reactiveProps(element, props);

    element.__vue_custom_element__ = new Vue(rootElement);
    if (options.shadow && options.shadowCss && element.shadowRoot) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(options.shadowCss));

      element.shadowRoot.appendChild(style);
    }
    element.removeAttribute('vce-cloak');
    element.setAttribute('vce-ready', '');
    customEmit(element, 'vce-ready');
  }
}

function install(Vue) {
  Vue.customElement = function vueCustomElement(tag, componentDefinition) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var isAsyncComponent = typeof componentDefinition === 'function';
    var optionsProps = isAsyncComponent && { props: options.props || [] };
    var props = getProps(isAsyncComponent ? optionsProps : componentDefinition);

    var CustomElement = customElements.get(tag);
    if (customElements.get(tag) === undefined) {
      CustomElement = registerCustomElement(tag, {
        constructorCallback: function constructorCallback() {
          typeof options.constructorCallback === 'function' && options.constructorCallback.call(this);
        },
        connectedCallback: function connectedCallback() {
          var _this = this;

          var asyncComponentPromise = isAsyncComponent && componentDefinition();
          var isAsyncComponentPromise = asyncComponentPromise && asyncComponentPromise.then && typeof asyncComponentPromise.then === 'function';

          if (isAsyncComponent && !isAsyncComponentPromise) {
            throw new Error('Async component ' + tag + ' do not returns Promise');
          }
          if (!this.__detached__) {
            if (isAsyncComponentPromise) {
              asyncComponentPromise.then(function (lazyLoadedComponent) {
                var lazyLoadedComponentProps = getProps(lazyLoadedComponent);
                createVueInstance(_this, Vue, lazyLoadedComponent, lazyLoadedComponentProps, options);
              });
            } else {
              createVueInstance(this, Vue, componentDefinition, props, options);
            }
          }

          this.__detached__ = false;
        },
        disconnectedCallback: function disconnectedCallback() {
          var _this2 = this;

          this.__detached__ = true;
          typeof options.disconnectedCallback === 'function' && options.disconnectedCallback.call(this);

          setTimeout(function () {
            if (_this2.__detached__ && _this2.__vue_custom_element__) {
              _this2.__vue_custom_element__.$destroy(true);
            }
          }, options.destroyTimeout || 3000);
        },
        attributeChangedCallback: function attributeChangedCallback(name, oldValue, value) {
          if (this.__vue_custom_element__ && typeof value !== 'undefined') {
            var nameCamelCase = camelize(name);
            typeof options.attributeChangedCallback === 'function' && options.attributeChangedCallback.call(this, name, oldValue, value);
            this.__vue_custom_element__[nameCamelCase] = convertAttributeValue(value);
          }
        },


        observedAttributes: props.hyphenate,

        shadow: !!options.shadow && !!HTMLElement.prototype.attachShadow
      });
    }

    return CustomElement;
  };
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
  if (install.installed) {
    install.installed = false;
  }
}

export default install;
