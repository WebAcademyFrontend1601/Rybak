// animation for adding files

$(function (){
   if($('#chose_file').length)
   {
    $('#chose_file').click(function(){
     $('#chose_file_input').click();
     return(false);
    });

    $('#chose_file_input').change(function(){
     $('#chose_file_text').html($(this).val());
    }).change(); // .change() в конце для того чтобы событие сработало при обновлении страницы
   }
});