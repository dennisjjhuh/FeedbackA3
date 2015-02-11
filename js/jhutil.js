/*
Program: jhutil.js
Purpose: create utility functions
Author: Jeongjun Huh (Dennis Huh)
Last Updated: 2014-03-02
*/

function toggleBox(a) {
	
	if ($(a).is(':checked'))
	{
		$("#is_add").show();
	}
	else
	{
		$("#is_add").hide();
	}
}

function edit_toggleBox(a) {
	
	if ($(a).is(':checked'))
	{
		$("#editis_add").show();
	}
	else
	{
		$("#editis_add").hide();
	}
}

function handleAddForm() 
{
	$('#jhAddForm').validate( {
		rules: {
			business_name: {
				required:true,
				rangelength:[2,30]
			},
			reviewer_email: {
				required:true,
				email:true
			},
			review_date: {
				required:true
			},
			ratings_food_quality: {
				range:[0,5]
			},
			ratings_service: {
				range:[0,5]
			},
			ratings_value: {
				range:[0,5]
			}
		}, // end of rules
			
		messages: {
			business_name: {
				required: "Please enter the business name.",
				rangelength: "Business name must be between 2 and 30 characters long."
			},
			reviewer_email: {
				required: "Reviewer email is required.",
				email: "Please enter a valid email address."
			},
			review_date: {
				required: "Review date is required."
			},
			ratings_food_quality: {
				range:"Please enter a value between 0 and 5."
			},
			ratings_service: {
				range:"Please enter a value between 0 and 5."
			},
			ratings_value: {
				range:"Please enter a value between 0 and 5."
			}
		}					
	});
	
	// call add() if valid
	if ($('#jhAddForm').valid()) {
	
		var business_name = $("#business_name").val();
		var type_id = $("#type_id").val();
		var reviewer_email = $("#reviewer_email").val();
		var reviewer_comments = $("#reviewer_comments").val();
		var review_date = $("#review_date").val();			
		
		// if unchecked 'N' as default, otherwise 'Y'
		var has_rating = 'N';
		if ($('#has_rating').prop('checked')) {
			has_rating = 'Y';
		}
		
		//addFriend(type, name, fullname, dob);
		var rating1 = $("#ratings_food_quality").val();
		var rating2 = $("#ratings_service").val();
		var rating3 = $("#ratings_value").val();		

		add_jhreview(business_name, type_id, reviewer_email, reviewer_comments, review_date, has_rating, rating1, rating2, rating3);
		
		$("#jhAddForm input").val('');
		$("#jhAddForm textarea").val('');
		
	} // end if	
} // end function

function handleEditForm() 
{
	$('#jhEditForm').validate( {
		rules: {
			editbusiness_name: {
				required:true,
				rangelength:[2,30]
			},
			editreviewer_email: {
				required:true,
				email:true
			},
			editreview_date: {
				required:true
			},
			editratings_food_quality: {
				range:[0,5]
			},
			editratings_service: {
				range:[0,5]
			},
			editratings_value: {
				range:[0,5]
			}
		}, // end of rules
			
		messages: {
			editbusiness_name: {
				required: "Please enter the business name.",
				rangelength: "Business name must be between 2 and 30 characters long."
			},
			editreviewer_email: {
				required: "Reviewer email is required.",
				email: "Please enter a valid email address."
			},
			editreview_date: {
				required: "Review date is required."
			},
			editratings_food_quality: {
				range:"Please enter a value between 0 and 5."
			},
			editratings_service: {
				range:"Please enter a value between 0 and 5."
			},
			editratings_value: {
				range:"Please enter a value between 0 and 5."
			}
		}					
	});
	
	// call add() if valid
	if ($('#jhEditForm').valid()) {
	
		var id = localStorage.getItem('data-row-id');
			
		var businessname = $("#editbusiness_name").val();
		var typeid = $("#edittype_id").val();
		var email = $("#editreviewer_email").val();
		var comments = $("#editreviewer_comments").val();
		var reviewdate = $("#editreview_date").val();			
		
		// if unchecked 'N' as default, otherwise 'Y'
		var hasrating = 'N';
		if ($('#edithas_rating').prop('checked')) {
			hasrating = 'Y';
		}
		
		//addFriend(type, name, fullname, dob);
		var rating1 = $("#editratings_food_quality").val();
		var rating2 = $("#editratings_service").val();
		var rating3 = $("#editratings_value").val();		

		updateJHReview(id, businessname, typeid, email, comments, reviewdate, hasrating, rating1, rating2, rating3);
		
		$("#jhEditForm input").val('');
		$("#jhEditForm textarea").val('');
		
	} // end if	
} // end function

function calcRatings() {
    var food_quality = $('#ratings_food_quality').val()/5;
	var service = $('#ratings_service').val()/5;
	var value = $('#ratings_value').val()/5;
		
	var total = parseInt(((food_quality + service + value)/3)*100);
	var result = total.toString() + "%";
	$('#overall_ratings').val(result);
}

function calcRatingsEdit() {
    var food_quality = $('#editratings_food_quality').val()/5;
	var service = $('#editratings_service').val()/5;
	var value = $('#editratings_value').val()/5;
		
	var total = parseInt(((food_quality + service + value)/3)*100);
	var result = total.toString() + "%";
	$('#editoverall_ratings').val(result);
}

function deleteAllRecord() {
    var result = confirm("All review records will be deleted permanently. Continue delete?");
	if (!result) {
		$.mobile.changePage('#jhSettings', { transition: 'slide' });
		return;		
	}
	deleteAllJHReview();
}

function deleteRecordOnEdit() {
    var result = confirm("This will delete this record. Continue delete?");
	if (result) {
		deleteJHReview( localStorage.getItem('data-row-id') );
	}
	else
	{
		$.mobile.changePage('#jhViewFeedback', { transition: 'slide' });
	}
}

function updateRecordOnEdit() {
	handleEditForm();		
}

function backViewFeedback()
{
	$.mobile.changePage('#jhViewFeedback', { transition: 'slide' });
}

function searchJHType()
{
	var typename = $('#search-basic').val();
	getAllJHType(typename);
}
