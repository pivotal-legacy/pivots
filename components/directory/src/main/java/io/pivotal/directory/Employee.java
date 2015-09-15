package io.pivotal.directory;

public class Employee {
    private long id;
    private String firstName;
    private final String lastName;
    private final String imageUrl;
    private final String title;
    private final String manager;
    private final String email;
    private final String location;
    private final String startDate;

    public Employee(long id, String firstName, String lastName, String imageUrl, String title, String manager, String email, String location, String startDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.title = title;
        this.manager = manager;
        this.email = email;
        this.location = location;
        this.startDate = startDate;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public long getId() {
        return id;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getFirstName() {
        return firstName;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getLastName() {
        return lastName;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getImageUrl() {
        return imageUrl;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getTitle() {
        return title;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getManager() {
        return manager;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getEmail() {
        return email;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getLocation() {
        return location;
    }

    @SuppressWarnings("unused") // Getter for Jackson JSON serialization
    public String getStartDate() {
        return startDate;
    }
}
