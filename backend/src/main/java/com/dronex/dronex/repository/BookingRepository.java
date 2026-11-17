
package com.dronex.dronex.repository;

import com.dronex.dronex.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerEmail(String customerEmail);

    Optional<Booking> findByIdAndCustomerEmail(Long id, String customerEmail);
}
