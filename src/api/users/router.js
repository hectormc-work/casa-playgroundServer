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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const collection_1 = __importDefault(require("./collection"));
const router = express_1.default.Router();
exports.usersRouter = router;
router.post('/session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Find user (replace this with database query in real use case)
    const user = yield collection_1.default.findOneByUsernameAndPassword(username, password);
    if (!user) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }
    // Generate JWT
    // const token = jwt.sign({username: user.username}, secret, {expiresIn: '1y'});
    // res.status(200).send({token});
    // TODO init session
}));
