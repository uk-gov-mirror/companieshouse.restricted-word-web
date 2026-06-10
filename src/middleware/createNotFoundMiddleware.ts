import { RequestHandler } from "express";

const createNotFoundMiddleware = function (): RequestHandler {
    return (_request, response) => {
        response.status(404);

        return response.render("404");
    };
};

export default createNotFoundMiddleware;
