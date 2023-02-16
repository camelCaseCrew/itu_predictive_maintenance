## Requirments
Docker and docker-compose: https://docs.docker.com/engine/install/ubuntu/

## Description
This repository contains three components.

### A postgres database
The database is used as a backend for storing log messages for the data generator
### A data generator REST service
The REST services provides log messages upon make a regquest. 
### A REST endpoint for the anomaly detection model
The REST endpoint for anomaly detection takes a log message as input and predicts if the message is an anomaly. Optinally a threshold for anomalies can be provided.
## Running the code
From the root of the project (same folder as the readme), run 
```bash
docker-compose -f docker/docker-compose.yaml up   
```
Alternatively you can use the make command
```bash
make compose_up
```

### Acessing the data generator
By default the data generator listen on localhost:8000 <br>
Swagger ui is provided on localhost:8000/docs

### Acessing the anomaly detection service
The anomaly detection rest services listens on localhost:8001 <br>
Swagger ui is provided on localhost:8001/docs