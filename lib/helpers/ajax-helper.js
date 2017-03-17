"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockWebSocket {
    constructor(url, protocol) {
        this.url = url;
        this.protocol = protocol;
        this.sent = [];
        this.handlers = {};
        this.readyState = 0;
        MockWebSocket.sockets.push(this);
    }
    static get lastSocket() {
        const socket = MockWebSocket.sockets;
        const length = socket.length;
        return length > 0 ? socket[length - 1] : undefined;
    }
    static clearSockets() {
        MockWebSocket.sockets.length = 0;
    }
    send(data) {
        this.sent.push(data);
    }
    get lastMessageSent() {
        const sent = this.sent;
        const length = sent.length;
        return length > 0 ? sent[length - 1] : undefined;
    }
    triggerClose(e) {
        this.readyState = 3;
        this.trigger('close', e);
    }
    triggerError(err) {
        this.readyState = 3;
        this.trigger('error', err);
    }
    triggerMessage(data) {
        const messageEvent = {
            data: data,
            origin: 'mockorigin',
            ports: undefined,
            source: __root__,
        };
        this.trigger('message', messageEvent);
    }
    open() {
        this.readyState = 1;
        this.trigger('open', {});
    }
    close(code, reason) {
        if (this.readyState < 2) {
            this.readyState = 2;
            this.closeCode = code;
            this.closeReason = reason;
            this.triggerClose({ wasClean: true });
        }
    }
    addEventListener(name, handler) {
        const lookup = this.handlers[name] = this.handlers[name] || [];
        lookup.push(handler);
    }
    removeEventListener(name, handler) {
        const lookup = this.handlers[name];
        if (lookup) {
            for (let i = lookup.length - 1; i--;) {
                if (lookup[i] === handler) {
                    lookup.splice(i, 1);
                }
            }
        }
    }
    trigger(name, e) {
        if (this['on' + name]) {
            this['on' + name](e);
        }
        const lookup = this.handlers[name];
        if (lookup) {
            for (let i = 0; i < lookup.length; i++) {
                lookup[i](e);
            }
        }
    }
}
MockWebSocket.sockets = [];
exports.MockWebSocket = MockWebSocket;
class MockXMLHttpRequest {
    constructor() {
        this.responseType = '';
        this.eventHandlers = [];
        this.readyState = 0;
        this.requestHeaders = {};
        this.withCredentials = false;
        this.previousRequest = MockXMLHttpRequest.recentRequest;
        MockXMLHttpRequest.recentRequest = this;
        MockXMLHttpRequest.requests.push(this);
    }
    static get mostRecent() {
        return MockXMLHttpRequest.recentRequest;
    }
    static get allRequests() {
        return MockXMLHttpRequest.requests;
    }
    static clearRequest() {
        MockXMLHttpRequest.requests.length = 0;
        MockXMLHttpRequest.recentRequest = null;
    }
    send(data) {
        this.data = data;
    }
    open(method, url, async, user, password) {
        this.method = method;
        this.url = url;
        this.user = user;
        this.password = password;
        this.readyState = 1;
        this.triggerEvent('readyStateChange');
    }
    setRequestHeader(key, value) {
        this.requestHeaders[key] = value;
    }
    addEventListener(name, handler) {
        this.eventHandlers.push({ name: name, handler: handler });
    }
    removeEventListener(name, handler) {
        for (let i = this.eventHandlers.length - 1; i--;) {
            let eh = this.eventHandlers[i];
            if (eh.name === name && eh.handler === handler) {
                this.eventHandlers.splice(i, 1);
            }
        }
    }
    throwError(err) {
        // TODO: something better with errors
        this.triggerEvent('error');
    }
    respondWith(response) {
        this.readyState = 4;
        this.responseHeaders = {
            'Content-Type': response.contentType || 'text/plain'
        };
        this.status = response.status || 200;
        this.responseText = response.responseText;
        if (!('response' in response)) {
            switch (this.responseType) {
                case 'json':
                    try {
                        this.response = JSON.parse(response.responseText);
                    }
                    catch (err) {
                        throw new Error('unable to JSON.parse: \n' + response.responseText);
                    }
                    break;
                case 'text':
                    this.response = response.responseText;
                    break;
                default:
                    throw new Error('unhandled type "' + this.responseType + '"');
            }
        }
        // TODO: pass better event to onload.
        this.triggerEvent('load');
        this.triggerEvent('readystatechange');
    }
    triggerEvent(name, eventObj) {
        // TODO: create a better default event
        const e = eventObj || {};
        if (this['on' + name]) {
            this['on' + name](e);
        }
        this.eventHandlers.forEach(function (eh) {
            if (eh.name === name) {
                eh.handler.call(this, e);
            }
        });
    }
}
MockXMLHttpRequest.requests = [];
exports.MockXMLHttpRequest = MockXMLHttpRequest;
