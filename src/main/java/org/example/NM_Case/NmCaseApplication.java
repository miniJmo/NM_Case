package org.example.NM_Case;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NmCaseApplication {
    public static void main(String[] args) {
        SpringApplication.run(NmCaseApplication.class, args);
    }
}