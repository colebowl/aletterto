FROM golang:alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

COPY ./.env.docker ./.env

RUN go build -o /app/library-api

EXPOSE 8080

CMD ["/app/library-api"]