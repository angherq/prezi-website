(function() {
    $.ajax({
        url: "http://localhost:8080/prezis",
        dataType: "json",    
        context: document.body,
        success: function(data) {
            
            if(data.status == 'success') {
                
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
})();


$( ".search-box" ).keyup(function() {
    var text = $(this).val();
    
    if(text) {
        $.ajax({
            url: "http://localhost:8080/search/" + text,
            dataType: "json",    
            context: document.body,
            success: function(data) {

                if(data.status == 'success') {

                    $(".first_row").html('');
                    $(".second_row").html('');
                    $(".third_row").html('');

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