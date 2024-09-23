FROM python:3

ARG USER_NAME
ARG ROOT_PASS
ARG USER_PASS

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update                 \
    && apt-get upgrade -y          \
    && apt-get install -y sudo     \
    && rm -rf "/var/lib/apt/lists/*"

COPY requirements.txt .
RUN pip3 install -r requirements.txt
