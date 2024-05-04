import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { authenticate } from '../../src/middlewares';

// Mock the jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));


describe('Authentication Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock<NextFunction>;

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: 'Bearer validtoken123'
      }
    };

    mockResponse = {
      locals: {}
    };

    nextFunction = jest.fn();

    // JWT_SECRET environment variable for testing
    process.env.JWT_SECRET = 'secret';
  });

  // Test case to verify valid token handling
  it('should authenticate a valid token', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => ({ id: '123', username: 'testuser' }));
    if (mockResponse.locals && mockRequest.headers) {
      authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.locals.user).toBeDefined();
      expect(nextFunction).toHaveBeenCalled();
      expect(nextFunction).toHaveBeenCalledWith(); // Expecting call without errors
    }
  });

  it('should throw an error if no token is provided', () => {
    if (mockRequest.headers) {
        mockRequest.headers.authorization = '';

    
      authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(Error));
      expect(nextFunction.mock.calls[0][0].message).toBe('No token provided');
      expect(nextFunction.mock.calls[0][0].status).toBe(401);
    }
  });

  // Test case to handle errors from token verification
  it('should handle errors from token verification', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    if (mockRequest.headers) {
      authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(Error));
      expect(nextFunction.mock.calls[0][0].message).toBe('Invalid token');
    }
  });

  // Test case to handle incorrect token format
  it('should handle cases where token cannot be split correctly', () => {
    if (mockRequest.headers) {
      mockRequest.headers.authorization = 'Bearer';
      authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(Error));
      expect(nextFunction.mock.calls[0][0].message).toBe('No token provided');
    }
  });
});
