# automart-3

[![Build Status](https://travis-ci.org/emmanueltct/automart-3.svg?branch=develop)](https://travis-ci.org/emmanueltct/automart-3)     [![Coverage Status](https://coveralls.io/repos/github/emmanueltct/automart-3/badge.svg?branch=develop)](https://coveralls.io/github/emmanueltct/automart-3?branch=develop)    [![Maintainability](https://api.codeclimate.com/v1/badges/9e4542a98921206d571f/maintainability)](https://codeclimate.com/github/emmanueltct/AutoMart/maintainability)

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

User can sign up.

User can sign in.

User (seller) can post a car sale advertisement.

User (buyer) can make a purchase order.

User (buyer) can update the price of his/her purchase order.

User (seller) can mark his/her posted AD as sold.

User (seller) can update the price of his/her posted AD.

User can view a specific car.

User can view all unsold cars.

User can view all unsold cars within a price range.

Admin can delete a posted AD record.

Admin can view all posted ads whether sold or unsold.

Optional Features

User can reset password.

User can add multiple pictures to a posted ad.

User can view all cars of a specific body type.

User can view all used unsold cars.

User can view all new unsold cars.

User can flag/report a posted AD as fraudulent.

User can view all unsold cards of a specific make (manufacturer).


## Used Tools

### Language
*Javascript*
### Server Environment

 *NodeJS* (run time Environment for running JS codes)

### Framework

 *Express* (used for building fast APIs)

### Database
 *Postgres*
### Testing Framework and assertion library
 *Mocha* and *Chai*

### Continuous Integration

Travis CI
### Test Coverage
nyc

### Git badge

coveralls

### Deployment
Heroku
### heroku app
https://automart89.herokuapp.com

### Heroku link Example

*user signup*

https://automart89.herokuapp.com/api/v2/auth/signup

*user login*

https://automart89.herokuapp.com/api/v2/auth/signin

*POSt car Ad*

https://automart89.herokuapp.com/api/v2/car

*view single car*

https://automart89.herokuapp.com/api/v2/car/1

*view all unsold car*

https://automart89.herokuapp.com/api/v2/car?status=available

*view all in price range*

https://automart89.herokuapp.com/api/v2/car?status=available?min_price=100&max_price=10000

*view all car with new state*

https://automart89.herokuapp.com/api/v2/car?status=available&state=new

*view all used car*

https://automart89.herokuapp.com/api/v2/car?status=available&state=used

*making order request*

https://automart89.herokuapp.com/api/v2/order

*updating the price of order request*

https://automart89.herokuapp.com/api/v2/order/3/price

*upadting the status car (mark as sold)*

https://automart89.herokuapp.com/api/v2/car/5/status

*updating the price of car AD*

https://automart89.herokuapp.com/api/v2/car/1/price

*admin delete car*

https://automart89.herokuapp.com/api/v2/car/1


