# demos-be
```
#### manual installation
```
```
#### # git clone git@github.com:cocoons/newDemos.git

#### # cd newDemos/demos-be

#### npm i pg pg-hstore
#### npm i sequelize pg pg-hstore
#### # npm install  

#### # Start DB service
docker-compose up

#### # node ./expressServer.js (make sure the postgres container is up first "docker-compose-up")
  
<br> 

# Initialize the database with demo data
curl -i 'localhost:8080/valtech/initDb'

<br>

# run server as a container run Dockerfile (make sure the postgres container is up first "docker-compose-up")
```
#### # cd newDemos/demos-be 

#### # docker build -t demos .

#### # docker run -p 8080:8080 --name demos-be demos-be
