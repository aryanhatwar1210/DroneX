
package com.dronex.dronex.config;

import com.dronex.dronex.entity.Admin;
import com.dronex.dronex.repository.AdminRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminDataInitializer {

    @Bean
    CommandLineRunner resetAdminPassword(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            Admin admin = adminRepository.findByEmail(
                    "admin@dronex.com")
                    .orElseThrow(() -> new RuntimeException("Admin not found"));

            admin.setPasswordHash(
                    passwordEncoder.encode("Admin@123"));

            adminRepository.save(admin);

            System.out.println(
                    "ADMIN PASSWORD RESET SUCCESSFULLY!");
        };
    }
}
