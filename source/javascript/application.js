$(document).ready(function() {
    $( ".datepicker" ).datepicker({ dateFormat: 'yy/mm/dd' }).val();	
	bindToArchive();	
  } );
  
function addKeyword (elem) {
    buildUrl("?k="+elem);
  }
  
function addDates(startElem, endElem) {
    var d = new Date();
    var mm = d.getMonth()+1;
    var dd = d.getDate();
    var yyyy = d.getFullYear();
	var today = yyyy+"/"+ mm+"/"+dd;
    var startdate = startElem || "1900/1/1";
	var enddate = endElem || today;
	
	buildUrl("?startdate=" + startdate + "&enddate=" + enddate);
  }
  
function buildUrl(queryString) {
    window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + queryString;
  }
  
  function bindToArchive () {
  var source   = $("#archive-template").html();
  var template = Handlebars.compile(source);

  $.ajax({ 
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('pages')/items?$select=CalcTest&$filter=ContentType eq 'LCC News Page'&$orderby=DateTest desc", 
    type: "GET",
	dataType: 'json',
    headers: { 
        "accept": "application/json;odata=verbose" 
    }, 
    success: function (data) { 

	  var prevYear;
	  var prevMonth;
	  var years = [];
	  var monthsString = ['None','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  
	  $.each(data.d.results, function(index, item) {
        		
		if (typeof prevMonth === 'undefined' || prevMonth != item.CalcTest) {
		
		  var itemYear = item.CalcTest.substring(0,4);
		  var itemMonth = item.CalcTest.substring(4);
		  var monthAsString = monthsString[itemMonth];
		  
		  if (typeof prevYear === 'undefined' || prevYear != itemYear) {
		    years.push({'year': itemYear, 'months': [{'month': itemMonth, 'monthAsString': monthAsString}]});
			prevYear = itemYear;
		  }
		  else
		  {
		    years[years.length-1].months.push({'month': itemMonth, 'monthAsString': monthAsString});
		  }
		  prevMonth = item.CalcTest;
        } 	    	  
	  });	  
	  
	  var html = template({Years:years});
	  $("#archive").html(html);
			
    }, 
    error: function (err) { 
	  var html = "<p>Sorry, there is an error with this filter</p>";
      $("#archive").html(html);
    } 
  }); 
}

function addDatesForMonth(year,month) {
    var d = new Date(year, month, 0);
    var enddate = year + "/"+month+"/"+d.getDate();
    var startdate = year + "/"+month+"/1";

    buildUrl("?startdate=" + startdate + "&enddate=" + enddate);
  }