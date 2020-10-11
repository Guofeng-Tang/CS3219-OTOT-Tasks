FROM golang:alpine

ENV PORT=4000
ENV GO111MODULE=on

WORKDIR /app

COPY . .

RUN go build -o ./app ./main.go

EXPOSE ${PORT}

ENTRYPOINT ["./app"]
