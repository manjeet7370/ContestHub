# ContestHub

ContestHub is a full-stack coding contest platform inspired by competitive programming websites such as CodeChef and LeetCode. It allows users to participate in coding contests, solve programming problems, submit solutions, and receive automated verdicts through an online judge system powered by Judge0.

---

## Features

### User Features

* User Registration and Login using JWT Authentication
* Secure Protected Routes
* Browse Available Coding Contests
* View Contest Details and Problems
* View Problem Statements with Sample Test Cases
* Solve Problems using Monaco Code Editor
* Multi-language Code Templates (C++, Python, JavaScript)
* Submit Solutions
* Automatic Code Compilation and Execution
* Real-Time Verdict Generation
* View Submission History
* View Submission Verdict Status

### Admin Features

* Role-Based Access Control (ADMIN / USER)
* Admin Dashboard
* Create Coding Contests
* Create Problems
* Associate Problems with Contests
* Create Sample Test Cases
* Create Hidden Test Cases
* Manage Contest Data

---

## Online Judge Features

* Judge0 API Integration
* Multi-Language Code Execution
* Hidden Test Case Evaluation
* Multiple Test Case Validation
* Accepted Verdict
* Wrong Answer Verdict
* Compilation Error Verdict
* Runtime Error Verdict
* Automatic Verdict Storage in Database

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Monaco Editor

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js
* Judge0 API

### Database

* PostgreSQL
* Prisma ORM

---

## Database Schema

### User

* id
* name
* email
* password
* role
* createdAt

### Contest

* id
* title
* description
* startTime
* endTime
* createdById

### Problem

* id
* title
* statement
* difficulty
* contestId
* createdAt

### Submission

* id
* code
* language
* verdict
* userId
* problemId

### TestCase

* id
* input
* expectedOutput
* explanation
* isSample
* problemId
* createdAt

---

## Implemented APIs

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Contest

* GET /api/contest
* GET /api/contest/:id

### Problem

* GET /api/problem
* GET /api/problem/:id
* GET /api/problem/:id/submissions

### Submission

* POST /api/submission/create
* GET /api/submission/my

### Admin

* GET /api/admin/dashboard
* POST /api/admin/contest/create
* POST /api/admin/problem/create
* POST /api/admin/testcase/create

---

## Current Progress

### Completed

* JWT Authentication
* User Registration & Login
* Protected Routes
* Role-Based Authorization
* Contest Management
* Problem Management
* Admin Dashboard
* Monaco Editor Integration
* Submission System
* Sample Test Case System
* Hidden Test Case System
* Problem Details Page
* Sample Test Case Display
* Submission History API
* PostgreSQL + Prisma Integration
* Judge0 Integration
* Multi-Language Code Execution
* Multiple Hidden Test Case Validation
* Accepted Verdict Generation
* Wrong Answer Verdict Generation
* Compilation Error Detection
* Runtime Error Detection
* Verdict Storage in Database

---

## Planned Features

* Submission History Page UI
* Verdict Color Indicators
* Run Code with Custom Input
* Contest Leaderboard
* Contest Rankings
* Contest Timer
* Admin Analytics Dashboard
* Edit Contest
* Delete Contest
* Edit Problem
* Delete Problem

---

## Current Workflow

### Admin

Create Contest
→ Create Problem
→ Add Sample Test Cases
→ Add Hidden Test Cases
→ Publish Contest

### User

Register/Login
→ Browse Contests
→ Open Problem
→ Read Statement & Examples
→ Write Code
→ Submit Solution
→ Judge0 Executes Code
→ Hidden Test Cases Run
→ Verdict Generated
→ View Submission History

---

## Author

Manjeet Kumar

B.Tech Mathematics and Computing
IIIT Bhagalpur

GitHub: https://github.com/manjeet7370
