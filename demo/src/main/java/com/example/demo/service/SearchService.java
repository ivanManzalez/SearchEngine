package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map.Entry;
import java.util.Properties;

import org.springframework.stereotype.Service;

import com.example.demo.api.model.SearchResult;

import component.InterfaceAPI.InterfaceAPI;
import component.model.Result;
import component.DocFinder.DocFinder;
import component.SnippetGenerator.Snipper;

@Service
public class SearchService {
	
	private InterfaceAPI searchInterface;
	private String resourceFolder = "/Users/ivanmancia-gonzalez/Projects/Eclipse_workspace/demo/src/main/resources/static/";
	
	public SearchService() throws IOException {
		
		String projectDir = System.getProperty("user.dir");// demo
		System.out.println("Project directory: " + projectDir);
		 
		String lexiconFilepath = resourceFolder+"output/lexicon/lexicon.ser";
		String postingsFilepath = resourceFolder+"output/postings/postingsList.ser";
		String docLengthFilepath = resourceFolder+"output/docLength.txt";
		String indexFilepath = resourceFolder+"output/index.txt";
		
		searchInterface = new InterfaceAPI(lexiconFilepath, postingsFilepath, docLengthFilepath, indexFilepath);
		
		}

	public ArrayList<Result> search(String query) throws IOException {
		Snipper snipper = new Snipper();
		System.out.println("(SearchService) Search Query: "+query);
		int NUM_DOCS_RETRIEVE = 8;
		
		searchInterface.search(query);
//		Display top 5 results using below template
		searchInterface.generateDocs(resourceFolder+"output/", NUM_DOCS_RETRIEVE); //ArrayList<Result> results = 
		ArrayList<Result> topResults = searchInterface.getTopResults(NUM_DOCS_RETRIEVE);
//		
		for(Result res: topResults) {
			System.out.println(res.getMetadata().getHeadline());
			snipper.setResult(res);
			snipper.generateSummary(query);
			res.setSnippet(snipper.getSummary());
		}
		
		return topResults;
	}
}
