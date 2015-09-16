package e2e;

import org.fluentlenium.adapter.FluentTest;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

public class PivotsTest extends FluentTest {
    @Test
    public void title_of_bing_should_contain_search_query_name() {
        goTo("http://localhost:9000");

        assertThat(title().contains("Pivots"), is(true));

        fill("#username").with("user");
        fill("#password").with("user");
        submit(".form-inline");

        await().atMost(5, TimeUnit.SECONDS).until("div").containsText("Danny");
    }

    @Override
    public WebDriver getDefaultDriver() {
        return new ChromeDriver();
    }
}
