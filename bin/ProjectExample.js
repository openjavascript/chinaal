"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require("clear");

var _clear2 = _interopRequireDefault(_clear);

var _Project2 = require("./Project.js");

var _Project3 = _interopRequireDefault(_Project2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var error = _chalk2.default.bold.red;
var warning = _chalk2.default.keyword('orange');
var success = _chalk2.default.greenBright;
var info = _chalk2.default.bold.blue;

var ProjectExample = function (_Project) {
    _inherits(ProjectExample, _Project);

    function ProjectExample(app) {
        _classCallCheck(this, ProjectExample);

        return _possibleConstructorReturn(this, (ProjectExample.__proto__ || Object.getPrototypeOf(ProjectExample)).call(this, app));
    }

    _createClass(ProjectExample, [{
        key: "init",
        value: function init() {
            this.report_dir = _path2.default.resolve(this.app.projectRoot, 'china_report');

            this.path_all = _path2.default.resolve(this.report_dir, 'all.json');
            this.path_city_txt = _path2.default.resolve(this.report_dir, 'city.txt');

            this.splitSource();
            this.mkreportFile();
        }
    }, {
        key: "splitSource",
        value: function splitSource() {
            var _this2 = this;

            var file = _fsExtra2.default.readFileSync(this.app.sourcePath, 'utf8');
            file = file.replace(/[ \t]+$/gm, '');
            file = file.split(/[\r\n]+/g);

            this.sourceAr = file;

            this.keyItems = {};

            this.levels = {};

            this.cityText = [];

            var curLevel1 = void 0,
                curLevel2 = void 0;
            file.map(function (item) {
                var tmp = item.split(/[\s]+/g);
                if (tmp.length < 2) return;

                var key = tmp[0];

                _this2.keyItems[key] = tmp[1];

                var level1Key = parseInt(key.slice(0, 2), 10),
                    level2Key = parseInt(key.slice(2, 4), 10),
                    level3Key = parseInt(key.slice(4, 6), 10);

                //console.log( level1Key, level2Key, level3Key );

                if (!level2Key && !level3Key && !(level1Key in _this2.levels)) {
                    curLevel1 = _this2.levels[key] = {
                        label: tmp[1], key: key
                    };
                    curLevel2 = '';

                    _this2.cityText.push(tmp[1]);
                }

                if (curLevel1 && level2Key && !level3Key) {
                    curLevel2 = _this2.levels[key] = {
                        label: tmp[1], key: key
                    };
                    curLevel1.items = curLevel1.items || [];
                    curLevel1.items.push(curLevel2);

                    _this2.cityText.push(new Array(5).join(' ') + tmp[1]);
                }

                if (level2Key && level3Key) {
                    if (curLevel2) {
                        curLevel2.items = curLevel2.items || [];
                        curLevel2.items.push({
                            label: tmp[1], key: key
                        });
                    } else {
                        curLevel1.items = curLevel1.items || [];

                        curLevel1.items.push({
                            label: tmp[1], key: key
                        });
                    }
                }
            });
        }
    }, {
        key: "mkreportFile",
        value: function mkreportFile() {
            _fsExtra2.default.mkdirpSync(this.report_dir);

            _fsExtra2.default.writeFileSync(this.path_all, JSON.stringify(this.levels, null, 4), { encoding: 'utf8' });
            _fsExtra2.default.writeFileSync(this.path_city_txt, this.cityText.join("\n"), { encoding: 'utf8' });
        }
    }]);

    return ProjectExample;
}(_Project3.default);

exports.default = ProjectExample;