// Import necessary modules from your Node environment and testing framework
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { authenticate } from '../../src/middlewares';

// Mock the jsonwebtoken module to control its behavior during tests
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

// Start describing your test suite
describe('Authentication Middleware', () => {
  // Declare variables to hold your mocked request, response, and next function
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock<NextFunction>;

  // Setup before each test to initialize the variables
  beforeEach(() => {
    // Initialize the request with authorization headers
    mockRequest = {
      headers: {
        authorization: 'Bearer validtoken123'
      }
    };

    // Initialize the response with an empty locals object
    mockResponse = {
      locals: {}
    };

    // Mock the next function using Jest
    nextFunction = jest.fn();

    // Set the JWT_SECRET environment variable for testing
    process.env.JWT_SECRET = 'secret';
  });

  // Test case to verify valid token handling
  it('should authenticate a valid token', () => {
    // Mock jwt.verify to simulate verifying a valid token
    (jwt.verify as jest.Mock).mockImplementation(() => ({ id: '123', username: 'testuser' }));

    // Type guard to ensure headers and locals are defined
    if (mockResponse.locals && mockRequest.headers) {
      authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.locals.user).toBeDefined();
      expect(nextFunction).toHaveBeenCalled();
      expect(nextFunction).toHaveBeenCalledWith(); // Expecting call without errors
    }
  });

  // Test case to handle situations where no token is provided
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
