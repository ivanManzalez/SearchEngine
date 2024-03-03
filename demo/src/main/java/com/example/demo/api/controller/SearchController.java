package com.example.demo.api.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.api.model.SearchResult;
import com.example.demo.service.SearchService;
import component.model.Result;

@RestController
public class SearchController {
	
	private SearchService searchService;
	
	public SearchController(SearchService searchService) {
		this.searchService = searchService;
	}
	
	@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
	@GetMapping("/search")
    public ArrayList<Result> search(@RequestParam(required=false, value = "query", defaultValue = "") String query) throws IOException {
		System.out.println("\n\n(SearchController) SEARCH:"+query);
		ArrayList<Result> searchResults =  searchService.search(query);
		return searchResults;
	}
																																											
	@GetMapping("/")
    public String home() {
		return "<h1>Hello World!</h1>";
	}

}
