package com.example.demo.api.model;

public class SearchResult {
	
	private String query;
	private String headline;
	private String date;
	private String snippet;
	private String href;
	
	public SearchResult(String query, String headline, String date, String snippet, String href) {
		this.query = query;
		this.headline = headline;
		this.date = date;
		this.snippet = snippet;
		this.href = href;
	}
	//Query
	public void setQuery(String query) {
		this.query=query;
	}
	public String getQuery() {
		return this.query;
	}
	//Hyperlink
	public void setHref(String href) {
		this.href=href;
	}
	public String getHref() {
		return this.href;
	}
	
	//Headline
	public void setHeadline(String headline) {
		this.headline=headline;
	}
	public String getHeadline() {
		return this.headline;
	}
	//Date
	public void setDate(String date) {
		this.date=date;
	}
	public String getDate() {
		return this.date;
	}
	//Snippet
	public void setSnippet(String snippet) {
		this.snippet=snippet;
	}
	public String getSnippet() {
		return this.snippet;
	}
}