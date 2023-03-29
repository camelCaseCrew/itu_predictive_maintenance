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

### Configuring the data generator
The data generator can be configured to run at three different levels of intensity.
- 1: 250 records a minute
- 2: 1000 records a minute
- 3: 4000 records a minute

To configure the data generator, run one of the following commands
```bash
make low_throughput_data_simulation
make medium_throughput_data_simulation
make high_throughput_data_simulation
```

### Acessing the prediction service
The prediction rest services listens on localhost:8001 <br>
Swagger ui is provided on localhost:8001/docs

### Acessing the front end

First, run the development server in the frontend folder or spin up the front end container:

```cmd terminal in the folder itu_predicitive_maintainance/frontend
npm run dev
# or
yarn dev
# or
pnpm dev
```

OR

docker compose -f docker/docker-compose.yaml up in itu_predicitive_maintainance

AFTER CMD-TERMINAL IS DONE:

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

###
