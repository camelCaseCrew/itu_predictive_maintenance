| ![Logo](/images/PredictIT.png) |
|:--:|
| A collaboration between *Systematic* and *'camelCaseCrew'* |

---

## Description
'PredictIT' is a system for predicting and visualizing device failures. It was developed by a team of ITU students known as 'camelCaseCrew', as a part of a course on scrum and software development in large teams.

---

## Requirements 
Docker and docker-compose: https://docs.docker.com/engine/install/ubuntu/

GIT LFS: https://git-lfs.com/

NodeJS (for the node package manager): https://nodejs.org/en/download - this is only necessary for testing

---

## Getting the code

Since the file `/data_generator/data/harddrive.csv` is too large for git to pull, one has to use 'GIT LFS'.

```bash
git lfs fetch
git lfs checkout
```

---

Alternatively, the file can be downloaded directly.

## Running the system

Run docker-compose in detached mode with `make compose_up`.

Run it attached with `make compose_up_attached`.

Then visit [http://localhost:3001](http://localhost:3001)

*Note*: sometimes the 'rabbitmq' service is unhealthy - just delete all containers and run it again.

To build, run `make build_services`

It is also possible to run the frontend seperately (without docker) from the rest of the system.

```bash
cd frontend/
npm install
npm run dev
```

Then visit [http://localhost:3003](http://localhost:3003)

### Configuration

#### Data stream simulation

The data stream simulation can be run at 3 different levels of intensities. You first have to run the system with either forementioned command.

- 250 records pr minute: `make low_throughput_data_simulation`
- 1000 records per minute: `make medium_throughput_data_simulation`
- 4000 records per minute: `make high_throughput_data_simulation`

#### ML Worker replication

To launch multiple ML-workers at once, the `--scale` flag can be used.

E.g. the following command will launch 3 instances of the ML-worker on startup:

```bash
docker-compose -f docker/docker-compose.yaml up --scale predictive_maintenance=3
```

#### Increasing amount of simulated data

The default is 50.000 rows taken out of `data_generator/data/harddrive.csv`. 
Unfortunately there is no simple way of configuring this amount, it has to be hardcoded.
This can be done on line 35 of `data_generator/data_generator/app/main.py`. 
The last argument given to CSV_Parser can be changed to any number (the last digit is not allowed to be zero).

#### Front-End Config-Guide
These are the files that are unique for the specific pages.

## History Page:
LogData
|_LogDataComponent
FeedbackButton
tailwind.config.js(Colours)

## Index Page:
ClickableIframe
OverviewButton

## Health-Graps Page:
Is currently self-contained.
Right now the context global.tsx supports this page with a global filter value, this is currently hardcoded to:
1 = Healthy
2 = Risk
3 = Critical
The other pages and components modify this value.

## NavBar
Navbar
|_NavbarButton
|_Logo
|_BackButton
---

## System architecture

| ![System Architecture](/images/StackDiagram.png) |
|:--:|
| *General connections between system services* |

### Services

**Frontend** - visualizes health of devices. The ability to register new email-addresses to the alerting system. The ability to view and 'flag' specific device health logs.

**Grafana** - this is where graphs on the frontend are sourced from.

**Prometheus** - timeseries database responsible for storing all processed device health data. Responsible for detecting when to send alerts.

**Alert manager** - manages alerts received from prometheus. Registers and deregisters email-adresses. Generates emails to be sent.

**SMTP server** - Sends alert emails.

**Data aggregator** - collects processed data and presents it in a way such that prometheus can collect the data.

**RabbitMQ** - message queue that backend-services interact with when pulling and pushing processed/unprocessed data.

**ML Worker** - pulls in unprocessed data from the message queue, processes it (finds device health), puts the processed data back again.

**Data generator** - pushes unprocessed data to the message queue.

**Database** - stores unprocessed data, as well as logs that have been 'flagged' on the frontend.

### Accessing different services

The different services are available at the following ports:

- **Frontend**: [http://localhost:3001](http://localhost:3001)
  - If run with `npm run dev`: [http://localhost:3003](http://localhost:3003)
- **Grafana**: [http://localhost:3000](http://localhost:3000)
  - with credentials `admin:admin`
- **Prometheus**: [http://localhost:9090](http://localhost:9090)
- **RabbitMQ**: [http://localhost:15672](http://localhost:15672)
  - with credentials `guest:guest`
- **Data Aggregator**: [http://localhost:8003/metrics](http://localhost:8003/metrics)
- **Alert manager**: [http://localhost:9093](http://localhost:9093)

### Registering and deregistering emails

To register a new email with the alert manager, make sure 'curl' or a similar tool is installed.

**Registering:**

```bash
curl -X PUT http://localhost:5000/update/<email>
curl -X POST http://localhost:9093/-/reload
```

**Deregistering:**

```bash
curl -X DELETE http://localhost:5000/remove/<email>
curl -X POST http://localhost:9093/-/reload
```

---

## Testing

There are two different types of tests: End-to-end cypress tests and testing of specific services

### End-to-end tests

```bash
# from project root
make # or another command to run the system
npm install
npx cypress run
```

One can also use `npx cypress open`, to open the testing UI.

Screenshots and videos of the tests end up in `cypress/screenshots` and `cypress/videos` respectively.

### Services tests

There are tests for the following services:

- data-aggregator
- data-stream
- feedback-storage
- ml-worker
- rabbitmq

```bash
docker build -t unit_tests ./unit_tests/<service>/
# from project root
make # or any other command to run the system
# wait till services are healthy/running
docker run --network docker_predictive-maintenance-net unit_tests
```

Replace `<service>` with whichever service is to be tested from the above list.
