FROM python:3.10

WORKDIR /app

COPY . .

RUN ls

RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT [ "python3", "./test.py" ]