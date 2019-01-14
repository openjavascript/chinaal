
import {
    APPNAME
} from './constant.js';

export const Q_ALFILEPATH = [
    { 
        "name": "alfilepath"
        , "type": "input"
        , "message": "请输入行政规划源数据文件"
        , "default": "./src/data/source.txt"
    }
];

export const Q_CONFIRM = [
    { 
        "name": "confirm"
        , "type": "list"
        , "message": "开始执行操作？"
        , "choices": [ 'yes', 'no' ]
        , "default": 'yes'
    }
];


/*
export const Q_INIT_PUBLIC = [
    { 
        "name": "init_public"
        , "type": "list"
        , "message": "是否需要初始化前端public目录"
        , "choices": [ 'yes', 'no' ]
        , "default": 'no'
    }
];


export const Q_IP_LIST = [
    { 
        "name": "ip"
        , "type": "input"
        , "message": "请输入静态资源HOST/IP, 无须设置请按回车。"
    }
];

export const Q_PORT_LIST = [
    { 
        "name": "port"
        , "type": "input"
        , "message": "请输入静态资源端口号, 无须设置请按回车。"
    }
];

export const Q_PASSWORD = [
    { 
        "name": "password"
        , "type": "password"
        , "message": "请输入数据库密码, 无须设置请按回车。"
    }
];
*/
