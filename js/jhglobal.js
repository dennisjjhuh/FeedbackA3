/*
Program: jhglobal.js
Purpose: create DB and table; document ready features
Author: Jeongjun Huh (Dennis Huh)
Last Updated: 2014-03-02
*/

var jhfeedbackDb;

function errorHandler(transaction, error) {
    alert("SQL error: " + error.message);
}

$(document).ready(function() {

	// create database
	jhfeedbackDb = openDatabase('JHFeedbackDb', '1.0', 'JHFeedback DB', 2 * 1024 * 1024);
	
	// create tables if exists
	createTables();
	
	// AddForm
	// calc on ratings_food_quality
	$("#ratings_food_quality").click(function () {
		calcRatings();
		return false;
	});	
	$("#ratings_food_quality").keyup(function () {
		calcRatings();
		return false;
	});		
	
	// calc on ratings_service
	$("#ratings_service").click(function () {
		calcRatings();
		return false;
	});
	$("#ratings_service").keyup(function () {
		calcRatings();
		return false;
	});	
	
	// calc on ratings_value
	$("#ratings_value").click(function () {
		calcRatings();
		return false;
	});
	$("#ratings_value").keyup(function () {
		calcRatings();
		return false;
	});
	
	// EditForm
	// calc on ratings_food_quality
	$("#editratings_food_quality").click(function () {
		calcRatingsEdit();
		return false;
	});	
	$("#editratings_food_quality").keyup(function () {
		calcRatingsEdit();
		return false;
	});		
	
	// calc on ratings_service
	$("#editratings_service").click(function () {
		calcRatingsEdit();
		return false;
	});
	$("#editratings_service").keyup(function () {
		calcRatingsEdit();
		return false;
	});	
	
	// calc on ratings_value
	$("#editratings_value").click(function () {
		calcRatingsEdit();
		return false;
	});
	$("#editratings_value").keyup(function () {
		calcRatingsEdit();
		return false;
	});
	
	// btnClearDB click
	$("#btnClearDB").on("click",  
		deleteAllRecord 
	); 
	
	// btnSaveDefaults click
	$("#btnSaveDefaults").on("click",  
		getField 
	);
	
	// btnAbout click
	$("#btnAbout").on("click",  
		displayAbout 
	);
	
	// btnCancel click
	$("#btnCancel").on("click",
		backViewFeedback
	);
	
	// btnUpdate click	
	$("#btnUpdate").on("click",
		updateRecordOnEdit
	);
	
	// btnDelete click	
	$("#btnDelete").on("click",
		deleteRecordOnEdit
	);
	
	// display listview on View Feedback
	$("#jhViewFeedback").on("click",  
		getAll
	);
	
	$("#search-basic").on("click",
		searchJHType
	);

}); // end ready