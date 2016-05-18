//Initial thumbs
(function() {
    homescreen();
})();

function homescreen() {
    sessionStorage.skip = 9;
    sessionStorage.newest_first = 0;

    $.ajax({
        url: "https://whispering-sea-16446.herokuapp.com/prezis",
        dataType: "json",    
        context: document.body,
        success: function(data) {
            
            if(data.status == 'success') {

                $(".first_row").html('');
                $(".second_row").html('');
                $(".third_row").html('');
                $(".rand-row").html('');
                $(".search-box").val('');
                
                var prezis = JSON.parse(data.prezis);
                $.each(prezis, function(i, item) {

                    thumb  = '  <div class="col-md-4 portfolio-item">';
                    thumb += '      <a href="http://prezi.com/prezi/id/' + item.id + '">';
                    thumb += '         <img class="img-responsive" src="'+item.thumbnail+'?rand='+ Math.random().toString(32).substring(2) +'" alt="">';
                    thumb += '      </a>';
                    thumb += '     <h3>';
                    thumb += '         <a href="http://prezi.com/prezi/id/' + item.id + '">'+item.title+'</a>';
                    thumb += '       </h3>';
                    thumb += '      <p><a href="' + item.creator.profileUrl + '"><span>' + item.creator.name + '</span></a> | <span>'+item.createdAt+'</span></p>';
                    thumb += '  </div>';   

                    if(i<3)
                        $(".first_row").append(thumb); 

                    if(i>=3 && i<6) 
                        $(".second_row").append(thumb); 

                    if(i>=6 && i<9) 
                        $(".third_row").append(thumb); 
                });
            }
        }
    });
}

//Search a prezi by title, only top 9 results are shown
$( ".search-box" ).keyup(function() {
    var text = $(this).val();  
    if(text) {
        $.ajax({
            url: "https://whispering-sea-16446.herokuapp.com/search/" + text,
            dataType: "json",    
            context: document.body,
            success: function(data) {

                if(data.status == 'success') {

                    $(".load-more-row").html('');
                    $(".first_row").html('');
                    $(".second_row").html('');
                    $(".third_row").html('');
                    $(".rand-row").html('');

                    var prezis = JSON.parse(data.prezis);

                     $.each(prezis, function(i, item) {

                        thumb  = '  <div class="col-md-4 portfolio-item">';
                        thumb += '      <a href="http://prezi.com/prezi/id/' + item.id + '">';
                        thumb += '         <img class="img-responsive" src="'+item.thumbnail+'?rand='+ Math.random().toString(32).substring(2) +'" alt="">';
                        thumb += '      </a>';
                        thumb += '     <h3>';
                        thumb += '         <a href="http://prezi.com/prezi/id/' + item.id + '">'+item.title+'</a>';
                        thumb += '       </h3>';
                        thumb += '      <p><a href="' + item.creator.profileUrl + '"><span>' + item.creator.name + '</span></a> | <span>'+item.createdAt+'</span></p>';
                        thumb += '  </div>';   

                        if(i<3)
                            $(".first_row").append(thumb); 

                        if(i>=3 && i<6) 
                            $(".second_row").append(thumb); 

                        if(i>=6 && i<9) 
                            $(".third_row").append(thumb); 
                    });
                }
            }
        }); 
    }
});


//This function will load more results, session storage (not local storage, session storage is wiped automatically)
//is used in order to accomulate the 'skip' value
$('.load-more').on('click', function() {
    
    if(Number(sessionStorage.newest_first)) 
        var load_url = "https://whispering-sea-16446.herokuapp.com/ordered/prezis/" + sessionStorage.skip;
    else
        var load_url = "https://whispering-sea-16446.herokuapp.com/prezis/" + sessionStorage.skip;

    $.ajax({
        url: load_url,
        dataType: "json",    
        context: document.body,
        success: function(data) {
            
            if(data.status == 'success') {
                
                var prezis = JSON.parse(data.prezis);
                
                thumb = [];
                $.each(prezis, function(i, item) {
                    
                    thumb[i]  = '  <div class="col-md-4 portfolio-item">';
                    thumb[i] += '      <a href="http://prezi.com/prezi/id/' + item.id + '">';
                    thumb[i] += '         <img class="img-responsive" src="'+item.thumbnail+'?rand='+ Math.random().toString(32).substring(2) +'" alt="">';
                    thumb[i] += '      </a>';
                    thumb[i] += '     <h3>';
                    thumb[i] += '         <a href="http://prezi.com/prezi/id/' + item.id + '">'+item.title+'</a>';
                    thumb[i] += '       </h3>';
                    thumb[i] += '      <p><a href="' + item.creator.profileUrl + '"><span>' + item.creator.name + '</span></a> | <span>'+item.createdAt+'</span></p>';
                    thumb[i] += '  </div>';       

                    if(i==2) {
                        row = '<div class="row rand-row">' + thumb[0] + thumb[1] + thumb[2] + '</div>';
                        $(".prezis-container").append(row);
                    }

                    else if(i==5) {
                        row = '<div class="row rand-row">' + thumb[3] + thumb[4] + thumb[5] + '</div>';
                        $(".prezis-container").append(row);
                    }

                    else if(i==8) {
                        row = '<div class="row rand-row">' + thumb[6] + thumb[7] + thumb[8] + '</div>';
                        $(".prezis-container").append(row);
                    }
                    
                    //If not enought objects in the json for the above cases (end of file)
                    else if(Object.keys(prezis).length <= 2) {                    
                        row = '<div class="row rand-row">' + thumb +'</div>';
                        $(".prezis-container").append(row);

                        $(".load-more-row").html('');
                    }
                });
            }
        }
    });
    sessionStorage.skip = Number(sessionStorage.skip) + 9;
}); 


$('.newest-first').on('click', function() {
    sessionStorage.newest_first = 1;
    $.ajax({
        url: "https://whispering-sea-16446.herokuapp.com/ordered/prezis",
        dataType: "json",    
        context: document.body,
        success: function(data) {
            
            if(data.status == 'success') {

                $(".first_row").html('');
                $(".second_row").html('');
                $(".third_row").html('');
                $(".rand-row").html('');
                $(".search-box").val('');

                var prezis = JSON.parse(data.prezis);
                
                thumb = [];
                $.each(prezis, function(i, item) {

                    thumb[i]  = '  <div class="col-md-4 portfolio-item">';
                    thumb[i] += '      <a href="http://prezi.com/prezi/id/' + item.id + '">';
                    thumb[i] += '         <img class="img-responsive" src="'+item.thumbnail+'?rand='+ Math.random().toString(32).substring(2) +'" alt="">';
                    thumb[i] += '      </a>';
                    thumb[i] += '     <h3>';
                    thumb[i] += '         <a href="http://prezi.com/prezi/id/' + item.id + '">'+item.title+'</a>';
                    thumb[i] += '       </h3>';
                    thumb[i] += '      <p><a href="' + item.creator.profileUrl + '"><span>' + item.creator.name + '</span></a> | <span>'+item.createdAt+'</span></p>';
                    thumb[i] += '  </div>';       

                    if(i==2) {
                        row = '<div class="row rand-row">' + thumb[0] + thumb[1] + thumb[2] + '</div>';
                        $(".prezis-container").append(row);
                    }

                    else if(i==5) {
                        row = '<div class="row rand-row">' + thumb[3] + thumb[4] + thumb[5] + '</div>';
                        $(".prezis-container").append(row);
                    }

                    else if(i==8) {
                        row = '<div class="row rand-row">' + thumb[6] + thumb[7] + thumb[8] + '</div>';
                        $(".prezis-container").append(row);
                    }
                    
                    //If not enought objects in the json for the above cases (end of file)
                    else if(Object.keys(prezis).length <= 2) {                    
                        row = '<div class="row rand-row">' + thumb +'</div>';
                        $(".prezis-container").append(row);

                        $(".load-more-row").html('');
                    }
                });
            }
        }
    });
}); 