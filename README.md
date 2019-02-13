---
Running Angular Tests with Webpack, Mocha, Chai and Sinon.
---


Using :

+ **Angular v7+**.

+ **Webpack v4.26.0**.

+ **Jsdom v13.0.0**.

+ **Mocha-webpack** for Node testing.

+ **Mocha-loader** for browser testing.

+ **Chai**, **Chai-spies** and **Sinon** for assertions, mocking, spying.


Clone the repo and do : 

    npm install

Launch Node tests with : 

    npm test

Launch Browser tests with : 

    npm run test:server 
    
=> Go to [localhost:8888]() to see the results.

Launch tests coverage with : 

    npm run test:coverage
    
To generate test and coverage reports, launch : 

    npm run test:reports

You can find some explaination [here](http://hichambi.github.io/2016/12/27/testing-angular2-with-webpack-mocha-on-browser-and-node.html).

Hope that can help.

Thanks,