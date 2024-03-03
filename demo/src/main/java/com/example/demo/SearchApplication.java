package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SearchApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SearchApplication.class, args);
	}
}
// lsof - list open files
// lists on its standard output file information
// about files opened by processes for the following UNIX dialects:
// lsof -i <:PORT>
