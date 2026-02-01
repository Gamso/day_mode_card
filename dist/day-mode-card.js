function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,$=f?f.emptyScript:"",m=_.reactiveElementPolyfillSupport,g=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??v)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[g("elementProperties")]=new Map,A[g("finalized")]=new Map,m?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E=globalThis,S=t=>t,w=E.trustedTypes,x=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+P,O=`<${k}>`,U=document,M=()=>U.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,H="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,I=/>/g,D=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,V=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),q=V(1),W=V(2),F=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),J=new WeakMap,K=U.createTreeWalker(U,129);function X(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=j;for(let e=0;e<s;e++){const s=t[e];let a,h,c=-1,l=0;for(;l<s.length&&(n.lastIndex=l,h=n.exec(s),null!==h);)l=n.lastIndex,n===j?"!--"===h[1]?n=N:void 0!==h[1]?n=I:void 0!==h[2]?(B.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=D):void 0!==h[3]&&(n=D):n===D?">"===h[0]?(n=o??j,c=-1):void 0===h[1]?c=-2:(c=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?D:'"'===h[3]?z:L):n===z||n===L?n=D:n===N||n===I?n=j:(n=D,o=void 0);const d=n===D&&t[e+1].startsWith("/>")?" ":"";r+=n===j?s+O:c>=0?(i.push(a),s.slice(0,c)+C+s.slice(c)+P+d):s+P+(-2===c?e:d)}return[X(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[h,c]=Z(t,e);if(this.el=G.createElement(h,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=c[r++],s=i.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?it:"?"===n[1]?ot:"@"===n[1]?rt:st}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),K.nextNode(),a.push({type:2,index:++o});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:o}),t+=P.length-1}o++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===F)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=T(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);K.currentNode=i;let o=K.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=K.nextNode(),r++)}return K.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(X(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new G(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new et(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class st{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Y}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Q(this,i[s+n],e,n),a===F&&(a=this._$AH[n]),r||=!T(a)||a!==this._$AH[n],a===Y?t=Y:t!==Y&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class ot extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class rt extends st{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Y)===F)return;const s=this._$AH,i=t===Y&&s!==Y||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==Y&&(s===Y||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=E.litHtmlPolyfillSupport;at?.(G,et),(E.litHtmlVersions??=[]).push("3.3.2");const ht=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new et(e.insertBefore(M(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ct._$litElement$=!0,ct.finalized=!0,ht.litElementHydrateSupport?.({LitElement:ct});const lt=ht.litElementPolyfillSupport;lt?.({LitElement:ct}),(ht.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},pt=(t=dt,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ut(t){return(e,s)=>"object"==typeof s?pt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _t(t){return ut({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft={en:{card:{title:"Thermostat",entity_not_found:"Entity not found: {entity}",off:"Off"}},fr:{card:{title:"Thermostat",entity_not_found:"Entité introuvable: {entity}",off:"Éteint"}}};function $t(t,e,s){const i=function(t){const e=t?.locale?.language||t?.language||"en",s=String(e).split("-")[0];return ft[e]?e:ft[s]?s:"en"}(t);let o=(r=ft[i]||ft.en,e.split(".").reduce((t,e)=>t&&null!=t[e]?t[e]:void 0,r));var r;return o||e}const mt=["Chauffage","Climatisation","Ventilation"],gt="M 30 150 A 85 85 0 1 1 170 150",yt=34.2,vt=-145.8;class bt extends ct{constructor(){super(...arguments),this.selectedIndex=-1}_valueToPercentage(t){return t/mt.length}_strokeDashArc(t,e){const s=this._valueToPercentage(t);return[`${this._valueToPercentage(e)-s} 10`,`-${s}`]}_getPercentageFromEvent(t){if(!this._svg)return-1;const e=this._svg.getBoundingClientRect(),s=2*(t.clientX-e.left-e.width/2)/e.width,i=2*(t.clientY-e.top-e.height/2)/e.height,o=180*Math.atan2(i,s)/Math.PI;return o>=vt&&o<=yt?(yt-o)/180:o>=214.2?(yt+(360-o))/180:-1}_onSvgClick(t){const e=this._getPercentageFromEvent(t);if(e<0)return;const s=Math.floor(e*mt.length),i=Math.max(0,Math.min(s,mt.length-1));this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:mt[i]},bubbles:!0,composed:!0}))}render(){let t=-1;return this.currentValue&&!["Eteint","off"].includes(this.currentValue)&&(t=mt.indexOf(this.currentValue)),this.selectedIndex=-1!==t?t:-1,q`
      <div class="slider-container">
        <svg viewBox="0 0 200 200" @click=${this._onSvgClick}>
          <defs>
            <path id="arcPath" d="${gt}" pathLength="1" />
          </defs>

          ${W`
            <path
              d="${gt}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="${25}"
              opacity="0.3"
              pathLength="1" 
            />
          `} ${-1!==this.selectedIndex?(()=>{const[t,e]=this._strokeDashArc(this.selectedIndex,this.selectedIndex+1);return W`
                  <path
                    d="${gt}"
                    fill="none"
                    stroke="var(--primary-color, #3b82f6)"
                    stroke-width="${25}"
                    stroke-dasharray="${t}"
                    stroke-dashoffset="${e}"
                    stroke-linecap="butt"
                    pathLength="1"
                  />
                `})():null}
          ${mt.map((t,e)=>{const[s,i]=this._strokeDashArc(e,e+1);return W`
              <path
                d="${gt}"
                fill="none"
                stroke="transparent"
                stroke-width="${35}"
                stroke-dasharray="${s}"
                stroke-dashoffset="${i}"
                pathLength="1"
                style="cursor: pointer;"
                @click=${t=>{t.stopPropagation(),this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:mt[e]},bubbles:!0,composed:!0}))}}
              />
            `})}
          ${mt.map((t,e)=>{const s=this._valueToPercentage(e),i=this._valueToPercentage(e+1);return W`
              <text
                font-size="12"
                font-weight="600"
                fill="var(--primary-text-color)"
                text-anchor="middle"
                dominant-baseline="middle"
                style="cursor: pointer; user-select: none;"
                @click=${e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("option-selected",{detail:{option:t},bubbles:!0,composed:!0}))}}
              >
                <textPath href="#arcPath" startOffset="${100*((s+i)/2)}%" text-anchor="middle">
                  ${t}
                </textPath>
              </text>
            `})}
        </svg>
      </div>
    `}}bt.styles=n`
    :host {
      display: block;
    }

    .slider-container {
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }

    svg {
      width: 100%;
      max-width: 280px;
      aspect-ratio: 1;
    }
  `,t([ut({attribute:!1})],bt.prototype,"hass",void 0),t([ut()],bt.prototype,"entityId",void 0),t([ut()],bt.prototype,"currentValue",void 0),t([ut({type:Number})],bt.prototype,"selectedIndex",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,s,i)=>((t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,s),s))(e,s,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("svg")],bt.prototype,"_svg",void 0),customElements.define("day-mode-circular-slider",bt);class At extends ct{constructor(){super(...arguments),this._showScheduler=!1}static getStubConfig(){return{name:"Thermostat",mode_jour_entity:"input_select.mode_jour",mode_thermostat_entity:"input_select.mode_thermostat"}}setConfig(t){if(!t)throw new Error("Configuration manquante");this._config={name:t.name??"Thermostat",mode_jour_entity:t.mode_jour_entity??"input_select.mode_jour",mode_thermostat_entity:t.mode_thermostat_entity??"input_select.mode_thermostat"}}getEntityState(t){if(t)return this.hass?.states?.[t]}onSelect(t,e){const s=e.target,i=s?.value;i&&this.hass.callService("input_select","select_option",{entity_id:t,option:i})}onCircularSliderSelect(t,e){this.hass.callService("input_select","select_option",{entity_id:t,option:e})}onOffButtonClick(t){this.hass.callService("input_select","select_option",{entity_id:t,option:"Eteint"})}_renderScheduler(t){const e={type:"custom:scheduler-card",title:!1,tags:t,display_options:{primary_info:["<i><b><font color=orange>{name}</style></b></i>"],secondary_info:["<i><b>Prochain lancement</b></i>{relative-time}","<i><b>Planification</b></i> {days}","additional-tasks"],icon:"entity"},sort_by:["title"],discover_existing:!1,show_header_toggle:!1,time_step:5};return q`
      <div class="scheduler-view">
        <div class="scheduler-header">
          <span>Planning : <b>${t}</b></span>
        </div>
        <hui-card .hass=${this.hass} .config=${e}></hui-card>
      </div>
    `}_renderMain(t,e,s){return q`
      <div class="thermo-section">
        <day-mode-circular-slider
          .hass=${this.hass}
          .entityId=${t.entity_id}
          .currentValue=${t.state}
          @option-selected=${e=>this.onCircularSliderSelect(t.entity_id,e.detail.option)}
        ></day-mode-circular-slider>

        <div class="thermo-bottom">
          <button
            class="off-button ${["Eteint","off"].includes(t.state)?"active":""}"
            @click=${()=>this.onOffButtonClick(t.entity_id)}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>

          <div class="jour-section">
            <select @change=${t=>this.onSelect(e.entity_id,t)}>
              ${s.map(t=>q`<option value="${t}" ?selected=${t===e.state}>
                    ${t}
                  </option> `)}
            </select>
          </div>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config)return Y;const t=this.getEntityState(this._config.mode_jour_entity),e=this.getEntityState(this._config.mode_thermostat_entity),s=this._config.name??$t(this.hass,"card.title");return e&&t?q`
      <ha-card header="${s}">
        <div class="card-header-container">
          <ha-icon-button
            class="menu-toggle"
            @click=${()=>{this._showScheduler=!this._showScheduler}}
          >
            <ha-icon
              icon="${this._showScheduler?"mdi:close":"mdi:dots-vertical"}"
            ></ha-icon>
          </ha-icon-button>
        </div>

        <div class="container">
          ${this._showScheduler?this._renderScheduler(t.state):this._renderMain(e,t,t.attributes?.options??[])}
        </div>
      </ha-card>
    `:q`<div class="error">Entités introuvables</div>`}}At.styles=n`
    ha-card {
      padding: 16px;
      position: relative;
      min-height: 320px;
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
      --mdc-icon-button-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    /* VUE SLIDER */
    .thermo-section {
      position: relative;
      width: 100%;
      max-width: 280px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    day-mode-circular-slider {
      width: 100%;
    }

    .thermo-bottom {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 2;
    }

    /* VUE SCHEDULER */
    .scheduler-view {
      width: 100%;
      animation: fadeIn 0.3s ease-out;
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

    /* ÉLÉMENTS UI */
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
      background: var(--primary-color, #3b82f6);
      color: white;
      border-color: var(--primary-color);
    }

    .error {
      color: var(--error-color);
      padding: 16px;
    }
  `,t([ut({attribute:!1})],At.prototype,"hass",void 0),t([_t()],At.prototype,"_config",void 0),t([_t()],At.prototype,"_showScheduler",void 0),customElements.get("day-mode-card")||customElements.define("day-mode-card",At),window.customCards=window.customCards||[],window.customCards.push({type:"day-mode-card",name:"Day Mode Card",description:"Regroupe deux input_select (jour & thermostat)."});
//# sourceMappingURL=day-mode-card.js.map
