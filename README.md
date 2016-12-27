Angular 2 Testing with Webpack, Mocha, Chai and Sinon.
===================


Hey! In this post, we will see how to unit test an Angular 2 application with Mocha, on both, browser and Node. (Without Karma or PhantomJs).

Before I write this post, I've googled to find an existing post doing the same thing and I found a post on [Radzen blog](http://www.radzen.com/blog/testing-angular-webpack-mocha/) that work fine except when I tried to add an **ngFor** directive, the following error was thrown :

 
 Don't worry, I know how to fix it !!
 
 So, let start.
 
-------------
Settings
-------------

Bad things first :

> **package.json:**

