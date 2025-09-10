package me.game.decifra.bootstrap;

import me.game.decifra.service.ScheduleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Starter implements CommandLineRunner {

    private final ScheduleService scheduleService;

    public Starter(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @Override
    public void run(String... args) throws Exception {
        scheduleService.initSchedule();
    }
}

