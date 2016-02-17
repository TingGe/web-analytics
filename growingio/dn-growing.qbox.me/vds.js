/**
 * 代码翻译：听歌
 * 电子邮件：505253293@163.com
 * 个人主页：https://github.com/TingGe
 * 代码地址：http://dn-growing.qbox.me/vds.js
 * 文档地址：暂无
 *
 * @fileoverview GrowingIO JavaScript SDK 代码
 */

 !function t(val, n, r) {

   /**
    * @param {string} o
    * @param {?} dx
    * @return {?}
    */
   function s(o, dx) {
     if (!n[o]) {
       if (!val[o]) {
         var i = "function" == typeof require && require;
         if (!dx && i) {
           return i(o, true);
         }
         if (a) {
           return a(o, true);
         }
         throw new Error("Cannot find module '" + o + "'");
       }
       var module_ = n[o] = {
         exports : {}
       };
       val[o][0].call(module_.exports, function(e) {
         var n = val[o][1][e];
         return s(n ? n : e);
       }, module_, module_.exports, t, val, n, r);
     }
     return n[o].exports;
   }
   var a = "function" == typeof require && require;
   /** @type {number} */
   var o = 0;
   for (;o < r.length;o++) {
     s(r[o]);
   }
   return s;
 }({
   1 : [function(dataAndEvents, module, deepDataAndEvents) {
     /**
      * @param {?} vvar
      * @return {undefined}
      */
     function scheduleCallback(vvar) {
       assigns.push(vvar);
       if (!E) {
         /** @type {boolean} */
         E = true;
         setImmediate(dispatchCallbacks);
       }
     }
     /**
      * @param {string} node
      * @return {?}
      */
     function wrapIfNeeded(node) {
       return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
     }
     /**
      * @return {undefined}
      */
     function dispatchCallbacks() {
       /** @type {boolean} */
       E = false;
       var names = assigns;
       /** @type {Array} */
       assigns = [];
       names.sort(function(o1, o2) {
         return o1.uid_ - o2.uid_;
       });
       /** @type {boolean} */
       var e = false;
       names.forEach(function(observer) {
         var queue = observer.takeRecords();
         removeTransientObserversFor(observer);
         if (queue.length) {
           observer.callback_(queue, observer);
           /** @type {boolean} */
           e = true;
         }
       });
       if (e) {
         dispatchCallbacks();
       }
     }
     /**
      * @param {?} observer
      * @return {undefined}
      */
     function removeTransientObserversFor(observer) {
       observer.nodes_.forEach(function(cur) {
         var files = jQuery.get(cur);
         if (files) {
           files.forEach(function(registration) {
             if (registration.observer === observer) {
               registration.removeTransientObservers();
             }
           });
         }
       });
     }
     /**
      * @param {?} el
      * @param {Function} callback
      * @return {undefined}
      */
     function forEachAncestorAndObserverEnqueueRecord(el, callback) {
       var cur = el;
       for (;cur;cur = cur.parentNode) {
         var codeSegments = jQuery.get(cur);
         if (codeSegments) {
           /** @type {number} */
           var i = 0;
           for (;i < codeSegments.length;i++) {
             var registration = codeSegments[i];
             var options = registration.options;
             if (cur === el || options.subtree) {
               var record = callback(options);
               if (record) {
                 registration.enqueue(record);
               }
             }
           }
         }
       }
     }
     /**
      * @param {Function} callback
      * @return {undefined}
      */
     function MutationObserver(callback) {
       /** @type {Function} */
       this.callback_ = callback;
       /** @type {Array} */
       this.nodes_ = [];
       /** @type {Array} */
       this.records_ = [];
       /** @type {number} */
       this.uid_ = ++uidCounter;
     }
     /**
      * @param {string} type
      * @param {Object} target
      * @return {undefined}
      */
     function MutationRecord(type, target) {
       /** @type {string} */
       this.type = type;
       /** @type {Object} */
       this.target = target;
       /** @type {Array} */
       this.addedNodes = [];
       /** @type {Array} */
       this.removedNodes = [];
       /** @type {null} */
       this.previousSibling = null;
       /** @type {null} */
       this.nextSibling = null;
       /** @type {null} */
       this.attributeName = null;
       /** @type {null} */
       this.attributeNamespace = null;
       /** @type {null} */
       this.oldValue = null;
     }
     /**
      * @param {Object} original
      * @return {?}
      */
     function copyMutationRecord(original) {
       var record = new MutationRecord(original.type, original.target);
       return record.addedNodes = original.addedNodes.slice(), record.removedNodes = original.removedNodes.slice(), record.previousSibling = original.previousSibling, record.nextSibling = original.nextSibling, record.attributeName = original.attributeName, record.attributeNamespace = original.attributeNamespace, record.oldValue = original.oldValue, record;
     }
     /**
      * @param {string} type
      * @param {Function} target
      * @return {?}
      */
     function getRecord(type, target) {
       return currentRecord = new MutationRecord(type, target);
     }
     /**
      * @param {string} oldValue
      * @return {?}
      */
     function getRecordWithOldValue(oldValue) {
       return recordWithOldValue ? recordWithOldValue : (recordWithOldValue = copyMutationRecord(currentRecord), recordWithOldValue.oldValue = oldValue, recordWithOldValue);
     }
     /**
      * @return {undefined}
      */
     function onMouseOver() {
       currentRecord = recordWithOldValue = void 0;
     }
     /**
      * @param {?} record
      * @return {?}
      */
     function recordRepresentsCurrentMutation(record) {
       return record === recordWithOldValue || record === currentRecord;
     }
     /**
      * @param {?} lastRecord
      * @param {?} newRecord
      * @return {?}
      */
     function selectRecord(lastRecord, newRecord) {
       return lastRecord === newRecord ? lastRecord : recordWithOldValue && recordRepresentsCurrentMutation(lastRecord) ? recordWithOldValue : null;
     }
     /**
      * @param {MutationObserver} observer
      * @param {string} target
      * @param {MutationObserverInit} options
      * @return {undefined}
      */
     function Registration(observer, target, options) {
       /** @type {MutationObserver} */
       this.observer = observer;
       /** @type {string} */
       this.target = target;
       /** @type {MutationObserverInit} */
       this.options = options;
       /** @type {Array} */
       this.transientObservedNodes = [];
     }
     var JsDiff = window.MutationObserver || (window.WebKitMutationObserver || window.MozMutationObserver);
     var Class = window.WeakMap;
     if ("undefined" == typeof Class) {
       /** @type {function (Object, string, Object): Object} */
       var defineProperty = Object.defineProperty;
       /** @type {number} */
       var counter = Date.now() % 1E9;
       /**
        * @return {undefined}
        */
       Class = function() {
         /** @type {string} */
         this.name = "__st" + (1E9 * Math.random() >>> 0) + (counter++ + "__");
       };
       Class.prototype = {
         /**
          * @param {string} owner
          * @param {Object} dataAndEvents
          * @return {?}
          */
         set : function(owner, dataAndEvents) {
           var unlock = owner[this.name];
           return unlock && unlock[0] === owner ? unlock[1] = dataAndEvents : defineProperty(owner, this.name, {
             value : [owner, dataAndEvents],
             writable : true
           }), this;
         },
         /**
          * @param {Node} owner
          * @return {?}
          */
         get : function(owner) {
           var offset;
           return(offset = owner[this.name]) && offset[0] === owner ? offset[1] : void 0;
         },
         /**
          * @param {?} name
          * @return {?}
          */
         "delete" : function(name) {
           var prop = name[this.name];
           if (!prop) {
             return false;
           }
           /** @type {boolean} */
           var r = prop[0] === name;
           return prop[0] = prop[1] = void 0, r;
         },
         /**
          * @param {string} dataAndEvents
          * @return {?}
          */
         has : function(dataAndEvents) {
           var newValue = dataAndEvents[this.name];
           return newValue ? newValue[0] === dataAndEvents : false;
         }
       };
     }
     var jQuery = new Class;
     var setImmediate = window.msSetImmediate;
     if (!setImmediate) {
       /** @type {Array} */
       var spec = [];
       /** @type {string} */
       var sentinel = String(Math.random());
       window.addEventListener("message", function(e) {
         if (e.data === sentinel) {
           var json = spec;
           /** @type {Array} */
           spec = [];
           json.forEach(function($sanitize) {
             $sanitize();
           });
         }
       });
       /**
        * @param {Function} func
        * @return {undefined}
        */
       setImmediate = function(func) {
         spec.push(func);
         window.postMessage(sentinel, "*");
       };
     }
     /** @type {boolean} */
     var E = false;
     /** @type {Array} */
     var assigns = [];
     /** @type {number} */
     var uidCounter = 0;
     MutationObserver.prototype = {
       /**
        * @param {string} target
        * @param {Object} options
        * @return {undefined}
        */
       observe : function(target, options) {
         if (target = wrapIfNeeded(target), !options.childList && (!options.attributes && !options.characterData) || (options.attributeOldValue && !options.attributes || (options.attributeFilter && (options.attributeFilter.length && !options.attributes) || options.characterDataOldValue && !options.characterData))) {
           throw new SyntaxError;
         }
         var registrations = jQuery.get(target);
         if (!registrations) {
           jQuery.set(target, registrations = []);
         }
         var registration;
         /** @type {number} */
         var i = 0;
         for (;i < registrations.length;i++) {
           if (registrations[i].observer === this) {
             registration = registrations[i];
             registration.removeListeners();
             /** @type {Object} */
             registration.options = options;
             break;
           }
         }
         if (!registration) {
           registration = new Registration(this, target, options);
           registrations.push(registration);
           this.nodes_.push(target);
         }
         registration.addListeners();
       },
       /**
        * @return {undefined}
        */
       disconnect : function() {
         this.nodes_.forEach(function(cur) {
           var drop = jQuery.get(cur);
           /** @type {number} */
           var i = 0;
           for (;i < drop.length;i++) {
             var registration = drop[i];
             if (registration.observer === this) {
               registration.removeListeners();
               drop.splice(i, 1);
               break;
             }
           }
         }, this);
         /** @type {Array} */
         this.records_ = [];
       },
       /**
        * @return {?}
        */
       takeRecords : function() {
         var records = this.records_;
         return this.records_ = [], records;
       }
     };
     var currentRecord;
     var recordWithOldValue;
     Registration.prototype = {
       /**
        * @param {?} record
        * @return {?}
        */
       enqueue : function(record) {
         var records = this.observer.records_;
         var length = records.length;
         if (records.length > 0) {
           var lastRecord = records[length - 1];
           var recordToReplaceLast = selectRecord(lastRecord, record);
           if (recordToReplaceLast) {
             return void(records[length - 1] = recordToReplaceLast);
           }
         } else {
           scheduleCallback(this.observer);
         }
         records[length] = record;
       },
       /**
        * @return {undefined}
        */
       addListeners : function() {
         this.addListeners_(this.target);
       },
       /**
        * @param {HTMLElement} node
        * @return {undefined}
        */
       addListeners_ : function(node) {
         if ("undefined" != typeof node.addEventListener && null !== node.addEventListener) {
           var options = this.options;
           if (options.attributes) {
             node.addEventListener("DOMAttrModified", this, true);
           }
           if (options.characterData) {
             node.addEventListener("DOMCharacterDataModified", this, true);
           }
           if (options.childList) {
             node.addEventListener("DOMNodeInserted", this, true);
           }
           if (options.childList || options.subtree) {
             node.addEventListener("DOMNodeRemoved", this, true);
           }
         }
       },
       /**
        * @return {undefined}
        */
       removeListeners : function() {
         this.removeListeners_(this.target);
       },
       /**
        * @param {?} node
        * @return {undefined}
        */
       removeListeners_ : function(node) {
         if ("undefined" != typeof node.removeEventListener && null !== node.removeEventListener) {
           var options = this.options;
           if (options.attributes) {
             node.removeEventListener("DOMAttrModified", this, true);
           }
           if (options.characterData) {
             node.removeEventListener("DOMCharacterDataModified", this, true);
           }
           if (options.childList) {
             node.removeEventListener("DOMNodeInserted", this, true);
           }
           if (options.childList || options.subtree) {
             node.removeEventListener("DOMNodeRemoved", this, true);
           }
         }
       },
       /**
        * @param {string} node
        * @return {undefined}
        */
       addTransientObserver : function(node) {
         if (node !== this.target) {
           this.addListeners_(node);
           this.transientObservedNodes.push(node);
           var registrations = jQuery.get(node);
           if (!registrations) {
             jQuery.set(node, registrations = []);
           }
           registrations.push(this);
         }
       },
       /**
        * @return {undefined}
        */
       removeTransientObservers : function() {
         var transientObservedNodes = this.transientObservedNodes;
         /** @type {Array} */
         this.transientObservedNodes = [];
         transientObservedNodes.forEach(function(node) {
           this.removeListeners_(node);
           var tokens = jQuery.get(node);
           /** @type {number} */
           var i = 0;
           for (;i < tokens.length;i++) {
             if (tokens[i] === this) {
               tokens.splice(i, 1);
               break;
             }
           }
         }, this);
       },
       /**
        * @param {Object} e
        * @return {undefined}
        */
       handleEvent : function(e) {
         switch(e.stopImmediatePropagation(), e.type) {
           case "DOMAttrModified":
             var name = e.attrName;
             var namespace = e.relatedNode.namespaceURI;
             var target = e.target;
             var record = new getRecord("attributes", target);
             record.attributeName = name;
             record.attributeNamespace = namespace;
             var oldValue = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
             forEachAncestorAndObserverEnqueueRecord(target, function(options) {
               return!options.attributes || options.attributeFilter && (options.attributeFilter.length && (-1 === options.attributeFilter.indexOf(name) && -1 === options.attributeFilter.indexOf(namespace))) ? void 0 : options.attributeOldValue ? getRecordWithOldValue(oldValue) : record;
             });
             break;
           case "DOMCharacterDataModified":
             target = e.target;
             record = getRecord("characterData", target);
             oldValue = e.prevValue;
             forEachAncestorAndObserverEnqueueRecord(target, function(change) {
               return change.characterData ? change.characterDataOldValue ? getRecordWithOldValue(oldValue) : record : void 0;
             });
             break;
           case "DOMNodeRemoved":
             this.addTransientObserver(e.target);
           case "DOMNodeInserted":
             var addedNodes;
             var removedNodes;
             target = e.relatedNode;
             var changedNode = e.target;
             if ("DOMNodeInserted" === e.type) {
               /** @type {Array} */
               addedNodes = [changedNode];
               /** @type {Array} */
               removedNodes = [];
             } else {
               /** @type {Array} */
               addedNodes = [];
               /** @type {Array} */
               removedNodes = [changedNode];
             }
             var previousSibling = changedNode.previousSibling;
             var nextSibling = changedNode.nextSibling;
             record = getRecord("childList", target);
             record.addedNodes = addedNodes;
             record.removedNodes = removedNodes;
             record.previousSibling = previousSibling;
             record.nextSibling = nextSibling;
             forEachAncestorAndObserverEnqueueRecord(target, function(child) {
               return child.childList ? record : void 0;
             });
         }
         onMouseOver();
       }
     };
     if (!JsDiff) {
       /** @type {function (Function): undefined} */
       JsDiff = MutationObserver;
     }
     module.exports = JsDiff;
   }, {}],
   2 : [function(dataAndEvents, module, deepDataAndEvents) {
     /**
      * @param {string} string
      * @return {?}
      */
     function flush(string) {
       return'"' + string.replace(/"/, '\\"') + '"';
     }
     /**
      * @param {string} attribute
      * @return {?}
      */
     function validateAttribute(attribute) {
       if ("string" != typeof attribute) {
         throw Error("Invalid request opion. attribute must be a non-zero length string.");
       }
       if (attribute = attribute.trim(), !attribute) {
         throw Error("Invalid request opion. attribute must be a non-zero length string.");
       }
       if (!attribute.match(delegateEventSplitter)) {
         throw Error("Invalid request option. invalid attribute name: " + attribute);
       }
       return attribute;
     }
     /**
      * @param {string} pair
      * @return {?}
      */
     function validateElementAttributes(pair) {
       if (!pair.trim().length) {
         throw Error("Invalid request option: elementAttributes must contain at least one attribute.");
       }
       var map = {};
       var scrubbed = {};
       var codeSegments = pair.split(/\s+/);
       /** @type {number} */
       var i = 0;
       for (;i < codeSegments.length;i++) {
         var attribute = codeSegments[i];
         if (attribute) {
           attribute = validateAttribute(attribute);
           var objUid = attribute.toLowerCase();
           if (map[objUid]) {
             throw Error("Invalid request option: observing multiple case variations of the same attribute is not supported.");
           }
           /** @type {boolean} */
           scrubbed[attribute] = true;
           /** @type {boolean} */
           map[objUid] = true;
         }
       }
       return Object.keys(scrubbed);
     }
     /**
      * @param {Array} filters
      * @return {?}
      */
     function elementFilterAttributes(filters) {
       var scrubbed = {};
       return filters.forEach(function(filter) {
         filter.qualifiers.forEach(function(e) {
           /** @type {boolean} */
           scrubbed[e.attrName] = true;
         });
       }), Object.keys(scrubbed);
     }
     var TextBoxObserver;
     var __extends = this.__extends || function(d, b) {
       /**
        * @return {undefined}
        */
       function __() {
         /** @type {Object} */
         this.constructor = d;
       }
       var p;
       for (p in b) {
         if (b.hasOwnProperty(p)) {
           d[p] = b[p];
         }
       }
       __.prototype = b.prototype;
       d.prototype = new __;
     };
     if (TextBoxObserver = "undefined" != typeof WebKitMutationObserver ? WebKitMutationObserver : MutationObserver, void 0 === TextBoxObserver) {
       throw console.error("DOM Mutation Observers are required."), console.error("https://developer.mozilla.org/en-US/docs/DOM/MutationObserver"), Error("DOM Mutation Observers are required");
     }
     var hasMembers;
     var NodeMap = function() {
       /**
        * @return {undefined}
        */
       function Map() {
         /** @type {Array} */
         this.nodes = [];
         /** @type {Array} */
         this.values = [];
       }
       return Map.prototype.isIndex = function(str) {
         return+str === str >>> 0;
       }, Map.prototype.nodeId = function(owner) {
         var unlock = owner[Map.ID_PROP];
         return unlock || (unlock = owner[Map.ID_PROP] = Map.nextId_++), unlock;
       }, Map.prototype.set = function(owner, dataAndEvents) {
         var unlock = this.nodeId(owner);
         /** @type {string} */
         this.nodes[unlock] = owner;
         /** @type {Object} */
         this.values[unlock] = dataAndEvents;
       }, Map.prototype.get = function(owner) {
         var unlock = this.nodeId(owner);
         return this.values[unlock];
       }, Map.prototype.has = function(dataAndEvents) {
         return this.nodeId(dataAndEvents) in this.nodes;
       }, Map.prototype["delete"] = function(owner) {
         var unlock = this.nodeId(owner);
         delete this.nodes[unlock];
         this.values[unlock] = void 0;
       }, Map.prototype.keys = function() {
         /** @type {Array} */
         var nodes = [];
         var nodeId;
         for (nodeId in this.nodes) {
           if (this.isIndex(nodeId)) {
             nodes.push(this.nodes[nodeId]);
           }
         }
         return nodes;
       }, Map.ID_PROP = "__mutation_summary_node_map_id__", Map.nextId_ = 1, Map;
     }();
     !function(dataAndEvents) {
       /** @type {string} */
       dataAndEvents[dataAndEvents.STAYED_OUT = 0] = "STAYED_OUT";
       /** @type {string} */
       dataAndEvents[dataAndEvents.ENTERED = 1] = "ENTERED";
       /** @type {string} */
       dataAndEvents[dataAndEvents.STAYED_IN = 2] = "STAYED_IN";
       /** @type {string} */
       dataAndEvents[dataAndEvents.REPARENTED = 3] = "REPARENTED";
       /** @type {string} */
       dataAndEvents[dataAndEvents.REORDERED = 4] = "REORDERED";
       /** @type {string} */
       dataAndEvents[dataAndEvents.EXITED = 5] = "EXITED";
     }(hasMembers || (hasMembers = {}));
     var MockNode = function() {
       /**
        * @param {Element} node
        * @param {boolean} e
        * @param {boolean} attributes
        * @param {boolean} tag
        * @param {string} opt_parent
        * @param {boolean} $0
        * @param {(Function|string)} is_root
        * @param {Function} more
        * @return {undefined}
        */
       function Node(node, e, attributes, tag, opt_parent, $0, is_root, more) {
         if ("undefined" == typeof e) {
           /** @type {boolean} */
           e = false;
         }
         if ("undefined" == typeof attributes) {
           /** @type {boolean} */
           attributes = false;
         }
         if ("undefined" == typeof tag) {
           /** @type {boolean} */
           tag = false;
         }
         if ("undefined" == typeof opt_parent) {
           /** @type {null} */
           opt_parent = null;
         }
         if ("undefined" == typeof $0) {
           /** @type {boolean} */
           $0 = false;
         }
         if ("undefined" == typeof is_root) {
           /** @type {null} */
           is_root = null;
         }
         if ("undefined" == typeof more) {
           /** @type {null} */
           more = null;
         }
         /** @type {Element} */
         this.node = node;
         /** @type {boolean} */
         this.childList = e;
         /** @type {boolean} */
         this.attributes = attributes;
         /** @type {boolean} */
         this.characterData = tag;
         /** @type {string} */
         this.oldParentNode = opt_parent;
         /** @type {boolean} */
         this.added = $0;
         /** @type {(Function|string)} */
         this.attributeOldValues = is_root;
         /** @type {Function} */
         this.characterDataOldValue = more;
         /** @type {boolean} */
         this.isCaseInsensitive = "undefined" != typeof HTMLDocument ? this.node.nodeType === Node.ELEMENT_NODE && (this.node instanceof HTMLElement && this.node.ownerDocument instanceof HTMLDocument) : this.node.nodeType === Node.ELEMENT_NODE && this.node instanceof HTMLElement;
       }
       return Node.prototype.getAttributeOldValue = function(evt) {
         return this.attributeOldValues ? (this.isCaseInsensitive && (evt = evt.toLowerCase()), this.attributeOldValues[evt]) : void 0;
       }, Node.prototype.getAttributeNamesMutated = function() {
         /** @type {Array} */
         var assigns = [];
         if (!this.attributeOldValues) {
           return assigns;
         }
         var vvar;
         for (vvar in this.attributeOldValues) {
           assigns.push(vvar);
         }
         return assigns;
       }, Node.prototype.attributeMutated = function(i, offsetPosition) {
         /** @type {boolean} */
         this.attributes = true;
         this.attributeOldValues = this.attributeOldValues || {};
         if (!(i in this.attributeOldValues)) {
           this.attributeOldValues[i] = offsetPosition;
         }
       }, Node.prototype.characterDataMutated = function(dataAndEvents) {
         if (!this.characterData) {
           /** @type {boolean} */
           this.characterData = true;
           /** @type {Function} */
           this.characterDataOldValue = dataAndEvents;
         }
       }, Node.prototype.removedFromParent = function(dataAndEvents) {
         /** @type {boolean} */
         this.childList = true;
         if (this.added || this.oldParentNode) {
           /** @type {boolean} */
           this.added = false;
         } else {
           this.oldParentNode = dataAndEvents;
         }
       }, Node.prototype.insertedIntoParent = function() {
         /** @type {boolean} */
         this.childList = true;
         /** @type {boolean} */
         this.added = true;
       }, Node.prototype.getOldParent = function() {
         if (this.childList) {
           if (this.oldParentNode) {
             return this.oldParentNode;
           }
           if (this.added) {
             return null;
           }
         }
         return this.node.parentNode;
       }, Node;
     }();
     var Element = function() {
       /**
        * @return {undefined}
        */
       function recordOldPrevious() {
         this.added = new NodeMap;
         this.removed = new NodeMap;
         this.maybeMoved = new NodeMap;
         this.oldPrevious = new NodeMap;
         this.moved = void 0;
       }
       return recordOldPrevious;
     }();
     var treeChanges = function(_super) {
       /**
        * @param {string} token
        * @param {Array} codeSegments
        * @return {undefined}
        */
       function handler(token, codeSegments) {
         _super.call(this);
         /** @type {string} */
         this.rootNode = token;
         this.reachableCache = void 0;
         this.wasReachableCache = void 0;
         /** @type {boolean} */
         this.anyParentsChanged = false;
         /** @type {boolean} */
         this.anyAttributesChanged = false;
         /** @type {boolean} */
         this.anyCharacterDataChanged = false;
         /** @type {number} */
         var i = 0;
         for (;i < codeSegments.length;i++) {
           var mutation = codeSegments[i];
           switch(mutation.type) {
             case "childList":
               /** @type {boolean} */
               this.anyParentsChanged = true;
               /** @type {number} */
               var j = 0;
               for (;j < mutation.removedNodes.length;j++) {
                 var node = mutation.removedNodes[j];
                 this.getChange(node).removedFromParent(mutation.target);
               }
               /** @type {number} */
               j = 0;
               for (;j < mutation.addedNodes.length;j++) {
                 node = mutation.addedNodes[j];
                 this.getChange(node).insertedIntoParent();
               }
               break;
             case "attributes":
               /** @type {boolean} */
               this.anyAttributesChanged = true;
               var $ = this.getChange(mutation.target);
               $.attributeMutated(mutation.attributeName, mutation.oldValue);
               break;
             case "characterData":
               /** @type {boolean} */
               this.anyCharacterDataChanged = true;
               $ = this.getChange(mutation.target);
               $.characterDataMutated(mutation.oldValue);
           }
         }
       }
       return __extends(handler, _super), handler.prototype.getChange = function(owner) {
         var node = this.get(owner);
         return node || (node = new MockNode(owner), this.set(owner, node)), node;
       }, handler.prototype.getOldParent = function(owner) {
         var collectionView = this.get(owner);
         return collectionView ? collectionView.getOldParent() : owner.parentNode;
       }, handler.prototype.getIsReachable = function(elem) {
         if (elem === this.rootNode) {
           return true;
         }
         if (!elem) {
           return false;
         }
         this.reachableCache = this.reachableCache || new NodeMap;
         var node = this.reachableCache.get(elem);
         return void 0 === node && (node = this.getIsReachable(elem.parentNode), this.reachableCache.set(elem, node)), node;
       }, handler.prototype.getWasReachable = function(owner) {
         if (owner === this.rootNode) {
           return true;
         }
         if (!owner) {
           return false;
         }
         this.wasReachableCache = this.wasReachableCache || new NodeMap;
         var dataAndEvents = this.wasReachableCache.get(owner);
         return void 0 === dataAndEvents && (dataAndEvents = this.getWasReachable(this.getOldParent(owner)), this.wasReachableCache.set(owner, dataAndEvents)), dataAndEvents;
       }, handler.prototype.reachabilityChange = function(owner) {
         return this.getIsReachable(owner) ? this.getWasReachable(owner) ? 2 : 1 : this.getWasReachable(owner) ? 5 : 0;
       }, handler;
     }(NodeMap);
     var AudioletNode = function() {
       /**
        * @param {?} rootNode
        * @param {?} mutations
        * @param {?} selectors
        * @param {?} calcReordered
        * @param {?} calcOldPreviousSibling
        * @return {undefined}
        */
       function MutationProjection(rootNode, mutations, selectors, calcReordered, calcOldPreviousSibling) {
         this.rootNode = rootNode;
         this.mutations = mutations;
         this.selectors = selectors;
         this.calcReordered = calcReordered;
         this.calcOldPreviousSibling = calcOldPreviousSibling;
         this.treeChanges = new treeChanges(rootNode, mutations);
         /** @type {Array} */
         this.entered = [];
         /** @type {Array} */
         this.exited = [];
         this.stayedIn = new NodeMap;
         this.visited = new NodeMap;
         this.childListChangeMap = void 0;
         this.characterDataOnly = void 0;
         this.matchCache = void 0;
         this.processMutations();
       }
       return MutationProjection.prototype.processMutations = function() {
         if (this.treeChanges.anyParentsChanged || this.treeChanges.anyAttributesChanged) {
           var codeSegments = this.treeChanges.keys();
           /** @type {number} */
           var i = 0;
           for (;i < codeSegments.length;i++) {
             this.visitNode(codeSegments[i], void 0);
           }
         }
       }, MutationProjection.prototype.visitNode = function(node, global) {
         if (!this.visited.has(node)) {
           this.visited.set(node, true);
           var change = this.treeChanges.get(node);
           /** @type {number} */
           var root = global;
           if ((change && change.childList || void 0 == root) && (root = this.treeChanges.reachabilityChange(node)), 0 !== root) {
             if (this.matchabilityChange(node), 1 === root) {
               this.entered.push(node);
             } else {
               if (5 === root) {
                 this.exited.push(node);
                 this.ensureHasOldPreviousSiblingIfNeeded(node);
               } else {
                 if (2 === root) {
                   /** @type {number} */
                   var dataAndEvents = 2;
                   if (change) {
                     if (change.childList) {
                       if (change.oldParentNode !== node.parentNode) {
                         /** @type {number} */
                         dataAndEvents = 3;
                         this.ensureHasOldPreviousSiblingIfNeeded(node);
                       } else {
                         if (this.calcReordered) {
                           if (this.wasReordered(node)) {
                             /** @type {number} */
                             dataAndEvents = 4;
                           }
                         }
                       }
                     }
                   }
                   this.stayedIn.set(node, dataAndEvents);
                 }
               }
             }
             if (2 !== root) {
               var curNode = node.firstChild;
               for (;curNode;curNode = curNode.nextSibling) {
                 this.visitNode(curNode, root);
               }
             }
           }
         }
       }, MutationProjection.prototype.ensureHasOldPreviousSiblingIfNeeded = function(node) {
         if (this.calcOldPreviousSibling) {
           this.processChildlistChanges();
           var elem = node.parentNode;
           var range = this.treeChanges.get(node);
           if (range) {
             if (range.oldParentNode) {
               elem = range.oldParentNode;
             }
           }
           var dataAndEvents = this.childListChangeMap.get(elem);
           if (!dataAndEvents) {
             dataAndEvents = new Element;
             this.childListChangeMap.set(elem, dataAndEvents);
           }
           if (!dataAndEvents.oldPrevious.has(node)) {
             dataAndEvents.oldPrevious.set(node, node.previousSibling);
           }
         }
       }, MutationProjection.prototype.getChanged = function(summary, selectors, dataAndEvents) {
         this.selectors = selectors;
         /** @type {Function} */
         this.characterDataOnly = dataAndEvents;
         /** @type {number} */
         var i = 0;
         for (;i < this.entered.length;i++) {
           var node = this.entered[i];
           var next = this.matchabilityChange(node);
           if (1 === next || 2 === next) {
             summary.added.push(node);
           }
         }
         var codeSegments = this.stayedIn.keys();
         /** @type {number} */
         i = 0;
         for (;i < codeSegments.length;i++) {
           node = codeSegments[i];
           next = this.matchabilityChange(node);
           if (1 === next) {
             summary.added.push(node);
           } else {
             if (5 === next) {
               summary.removed.push(node);
             } else {
               if (2 === next && (summary.reparented || summary.reordered)) {
                 var normalizedRange = this.stayedIn.get(node);
                 if (summary.reparented && 3 === normalizedRange) {
                   summary.reparented.push(node);
                 } else {
                   if (summary.reordered) {
                     if (4 === normalizedRange) {
                       summary.reordered.push(node);
                     }
                   }
                 }
               }
             }
           }
         }
         /** @type {number} */
         i = 0;
         for (;i < this.exited.length;i++) {
           node = this.exited[i];
           next = this.matchabilityChange(node);
           if (5 === next || 2 === next) {
             summary.removed.push(node);
           }
         }
       }, MutationProjection.prototype.getOldParentNode = function(node) {
         var change = this.treeChanges.get(node);
         if (change && change.childList) {
           return change.oldParentNode ? change.oldParentNode : null;
         }
         var next = this.treeChanges.reachabilityChange(node);
         if (0 === next || 1 === next) {
           throw Error("getOldParentNode requested on invalid node.");
         }
         return node.parentNode;
       }, MutationProjection.prototype.getOldPreviousSibling = function(node) {
         var cur = node.parentNode;
         var container = this.treeChanges.get(node);
         if (container) {
           if (container.oldParentNode) {
             cur = container.oldParentNode;
           }
         }
         var w = this.childListChangeMap.get(cur);
         if (!w) {
           throw Error("getOldPreviousSibling requested on invalid node.");
         }
         return w.oldPrevious.get(node);
       }, MutationProjection.prototype.getOldAttribute = function(node, err) {
         var def = this.treeChanges.get(node);
         if (!def || !def.attributes) {
           throw Error("getOldAttribute requested on invalid node.");
         }
         var shouldFail = def.getAttributeOldValue(err);
         if (void 0 === shouldFail) {
           throw Error("getOldAttribute requested for unchanged attribute name.");
         }
         return shouldFail;
       }, MutationProjection.prototype.attributeChangedNodes = function(data) {
         if (!this.treeChanges.anyAttributesChanged) {
           return{};
         }
         var extended;
         var methods;
         if (data) {
           extended = {};
           methods = {};
           /** @type {number} */
           var i = 0;
           for (;i < data.length;i++) {
             var method = data[i];
             /** @type {boolean} */
             extended[method] = true;
             methods[method.toLowerCase()] = method;
           }
         }
         var collection = {};
         var codeSegments = this.treeChanges.keys();
         /** @type {number} */
         i = 0;
         for (;i < codeSegments.length;i++) {
           var node = codeSegments[i];
           var elem = this.treeChanges.get(node);
           if (elem.attributes && (2 === this.treeChanges.reachabilityChange(node) && 2 === this.matchabilityChange(node))) {
             var element = node;
             var names = elem.getAttributeNamesMutated();
             /** @type {number} */
             var n = 0;
             for (;n < names.length;n++) {
               method = names[n];
               if (!extended || (extended[method] || elem.isCaseInsensitive && methods[method])) {
                 var expectation = elem.getAttributeOldValue(method);
                 if (expectation !== element.getAttribute(method)) {
                   if (methods) {
                     if (elem.isCaseInsensitive) {
                       method = methods[method];
                     }
                   }
                   collection[method] = collection[method] || [];
                   collection[method].push(element);
                 }
               }
             }
           }
         }
         return collection;
       }, MutationProjection.prototype.getOldCharacterData = function(node) {
         var options = this.treeChanges.get(node);
         if (!options || !options.characterData) {
           throw Error("getOldCharacterData requested on invalid node.");
         }
         return options.characterDataOldValue;
       }, MutationProjection.prototype.getCharacterDataChanged = function() {
         if (!this.treeChanges.anyCharacterDataChanged) {
           return[];
         }
         var codeSegments = this.treeChanges.keys();
         /** @type {Array} */
         var acc = [];
         /** @type {number} */
         var i = 0;
         for (;i < codeSegments.length;i++) {
           var node = codeSegments[i];
           if (2 === this.treeChanges.reachabilityChange(node)) {
             var options = this.treeChanges.get(node);
             if (options.characterData) {
               if (node.textContent != options.characterDataOldValue) {
                 acc.push(node);
               }
             }
           }
         }
         return acc;
       }, MutationProjection.prototype.computeMatchabilityChange = function(result, elem) {
         if (!this.matchCache) {
           /** @type {Array} */
           this.matchCache = [];
         }
         if (!this.matchCache[result.uid]) {
           this.matchCache[result.uid] = new NodeMap;
         }
         var cache = this.matchCache[result.uid];
         var node = cache.get(elem);
         return void 0 === node && (node = result.matchabilityChange(elem, this.treeChanges.get(elem)), cache.set(elem, node)), node;
       }, MutationProjection.prototype.matchabilityChange = function(node) {
         var self = this;
         if (this.characterDataOnly) {
           switch(node.nodeType) {
             case Node.COMMENT_NODE:
             ;
             case Node.TEXT_NODE:
               return 2;
             default:
               return 0;
           }
         }
         if (!this.selectors) {
           return 2;
         }
         if (node.nodeType !== Node.ELEMENT_NODE) {
           return 0;
         }
         var next = node;
         var codeSegments = this.selectors.map(function(slide) {
           return self.computeMatchabilityChange(slide, next);
         });
         /** @type {number} */
         var UNDEFINED = 0;
         /** @type {number} */
         var i = 0;
         for (;2 !== UNDEFINED && i < codeSegments.length;) {
           switch(codeSegments[i]) {
             case 2:
               /** @type {number} */
               UNDEFINED = 2;
               break;
             case 1:
               /** @type {number} */
               UNDEFINED = 5 === UNDEFINED ? 2 : 1;
               break;
             case 5:
               /** @type {number} */
               UNDEFINED = 1 === UNDEFINED ? 2 : 5;
           }
           i++;
         }
         return UNDEFINED;
       }, MutationProjection.prototype.getChildlistChange = function(elem) {
         var node = this.childListChangeMap.get(elem);
         return node || (node = new Element, this.childListChangeMap.set(elem, node)), node;
       }, MutationProjection.prototype.processChildlistChanges = function() {
         /**
          * @param {string} node
          * @param {Object} dataAndEvents
          * @return {undefined}
          */
         function recordOldPrevious(node, dataAndEvents) {
           if (!!node) {
             if (!change.oldPrevious.has(node)) {
               if (!change.added.has(node)) {
                 if (!change.maybeMoved.has(node)) {
                   if (!(dataAndEvents && (change.added.has(dataAndEvents) || change.maybeMoved.has(dataAndEvents)))) {
                     change.oldPrevious.set(node, dataAndEvents);
                   }
                 }
               }
             }
           }
         }
         if (!this.childListChangeMap) {
           this.childListChangeMap = new NodeMap;
           /** @type {number} */
           var i = 0;
           for (;i < this.mutations.length;i++) {
             var mutation = this.mutations[i];
             if ("childList" == mutation.type && (2 === this.treeChanges.reachabilityChange(mutation.target) || this.calcOldPreviousSibling)) {
               var change = this.getChildlistChange(mutation.target);
               var oldPrevious = mutation.previousSibling;
               /** @type {number} */
               var j = 0;
               for (;j < mutation.removedNodes.length;j++) {
                 var node = mutation.removedNodes[j];
                 recordOldPrevious(node, oldPrevious);
                 if (change.added.has(node)) {
                   change.added["delete"](node);
                 } else {
                   change.removed.set(node, true);
                   change.maybeMoved["delete"](node);
                 }
                 oldPrevious = node;
               }
               recordOldPrevious(mutation.nextSibling, oldPrevious);
               /** @type {number} */
               j = 0;
               for (;j < mutation.addedNodes.length;j++) {
                 node = mutation.addedNodes[j];
                 if (change.removed.has(node)) {
                   change.removed["delete"](node);
                   change.maybeMoved.set(node, true);
                 } else {
                   change.added.set(node, true);
                 }
               }
             }
           }
         }
       }, MutationProjection.prototype.wasReordered = function(node) {
         /**
          * @param {string} node
          * @return {?}
          */
         function isMoved(node) {
           if (!node) {
             return false;
           }
           if (!change.maybeMoved.has(node)) {
             return false;
           }
           var dataAndEvents = change.moved.get(node);
           return void 0 !== dataAndEvents ? dataAndEvents : (scope.has(node) ? dataAndEvents = true : (scope.set(node, true), dataAndEvents = getPrevious(node) !== getOldPrevious(node)), scope.has(node) ? (scope["delete"](node), change.moved.set(node, dataAndEvents)) : dataAndEvents = change.moved.get(node), dataAndEvents);
         }
         /**
          * @param {string} node
          * @return {?}
          */
         function getOldPrevious(node) {
           var oldPrevious = oldPreviousCache.get(node);
           if (void 0 !== oldPrevious) {
             return oldPrevious;
           }
           oldPrevious = change.oldPrevious.get(node);
           for (;oldPrevious && (change.removed.has(oldPrevious) || isMoved(oldPrevious));) {
             oldPrevious = getOldPrevious(oldPrevious);
           }
           return void 0 === oldPrevious && (oldPrevious = node.previousSibling), oldPreviousCache.set(node, oldPrevious), oldPrevious;
         }
         /**
          * @param {string} elem
          * @return {?}
          */
         function getPrevious(elem) {
           if (api.has(elem)) {
             return api.get(elem);
           }
           var node = elem.previousSibling;
           for (;node && (change.added.has(node) || isMoved(node));) {
             node = node.previousSibling;
           }
           return api.set(elem, node), node;
         }
         if (!this.treeChanges.anyParentsChanged) {
           return false;
         }
         this.processChildlistChanges();
         var cur = node.parentNode;
         var container = this.treeChanges.get(node);
         if (container) {
           if (container.oldParentNode) {
             cur = container.oldParentNode;
           }
         }
         var change = this.childListChangeMap.get(cur);
         if (!change) {
           return false;
         }
         if (change.moved) {
           return change.moved.get(node);
         }
         change.moved = new NodeMap;
         var scope = new NodeMap;
         var oldPreviousCache = new NodeMap;
         var api = new NodeMap;
         return change.maybeMoved.keys().forEach(isMoved), change.moved.get(node);
       }, MutationProjection;
     }();
     var Item = function() {
       /**
        * @param {?} projection
        * @param {Object} query
        * @return {undefined}
        */
       function createSummary(projection, query) {
         var summary = this;
         if (this.projection = projection, this.added = [], this.removed = [], this.reparented = query.all || query.element ? [] : void 0, this.reordered = query.all ? [] : void 0, projection.getChanged(this, query.elementFilter, query.characterData), query.all || (query.attribute || query.attributeList)) {
           var pdataCur = query.attribute ? [query.attribute] : query.attributeList;
           var attributeChanged = projection.attributeChangedNodes(pdataCur);
           if (query.attribute) {
             this.valueChanged = attributeChanged[query.attribute] || [];
           } else {
             this.attributeChanged = attributeChanged;
             if (query.attributeList) {
               query.attributeList.forEach(function(attrName) {
                 if (!summary.attributeChanged.hasOwnProperty(attrName)) {
                   /** @type {Array} */
                   summary.attributeChanged[attrName] = [];
                 }
               });
             }
           }
         }
         if (query.all || query.characterData) {
           var valueChanged = projection.getCharacterDataChanged();
           if (query.characterData) {
             this.valueChanged = valueChanged;
           } else {
             this.characterDataChanged = valueChanged;
           }
         }
         if (this.reordered) {
           this.getOldPreviousSibling = projection.getOldPreviousSibling.bind(projection);
         }
       }
       return createSummary.prototype.getOldParentNode = function(se) {
         return this.projection.getOldParentNode(se);
       }, createSummary.prototype.getOldAttribute = function(node, deepDataAndEvents) {
         return this.projection.getOldAttribute(node, deepDataAndEvents);
       }, createSummary.prototype.getOldCharacterData = function(se) {
         return this.projection.getOldCharacterData(se);
       }, createSummary.prototype.getOldPreviousSibling = function(se) {
         return this.projection.getOldPreviousSibling(se);
       }, createSummary;
     }();
     /** @type {RegExp} */
     var WHITESPACE = /[a-zA-Z_]+/;
     /** @type {RegExp} */
     var typePattern = /[a-zA-Z0-9_\-]+/;
     var newQualifier = function() {
       /**
        * @return {undefined}
        */
       function $Element() {
       }
       return $Element.prototype.matches = function(elements) {
         if (null === elements) {
           return false;
         }
         if (void 0 === this.attrValue) {
           return true;
         }
         if (!this.contains) {
           return this.attrValue == elements;
         }
         var codeSegments = elements.split(" ");
         /** @type {number} */
         var i = 0;
         for (;i < codeSegments.length;i++) {
           if (this.attrValue === codeSegments[i]) {
             return true;
           }
         }
         return false;
       }, $Element.prototype.toString = function() {
         return "class" === this.attrName && this.contains ? "." + this.attrValue : "id" !== this.attrName || this.contains ? this.contains ? "[" + this.attrName + "~=" + flush(this.attrValue) + "]" : "attrValue" in this ? "[" + this.attrName + "=" + flush(this.attrValue) + "]" : "[" + this.attrName + "]" : "#" + this.attrValue;
       }, $Element;
     }();
     var utils = function() {
       /**
        * @return {undefined}
        */
       function root() {
         /** @type {number} */
         this.uid = root.nextUid++;
         /** @type {Array} */
         this.qualifiers = [];
       }
       return Object.defineProperty(root.prototype, "caseInsensitiveTagName", {
         /**
          * @return {?}
          */
         get : function() {
           return this.tagName.toUpperCase();
         },
         enumerable : true,
         configurable : true
       }), Object.defineProperty(root.prototype, "selectorString", {
         /**
          * @return {?}
          */
         get : function() {
           return this.tagName + this.qualifiers.join("");
         },
         enumerable : true,
         configurable : true
       }), root.prototype.isMatching = function(object) {
         return object[root.matchesSelector] && object[root.matchesSelector](this.selectorString);
       }, root.prototype.wasMatching = function(object, obj, isArray) {
         if (!obj || !obj.attributes) {
           return isArray;
         }
         var tagName = obj.isCaseInsensitive ? this.caseInsensitiveTagName : this.tagName;
         if ("*" !== tagName && tagName !== object.tagName) {
           return false;
         }
         /** @type {Array} */
         var configList = [];
         /** @type {boolean} */
         var thisp = false;
         /** @type {number} */
         var i = 0;
         for (;i < this.qualifiers.length;i++) {
           var options = this.qualifiers[i];
           var name = obj.getAttributeOldValue(options.attrName);
           configList.push(name);
           /** @type {boolean} */
           thisp = thisp || void 0 !== name;
         }
         if (!thisp) {
           return isArray;
         }
         /** @type {number} */
         i = 0;
         for (;i < this.qualifiers.length;i++) {
           options = this.qualifiers[i];
           name = configList[i];
           if (void 0 === name && (name = object.getAttribute(options.attrName)), !options.matches(name)) {
             return false;
           }
         }
         return true;
       }, root.prototype.matchabilityChange = function(elems, walkers) {
         var isArray = this.isMatching(elems);
         return isArray ? this.wasMatching(elems, walkers, isArray) ? 2 : 1 : this.wasMatching(elems, walkers, isArray) ? 5 : 0;
       }, root.parseSelectors = function(ca) {
         /**
          * @return {undefined}
          */
         function getEnumerableProperties() {
           if (currentSelector) {
             if (currentQualifier) {
               currentSelector.qualifiers.push(currentQualifier);
               currentQualifier = void 0;
             }
             configList.push(currentSelector);
           }
           currentSelector = new root;
         }
         /**
          * @return {undefined}
          */
         function newQualifier() {
           if (currentQualifier) {
             currentSelector.qualifiers.push(currentQualifier);
           }
           currentQualifier = new newQualifier;
         }
         var currentSelector;
         var currentQualifier;
         var quote;
         /** @type {Array} */
         var configList = [];
         /** @type {RegExp} */
         var validNameInitialChar = /\s/;
         /** @type {string} */
         var message = "Invalid or unsupported selector syntax.";
         /** @type {number} */
         var viewHeight = 1;
         /** @type {number} */
         var h = 2;
         /** @type {number} */
         var optimalHeight = 3;
         /** @type {number} */
         var minimumHeight = 4;
         /** @type {number} */
         var temp = 5;
         /** @type {number} */
         var thumbHeight = 6;
         /** @type {number} */
         var attr_height = 7;
         /** @type {number} */
         var winWidth = 8;
         /** @type {number} */
         var _ = 9;
         /** @type {number} */
         var length = 10;
         /** @type {number} */
         var orginal_height = 11;
         /** @type {number} */
         var windowheight = 12;
         /** @type {number} */
         var winHeight = 13;
         /** @type {number} */
         var new_height = 14;
         /** @type {number} */
         var height = viewHeight;
         /** @type {number} */
         var i = 0;
         for (;i < ca.length;) {
           var c = ca[i++];
           switch(height) {
             case viewHeight:
               if (c.match(WHITESPACE)) {
                 getEnumerableProperties();
                 currentSelector.tagName = c;
                 /** @type {number} */
                 height = h;
                 break;
               }
               if ("*" == c) {
                 getEnumerableProperties();
                 /** @type {string} */
                 currentSelector.tagName = "*";
                 /** @type {number} */
                 height = optimalHeight;
                 break;
               }
               if ("." == c) {
                 getEnumerableProperties();
                 newQualifier();
                 /** @type {string} */
                 currentSelector.tagName = "*";
                 /** @type {string} */
                 currentQualifier.attrName = "class";
                 /** @type {boolean} */
                 currentQualifier.contains = true;
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("#" == c) {
                 getEnumerableProperties();
                 newQualifier();
                 /** @type {string} */
                 currentSelector.tagName = "*";
                 /** @type {string} */
                 currentQualifier.attrName = "id";
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("[" == c) {
                 getEnumerableProperties();
                 newQualifier();
                 /** @type {string} */
                 currentSelector.tagName = "*";
                 /** @type {string} */
                 currentQualifier.attrName = "";
                 /** @type {number} */
                 height = thumbHeight;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 break;
               }
               throw Error(message);;
             case h:
               if (c.match(typePattern)) {
                 currentSelector.tagName += c;
                 break;
               }
               if ("." == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "class";
                 /** @type {boolean} */
                 currentQualifier.contains = true;
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("#" == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "id";
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("[" == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "";
                 /** @type {number} */
                 height = thumbHeight;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 /** @type {number} */
                 height = new_height;
                 break;
               }
               if ("," == c) {
                 /** @type {number} */
                 height = viewHeight;
                 break;
               }
               throw Error(message);;
             case optimalHeight:
               if ("." == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "class";
                 /** @type {boolean} */
                 currentQualifier.contains = true;
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("#" == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "id";
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("[" == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "";
                 /** @type {number} */
                 height = thumbHeight;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 /** @type {number} */
                 height = new_height;
                 break;
               }
               if ("," == c) {
                 /** @type {number} */
                 height = viewHeight;
                 break;
               }
               throw Error(message);;
             case minimumHeight:
               if (c.match(WHITESPACE)) {
                 currentQualifier.attrValue = c;
                 /** @type {number} */
                 height = temp;
                 break;
               }
               throw Error(message);;
             case temp:
               if (c.match(typePattern)) {
                 currentQualifier.attrValue += c;
                 break;
               }
               if ("." == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "class";
                 /** @type {boolean} */
                 currentQualifier.contains = true;
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("#" == c) {
                 newQualifier();
                 /** @type {string} */
                 currentQualifier.attrName = "id";
                 /** @type {number} */
                 height = minimumHeight;
                 break;
               }
               if ("[" == c) {
                 newQualifier();
                 /** @type {number} */
                 height = thumbHeight;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 /** @type {number} */
                 height = new_height;
                 break;
               }
               if ("," == c) {
                 /** @type {number} */
                 height = viewHeight;
                 break;
               }
               throw Error(message);;
             case thumbHeight:
               if (c.match(WHITESPACE)) {
                 currentQualifier.attrName = c;
                 /** @type {number} */
                 height = attr_height;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 break;
               }
               throw Error(message);;
             case attr_height:
               if (c.match(typePattern)) {
                 currentQualifier.attrName += c;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 /** @type {number} */
                 height = winWidth;
                 break;
               }
               if ("~" == c) {
                 /** @type {boolean} */
                 currentQualifier.contains = true;
                 /** @type {number} */
                 height = _;
                 break;
               }
               if ("=" == c) {
                 /** @type {string} */
                 currentQualifier.attrValue = "";
                 /** @type {number} */
                 height = orginal_height;
                 break;
               }
               if ("]" == c) {
                 /** @type {number} */
                 height = optimalHeight;
                 break;
               }
               throw Error(message);;
             case winWidth:
               if ("~" == c) {
                 /** @type {boolean} */
                 currentQualifier.contains = true;
                 /** @type {number} */
                 height = _;
                 break;
               }
               if ("=" == c) {
                 /** @type {string} */
                 currentQualifier.attrValue = "";
                 /** @type {number} */
                 height = orginal_height;
                 break;
               }
               if ("]" == c) {
                 /** @type {number} */
                 height = optimalHeight;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 break;
               }
               throw Error(message);;
             case _:
               if ("=" == c) {
                 /** @type {string} */
                 currentQualifier.attrValue = "";
                 /** @type {number} */
                 height = orginal_height;
                 break;
               }
               throw Error(message);;
             case length:
               if ("]" == c) {
                 /** @type {number} */
                 height = optimalHeight;
                 break;
               }
               if (c.match(validNameInitialChar)) {
                 break;
               }
               throw Error(message);;
             case orginal_height:
               if (c.match(validNameInitialChar)) {
                 break;
               }
               if ('"' == c || "'" == c) {
                 quote = c;
                 /** @type {number} */
                 height = winHeight;
                 break;
               }
               currentQualifier.attrValue += c;
               /** @type {number} */
               height = windowheight;
               break;
             case windowheight:
               if (c.match(validNameInitialChar)) {
                 /** @type {number} */
                 height = length;
                 break;
               }
               if ("]" == c) {
                 /** @type {number} */
                 height = optimalHeight;
                 break;
               }
               if ("'" == c || '"' == c) {
                 throw Error(message);
               }
               currentQualifier.attrValue += c;
               break;
             case winHeight:
               if (c == quote) {
                 /** @type {number} */
                 height = length;
                 break;
               }
               currentQualifier.attrValue += c;
               break;
             case new_height:
               if (c.match(validNameInitialChar)) {
                 break;
               }
               if ("," == c) {
                 /** @type {number} */
                 height = viewHeight;
                 break;
               }
               throw Error(message);;
           }
         }
         switch(height) {
           case viewHeight:
           ;
           case h:
           ;
           case optimalHeight:
           ;
           case temp:
           ;
           case new_height:
             getEnumerableProperties();
             break;
           default:
             throw Error(message);;
         }
         if (!configList.length) {
           throw Error(message);
         }
         return configList;
       }, root.nextUid = 1, root.matchesSelector = function() {
         /** @type {Element} */
         var proto = document.createElement("div");
         return "function" == typeof proto.webkitMatchesSelector ? "webkitMatchesSelector" : "function" == typeof proto.mozMatchesSelector ? "mozMatchesSelector" : "function" == typeof proto.msMatchesSelector ? "msMatchesSelector" : "matchesSelector";
       }(), root;
     }();
     /** @type {RegExp} */
     var delegateEventSplitter = /^([a-zA-Z:_]+[a-zA-Z0-9_\-:\.]*)$/;
     var JsDiff = function() {
       /**
        * @param {?} options
        * @return {undefined}
        */
       function MutationSummary(options) {
         var suite = this;
         /** @type {boolean} */
         this.connected = false;
         this.options = MutationSummary.validateOptions(options);
         this.observerOptions = MutationSummary.createObserverOptions(this.options.queries);
         this.root = this.options.rootNode;
         this.callback = this.options.callback;
         /** @type {Array} */
         this.elementFilter = Array.prototype.concat.apply([], this.options.queries.map(function(query) {
           return query.elementFilter ? query.elementFilter : [];
         }));
         if (!this.elementFilter.length) {
           this.elementFilter = void 0;
         }
         this.calcReordered = this.options.queries.some(function($q) {
           return $q.all;
         });
         /** @type {Array} */
         this.queryValidators = [];
         if (MutationSummary.createQueryValidator) {
           this.queryValidators = this.options.queries.map(function(query) {
             return MutationSummary.createQueryValidator(suite.root, query);
           });
         }
         this.observer = new TextBoxObserver(function(deepDataAndEvents) {
           suite.observerCallback(deepDataAndEvents);
         });
         this.reconnect();
       }
       return MutationSummary.createObserverOptions = function(queries) {
         /**
          * @param {Array} attributes
          * @return {?}
          */
         function observeAttributes(attributes) {
           if (!observerOptions.attributes || attributeFilter) {
             if (observerOptions.attributes = true, observerOptions.attributeOldValue = true, !attributes) {
               return void(attributeFilter = void 0);
             }
             attributeFilter = attributeFilter || {};
             attributes.forEach(function(attrName) {
               /** @type {boolean} */
               attributeFilter[attrName] = true;
               /** @type {boolean} */
               attributeFilter[attrName.toLowerCase()] = true;
             });
           }
         }
         var attributeFilter;
         var observerOptions = {
           childList : true,
           subtree : true
         };
         return queries.forEach(function(request) {
           if (request.characterData) {
             return observerOptions.characterData = true, void(observerOptions.characterDataOldValue = true);
           }
           if (request.all) {
             return observeAttributes(), observerOptions.characterData = true, void(observerOptions.characterDataOldValue = true);
           }
           if (request.attribute) {
             return void observeAttributes([request.attribute.trim()]);
           }
           var attributes = elementFilterAttributes(request.elementFilter).concat(request.attributeList || []);
           if (attributes.length) {
             observeAttributes(attributes);
           }
         }), attributeFilter && (observerOptions.attributeFilter = Object.keys(attributeFilter)), observerOptions;
       }, MutationSummary.validateOptions = function(options) {
         var name;
         for (name in options) {
           if (!(name in MutationSummary.optionKeys)) {
             throw Error("Invalid option: " + name);
           }
         }
         if ("function" != typeof options.callback) {
           throw Error("Invalid options: callback is required and must be a function");
         }
         if (!options.queries || !options.queries.length) {
           throw Error("Invalid options: queries must contain at least one query request object.");
         }
         var obj = {
           /** @type {Function} */
           callback : options.callback,
           rootNode : options.rootNode || document,
           observeOwnChanges : !!options.observeOwnChanges,
           oldPreviousSibling : !!options.oldPreviousSibling,
           queries : []
         };
         /** @type {number} */
         var i = 0;
         for (;i < options.queries.length;i++) {
           var request = options.queries[i];
           if (request.all) {
             if (Object.keys(request).length > 1) {
               throw Error("Invalid request option. all has no options.");
             }
             obj.queries.push({
               all : true
             });
           } else {
             if ("attribute" in request) {
               var query = {
                 attribute : validateAttribute(request.attribute)
               };
               if (query.elementFilter = utils.parseSelectors("*[" + query.attribute + "]"), Object.keys(request).length > 1) {
                 throw Error("Invalid request option. attribute has no options.");
               }
               obj.queries.push(query);
             } else {
               if ("element" in request) {
                 /** @type {number} */
                 var cnl = Object.keys(request).length;
                 query = {
                   element : request.element,
                   elementFilter : utils.parseSelectors(request.element)
                 };
                 if (request.hasOwnProperty("elementAttributes") && (query.attributeList = validateElementAttributes(request.elementAttributes), cnl--), cnl > 1) {
                   throw Error("Invalid request option. element only allows elementAttributes option.");
                 }
                 obj.queries.push(query);
               } else {
                 if (!request.characterData) {
                   throw Error("Invalid request option. Unknown query request.");
                 }
                 if (Object.keys(request).length > 1) {
                   throw Error("Invalid request option. characterData has no options.");
                 }
                 obj.queries.push({
                   characterData : true
                 });
               }
             }
           }
         }
         return obj;
       }, MutationSummary.prototype.createSummaries = function(deepDataAndEvents) {
         if (!deepDataAndEvents || !deepDataAndEvents.length) {
           return[];
         }
         var node = new AudioletNode(this.root, deepDataAndEvents, this.elementFilter, this.calcReordered, this.options.oldPreviousSibling);
         /** @type {Array} */
         var geometries = [];
         /** @type {number} */
         var i = 0;
         for (;i < this.options.queries.length;i++) {
           geometries.push(new Item(node, this.options.queries[i]));
         }
         return geometries;
       }, MutationSummary.prototype.checkpointQueryValidators = function() {
         this.queryValidators.forEach(function(dataAndEvents) {
           if (dataAndEvents) {
             dataAndEvents.recordPreviousState();
           }
         });
       }, MutationSummary.prototype.runQueryValidators = function(summaries) {
         this.queryValidators.forEach(function(validator, index) {
           if (validator) {
             validator.validate(summaries[index]);
           }
         });
       }, MutationSummary.prototype.changesToReport = function(array) {
         return array.some(function(summary) {
           /** @type {Array} */
           var summaryProps = ["added", "removed", "reordered", "reparented", "valueChanged", "characterDataChanged"];
           if (summaryProps.some(function(prop) {
             return summary[prop] && summary[prop].length;
           })) {
             return true;
           }
           if (summary.attributeChanged) {
             /** @type {Array.<string>} */
             var array = Object.keys(summary.attributeChanged);
             /** @type {boolean} */
             var n = array.some(function(attrName) {
               return!!summary.attributeChanged[attrName].length;
             });
             if (n) {
               return true;
             }
           }
           return false;
         });
       }, MutationSummary.prototype.observerCallback = function(deepDataAndEvents) {
         if (!this.options.observeOwnChanges) {
           this.observer.disconnect();
         }
         var err = this.createSummaries(deepDataAndEvents);
         this.runQueryValidators(err);
         if (this.options.observeOwnChanges) {
           this.checkpointQueryValidators();
         }
         if (this.changesToReport(err)) {
           this.callback(err);
         }
         if (!this.options.observeOwnChanges) {
           if (this.connected) {
             this.checkpointQueryValidators();
             this.observer.observe(this.root, this.observerOptions);
           }
         }
       }, MutationSummary.prototype.reconnect = function() {
         if (this.connected) {
           throw Error("Already connected");
         }
         this.observer.observe(this.root, this.observerOptions);
         /** @type {boolean} */
         this.connected = true;
         this.checkpointQueryValidators();
       }, MutationSummary.prototype.takeSummaries = function() {
         if (!this.connected) {
           throw Error("Not connected");
         }
         var selector = this.createSummaries(this.observer.takeRecords());
         return this.changesToReport(selector) ? selector : void 0;
       }, MutationSummary.prototype.disconnect = function() {
         var takeSummaries = this.takeSummaries();
         return this.observer.disconnect(), this.connected = false, takeSummaries;
       }, MutationSummary.NodeMap = NodeMap, MutationSummary.parseElementFilter = utils.parseSelectors, MutationSummary.optionKeys = {
         callback : true,
         queries : true,
         rootNode : true,
         oldPreviousSibling : true,
         observeOwnChanges : true
       }, MutationSummary;
     }();
     module.exports = JsDiff;
   }, {}],
   3 : [function($, module, dataAndEvents) {
     var JsDiff;
     var $col;
     var exports;
     var a;
     var child;
     var dom;
     /**
      * @param {Function} fn
      * @param {?} me
      * @return {?}
      */
     var __bind = function(fn, me) {
       return function() {
         return fn.apply(me, arguments);
       };
     };
     /** @type {number} */
     a = !!window.ActiveXObject && +/msie\s(\d+)/i.exec(navigator.userAgent)[1] || 0 / 0;
     if (9 > a) {
       $("json2");
     } else {
       window.MutationObserver = $("mutation-observer");
       exports = $("tree-mirror");
     }
     child = $("./info");
     dom = $("./utils");
     $col = $("./messaging_observer");
     JsDiff = function() {
       /**
        * @return {undefined}
        */
       function $() {
         this.pageChanged = __bind(this.pageChanged, this);
       }
       var node;
       var cmd;
       var n;
       var parent;
       return node = null, parent = "0.25", n = 3, cmd = [], $.prototype.registerDomObserver = function() {
         var options;
         return null != node && node.disconnect(), options = {
           initialize : function(req) {
             return function(xs) {
               var x;
               var results;
               var _i;
               var _len;
               var args;
               args = {
                 u : req.gruser.vid(),
                 s : req.gruser.sid(),
                 t : "imp",
                 tm : +Date.now(),
                 ptm : req.pageLoaded,
                 d : window.location.host,
                 p : req.currentPath
               };
               if (req.currentQuery.length > 0) {
                 args.q = req.currentQuery;
               }
               /** @type {Array} */
               results = [];
               /** @type {number} */
               _i = 0;
               _len = xs.length;
               for (;_len > _i;_i++) {
                 x = xs[_i];
                 /** @type {Array} */
                 results = results.concat(req.getLeafNodes(x, xs.length));
               }
               return args.e = results, req.send([args]);
             };
           }(this),
           applyChanged : function(req) {
             return function(dataAndEvents, rawParams, deepDataAndEvents, ignoreMethodDoesntExist) {
               var messages;
               var i;
               var len;
               var args;
               var data;
               if (rawParams.length > 0 && !document.body.className.match(/\bvds-entrytext\b/)) {
                 if (!req.gruser.hasSid()) {
                   /** @type {number} */
                   req.pageLoaded = +Date.now();
                   req.trackPageView(2);
                 }
                 args = {
                   u : req.gruser.vid(),
                   s : req.gruser.sid(),
                   t : "imp",
                   tm : +Date.now(),
                   ptm : req.pageLoaded,
                   d : location.host,
                   p : req.currentPath
                 };
                 if (req.currentQuery.length > 0) {
                   args.q = req.currentQuery;
                 }
                 /** @type {Array} */
                 messages = [];
                 /** @type {number} */
                 i = 0;
                 len = rawParams.length;
                 for (;len > i;i++) {
                   data = rawParams[i];
                   /** @type {Array} */
                   messages = messages.concat(req.getLeafNodes(data, data.length));
                 }
                 if (args.e = messages, messages.length > 0) {
                   return cmd.push(args), 0 > n ? req.sendQueue() : (req.queueTimeout && clearTimeout(req.queueTimeout), req.queueTimeout = setTimeout(function() {
                     return req.sendQueue();
                   }, 2E3), n -= 1);
                 }
               }
             };
           }(this)
         }, node = new exports.Client(document.body, options);
       }, $.prototype.sendQueue = function() {
         return cmd.length > 0 && this.send(cmd), this.queueTimeout = null, cmd = [], n = 3;
       }, $.prototype.getLeafNodes = function(data, dataAndEvents) {
         var args;
         var root;
         var r;
         var space;
         var obj;
         var e;
         var a;
         var item;
         var options;
         if (r = [], e = true, data.leaf) {
           if (1 === data.nodeType) {
             if ((null != (a = data.attributes) ? a.href : void 0) || null != data.text) {
               obj = this.nodeMessage(data, true);
               if (dataAndEvents > 1) {
                 obj.idx = data.idx;
               }
               r.push(obj);
             }
           }
         } else {
           item = data.childNodes;
           /** @type {number} */
           root = 0;
           space = item.length;
           for (;space > root;root++) {
             args = item[root];
             if (!args.leaf) {
               /** @type {boolean} */
               e = false;
             }
             /** @type {Array} */
             r = r.concat(this.getLeafNodes(args, data.childNodes.length));
           }
           if (e) {
             if (null != (options = data.attributes) ? options.any : void 0) {
               data.text = dom.parentOfLeafText(data);
               if (data.childNodes.length > 0) {
                 if (data.childNodes[0].idx) {
                   data.idx = data.childNodes[0].idx;
                 }
               }
               obj = this.nodeMessage(data, false);
               r.push(obj);
             }
           }
         }
         return r;
       }, $.prototype.nodeMessage = function(obj, recurring) {
         var a;
         var data;
         var l;
         var tree;
         return data = {
           x : obj.path
         }, (null != (l = obj.text) ? l.length : void 0) > 0 && (data.v = null != (tree = obj.text) ? tree.slice(0, 40) : void 0), (a = obj.attributes) && (a.href && (0 !== a.href.indexOf("javascript") && (data.h = dom.normalizePath(a.href.slice(0, 320)), delete obj.attributes.href))), obj.idx && (data.idx = obj.idx), data;
       }, $.prototype.registerEventListener = function() {
         var __mutation_summary_node_map_id__;
         var on;
         var attrName;
         var event;
         var handler;
         var events;
         var unwatches;
         var res;
         var name;
         var tagName;
         var result;
         events = {
           click : "clck",
           change : "chng",
           submit : "sbmt"
         };
         result = {
           tspan : 1,
           text : 1,
           g : 1,
           rect : 1,
           path : 1,
           defs : 1,
           clipPath : 1,
           desc : 1,
           title : 1
         };
         /** @type {Array} */
         attrName = ["TEXTAREA", "HTML", "BODY"];
         /** @type {Array} */
         name = ["button", "submit"];
         /** @type {Array} */
         tagName = ["A", "BUTTON", "INPUT", "IMG"];
         /** @type {Array} */
         res = ["radio", "checkbox"];
         /** @type {string} */
         __mutation_summary_node_map_id__ = "__mutation_summary_node_map_id__";
         /**
          * @param {HTMLElement} el
          * @param {string} ev
          * @param {?} f
          * @return {?}
          */
         on = function(el, ev, f) {
           return el.addEventListener ? el.addEventListener(ev, f, true) : el.attachEvent ? el.attachEvent("on" + ev, f) : el["on" + ev] = f;
         };
         handler = function(self) {
           return function(e) {
             var data;
             var selector;
             var i;
             var temp_path;
             var baseName;
             var elem;
             var l;
             var options;
             var v;
             var src;
             var content;
             var test;
             var node;
             var y;
             if (!document.body.className.match(/\bvds-entrytext\b/)) {
               node = e.target || e.srcElement;
               for (;node && (1 === result[node.tagName] && node.parentNode);) {
                 node = node.parentNode;
               }
               if (test = node.tagName, "click" === e.type) {
                 if (-1 !== dom.indexOf(attrName, test)) {
                   return;
                 }
                 if ("INPUT" === test && -1 === dom.indexOf(name, node.type)) {
                   return;
                 }
                 if (-1 === dom.indexOf(tagName, test) && (!child.isLeaf(node) && !child.isParentOfLeaf(node))) {
                   return;
                 }
               }
               if (self.gruser.hasSid() || (self.pageLoaded = +Date.now(), self.trackPageView(2)), options = {}, options.u = self.gruser.vid(), options.s = self.gruser.sid(), options.t = events[e.type], options.tm = +Date.now(), options.ptm = self.pageLoaded, options.d = window.location.host, options.p = self.currentPath, self.currentQuery.length > 0 && (options.q = self.currentQuery),
               data = {}, data.x = child.path(node), (-1 !== data.x.indexOf("/dl") || (-1 !== data.x.indexOf("/tr") || -1 !== data.x.indexOf("/li"))) && (data.idx = child.index(node)), dom.hasAttr(node, "href") && (selector = node.getAttribute("href"), selector && (data.h = dom.normalizePath(selector.slice(0, 320)))), "click" === e.type && child.isLeaf(node)) {
                 if ("IMG" === test) {
                   if (-1 === (null != (src = node.src) ? src.indexOf("data:image") : void 0)) {
                     data.h = node.src;
                   }
                   if (node.alt) {
                     data.v = node.alt;
                   } else {
                     if (data.h) {
                       baseName = data.h.split("?")[0];
                       temp_path = baseName.split("/");
                       if (temp_path.length > 0) {
                         data.v = temp_path[temp_path.length - 1];
                       }
                     }
                   }
                 } else {
                   if ("INPUT" === test) {
                     data.v = node.value;
                   } else {
                     if (null != node.textContent) {
                       y = node.textContent.trim();
                       if (y.length > 0) {
                         if (y.length < 50) {
                           data.v = y;
                         }
                       }
                     } else {
                       if (null != node.innerText) {
                         y = node.innerText.trim();
                         if (y.length > 0 && y.length < 50) {
                           data.v = y;
                         } else {
                           if ("A" === test) {
                             data.v = y.slice(0, 30);
                           }
                         }
                       }
                     }
                   }
                 }
               } else {
                 if ("change" === e.type && ("TEXTAREA" !== test && ("INPUT" === test && -1 !== dom.indexOf(res, node.type) || "SELECT" === test))) {
                   data.v = node.value;
                 } else {
                   if ("submit" === e.type) {
                     content = node.getElementsByTagName("input");
                     /** @type {number} */
                     i = 0;
                     l = content.length;
                     for (;l > i;i++) {
                       elem = content[i];
                       if ("search" === elem.type || "text" === elem.type && ("q" === elem.id || (-1 !== elem.id.indexOf("search") || (-1 !== elem.className.indexOf("search") || ("q" === elem.name || -1 !== elem.name.indexOf("search")))))) {
                         data.x = child.path(elem);
                         data.v = elem.value.trim();
                       }
                     }
                   } else {
                     if ("click" === e.type) {
                       if (child.isParentOfLeaf(node)) {
                         v = dom.parentOfLeafText(node);
                         if (v.length > 0 && v.length < 50) {
                           data.v = v;
                         } else {
                           if (0 === v.length) {
                             if ("A" === test) {
                               v = node.innerText.trim();
                               if (v.length > 0) {
                                 if (v.length < 50) {
                                   data.v = v;
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
               return options.e = [data], self.send([options]);
             }
           };
         }(this);
         /** @type {Array} */
         unwatches = [];
         for (event in events) {
           unwatches.push(on(document, event, handler));
         }
         return unwatches;
       }, $.prototype.visitMessage = function() {
         var key;
         var data;
         data = {
           ai : window.vds.accountId,
           av : parent,
           b : "Web",
           u : this.gruser.vid(),
           s : this.gruser.sid(),
           t : "vst",
           tm : +Date.now(),
           sh : window.screen.height,
           sw : window.screen.width,
           d : window.location.host,
           p : this.currentPath,
           rf : document.referrer
         };
         if (this.currentQuery.length > 0) {
           data.q = this.currentQuery;
         }
         for (key in window.grcs) {
           data[key] = window.grcs[key];
         }
         return data;
       }, $.prototype.trackPageView = function(expectedNumberOfNonCommentArgs) {
         var param;
         var cached;
         var params;
         if (null == expectedNumberOfNonCommentArgs) {
           /** @type {number} */
           expectedNumberOfNonCommentArgs = 0;
         }
         /** @type {Array} */
         cached = [];
         cached.push(this.visitMessage());
         if (null == this.pageLoaded) {
           /** @type {number} */
           this.pageLoaded = +Date.now();
         }
         params = {
           u : this.gruser.vid(),
           s : this.gruser.sid(),
           tl : document.title.slice(0, 255),
           t : "page",
           tm : this.pageLoaded,
           pt : window.location.protocol.substring(0, window.location.protocol.length - 1),
           d : window.location.host,
           p : this.currentPath,
           rf : document.referrer
         };
         if (this.currentQuery.length > 0) {
           params.q = this.currentQuery;
         }
         for (param in window.grcs) {
           params[param] = window.grcs[param];
         }
         return expectedNumberOfNonCommentArgs > 0 && (params.fl = expectedNumberOfNonCommentArgs), cached.push(params), this.send(cached);
       }, $.prototype.registerCircleHandler = function() {
         var bulk;
         try {
           if (window.self !== window.top) {
             return this.messagingObserver = new $col;
           }
         } catch (fn) {
           bulk = fn;
         }
       }, $.prototype.registerHistoryHandler = function() {
         var _pushState;
         var _replaceState;
         return _pushState = window.history.pushState, _replaceState = window.history.replaceState, null != _pushState && (window.history.pushState = function(dataAndEvents) {
           return function() {
             return dataAndEvents.prevUrl = window.location.toString(), _pushState.apply(window.history, arguments), dataAndEvents.pageChanged();
           };
         }(this)), null != _replaceState && (window.history.replaceState = function(dataAndEvents) {
           return function() {
             return dataAndEvents.prevUrl = window.location.toString(), _replaceState.apply(window.history, arguments), dataAndEvents.pageChanged();
           };
         }(this)), null != _pushState && (this.prevUrl = document.referrer, "function" == typeof Object.defineProperty && Object.defineProperty(document, "referrer", {
           get : function(dataAndEvents) {
             return function() {
               return dataAndEvents.prevUrl;
             };
           }(this),
           configurable : true
         }), dom.bind(window, "popstate", this.pageChanged, true)), window.vds.hashtag ? dom.bind(window, "hashchange", this.pageChanged, true) : void 0;
       }, $.prototype.pageChanged = function() {
         var i;
         var j;
         var sendPageLoad;
         return i = dom.path(), j = dom.query(), this.currentPath !== i || this.currentQuery !== j ? (window.vds.hashtag && (this.prevUrl = window.location.protocol + "//" + window.location.host + this.currentPath + this.currentQuery), this.currentPath = i, this.currentQuery = j, this.pageLoaded = +Date.now(), this.trackPageView(1), null != (sendPageLoad = this.messagingObserver) ? sendPageLoad.sendPageLoad() : void 0) : void 0;
       }, $.prototype.domLoadedHandler = function(dataAndEvents) {
         return this.domLoadedHandler.done ? void 0 : (this.domLoadedHandler.done = true, this.registerEventListener(), null != exports && (window.vds.imp && setTimeout(function(dataAndEvents) {
           return function() {
             return dataAndEvents.registerDomObserver();
           };
         }(this), 1E3)), window.history.pushState && this.registerHistoryHandler(), this.registerCircleHandler());
       }, $.prototype.blind = function() {
         var t;
         return t = false, window.vds.sampling && (window.vds.sampling_func.call(this, this.gruser) || (t = true)), t;
       }, $.prototype.observe = function(dataAndEvents) {
         var throttler;
         var fn;
         var n;
         if (this.gruser = child.user(), this.blind()) {
           return void this.registerCircleHandler();
         }
         if (this.send = dataAndEvents, this.currentPath = dom.path(), this.currentQuery = dom.query(), this.trackPageView(), document.addEventListener) {
           if ("interactive" === document.readyState || "complete" === document.readyState) {
             this.domLoadedHandler();
           } else {
             dom.bind(document, "DOMContentLoaded", function(dataAndEvents) {
               return function() {
                 return dataAndEvents.domLoadedHandler();
               };
             }(this));
           }
         } else {
           if (document.attachEvent) {
             dom.bind(document, "onreadystatechange", function(dataAndEvents) {
               return function() {
                 return dataAndEvents.domLoadedHandler();
               };
             }(this));
             /** @type {boolean} */
             n = false;
             try {
               /** @type {boolean} */
               n = null === window.frameElement;
             } catch (tmp) {
               fn = tmp;
             }
             if (document.documentElement.doScroll) {
               if (n) {
                 (throttler = function(dataAndEvents) {
                   return function() {
                     try {
                       document.documentElement.doScroll("left");
                     } catch (tmp) {
                       return fn = tmp, void setTimeout(throttler, 1);
                     }
                     return dataAndEvents.domLoadedHandler();
                   };
                 }(this))();
               }
             }
           }
         }
         return dom.bind(window, "load", function(dataAndEvents) {
           return function() {
             return dataAndEvents.domLoadedHandler();
           };
         }(this)), dom.bind(window, "beforeunload", function(dataAndEvents) {
           return function(deepDataAndEvents) {
             var a;
             var b;
             if (dataAndEvents.queueTimeout) {
               dataAndEvents.sendQueue();
             }
             /** @type {number} */
             b = +Date.now();
             /** @type {number} */
             a = b + 300;
             for (;a > b;) {
               /** @type {number} */
               b = +Date.now();
             }
           };
         }(this));
       }, $;
     }();
     module.exports = JsDiff;
   }, {
     "./info" : 5,
     "./messaging_observer" : 7,
     "./utils" : 10,
     json2 : 12,
     "mutation-observer" : 1,
     "tree-mirror" : 14
   }],
   4 : [function(dataAndEvents, module, deepDataAndEvents) {
     var init;
     /**
      * @return {?}
      */
     init = function() {
       var sectionLength;
       return sectionLength = (new Date).getTime(), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(y) {
         var x;
         var i;
         return x = (sectionLength + 16 * Math.random()) % 16 | 0, sectionLength = Math.floor(sectionLength / 16), i = "x" === y ? x : 3 & x | 8, i.toString(16);
       });
     };
     /** @type {function (): ?} */
     module.exports = init;
   }, {}],
   5 : [function(converter, module, dataAndEvents) {
     var U;
     var View;
     var rreturn;
     var docCookies;
     var s;
     var throttledUpdate;
     var node;
     var cookieName;
     var dojo;
     throttledUpdate = converter("./guid");
     docCookies = converter("cookie");
     dojo = converter("./utils");
     /** @type {RegExp} */
     rreturn = /(^| )(clear|clearfix|active|hover|enabled|hidden|display|focus|disabled|ng-|growing-)[^\. ]*/g;
     /** @type {RegExp} */
     s = /\.?([a-zA-Z0-9\-]+\.[a-zA-Z]{2,6})$/;
     View = function() {
       /**
        * @param {Element} elem
        * @return {undefined}
        */
       function next(elem) {
         var oldClasses;
         var ret;
         /** @type {Element} */
         this.node = elem;
         this.name = elem.tagName.toLowerCase();
         oldClasses = null != (ret = elem.getAttribute("class")) ? ret.replace(rreturn, "").trim() : void 0;
         if ((null != oldClasses ? oldClasses.length : void 0) > 0) {
           this.klass = oldClasses.split(/\s+/).sort();
         }
         if (dojo.hasAttr(elem, "id")) {
           if (null === elem.getAttribute("id").match(/^[0-9]/)) {
             this.id = elem.getAttribute("id");
           }
         }
         if (dojo.hasAttr(elem, "href")) {
           this.href = elem.getAttribute("href");
         }
       }
       return next.prototype.path = function() {
         var i;
         var name;
         var ln;
         var path;
         var configList;
         if (path = "/" + this.name, null != this.id && (path += "#" + this.id), null != this.klass) {
           configList = this.klass;
           /** @type {number} */
           i = 0;
           ln = configList.length;
           for (;ln > i;i++) {
             name = configList[i];
             path += "." + name;
           }
         }
         return path;
       }, next;
     }();
     U = function() {
       /**
        * @return {undefined}
        */
       function _fn() {
         /** @type {null} */
         this.userId = null;
         /** @type {null} */
         this.sessionId = null;
         /** @type {null} */
         this.lastSessionId = null;
         this.cookieDomain();
       }
       return _fn.prototype.cookieDomain = function() {
         var namespaces;
         if (!this.grCookieDomain) {
           try {
             /** @type {Array.<string>} */
             namespaces = window.location.hostname.split(".");
             /** @type {string} */
             this.grCookieDomain = 2 === namespaces.length ? "." + namespaces.join(".") : namespaces.length >= 3 && "com" === namespaces[namespaces.length - 2] ? "." + namespaces.slice(-3).join(".") : "." + namespaces.slice(-2).join(".");
           } catch (e) {
             /** @type {string} */
             this.grCookieDomain = window.location.hostname;
           }
         }
         return this.grCookieDomain;
       }, _fn.prototype.vid = function() {
         return null != this.userId ? this.userId : (this.userId = docCookies.getItem("gr_user_id"), this.userId || (this.userId = throttledUpdate(), docCookies.setItem("gr_user_id", this.userId, 94608E3, "/", this.cookieDomain())), this.userId);
       }, _fn.prototype.hasSid = function() {
         var lastSessionId;
         var lastUpdated;
         return lastUpdated = +Date.now(), null != this.sessionId && (null != this.lastUpdated && lastUpdated - this.lastUpdated < 9E5) ? true : (lastSessionId = docCookies.getItem("gr_session_id"), lastSessionId && lastSessionId === this.lastSessionId);
       }, _fn.prototype.sid = function() {
         var lastUpdated;
         return lastUpdated = +Date.now(), null != this.sessionId && (null != this.lastUpdated && lastUpdated - this.lastUpdated < 6E4) ? this.sessionId : (this.sessionId = docCookies.getItem("gr_session_id"), this.sessionId ? docCookies.setItem("gr_session_id", this.sessionId, 1800, "/", this.cookieDomain()) : (this.sessionId = throttledUpdate(), docCookies.setItem("gr_session_id", this.sessionId, 1800, "/", this.cookieDomain())), this.lastUpdated = lastUpdated, this.lastSessionId = this.sessionId,
         this.sessionId);
       }, _fn;
     }();
     /** @type {Array} */
     cookieName = ["TR", "LI", "DL"];
     node = {
       /**
        * @return {?}
        */
       user : function() {
         return new U;
       },
       /**
        * @param {?} name
        * @return {?}
        */
       path : function(name) {
         var view;
         var p;
         var a;
         var el;
         /** @type {string} */
         p = "";
         view = new View(name);
         for (;"body" !== view.name && ("html" !== view.name && (a = view.path(), p = a + p, el = view.node.parentNode, el && el.tagName));) {
           view = new View(el);
         }
         return p;
       },
       /**
        * @param {(number|string)} next
        * @return {?}
        */
       index : function(next) {
         var i;
         var index;
         var l;
         var el;
         var node;
         var parent;
         var siblings;
         /** @type {(number|string)} */
         node = next;
         for (;node && ("BODY" !== node.tagName && -1 === dojo.indexOf(cookieName, node.tagName));) {
           node = node.parentNode;
         }
         if (node) {
           parent = node.parentNode;
           /** @type {number} */
           index = 1;
           siblings = parent.childNodes;
           /** @type {number} */
           i = 0;
           l = siblings.length;
           for (;l > i;i++) {
             if (el = siblings[i], el.tagName === node.tagName) {
               if (el === node) {
                 return index;
               }
               index += 1;
             }
           }
         }
       },
       /**
        * @param {Element} node
        * @return {?}
        */
       isLeaf : function(node) {
         var child;
         var i;
         var len;
         var nodes;
         if (node.hasChildNodes()) {
           nodes = node.childNodes;
           /** @type {number} */
           i = 0;
           len = nodes.length;
           for (;len > i;i++) {
             if (child = nodes[i], 1 === child.nodeType) {
               return false;
             }
           }
         }
         return true;
       },
       /**
        * @param {Element} childNode
        * @return {?}
        */
       isParentOfLeaf : function(childNode) {
         var child;
         var i;
         var l;
         var children;
         if (!childNode.childNodes) {
           return false;
         }
         children = childNode.childNodes;
         /** @type {number} */
         i = 0;
         l = children.length;
         for (;l > i;i++) {
           if (child = children[i], !node.isLeaf(child)) {
             return false;
           }
         }
         return true;
       }
     };
     module.exports = node;
   }, {
     "./guid" : 4,
     "./utils" : 10,
     cookie : 11
   }],
   6 : [function($sanitize, dataAndEvents, deepDataAndEvents) {
     var safe;
     var value;
     var wrapper;
     var listener;
     var dbname;
     var elm;
     var event;
     var _len;
     var _ref;
     var db;
     /** @type {function (this:(Array.<T>|string|{length: number}), *=, *=): Array.<T>} */
     var __slice = [].slice;
     $sanitize("./shim");
     value = $sanitize("./tracker");
     safe = $sanitize("./dom_observer");
     db = new value;
     /**
      * @return {?}
      */
     wrapper = function() {
       var applyArgs;
       var s;
       return s = arguments[0], applyArgs = 2 <= arguments.length ? __slice.call(arguments, 1) : [], db[s].apply(db, applyArgs);
     };
     if (null == window._vds) {
       /** @type {Array} */
       window._vds = [["setAccountId", "22222-22222-22222-22222"]];
     }
     _ref = window._vds;
     /** @type {number} */
     event = 0;
     _len = _ref.length;
     for (;_len > event;event++) {
       listener = _ref[event];
       wrapper.apply(null, listener);
     }
     window._vds = {
       /** @type {function (): ?} */
       push : wrapper
     };
     elm = new safe;
     /**
      * @param {Object} node
      * @return {?}
      */
     dbname = function(node) {
       return elm.observe(node);
     };
     db.connect(dbname);
   }, {
     "./dom_observer" : 3,
     "./shim" : 8,
     "./tracker" : 9
   }],
   7 : [function(makeIterator, module, dataAndEvents) {
     var JsDiff;
     var callback;
     /**
      * @param {Function} fn
      * @param {?} me
      * @return {?}
      */
     var __bind = function(fn, me) {
       return function() {
         return fn.apply(me, arguments);
       };
     };
     callback = makeIterator("./utils");
     JsDiff = function() {
       /**
        * @return {undefined}
        */
       function Console() {
         this.sendPageLoad = __bind(this.sendPageLoad, this);
         this.allowOrigin = window.vds.origin;
         this.bindEvents();
         this.sendPageLoad();
       }
       return Console.prototype.bindEvents = function() {
         return callback.bind(window, "message", function(self) {
           return function(event) {
             var state;
             if (state = event.data, event.origin === self.allowOrigin && state.ai === window.vds.accountId) {
               switch(state.mode) {
                 case "load-plugin":
                   return self.loadPlugin();
                 case "circle-mode":
                   return self.startCircle();
                 case "browse-mode":
                   return self.stopCircle();
               }
             }
           };
         }(this));
       }, Console.prototype.sendPageLoad = function() {
         var data;
         return data = {
           circleMode : "page-load",
           url : window.location.toString(),
           ai : window.vds.accountId,
           ht : window.vds.hashtag
         }, parent.postMessage(data, "*"), this.pluginLoaded ? setTimeout(function() {
           return "undefined" != typeof CircleEvents && null !== CircleEvents ? CircleEvents.publish("circle:load") : void 0;
         }, 200) : void 0;
       }, Console.prototype.loadPlugin = function() {
         var s;
         var newCss;
         var node;
         var linkEl;
         var i;
         var selector;
         var path;
         var ev;
         var _len;
         var _len2;
         var scripts;
         var _ref;
         var srcFile;
         /** @type {boolean} */
         this.pluginLoaded = false;
         /** @type {NodeList} */
         scripts = document.getElementsByTagName("script");
         /** @type {number} */
         path = 0;
         /** @type {number} */
         _len = scripts.length;
         for (;_len > path;path++) {
           if (node = scripts[path], srcFile = node.getAttribute("src"), null != srcFile && -1 !== srcFile.indexOf("/circle-plugin.js")) {
             /** @type {boolean} */
             this.pluginLoaded = true;
             break;
           }
         }
         if (!this.pluginLoaded) {
           /** @type {Element} */
           s = document.createElement("script");
           /** @type {string} */
           s.type = "text/javascript";
           /** @type {string} */
           s.charset = "UTF-8";
           /** @type {string} */
           s.src = this.allowOrigin + "/assets/javascripts/circle-plugin.js";
           document.head.appendChild(s);
           /** @type {Element} */
           newCss = document.createElement("link");
           /** @type {string} */
           newCss.rel = "stylesheet";
           /** @type {string} */
           newCss.href = this.allowOrigin + "/assets/stylesheets/circle-plugin.css";
           document.head.appendChild(newCss);
           /** @type {boolean} */
           i = false;
           /** @type {NodeList} */
           _ref = document.getElementsByTagName("style");
           /** @type {number} */
           ev = 0;
           /** @type {number} */
           _len2 = _ref.length;
           for (;_len2 > ev;ev++) {
             if (node = _ref[ev], selector = node.getAttribute("href"), null != selector && -1 !== selector.indexOf("font-awesome")) {
               /** @type {boolean} */
               i = true;
               break;
             }
           }
           if (!i) {
             return linkEl = document.createElement("link"), linkEl.rel = "stylesheet", linkEl.href = "//cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css", document.head.appendChild(linkEl);
           }
         }
       }, Console.prototype.startCircle = function() {
         var script;
         var length;
         var _len;
         var scripts;
         var srcFile;
         if (!this.pluginLoaded) {
           /** @type {NodeList} */
           scripts = document.getElementsByTagName("script");
           /** @type {number} */
           length = 0;
           /** @type {number} */
           _len = scripts.length;
           for (;_len > length;length++) {
             if (script = scripts[length], srcFile = script.getAttribute("src"), null != srcFile && -1 !== srcFile.indexOf("/circle-plugin.js")) {
               /** @type {boolean} */
               this.pluginLoaded = true;
               break;
             }
           }
         }
         return this.pluginLoaded ? this.publishCircle() : void 0;
       }, Console.prototype.stopCircle = function() {
         return "undefined" != typeof CircleEvents && null !== CircleEvents ? CircleEvents.publish("circle:stop") : void 0;
       }, Console.prototype.publishCircle = function() {
         return "undefined" != typeof CircleEvents && null !== CircleEvents ? CircleEvents.publish("circle:start") : setTimeout(function(dataAndEvents) {
           return function() {
             return dataAndEvents.publishCircle();
           };
         }(this), 2E3);
       }, Console;
     }();
     module.exports = JsDiff;
   }, {
     "./utils" : 10
   }],
   8 : [function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
     if (!Date.now) {
       /**
        * @return {number}
        */
       Date.now = function() {
         return+new Date;
       };
     }
     if (!String.prototype.trim) {
       String.prototype.trim = function() {
         var extractId;
         var trimLeft;
         var r20;
         return trimLeft = /^\s+/, r20 = /\s+$/, extractId = function() {
           return this.replace(trimLeft, "").replace(r20, "");
         };
       }();
     }
   }, {}],
   9 : [function($sanitize, module, dataAndEvents) {
     var raw;
     var ws;
     var JsDiff;
     var className;
     var value;
     var safe;
     var script;
     var match;
     var handler;
     /** @type {function (this:(Array.<T>|string|{length: number}), T, number=): number} */
     var fn = [].indexOf || function(name) {
       /** @type {number} */
       var i = 0;
       var l = this.length;
       for (;l > i;i++) {
         if (i in this && this[i] === name) {
           return i;
         }
       }
       return-1;
     };
     /**
      * @param {Function} fn
      * @param {?} me
      * @return {?}
      */
     var __bind = function(fn, me) {
       return function() {
         return fn.apply(me, arguments);
       };
     };
     value = $sanitize("./guid");
     script = $sanitize("lzstring");
     safe = $sanitize("./info");
     handler = $sanitize("./utils");
     /** @type {(Array.<string>|null)} */
     match = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
     /** @type {(boolean|number)} */
     className = match ? parseInt(match[2], 10) : false;
     if (className && 22 > className) {
       /** @type {boolean} */
       raw = false;
     } else {
       /** @type {boolean} */
       raw = true;
       if (-1 === navigator.userAgent.indexOf("Android") || fn.call(window, "ArrayBufferView") >= 0) {
         if (!(-1 === navigator.userAgent.indexOf("CPU OS 6_"))) {
           if (!(fn.call(window, "ArrayBufferView") >= 0)) {
             /** @type {boolean} */
             raw = false;
           }
         }
       } else {
         /** @type {boolean} */
         raw = false;
       }
     }
     ws = function() {
       /**
        * @param {string} url
        * @param {Function} callback
        * @return {undefined}
        */
       function Request(url, callback) {
         /** @type {string} */
         this.url = url;
         /** @type {Function} */
         this.callback = callback;
         this.send = __bind(this.send, this);
       }
       var e;
       var queue;
       return e = [], queue = [], Request.prototype.connect = function() {
         return "function" == typeof this.callback ? this.callback(this.send) : void 0;
       }, Request.prototype.send = function(data, opt_noCache) {
         var pdataCur;
         var bulk;
         if (null == opt_noCache) {
           /** @type {boolean} */
           opt_noCache = true;
         }
         try {
           return pdataCur = "undefined" != typeof Uint8Array && null !== Uint8Array ? script.compressToUint8Array(JSON.stringify(data)) : script.compressToUTF16(JSON.stringify(data)), this.sendRemote(pdataCur);
         } catch (fn) {
           bulk = fn;
         }
       }, Request.prototype.sendRemote = function(data) {
         var fn;
         var objNext;
         var xhr;
         if (window.XMLHttpRequest) {
           if (xhr = new XMLHttpRequest, "withCredentials" in xhr) {
             return xhr.open("POST", this.url + "?stm=" + +Date.now(), true), xhr.withCredentials = true, xhr.onreadystatechange = function() {
               return{};
             }, xhr.send("undefined" != typeof ArrayBuffer && null !== ArrayBuffer ? raw ? data : data.buffer : data);
           }
           if ("undefined" != typeof XDomainRequest) {
             return xhr = new XDomainRequest, "http:" === document.location.protocol && (this.url = this.url.replace("https://", "http://")), xhr.open("POST", this.url + "?stm=" + +Date.now()), xhr.onload = function(dataAndEvents) {
               return function() {
                 return dataAndEvents.removeXDR(xhr);
               };
             }(this), xhr.onerror = function(dataAndEvents) {
               return function(deepDataAndEvents) {
                 return dataAndEvents.removeXDR(xhr);
               };
             }(this), xhr.onprogress = function() {
               return{};
             }, xhr.ontimeout = function() {
               return{};
             }, xhr.send(data), queue.push(xhr);
           }
         } else {
           if ("undefined" == typeof ActiveXObject || null === ActiveXObject) {
             return objNext = new Image(1, 1), objNext.src = this.url + "?data=" + data + "&stm=" + +Date.now();
           }
           if ("http:" === document.location.protocol) {
             this.url = this.url.replace("https://", "http://");
           }
           /** @type {null} */
           xhr = null;
           try {
             xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");
           } catch (returnFalse) {
             fn = returnFalse;
             try {
               xhr = new ActiveXObject("Msxml2.XMLHTTP.3.0");
             } catch (selector) {
               fn = selector;
               try {
                 xhr = new ActiveXObject("MSXML2.XMLHTTP");
               } catch (tmp) {
                 fn = tmp;
                 /** @type {null} */
                 xhr = null;
               }
             }
           }
           if (xhr) {
             return xhr.open("POST", this.url + "?stm=" + +Date.now(), true), xhr.onreadystatechange = function() {
               return{};
             }, xhr.send(data);
           }
         }
       }, Request.prototype.removeXDR = function(res) {
         var queuelen;
         return queuelen = handler.indexOf(queue, res), -1 !== queuelen ? queue.splice(queuelen, 1) : void 0;
       }, Request;
     }();
     JsDiff = function() {
       /**
        * @return {undefined}
        */
       function self() {
       }
       return self.prototype.scheme = "https://", self.prototype.host = "api.growingio.com", self.prototype.circleHost = ("https:" === document.location.protocol ? "https://" : "http://") + "www.growingio.com", self.prototype.endpoint = "/events", self.prototype.properties = {
         imp : true,
         hashtag : false
       }, self.prototype.customs = {}, self.prototype.defaultSamplingFunc = function(line) {
         var remainder;
         var outputBaseSize;
         var models;
         return models = line.vid(), outputBaseSize = window.vds.sampling_ratio, remainder = parseInt(models.slice(-2), 16) % outputBaseSize, 0 === remainder;
       }, self.prototype.setTrackerHost = function(host) {
         return this.host = host;
       }, self.prototype.setAccountId = function(accountId) {
         return this.properties.accountId = accountId;
       }, self.prototype.setOrigin = function(origin) {
         return "http://liepin.growingio.com" === origin ? this.properties.origin = origin : void 0;
       }, self.prototype.setImp = function(dataAndEvents) {
         return this.properties.imp = dataAndEvents;
       }, self.prototype.setSampling = function(b, n) {
         return null == b && (b = 4), null == n && (n = this.defaultSamplingFunc), this.properties.sampling = true, this.properties.sampling_ratio = b, this.properties.sampling_func = n;
       }, self.prototype.enableHT = function(dataAndEvents) {
         return this.properties.hashtag = dataAndEvents;
       }, self.prototype.set = function(owner, dataAndEvents) {
         return this.properties[owner] = dataAndEvents;
       }, self.prototype.setUserId = function(dataAndEvents) {
         return this.customs.cs1 = "user_id:" + dataAndEvents;
       }, self.prototype.setCS1 = function(otag, ctag) {
         return this.customs.cs1 = otag + ":" + ctag;
       }, self.prototype.setCS2 = function(otag, ctag) {
         return this.customs.cs2 = {}, this.customs.cs2 = otag + ":" + ctag;
       }, self.prototype.setCS3 = function(otag, ctag) {
         return this.customs.cs3 = otag + ":" + ctag;
       }, self.prototype.setCS4 = function(otag, ctag) {
         return this.customs.cs4 = otag + ":" + ctag;
       }, self.prototype.setCS5 = function(otag, ctag) {
         return this.customs.cs5 = otag + ":" + ctag;
       }, self.prototype.setCS6 = function(otag, ctag) {
         return this.customs.cs6 = otag + ":" + ctag;
       }, self.prototype.setCS7 = function(otag, ctag) {
         return this.customs.cs7 = otag + ":" + ctag;
       }, self.prototype.setCS8 = function(otag, ctag) {
         return this.customs.cs8 = otag + ":" + ctag;
       }, self.prototype.setCS9 = function(otag, ctag) {
         return this.customs.cs9 = otag + ":" + ctag;
       }, self.prototype.setCS10 = function(otag, ctag) {
         return this.customs.cs10 = otag + ":" + ctag;
       }, self.prototype.setUid = function() {
         var objNext;
         return objNext = new Image(1, 1), objNext.src = this.getTrackerUrl("/touch");
       }, self.prototype.getTrackerUrl = function(touch) {
         return this.scheme + this.host + touch;
       }, self.prototype.connect = function(dbname) {
         var i;
         var io;
         var segment;
         window.vds = {
           origin : this.circleHost
         };
         window.grcs = {};
         for (i in this.properties) {
           window.vds[i] = this.properties[i];
         }
         for (i in this.customs) {
           window.grcs[i] = this.customs[i];
         }
         return segment = window.navigator.userAgent.toLowerCase(), segment.match(/(bot|crawler|spider|scrapy|jiankongbao|slurp|transcoder)/i) && (window.vds.imp = false), io = new ws(this.getTrackerUrl(this.endpoint), dbname), this.setUid(), io.connect();
       }, self;
     }();
     module.exports = JsDiff;
   }, {
     "./guid" : 4,
     "./info" : 5,
     "./utils" : 10,
     lzstring : 13
   }],
   10 : [function(dataAndEvents, ref, deepDataAndEvents) {
     var arg;
     arg = {
       /**
        * @param {Object} el
        * @param {string} type
        * @param {?} fn
        * @param {boolean} capture
        * @return {?}
        */
       bind : function(el, type, fn, capture) {
         return null == capture && (capture = false), null != document.addEventListener ? el.addEventListener(type, fn, capture) : null != document.attachEvent ? el.attachEvent("on" + type, function() {
           var e;
           return e = window.event, e.currentTarget = el, e.target = e.srcElement, fn.call(el, e);
         }) : el["on" + type] = fn;
       },
       /**
        * @param {Object} element
        * @param {string} attr
        * @return {?}
        */
       hasAttr : function(element, attr) {
         return element.hasAttribute ? element.hasAttribute(attr) : !!element[attr];
       },
       /**
        * @return {?}
        */
       path : function() {
         var hash;
         var path;
         return path = this.normalizePath(window.location.pathname), window.vds.hashtag ? (hash = window.location.hash, path += -1 !== hash.indexOf("?") ? hash.split("?")[0] : hash) : path;
       },
       /**
        * @param {string} path
        * @return {?}
        */
       normalizePath : function(path) {
         var i;
         return i = path.length, i > 1 && "/" === path[i - 1] ? path.slice(0, i - 1) : path;
       },
       /**
        * @return {?}
        */
       query : function() {
         var search;
         return search = window.location.search, search.length > 1 && "?" === search[0] ? search.slice(1) : window.vds.hashtag && -1 !== window.location.hash.indexOf("?") ? window.location.hash.split("?")[1] : search;
       },
       /**
        * @param {Object} value
        * @return {?}
        */
       isEmpty : function(value) {
         var item;
         return function() {
           var itemIndex;
           var ln;
           var cells;
           /** @type {Array} */
           cells = [];
           /** @type {number} */
           itemIndex = 0;
           ln = value.length;
           for (;ln > itemIndex;itemIndex++) {
             item = value[itemIndex];
             cells.push(value.hasOwnProperty(item));
           }
           return cells;
         }() ? false : true;
       },
       /**
        * @param {Node} object
        * @return {?}
        */
       parentOfLeafText : function(object) {
         var node;
         var code;
         var buf;
         var i;
         var len;
         var nodes;
         if (buf = "", !object.childNodes) {
           return "";
         }
         nodes = object.childNodes;
         /** @type {number} */
         i = 0;
         len = nodes.length;
         for (;len > i;i++) {
           node = nodes[i];
           if (3 === node.nodeType) {
             if (null != node.textContent) {
               code = node.textContent.trim();
             } else {
               if (null != node.data) {
                 code = node.data.trim();
               }
             }
             if (code.length > 0) {
               buf += code + " ";
             }
           }
         }
         return buf = buf.trim();
       },
       /**
        * @param {string} name
        * @param {string} o
        * @return {?}
        */
       indexOf : function(name, o) {
         var i;
         var len;
         var part;
         if (null != Array.prototype.indexOf) {
           return name.indexOf(o);
         }
         len = name.length;
         /** @type {number} */
         i = -1;
         for (;++i < len;) {
           if (part = name[i], part === o) {
             return i;
           }
         }
         return-1;
       }
     };
     ref.exports = arg;
   }, {}],
   11 : [function(dataAndEvents, module, deepDataAndEvents) {
     var docCookies = {
       /**
        * @param {string} sKey
        * @return {?}
        */
       getItem : function(sKey) {
         return sKey ? decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null;
       },
       /**
        * @param {string} key
        * @param {?} sKey
        * @param {number} obj
        * @param {boolean} sPath
        * @param {boolean} charset
        * @param {boolean} bSecure
        * @return {?}
        */
       setItem : function(key, sKey, obj, sPath, charset, bSecure) {
         if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
           return false;
         }
         /** @type {string} */
         var q = "";
         if (obj) {
           switch(obj.constructor) {
             case Number:
               /** @type {string} */
               q = obj === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date((new Date).getTime() + 1E3 * obj)).toUTCString();
               break;
             case String:
               /** @type {string} */
               q = "; expires=" + obj;
               break;
             case Date:
               /** @type {string} */
               q = "; expires=" + obj.toUTCString();
           }
         }
         return document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(sKey) + q + (charset ? "; domain=" + charset : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : ""), true;
       },
       /**
        * @param {boolean} sKey
        * @param {boolean} sPath
        * @param {boolean} sDomain
        * @return {?}
        */
       removeItem : function(sKey, sPath, sDomain) {
         return this.hasItem(sKey) ? (document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : ""), true) : false;
       },
       /**
        * @param {boolean} sKey
        * @return {?}
        */
       hasItem : function(sKey) {
         return sKey ? (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie) : false;
       },
       /**
        * @return {?}
        */
       keys : function() {
         /** @type {Array.<string>} */
         var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
         /** @type {number} */
         var cnl = aKeys.length;
         /** @type {number} */
         var key = 0;
         for (;cnl > key;key++) {
           /** @type {string} */
           aKeys[key] = decodeURIComponent(aKeys[key]);
         }
         return aKeys;
       }
     };
     module.exports = docCookies;
   }, {}],
   12 : [function(require, dataAndEvents, deepDataAndEvents) {
     if ("object" != typeof JSON) {
       JSON = {};
     }
     (function() {
       /**
        * @param {number} n
        * @return {?}
        */
       function f(n) {
         return 10 > n ? "0" + n : n;
       }
       /**
        * @return {?}
        */
       function toJSON() {
         return this.valueOf();
       }
       /**
        * @param {string} string
        * @return {?}
        */
       function quote(string) {
         return escapable.lastIndex = 0, escapable.test(string) ? '"' + string.replace(escapable, function(a) {
           var e = events[a];
           return "string" == typeof e ? e : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
         }) + '"' : '"' + string + '"';
       }
       /**
        * @param {string} key
        * @param {Object} holder
        * @return {?}
        */
       function str(key, holder) {
         var i;
         var k;
         var v;
         var length;
         var partial;
         var mind = gap;
         var value = holder[key];
         switch(value && ("object" == typeof value && ("function" == typeof value.toJSON && (value = value.toJSON(key)))), "function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
           case "string":
             return quote(value);
           case "number":
             return isFinite(value) ? String(value) : "null";
           case "boolean":
           ;
           case "null":
             return String(value);
           case "object":
             if (!value) {
               return "null";
             }
             if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
               length = value.length;
               /** @type {number} */
               i = 0;
               for (;length > i;i += 1) {
                 partial[i] = str(i, value) || "null";
               }
               return v = 0 === partial.length ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]", gap = mind, v;
             }
             if (rep && "object" == typeof rep) {
               length = rep.length;
               /** @type {number} */
               i = 0;
               for (;length > i;i += 1) {
                 if ("string" == typeof rep[i]) {
                   k = rep[i];
                   v = str(k, value);
                   if (v) {
                     partial.push(quote(k) + (gap ? ": " : ":") + v);
                   }
                 }
               }
             } else {
               for (k in value) {
                 if (Object.prototype.hasOwnProperty.call(value, k)) {
                   v = str(k, value);
                   if (v) {
                     partial.push(quote(k) + (gap ? ": " : ":") + v);
                   }
                 }
               }
             }
             return v = 0 === partial.length ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}", gap = mind, v;
         }
       }
       /** @type {RegExp} */
       var args = /^[\],:{}\s]*$/;
       /** @type {RegExp} */
       var r20 = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
       /** @type {RegExp} */
       var rreturn = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
       /** @type {RegExp} */
       var rclass = /(?:^|:|,)(?:\s*\[)+/g;
       /** @type {RegExp} */
       var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
       /** @type {RegExp} */
       var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
       if ("function" != typeof Date.prototype.toJSON) {
         /**
          * @return {string}
          */
         Date.prototype.toJSON = function() {
           return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
         };
         /** @type {function (): ?} */
         Boolean.prototype.toJSON = toJSON;
         /** @type {function (): ?} */
         Number.prototype.toJSON = toJSON;
         /** @type {function (): ?} */
         String.prototype.toJSON = toJSON;
       }
       var gap;
       var indent;
       var events;
       var rep;
       if ("function" != typeof JSON.stringify) {
         events = {
           "\b" : "\\b",
           "\t" : "\\t",
           "\n" : "\\n",
           "\f" : "\\f",
           "\r" : "\\r",
           '"' : '\\"',
           "\\" : "\\\\"
         };
         /**
          * @param {*} value
          * @param {(Array.<string>|function (string, *): *|null)=} b
          * @param {(number|string)=} val
          * @return {string}
          */
         JSON.stringify = function(value, b, val) {
           var high;
           if (gap = "", indent = "", "number" == typeof val) {
             /** @type {number} */
             high = 0;
             for (;val > high;high += 1) {
               indent += " ";
             }
           } else {
             if ("string" == typeof val) {
               /** @type {string} */
               indent = val;
             }
           }
           if (rep = b, b && ("function" != typeof b && ("object" != typeof b || "number" != typeof b.length))) {
             throw new Error("JSON.stringify");
           }
           return str("", {
             "" : value
           });
         };
       }
       if ("function" != typeof JSON.parse) {
         /**
          * @param {string} text
          * @param {function (string, *): *=} reviver
          * @return {*}
          */
         JSON.parse = function(text, reviver) {
           /**
            * @param {Object} holder
            * @param {string} key
            * @return {?}
            */
           function walk(holder, key) {
             var k;
             var v;
             var value = holder[key];
             if (value && "object" == typeof value) {
               for (k in value) {
                 if (Object.prototype.hasOwnProperty.call(value, k)) {
                   v = walk(value, k);
                   if (void 0 !== v) {
                     value[k] = v;
                   } else {
                     delete value[k];
                   }
                 }
               }
             }
             return reviver.call(holder, key, value);
           }
           var a;
           if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
             return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
           })), args.test(text.replace(r20, "@").replace(rreturn, "]").replace(rclass, ""))) {
             return a = eval("(" + text + ")"), "function" == typeof reviver ? walk({
               "" : a
             }, "") : a;
           }
           throw new SyntaxError("JSON.parse");
         };
       }
     })();
   }, {}],
   13 : [function(dataAndEvents, module, deepDataAndEvents) {
     var JsDiff = function() {
       /** @type {function (...[number]): string} */
       var fromCode = String.fromCharCode;
       var options = {
         /**
          * @param {string} exposed
          * @return {?}
          */
         compressToUTF16 : function(exposed) {
           return null == exposed ? "" : options._compress(exposed, 15, function(dataAndEvents) {
             return fromCode(dataAndEvents + 32);
           }) + " ";
         },
         /**
          * @param {string} str
          * @return {?}
          */
         compressToUint8Array : function(str) {
           var input = options.compress(str);
           /** @type {Uint8Array} */
           var outputBuffer = new Uint8Array(2 * input.length);
           /** @type {number} */
           var y = 0;
           var x = input.length;
           for (;x > y;y++) {
             var dataLength = input.charCodeAt(y);
             /** @type {number} */
             outputBuffer[2 * y] = dataLength >>> 8;
             /** @type {number} */
             outputBuffer[2 * y + 1] = dataLength % 256;
           }
           return outputBuffer;
         },
         /**
          * @param {string} source
          * @return {?}
          */
         compress : function(source) {
           return options._compress(source, 16, function(opt_e) {
             return fromCode(opt_e);
           });
         },
         /**
          * @param {string} source
          * @param {number} opt_attributes
          * @param {Function} require
          * @return {?}
          */
         _compress : function(source, opt_attributes, require) {
           if (null == source) {
             return "";
           }
           var n;
           var el;
           var pos;
           var a = {};
           var scripts = {};
           /** @type {string} */
           var length = "";
           /** @type {string} */
           var start = "";
           /** @type {string} */
           var i = "";
           /** @type {number} */
           var right = 2;
           /** @type {number} */
           var val = 3;
           /** @type {number} */
           var exponent = 2;
           /** @type {Array} */
           var rulesets = [];
           /** @type {number} */
           var paths = 0;
           /** @type {number} */
           var v = 0;
           /** @type {number} */
           pos = 0;
           for (;pos < source.length;pos += 1) {
             if (length = source.charAt(pos), Object.prototype.hasOwnProperty.call(a, length) || (a[length] = val++, scripts[length] = true), start = i + length, Object.prototype.hasOwnProperty.call(a, start)) {
               /** @type {string} */
               i = start;
             } else {
               if (Object.prototype.hasOwnProperty.call(scripts, i)) {
                 if (i.charCodeAt(0) < 256) {
                   /** @type {number} */
                   n = 0;
                   for (;exponent > n;n++) {
                     paths <<= 1;
                     if (v == opt_attributes - 1) {
                       /** @type {number} */
                       v = 0;
                       rulesets.push(require(paths));
                       /** @type {number} */
                       paths = 0;
                     } else {
                       v++;
                     }
                   }
                   /** @type {number} */
                   el = i.charCodeAt(0);
                   /** @type {number} */
                   n = 0;
                   for (;8 > n;n++) {
                     /** @type {number} */
                     paths = paths << 1 | 1 & el;
                     if (v == opt_attributes - 1) {
                       /** @type {number} */
                       v = 0;
                       rulesets.push(require(paths));
                       /** @type {number} */
                       paths = 0;
                     } else {
                       v++;
                     }
                     el >>= 1;
                   }
                 } else {
                   /** @type {number} */
                   el = 1;
                   /** @type {number} */
                   n = 0;
                   for (;exponent > n;n++) {
                     /** @type {number} */
                     paths = paths << 1 | el;
                     if (v == opt_attributes - 1) {
                       /** @type {number} */
                       v = 0;
                       rulesets.push(require(paths));
                       /** @type {number} */
                       paths = 0;
                     } else {
                       v++;
                     }
                     /** @type {number} */
                     el = 0;
                   }
                   /** @type {number} */
                   el = i.charCodeAt(0);
                   /** @type {number} */
                   n = 0;
                   for (;16 > n;n++) {
                     /** @type {number} */
                     paths = paths << 1 | 1 & el;
                     if (v == opt_attributes - 1) {
                       /** @type {number} */
                       v = 0;
                       rulesets.push(require(paths));
                       /** @type {number} */
                       paths = 0;
                     } else {
                       v++;
                     }
                     el >>= 1;
                   }
                 }
                 right--;
                 if (0 == right) {
                   /** @type {number} */
                   right = Math.pow(2, exponent);
                   exponent++;
                 }
                 delete scripts[i];
               } else {
                 el = a[i];
                 /** @type {number} */
                 n = 0;
                 for (;exponent > n;n++) {
                   /** @type {number} */
                   paths = paths << 1 | 1 & el;
                   if (v == opt_attributes - 1) {
                     /** @type {number} */
                     v = 0;
                     rulesets.push(require(paths));
                     /** @type {number} */
                     paths = 0;
                   } else {
                     v++;
                   }
                   el >>= 1;
                 }
               }
               right--;
               if (0 == right) {
                 /** @type {number} */
                 right = Math.pow(2, exponent);
                 exponent++;
               }
               /** @type {number} */
               a[start] = val++;
               /** @type {string} */
               i = String(length);
             }
           }
           if ("" !== i) {
             if (Object.prototype.hasOwnProperty.call(scripts, i)) {
               if (i.charCodeAt(0) < 256) {
                 /** @type {number} */
                 n = 0;
                 for (;exponent > n;n++) {
                   paths <<= 1;
                   if (v == opt_attributes - 1) {
                     /** @type {number} */
                     v = 0;
                     rulesets.push(require(paths));
                     /** @type {number} */
                     paths = 0;
                   } else {
                     v++;
                   }
                 }
                 /** @type {number} */
                 el = i.charCodeAt(0);
                 /** @type {number} */
                 n = 0;
                 for (;8 > n;n++) {
                   /** @type {number} */
                   paths = paths << 1 | 1 & el;
                   if (v == opt_attributes - 1) {
                     /** @type {number} */
                     v = 0;
                     rulesets.push(require(paths));
                     /** @type {number} */
                     paths = 0;
                   } else {
                     v++;
                   }
                   el >>= 1;
                 }
               } else {
                 /** @type {number} */
                 el = 1;
                 /** @type {number} */
                 n = 0;
                 for (;exponent > n;n++) {
                   /** @type {number} */
                   paths = paths << 1 | el;
                   if (v == opt_attributes - 1) {
                     /** @type {number} */
                     v = 0;
                     rulesets.push(require(paths));
                     /** @type {number} */
                     paths = 0;
                   } else {
                     v++;
                   }
                   /** @type {number} */
                   el = 0;
                 }
                 /** @type {number} */
                 el = i.charCodeAt(0);
                 /** @type {number} */
                 n = 0;
                 for (;16 > n;n++) {
                   /** @type {number} */
                   paths = paths << 1 | 1 & el;
                   if (v == opt_attributes - 1) {
                     /** @type {number} */
                     v = 0;
                     rulesets.push(require(paths));
                     /** @type {number} */
                     paths = 0;
                   } else {
                     v++;
                   }
                   el >>= 1;
                 }
               }
               right--;
               if (0 == right) {
                 /** @type {number} */
                 right = Math.pow(2, exponent);
                 exponent++;
               }
               delete scripts[i];
             } else {
               el = a[i];
               /** @type {number} */
               n = 0;
               for (;exponent > n;n++) {
                 /** @type {number} */
                 paths = paths << 1 | 1 & el;
                 if (v == opt_attributes - 1) {
                   /** @type {number} */
                   v = 0;
                   rulesets.push(require(paths));
                   /** @type {number} */
                   paths = 0;
                 } else {
                   v++;
                 }
                 el >>= 1;
               }
             }
             right--;
             if (0 == right) {
               /** @type {number} */
               right = Math.pow(2, exponent);
               exponent++;
             }
           }
           /** @type {number} */
           el = 2;
           /** @type {number} */
           n = 0;
           for (;exponent > n;n++) {
             /** @type {number} */
             paths = paths << 1 | 1 & el;
             if (v == opt_attributes - 1) {
               /** @type {number} */
               v = 0;
               rulesets.push(require(paths));
               /** @type {number} */
               paths = 0;
             } else {
               v++;
             }
             el >>= 1;
           }
           for (;;) {
             if (paths <<= 1, v == opt_attributes - 1) {
               rulesets.push(require(paths));
               break;
             }
             v++;
           }
           return rulesets.join("");
         }
       };
       return options;
     }();
     module.exports = JsDiff;
   }, {}],
   14 : [function($sanitize, dataAndEvents, exports) {
     MutationSummary = $sanitize("mutation-summary");
     var build = {
       SCRIPT : 1,
       STYLE : 1,
       NOSCRIPT : 1,
       IFRAME : 1,
       BR : 1,
       FONT : 1,
       SVG : 1,
       CANVAS : 1,
       svg : 1,
       canvas : 1,
       tspan : 1,
       text : 1,
       g : 1,
       rect : 1,
       path : 1,
       defs : 1,
       clipPath : 1,
       desc : 1,
       title : 1
     };
     /** @type {Array} */
     var $ = ["TR", "LI", "DL"];
     /** @type {RegExp} */
     var rtypenamespace = /^(clear|clearfix|active|hover|enabled|hidden|display|focus|disabled|ng-|growing-)/;
     /** @type {Array} */
     var unsupported = ["button", "submit"];
     var Client = function() {
       /**
        * @param {string} node
        * @param {?} n
        * @param {?} elems
        * @return {undefined}
        */
       function f(node, n, elems) {
         var errors = this;
         /** @type {string} */
         this.target = node;
         this.mirror = n;
         /** @type {number} */
         this.nextId = 1;
         this.knownNodes = new MutationSummary.NodeMap;
         /** @type {Array} */
         var assigns = [];
         var child = node.firstChild;
         for (;child;child = child.nextSibling) {
           var vvar = this.serializeNode(child, true);
           if (null !== vvar) {
             assigns.push(vvar);
           }
         }
         this.mirror.initialize(assigns);
         /** @type {Array} */
         var ret = [{
           element : "*"
         }, {
           attribute : "data-growing-title"
         }];
         if (elems) {
           /** @type {Array} */
           ret = ret.concat(elems);
         }
         this.mutationSummary = new MutationSummary({
           rootNode : node,
           /**
            * @param {Array} err
            * @return {undefined}
            */
           callback : function(err) {
             errors.applyChanged(err);
           },
           queries : ret
         });
       }
       return f.prototype.disconnect = function() {
         if (this.mutationSummary) {
           this.mutationSummary.disconnect();
           this.mutationSummary = void 0;
         }
       }, f.prototype.rememberNode = function(owner) {
         /** @type {number} */
         var dataAndEvents = this.nextId++;
         return this.knownNodes.set(owner, dataAndEvents), dataAndEvents;
       }, f.prototype.forgetNode = function(deepDataAndEvents) {
         this.knownNodes["delete"](deepDataAndEvents);
       }, f.prototype.serializeNode = function(elem, dataAndEvents, path, regex) {
         if (null === elem) {
           return null;
         }
         if (1 === build[elem.tagName]) {
           return null;
         }
         if (void 0 === path) {
           /** @type {string} */
           path = "/";
           var el = elem.parentElement;
           for (;el && ("BODY" !== el.tagName && "HTML" !== el.tagName);) {
             /** @type {string} */
             var prefix = "/" + el.tagName.toLowerCase();
             var element = el.getAttribute("id");
             if (element && (null === element.match(/^[0-9]/) && (prefix += "#" + element)), el.hasAttribute("class")) {
               var types = el.getAttribute("class").trim().split(/\s+/).sort();
               /** @type {number} */
               var j = 0;
               for (;j < types.length;j++) {
                 if (types[j].length > 0) {
                   if (null === rtypenamespace.exec(types[j])) {
                     prefix += "." + types[j];
                   }
                 }
               }
             }
             /** @type {string} */
             path = prefix + path;
             el = el.parentElement;
           }
         }
         var queue = this.knownNodes.get(elem);
         if ("undefined" == typeof queue) {
           queue = this.rememberNode(elem);
         }
         var data = {
           nodeType : elem.nodeType,
           node_id : queue
         };
         switch(data.nodeType) {
           case 10:
             /** @type {Object} */
             var o = elem;
             data.name = o.name;
             data.publicId = o.publicId;
             data.systemId = o.systemId;
             break;
           case 8:
             return null;
           case 3:
             if ("/" === path || 0 === elem.textContent.trim().length) {
               return null;
             }
             data.textContent = elem.textContent.trim();
             if (data.textContent.length > 0) {
               /** @type {boolean} */
               data.leaf = true;
               data.text = data.textContent;
               data.path = path.slice(0, -1);
             }
             break;
           case 1:
             if ("none" === window.getComputedStyle(elem).display && ("A" !== elem.tagName && null === elem.querySelector("a"))) {
               return null;
             }
             /** @type {Object} */
             var node = elem;
             if (data.tagName = node.tagName, data.attributes = {
               any : node.hasAttributes()
             }, path += node.tagName.toLowerCase(), node.hasAttribute("id") && (null === node.getAttribute("id").match(/^[0-9]/) && (path += "#" + node.getAttribute("id"))), node.hasAttribute("class")) {
               types = node.getAttribute("class").trim().split(/\s+/).sort();
               /** @type {number} */
               j = 0;
               for (;j < types.length;j++) {
                 if (types[j].length > 0) {
                   if (null === rtypenamespace.exec(types[j])) {
                     path += "." + types[j];
                   }
                 }
               }
             }
             if (node.hasAttribute("href")) {
               data.attributes.href = node.getAttribute("href");
             }
             var m;
             /** @type {boolean} */
             var b = true;
             if (path += "/", dataAndEvents) {
               if (node.childNodes.length > 0) {
                 if (data.childNodes = [], node.hasAttribute("growing-ignore")) {
                   return null;
                 }
                 /** @type {number} */
                 var r20 = 0;
                 var child = node.firstChild;
                 for (;child;child = child.nextSibling) {
                   if (1 !== child.nodeType || !child.hasAttribute("growing-ignore")) {
                     if (-1 !== $.indexOf(child.tagName)) {
                       r20 += 1;
                     }
                     var top;
                     if (top = r20 > 0 ? this.serializeNode(child, true, path, r20) : this.serializeNode(child, true, path, regex), null === top) {
                       /** @type {boolean} */
                       b = false;
                     } else {
                       if ("undefined" != typeof top.childNodes) {
                         /** @type {boolean} */
                         b = false;
                         /** @type {boolean} */
                         m = true;
                         /** @type {number} */
                         var i = 0;
                         for (;i < top.childNodes.length;i++) {
                           if (top.childNodes[i].tagName) {
                             /** @type {boolean} */
                             m = false;
                             break;
                           }
                         }
                         if (m) {
                           if (regex) {
                             /** @type {number} */
                             top.idx = regex;
                           }
                         }
                         data.childNodes.push(top);
                       } else {
                         if ((0 === node.offsetWidth || 0 === node.offsetHeight) && "A" !== node.tagName) {
                           return null;
                         }
                         if (top.leaf) {
                           if (regex) {
                             /** @type {number} */
                             top.idx = regex;
                           }
                           data.childNodes.push(top);
                         }
                       }
                     }
                   }
                 }
               } else {
                 /** @type {Array} */
                 data.childNodes = [];
               }
             } else {
               if (node.hasChildNodes()) {
                 /** @type {boolean} */
                 var key = true;
                 /** @type {number} */
                 j = 0;
                 for (;j < node.childNodes.length;j++) {
                   if (1 === node.childNodes[j].nodeType && (b = false, node.childNodes[j].hasChildNodes())) {
                     /** @type {number} */
                     i = 0;
                     for (;i < node.childNodes[j].childNodes.length;i++) {
                       if (1 === node.childNodes[j].childNodes[i].nodeType) {
                         /** @type {boolean} */
                         key = false;
                         break;
                       }
                     }
                   }
                 }
                 if (!b && (data.parent_of_leaf = key, key)) {
                   /** @type {string} */
                   var content = "";
                   /** @type {string} */
                   var fileContent = "";
                   /** @type {number} */
                   j = 0;
                   for (;j < node.childNodes.length;j++) {
                     if (3 === node.childNodes[j].nodeType) {
                       fileContent = node.childNodes[j].textContent.trim();
                       if (fileContent.length > 0) {
                         content += fileContent + " ";
                       }
                     }
                   }
                   /** @type {string} */
                   content = content.trim();
                   if (content.length > 0) {
                     /** @type {string} */
                     data.text = content;
                   }
                 }
               }
               if (-1 !== path.indexOf("/dl") || (-1 !== path.indexOf("/tr") || -1 !== path.indexOf("/li"))) {
                 var current = node;
                 for (;current && ("BODY" !== current.tagName && -1 === $.indexOf(current.tagName));) {
                   current = current.parentNode;
                 }
                 if (current) {
                   var k;
                   var valsLength;
                   var target;
                   var parent = current.parentNode;
                   /** @type {number} */
                   var idx = 1;
                   /** @type {number} */
                   k = 0;
                   valsLength = parent.childNodes.length;
                   for (;valsLength > k;k++) {
                     target = parent.childNodes[k];
                     if (target.tagName === current.tagName) {
                       if (target === current) {
                         /** @type {number} */
                         data.idx = idx;
                       }
                       idx += 1;
                     }
                   }
                 }
               }
             }
             if (b) {
               if (data.leaf = true, "IMG" === node.tagName) {
                 if (node.src && (-1 === node.src.indexOf("data:image") && (data.attributes.href = node.src)), node.alt) {
                   data.text = node.alt;
                 } else {
                   if (data.attributes.href) {
                     var baseName = data.attributes.href.split("?")[0];
                     if (baseName) {
                       var parts = baseName.split("/");
                       if (parts.length > 0) {
                         data.text = parts[parts.length - 1];
                       }
                     }
                   }
                 }
               } else {
                 if ("INPUT" === node.tagName && -1 !== unsupported.indexOf(node.type)) {
                   data.text = node.value;
                 } else {
                   var text = node.textContent.trim();
                   if (0 === text.length && ("I" !== node.tagName && "A" !== node.tagName)) {
                     return null;
                   }
                   data.text = text;
                 }
               }
             }
             /** @type {string} */
             data.path = path.slice(0, -1);
         }
         return data;
       }, f.prototype.serializeAddedAndMoved = function(array, children, target) {
         var rquickExpr = this;
         var targets = array.concat(children).concat(target);
         if (0 === targets.length) {
           return[];
         }
         var acc = new MutationSummary.NodeMap;
         var _instances = {};
         targets.forEach(function(node) {
           if (node) {
             /** @type {boolean} */
             _instances[acc.nodeId(node)] = true;
           }
         });
         /** @type {Array} */
         var matched = [];
         targets.forEach(function(elem) {
           if (elem && 1 !== build[elem.tagName]) {
             var node = elem.parentNode;
             if (node && !_instances[acc.nodeId(node)]) {
               var item = node.getAttribute("id");
               var field = node.getAttribute("class");
               var el = elem.getAttribute("class");
               if (!item || -1 === item.toLowerCase().indexOf("clock") && -1 === item.toLowerCase().indexOf("countdown")) {
                 if (!field || -1 === field.toLowerCase().indexOf("clock") && -1 === field.toLowerCase().indexOf("countdown")) {
                   if (node.getAttribute("data-countdown")) {
                   } else {
                     if (el && -1 !== el.indexOf("daterangepicker")) {
                     } else {
                       if (elem.hasAttribute("growing-ignore")) {
                       } else {
                         for (;node && ("BODY" !== node.tagName && !node.hasAttribute("growing-ignore"));) {
                           node = node.parentNode;
                         }
                         if ("BODY" === node.tagName) {
                           matched.push(elem);
                         }
                       }
                     }
                   }
                 } else {
                 }
               } else {
               }
             }
           }
         });
         /** @type {Array} */
         var eventPath = [];
         return matched.forEach(function(selector) {
           var r20 = void 0;
           /** @type {Object} */
           var b = selector;
           for (;b && ("BODY" !== b.tagName && -1 === $.indexOf(b.tagName));) {
             b = b.parentNode;
           }
           if (b && "BODY" !== b.tagName) {
             var parent = b.parentNode;
             /** @type {number} */
             var index = 1;
             var a = parent.childNodes[index - 1];
             for (;index <= parent.childNodes.length;index++) {
               if (a.tagName === b.tagName && a === b) {
                 /** @type {number} */
                 r20 = index;
                 break;
               }
             }
           }
           var cur = rquickExpr.serializeNode(selector, true, void 0, r20);
           if (null !== cur) {
             eventPath.push(cur);
           }
         }), delete _instances, delete matched, eventPath;
       }, f.prototype.serializeValueChanges = function(failures) {
         var rhtml = this;
         var api = new MutationSummary.NodeMap;
         return failures.forEach(function(elem) {
           var node = api.get(elem);
           if (!node) {
             node = rhtml.serializeNode(elem);
             api.set(elem, node);
           }
         }), api.keys().map(function(elem) {
           return api.get(elem);
         });
       }, f.prototype.applyChanged = function(a) {
         var result = this;
         var data = a[0];
         var items = data.added;
         var node = a[1];
         setTimeout(function() {
           var ret = result.serializeAddedAndMoved(items, [], []);
           if (node.valueChanged && node.valueChanged.length > 0) {
             var elems = result.serializeValueChanges(node.valueChanged);
             if (elems) {
               if (elems.length > 0) {
                 ret = ret.concat(elems);
               }
             }
           }
           result.mirror.applyChanged([], ret);
         }, 10);
         data.removed.forEach(function(deepDataAndEvents) {
           result.forgetNode(deepDataAndEvents);
         });
       }, f;
     }();
     exports.Client = Client;
   }, {
     "mutation-summary" : 2
   }]
 }, {}, [6]);
