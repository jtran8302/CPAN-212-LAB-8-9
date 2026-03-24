# NorthStar Insurance Platform — Secure Full-Stack Insurance System

## Student

Quang Hung Tran [n01650970]

## What This Is

A secure full-stack insurance platform for NorthStar Insurance & Financial Services. Customers manage their insurance policies, request amendments, request coverage reductions, and submit claims. Internal staff create policies, review requests, and process claims. Administrators manage users, roles, and permissions. All communication runs over HTTPS, authentication uses JWT, and authorization uses role-based access control (RBAC).

## Architecture

Next.js frontend on https://localhost:3000 calls Express REST API on https://localhost:5001/api. Backend runs over HTTPS using a PFX certificate. MongoDB stores users, roles, policies, amendments, reductions, and claims. JWT tokens carry userId, username, and roles. Backend middleware validates tokens and checks roles on every protected request.

## Technology Stack

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT (jsonwebtoken), bcryptjs, HTTPS with PFX certificate, helmet, cors, morgan, express-validator, dotenv

Frontend: React, Next.js, TypeScript, fetch API with Bearer token auth

## Setup

### Backend

cd backend-api
cp .env.example .env (then fill in your values)
npm install
node src/seed/roles.seed.js
node src/seed/users.seed.js
node src/seed/policies.seed.js
npm run dev

### Frontend

cd frontend-web
cp .env.local.example .env.local
npm install
npm run dev

### Certificate Setup

Backend uses a PFX certificate for HTTPS. Place your PFX file at backend-api/cert/server.pfx. Set the passphrase in your .env file under HTTPS_PFX_PASSPHRASE. You can generate a development certificate using mkcert or OpenSSL. Frontend uses Next.js experimental HTTPS with self-signed certificates generated automatically on first run.

### Environment Configuration

Backend .env:
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/insurance_platform
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRES_IN=2h
FRONTEND_URL=https://localhost:3000
HTTPS_PFX_PATH=./cert/server.pfx
HTTPS_PFX_PASSPHRASE=replace_with_pfx_password

Frontend .env.local:
NEXT_PUBLIC_API_BASE_URL=https://localhost:5001/api

## Sample Users and Roles

All users use password: Password123!

admin1 — Administrator. Full platform access, user management, RBAC management, can view and manage all resources.

customer1 — Customer. Can view own profile, own policies, request amendments, request reductions, submit claims, view own claims.

customer2 — Customer. Second customer for testing ownership separation.

agent1 — Insurance Agent. Can create policies and service customers.

underwriter1 — Underwriter. Can approve or reject amendment and reduction requests.

adjuster1 — Claims Adjuster. Can approve or reject submitted claims.

## User Roles

Customer: view own profile, view own policies, request amendments, request reductions, submit claims, view own claims. Cannot access other customers' data or approve anything.

Agent: create policies, view assigned customer profiles, initiate service requests. Cannot approve claims or manage roles.

Underwriter: approve or reject amendment requests, approve or reject reduction requests. Cannot manage users or approve claims.

Claims Adjuster: review submitted claims, approve or reject claims, update claim status. Cannot approve amendments or manage RBAC.

Customer Service Representative: view customer profiles and policies, assist with non-sensitive updates. Cannot approve claims or amendments.

Compliance Officer: view users, roles, and access assignments in read-only mode. Cannot create policies or approve transactions.

Administrator: full access. Create, view, update, disable, reactivate user accounts. Assign and remove roles. View all policies and claims. Override operational access where permitted.

## JWT Authentication

User submits username and password to POST /api/auth/login. Backend validates credentials using bcrypt.compare against stored password hash. On success, backend signs a JWT containing userId, username, and roles array using jsonwebtoken with the JWT_SECRET from .env. Token has configurable expiration (default 2h).

Frontend stores the token in localStorage. Every subsequent API request includes the token in the Authorization header as "Bearer <token>". Backend authenticate middleware extracts the token, verifies it with jwt.verify, and attaches the decoded payload to req.auth and req.user. If the token is missing, malformed, expired, or blacklisted (after logout), the request is rejected with 401.

JWT payload includes: userId, username, roles (array of role name strings), iat (issued at), exp (expiration).

Passwords are never stored in tokens or returned in API responses.

## Logout

Logout is implemented with both frontend and backend support. When the user clicks Logout, the frontend calls POST /api/auth/logout which adds the current token to an in-memory blacklist. The authenticate middleware checks the blacklist on every request. After logout, the frontend clears the token and user data from localStorage and redirects to the login page. Any attempt to use a blacklisted token returns 401 "Token has been revoked".

## User Profile Module

Each user has two layers. The authentication layer includes userId, username, passwordHash, accountStatus, roles, and timestamps. The business profile layer includes firstName, lastName, dateOfBirth, email, phone, address fields (line1, line2, city, province, postalCode, country), customerNumber or employeeNumber, userType, preferredContactMethod, emergency contact fields. Internal users additionally have department, jobTitle, and supervisorName.

Customers can view their own full profile and edit selected personal fields. They cannot edit role, status, or security fields. Administrators can view all profiles, update any profile, activate or deactivate accounts, and assign or remove roles.

Profile routes: GET /api/profile/me (view own), PUT /api/profile/me (update own allowed fields).

## RBAC Management

RBAC is managed by the administrator through dedicated API routes. Only users with the ADMIN role can assign or remove roles. The authorizeRoles middleware checks req.auth.roles against the allowed roles for each route. Users cannot elevate their own access.

Admin RBAC routes: GET /api/admin/rbac/roles (list all roles), PUT /api/admin/rbac/users/:userId/roles (assign roles to user).

Admin user management routes: GET /api/admin/users (list all users), PUT /api/admin/users/:userId/status (activate or deactivate account).

Role changes take effect on the next login since roles are encoded in the JWT at login time.

## HTTPS Configuration

The backend Express server runs through Node.js HTTPS module using a PFX certificate. The getHttpsOptions function reads the PFX file and passphrase from the environment configuration. The server starts on https://localhost:5001. The frontend Next.js application also runs over HTTPS using experimental self-signed certificates on https://localhost:3000. All API communication between frontend and backend uses HTTPS.

## Protected Routes

Backend: Every route except /api/auth/login and /api/auth/health requires a valid JWT via the authenticate middleware. Role-specific routes use authorizeRoles middleware. Ownership-sensitive routes (amendments, claims, reductions) use requirePolicyOwnership middleware to ensure customers can only act on their own policies.

Frontend: ProtectedRoute component checks if a user is authenticated before rendering protected pages. RoleGuard component restricts page access based on user roles. OwnershipGuard ensures customers see only their own data. Unauthorized users are redirected to the login page or an unauthorized page.

## API Endpoints

Auth: POST /api/auth/login, POST /api/auth/logout, GET /api/auth/health

Profile: GET /api/profile/me, PUT /api/profile/me

Admin Users: GET /api/admin/users, PUT /api/admin/users/:userId/status

Admin RBAC: GET /api/admin/rbac/roles, PUT /api/admin/rbac/users/:userId/roles

Policies: GET /api/policies, POST /api/policies (Agent, Admin)

Amendments: GET /api/amendments, POST /api/amendments (Customer, Agent, Admin), PUT /api/amendments/:amendmentId/decision (Underwriter, Admin)

Reductions: GET /api/reductions, POST /api/reductions (Customer, Agent, Admin), PUT /api/reductions/:reductionId/decision (Underwriter, Admin)

Claims: GET /api/claims, POST /api/claims (Customer, Admin), PUT /api/claims/:claimId/decision (Claims Adjuster, Admin)

Dashboard: GET /api/dashboard

## Business Objects

Policy: policyNumber, insuranceType (LIFE, CAR, HOME), customer reference, coverageAmount, premiumAmount, currency, effectiveDate, expiryDate, status, createdBy.

Amendment Request: policy reference, requestedBy, requestType, currentValue, requestedValue, reason, status (PENDING, APPROVED, REJECTED), reviewedBy, reviewComment.

Reduction Request: policy reference, requestedBy, currentCoverage, requestedCoverage, reason, status (PENDING, APPROVED, REJECTED), reviewedBy, reviewComment.

Claim: policy reference, submittedBy, claimType, incidentDate, claimAmount, description, status (SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, PAID), assignedAdjuster, decisionComment.

## Security Best Practices

Backend served through HTTPS. JWT with 2-hour expiration. Passwords hashed with bcrypt, never stored in tokens or responses. No secrets hard-coded in source code, all loaded from .env. Protected APIs enforce authentication via middleware. Role-based checks enforce authorization. Ownership rules protect customer records. Helmet middleware sets security headers. CORS configured to allow only the frontend origin. Input validation on all incoming requests using express-validator. Centralized error middleware prevents exposing internals. Correct handling of 401 Unauthorized and 403 Forbidden responses. Token blacklist on logout prevents reuse of revoked tokens.

## Project Structure

backend-api/src/config — environment, CORS, database, HTTPS configuration
backend-api/src/constants — roles, permissions, status enums
backend-api/src/controllers — request handlers for each module
backend-api/src/middleware — auth, role, ownership, error, validation middleware
backend-api/src/models — Mongoose schemas for User, Role, Policy, AmendmentRequest, ReductionRequest, Claim, AuditLog
backend-api/src/repositories — database access layer
backend-api/src/routes — Express route definitions
backend-api/src/seed — seed scripts for roles, users, policies
backend-api/src/services — business logic layer
backend-api/src/utils — API response helpers, error classes, token blacklist
backend-api/src/validators — express-validator rules

frontend-web/src/app — Next.js pages (login, dashboard, profile, policies, amendments, reductions, claims, admin)
frontend-web/src/components — reusable UI components (forms, tables, guards, layout, dashboard, feedback)
frontend-web/src/context — AuthContext for authentication state
frontend-web/src/hooks — custom hooks (useAuth, useApi, useRoleAccess)
frontend-web/src/lib — API client, auth helpers, constants, formatters
frontend-web/src/types — TypeScript type definitions

## Testing

Test accounts after running seed scripts (all use Password123!): admin1 (Administrator), customer1 (Customer), customer2 (Customer), agent1 (Agent), underwriter1 (Underwriter), adjuster1 (Claims Adjuster).

Test scenarios verified with Postman and browser:
1. Backend starts successfully over HTTPS
2. Valid login returns JWT token
3. Invalid login is rejected with 401
4. Expired or invalid token is rejected with 401
5. Customer can view own profile
6. Customer cannot view other users (403 Forbidden)
7. Admin can list all users
8. Admin can assign roles to a user
9. Non-admin cannot assign roles (403 Forbidden)
10. Customer can view only own policies
11. Agent can create a policy
12. Underwriter can approve amendment
13. Non-underwriter cannot approve amendment (403 Forbidden)
14. Customer can submit a claim
15. Claims adjuster can approve or reject a claim
16. Non-adjuster cannot approve a claim (403 Forbidden)
17. Logout blacklists the token, subsequent requests return 401 "Token has been revoked"
18. Frontend redirects unauthorized users to login page
