# Build stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy the pom.xml and resolve dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-root user for running the application securely
RUN addgroup -S spring && adduser -S spring -G spring

# Create data directory and set correct permissions
RUN mkdir -p /app/data && chown -R spring:spring /app

USER spring:spring

# Copy the build artifact from build stage
COPY --from=build /app/target/management-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
