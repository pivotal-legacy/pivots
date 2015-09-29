package e2e;

import org.fluentlenium.adapter.FluentTest;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

import static org.fluentlenium.core.filter.FilterConstructor.withText;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class PivotsTest extends FluentTest {
    @Test
    public void basicFunctionality() throws InterruptedException {
        goTo("http://localhost:9000");

        assertThat(title().contains("Pivots"), is(true));

        fill("#username").with("user");
        fill("#password").with("user");
        submit(".form-inline");

        await().atMost(5, TimeUnit.SECONDS).until("div").containsText("Danny");
        await().atMost(5, TimeUnit.SECONDS).until("div").containsText("Whitney");
        await().atMost(5, TimeUnit.SECONDS).until("div").containsText("Eno");

        fill("#search_input").with("Hee");

        await().atMost(5, TimeUnit.SECONDS).until("div").containsText("Hee Won");
        assertThat(find("div", withText().contains("Hee Won")).isEmpty(), is(false));
        assertThat(find("div", withText().contains("Whitney")).isEmpty(), is(true));

        fill("#search_input").with("En");

        await().atMost(5, TimeUnit.SECONDS).until("div").containsText("Eno");
        assertThat(find("div", withText().contains("Eno")).isEmpty(), is(false));
        assertThat(find("div", withText().contains("Whitney")).isEmpty(), is(true));
        assertThat(find("div", withText().contains("Hee Won")).isEmpty(), is(true));

        click("a", withText("LOGOUT"));

        await().atMost(1, TimeUnit.SECONDS).until("div").containsText("Login");
    }

    @Override
    public WebDriver getDefaultDriver() {
        return new ChromeDriver();
    }
}
