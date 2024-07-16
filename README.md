
# Cryptocurrency Price Tracker


plase remove old docker file becace databace schema is changing. <br>
Update backend and frontend add more typescript feature.



git clone https://github.com/vitgithup/CryptocurrencyPriceTracker

## Start process
cd CryptocurrencyPriceTracker <br>
docker compose up -d cryptocron

### Migration DB : only run at the first time
docker compose up -d db <br>
docker exec -it backend npx prisma migrate dev --name init <br>


## Backend
http://localhost:4000/
## Frontend
http://localhost:3000/


## coinmarketcap.com
user API from coinmarketcap.com.  Yse Quotes Latest v2. <br>
By change cryptocurrency name to slug as the query parameters.

### Quotes Latest v2
https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest

Query Parameters : skip_invalid  <span style="color:red">*** don't work</span>


program will use input cryptocurrency name and conver to slug to call the api : 
https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest



## Docker 

**cryptocron** : cron job run every minute to get price from  coinmarketcap
* * * * * root /usr/local/bin/my_script.sh 


**frontend** : next.js front end user interface 


**backend** : prisma [https://www.prisma.io/] ,   express


**db** : postgresql

