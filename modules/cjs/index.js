"use strict";

function _interopDefault(e) {
    return e && "object" == typeof e && "default" in e ? e.default : e
}

Object.defineProperty(exports, "__esModule", {value: !0});
var md5 = _interopDefault(require("md5")),
    qs = _interopDefault(require("query-string")),
    urlJoin = _interopDefault(require("url-join")), __assign = function () {
        return (__assign = Object.assign || function (e) {
            for (var t, n = 1, o = arguments.length; n < o; n++) for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        }).apply(this, arguments)
    };

function __awaiter(e, t, n, o) {
    return new (n || (n = Promise))((function (a, r) {
        function i(e) {
            try {
                d(o.next(e))
            } catch (e) {
                r(e)
            }
        }

        function s(e) {
            try {
                d(o.throw(e))
            } catch (e) {
                r(e)
            }
        }

        function d(e) {
            var t;
            e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                e(t)
            }))).then(i, s)
        }

        d((o = o.apply(e, t || [])).next())
    }))
}

function __generator(e, t) {
    var n, o, a, r, i = {
        label: 0, sent: function () {
            if (1 & a[0]) throw a[1];
            return a[1]
        }, trys: [], ops: []
    };
    return r = {
        next: s(0),
        throw: s(1),
        return: s(2)
    }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
        return this
    }), r;

    function s(r) {
        return function (s) {
            return function (r) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; i;) try {
                    if (n = 1, o && (a = 2 & r[0] ? o.return : r[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, r[1])).done) return a;
                    switch (o = 0, a && (r = [2 & r[0], a.value]), r[0]) {
                        case 0:
                        case 1:
                            a = r;
                            break;
                        case 4:
                            return i.label++, {value: r[1], done: !1};
                        case 5:
                            i.label++, o = r[1], r = [0];
                            continue;
                        case 7:
                            r = i.ops.pop(), i.trys.pop();
                            continue;
                        default:
                            if (!(a = i.trys, (a = a.length > 0 && a[a.length - 1]) || 6 !== r[0] && 2 !== r[0])) {
                                i = 0;
                                continue
                            }
                            if (3 === r[0] && (!a || r[1] > a[0] && r[1] < a[3])) {
                                i.label = r[1];
                                break
                            }
                            if (6 === r[0] && i.label < a[1]) {
                                i.label = a[1], a = r;
                                break
                            }
                            if (a && i.label < a[2]) {
                                i.label = a[2], i.ops.push(r);
                                break
                            }
                            a[2] && i.ops.pop(), i.trys.pop();
                            continue
                    }
                    r = t.call(e, i)
                } catch (e) {
                    r = [6, e], o = 0
                } finally {
                    n = a = 0
                }
                if (5 & r[0]) throw r[1];
                return {value: r[0] ? r[1] : void 0, done: !0}
            }([r, s])
        }
    }
}

var ServerStatus, clientAuthHash = function (e, t) {
        return void 0 === t && (t = ("object" == typeof window ? window.CLIENT_AUTH_SECRET : global.CLIENT_AUTH_SECRET) || process.env.REACT_APP_CLIENT_AUTH_SECRET || process.env.WEB_EXT_CLIENT_AUTH_SECRET || process.env.CLIENT_AUTH_SECRET || "952b4412f002315aa50751032fcaab03"), md5("" + t + e)
    }, getMandatoryParams = function (e) {
        var t = Math.round((new Date).getTime() / 1e3).toString();
        return {
            client_auth_hash: clientAuthHash(t).toString(),
            session_auth_hash: e,
            time: t
        }
    }, prepLoginForm = function (e) {
        var t = e.username, n = e.password, o = e.sessionType, a = e.twoFACode,
            r = getMandatoryParams(), i = {
                username: t,
                password: n,
                time: r.time,
                client_auth_hash: r.client_auth_hash,
                session_type_id: o
            };
        a && (i["2fa_code"] = a);
        var s = function (e) {
            return Object.entries(e).map((function (e) {
                var t = e[0], n = e[1];
                return encodeURIComponent(t) + "=" + encodeURIComponent(n)
            })).join("&")
        };
        return {
            body: s(i),
            protectedBody: s(__assign(__assign({}, i), {password: n && n.length > 0 ? "xxxx" : "no_set"}))
        }
    }, globalConfig = {
        apiUrl: process.env.API_URL,
        assetsUrl: process.env.ASSETS_URL,
        backupApiUrl: process.env.BACKUP_API_URL,
        backupAssetsUrl: process.env.BACKUP_ASSETS_URL,
        sessionAuthHash: null,
        sessionType: null,
        dispatch: null,
        platform: null,
        apiCallMinInterval: process.env.API_CALL_MIN_INTERVAL || "1000"
    }, setConfig = function (e) {
        globalConfig = __assign(__assign({}, globalConfig), e)
    }, getConfig = function () {
        return globalConfig
    }, prepareValidUrl = function (e) {
        var t, n = e.url, o = e.assets, a = void 0 !== o && o, r = e.useBackup,
            i = void 0 !== r && r, s = getConfig(), d = s.assetsUrl, u = s.apiUrl,
            c = s.backupApiUrl, l = s.backupAssetsUrl,
            p = new RegExp(/^http|ftp|file:\/\//gim);
        return p.test(n) ? n : (t = i ? a ? l : c : a ? d : u, p.test(n) || n.startsWith("/") ? !p.test(n) && n.startsWith("/") ? t + n : void 0 : t + "/" + n)
    }, _fetch = "function" == typeof fetch ? fetch : require("node-fetch"),
    sendRequest = function (e) {
        var t = e.endpoint, n = e.debugOpts, o = void 0 === n ? {} : n,
            a = e.opts, r = void 0 === a ? {} : a, i = e.method,
            s = void 0 === i ? "get" : i, d = e.assets, u = void 0 !== d && d;
        return __awaiter(void 0, void 0, Promise, (function () {
            var e, n, a, i, d, c;
            return __generator(this, (function (l) {
                switch (l.label) {
                    case 0:
                        e = 7331, n = __assign(__assign({}, r.params), {platform: getConfig().platform}), a = r.method ? r : __assign(__assign({}, r), {method: s}), i = function (r) {
                            return void 0 === r && (r = !1), __awaiter(void 0, void 0, void 0, (function () {
                                var i, s, d, c, l, p, f, g, _, v, h, m, A, C, b;
                                return __generator(this, (function (w) {
                                    switch (w.label) {
                                        case 0:
                                            if (i = getConfig(), s = i.lastCallTimeStamps, d = void 0 === s ? {} : s, c = i.apiCallMinInterval, l = r && t.includes("ExtBlocklists") ? __assign(__assign({}, n), {domain: "totallyacdn.com"}) : n, p = prepareValidUrl({
                                                url: t,
                                                assets: u,
                                                useBackup: r
                                            }), f = p + "?" + qs.stringify(l), g = p, global.url = g, (_ = Number(c) - (null !== (b = Date.now() - d[t]) && void 0 !== b ? b : 0)) > 0 && !r) throw{
                                                code: e,
                                                message: "Last call to " + t + " less than " + c + "ms ago. Call aborted. Retry in " + _ + "ms",
                                                debug: {
                                                    debugUrl: g,
                                                    debugOpts: o,
                                                    lastCallTimeStamps: d,
                                                    timeToNextCall: _
                                                },
                                                data: {
                                                    debugUrl: g,
                                                    debugOpts: o,
                                                    lastCallTimeStamps: d,
                                                    timeToNextCall: _
                                                }
                                            };
                                            w.label = 1;
                                        case 1:
                                            return w.trys.push([1, 3, , 4]), setConfig({lastCallTimeStamps: __assign(__assign({}, d), (C = {}, C[t] = Date.now(), C))}), v = new AbortController, setTimeout((function () {
                                                return v.abort()
                                            }), 3e3), h = {
                                                headers: a.headers,
                                                method: a.method,
                                                body: a.body,
                                                signal: v.signal
                                            }, [4, fetch(f, h)];
                                        case 2:
                                            if (404 === (m = w.sent()).status) throw{
                                                code: m.status,
                                                message: m.statusText,
                                                debug: {
                                                    debugUrl: g,
                                                    debugOpts: o
                                                },
                                                data: {
                                                    debugUrl: g,
                                                    debugOpts: o
                                                }
                                            };
                                            return [2, m];
                                        case 3:
                                            throw A = w.sent(), console.error(A), {
                                                code: 0,
                                                message: "Error fetching url. " + A.message,
                                                debug: {
                                                    debugUrl: g,
                                                    debugOpts: o
                                                },
                                                data: {
                                                    debugUrl: g,
                                                    debugOpts: o
                                                }
                                            };
                                        case 4:
                                            return [2]
                                    }
                                }))
                            }))
                        }, l.label = 1;
                    case 1:
                        return l.trys.push([1, 3, , 9]), [4, i()];
                    case 2:
                        return [2, c = l.sent()];
                    case 3:
                        return d = l.sent(), console.error(d.message), c = void 0, d.code !== e ? [3, 6] : [4, new Promise((function (e) {
                            return setTimeout(e, d.data.timeToNextCall)
                        }))];
                    case 4:
                        return l.sent(), [4, i()];
                    case 5:
                        return c = l.sent(), [3, 8];
                    case 6:
                        return [4, i(!0)];
                    case 7:
                        c = l.sent(), l.label = 8;
                    case 8:
                        return [2, c];
                    case 9:
                        return [2]
                }
            }))
        }))
    }, noop = function () {
    }, dispatcher = function (e) {
        var t = e.getConfig, n = e.dispatch, o = e.actionCreator, a = e.data;
        return n ? n(o(a)) : t && t().dispatch ? t().dispatch(o(a)) : noop()
    }, createSessionErrorAndDispatchAction = function (e) {
        var t = {code: 1337, message: "No session auth hash in API"};
        return e && dispatcher({actionCreator: e, data: t}), t
    }, parseResponse = function (e) {
        var t = e.response, n = e.debug, o = void 0 === n ? null : n;
        return __awaiter(void 0, void 0, void 0, (function () {
            var e, n, a, r;
            return __generator(this, (function (i) {
                switch (i.label) {
                    case 0:
                        if (!(t.status >= 500)) return [3, 1];
                        throw{
                            code: t.status,
                            message: t.statusText,
                            debug: o,
                            data: o
                        };
                    case 1:
                        return "application/x-ns-proxy-autoconfig" !== t.headers.get("content-type") ? [3, 3] : [4, t.text()];
                    case 2:
                        if (0 === (e = i.sent()).length) throw{
                            code: 500,
                            message: "Empty response from API",
                            debug: o,
                            data: o
                        };
                        return [3, 5];
                    case 3:
                        return [4, t.json().then((function (e) {
                            return e
                        })).catch((function () {
                            return {
                                errorCode: 707,
                                errorMessage: "Suspicious activity detected from your network. Please try again soon",
                                errorDescription: "Suspicious activity detected from your network",
                                logStatus: null
                            }
                        }))];
                    case 4:
                        if (e = i.sent(), 0 === Object.keys(e).length) throw n = 0, t.status > 0 && (n = t.status), {
                            code: n,
                            message: "Empty response from API",
                            debug: o,
                            data: o
                        };
                        if (e.errorCode || !e.data) throw a = e.errorCode || "No error code present", r = e.errorMessage || "No error message present", {
                            code: a,
                            message: r,
                            debug: o,
                            data: JSON.stringify(e)
                        };
                        i.label = 5;
                    case 5:
                        return [2, e]
                }
            }))
        }))
    }, request = function (e) {
        var t = e.method, n = e.endpoint, o = e.opts, a = void 0 === o ? {} : o,
            r = e.debugOpts, i = void 0 === r ? {} : r, s = e.actionCreators,
            d = s.successfulReduxAction, u = s.failedReduxAction,
            c = s.loadingReduxAction, l = e.assets, p = void 0 !== l && l;
        return __awaiter(void 0, void 0, void 0, (function () {
            var e, o, r;
            return __generator(this, (function (s) {
                switch (s.label) {
                    case 0:
                        return s.trys.push([0, 3, , 4]), c && dispatcher({
                            getConfig: getConfig,
                            actionCreator: c
                        }), [4, sendRequest({
                            endpoint: n,
                            debugOpts: i,
                            opts: a,
                            method: t,
                            assets: p,
                            actionCreators: {}
                        })];
                    case 1:
                        return e = s.sent(), [4, parseResponse({
                            response: e,
                            debug: {
                                response: e,
                                debugOpts: i,
                                endpoint: n,
                                url: global.url
                            }
                        })];
                    case 2:
                        return o = s.sent(), d && dispatcher({
                            actionCreator: d,
                            data: o
                        }), [2, o];
                    case 3:
                        if ((r = s.sent()).code = r.code || 0, !u) throw r;
                        return dispatcher({actionCreator: u, data: r}), [3, 4];
                    case 4:
                        return [2]
                }
            }))
        }))
    }, get = function (e) {
        var t = e.endpoint, n = e.params, o = e.actionCreators,
            a = void 0 === o ? {} : o;
        return __awaiter(void 0, void 0, void 0, (function () {
            var e;
            return __generator(this, (function (o) {
                switch (o.label) {
                    case 0:
                        if (!(e = getConfig().sessionAuthHash)) throw createSessionErrorAndDispatchAction(a.failedReduxAction);
                        return [4, request({
                            method: "get",
                            endpoint: t,
                            opts: {params: __assign(__assign({}, n), getMandatoryParams(e))},
                            actionCreators: a
                        })];
                    case 1:
                        return [2, o.sent()]
                }
            }))
        }))
    }, post = function (e) {
        var t = e.endpoint, n = e.params, o = e.actionCreators,
            a = void 0 === o ? {} : o;
        return __awaiter(void 0, void 0, void 0, (function () {
            var e, o, r, i;
            return __generator(this, (function (s) {
                switch (s.label) {
                    case 0:
                        return e = getConfig().sessionAuthHash, o = __assign(__assign({}, n), getMandatoryParams(e)), r = qs.stringify(o), [4, request({
                            method: "post",
                            endpoint: t,
                            opts: i = {
                                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                body: r
                            },
                            debugOpts: __assign({}, i),
                            actionCreators: a
                        })];
                    case 1:
                        return [2, s.sent()]
                }
            }))
        }))
    }, put = function (e) {
        var t = e.endpoint, n = e.params, o = e.actionCreators,
            a = void 0 === o ? {} : o;
        return __awaiter(void 0, void 0, void 0, (function () {
            var e, o, r;
            return __generator(this, (function (i) {
                switch (i.label) {
                    case 0:
                        if (!(e = getConfig().sessionAuthHash)) throw createSessionErrorAndDispatchAction(a.failedReduxAction);
                        return o = __assign(__assign({}, n), getMandatoryParams(e)), r = qs.stringify(o), [4, request({
                            method: "put",
                            endpoint: t,
                            opts: {
                                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                body: r
                            },
                            actionCreators: a
                        })];
                    case 1:
                        return [2, i.sent()]
                }
            }))
        }))
    }, del = function (e) {
        var t = e.endpoint, n = e.params, o = e.actionCreators,
            a = void 0 === o ? {} : o;
        return __awaiter(void 0, void 0, void 0, (function () {
            var e;
            return __generator(this, (function (o) {
                switch (o.label) {
                    case 0:
                        if (!(e = getConfig().sessionAuthHash)) throw createSessionErrorAndDispatchAction(a.failedReduxAction);
                        return [4, request({
                            method: "delete",
                            endpoint: t,
                            opts: {params: __assign(__assign({}, n), getMandatoryParams(e))},
                            actionCreators: a
                        })];
                    case 1:
                        return [2, o.sent()]
                }
            }))
        }))
    }, api = Object.freeze({
        __proto__: null,
        prepLoginForm: prepLoginForm,
        request: request,
        get: get,
        delete: del,
        put: put,
        post: post,
        dispatcher: dispatcher,
        sendRequest: sendRequest,
        setConfig: setConfig,
        getConfig: getConfig
    }), sessionTypes = {web: 1, ext: 2, desktop: 3, mobile: 4},
    accountStates = {active: 1, outOfData: 2, banned: 3},
    codes = Object.freeze({
        __proto__: null,
        sessionTypes: sessionTypes,
        accountStates: accountStates
    }), createEndpointMap = function (e) {
        var t = e.api, n = e.endpoints, o = void 0 === n ? {} : n;
        return Object.entries(o).reduce((function (e, n) {
            var o = n[0], a = n[1];
            return "function" == typeof a && (e[o] = a(t)), e
        }), {})
    }, createInstance = function (e) {
        var t = e.conf, n = void 0 === t ? {} : t, o = e.endpoints,
            a = void 0 === o ? {} : o, r = __assign(__assign({}, globalConfig), n);
        return setConfig(r), __assign(__assign(__assign({}, api), {codes: codes}), createEndpointMap({
            api: api,
            endpoints: a
        }))
    }, endpoint = "/Notifications", Notifications = function (e) {
        return {
            get: function (t) {
                var n = void 0 === t ? {} : t, o = n.successfulReduxAction,
                    a = void 0 === o ? null : o, r = n.failedReduxAction,
                    i = void 0 === r ? null : r, s = n.loadingReduxAction,
                    d = void 0 === s ? null : s;
                return __awaiter(this, void 0, void 0, (function () {
                    var t;
                    return __generator(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return [4, e.get({
                                    endpoint: endpoint,
                                    params: {},
                                    actionCreators: {
                                        successfulReduxAction: a,
                                        failedReduxAction: i,
                                        loadingReduxAction: d
                                    }
                                })];
                            case 1:
                                return t = n.sent(), a && e.dispatcher(__assign({
                                    actionCreator: a,
                                    data: t.data
                                }, e)), [2, t.data]
                        }
                    }))
                }))
            }
        }
    }, endpoint$1 = "/Session", Session = function (e) {
        return {
            login: function (t) {
                var n = t.username, o = t.password, a = t.sessionType,
                    r = t.twoFACode, i = t.successfulReduxAction,
                    s = void 0 === i ? null : i, d = t.failedReduxAction,
                    u = void 0 === d ? null : d, c = t.loadingReduxAction,
                    l = void 0 === c ? null : c;
                return __awaiter(this, void 0, void 0, (function () {
                    var t, i, d, c, p;
                    return __generator(this, (function (f) {
                        switch (f.label) {
                            case 0:
                                return [4, e.prepLoginForm({
                                    username: n,
                                    password: o,
                                    sessionType: "true" === process.env.WEB_EXT_ENABLE_2FA_TESTING ? 1 : a,
                                    twoFACode: r
                                })];
                            case 1:
                                return t = f.sent(), i = t.body, d = t.protectedBody, c = {
                                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                    body: i
                                }, [4, e.request({
                                    method: "post",
                                    endpoint: endpoint$1,
                                    opts: c,
                                    debugOpts: {protectedBody: d},
                                    actionCreators: {
                                        failedReduxAction: u,
                                        loadingReduxAction: l
                                    }
                                })];
                            case 2:
                                return p = f.sent(), s && e.dispatcher({
                                    actionCreator: s,
                                    data: p.data
                                }), [2, p.data]
                        }
                    }))
                }))
            }, get: function (t) {
                var n = void 0 === t ? {} : t, o = n.params,
                    a = void 0 === o ? {} : o, r = n.successfulReduxAction,
                    i = void 0 === r ? null : r, s = n.failedReduxAction,
                    d = void 0 === s ? null : s, u = n.loadingReduxAction,
                    c = void 0 === u ? null : u;
                return __awaiter(this, void 0, void 0, (function () {
                    var t;
                    return __generator(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return [4, e.get({
                                    endpoint: endpoint$1,
                                    params: a,
                                    actionCreators: {
                                        failedReduxAction: d,
                                        loadingReduxAction: c
                                    }
                                })];
                            case 1:
                                return t = n.sent(), i && e.dispatcher({
                                    actionCreator: i,
                                    data: t.data
                                }), [2, t.data]
                        }
                    }))
                }))
            }
        }
    }, endpoint$2 = "/ServerCredentials", ServerCredentials = function (e) {
        return {
            get: function (t) {
                var n = void 0 === t ? {} : t, o = n.successfulReduxAction,
                    a = void 0 === o ? null : o, r = n.failedReduxAction,
                    i = void 0 === r ? null : r, s = n.loadingReduxAction,
                    d = void 0 === s ? null : s;
                return __awaiter(this, void 0, void 0, (function () {
                    var t, n;
                    return __generator(this, (function (o) {
                        switch (o.label) {
                            case 0:
                                return [4, e.get({
                                    endpoint: endpoint$2,
                                    params: {},
                                    actionCreators: {
                                        failedReduxAction: i,
                                        loadingReduxAction: d
                                    }
                                })];
                            case 1:
                                return t = o.sent(), n = {
                                    username: window.atob(t.data.username),
                                    password: window.atob(t.data.password)
                                }, a && e.dispatcher(__assign({
                                    actionCreator: a,
                                    data: n
                                }, e)), [2, n]
                        }
                    }))
                }))
            }
        }
    };
!function (e) {
    e[e.OFFLINE = 1] = "OFFLINE", e[e.ONLINE = 2] = "ONLINE"
}(ServerStatus || (ServerStatus = {}));
var ServerList = function (e) {
    return {
        get: function (t) {
            var n = t.type, o = t.premium, a = t.revision, r = t.alc,
                i = void 0 === r ? null : r, s = t.successfulReduxAction,
                d = void 0 === s ? null : s, u = t.failedReduxAction,
                c = void 0 === u ? null : u, l = t.loadingReduxAction,
                p = void 0 === l ? null : l;
            return __awaiter(this, void 0, void 0, (function () {
                var t, r;
                return __generator(this, (function (s) {
                    switch (s.label) {
                        case 0:
                            return t = {
                                method: "get",
                                endpoint: urlJoin("serverlist", n, o.toString(), a),
                                opts: {params: i ? {alc: i.join(",")} : {}},
                                actionCreators: {
                                    failedReduxAction: c,
                                    loadingReduxAction: p
                                },
                                assets: !0
                            }, [4, e.request(t)];
                        case 1:
                            return r = s.sent(), d && e.dispatcher({
                                actionCreator: d,
                                data: r,
                                getConfig: e.getConfig
                            }), [2, r]
                    }
                }))
            }))
        }
    }
}, endpoint$3 = "/Users", Users = function (e) {
    return {
        createGhost: function (t) {
            var n = t.token, o = t.sessionType, a = t.successfulReduxAction,
                r = void 0 === a ? null : a, i = t.failedReduxAction,
                s = void 0 === i ? null : i, d = t.loadingReduxAction,
                u = void 0 === d ? null : d;
            return __awaiter(this, void 0, void 0, (function () {
                var t, a, i, d, c;
                return __generator(this, (function (l) {
                    switch (l.label) {
                        case 0:
                            return t = getMandatoryParams(), a = t.time, i = t.client_auth_hash, d = {
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json"
                                },
                                body: JSON.stringify({
                                    token: n,
                                    time: a,
                                    client_auth_hash: i,
                                    session_type_id: o
                                })
                            }, [4, e.request({
                                method: "POST",
                                endpoint: endpoint$3,
                                opts: d,
                                actionCreators: {
                                    failedReduxAction: s,
                                    loadingReduxAction: u
                                }
                            })];
                        case 1:
                            return c = l.sent(), r && e.dispatcher(__assign({
                                actionCreator: r,
                                data: c.data
                            }, e)), [2, c.data]
                    }
                }))
            }))
        }, createAccount: function (t) {
            var n = t.username, o = t.password, a = t.sessionType, r = t.params,
                i = void 0 === r ? {} : r, s = t.successfulReduxAction,
                d = void 0 === s ? null : s, u = t.failedReduxAction,
                c = void 0 === u ? null : u, l = t.loadingReduxAction,
                p = void 0 === l ? null : l;
            return __awaiter(this, void 0, void 0, (function () {
                var t, r, s, u, l;
                return __generator(this, (function (f) {
                    switch (f.label) {
                        case 0:
                            return t = getMandatoryParams(), r = t.time, s = t.client_auth_hash, u = {
                                params: i,
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json"
                                },
                                body: JSON.stringify({
                                    username: n,
                                    password: o,
                                    time: r,
                                    client_auth_hash: s,
                                    session_type_id: a
                                })
                            }, [4, e.request({
                                method: "POST",
                                endpoint: endpoint$3,
                                opts: u,
                                actionCreators: {
                                    failedReduxAction: c,
                                    loadingReduxAction: p
                                }
                            })];
                        case 1:
                            return l = f.sent(), d && e.dispatcher(__assign({
                                actionCreator: d,
                                data: l.data
                            }, e)), [2, l.data]
                    }
                }))
            }))
        }, changePassword: function (t) {
            var n = t.password, o = t.currentPassword,
                a = t.successfulReduxAction, r = void 0 === a ? null : a,
                i = t.failedReduxAction, s = void 0 === i ? null : i,
                d = t.loadingReduxAction, u = void 0 === d ? null : d;
            return __awaiter(this, void 0, void 0, (function () {
                var t;
                return __generator(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return [4, e.put({
                                endpoint: endpoint$3,
                                params: {password: n, current_password: o},
                                actionCreators: {
                                    failedReduxAction: s,
                                    loadingReduxAction: u
                                }
                            })];
                        case 1:
                            return t = a.sent(), r && e.dispatcher(__assign({
                                actionCreator: r,
                                data: t.data
                            }, e)), [2, t.data]
                    }
                }))
            }))
        }, changeEmailAddress: function (t) {
            var n = t.email, o = t.currentPassword, a = t.successfulReduxAction,
                r = void 0 === a ? null : a, i = t.failedReduxAction,
                s = void 0 === i ? null : i, d = t.loadingReduxAction,
                u = void 0 === d ? null : d;
            return __awaiter(this, void 0, void 0, (function () {
                var t;
                return __generator(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return [4, e.put({
                                endpoint: endpoint$3,
                                params: {email: n, current_password: o},
                                actionCreators: {
                                    failedReduxAction: s,
                                    loadingReduxAction: u
                                }
                            })];
                        case 1:
                            return t = a.sent(), r && e.dispatcher(__assign({
                                actionCreator: r,
                                data: t.data
                            }, e)), [2, t.data]
                    }
                }))
            }))
        }, deleteEmailAddress: function (t) {
            var n = void 0 === t ? {} : t, o = n.successfulReduxAction,
                a = void 0 === o ? null : o, r = n.failedReduxAction,
                i = void 0 === r ? null : r, s = n.loadingReduxAction,
                d = void 0 === s ? null : s;
            return __awaiter(this, void 0, void 0, (function () {
                var t;
                return __generator(this, (function (n) {
                    switch (n.label) {
                        case 0:
                            return [4, e.put({
                                endpoint: endpoint$3,
                                params: {delete_email: 1},
                                actionCreators: {
                                    failedReduxAction: i,
                                    loadingReduxAction: d
                                }
                            })];
                        case 1:
                            return t = n.sent(), a && e.dispatcher(__assign({
                                actionCreator: a,
                                data: t.data
                            }, e)), [2, t.data]
                    }
                }))
            }))
        }, applyVoucher: function (t) {
            var n = t.voucherCode, o = t.successfulReduxAction,
                a = void 0 === o ? null : o, r = t.failedReduxAction,
                i = void 0 === r ? null : r, s = t.loadingReduxAction,
                d = void 0 === s ? null : s;
            return __awaiter(this, void 0, void 0, (function () {
                var t;
                return __generator(this, (function (o) {
                    switch (o.label) {
                        case 0:
                            return [4, e.put({
                                endpoint: endpoint$3,
                                params: {voucher_code: n},
                                actionCreators: {
                                    failedReduxAction: i,
                                    loadingReduxAction: d
                                }
                            })];
                        case 1:
                            return t = o.sent(), a && e.dispatcher(__assign({
                                actionCreator: a,
                                data: t.data
                            }, e)), [2, t.data]
                    }
                }))
            }))
        }
    }
}, RecordInstall = function (e) {
    return {
        post: function (t) {
            var n = t.type, o = t.os, a = t.successfulReduxAction,
                r = void 0 === a ? null : a, i = t.failedReduxAction,
                s = void 0 === i ? null : i, d = t.loadingReduxAction,
                u = void 0 === d ? null : d;
            return __awaiter(this, void 0, void 0, (function () {
                var t;
                return __generator(this, (function (a) {
                    switch (a.label) {
                        case 0:
                            return [4, e.post({
                                endpoint: urlJoin("RecordInstall", n, o),
                                params: {},
                                actionCreators: {
                                    failedReduxAction: s,
                                    loadingReduxAction: u
                                }
                            })];
                        case 1:
                            return t = a.sent(), r && e.dispatcher({
                                actionCreator: r,
                                data: t.data,
                                getConfig: e.getConfig
                            }), [2, t.data]
                    }
                }))
            }))
        }
    }
}, endpoint$4 = "/RegToken", RegToken = function (e) {
    return {
        getToken: function (t) {
            var n = void 0 === t ? {} : t, o = n.successfulReduxAction,
                a = void 0 === o ? null : o, r = n.failedReduxAction,
                i = void 0 === r ? null : r, s = n.loadingReduxAction,
                d = void 0 === s ? null : s;
            return __awaiter(this, void 0, void 0, (function () {
                var t, n, o, r, s;
                return __generator(this, (function (u) {
                    switch (u.label) {
                        case 0:
                            return t = getMandatoryParams(), n = t.time, o = t.client_auth_hash, r = {
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json"
                                },
                                body: JSON.stringify({
                                    time: n,
                                    client_auth_hash: o
                                })
                            }, "development" === process.env.NODE_ENV && ("true" === process.env.WEB_EXT_SPOOF_USER_AGENT ? r.headers = __assign(__assign({}, r.headers), {"User-Agent": Date.now().toString()}) : r.headers = __assign(__assign({}, r.headers), {"User-Agent": "getting banned"})), [4, e.request({
                                method: "POST",
                                endpoint: endpoint$4,
                                opts: r,
                                actionCreators: {
                                    failedReduxAction: i,
                                    loadingReduxAction: d
                                }
                            })];
                        case 1:
                            return s = u.sent(), a && e.dispatcher(__assign({
                                actionCreator: a,
                                data: s.data
                            }, e)), [2, s.data]
                    }
                }))
            }))
        }
    }
};
global.url = "";
var endpoints = {
    notifications: Notifications,
    session: Session,
    serverCredentials: ServerCredentials,
    serverList: ServerList,
    users: Users,
    recordInstall: RecordInstall,
    regToken: RegToken
};

function create(e) {
    return void 0 === e && (e = {}), createInstance({
        conf: e,
        endpoints: endpoints
    })
}

exports.create = create;
