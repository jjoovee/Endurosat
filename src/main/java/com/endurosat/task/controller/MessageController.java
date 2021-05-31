package com.endurosat.task.controller;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import com.endurosat.task.model.OutputMessage;
import com.endurosat.task.model.Unit;

@EnableScheduling
@Controller
public class MessageController {

    private AtomicInteger id = new AtomicInteger(0);

    @Autowired
    private SimpMessagingTemplate template;

    @Scheduled(fixedDelay = 5000)
    public void publishUnits() {
        Unit unit = new Unit("Unit", id.incrementAndGet());
        System.out.println(unit.toString() + " produced");
        template.convertAndSend("/topic/greetings", new OutputMessage(unit.toString()));
    }
}