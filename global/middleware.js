import { print } from '../helpers/print.js'

// Tạo một tệp middleware.js hoặc sử dụng trong tệp route.js
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        print(token)
        res.sendStatus(200)
        next();
    } else {
        res.sendStatus(401);
    }
};