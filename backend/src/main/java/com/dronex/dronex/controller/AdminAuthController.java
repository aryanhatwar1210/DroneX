
package com.dronex.dronex.controller;

import com.dronex.dronex.entity.Admin;
import com.dronex.dronex.repository.AdminRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = {
                "http://localhost:5173",
                "http://localhost:5174"
})
public class AdminAuthController {

        private final AdminRepository adminRepository;
        private final PasswordEncoder passwordEncoder;

        public AdminAuthController(
                        AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder) {
                this.adminRepository = adminRepository;
                this.passwordEncoder = passwordEncoder;
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(
                        @RequestBody Map<String, String> request) {

                String email = request.get("email");
                String password = request.get("password");

                if (email == null || password == null ||
                                email.isBlank() || password.isBlank()) {

                        return ResponseEntity.badRequest().body(
                                        Map.of("message", "Email and password are required."));
                }

                return adminRepository.findByEmail(
                                email.trim().toLowerCase())
                                .filter(admin -> passwordEncoder.matches(
                                                password,
                                                admin.getPasswordHash()))
                                .<ResponseEntity<?>>map(admin -> ResponseEntity.ok(Map.of(
                                                "message", "Admin login successful!",
                                                "id", admin.getId(),
                                                "name", admin.getName(),
                                                "email", admin.getEmail())))
                                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                                                Map.of("message", "Invalid email or password.")));
        }
}
