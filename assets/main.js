/******/ (function() { // webpackBootstrap
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*************************************!*\
  !*** ./src/assets/scripts/index.js ***!
  \*************************************/
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *  ================= Clock code =================
 */

/**
 * Loads an image.
 */
var loadImage = function loadImage(name) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.addEventListener('load', function () {
      return resolve(img);
    }, false);
    img.src = "".concat(window.origin, "/assets/static/applogos/").concat(name, ".png");
  });
};
/**
 * Tests if the current locale uses 24 hour time.
 * Thanks to stackoverflow lmao
 */


localeUses24HourTime = function localeUses24HourTime() {
  return new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric'
  }).formatToParts(new Date(2020, 0, 1, 13)).find(function (part) {
    return part.type === 'hour';
  }).value.length === 2;
};

var canvas = document.getElementById('clock_canvas');
var ctx = canvas.getContext('2d');

var drawArbitrary = function drawArbitrary() {} // iife for async
;

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var files, images, _images, days, weekdays, months, led, clockBase, drawBase, drawMonth, drawWeekday, drawDate, drawSep, drawMinutes, draw12Hour, draw24Hour, updateClock;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // images for the canvas
          files = ['day', 'weekday', 'months', 'led', 'clock_base'];
          _context.next = 3;
          return Promise.all(files.map(loadImage));

        case 3:
          images = _context.sent;
          _images = _slicedToArray(images, 5), days = _images[0], weekdays = _images[1], months = _images[2], led = _images[3], clockBase = _images[4];

          drawBase = function drawBase() {
            return ctx.drawImage(clockBase, 0, 0);
          };
          /**
           * Draws the month name.
           * @param {number} month The number of the month to draw.
           */


          drawMonth = function drawMonth(month) {
            return ctx.drawImage( // source image
            months, // source coords
            0, month * 6, 22, 6, // destination coords
            20, 48, 22, 6);
          };
          /**
           * Draws the weekday.
           * @param {number} weekday The day of the week to draw.
           */


          drawWeekday = function drawWeekday(weekday) {
            return ctx.drawImage(weekdays, 0, weekday * 6, 20, 6, 22, 23, 20, 6);
          };
          /**
           * Draws the day of the month.
           * @param {number} date The day of the month, from 0 to 30.
           */


          drawDate = function drawDate(date) {
            if (date > 10) {
              // e.g. 25 -> 2
              var tens = Math.floor(date / 10); // e.g. 25 -> 5

              var ones = date % 10; // draw!
              // tens

              ctx.drawImage(days, 8 * tens, 0, 8, 13, 22, 32, 8, 13); // ones

              ctx.drawImage(days, 8 * ones, 0, 8, 13, 31, 32, 8, 13);
            } else {
              ctx.drawImage(days, 8 * date, 0, 8, 13, date === 1 ? 28 : 27, 32, 8, 13);
            }
          };

          drawSep = function drawSep() {
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            // separator
            ctx.drawImage(led, 90, 0, 3, 11, 28 + offset, 6, 3, 11);
          };

          drawMinutes = function drawMinutes(minute) {
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            // minute
            var minuteTens = Math.floor(minute / 10);
            var minuteOnes = minute % 10;
            ctx.drawImage(led, 9 * minuteTens, 0, 9, 11, 31 + offset, 6, 9, 11);
            ctx.drawImage(led, 9 * minuteOnes, 0, 9, 11, 40 + offset, 6, 9, 11);
          };

          draw12Hour = function draw12Hour(hour, minute) {
            var offset = -6;
            var afternoon = hour > 12;
            hour = hour % 12 || 12;
            var hourOnes = hour % 10;

            if (hour > 9) {
              ctx.drawImage(led, 13, 0, 4, 11, 8, 6, 4, 11);
            }

            ctx.drawImage(led, 9 * hourOnes, 0, 9, 11, 13, 6, 9, 11);
            drawSep(offset);
            drawMinutes(minute, offset); // suffix

            var suffix = afternoon ? 106 : 94;
            ctx.drawImage(led, suffix, 0, 12, 11, 44, 4, 12, 11);
          };

          draw24Hour = function draw24Hour(hour, minute) {
            var hourTens = Math.floor(hour / 10);
            var hourOnes = hour % 10;

            if (hourTens || fullHour) {
              ctx.drawImage(led, 9 * hourTens, 0, 9, 11, 10 + offset, 6, 9, 11);
            }

            ctx.drawImage(led, 9 * hourOnes, 0, 9, 11, 19 + offset, 6, 9, 11);
            drawSep();
            drawMinutes(minute);
          };

          updateClock = function updateClock(now) {
            now = now || new Date(); // time

            var hour = now.getHours();
            var minute = now.getMinutes(); // date

            var day = now.getDate();
            var weekday = now.getDay();
            var month = now.getMonth();
            drawBase();
            drawMonth(month);
            drawWeekday(weekday);
            drawDate(day);

            if (localeUses24HourTime()) {
              draw24Hour(hour, minute);
            } else {
              draw12Hour(hour, minute);
            }
          };

          console.log('starting clock');
          updateClock(new Date());
          __webpack_require__.g.drawArbitrary = updateClock;
          setInterval(updateClock, 1000 * 60);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
}();
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************************!*\
  !*** ./src/assets/styles/index.scss ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=main.js.map