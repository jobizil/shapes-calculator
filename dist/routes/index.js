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
exports.router = void 0;
const express_1 = require("express");
const calculate_1 = require("../constants/calculate");
// import { validateInput } from '../utils/validator'
const database_1 = require("../utils/database");
const router = (0, express_1.Router)();
exports.router = router;
const readFileData = (0, database_1.readFromDatabase)();
router.post('/calculate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shape: shapeInput, dimension } = req.body;
    const shape = shapeInput.toLowerCase();
    const length = Object.keys(dimension).length;
    if (shape == null ||
        (shape != 'square' &&
            shape != 'circle' &&
            shape != 'rectangle' &&
            shape != 'triangle')) {
        return res.status(400).json({ error: `${shape} is not a valid shape.` });
    }
    if ((shape == 'triangle' && (typeof dimension !== 'object' || length !== 3)) ||
        (shape == 'rectangle' && (typeof dimension !== 'object' || length !== 2))) {
        return res
            .status(400)
            .json({ error: ` Invalid shape dimension of ${shape}.` });
    }
    // Perform Calculation.
    const area = (0, calculate_1.calculate)({ shape, dimension });
    //Create an Id
    let id = 0;
    if (readFileData.length == 0) {
        id = 1;
    }
    else {
        id = readFileData[readFileData.length - 1].id + 1;
    }
    const dataToWrite = Object.assign({ id, area: area.message }, { shape, dimension });
    if (readFileData.length == 0) {
        (0, database_1.writeInToDatabase)([dataToWrite]);
    }
    else {
        readFileData.push(dataToWrite);
        (0, database_1.writeInToDatabase)(readFileData);
    }
    return res.status(200).json({ msg: dataToWrite });
}));
/* GET all calculations */
router.get('/fetchRecords', (req, res) => {
    res.json((0, database_1.readFromDatabase)());
});
/*
export const handleResSuccess = (
  res: Response,
  message: string,
  data: any,
  statusCode: number
) => {
  return res.status(statusCode).json({
    message,
    data,
  })
}



export const handleResError = (res: Response, err: any, statusCode: number) => {
  return res.status(statusCode).json({
    message: err.message,
  })
}
 */
