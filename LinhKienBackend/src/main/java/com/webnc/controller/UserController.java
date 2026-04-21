/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.webnc.controller;

import com.webnc.repository.NguoiDungRepository;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Tho Khang
 */
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired private NguoiDungRepository repository;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        return ResponseEntity.ok(repository.findByTenDangNhap(principal.getName()).get());
    }
}