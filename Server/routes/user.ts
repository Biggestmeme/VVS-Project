

import * as express from 'express'
import { addUser } from '../controllers/chat/chat';

export const router : express.Router = express.Router();
router.post('/addUser',function(req,res) {
    addUser(req,res);
});

module.exports = {router};