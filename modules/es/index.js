import e from "md5";
import t from "query-string";
import n from "url-join";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var o = function () {
    return (o = Object.assign || function (e) {
        for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e
    }).apply(this, arguments)
};

function r(e, t, n, o) {
    return new (n || (n = Promise))((function (r, i) {
        function a(e) {
            try {
                u(o.next(e))
            } catch (e) {
                i(e)
            }
        }

        function s(e) {
            try {
                u(o.throw(e))
            } catch (e) {
                i(e)
            }
        }

        function u(e) {
            var t;
            e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                e(t)
            }))).then(a, s)
        }

        u((o = o.apply(e, t || [])).next())
    }))
}

function i(e, t) {
    var n, o, r, i, a = {
        label: 0, sent: function () {
            if (1 & r[0]) throw r[1];
            return r[1]
        }, trys: [], ops: []
    };
    return i = {
        next: s(0),
        throw: s(1),
        return: s(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this
    }), i;

    function s(i) {
        return function (s) {
            return function (i) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; a;) try {
                    if (n = 1, o && (r = 2 & i[0] ? o.return : i[0] ? o.throw || ((r = o.return) && r.call(o), 0) : o.next) && !(r = r.call(o, i[1])).done) return r;
                    switch (o = 0, r && (i = [2 & i[0], r.value]), i[0]) {
                        case 0:
                        case 1:
                            r = i;
                            break;
                        case 4:
                            return a.label++, {value: i[1], done: !1};
                        case 5:
                            a.label++, o = i[1], i = [0];
                            continue;
                        case 7:
                            i = a.ops.pop(), a.trys.pop();
                            continue;
                        default:
                            if (!(r = a.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                a = 0;
                                continue
                            }
                            if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                                a.label = i[1];
                                break
                            }
                            if (6 === i[0] && a.label < r[1]) {
                                a.label = r[1], r = i;
                                break
                            }
                            if (r && a.label < r[2]) {
                                a.label = r[2], a.ops.push(i);
                                break
                            }
                            r[2] && a.ops.pop(), a.trys.pop();
                            continue
                    }
                    i = t.call(e, a)
                } catch (e) {
                    i = [6, e], o = 0
                } finally {
                    n = r = 0
                }
                if (5 & i[0]) throw i[1];
                return {value: i[0] ? i[1] : void 0, done: !0}
            }([i, s])
        }
    }
}

var a, s = function (t) {
        var n, o, r = Math.round((new Date).getTime() / 1e3).toString();
        return {
            client_auth_hash: (n = r, void 0 === o && (o = ("object" == typeof window ? window.CLIENT_AUTH_SECRET : global.CLIENT_AUTH_SECRET) || process.env.REACT_APP_CLIENT_AUTH_SECRET || process.env.WEB_EXT_CLIENT_AUTH_SECRET || process.env.CLIENT_AUTH_SECRET || "952b4412f002315aa50751032fcaab03"), e("" + o + n)).toString(),
            session_auth_hash: t,
            time: r
        }
    }, u = {
        apiUrl: process.env.API_URL,
        assetsUrl: process.env.ASSETS_URL,
        backupApiUrl: process.env.BACKUP_API_URL,
        backupAssetsUrl: process.env.BACKUP_ASSETS_URL,
        sessionAuthHash: null,
        sessionType: null,
        dispatch: null,
        platform: null,
        apiCallMinInterval: process.env.API_CALL_MIN_INTERVAL || "1000"
    }, d = function (e) {
        u = o(o({}, u), e)
    }, c = function () {
        return u
    },
    l = ("function" == typeof fetch ? fetch : require("node-fetch"), function (e) {
        var n = e.endpoint, a = e.debugOpts, s = void 0 === a ? {} : a,
            u = e.opts, l = void 0 === u ? {} : u, p = e.method,
            f = void 0 === p ? "get" : p, v = e.assets, h = void 0 !== v && v;
        return r(void 0, void 0, Promise, (function () {
            var e, a, u, p, v, g;
            return i(this, (function (m) {
                switch (m.label) {
                    case 0:
                        e = 7331, a = o(o({}, l.params), {platform: c().platform}), u = l.method ? l : o(o({}, l), {method: f}), p = function (l) {
                            return void 0 === l && (l = !1), r(void 0, void 0, void 0, (function () {
                                var r, p, f, v, g, m, A, b, x, C, R, w, y, _, T;
                                return i(this, (function (i) {
                                    switch (i.label) {
                                        case 0:
                                            if (r = c(), p = r.lastCallTimeStamps, f = void 0 === p ? {} : p, v = r.apiCallMinInterval, g = l && n.includes("ExtBlocklists") ? o(o({}, a), {domain: "totallyacdn.com"}) : a, m = function (e) {
                                                var t, n = e.url, o = e.assets,
                                                    r = void 0 !== o && o,
                                                    i = e.useBackup,
                                                    a = void 0 !== i && i,
                                                    s = c(), u = s.assetsUrl,
                                                    d = s.apiUrl,
                                                    l = s.backupApiUrl,
                                                    p = s.backupAssetsUrl,
                                                    f = new RegExp(/^http|ftp|file:\/\//gim);
                                                return f.test(n) ? n : (t = a ? r ? p : l : r ? u : d, f.test(n) || n.startsWith("/") ? !f.test(n) && n.startsWith("/") ? t + n : void 0 : t + "/" + n)
                                            }({
                                                url: n,
                                                assets: h,
                                                useBackup: l
                                            }), A = m + "?" + t.stringify(g), b = m, global.url = b, (x = Number(v) - (null !== (T = Date.now() - f[n]) && void 0 !== T ? T : 0)) > 0 && !l) throw{
                                                code: e,
                                                message: "Last call to " + n + " less than " + v + "ms ago. Call aborted. Retry in " + x + "ms",
                                                debug: {
                                                    debugUrl: b,
                                                    debugOpts: s,
                                                    lastCallTimeStamps: f,
                                                    timeToNextCall: x
                                                },
                                                data: {
                                                    debugUrl: b,
                                                    debugOpts: s,
                                                    lastCallTimeStamps: f,
                                                    timeToNextCall: x
                                                }
                                            };
                                            i.label = 1;
                                        case 1:
                                            return i.trys.push([1, 3, , 4]), d({lastCallTimeStamps: o(o({}, f), (_ = {}, _[n] = Date.now(), _))}), C = new AbortController, setTimeout((function () {
                                                return C.abort()
                                            }), 3e3), R = {
                                                headers: u.headers,
                                                method: u.method,
                                                body: u.body,
                                                signal: C.signal
                                            }, [4, fetch(A, R)];
                                        case 2:
                                            if (404 === (w = i.sent()).status) throw{
                                                code: w.status,
                                                message: w.statusText,
                                                debug: {
                                                    debugUrl: b,
                                                    debugOpts: s
                                                },
                                                data: {
                                                    debugUrl: b,
                                                    debugOpts: s
                                                }
                                            };
                                            return [2, w];
                                        case 3:
                                            throw y = i.sent(), console.error(y), {
                                                code: 0,
                                                message: "Error fetching url. " + y.message,
                                                debug: {
                                                    debugUrl: b,
                                                    debugOpts: s
                                                },
                                                data: {
                                                    debugUrl: b,
                                                    debugOpts: s
                                                }
                                            };
                                        case 4:
                                            return [2]
                                    }
                                }))
                            }))
                        }, m.label = 1;
                    case 1:
                        return m.trys.push([1, 3, , 9]), [4, p()];
                    case 2:
                        return [2, g = m.sent()];
                    case 3:
                        return v = m.sent(), console.error(v.message), g = void 0, v.code !== e ? [3, 6] : [4, new Promise((function (e) {
                            return setTimeout(e, v.data.timeToNextCall)
                        }))];
                    case 4:
                        return m.sent(), [4, p()];
                    case 5:
                        return g = m.sent(), [3, 8];
                    case 6:
                        return [4, p(!0)];
                    case 7:
                        g = m.sent(), m.label = 8;
                    case 8:
                        return [2, g];
                    case 9:
                        return [2]
                }
            }))
        }))
    }), p = function (e) {
        var t = e.getConfig, n = e.dispatch, o = e.actionCreator, r = e.data;
        return n ? n(o(r)) : t && t().dispatch ? t().dispatch(o(r)) : void 0
    }, f = function (e) {
        var t = {code: 1337, message: "No session auth hash in API"};
        return e && p({actionCreator: e, data: t}), t
    }, v = function (e) {
        var t = e.response, n = e.debug, o = void 0 === n ? null : n;
        return r(void 0, void 0, void 0, (function () {
            var e, n, r, a;
            return i(this, (function (i) {
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
                        if (e.errorCode || !e.data) throw r = e.errorCode || "No error code present", a = e.errorMessage || "No error message present", {
                            code: r,
                            message: a,
                            debug: o,
                            data: JSON.stringify(e)
                        };
                        i.label = 5;
                    case 5:
                        return [2, e]
                }
            }))
        }))
    }, h = function (e) {
        var t = e.method, n = e.endpoint, o = e.opts, a = void 0 === o ? {} : o,
            s = e.debugOpts, u = void 0 === s ? {} : s, d = e.actionCreators,
            f = d.successfulReduxAction, h = d.failedReduxAction,
            g = d.loadingReduxAction, m = e.assets, A = void 0 !== m && m;
        return r(void 0, void 0, void 0, (function () {
            var e, o, r;
            return i(this, (function (i) {
                switch (i.label) {
                    case 0:
                        return i.trys.push([0, 3, , 4]), g && p({
                            getConfig: c,
                            actionCreator: g
                        }), [4, l({
                            endpoint: n,
                            debugOpts: u,
                            opts: a,
                            method: t,
                            assets: A,
                            actionCreators: {}
                        })];
                    case 1:
                        return e = i.sent(), [4, v({
                            response: e,
                            debug: {
                                response: e,
                                debugOpts: u,
                                endpoint: n,
                                url: global.url
                            }
                        })];
                    case 2:
                        return o = i.sent(), f && p({
                            actionCreator: f,
                            data: o
                        }), [2, o];
                    case 3:
                        if ((r = i.sent()).code = r.code || 0, !h) throw r;
                        return p({actionCreator: h, data: r}), [3, 4];
                    case 4:
                        return [2]
                }
            }))
        }))
    }, g = Object.freeze({
        __proto__: null, prepLoginForm: function (e) {
            var t = e.username, n = e.password, r = e.sessionType, i = e.twoFACode,
                a = s(), u = {
                    username: t,
                    password: n,
                    time: a.time,
                    client_auth_hash: a.client_auth_hash,
                    session_type_id: r
                };
            i && (u["2fa_code"] = i);
            var d = function (e) {
                return Object.entries(e).map((function (e) {
                    var t = e[0], n = e[1];
                    return encodeURIComponent(t) + "=" + encodeURIComponent(n)
                })).join("&")
            };
            return {
                body: d(u),
                protectedBody: d(o(o({}, u), {password: n && n.length > 0 ? "xxxx" : "no_set"}))
            }
        }, request: h, get: function (e) {
            var t = e.endpoint, n = e.params, a = e.actionCreators,
                u = void 0 === a ? {} : a;
            return r(void 0, void 0, void 0, (function () {
                var e;
                return i(this, (function (r) {
                    switch (r.label) {
                        case 0:
                            if (!(e = c().sessionAuthHash)) throw f(u.failedReduxAction);
                            return [4, h({
                                method: "get",
                                endpoint: t,
                                opts: {params: o(o({}, n), s(e))},
                                actionCreators: u
                            })];
                        case 1:
                            return [2, r.sent()]
                    }
                }))
            }))
        }, delete: function (e) {
            var t = e.endpoint, n = e.params, a = e.actionCreators,
                u = void 0 === a ? {} : a;
            return r(void 0, void 0, void 0, (function () {
                var e;
                return i(this, (function (r) {
                    switch (r.label) {
                        case 0:
                            if (!(e = c().sessionAuthHash)) throw f(u.failedReduxAction);
                            return [4, h({
                                method: "delete",
                                endpoint: t,
                                opts: {params: o(o({}, n), s(e))},
                                actionCreators: u
                            })];
                        case 1:
                            return [2, r.sent()]
                    }
                }))
            }))
        }, put: function (e) {
            var n = e.endpoint, a = e.params, u = e.actionCreators,
                d = void 0 === u ? {} : u;
            return r(void 0, void 0, void 0, (function () {
                var e, r, u;
                return i(this, (function (i) {
                    switch (i.label) {
                        case 0:
                            if (!(e = c().sessionAuthHash)) throw f(d.failedReduxAction);
                            return r = o(o({}, a), s(e)), u = t.stringify(r), [4, h({
                                method: "put",
                                endpoint: n,
                                opts: {
                                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                    body: u
                                },
                                actionCreators: d
                            })];
                        case 1:
                            return [2, i.sent()]
                    }
                }))
            }))
        }, post: function (e) {
            var n = e.endpoint, a = e.params, u = e.actionCreators,
                d = void 0 === u ? {} : u;
            return r(void 0, void 0, void 0, (function () {
                var e, r, u, l;
                return i(this, (function (i) {
                    switch (i.label) {
                        case 0:
                            return e = c().sessionAuthHash, r = o(o({}, a), s(e)), u = t.stringify(r), [4, h({
                                method: "post",
                                endpoint: n,
                                opts: l = {
                                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                    body: u
                                },
                                debugOpts: o({}, l),
                                actionCreators: d
                            })];
                        case 1:
                            return [2, i.sent()]
                    }
                }))
            }))
        }, dispatcher: p, sendRequest: l, setConfig: d, getConfig: c
    }), m = Object.freeze({
        __proto__: null,
        sessionTypes: {web: 1, ext: 2, desktop: 3, mobile: 4},
        accountStates: {active: 1, outOfData: 2, banned: 3}
    }), A = function (e) {
        var t = e.conf, n = void 0 === t ? {} : t, r = e.endpoints,
            i = void 0 === r ? {} : r, a = o(o({}, u), n);
        return d(a), o(o(o({}, g), {codes: m}), function (e) {
            var t = e.api, n = e.endpoints, o = void 0 === n ? {} : n;
            return Object.entries(o).reduce((function (e, n) {
                var o = n[0], r = n[1];
                return "function" == typeof r && (e[o] = r(t)), e
            }), {})
        }({api: g, endpoints: i}))
    };
!function (e) {
    e[e.OFFLINE = 1] = "OFFLINE", e[e.ONLINE = 2] = "ONLINE"
}(a || (a = {}));
global.url = "";
var b = {
    notifications: function (e) {
        return {
            get: function (t) {
                var n = void 0 === t ? {} : t, a = n.successfulReduxAction,
                    s = void 0 === a ? null : a, u = n.failedReduxAction,
                    d = void 0 === u ? null : u, c = n.loadingReduxAction,
                    l = void 0 === c ? null : c;
                return r(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return [4, e.get({
                                    endpoint: "/Notifications",
                                    params: {},
                                    actionCreators: {
                                        successfulReduxAction: s,
                                        failedReduxAction: d,
                                        loadingReduxAction: l
                                    }
                                })];
                            case 1:
                                return t = n.sent(), s && e.dispatcher(o({
                                    actionCreator: s,
                                    data: t.data
                                }, e)), [2, t.data]
                        }
                    }))
                }))
            }
        }
    }, session: function (e) {
        return {
            login: function (t) {
                var n = t.username, o = t.password, a = t.sessionType,
                    s = t.twoFACode, u = t.successfulReduxAction,
                    d = void 0 === u ? null : u, c = t.failedReduxAction,
                    l = void 0 === c ? null : c, p = t.loadingReduxAction,
                    f = void 0 === p ? null : p;
                return r(this, void 0, void 0, (function () {
                    var t, r, u, c, p;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, e.prepLoginForm({
                                    username: n,
                                    password: o,
                                    sessionType: "true" === process.env.WEB_EXT_ENABLE_2FA_TESTING ? 1 : a,
                                    twoFACode: s
                                })];
                            case 1:
                                return t = i.sent(), r = t.body, u = t.protectedBody, c = {
                                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                    body: r
                                }, [4, e.request({
                                    method: "post",
                                    endpoint: "/Session",
                                    opts: c,
                                    debugOpts: {protectedBody: u},
                                    actionCreators: {
                                        failedReduxAction: l,
                                        loadingReduxAction: f
                                    }
                                })];
                            case 2:
                                return p = i.sent(), d && e.dispatcher({
                                    actionCreator: d,
                                    data: p.data
                                }), [2, p.data]
                        }
                    }))
                }))
            }, get: function (t) {
                var n = void 0 === t ? {} : t, o = n.params,
                    a = void 0 === o ? {} : o, s = n.successfulReduxAction,
                    u = void 0 === s ? null : s, d = n.failedReduxAction,
                    c = void 0 === d ? null : d, l = n.loadingReduxAction,
                    p = void 0 === l ? null : l;
                return r(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return [4, e.get({
                                    endpoint: "/Session",
                                    params: a,
                                    actionCreators: {
                                        failedReduxAction: c,
                                        loadingReduxAction: p
                                    }
                                })];
                            case 1:
                                return t = n.sent(), u && e.dispatcher({
                                    actionCreator: u,
                                    data: t.data
                                }), [2, t.data]
                        }
                    }))
                }))
            }
        }
    }, serverCredentials: function (e) {
        return {
            get: function (t) {
                var n = void 0 === t ? {} : t, a = n.successfulReduxAction,
                    s = void 0 === a ? null : a, u = n.failedReduxAction,
                    d = void 0 === u ? null : u, c = n.loadingReduxAction,
                    l = void 0 === c ? null : c;
                return r(this, void 0, void 0, (function () {
                    var t, n;
                    return i(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.get({
                                    endpoint: "/ServerCredentials",
                                    params: {},
                                    actionCreators: {
                                        failedReduxAction: d,
                                        loadingReduxAction: l
                                    }
                                })];
                            case 1:
                                return t = r.sent(), n = {
                                    username: window.atob(t.data.username),
                                    password: window.atob(t.data.password)
                                }, s && e.dispatcher(o({
                                    actionCreator: s,
                                    data: n
                                }, e)), [2, n]
                        }
                    }))
                }))
            }
        }
    }, serverList: function (e) {
        return {
            get: function (t) {
                var o = t.type, a = t.premium, s = t.revision, u = t.alc,
                    d = void 0 === u ? null : u, c = t.successfulReduxAction,
                    l = void 0 === c ? null : c, p = t.failedReduxAction,
                    f = void 0 === p ? null : p, v = t.loadingReduxAction,
                    h = void 0 === v ? null : v;
                return r(this, void 0, void 0, (function () {
                    var t, r;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = {
                                    method: "get",
                                    endpoint: n("serverlist", o, a.toString(), s),
                                    opts: {params: d ? {alc: d.join(",")} : {}},
                                    actionCreators: {
                                        failedReduxAction: f,
                                        loadingReduxAction: h
                                    },
                                    assets: !0
                                }, [4, e.request(t)];
                            case 1:
                                return r = i.sent(), l && e.dispatcher({
                                    actionCreator: l,
                                    data: r,
                                    getConfig: e.getConfig
                                }), [2, r]
                        }
                    }))
                }))
            }
        }
    }, users: function (e) {
        return {
            createGhost: function (t) {
                var n = t.token, a = t.sessionType, u = t.successfulReduxAction,
                    d = void 0 === u ? null : u, c = t.failedReduxAction,
                    l = void 0 === c ? null : c, p = t.loadingReduxAction,
                    f = void 0 === p ? null : p;
                return r(this, void 0, void 0, (function () {
                    var t, r, u, c, p;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = s(), r = t.time, u = t.client_auth_hash, c = {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json"
                                    },
                                    body: JSON.stringify({
                                        token: n,
                                        time: r,
                                        client_auth_hash: u,
                                        session_type_id: a
                                    })
                                }, [4, e.request({
                                    method: "POST",
                                    endpoint: "/Users",
                                    opts: c,
                                    actionCreators: {
                                        failedReduxAction: l,
                                        loadingReduxAction: f
                                    }
                                })];
                            case 1:
                                return p = i.sent(), d && e.dispatcher(o({
                                    actionCreator: d,
                                    data: p.data
                                }, e)), [2, p.data]
                        }
                    }))
                }))
            }, createAccount: function (t) {
                var n = t.username, a = t.password, u = t.sessionType,
                    d = t.params, c = void 0 === d ? {} : d,
                    l = t.successfulReduxAction, p = void 0 === l ? null : l,
                    f = t.failedReduxAction, v = void 0 === f ? null : f,
                    h = t.loadingReduxAction, g = void 0 === h ? null : h;
                return r(this, void 0, void 0, (function () {
                    var t, r, d, l, f;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = s(), r = t.time, d = t.client_auth_hash, l = {
                                    params: c,
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json"
                                    },
                                    body: JSON.stringify({
                                        username: n,
                                        password: a,
                                        time: r,
                                        client_auth_hash: d,
                                        session_type_id: u
                                    })
                                }, [4, e.request({
                                    method: "POST",
                                    endpoint: "/Users",
                                    opts: l,
                                    actionCreators: {
                                        failedReduxAction: v,
                                        loadingReduxAction: g
                                    }
                                })];
                            case 1:
                                return f = i.sent(), p && e.dispatcher(o({
                                    actionCreator: p,
                                    data: f.data
                                }, e)), [2, f.data]
                        }
                    }))
                }))
            }, changePassword: function (t) {
                var n = t.password, a = t.currentPassword,
                    s = t.successfulReduxAction, u = void 0 === s ? null : s,
                    d = t.failedReduxAction, c = void 0 === d ? null : d,
                    l = t.loadingReduxAction, p = void 0 === l ? null : l;
                return r(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.put({
                                    endpoint: "/Users",
                                    params: {password: n, current_password: a},
                                    actionCreators: {
                                        failedReduxAction: c,
                                        loadingReduxAction: p
                                    }
                                })];
                            case 1:
                                return t = r.sent(), u && e.dispatcher(o({
                                    actionCreator: u,
                                    data: t.data
                                }, e)), [2, t.data]
                        }
                    }))
                }))
            }, changeEmailAddress: function (t) {
                var n = t.email, a = t.currentPassword,
                    s = t.successfulReduxAction, u = void 0 === s ? null : s,
                    d = t.failedReduxAction, c = void 0 === d ? null : d,
                    l = t.loadingReduxAction, p = void 0 === l ? null : l;
                return r(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.put({
                                    endpoint: "/Users",
                                    params: {email: n, current_password: a},
                                    actionCreators: {
                                        failedReduxAction: c,
                                        loadingReduxAction: p
                                    }
                                })];
                            case 1:
                                return t = r.sent(), u && e.dispatcher(o({
                                    actionCreator: u,
                                    data: t.data
                                }, e)), [2, t.data]
                        }
                    }))
                }))
            }, deleteEmailAddress: function (t) {
                var n = void 0 === t ? {} : t, a = n.successfulReduxAction,
                    s = void 0 === a ? null : a, u = n.failedReduxAction,
                    d = void 0 === u ? null : u, c = n.loadingReduxAction,
                    l = void 0 === c ? null : c;
                return r(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return [4, e.put({
                                    endpoint: "/Users",
                                    params: {delete_email: 1},
                                    actionCreators: {
                                        failedReduxAction: d,
                                        loadingReduxAction: l
                                    }
                                })];
                            case 1:
                                return t = n.sent(), s && e.dispatcher(o({
                                    actionCreator: s,
                                    data: t.data
                                }, e)), [2, t.data]
                        }
                    }))
                }))
            }, applyVoucher: function (t) {
                var n = t.voucherCode, a = t.successfulReduxAction,
                    s = void 0 === a ? null : a, u = t.failedReduxAction,
                    d = void 0 === u ? null : u, c = t.loadingReduxAction,
                    l = void 0 === c ? null : c;
                return r(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.put({
                                    endpoint: "/Users",
                                    params: {voucher_code: n},
                                    actionCreators: {
                                        failedReduxAction: d,
                                        loadingReduxAction: l
                                    }
                                })];
                            case 1:
                                return t = r.sent(), s && e.dispatcher(o({
                                    actionCreator: s,
                                    data: t.data
                                }, e)), [2, t.data]
                        }
                    }))
                }))
            }
        }
    }, recordInstall: function (e) {
        return {
            post: function (t) {
                var o = t.type, a = t.os, s = t.successfulReduxAction,
                    u = void 0 === s ? null : s, d = t.failedReduxAction,
                    c = void 0 === d ? null : d, l = t.loadingReduxAction,
                    p = void 0 === l ? null : l;
                return r(this, void 0, void 0, (function () {
                    var t;
                    return i(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, e.post({
                                    endpoint: n("RecordInstall", o, a),
                                    params: {},
                                    actionCreators: {
                                        failedReduxAction: c,
                                        loadingReduxAction: p
                                    }
                                })];
                            case 1:
                                return t = r.sent(), u && e.dispatcher({
                                    actionCreator: u,
                                    data: t.data,
                                    getConfig: e.getConfig
                                }), [2, t.data]
                        }
                    }))
                }))
            }
        }
    }, regToken: function (e) {
        return {
            getToken: function (t) {
                var n = void 0 === t ? {} : t, a = n.successfulReduxAction,
                    u = void 0 === a ? null : a, d = n.failedReduxAction,
                    c = void 0 === d ? null : d, l = n.loadingReduxAction,
                    p = void 0 === l ? null : l;
                return r(this, void 0, void 0, (function () {
                    var t, n, r, a, d;
                    return i(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = s(), n = t.time, r = t.client_auth_hash, a = {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json"
                                    },
                                    body: JSON.stringify({
                                        time: n,
                                        client_auth_hash: r
                                    })
                                }, "development" === process.env.NODE_ENV && ("true" === process.env.WEB_EXT_SPOOF_USER_AGENT ? a.headers = o(o({}, a.headers), {"User-Agent": Date.now().toString()}) : a.headers = o(o({}, a.headers), {"User-Agent": "getting banned"})), [4, e.request({
                                    method: "POST",
                                    endpoint: "/RegToken",
                                    opts: a,
                                    actionCreators: {
                                        failedReduxAction: c,
                                        loadingReduxAction: p
                                    }
                                })];
                            case 1:
                                return d = i.sent(), u && e.dispatcher(o({
                                    actionCreator: u,
                                    data: d.data
                                }, e)), [2, d.data]
                        }
                    }))
                }))
            }
        }
    }
};

function x(e) {
    return void 0 === e && (e = {}), A({conf: e, endpoints: b})
}

export {x as create};
