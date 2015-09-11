# pivots-spring

An internal directory using Spring Boot

## Setting up for Development

1. Create a test and development database.

```
$ createdb pivots_test
$ createdb pivots_development
```
1. Migrate the test and development databases

```
$ psql -d pivots_test -f components/sql/initial_schema.ddl
$ psql -d pivots_development -f components/sql/initial_schema.ddl
```

1. (Optional) Seed the development database with sample data

```
$ psql -d pivots_development -f components/sql/seed_data.sql
```

1. Create and source an `.env` file following `.env.example` with the appropriate values.

1. Build the artifact from the project root.

```
$ ./gradlew
```

1. Turn the app on and browse to `localhost:8080/employees`

```
$ java -jar applications/pivots/build/libs/applications/pivots.jar
```

## Spring Boot specifics

To see all the auto-configuration done by Spring Boot, pass the `--debug` when launching the jar.

```
$ java -jar applications/pivots/build/libs/applications/pivots.jar --debug
```
