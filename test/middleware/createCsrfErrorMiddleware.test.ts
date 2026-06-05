import sinon from "sinon";
import middleware from "../../src/middleware/createCsrfErrorMiddleware";
import { CsrfError } from "@companieshouse/web-security-node";

const createMockResponse = function () {
    return {
        redirect: sinon.stub(),
        status: sinon.stub(),
        render: sinon.stub()
    };
};

const createMockNext = function () {
    return sinon.stub();
};

describe("createCsrfErrorMiddleware", function () {

    it("not a csrf error", function () {
        const error = new Error("Not a Csrf error");
        const response = createMockResponse();
        const mockNext = createMockNext();

        middleware(error, {} as any, response as any, mockNext as any);

        sinon.assert.notCalled(response.status);
        sinon.assert.calledOnceWithExactly(mockNext, error);
    });

    it("csrf error", function () {
        const error = new CsrfError("a Csrf error");
        const response = createMockResponse();
        const mockNext = createMockNext();
        response.status.returns(response);

        middleware(error, {} as any, response as any, mockNext as any);

        sinon.assert.calledOnceWithExactly(response.status, 403);
        sinon.assert.notCalled(mockNext);
        sinon.assert.calledOnceWithExactly(response.render, "403", {
            csrfErrors: true
        });
    });
});
