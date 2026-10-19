# BookMatch — Java + Spring Boot

This is the BookMatch single-page website with a Java backend using Spring Boot.

## Requirements
- JDK 17 or newer
- Maven
- An IDE such as IntelliJ IDEA or VS Code

## Run
1. Open this folder in your IDE.
2. Run `mvn spring-boot:run` from this folder.
3. Open http://localhost:8080 in your browser.

## API endpoints
- `GET /api/books` — return all sample book recommendations as JSON
- `GET /api/moods` — return available reading moods
- `GET /api/books/mood?mood=cozy` — filter books by mood (e.g. cozy, adventure, mystery, growth, romance, thought)

## Project structure
- `src/main/java/com/bookmatch/BookMatchApplication.java` — starts Spring Boot
- `src/main/java/com/bookmatch/BookController.java` — Java REST API and sample book data
- `src/main/resources/static/index.html` — single-page frontend
- `src/main/resources/static/style.css` — website styling
- `src/main/resources/static/script.js` — mood selection and saved shelf interactions
- `pom.xml` — Maven dependencies

The front-end recommendations currently use local sample data for instant interaction. The Java API is available for a next step to load recommendations from the backend.
