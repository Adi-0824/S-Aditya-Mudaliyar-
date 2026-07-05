# Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the pom.xml and resolve dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app

# Create a non-root user for running the application securely
RUN groupadd -r spring && useradd -r -g spring spring

# Create data directory and set correct permissions
RUN mkdir -p /app/data && chown -R spring:spring /app

# Copy the build artifact from build stage with correct ownership
COPY --from=build --chown=spring:spring /app/target/management-0.0.1-SNAPSHOT.jar app.jar

USER spring:spring

EXPOSE 8080

# Activate prod profile so in-memory H2 is used (safe for cloud)
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
