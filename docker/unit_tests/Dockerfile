FROM python:3.10

WORKDIR /code/tests

COPY . .

RUN pip install --no-cache-dir -r ./unit_tests/requirements.txt

ENTRYPOINT [ "python3", "./test_rabbitmq.py" ]