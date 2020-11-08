COMMAND="$1"
TOPIC="$2"

if [ "$COMMAND" = "create" ]; then
    docker run \
    --rm -i \
    --network=cs3219-otot-tasks_default \
    wurstmeister/kafka kafka-topics.sh \
    --create \
    --topic "$TOPIC" \
    --partitions 1 \
    --replication-factor 3 \
    --zookeeper zk-1, zk-2, zk-3
elif [ "$COMMAND" = "list" ]; then
    docker run \
    --rm -i \
    --network=cs3219-otot-tasks_default \
    wurstmeister/kafka kafka-topics.sh \
    --list \
    --zookeeper zk-1, zk-2, zk-3
elif [ "$COMMAND" = "describe" ]; then
    docker run \
    --rm -i \
    --network=cs3219-otot-tasks_default \
    wurstmeister/kafka kafka-topics.sh \
    --describe \
    --topic "$TOPIC" \
    --bootstrap-server "kafka-1:9092, kafka-2:9092, kafka-3:9092"
elif [ "$COMMAND" = "delete" ]; then
    docker run \
    --rm -i \
    --network=cs3219-otot-tasks_default \
    wurstmeister/kafka kafka-topics.sh \
    --delete \
    --topic "$TOPIC" \
    --bootstrap-server "kafka-1:9092, kafka-2:9092, kafka-3:9092"
elif [ "$COMMAND" = "publish" ]; then
    docker run \
    --rm -i \
    --network=cs3219-otot-tasks_default \
    wurstmeister/kafka kafka-console-producer.sh \
    --topic "$TOPIC" \
    --bootstrap-server "kafka-1:9092, kafka-2:9092, kafka-3:9092"
elif [ "$COMMAND" = "consume" ]; then
    docker run \
    --rm -i \
    --network=cs3219-otot-tasks_default \
    wurstmeister/kafka kafka-console-consumer.sh \
    --topic "$TOPIC" \
    --from-beginning \
    --bootstrap-server "kafka-1:9092, kafka-2:9092, kafka-3:9092"
fi

if [ "$COMMAND" = "zkStatus" ]; then
    for i in 1 2 3; do
        echo "Container: zk-${i}"
        docker exec -it "zk-${i}" zkServer.sh status | grep "Mode: "
    done
fi
