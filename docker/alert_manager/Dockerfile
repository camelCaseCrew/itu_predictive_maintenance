FROM python:3.7.4-alpine3.10

WORKDIR /alert_manager

COPY ../alert_manager/ .

RUN chmod +x alertmanager

RUN pip install flask
RUN pip install pyyaml

EXPOSE 5000

CMD ["sh", "run.sh"]