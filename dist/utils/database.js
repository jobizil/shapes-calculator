"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInToDatabase = exports.readFromDatabase = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function readFromDatabase() {
    try {
        const buffer = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '/database/data.json'), 'utf8');
        const parsedBuffer = JSON.parse(buffer);
        return parsedBuffer;
    }
    catch (_a) {
        return [];
    }
}
exports.readFromDatabase = readFromDatabase;
function writeInToDatabase(data) {
    return fs_1.default.writeFileSync(path_1.default.join(__dirname, '..', '/database/data.json'), JSON.stringify(data));
}
exports.writeInToDatabase = writeInToDatabase;
