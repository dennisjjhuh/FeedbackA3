/*
Program: jhdatabase.js
Purpose: create database functions
Author: Jeongjun Huh (Dennis Huh)
Last Updated: 2014-03-30
*/

/* Create all table */

function createTables() {
	
    // create the table if it doesn't exist    
    jhfeedbackDb.transaction(function (transaction){
    	var sqlString = "CREATE TABLE IF NOT EXISTS jhtype ("
    	+ " type_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
		+ " type_name VARCHAR NOT NULL"    		
    	+ ");";
    	transaction.executeSql(sqlString, [], null, errorHandler);
    }, errorHandler);

    // add values to jhtype table and populate the drop list using saved data
    addRecordAllJHtype();
    
    jhfeedbackDb.transaction(function (transaction) {
        var sqlString = "CREATE TABLE IF NOT EXISTS jhreview ("
        + " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
		+ " business_name VARCHAR NOT NULL,"
		+ " type_id INT NOT NULL,"		
        + " reviewer_email TEXT NOT NULL,"
        + " reviewer_comments TEXT,"         
        + " review_date DATE,"
        + " has_rating VARCHAR,"
        + " rating1 INT,"        
        + " rating2 INT,"
        + " rating3 INT"                
        + ");";
        transaction.executeSql(sqlString, [], null, errorHandler);
    }, errorHandler);
} // end Create table

/* Add one record to jhreview table */

function add_jhreview(business_name, type_id, reviewer_email, reviewer_comments, review_date, has_rating, rating1, rating2, rating3) {
	var sqlString = "INSERT INTO jhreview (business_name, type_id, reviewer_email, reviewer_comments, review_date, has_rating, rating1, rating2, rating3)"
		+ " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

	jhfeedbackDb.transaction(function (tx) {
		tx.executeSql(sqlString, [business_name, type_id, reviewer_email, reviewer_comments, review_date, has_rating, rating1, rating2, rating3],
		function(tx, res) {
			console.debug("DEBUG: JHReview record added");
			alert("New JHReview record added.");
		},
		errorHandler);
	});
} // end Add jhreview


/*  Add one record to JHtype table */

function addRecordJHtype(type_name) {
	var sqlString = "INSERT INTO jhtype (type_name)"
		+ " VALUES (?);";
	
	jhfeedbackDb.transaction(function (tx) {
		tx.executeSql(sqlString, [type_name],
		function(tx, res) {
			console.debug("DEBUG: JHType record added");
		},
		errorHandler);
	});
} // end Add JHtype

/* Add all record to JHtype table */

function addRecordAllJHtype(){
	jhfeedbackDb.transaction(function (tx) {
		tx.executeSql("SELECT * FROM jhtype WHERE type_name = ?;", ['Coffee Shop'],
		function(tx, res) {
			if (res.rows.length == 0) {
				tx.executeSql("INSERT INTO jhtype (type_name) VALUES(?);", ['Coffee Shop'], null, fR);				
				tx.executeSql("INSERT INTO jhtype (type_name) VALUES(?);", ['Canadian'], null, fR);
				tx.executeSql("INSERT INTO jhtype (type_name) VALUES(?);", ['Asian'], null, fR);
				tx.executeSql("INSERT INTO jhtype (type_name) VALUES(?);", ['Other'], null, fR);
	
				get_jhtype();
			}
			else
			{	
				get_jhtype();
			}
		},
		fR);
	});
}	

function get_jhtype() {
	
	jhfeedbackDb.transaction(function (tx) {
		tx.executeSql("SELECT * FROM jhtype ORDER BY type_name desc;", null,
		function(tx, res) {
			if (res.rows.length == 0) {
				// this shouldn't happen - as we already inserted them.
			}
			else
			{	
				var len = res.rows.length;
				var code = "";
				for (var i = 0; i < len; i++){
					if (i == 0) {
						code = code + '<option selected="TRUE" value="'+res.rows.item(i).type_id+'">'+res.rows.item(i).type_name+'</option>';
					}
					else
					{
						code = code + '<option value="'+res.rows.item(i).type_id+'">'+res.rows.item(i).type_name+'</option>';
					}
				}
				// add type data for AddForm
				$("#type_id").html(code);
				$("#edittype_id").html(code);
			}
		},
		fR);
	});
} // end Add

function fR(a,b){
	// Oops! There was an issue let's alert it the user.
	
	alert(b.message);
}

/* Select all for jhtype table */

function getAllJHType(typename) {
	var sqlString = "SELECT * FROM jhtype WHERE type_name = " + typename + ";";
	
    jhfeedbackDb.transaction(function (transaction) {
        transaction.executeSql(sqlString,
				[],
                function (transaction, results) { onGetAllJHTypeSuccess(results); },
                errorHandler);
    });
}

// show data from table to listview
function onGetAllJHTypeSuccess(results) {
	jhfeedbackDb.transaction(function (tx) {
		tx.executeSql("SELECT * FROM jhtype ORDER BY type_id DESC", null,
		function(tx, res) {
			if (res.rows.length == 0) {
				console.log("seriously");
			}
			else
			{
				$("#my-search-list").listview();
				var len = res.rows.length;
				var code = "";

				for (var i = 0; i < len; i++)	{
					var source   = $("#activity-template2").html();
					// data binding to Activity Template using HandlebarsJS on ListView
					var template = Handlebars.compile(source);
					code += template(res.rows.item(i));
				}
				$("#my-search-list").html(code);
				$("#my-search-list").listview('refresh');
			}
			$("#my-search-list").listview('refresh');
		}, fR);
	});
} // end GetAll jhtype

/* Select all for jhreview table */

function getAll() {
    jhfeedbackDb.transaction(function (transaction) {
        transaction.executeSql("SELECT * FROM jhreview ORDER BY id DESC",
				[],
                function (transaction, results) { onGetAllSuccess(results); },
                errorHandler);
    });
}

// show data from table to listview
function onGetAllSuccess(results) {
	jhfeedbackDb.transaction(function (tx) {
		tx.executeSql("SELECT * FROM jhreview ORDER BY id DESC", null,
		function(tx, res) {
			if (res.rows.length == 0) {
				console.log("seriously");
			}
			else
			{
				$("#jhListView").listview();
				var len = res.rows.length;
				var code = "";

				for (var i = 0; i < len; i++)	{
					var source   = $("#activity-template").html();
					// data binding to Activity Template using HandlebarsJS on ListView
					var template = Handlebars.compile(source);
					code += template(res.rows.item(i));
				}
			//	console.log(code);
					
				$("#jhListView").html(code);
				$("#jhListView").listview('refresh');
				
			}
			$("#jhListView").listview('refresh');
		}, fR);
	});
} // end GetAll

/* Delete selected record to jhreview table */

function deleteJHReview(id) {
    var sqlString = "DELETE FROM jhreview WHERE id = " + id + ";";

    jhfeedbackDb.transaction(function (transaction) {
        transaction.executeSql(
                sqlString,
                [],
                function (transaction, response) {
               		alert("Row deleted");
                    onDeleteSuccess( response );
                },
                errorHandler
           ); // end executeSql
    });
}

function onDeleteSuccess( response ) {

    // refresh the list
    getAll();
    
    $.mobile.changePage('#jhViewFeedback', { transition: 'slide' });
} // end delete


/* Update selected record to jhreview table */

function updateJHReview(id, businessname, typeid, email, comments, reviewdate, hasrating, rating1, rating2, rating3) {
    var sqlString = "UPDATE jhreview SET business_name = '" + businessname
        + "', type_id = '" + typeid    
        + "', reviewer_email = '" + email
        + "', reviewer_comments = '" + comments
        + "', review_date = '" + reviewdate
        + "', has_rating = '" + hasrating
        + "', rating1 = '" + rating1
        + "', rating2 = '" + rating2
        + "', rating3 = '" + rating3                                        
        + "' WHERE id = " + id + ";";

    jhfeedbackDb.transaction(function (transaction) {
        transaction.executeSql(
                sqlString,
                [],
                function (transaction, response) {
               	    alert("Row updated");
                    onUpdateSuccess( response );
                },
                errorHandler
            ); // end executeSql
    });
}

function onUpdateSuccess( response ) {

    // refresh the list
    getAll();
    
    $.mobile.changePage('#jhViewFeedback', { transition: 'slide' });
} // end update

/* update data of ListItem on ListView */

function viewListItem(id)
{
    // save to localStorage: id is not editable
	localStorage.setItem('data-row-id', id);
	findReview(id);
}

function findReview(id) {
	jhfeedbackDb.transaction(function (transaction) {
   		transaction.executeSql("SELECT jhreview.id, jhreview.business_name, jhtype.type_name, jhreview.reviewer_email, jhreview.reviewer_comments, jhreview.review_date, jhreview.has_rating, jhreview.rating1, jhreview.rating2, jhreview.rating3" 
   			+ " FROM jhreview INNER JOIN jhtype"
   			+ " ON jhreview.type_id = jhtype.type_id" 
   			+ " WHERE id = ?",   		
			[id], function (transaction, results) { onFindSuccess(results); },
            	errorHandler);
	});
} // end ListView

function onFindSuccess(results) {     
    var aRow = null;

    if (results.rows.length > 0) {
    	// only one row expected
        aRow = results.rows.item(0);
        
        // populate edit form input fields
       	$('#editbusiness_name').val( aRow['business_name'] );   
        $('#edittype_id').val( aRow['type_name'] );
    	$('#editreviewer_email').val( aRow['reviewer_email'] ); 	   
       	$('#editreviewer_comments').val( aRow['reviewer_comments'] );   
       	$('#editreview_date').val( aRow['review_date'] );
       	$('#editratings_food_quality').val( aRow['rating1'] );  
       	$('#editratings_service').val( aRow['rating2'] );        	
       	$('#editratings_value').val( aRow['rating3'] ); 
      	       	
       	// type checkbox control
       	if ( aRow['has_rating'] === 'Y' ) {
			$("#edithas_rating").attr('checked', true);
			$("#edithas_rating").click();
       		$("#editis_add").show();
       	} 
       	else {
       		$("#edithas_rating").attr('checked', false);
			$("#edithas_rating").click();
       		$("#editis_add").hide();
       	}
    	$("#jhEditForm input[type='checkbox']").checkbox("refresh");
    }
    $.mobile.changePage('#jhViewFeedback', { transition: 'slide' });    
}

/* btnSaveDefaults click */

function getField() {
  	
  	// Set form defaults
  	clearAddForm();
  	
	var email = $("#default_reviewer_email").val();
				
	// Store to local storage
  	localStorage.setItem("default_email", email);
  	$("#reviewer_email").val(email);
}

function clearAddForm()
{
	$("#jhAddForm input").val('');
	$("#jhAddForm textarea").val('');
	$('#has_rating').prop('unchecked');
	$("#ratings_food_quality").val(0);
	$("#ratings_service").val(0);
	$("#ratings_value").val(0);
	var start = new Date().getDate();
	$("#review_date").val(start);
} // end btnSaveDefaults click

function deleteAllJHReview() {
    var sqlString = "DELETE FROM jhreview;";

    jhfeedbackDb.transaction(function (transaction) {
        transaction.executeSql(
                sqlString, [], null, errorHandler);
    });
}

