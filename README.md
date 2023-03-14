## Requirments 
Docker and docker-compose: https://docs.docker.com/engine/install/ubuntu/

GIT LFS: https://git-lfs.com/

## Description
This repository contains three components.
### A postgres database
The database is used as a backend for storing data for the data generator
### A data generator REST service
The REST services provides log messages upon make a regquest. 
### A REST endpoint for prediction
The REST endpoint for prediction takes a json as input and predicts the probability that the harddrive is failing. Optinally a threshold for anomalies can be provided.
## Running the code
Ensure that GIT LFS is installed and that the CSV file is downloaded propperly. If the CSV only contains a SHA pointer, run the following commands:

```bash
git lfs fetch
git lfs checkout
```

From the root of the project (same folder as the readme), run 
```bash
docker-compose -f docker/docker-compose.yaml up   
```
Alternatively you can use the make command (requires make)
```bash
make compose_up
```
It can take several minutes for the services to be ready. Go grab a cup of coffe!

### Acessing the data generator
By default the data generator listen on localhost:8000 <br>
Swagger ui is provided on localhost:8000/docs

### Acessing the prediction service
The prediction rest services listens on localhost:8001 <br>
Swagger ui is provided on localhost:8001/docs
