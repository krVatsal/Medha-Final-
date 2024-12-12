import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

// Middleware for JWT verification
export const verifyJWTclient = asyncHandler(async (req, res, next) => {
  // First, try Passport authentication strategies
  passport.authenticate('jwt', { session: false }, async (err, client, info) => {
    try {
      // Handle any authentication errors
      if (err) {
        console.error('Authentication Error:', err);
        return next(new ApiError(401, 'Authentication error'))
      }

      // If no client found through JWT
      if (!client) {
        // Check for other authentication methods (local or Google)
        if (req.isAuthenticated()) {
          // If authenticated through Passport (local or Google)
          req.client = req.user;
          return next();
        }

        // If no authentication method worked
        return next(new ApiError(401, 'Unauthorized request'));
      }

      // JWT authentication successful
      req.client = client;
      next();
    } catch (error) {
      console.error('Verification Error:', error);
      next(new ApiError(401, error?.message || 'Authentication failed'));
    }
  })(req, res, next);
});

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  // Check if user is authenticated through any method
  if (req.isAuthenticated()) {
    return next();
  }
  next(new ApiError(401, 'Please login to continue'));
};

// Middleware for specific role-based authentication
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.client) {
      return next(new ApiError(401, 'Not authenticated'));
    }

    if (!roles.includes(req.client.role)) {
      return next(new ApiError(403, 'Access denied'));
    }

    next();
  };
};