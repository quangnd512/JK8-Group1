FROM eclipse-temurin:21-jdk

WORKDIR /app

RUN apt-get update --fix-missing && apt-get install -y maven

COPY pom.xml .

RUN mvn dependency:go-offline

COPY . . 

RUN mvn clean install -DskipTests

EXPOSE 8080

# ENV CLOUDINARY_URL=cloudinary://597679583287735:6vxnxiNtLGOovgIItf_LhVB5GAg@dzi8lavyv

CMD ["java", "-jar", "target/BookStore-0.0.1-SNAPSHOT.jar"]