FROM golang:1.21-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

// COPY .env ./
COPY *.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o app ./main.go

EXPOSE 8080

CMD ["./app"]
