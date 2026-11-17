
package com.dronex.dronex.controller;

import com.dronex.dronex.entity.Drone;
import com.dronex.dronex.repository.DroneRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drones")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class DroneController {

    private final DroneRepository droneRepository;

    public DroneController(DroneRepository droneRepository) {
        this.droneRepository = droneRepository;
    }

    // GET ALL DRONES
    @GetMapping
    public List<Drone> getAllDrones() {
        return droneRepository.findAll();
    }

    // ADD DRONE
    @PostMapping
    public Drone addDrone(@RequestBody Drone drone) {
        drone.setAvailable(true);
        return droneRepository.save(drone);
    }

    // DELETE DRONE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDrone(@PathVariable Long id) {

        if (!droneRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        droneRepository.deleteById(id);

        return ResponseEntity.ok("Drone deleted successfully!");
    }
}
