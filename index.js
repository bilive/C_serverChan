"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = __importStar(require("../../plugin"));
class ServerChan extends plugin_1.default {
    constructor() {
        super();
        this.name = 'Server酱';
        this.description = '发送消息到Server酱';
        this.version = '0.0.3';
        this.author = 'lzghzr';
    }
    async load({ defaultOptions, whiteList }) {
        defaultOptions.config['adminServerChan'] = '';
        defaultOptions.info['adminServerChan'] = {
            description: 'adminSCKEY',
            tip: 'Server酱的SCKEY, 将信息发送到此账号',
            type: 'string'
        };
        whiteList.add('adminServerChan');
        defaultOptions.newUserData['serverChan'] = '';
        defaultOptions.info['serverChan'] = {
            description: 'SCKEY',
            tip: 'Server酱的SCKEY, 将信息发送到此账号',
            type: 'string'
        };
        whiteList.add('serverChan');
        this.loaded = true;
    }
    async options({ options }) {
        this._ = options;
        plugin_1.tools.on('systemMSG', data => this._onSystem(data));
        plugin_1.tools.on('SCMSG', data => this._SCMSG(data));
    }
    _onSystem(data) {
        const adminServerChan = data.options.config['adminServerChan'];
        if (adminServerChan !== '')
            this._send(adminServerChan, data.message);
        if (data.user !== undefined) {
            const userServerChan = data.user.userData['serverChan'];
            if (userServerChan !== '')
                this._send(userServerChan, data.message);
        }
    }
    _SCMSG({ serverChan, message }) {
        const server = serverChan || this._.config['adminServerChan'];
        if (server !== '')
            this._send(server, message);
    }
    _send(serverChan, message) {
        const send = {
            method: 'POST',
            url: `https://sctapi.ftqq.com/${serverChan}.send`,
            body: `title=bilive_client&desp=${message}`,
            responseType: 'json'
        };
        plugin_1.tools.XHR(send);
    }
}
exports.default = new ServerChan();
