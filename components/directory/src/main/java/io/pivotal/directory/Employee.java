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

    public String getLastName() {
        return lastName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public String getManager() {
        return manager;
    }

    public String getEmail() {
        return email;
    }

    public String getLocation() {
        return location;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public long getId() {
        return id;
    }
}
