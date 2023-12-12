# Heard Take Home Assessment

## About Heard
[Heard](https://www.joinheard.com/) is an all-in-one financial solution for therapists that combines software and human support to handle bookkeeping, taxes, payroll, and more. Our mission is to help therapists be therapists by acting as their financial back office to empower therapists to spend less time running their business and more time giving clients the help and support they need through an affordable, easy-to-use software tool with real-time human support.

Heard is growing rapidly, and could use your expertise to help us become an industry-leading software services provider for independent mental health practitioners!

## About the Take Home
Welcome to the first stage of our technical interview process! As part of your application, we invite you to complete a take-home software assessment. This assessment is designed to showcase your coding abilities and understanding of web application development.

The task is to build a simple CRUD (Create, Retrieve, Update, Delete) web application consisting of a frontend with which a user can interact, a backend, and a datastore of your choice. This app will be used to interact with transaction data. 

This application will form a basis for discussion in subsequent stages of the interview process, where you may be asked to extend its functionality or discuss the choices you made while building it.

### Key Objectives
---
- **Frontend + Backend**: The primary purpose of this exercise is to showcase your full-stack skills in both the frontend and backend. You can choose the technologies and frameworks you are most comfortable with.
- **Complete CRUD Operations**: The web app should enable users to create new transactions, retrieve existing ones, update them, and delete them as needed.
- **Data Persistence**: Transactions should be stored so that they persist between sessions (e.g., local database works great).
- **Git Repository**: All code should be uploaded to a Git-based repository (such as GitHub or GitLab) for review.
- **Documentation**: Please include clear documentation on how to run your service and website locally. This should guide any reviewer through setting up and using your application.
- **Dependencies**: List any dependencies in your documentation so that anyone cloning the repository knows what they need to install to run your application.
- **Time Management**: Aim to spend at most 2 hours on this exercise. It's about demonstrating your approach to problem-solving and coding rather than delivering a feature-complete application.

### What's Less Important
---
- **Custom CSS/Styling**: While we appreciate a well-styled application, there are other focuses here. Feel free to use any CSS framework you are comfortable with.
- **Deployment**: There's no need to deploy the application. A version that runs locally on your machine is entirely sufficient.
Submission
- **Additional Features**: Features such as filtering, pagination, or advanced querying is not required.

Once you have completed the assessment, please provide the URL to your Git repository. Ensure that your repository is public or that access is granted to [@dperconti](https://github.com/dperconti).

## Financial Transaction Data App

Each transaction must include the following attributes:
- `transactionId`: A unique identifier for the transaction (string).
- `amount`: The transaction amount in cents (Int).
- `description`: A brief description of the transaction (string).
- `fromAccount`: an account identifier from which the amount will be _deducted_ from.
- `toAccount`: an account identifier from which the amount will be _added_ / _credited_ to.
- `transactionDate`: The date when the transaction occurred (string in the format of your choosing). Note that this will be used in further levels of the interview.

### Example Transactions

Full data example is available [HERE](./data/transactions.json).

```json
[
    {
        "title": "transaction_1",
        "description": "Transaction 1",
        "amount": 86203,
        "fromAccount": "account_3",
        "toAccount": "account_6",
        "transactionDate": "2023-05-24"
    },
    {
        "title": "transaction_2",
        "description": "Transaction 2",
        "amount": 71532,
        "fromAccount": "account_4",
        "toAccount": "account_6",
        "transactionDate": "2023-04-15"
    }
    ...
]
```

## Other Considerations

> **❗** Note: These aren't all the technologies that we use at Heard, but most are relevant to our tech stack. 


### Technologies we Enjoy and/or Use
**Languages**

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) 

**Frontend Frameworks & Tools**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) 

**CSS Frameworks**

![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)

**API & App Frameworks**

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white) ![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

**Hosting/SaaS**

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white) ![Datadog](https://img.shields.io/badge/datadog-%23632CA6.svg?style=for-the-badge&logo=datadog&logoColor=white) ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

**ORMs**

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

**Version Control**

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Example

Below is an example of what your application _could_ look like. 

**List Transactions**
![Example dashboard for listing transaction data](./assets/List%20Transactions.png "Example dashboard for listing transaction data")

**Create Transaction**
![Example dashboard for creating a transaction](./assets/Create%20Transaction.png "Example dashboard for creating a transaction")

**Update Transaction**
![Example dashboard for updating a transaction](./assets/Update%20Transaction.png "Example dashboard for updating a transaction")
