package com.dronex.dronex.controller;


import com.dronex.dronex.entity.Booking;
import com.dronex.dronex.repository.BookingRepository;
import com.dronex.dronex.repository.DroneRepository;
import com.dronex.dronex.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class AdminController {

    private final UserRepository userRepository;
    private final DroneRepository droneRepository;
    private final BookingRepository bookingRepository;

    public AdminController(
            UserRepository userRepository,
            DroneRepository droneRepository,
            BookingRepository bookingRepository) {

        this.userRepository = userRepository;
        this.droneRepository = droneRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {

        long totalUsers = userRepository.count();
        long totalDrones = droneRepository.count();
        long totalBookings = bookingRepository.count();

        BigDecimal totalRevenue = bookingRepository.findAll()
                .stream()
                .filter(booking ->
                    "CONFIRMED".equals(booking.getStatus()))
                .map(Booking::getTotalPrice)
                .filter(price -> price != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalUsers", totalUsers);
        stats.put("totalDrones", totalDrones);
        stats.put("totalBookings", totalBookings);
        stats.put("totalRevenue", totalRevenue);

        return stats;
    }
}
