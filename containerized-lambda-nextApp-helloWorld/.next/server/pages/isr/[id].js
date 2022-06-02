"use strict";
(() => {
var exports = {};
exports.id = 856;
exports.ids = [856];
exports.modules = {

/***/ 920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function UsingISR({ post  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
            children: post.title
        }, post.id)
    });
}
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
async function getStaticProps({ params  }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const post = await res.json();
    console.log("Getting data for ", params.id);
    return {
        props: {
            post
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10
    };
}
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
async function getStaticPaths(id) {
    // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    // const posts = await res.json()
    // const idVal = id.toString()
    // Get the paths we want to pre-render based on posts
    // const paths = posts.map((post) => ({
    //   params: { id: post.id.toString() },
    // }))
    const pathsList = [
        1,
        2,
        3,
        4,
        5
    ];
    const paths = pathsList.map((path)=>({
            params: {
                id: path.toString()
            }
        })
    );
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return {
        paths,
        fallback: "blocking"
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UsingISR);


/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(920));
module.exports = __webpack_exports__;

})();