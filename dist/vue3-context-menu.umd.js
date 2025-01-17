(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(global = global || self, factory(global.VueSimpleContextMenu = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var vClickOutside_umd = createCommonjsModule(function (module, exports) {
	!function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="__v-click-outside",n="undefined"!=typeof window,t="undefined"!=typeof navigator,r=n&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(e){var n=e.event,t=e.handler;(0, e.middleware)(n)&&t(n);},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e){ throw new Error("v-click-outside: Binding value must be a function or an object"); }return {handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return {event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a});}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a});},0);}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l]);}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u);},0)});}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e];},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}));},unmounted:o}:{};return {install:function(e){e.directive("click-outside",d);},directive:d}});

	});

	var script = {
	  name: 'Vue3ContextMenu',
	  props: {
	    modelValue: Boolean,
	    elementId: {
	      type: String,
	      default: function () {
	        return ("simple-context-menu__" + (vue.getCurrentInstance().uid))
	      }
	    },
	    options: {
	      type: Array,
	      required: true,
	    },
	  },
	  emits: ['menu-closed', 'option-clicked'],
	  directives: {
	    'click-outside': vClickOutside_umd.directive,
	  },
	  setup: function setup(props, ref$1) {
	    var emit = ref$1.emit;

	    var item = vue.ref(null);
	    var menuHeight = vue.ref(null);
	    var menuWidth = vue.ref(null);

	    vue.onMounted(function () {
	      document.body.addEventListener('keyup', onEscKeyRelease);
	    });

	    vue.onUnmounted(function () {
	      document.removeEventListener('keyup', onEscKeyRelease);
	    });

	    var showMenu = function (event, item) {
	      item.value = item;

	      var menu = document.getElementById(props.elementId);
	      if (!menu) {
	        return;
	      }

	      if (!menuWidth.value || !menuHeight.value) {
	        menu.style.visibility = 'hidden';
	        menu.style.display = 'block';
	        menuWidth.value = menu.offsetWidth;
	        menuHeight.value = menu.offsetHeight;
	        menu.removeAttribute('style');
	      }

	      if (menuWidth.value + event.pageX >= window.innerWidth) {
	        menu.style.left = event.pageX - menuWidth.value + 2 + 'px';
	      } else {
	        menu.style.left = event.pageX - 2 + 'px';
	      }

	      if (menuHeight.value + event.pageY >= window.innerHeight) {
	        menu.style.top = event.pageY - menuHeight.value + 2 + 'px';
	      } else {
	        menu.style.top = event.pageY - 2 + 'px';
	      }

	      menu.classList.add('vue-simple-context-menu--active');
	    };

	    var hideContextMenu = function () {
	      var element = document.getElementById(props.elementId);
	      if (element) {
	        element.classList.remove('vue-simple-context-menu--active');
	        emit('menu-closed');
	      }
	    };

	    var onClickOutside = function () {
	      hideContextMenu();
	    };

	    var optionClicked = function (option) {
	      hideContextMenu();
	      emit('option-clicked', {
	        item: item.value,
	        option: option,
	      });
	    };

	    var onEscKeyRelease = function (event) {
	      if (event.keyCode === 27) {
	        hideContextMenu();
	      }
	    };

	    return {
	      item: item,
	      menuHeight: menuHeight,
	      menuWidth: menuWidth,
	      showMenu: showMenu,
	      hideContextMenu: hideContextMenu,
	      onClickOutside: onClickOutside,
	      optionClicked: optionClicked,
	      onEscKeyRelease: onEscKeyRelease,
	    }
	  },
	};

	var _hoisted_1 = ["id"];
	var _hoisted_2 = ["onClick"];
	var _hoisted_3 = ["innerHTML"];

	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  var _directive_click_outside = vue.resolveDirective("click-outside");

	  return (vue.openBlock(), vue.createElementBlock("div", null, [
	    vue.withDirectives((vue.openBlock(), vue.createElementBlock("ul", {
	      id: $props.elementId,
	      class: "vue-simple-context-menu"
	    }, [
	      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.options, function (option, index) {
	        return (vue.openBlock(), vue.createElementBlock("li", {
	          key: index,
	          onClick: vue.withModifiers(function ($event) { return ($setup.optionClicked(option)); }, ["stop"]),
	          class: vue.normalizeClass(["vue-simple-context-menu__item", [option.class, option.type === 'divider' ? 'vue-simple-context-menu__divider' : '']])
	        }, [
	          vue.createElementVNode("span", {
	            innerHTML: option.name
	          }, null, 8 /* PROPS */, _hoisted_3)
	        ], 10 /* CLASS, PROPS */, _hoisted_2))
	      }), 128 /* KEYED_FRAGMENT */))
	    ], 8 /* PROPS */, _hoisted_1)), [
	      [_directive_click_outside, $setup.onClickOutside]
	    ])
	  ]))
	}

	script.render = render;
	script.__file = "src/vue3-context-menu.vue";

	// Import vue component

	function install(app) {
	  if (install.installed) { return; }

	  install.installed = true;
	  app.component('Vue3ContextMenu', script);
	}

	var plugin = { install: install };

	// To auto-install when Vue is found
	var GlobalVue = null;
	if (typeof window !== 'undefined') {
	  GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
	  GlobalVue = global.Vue;
	}
	if (GlobalVue) {
	  GlobalVue.use(plugin);
	}

	// It's possible to expose named exports when writing components that can
	// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
	// export const RollupDemoDirective = component;

	exports.default = script;
	exports.install = install;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
