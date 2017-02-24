/**
  * vue-custom-element v1.0.0
  * (c) 2017 Karol Fabjańczuk
  * @license MIT
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueCustomElement=e()}(this,function(){"use strict";function setPrototypeOf(t,e){return t.__proto__=e,t}function isES2015(){if("undefined"==typeof Symbol)return!1;try{eval("class Foo {}")}catch(t){return!1}return!0}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _CustomElement(){return Reflect.construct(HTMLElement,[],this.__proto__.constructor)}function registerCustomElement(t){function e(){c.shadow===!0&&HTMLElement.prototype.attachShadow&&this.attachShadow({mode:"open"}),"function"==typeof c.constructorCallback&&c.constructorCallback.call(this)}function o(){"function"==typeof c.connectedCallback&&c.connectedCallback.call(this)}function n(){"function"==typeof c.disconnectedCallback&&c.disconnectedCallback.call(this)}function r(t,e,o){"function"==typeof c.attributeChangedCallback&&c.attributeChangedCallback.call(this,t,e,o)}var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("undefined"!=typeof customElements){if(isES2015$1){var a=function(t){function o(t){var n;_classCallCheck(this,o);var r=_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this)),c=t?HTMLElement.call(t):r;return e.call(c),n=c,_possibleConstructorReturn(r,n)}return _inherits(o,t),_createClass(o,null,[{key:"observedAttributes",get:function(){return c.observedAttributes||[]}}]),o}(_CustomElement);return a.prototype.connectedCallback=o,a.prototype.disconnectedCallback=n,a.prototype.attributeChangedCallback=r,customElements.define(t,a),a}var i=function(t){var o=t?HTMLElement.call(t):this;return e.call(o),o};return i.observedAttributes=c.observedAttributes||[],i.prototype=Object.create(HTMLElement.prototype,{constructor:{configurable:!0,writable:!0,value:i}}),i.prototype.connectedCallback=o,i.prototype.disconnectedCallback=n,i.prototype.attributeChangedCallback=r,customElements.define(t,i),i}}function convertAttributeValue(t){var e=t,o=["true","false"].indexOf(t)>-1,n=parseFloat(e,10),r=!isNaN(n)&&isFinite(e);return o?e="true"===e:r&&(e=n),e}function getProps(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1],o={camelCase:[],hyphenate:[]};if(t.props&&t.props.length)t.props.forEach(function(t){o.camelCase.push(e.util.camelize(t))});else if(t.props&&"object"===_typeof(t.props))for(var n in t.props)o.camelCase.push(e.util.camelize(n));return o.camelCase.forEach(function(t){o.hyphenate.push(e.util.hyphenate(t))}),o}function reactiveProps(t,e){e.camelCase.forEach(function(o,n){Object.defineProperty(t,o,{get:function(){return this.__vue_custom_element__[o]},set:function(t){if("function"==typeof t&&this.__vue_custom_element__){var o=e.camelCase[n];this.__vue_custom_element__[o]=t.bind(this.__vue_custom_element__)}else this.setAttribute(e.hyphenate[n],convertAttributeValue(t))}})})}function getPropsData(t,e,o){var n=e.propsData||{};return o.hyphenate.forEach(function(e,r){var c=t.attributes[e]&&t.attributes[e].nodeValue;void 0!==c&&""!==c&&(n[o.camelCase[r]]=convertAttributeValue(c))}),n}function getAttributes(t,e){var o={};return e.util.toArray(t.attributes).forEach(function(t){o["vue-slot"===t.nodeName?"slot":t.nodeName]=t.nodeValue}),o}function getSlots(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments[1],o=arguments[2],n=[];return o.util.toArray(t).forEach(function(t){if("#text"===t.nodeName)t.nodeValue.trim()&&n.push(e("span",t.nodeValue));else{var r=getAttributes(t,o),c={attrs:r,domProps:{innerHTML:t.innerHTML}};r.slot&&(c.slot=r.slot,r.slot=void 0),n.push(e(t.tagName,c))}}),n}function createVueInstance(t,e,o,n,r){if(!t.__vue_custom_element__){var c=e.util.extend({},o),a=t.cloneNode(!0).childNodes,i=getPropsData(t,c,n),s=e.version&&parseInt(e.version.split(".")[0],10)||0,u=void 0;if(s>=2)u={propsData:i,props:n.camelCase,computed:{reactiveProps:function(){var t=this,e={};return n.camelCase.forEach(function(o){e[o]=t[o]}),e}},render:function(t){var o={props:this.reactiveProps};return t(c,o,getSlots(a,t,e))}};else if(1===s)u=c,u.propsData=i;else{u=c;var l={};Object.keys(i).forEach(function(t){l[t]={default:i[t]}}),u.props=l}var f=s>=2?"<div></div>":"<div>"+t.innerHTML+"</div>";r.shadow&&t.shadowRoot?(t.shadowRoot.innerHTML=f,u.el=t.shadowRoot.children[0]):(t.innerHTML=f,u.el=t.children[0]),reactiveProps(t,n),t.__vue_custom_element__=new e(u),t.removeAttribute("ve-cloak"),t.setAttribute("ve-ready","")}}function install(t){t.customElement=function(e,o){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r="function"==typeof o,c=r&&{props:n.props||[]},a=getProps(r?c:o,t),i=registerCustomElement(e,{constructorCallback:function(){"function"==typeof n.constructorCallback&&n.constructorCallback.call(this)},connectedCallback:function(){var c=this,i=r&&o(),s=i&&i.then&&"function"==typeof i.then;if(r&&!s)throw new Error("Async component "+e+" do not returns Promise");this.__detached__||(s?i.then(function(e){var o=getProps(e,t);createVueInstance(c,t,e,o,n)}):createVueInstance(this,t,o,a,n)),this.__detached__=!1},disconnectedCallback:function(){var t=this;this.__detached__=!0,"function"==typeof n.disconnectedCallback&&n.disconnectedCallback.call(this),setTimeout(function(){t.__detached__&&t.__vue_custom_element__&&t.__vue_custom_element__.$destroy(!0)},n.destroyTimeout||3e3)},attributeChangedCallback:function(e,o,r){if(this.__vue_custom_element__&&"undefined"!=typeof r){var c=t.util.camelize(e);"function"==typeof n.attributeChangedCallback&&n.attributeChangedCallback.call(this,e,o,r),this.__vue_custom_element__[c]=convertAttributeValue(r)}},observedAttributes:a.hyphenate,shadow:!!n.shadow&&!!HTMLElement.prototype.attachShadow});return i}}Object.setPrototypeOf=Object.setPrototypeOf||setPrototypeOf;var index=setPrototypeOf.bind(Object),isES2015$1=isES2015(),_createClass=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}();Object.setPrototypeOf(_CustomElement.prototype,HTMLElement.prototype),Object.setPrototypeOf(_CustomElement,HTMLElement);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};return"undefined"!=typeof window&&window.Vue&&window.Vue.use(install),install});