FROM python:3.10

WORKDIR /code/tests

COPY ./tests/unit_tests .

RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT [ "python3", "./test_rabbitmq.py" ]