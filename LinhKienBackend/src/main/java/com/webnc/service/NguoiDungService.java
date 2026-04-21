/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.webnc.service;

import com.webnc.entity.NguoiDung;
import com.webnc.repository.NguoiDungRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tho Khang
 */
@Service
public class NguoiDungService {
    @Autowired private NguoiDungRepository repository;

    public List<NguoiDung> layTatCa() { return repository.findAll(); }

    public void doiTrangThai(Long id) {
        NguoiDung nd = repository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy"));
        nd.setTrangThaiHoatDong(!nd.getTrangThaiHoatDong()); // Đảo trạng thái true/false
        repository.save(nd);
    }
}