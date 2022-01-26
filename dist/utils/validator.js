"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const validateInput = (res, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert string input to lowercase
    const shape = data.shape.toLowerCase();
    const dimension = data.dimension;
    const length = Object.keys(dimension).length;
    let error = {};
    if (shape == null ||
        (shape != 'square' &&
            shape != 'circle' &&
            shape != 'rectangle' &&
            shape != 'triangle')) {
        return res.status(400).json({ error: `${shape} is not a valid shape.` });
        // return res.status(statusCode).json({ message: err.message })
    }
    if ((shape == 'triangle' && (typeof dimension !== 'object' || length !== 3)) ||
        (shape == 'rectangle' && (typeof dimension !== 'object' || length !== 2))) {
        // return res.status(statusCode).json({ message: err.message })
        return res
            .status(400)
            .json({ error: ` Invalid shape dimension of ${shape}.` });
    }
});
exports.validateInput = validateInput;
