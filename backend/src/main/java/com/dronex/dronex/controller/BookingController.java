
package com.dronex.dronex.controller;

import com.dronex.dronex.entity.Booking;
import com.dronex.dronex.repository.BookingRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // CREATE BOOKING
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody Booking booking) {

        if (booking.getCustomerName() == null ||
                booking.getCustomerEmail() == null ||
                booking.getDroneId() == null ||
                booking.getStartDate() == null ||
                booking.getEndDate() == null ||
                booking.getTotalPrice() == null) {

            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            "All booking fields are required."));
        }

        if (booking.getEndDate().isBefore(booking.getStartDate())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid booking dates."));
        }

        booking.setStatus("CONFIRMED");

        Booking savedBooking = bookingRepository.save(booking);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedBooking);
    }

    // GET ALL BOOKINGS FOR ADMIN
    @GetMapping("/admin/all")
    public List<Booking> getAllBookingsForAdmin() {
        return bookingRepository.findAll();
    }

    // GET BOOKINGS BY CUSTOMER EMAIL
    @GetMapping
    public List<Booking> getBookingsByEmail(
            @RequestParam String email) {
        return bookingRepository.findByCustomerEmail(email);
    }

    // CANCEL BOOKING
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(
            @PathVariable Long id,
            @RequestParam String email) {

        return bookingRepository.findByIdAndCustomerEmail(id, email)
                .map(booking -> {

                    if ("CANCELLED".equals(booking.getStatus())) {
                        return ResponseEntity.badRequest()
                                .body(Map.of("message",
                                        "Booking already cancelled."));
                    }

                    booking.setStatus("CANCELLED");

                    Booking updatedBooking = bookingRepository.save(booking);

                    return ResponseEntity.ok(updatedBooking);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
