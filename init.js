console.log('init...');

$(document).ready(function(){
	$('#login-trigger').click(function(){
		$(this).next('#login-content').slideToggle();
		$(this).toggleClass('active');
		
		if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
			else $(this).find('span').html('&#x25BC;')
		})
});

// <input type="search" value="Який товар Ви бажаєте?" onfocus="if (this.value==this.defaultValue)this.value="";"
// onblur="if (this.value=="")this.value=this.defaultValue;">