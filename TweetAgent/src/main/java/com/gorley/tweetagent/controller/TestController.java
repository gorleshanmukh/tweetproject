package com.gorley.tweetagent.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin(origins = "*")
public class TestController {
    @RequestMapping(path = "/ping")
    public @ResponseBody
    String ping() {
        return "pong";
    }
}
