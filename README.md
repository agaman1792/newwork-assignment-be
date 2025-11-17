# Assignment back-end

## Quickstart

#### Starting the API

Pull the docker image using docker and run it locally

```sh
docker run -d \
--name newwork-be \
-p 3000:3000 \
--env HUGGINGFACE_API_TOKEN=yourhftoken \
ghcr.io/agaman1792/newwork-assignment-be:0.0.1
```

#### Server logs

If you want to view the server logs, they are accessible by running the following command

```sh
docker logs -f newwork-be
```

## Environment variables

* HUGGINGFACE_API_TOKEN
