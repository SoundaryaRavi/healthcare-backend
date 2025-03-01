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
    7. Adding goals POST /api/goalTracker
         { activityName, activityValue }
    8. Getting goal tracker for user GET /api/goalTracker
    9. Get the tips for the user GET /api/tips
          
         



# DB SCHEMA
    User collection:

    1. first_name - String
    2. email - string with email pattern check
    3. role - Enum [ 'admin', 'patient' ]
    4. weight - Number
    5. height - Number 
    6. age - Number

    Activity Logs
    1. userId:  Schema.Types.ObjectId, ref: 'User'
    2. logType: Number
    3. logContent: String

    Reminders
    1. userId:  Schema.Types.ObjectId, ref: 'User'
    2. date: Date
    3. content: String


    Tips
    1.  healthTip: String,
    2. category: Enum ['steps', 'waterIntaken', 'sleep']


# Scalability measures: 
    1. We have used stateless system so this server can be replicated.
    2. We used MongoDB which can be scalable horizontally.
    
# Performance: 
    1. Made User id Indexing
    
# UNIT testing
    1. Used Jest to test the user controller


# IMPROVEMENTS

    1. We can user Redis for token storage as well as recently fetched data.
    2. We can use Docker to build image and push the container to AWS. 
    3. We can use clusters for multiple servers
    4. We can use rate limitter and store the api hits in Redis












