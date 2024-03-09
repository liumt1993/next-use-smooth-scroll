'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSmoothScroll = void 0;
var react_1 = require("react");
function useQueryParams() {
    var _a = (0, react_1.useState)(new URLSearchParams(window.location.search)), searchParams = _a[0], setSearchParams = _a[1];
    (0, react_1.useEffect)(function () {
        var handlePopState = function () {
            setSearchParams(new URLSearchParams(window.location.search));
        };
        window.addEventListener('popstate', handlePopState);
        return function () {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    return searchParams;
}
function useSmoothScroll(hashes) {
    var searchParams = useQueryParams();
    var _a = (0, react_1.useState)(null), activeHash = _a[0], setActiveHash = _a[1];
    (0, react_1.useEffect)(function () {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActiveHash('#' + entry.target.id);
                }
                else if (activeHash === '#' + entry.target.id) {
                    setActiveHash(null);
                }
            });
        }, { threshold: 0.2 });
        var ids = hashes.map(function (hash) { return hash.replace('#', ''); });
        ids.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });
        return function () {
            ids.forEach(function (id) {
                var element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [hashes]);
    (0, react_1.useEffect)(function () {
        var _a;
        var currentHash = '#' + window.location.hash.split('#')[1];
        if (currentHash === '')
            return;
        if (hashes.includes(currentHash)) {
            var id = currentHash.replace('#', '');
            (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [searchParams]);
    return activeHash;
}
exports.useSmoothScroll = useSmoothScroll;
//# sourceMappingURL=use-smooth-scroll.js.map