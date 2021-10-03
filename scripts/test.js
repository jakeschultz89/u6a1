function testReq(){
    $.ajax({
        type:"GET",
        url:"http://restclass.azurewebsites.net/api/test",
        success:function(res){
            console.log("Request OK",res);
        },
        error:function(error){
            console.error("Request failed",error);
        }
    });
}