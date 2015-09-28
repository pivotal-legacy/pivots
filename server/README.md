# pivots-spring

An internal directory using Spring Boot

## Setting up for Development

- Create a test and development database.

```
$ createdb pivots_test
$ createdb pivots_development
```

- Migrate the test and development databases

```
$ DATABASE_URL=jdbc:postgresql://localhost/pivots_test ./gradlew flywayMigrate -i
$ DATABASE_URL=jdbc:postgresql://localhost/pivots_development ./gradlew flywayMigrate -i
```

- (Optional) Seed the development database with sample data

```
$ psql -d pivots_development -f applications/src/main/resources/db/migration/seeds.sql
```

- Create and source an `.env` file following `.env.example` with the appropriate values.

- Build the artifact from the project root.

```
$ ./gradlew
```

- Turn the app on and browse to `localhost:8080/employees`

```
$ java -jar applications/pivots/build/libs/applications/pivots.jar
```

## Spring Boot specifics

To see all the auto-configuration done by Spring Boot, pass the `--debug` when launching the jar.

```
$ java -jar applications/pivots/build/libs/applications/pivots.jar --debug
```
