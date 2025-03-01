# healthcare-backend

# Technologies used
NodeJS Version - 22.14.0

# Database
MongoDB 

# Schema
User
   
Goal Tracker


# To start a app 
    1. Install the packages - npm i -s 
    2. Command to run - npm start

# API 

    1. GET /users/:id 
        header - Autherization <token>
    2. POST /register
        {payload: email, password}
    3. POST /login
        {payload: email, password}
    4. GET /admin/:id
        header - Autherization <token>
    5. GET /admin/:id/users
        header - Autherization <token>
    6. PUT /users/:id
        {payload: name, age, health_issues: [], weight, height }



