function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",m=_.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[$("elementProperties")]=new Map,A[$("finalized")]=new Map,m?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E=globalThis,w=t=>t,x=E.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+P,k=`<${T}>`,O=document,M=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,j=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,I=/>/g,L=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,V=/"/g,z=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=B(1),W=B(2),F=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,J=O.createTreeWalker(O,129);function K(t,e){if(!j(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,h,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,h=r.exec(i),null!==h);)l=r.lastIndex,r===N?"!--"===h[1]?r=H:void 0!==h[1]?r=I:void 0!==h[2]?(z.test(h[2])&&(o=RegExp("</"+h[2],"g")),r=L):void 0!==h[3]&&(r=L):r===L?">"===h[0]?(r=o??N,c=-1):void 0===h[1]?c=-2:(c=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?L:'"'===h[3]?V:D):r===V||r===D?r=L:r===H||r===I?r=N:(r=L,o=void 0);const d=r===L&&t[e+1].startsWith("/>")?" ":"";n+=r===N?i+k:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+P+d):i+P+(-2===c?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[h,c]=X(t,e);if(this.el=Z.createElement(h,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[n++],i=s.getAttribute(t).split(P),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?ot:"@"===r[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),J.nextNode(),a.push({type:2,index:++o});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:o}),t+=P.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new rt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=J.nextNode(),n++)}return J.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>j(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Z(t)),e}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Q(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Q(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),n||=!U(a)||a!==this._$AH[r],a===G?t=G:t!==G&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class nt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??G)===F)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=E.litHtmlPolyfillSupport;at?.(Z,et),(E.litHtmlVersions??=[]).push("3.3.2");const ht=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ct._$litElement$=!0,ct.finalized=!0,ht.litElementHydrateSupport?.({LitElement:ct});const lt=ht.litElementPolyfillSupport;lt?.({LitElement:ct}),(ht.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ut=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _t(t){return pt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft={en:{card:{title:"Thermostat",entity_not_found:"Entity not found: {entity}",off:"Off"},editor:{name:"Name",mode_jour_entity:"Day Mode Entity",mode_thermostat_entity:"Thermostat Mode Entity",show_title:"Show title"}},fr:{card:{title:"Thermostat",entity_not_found:"Entité introuvable: {entity}",off:"Éteint"},editor:{name:"Nom",mode_jour_entity:"Entité mode jour",mode_thermostat_entity:"Entité mode thermostat",show_title:"Afficher le titre"}}};function gt(t,e,i){const s=function(t){const e=t?.locale?.language||t?.language||"en",i=String(e).split("-")[0];return ft[e]?e:ft[i]?i:"en"}(t);let o=(n=ft[s]||ft.en,e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,n));var n;return o||e}const mt=["Chauffage","Climatisation","Ventilation"],$t="M 30 150 A 85 85 0 1 1 170 150",yt=34.2,vt=-145.8;class bt extends ct{constructor(){super(...arguments),this.selectedIndex=-1}_getColorForMode(t){switch(t){case"Chauffage":return"#e74c3c";case"Climatisation":default:return"var(--primary-color, #3b82f6)";case"Ventilation":return"#d4a574"}}_valueToPercentage(t){return t/mt.length}_strokeDashArc(t,e){const i=this._valueToPercentage(t);return[`${this._valueToPercentage(e)-i} 10`,`-${i}`]}_getPercentageFromEvent(t){if(!this._svg)return-1;const e=this._svg.getBoundingClientRect(),i=2*(t.clientX-e.left-e.width/2)/e.width,s=2*(t.clientY-e.top-e.height/2)/e.height,o=180*Math.atan2(s,i)/Math.PI;return o>=vt&&o<=yt?(yt-o)/180:o>=214.2?(yt+(360-o))/180:-1}_onSvgClick(t){const e=this._getPercentageFromEvent(t);if(e<0)return;const i=Math.floor(e*mt.length),s=Math.max(0,Math.min(i,mt.length-1));this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:mt[s]},bubbles:!0,composed:!0}))}render(){let t=-1;return this.currentValue&&!["Eteint","off"].includes(this.currentValue)&&(t=mt.indexOf(this.currentValue)),this.selectedIndex=-1!==t?t:-1,q`
      <div class="slider-container">
        <svg viewBox="0 0 200 200" @click=${this._onSvgClick}>
          <defs>
            <path id="arcPath" d="${$t}" pathLength="1" />
          </defs>

          ${W`
            <path
              d="${$t}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="${25}"
              opacity="0.3"
              pathLength="1" 
            />
          `} ${-1!==this.selectedIndex?(()=>{const[t,e]=this._strokeDashArc(this.selectedIndex,this.selectedIndex+1),i=mt[this.selectedIndex],s=this._getColorForMode(i);return W`
                  <path
                    d="${$t}"
                    fill="none"
                    stroke="${s}"
                    stroke-width="${25}"
                    stroke-dasharray="${t}"
                    stroke-dashoffset="${e}"
                    stroke-linecap="butt"
                    pathLength="1"
                  />
                `})():null}
          ${mt.map((t,e)=>{const[i,s]=this._strokeDashArc(e,e+1);return W`
              <path
                d="${$t}"
                fill="none"
                stroke="transparent"
                stroke-width="${35}"
                stroke-dasharray="${i}"
                stroke-dashoffset="${s}"
                pathLength="1"
                style="cursor: pointer;"
                @click=${t=>{t.stopPropagation(),this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:mt[e]},bubbles:!0,composed:!0}))}}
              />
            `})}
          ${mt.map((t,e)=>{const i=this._valueToPercentage(e),s=this._valueToPercentage(e+1);return W`
              <text
                font-size="12"
                font-weight="600"
                fill="var(--primary-text-color)"
                text-anchor="middle"
                dominant-baseline="middle"
                style="cursor: pointer; user-select: none;"
                @click=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:t},bubbles:!0,composed:!0}))}}
              >
                <textPath href="#arcPath" startOffset="${100*((i+s)/2)}%" text-anchor="middle">
                  ${t}
                </textPath>
              </text>
            `})}
        </svg>
      </div>
    `}}bt.styles=r`
    :host {
      display: block;
    }

    .slider-container {
      display: flex;
      justify-content: center;
      padding: 8px 0;
    }

    svg {
      width: 100%;
      max-width: 240px;
      aspect-ratio: 1;
    }
  `,t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"entityId",void 0),t([pt()],bt.prototype,"currentValue",void 0),t([pt({type:Number})],bt.prototype,"selectedIndex",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("svg")],bt.prototype,"_svg",void 0),customElements.define("day-mode-circular-slider",bt);class At extends ct{setConfig(t){this._config=t}_onNameChanged(t){if(!this._config||!this.hass)return;const e=t.target.value;if(this._config.name===e)return;const i={...this._config,name:e};this._config=i,this._dispatchConfigChanged(i)}_onEntityChanged(t,e){if(!this._config||!this.hass)return;const i=t.detail.value;if(this._config[e]===i)return;const s={...this._config,[e]:i};this._config=s,this._dispatchConfigChanged(s)}_onShowTitleChanged(t){if(!this._config||!this.hass)return;const e=t.target.checked;if(this._config.show_title===e)return;const i={...this._config,show_title:e};this._config=i,this._dispatchConfigChanged(i)}_dispatchConfigChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}render(){return this.hass&&this._config?q`
      <div class="card-config">
        <ha-textfield
          label="${gt(this.hass,"editor.name")}"
          .value=${this._config.name||""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        <ha-entity-picker
          label="${gt(this.hass,"editor.mode_jour_entity")}"
          .hass=${this.hass}
          .value=${this._config.mode_jour_entity||""}
          @value-changed=${t=>this._onEntityChanged(t,"mode_jour_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${gt(this.hass,"editor.mode_thermostat_entity")}"
          .hass=${this.hass}
          .value=${this._config.mode_thermostat_entity||""}
          @value-changed=${t=>this._onEntityChanged(t,"mode_thermostat_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-formfield label="${gt(this.hass,"editor.show_title")}">
          <ha-switch
            .checked=${!1!==this._config.show_title}
            @change=${this._onShowTitleChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `:q``}}At.styles=r`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    ha-textfield,
    ha-entity-picker {
      width: 100%;
    }

    ha-formfield {
      display: flex;
      align-items: center;
      padding: 8px 0;
    }
  `,t([pt({attribute:!1})],At.prototype,"hass",void 0),t([_t()],At.prototype,"_config",void 0),customElements.get("day-mode-card-editor")||customElements.define("day-mode-card-editor",At);class Et extends ct{constructor(){super(...arguments),this._showScheduler=!1,this._schedulerTag=null}static getStubConfig(){return{name:"Thermostat",mode_jour_entity:"input_select.mode_jour",mode_thermostat_entity:"input_select.mode_thermostat",show_title:!0}}static getConfigElement(){return document.createElement("day-mode-card-editor")}setConfig(t){if(!t)throw new Error("Configuration manquante");this._config={name:t.name??"Thermostat",mode_jour_entity:t.mode_jour_entity??"input_select.mode_jour",mode_thermostat_entity:t.mode_thermostat_entity??"input_select.mode_thermostat",show_title:!1!==t.show_title}}getCardSize(){return 4}getEntityState(t){if(t)return this.hass?.states?.[t]}onSelect(t,e){const i=e.target,s=i?.value;s&&this.hass.callService("input_select","select_option",{entity_id:t,option:s})}onCircularSliderSelect(t,e){this.hass.callService("input_select","select_option",{entity_id:t,option:e})}onOffButtonClick(t){this.hass.callService("input_select","select_option",{entity_id:t,option:"Eteint"})}onVoletButtonClick(){if(this._showScheduler&&this._schedulerTag===Et.VOLET_TAG)return this._showScheduler=!1,void(this._schedulerTag=null);this._showScheduler=!0,this._schedulerTag=Et.VOLET_TAG}_renderScheduler(t,e,i,s,o){let n,r;o===Et.VOLET_TAG?(n=Et.VOLET_TAG,r=i):(n=t,r=[...i.filter(t=>t!==e),Et.VOLET_TAG]);const a={type:"custom:scheduler-card",title:!1,tags:n,exclude_tags:r,display_options:{primary_info:["<i><b><font color=orange>{name}</style></b></i>"],secondary_info:["<i><b>Prochain lancement</b></i>{relative-time}","<i><b>Planification</b></i> {days}","additional-tasks"],icon:"entity"},sort_by:["title"],discover_existing:!1,show_header_toggle:!1,time_step:5};return q`
      <div class="scheduler-view">
        <hui-card .hass=${this.hass} .config=${a}></hui-card>
      </div>
    `}_renderMain(t,e,i){return q`
      <div class="thermo-section">
        <day-mode-circular-slider
          .hass=${this.hass}
          .entityId=${t.entity_id}
          .currentValue=${t.state}
          @option-selected=${e=>this.onCircularSliderSelect(t.entity_id,e.detail.option)}
        ></day-mode-circular-slider>

        <div class="volet-center">
          <button
            class="volet-button"
            @click=${()=>this.onVoletButtonClick()}
            title="Scheduler volet"
          >
            <ha-icon icon="mdi:window-shutter"></ha-icon>
          </button>
        </div>

        <div class="thermo-bottom">
          <button
            class="off-button ${["Eteint","off"].includes(t.state)?"active":""}"
            @click=${()=>this.onOffButtonClick(t.entity_id)}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>

          <div class="jour-section">
            <select @change=${t=>this.onSelect(e.entity_id,t)}>
              ${i.map(t=>q`<option value="${t}" ?selected=${t===e.state}>
                    ${t}
                  </option> `)}
            </select>
          </div>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return G;const t=this.getEntityState(this._config.mode_jour_entity),e=this.getEntityState(this._config.mode_thermostat_entity),i=this._config.name??gt(this.hass,"card.title");return e&&t?q`
      <ha-card .header=${this._config.show_title?i:void 0}>
        <div class="card-header-container">
          <ha-icon-button
            class="menu-toggle"
            @click=${()=>{this._showScheduler=!this._showScheduler,this._showScheduler||(this._schedulerTag=null)}}
          >
            <ha-icon
              icon="${this._showScheduler?"mdi:arrow-left":"mdi:dots-vertical"}"
            ></ha-icon>
          </ha-icon-button>
        </div>

        <div class="container">
          ${this._showScheduler?this._renderScheduler(t.state,e.state,e.attributes?.options??[],t.attributes?.options??[],this._schedulerTag):this._renderMain(e,t,t.attributes?.options??[])}
        </div>
      </ha-card>
    `:q`<div class="error">Entités introuvables</div>`}}Et.VOLET_TAG="Volet",Et.styles=r`
    ha-card {
      padding: 8px;
      position: relative;
      min-height: 240px;
      text-align: center;
    }

    .card-header-container {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .menu-toggle {
      color: var(--secondary-text-color);
      /* Set a fixed size for the button */
      --mdc-icon-button-size: 40px;

      /* Force icon centering inside the button */
      display: inline-flex;
      align-items: center;
      justify-content: center;

      /* Tweak alignment inside the absolute header */
      padding: 0;
      margin: 0;
    }

    /* Optional: if the icon still looks off by a pixel */
    .menu-toggle ha-icon {
      display: flex;
    }

    .container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    /* SLIDER VIEW */
    .thermo-section {
      position: relative;
      width: 100%;
      max-width: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    day-mode-circular-slider {
      width: 100%;
    }

    .thermo-bottom {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 2;
    }

    .volet-center {
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }

    .off-button,
    .volet-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #ffffff);
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .off-button ha-icon,
    .volet-button ha-icon {
      color: var(--secondary-text-color, #666);
    }

    /* SCHEDULER VIEW */
    .scheduler-view {
      width: 100%;
      animation: fadeIn 0.3s ease-out;
      text-align: left;
    }

    .scheduler-header {
      text-align: left;
      margin-bottom: 12px;
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    hui-card {
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* UI ELEMENTS */
    select {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .off-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--disabled-text-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .off-button.active {
      background: var(--divider-color, #313131);
      color: var(--primary-text-color);
    }

    .error {
      color: var(--error-color);
      padding: 16px;
    }
  `,t([pt({attribute:!1})],Et.prototype,"hass",void 0),t([_t()],Et.prototype,"_config",void 0),t([_t()],Et.prototype,"_showScheduler",void 0),t([_t()],Et.prototype,"_schedulerTag",void 0),customElements.get("day-mode-card")||customElements.define("day-mode-card",Et),window.customCards=window.customCards||[],window.customCards.push({type:"day-mode-card",name:"Day Mode Card",description:"Regroupe deux input_select (jour & thermostat).",preview:!0});
//# sourceMappingURL=day-mode-card.js.map
