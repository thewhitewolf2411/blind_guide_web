import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import HttpError from '../models/HttpError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            //return res.status(403).json({message: "Could not log you in. Invalid Credentials."});
            return next(new HttpError(403, "Could not log you in. Invalid Credentials."));
        }

        let isValidPassword = false;
        isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) {
            //return res.status(403).json({message: "Could not log you in. Invalid Credentials."});
            return next(new HttpError(403, "Could not log you in. Invalid Credentials."));
        }

        const _token = jwt.sign(
            {userId: existingUser.id, email: existingUser.email},
            "IFTxAVOa61DELFkvNMu9",
            {expiresIn: '9999 years'}
        );

        return res.status(200).json({userId: existingUser.id, email: existingUser.email, token: _token, expirationDate: '9999 years'});
    
    } catch (err) {
        //return res.status(500).json({message: "Logging in failed, please try again later."});
        return next(new HttpError(500, "Logging in failed, please try again later."));
    }
}